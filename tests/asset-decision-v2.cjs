/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS test runner consumes isolated tsc output. */
// Run with: tsc lib/asset-decision/*.ts --outDir .qa --module commonjs --target es2020 --esModuleInterop --skipLibCheck
// Then: echo '{"type":"commonjs"}' > .qa/package.json; node --test tests/asset-decision-v2.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { evaluateAssessment: evaluate, parseNumeric, unknown: u, inputSchema } = require('../.qa/model.js');
const { decisionRules } = require('../.qa/rules.js');
const session = require('../.qa/session.js');
const k = value => ({state:'known',value});
const base = {asset:'QA racks',quantity:k(10),age:u,location:'QA site',condition:'usable',reuseReadiness:'identified',reuseHorizon:k(6),replacementValue:k(1000000),storageCost:k(1000),redeploymentCost:k(100000),resaleEstimate:k(100000),scrapEstimate:k(50000)};
const run = overrides => evaluate({...base,...overrides});
test('1 no receiving use cannot redeploy from six months and favourable movement alone',()=>assert.equal(run({reuseReadiness:'none'}).decision,'sell'));
test('2 safety overrides long holding and attractive sale',()=>{const r=run({condition:'end_of_life',reuseHorizon:k(36),storageCost:k(100000)}); assert.equal(r.decision,'scrap'); assert.equal(r.rule,'safety_gate');});
test('3 unknown reuse horizon requires review for identified reuse and flags the gap',()=>{const r=run({reuseHorizon:u});assert.equal(r.decision,'insufficient_information');assert(r.missing.some(x=>x.startsWith('Reuse horizon')));});
test('4 blanks and explicit unknown remain null, including hidden stale numbers',()=>{assert.deepEqual(parseNumeric(''),u);assert.deepEqual(parseNumeric('  '),u);assert.deepEqual(parseNumeric('100',true),u);assert.equal(run({replacementValue:u,resaleEstimate:u}).decision,'insufficient_information');});
test('5 true numeric zero and immediate reuse are retained',()=>{assert.deepEqual(parseNumeric('0'),k(0));const r=run({reuseHorizon:k(0),redeploymentCost:k(0)});assert.equal(r.decision,'redeploy');assert(!r.missing.some(x=>x.startsWith('Reuse horizon')||x.startsWith('Transport')));});
for(const condition of ['repairable','uncertain']) test(`6 ${condition} must not auto-scrap even if scrap exceeds resale`,()=>{const r=run({condition,scrapEstimate:k(200000)});assert.equal(r.decision,'insufficient_information');assert.equal(r.data_quality,'review_required');});
test('likely and unknown readiness cannot redeploy',()=>{for(const reuseReadiness of ['likely','unknown']) assert.notEqual(run({reuseReadiness}).decision,'redeploy');});
test('temporary holding considers known timing, custody and movement',()=>{assert.equal(run({reuseHorizon:k(9)}).decision,'hold');assert.equal(run({reuseHorizon:k(9),storageCost:u}).decision,'insufficient_information');});
test('no invented zero when recovery estimate is missing',()=>assert.equal(run({reuseReadiness:'none',scrapEstimate:u}).decision,'insufficient_information'));
test('known zero resale and positive scrap yields a supported recovery comparison',()=>assert.equal(run({reuseReadiness:'none',resaleEstimate:k(0)}).decision,'scrap'));
test('equal estimates do not arbitrarily choose a recovery route',()=>assert.equal(run({reuseReadiness:'none',resaleEstimate:k(50000)}).decision,'insufficient_information'));
test('zero replacement is known and cannot justify redeploy even with zero move',()=>assert.notEqual(run({reuseHorizon:k(0),replacementValue:k(0),redeploymentCost:k(0)}).decision,'redeploy'));
test('unknown movement prevents redeploy',()=>assert.equal(run({redeploymentCost:u}).decision,'insufficient_information'));
test('context fields do not change recommendation and are explicitly disclosed',()=>{const r=run({age:k(100),location:'Elsewhere',quantity:k(0)});assert.equal(r.decision,run({}).decision);assert(r.assumptions.some(x=>x.includes('Age, quantity and location')));});
test('guidance windows are configurable independently from economics',()=>{const r=evaluate({...base,reuseHorizon:k(8)},{...decisionRules,maxRedeployHorizonMonths:9});assert.equal(r.decision,'redeploy');});
test('invalid negatives, infinities and NaN rejected',()=>{for(const v of ['-1','Infinity','text']) assert.throws(()=>parseNumeric(v));assert.equal(inputSchema.safeParse({...base,replacementValue:k(NaN)}).success,false);});
test('every outcome includes required explanations and controlled quality',()=>{for(const overrides of [{},{reuseHorizon:k(9)},{reuseReadiness:'none'},{condition:'end_of_life'},{condition:'uncertain'}]){const r=run(overrides);for(const key of ['reasons','economics','missing','couldChange','assumptions'])assert(Array.isArray(r[key]));assert(r.reasons.length>=2);assert(['complete','partial','review_required'].includes(r.data_quality));}});
test('7-8 handoff JSON preserves zeros, unknown flags, attribution, result and refresh reconstruction',()=>{
  const data = new Map(); global.sessionStorage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
  const attribution={source_page:'/asset-decision-tool',landing_page:'/',referrer:'https://example.com/signature',utm_source:'signature',utm_medium:'email',utm_campaign:'tool_v2',utm_content:'',utm_term:''};
  const a=session.makeAssessment({...base,reuseHorizon:k(0),storageCost:u},attribution); assert(session.saveAssessment(a));
  const loaded=session.loadAssessment();assert.deepEqual(loaded,a);assert.equal(loaded.inputs.reuseHorizon.value,0);assert.equal(loaded.inputs.storageCost.value,null);assert.equal(loaded.unknown_flags.storageCost,true);
  const saved=JSON.parse(data.get('ogoldy_assessment_v2')); saved.result.decision='scrap';data.set('ogoldy_assessment_v2',JSON.stringify(saved));assert.equal(session.loadAssessment().result.decision,'redeploy');
});
test('10 tool analytics boundary never contains assessment input or contact values',()=>{const event=session.toolEvent('asset_decision_tool_completed',run({}));assert.deepEqual(Object.keys(event).sort(),['data_quality','decision_result','event','tool_version']);assert.deepEqual(Object.keys(session.toolEvent('asset_decision_tool_started')).sort(),['event','tool_version']);});
test('missing session never silently coerces an assessment',()=>{session.clearAssessment();assert.equal(session.loadAssessment(),null);});
