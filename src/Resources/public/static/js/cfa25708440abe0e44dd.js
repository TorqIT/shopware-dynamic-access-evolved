(window["webpackJsonpPlugintorq-dynamic-access-evolved"]=window["webpackJsonpPlugintorq-dynamic-access-evolved"]||[]).push([[522],{701:function(){},522:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return o}}),r(26);let{Component:n}=Shopware,{mapPropertyErrors:a}=n.getComponentHelper(),{EntityCollection:s,Criteria:i}=Shopware.Data;var o={template:'<sw-entity-multi-select\n        entity="product_manufacturer"\n        size="medium"\n        :entity-collection="manufacturers"\n        :criteria="manufacturerCriteria"\n        :context="manufacturerContext"\n        resultLimit="100"\n        @update:entity-collection="setIds"\n    >\n    \n</sw-entity-multi-select>',compatConfig:Shopware.compatConfig,emits:["on-selection"],inject:["repositoryFactory"],props:{filter:{type:i.Filters,required:!0}},data(){return{manufacturers:null,manufacturerIds:""==this.filter.value?[]:this.filter.value.split("|")}},computed:{manufacturerCriteria(){let e=new i(1,100);return e.addSorting(i.sort("name")),e},manufacturerContext(){return{...Shopware.Context.api,inheritance:!0}},manufacturerRepository(){return this.repositoryFactory.create("product_manufacturer")}},watch:{},created(){this.createdComponent()},methods:{createdComponent(){if(this.manufacturers=new s(this.manufacturerRepository.route,this.manufacturerRepository.entityName,this.manufacturerContext),this.manufacturerIds.length<=0)return Promise.resolve();let e=new i(1,25);return e.addSorting(i.sort("name")),e.setIds(this.manufacturerIds),this.manufacturerRepository.search(e,this.manufacturerContext).then(e=>{this.manufacturers=e})},setIds(e){this.manufacturerIds=e.getIds(),this.manufacturers=e,this.filter.value=e.getIds().join("|")}}}},26:function(e,t,r){var n=r(701);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),r(346).Z("decc3d42",n,!0,{})},346:function(e,t,r){"use strict";function n(e,t){for(var r=[],n={},a=0;a<t.length;a++){var s=t[a],i=s[0],o={id:e+":"+a,css:s[1],media:s[2],sourceMap:s[3]};n[i]?n[i].parts.push(o):r.push(n[i]={id:i,parts:[o]})}return r}r.d(t,{Z:function(){return m}});var a="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!a)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s={},i=a&&(document.head||document.getElementsByTagName("head")[0]),o=null,u=0,c=!1,d=function(){},l=null,f="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function m(e,t,r,a){c=r,l=a||{};var i=n(e,t);return h(i),function(t){for(var r=[],a=0;a<i.length;a++){var o=s[i[a].id];o.refs--,r.push(o)}t?h(i=n(e,t)):i=[];for(var a=0;a<r.length;a++){var o=r[a];if(0===o.refs){for(var u=0;u<o.parts.length;u++)o.parts[u]();delete s[o.id]}}}}function h(e){for(var t=0;t<e.length;t++){var r=e[t],n=s[r.id];if(n){n.refs++;for(var a=0;a<n.parts.length;a++)n.parts[a](r.parts[a]);for(;a<r.parts.length;a++)n.parts.push(g(r.parts[a]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{for(var i=[],a=0;a<r.parts.length;a++)i.push(g(r.parts[a]));s[r.id]={id:r.id,refs:1,parts:i}}}}function v(){var e=document.createElement("style");return e.type="text/css",i.appendChild(e),e}function g(e){var t,r,n=document.querySelector("style["+f+'~="'+e.id+'"]');if(n){if(c)return d;n.parentNode.removeChild(n)}if(p){var a=u++;t=C.bind(null,n=o||(o=v()),a,!1),r=C.bind(null,n,a,!0)}else t=w.bind(null,n=v()),r=function(){n.parentNode.removeChild(n)};return t(e),function(n){n?(n.css!==e.css||n.media!==e.media||n.sourceMap!==e.sourceMap)&&t(e=n):r()}}var y=function(){var e=[];return function(t,r){return e[t]=r,e.filter(Boolean).join("\n")}}();function C(e,t,r,n){var a=r?"":n.css;if(e.styleSheet)e.styleSheet.cssText=y(t,a);else{var s=document.createTextNode(a),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(s,i[t]):e.appendChild(s)}}function w(e,t){var r=t.css,n=t.media,a=t.sourceMap;if(n&&e.setAttribute("media",n),l.ssrId&&e.setAttribute(f,t.id),a&&(r+="\n/*# sourceURL="+a.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}}}]);