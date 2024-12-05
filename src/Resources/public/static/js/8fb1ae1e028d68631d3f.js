(window["webpackJsonpPlugintorq-dynamic-access-evolved"]=window["webpackJsonpPlugintorq-dynamic-access-evolved"]||[]).push([[372],{786:function(){},372:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return i}}),t(702);let{Criteria:r}=Shopware.Data;var i={template:'\n<div class="torq-dynamic-access-evolved-or-container">\n    <template v-for="(q,index) in filter.queries">\n        <div\n            v-if="index > 0"\n            class="condition-content__spacer--or"\n        >\n            {{ $tc(\'torq-dynamic-access-evolved.detail.conditions.or\') }}\n        </div>\n        <torq-dynamic-access-evolved-and-container \n            :filter="q" \n            :index="index"\n            @delete-or-condition="onDeleteOrCondition"\n        >\n        </torq-dynamic-access-evolved-and-container>\n    </template>\n\n    <div class="torq-dynamic-access-evolved-or-container__actions">\n        <sw-button\n            class="torq-dynamic-access-evolved-or-container__actions--or"\n            size="small"\n            variant="ghost"\n            @click="addCondition"\n            :disabled="!acl.can(\'torq_dynamic_access_evolved.editor\')" \n        >\n            {{ $tc(\'torq-dynamic-access-evolved.detail.conditions.buttonAddOrGroup\') }}\n        </sw-button>        \n    </div>\n</div>\n',compatConfig:Shopware.compatConfig,emits:["on-selection"],inject:["acl"],props:{filter:{type:r.Filters,required:!1,default(){return null}}},data(){return{}},computed:{},watch:{},methods:{addCondition(){this.filter.queries.push(r.multi("AND",[]))},onDeleteOrCondition(e){this.filter.queries.splice(e,1)}}}},702:function(e,n,t){var r=t(786);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals),t(346).Z("dab58c68",r,!0,{})},346:function(e,n,t){"use strict";function r(e,n){for(var t=[],r={},i=0;i<n.length;i++){var o=n[i],a=o[0],s={id:e+":"+i,css:o[1],media:o[2],sourceMap:o[3]};r[a]?r[a].parts.push(s):t.push(r[a]={id:a,parts:[s]})}return t}t.d(n,{Z:function(){return v}});var i="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var o={},a=i&&(document.head||document.getElementsByTagName("head")[0]),s=null,d=0,c=!1,l=function(){},u=null,p="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function v(e,n,t,i){c=t,u=i||{};var a=r(e,n);return h(a),function(n){for(var t=[],i=0;i<a.length;i++){var s=o[a[i].id];s.refs--,t.push(s)}n?h(a=r(e,n)):a=[];for(var i=0;i<t.length;i++){var s=t[i];if(0===s.refs){for(var d=0;d<s.parts.length;d++)s.parts[d]();delete o[s.id]}}}}function h(e){for(var n=0;n<e.length;n++){var t=e[n],r=o[t.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](t.parts[i]);for(;i<t.parts.length;i++)r.parts.push(g(t.parts[i]));r.parts.length>t.parts.length&&(r.parts.length=t.parts.length)}else{for(var a=[],i=0;i<t.parts.length;i++)a.push(g(t.parts[i]));o[t.id]={id:t.id,refs:1,parts:a}}}}function m(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function g(e){var n,t,r=document.querySelector("style["+p+'~="'+e.id+'"]');if(r){if(c)return l;r.parentNode.removeChild(r)}if(f){var i=d++;n=b.bind(null,r=s||(s=m()),i,!1),t=b.bind(null,r,i,!0)}else n=q.bind(null,r=m()),t=function(){r.parentNode.removeChild(r)};return n(e),function(r){r?(r.css!==e.css||r.media!==e.media||r.sourceMap!==e.sourceMap)&&n(e=r):t()}}var y=function(){var e=[];return function(n,t){return e[n]=t,e.filter(Boolean).join("\n")}}();function b(e,n,t,r){var i=t?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(n,i);else{var o=document.createTextNode(i),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(o,a[n]):e.appendChild(o)}}function q(e,n){var t=n.css,r=n.media,i=n.sourceMap;if(r&&e.setAttribute("media",r),u.ssrId&&e.setAttribute(p,n.id),i&&(t+="\n/*# sourceURL="+i.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}}]);