(window["webpackJsonpPlugintorq-dynamic-access-evolved"]=window["webpackJsonpPlugintorq-dynamic-access-evolved"]||[]).push([[528],{521:function(){},528:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return a}}),r(558);let{Component:n}=Shopware,{mapPropertyErrors:o}=n.getComponentHelper(),{EntityCollection:s,Criteria:i}=Shopware.Data;var a={template:'<sw-entity-multi-select\n    entity="product"\n    size="medium"\n    :entity-collection="products"\n    :criteria="productCriteria"\n    :context="productContext"\n    advanced-selection-component="sw-advanced-selection-product"\n    @update:entity-collection="setIds"\n    :disabled="!acl.can(\'torq_dynamic_access_evolved.editor\')" \n    :selectionDisablingMethod="isSelectionDisabled"\n/>',compatConfig:Shopware.compatConfig,emits:["on-selection"],inject:["repositoryFactory","acl"],props:{filter:{type:i.Filters,required:!0}},data(){return{products:null,productIds:""==this.filter.value?[]:this.filter.value.split("|")}},computed:{productCriteria(){let e=new i(1,25);return e.addAssociation("options.group"),e},productContext(){return{...Shopware.Context.api,inheritance:!0}},productRepository(){return this.repositoryFactory.create("product")}},watch:{},created(){this.createdComponent()},methods:{createdComponent(){if(this.products=new s(this.productRepository.route,this.productRepository.entityName,this.productContext),this.productIds.length<=0)return Promise.resolve();let e=new i(1,25);return e.addAssociation("options.group"),e.setIds(this.productIds),this.productRepository.search(e,this.productContext).then(e=>{this.products=e})},setIds(e){this.productIds=e.getIds(),this.products=e,this.filter.value=e.getIds().join("|")},isSelectionDisabled(){return!this.acl.can("torq_dynamic_access_evolved.editor")}}}},558:function(e,t,r){var n=r(521);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,r(534).A)("067b36b5",n,!0,{})},534:function(e,t,r){"use strict";function n(e,t){for(var r=[],n={},o=0;o<t.length;o++){var s=t[o],i=s[0],a={id:e+":"+o,css:s[1],media:s[2],sourceMap:s[3]};n[i]?n[i].parts.push(a):r.push(n[i]={id:i,parts:[a]})}return r}r.d(t,{A:function(){return v}});var o,s="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!s)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},a=s&&(document.head||document.getElementsByTagName("head")[0]),d=null,c=0,u=!1,p=function(){},l=null,h="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function v(e,t,r,o){u=r,l=o||{};var s=n(e,t);return m(s),function(t){for(var r=[],o=0;o<s.length;o++){var a=i[s[o].id];a.refs--,r.push(a)}t?m(s=n(e,t)):s=[];for(var o=0;o<r.length;o++){var a=r[o];if(0===a.refs){for(var d=0;d<a.parts.length;d++)a.parts[d]();delete i[a.id]}}}}function m(e){for(var t=0;t<e.length;t++){var r=e[t],n=i[r.id];if(n){n.refs++;for(var o=0;o<n.parts.length;o++)n.parts[o](r.parts[o]);for(;o<r.parts.length;o++)n.parts.push(y(r.parts[o]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{for(var s=[],o=0;o<r.parts.length;o++)s.push(y(r.parts[o]));i[r.id]={id:r.id,refs:1,parts:s}}}}function g(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function y(e){var t,r,n=document.querySelector("style["+h+'~="'+e.id+'"]');if(n){if(u)return p;n.parentNode.removeChild(n)}if(f){var o=c++;t=b.bind(null,n=d||(d=g()),o,!1),r=b.bind(null,n,o,!0)}else t=w.bind(null,n=g()),r=function(){n.parentNode.removeChild(n)};return t(e),function(n){n?(n.css!==e.css||n.media!==e.media||n.sourceMap!==e.sourceMap)&&t(e=n):r()}}var C=(o=[],function(e,t){return o[e]=t,o.filter(Boolean).join("\n")});function b(e,t,r,n){var o=r?"":n.css;if(e.styleSheet)e.styleSheet.cssText=C(t,o);else{var s=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(s,i[t]):e.appendChild(s)}}function w(e,t){var r=t.css,n=t.media,o=t.sourceMap;if(n&&e.setAttribute("media",n),l.ssrId&&e.setAttribute(h,t.id),o&&(r+="\n/*# sourceURL="+o.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}}}]);