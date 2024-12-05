(window["webpackJsonpPlugintorq-dynamic-access-evolved"]=window["webpackJsonpPlugintorq-dynamic-access-evolved"]||[]).push([[129],{196:function(){},129:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return o}}),t(292);let{Criteria:i}=Shopware.Data;var o={template:'<div class="torq-dynamic-access-evolved-and-container">\n\n    <template v-for="(q,index) in filter.queries">\n        <div\n            v-if="index > 0"\n            class="condition-content__spacer--and"\n        >\n            {{ $tc(\'torq-dynamic-access-evolved.detail.conditions.and\') }}\n        </div>\n        <torq-dynamic-access-evolved-filter \n            :filter="q"\n            :index="index"\n            @delete-and-condition="onDeleteAndCondition"\n        >\n        </torq-dynamic-access-evolved-filter>\n    </template>\n\n    <div class="torq-dynamic-access-evolved-and-container__actions">\n        <sw-button\n            variant="ghost"\n            size="small"\n            class="torq-dynamic-access-evolved-and-container__actions--and"\n            @click="onAddAndCondition"\n        >\n            {{ $tc(\'torq-dynamic-access-evolved.detail.conditions.buttonAddAndCondition\') }}\n        </sw-button>\n\n        <sw-button\n            size="small"\n            class="torq-dynamic-access-evolved-and-container__actions--delete"\n            @click="onDeleteOrCondition"\n        >\n            {{ $tc(\'torq-dynamic-access-evolved.detail.conditions.buttonDeleteOrGroup\') }}\n        </sw-button>\n    </div>\n</div>\n',compatConfig:Shopware.compatConfig,emits:["deleteOrCondition"],props:{filter:{type:i.Filters,required:!1,default(){return null}},index:{type:Number,required:!0}},data(){return{}},computed:{},watch:{},methods:{onAddAndCondition(){this.filter.queries.push(i.equalsAny("",[]))},onDeleteOrCondition(){this.$emit("deleteOrCondition",this.index)},onDeleteAndCondition(e){this.filter.queries.splice(e,1)}}}},292:function(e,n,t){var i=t(196);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals),t(346).Z("66f2f53a",i,!0,{})},346:function(e,n,t){"use strict";function i(e,n){for(var t=[],i={},o=0;o<n.length;o++){var r=n[o],s=r[0],a={id:e+":"+o,css:r[1],media:r[2],sourceMap:r[3]};i[s]?i[s].parts.push(a):t.push(i[s]={id:s,parts:[a]})}return t}t.d(n,{Z:function(){return v}});var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var r={},s=o&&(document.head||document.getElementsByTagName("head")[0]),a=null,d=0,c=!1,l=function(){},u=null,f="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function v(e,n,t,o){c=t,u=o||{};var s=i(e,n);return h(s),function(n){for(var t=[],o=0;o<s.length;o++){var a=r[s[o].id];a.refs--,t.push(a)}n?h(s=i(e,n)):s=[];for(var o=0;o<t.length;o++){var a=t[o];if(0===a.refs){for(var d=0;d<a.parts.length;d++)a.parts[d]();delete r[a.id]}}}}function h(e){for(var n=0;n<e.length;n++){var t=e[n],i=r[t.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](t.parts[o]);for(;o<t.parts.length;o++)i.parts.push(y(t.parts[o]));i.parts.length>t.parts.length&&(i.parts.length=t.parts.length)}else{for(var s=[],o=0;o<t.parts.length;o++)s.push(y(t.parts[o]));r[t.id]={id:t.id,refs:1,parts:s}}}}function m(){var e=document.createElement("style");return e.type="text/css",s.appendChild(e),e}function y(e){var n,t,i=document.querySelector("style["+f+'~="'+e.id+'"]');if(i){if(c)return l;i.parentNode.removeChild(i)}if(p){var o=d++;n=C.bind(null,i=a||(a=m()),o,!1),t=C.bind(null,i,o,!0)}else n=b.bind(null,i=m()),t=function(){i.parentNode.removeChild(i)};return n(e),function(i){i?(i.css!==e.css||i.media!==e.media||i.sourceMap!==e.sourceMap)&&n(e=i):t()}}var g=function(){var e=[];return function(n,t){return e[n]=t,e.filter(Boolean).join("\n")}}();function C(e,n,t,i){var o=t?"":i.css;if(e.styleSheet)e.styleSheet.cssText=g(n,o);else{var r=document.createTextNode(o),s=e.childNodes;s[n]&&e.removeChild(s[n]),s.length?e.insertBefore(r,s[n]):e.appendChild(r)}}function b(e,n){var t=n.css,i=n.media,o=n.sourceMap;if(i&&e.setAttribute("media",i),u.ssrId&&e.setAttribute(f,n.id),o&&(t+="\n/*# sourceURL="+o.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}}]);