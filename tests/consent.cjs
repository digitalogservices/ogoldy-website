/* eslint-disable @typescript-eslint/no-require-imports */
// Compile lib/consent.ts to .qa/consent.js with CommonJS before running.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readConsent,applyConsent,pushAnalytics,consentKey}=require('../.qa/consent.js');
test('missing, invalid and old preference records cannot grant analytics',()=>{
  for(const record of [null,'bad','{}','{"version":0,"analytics":"granted"}','{"version":1,"analytics":"yes"}']) {
    global.localStorage={getItem:()=>record}; assert.equal(readConsent(),null);
  }
  global.localStorage={getItem:()=>'{"version":1,"analytics":"denied"}'};assert.equal(readConsent(),'denied');
  global.localStorage={getItem:()=>'{"version":1,"analytics":"granted"}'};assert.equal(readConsent(),'granted');
});
test('basic consent does not queue denied events; withdrawal blocks immediately without reload',()=>{
  const store=new Map(),scripts=[],events=[],cookies=[];
  global.localStorage={getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)};
  global.window={ogoldyAnalyticsAllowed:false,dataLayer:[]};
  global.location={hostname:'www.ogoldy.com',pathname:'/asset-decision-tool'};
  global.CustomEvent=class{constructor(type,options){this.type=type;this.detail=options.detail}};
  global.document={createElement:()=>({}),head:{appendChild:s=>scripts.push(s)},dispatchEvent:e=>events.push(e)};
  Object.defineProperty(document,'cookie',{get:()=> '_ga=123; _ga_193MG85HSP=456; functional=keep',set:v=>cookies.push(v)});
  pushAnalytics({event:'asset_decision_tool_completed'});assert.equal(window.dataLayer.length,0);
  applyConsent('granted'); assert.equal(scripts.length,1);assert.equal(window['ga-disable-G-193MG85HSP'],false);
  assert.deepEqual(window.dataLayer.map(x=>x.event).filter(Boolean),['gtm.js']);
  pushAnalytics({event:'page_view'});assert.equal(window.dataLayer.at(-1).event,'page_view');
  applyConsent('denied');assert.equal(window['ga-disable-G-193MG85HSP'],true);
  const count=window.dataLayer.length;pushAnalytics({event:'generate_lead'});assert.equal(window.dataLayer.length,count);
  assert(cookies.some(c=>c.startsWith('_ga=;')));assert(cookies.some(c=>c.startsWith('_ga_193MG85HSP=;')));assert(!cookies.some(c=>c.startsWith('functional=')));
  applyConsent('granted');assert.equal(scripts.length,1);assert.equal(window.dataLayer.filter(x=>x.event==='generate_lead').length,0);
  const before=window.dataLayer.length;applyConsent('granted');assert.equal(window.dataLayer.length,before);
  assert.deepEqual(JSON.parse(store.get(consentKey)),{version:1,analytics:'granted'});
  assert.deepEqual(events.map(e=>e.detail.allowed),[true,false,true]);
});
