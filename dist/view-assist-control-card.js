function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var a;const c=window,h=c.trustedTypes,d=h?h.emptyScript:"",u=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>e!==t&&(e==e||t==t),_={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:v},$="finalized";let f=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||_}static finalize(){if(this.hasOwnProperty($))return!1;this[$]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(i=>{const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=_){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;f[$]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:f}),(null!==(a=c.reactiveElementVersions)&&void 0!==a?a:c.reactiveElementVersions=[]).push("1.6.3");const m=window,y=m.trustedTypes,A=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,b="$lit$",E=`lit$${(Math.random()+"").slice(9)}$`,w="?"+E,S=`<${w}>`,C=document,x=()=>C.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,H="[ \t\n\f\r]",k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,O=/>/g,N=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),M=/'/g,R=/"/g,j=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),z=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),D=new WeakMap,B=C.createTreeWalker(C,129,null,!1);function I(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=k;for(let e=0;e<i;e++){const i=t[e];let l,a,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,a=r.exec(i),null!==a);)h=r.lastIndex,r===k?"!--"===a[1]?r=T:void 0!==a[1]?r=O:void 0!==a[2]?(j.test(a[2])&&(n=RegExp("</"+a[2],"g")),r=N):void 0!==a[3]&&(r=N):r===N?">"===a[0]?(r=null!=n?n:k,c=-1):void 0===a[1]?c=-2:(c=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?N:'"'===a[3]?R:M):r===R||r===M?r=N:r===T||r===O?r=k:(r=N,n=void 0);const d=r===N&&t[e+1].startsWith("/>")?" ":"";o+=r===k?i+S:c>=0?(s.push(l),i.slice(0,c)+b+i.slice(c)+E+d):i+E+(-2===c?(s.push(void 0),e):d)}return[I(t,o+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,l=this.parts,[a,c]=W(t,e);if(this.el=q.createElement(a,i),B.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=B.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(b)||e.startsWith(E)){const i=c[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+b).split(E),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?G:"?"===e[1]?X:"@"===e[1]?Y:F})}else l.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(j.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=y?y.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],x()),B.nextNode(),l.push({type:2,index:++n});s.append(t[e],x())}}}else if(8===s.nodeType)if(s.data===w)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)l.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){var n,o,r,l;if(e===z)return e;let a=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const c=P(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==c&&(null===(o=null==a?void 0:a._$AO)||void 0===o||o.call(a,!1),void 0===c?a=void 0:(a=new c(t),a._$AT(t,i,s)),void 0!==s?(null!==(r=(l=i)._$Co)&&void 0!==r?r:l._$Co=[])[s]=a:i._$Cl=a),void 0!==a&&(e=K(t,a._$AS(t,e.values),a,s)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:C).importNode(i,!0);B.currentNode=n;let o=B.nextNode(),r=0,l=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Z(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new tt(o,this,t)),this._$AV.push(e),a=s[++l]}r!==(null==a?void 0:a.index)&&(o=B.nextNode(),r++)}return B.currentNode=C,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{constructor(t,e,i,s){var n;this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),P(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>U(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==V&&P(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=q.createElement(I(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new J(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=D.get(t.strings);return void 0===e&&D.set(t.strings,e=new q(t)),e}T(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Z(this.k(x()),this.k(x()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class F{constructor(t,e,i,s,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=K(this,t,e,0),o=!P(t)||t!==this._$AH&&t!==z,o&&(this._$AH=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=K(this,s[i+r],e,r),l===z&&(l=this._$AH[r]),o||(o=!P(l)||l!==this._$AH[r]),l===V?t=V:t!==V&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends F{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}const Q=y?y.emptyScript:"";class X extends F{constructor(){super(...arguments),this.type=4}j(t){t&&t!==V?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends F{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=K(this,t,e,0))&&void 0!==i?i:V)===z)return;const s=this._$AH,n=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==V&&(s===V||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const et=m.litHtmlPolyfillSupport;null==et||et(q,Z),(null!==(g=m.litHtmlVersions)&&void 0!==g?g:m.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,st;class nt extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new Z(e.insertBefore(x(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return z}}nt.finalized=!0,nt._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:nt});const ot=globalThis.litElementPolyfillSupport;null==ot||ot({LitElement:nt}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e),lt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function at(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):lt(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ct(t){return at({...t,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ht;null===(ht=window.HTMLSlotElement)||void 0===ht||ht.prototype.assignedElements;let dt=class extends nt{setConfig(t){t.device_id,this.config=t}render(){if(!this.hass||!this.config)return L``;const t=this.config.device_name||this.config.device_id||"Unconfigured";return L`
      <ha-card header="View Assist Control">
        <div class="card-content">
          <div class="row">
            <mwc-button @click=${this._set5MinTimer} raised>
              <ha-icon icon="mdi:timer-outline"></ha-icon>
              5 Min
            </mwc-button>
             <mwc-button @click=${this._set15MinTimer} raised>
              <ha-icon icon="mdi:timer-outline"></ha-icon>
              15 Min
            </mwc-button>
          </div>
          <div class="info">
            Targeting: ${t}
          </div>
        </div>
      </ha-card>
    `}_set5MinTimer(){this.hass.callService("view_assist","set_timer",{time:"5 minutes",device_id:this.config.device_id})}_set15MinTimer(){this.hass.callService("view_assist","set_timer",{time:"15 minutes",device_id:this.config.device_id})}static get styles(){return r`
      .card-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }
      .row {
        display: flex;
        justify-content: space-around;
      }
      .info {
        font-size: 0.8em;
        color: var(--secondary-text-color);
        text-align: center;
      }
      mwc-button {
        --mdc-theme-primary: var(--primary-color);
        background-color: var(--primary-color); 
        color: white;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
      }
      ha-icon {
        margin-right: 8px;
        --mdc-icon-size: 20px;
      }
    `}static getConfigElement(){return document.createElement("view-assist-control-card-editor")}static getStubConfig(){return{device_id:""}}};t([at({attribute:!1})],dt.prototype,"hass",void 0),t([ct()],dt.prototype,"config",void 0),dt=t([rt("view-assist-control-card")],dt);let ut=class extends nt{constructor(){super(...arguments),this._devices=[]}setConfig(t){this.config=t}firstUpdated(){this._loadDevices()}async _loadDevices(){if(this.hass)try{const t=await this.hass.callWS({type:"config/device_registry/list"});this._devices=t.filter(t=>{const e=(t.model||"").toLowerCase(),i=(t.name||"").toLowerCase(),s=(t.manufacturer||"").toLowerCase();return!e.includes("(integration)")&&!i.includes("(integration)")&&(!i.includes("companion app")&&(!(!e.includes("satellite")&&!i.includes("satellite"))||"view assist"===s&&!e.includes("integration")))}).map(t=>({id:t.id,name:t.name_by_user||t.name||"Unknown Satellite"}))}catch(t){console.error("Error loading devices",t)}}_valueChanged(t){if(!this.config||!this.hass)return;const e=t.target;if(this.config[e.configValue]===e.value)return;const i=Object.assign({},this.config);if(i[e.configValue]=e.value,"device_id"===e.configValue){const t=this._devices.find(t=>t.id===e.value);t&&(i.device_name=t.name)}this.config=i;const s=new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0});this.dispatchEvent(s)}render(){if(!this.hass||!this.config)return L``;const t=this.config.device_id||"";return L`
      <div class="card-config">
        <label id="device-label">Select Satellite</label>
        <select
          .value=${t}
          .configValue=${"device_id"}
          @change=${this._valueChanged}
          style="width: 100%; padding: 8px; border-radius: 4px;"
        >
          <option value="" disabled ?selected=${""===t}>Select a device...</option>
          ${this._devices.map(e=>L`<option value=${e.id} ?selected=${t===e.id}>${e.name}</option>`)}
        </select>
        
        ${0===this._devices.length?L`<p class="warning">No "View Assist" devices found.</p>`:""}
      </div>
    `}static get styles(){return r`
        .card-config { padding: 16px; }
        label { display: block; margin-bottom: 8px; font-weight: bold; }
        .warning { color: var(--error-color); font-size: 0.9em; }
        select { border: 1px solid var(--divider-color); }
      `}};t([at({attribute:!1})],ut.prototype,"hass",void 0),t([ct()],ut.prototype,"config",void 0),t([ct()],ut.prototype,"_devices",void 0),ut=t([rt("view-assist-control-card-editor")],ut),window.customCards=window.customCards||[],window.customCards.push({type:"view-assist-control-card",name:"View Assist Control",preview:!0,description:"Control timers for View Assist Satellites"});export{dt as ViewAssistControlCard,ut as ViewAssistControlCardEditor};
