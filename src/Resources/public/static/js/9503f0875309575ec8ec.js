(window["webpackJsonpPlugintorq-dynamic-access-evolved"]=window["webpackJsonpPlugintorq-dynamic-access-evolved"]||[]).push([[522],{701:function(){},522:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return o}}),r(26);let{Component:n}=Shopware,{mapPropertyErrors:a}=n.getComponentHelper(),{EntityCollection:i,Criteria:s}=Shopware.Data;var o={template:'<sw-entity-multi-select\n    entity="product_manufacturer"\n    size="medium"\n    :entity-collection="manufacturers"\n    :criteria="manufacturerCriteria"\n    :context="manufacturerContext"\n    resultLimit="100"\n    @update:entity-collection="setIds"\n    :disabled="!acl.can(\'torq_dynamic_access_evolved.editor\')" \n    :selectionDisablingMethod="isSelectionDisabled"\n/>',compatConfig:Shopware.compatConfig,emits:["on-selection"],inject:["repositoryFactory","acl"],props:{filter:{type:s.Filters,required:!0}},data(){return{manufacturers:null,manufacturerIds:""==this.filter.value?[]:this.filter.value.split("|")}},computed:{manufacturerCriteria(){let e=new s(1,100);return e.addSorting(s.sort("name")),e},manufacturerContext(){return{...Shopware.Context.api,inheritance:!0}},manufacturerRepository(){return this.repositoryFactory.create("product_manufacturer")}},watch:{},created(){this.createdComponent()},methods:{createdComponent(){if(this.manufacturers=new i(this.manufacturerRepository.route,this.manufacturerRepository.entityName,this.manufacturerContext),this.manufacturerIds.length<=0)return Promise.resolve();let e=new s(1,25);return e.addSorting(s.sort("name")),e.setIds(this.manufacturerIds),this.manufacturerRepository.search(e,this.manufacturerContext).then(e=>{this.manufacturers=e})},setIds(e){this.manufacturerIds=e.getIds(),this.manufacturers=e,this.filter.value=e.getIds().join("|")},isSelectionDisabled(){return!this.acl.can("torq_dynamic_access_evolved.editor")}}}},26:function(e,t,r){var n=r(701);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),r(346).Z("decc3d42",n,!0,{})},346:function(e,t,r){"use strict";function n(e,t){for(var r=[],n={},a=0;a<t.length;a++){var i=t[a],s=i[0],o={id:e+":"+a,css:i[1],media:i[2],sourceMap:i[3]};n[s]?n[s].parts.push(o):r.push(n[s]={id:s,parts:[o]})}return r}r.d(t,{Z:function(){return m}});var a="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!a)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},s=a&&(document.head||document.getElementsByTagName("head")[0]),o=null,u=0,c=!1,d=function(){},l=null,f="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function m(e,t,r,a){c=r,l=a||{};var s=n(e,t);return h(s),function(t){for(var r=[],a=0;a<s.length;a++){var o=i[s[a].id];o.refs--,r.push(o)}t?h(s=n(e,t)):s=[];for(var a=0;a<r.length;a++){var o=r[a];if(0===o.refs){for(var u=0;u<o.parts.length;u++)o.parts[u]();delete i[o.id]}}}}function h(e){for(var t=0;t<e.length;t++){var r=e[t],n=i[r.id];if(n){n.refs++;for(var a=0;a<n.parts.length;a++)n.parts[a](r.parts[a]);for(;a<r.parts.length;a++)n.parts.push(g(r.parts[a]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{for(var s=[],a=0;a<r.parts.length;a++)s.push(g(r.parts[a]));i[r.id]={id:r.id,refs:1,parts:s}}}}function v(){var e=document.createElement("style");return e.type="text/css",s.appendChild(e),e}function g(e){var t,r,n=document.querySelector("style["+f+'~="'+e.id+'"]');if(n){if(c)return d;n.parentNode.removeChild(n)}if(p){var a=u++;t=C.bind(null,n=o||(o=v()),a,!1),r=C.bind(null,n,a,!0)}else t=w.bind(null,n=v()),r=function(){n.parentNode.removeChild(n)};return t(e),function(n){n?(n.css!==e.css||n.media!==e.media||n.sourceMap!==e.sourceMap)&&t(e=n):r()}}var y=function(){var e=[];return function(t,r){return e[t]=r,e.filter(Boolean).join("\n")}}();function C(e,t,r,n){var a=r?"":n.css;if(e.styleSheet)e.styleSheet.cssText=y(t,a);else{var i=document.createTextNode(a),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}function w(e,t){var r=t.css,n=t.media,a=t.sourceMap;if(n&&e.setAttribute("media",n),l.ssrId&&e.setAttribute(f,t.id),a&&(r+="\n/*# sourceURL="+a.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}}}]);