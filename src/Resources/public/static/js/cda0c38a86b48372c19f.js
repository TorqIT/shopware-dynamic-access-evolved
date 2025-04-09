(window["webpackJsonpPlugintorq-dynamic-access-evolved"]=window["webpackJsonpPlugintorq-dynamic-access-evolved"]||[]).push([[574],{489:function(){},574:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return s}}),n(422);var s={template:'<div\n    v-bind="$attrs"\n    class="torq-dynamic-access-evolved-empty-state-hero"\n>\n    <div class="torq-dynamic-access-evolved-empty-state-hero__column-content">\n\n        <h1 class="torq-dynamic-access-evolved-empty-state-hero__title">\n            {{ title }}\n        </h1>\n\n        <div\n            v-if="showDescription"\n            class="torq-dynamic-access-evolved-empty-state-hero__description"\n        >\n            {{ description }}\n        </div>\n\n        <div\n            v-if="actionSlotsAvailable"\n            class="torq-dynamic-access-evolved-empty-state-hero__actions"\n        >\n            <slot name="actions">\n            </slot>\n        </div>\n\n    </div>\n\n    <div class="torq-dynamic-access-evolved-empty-state-hero__column-image">\n        <img\n            class="torq-dynamic-access-evolved-empty-state-hero__asset"\n            :src="assetFilter(imagePath)"\n            alt=""\n        >\n    </div>\n</div>',compatConfig:Shopware.compatConfig,props:{title:{type:String,required:!0},assetPath:{type:String,required:!1,default:""},description:{type:String,required:!1,default:""},hideDescription:{type:Boolean,required:!1,default:!1}},computed:{imagePath(){return this.assetPath||"/administration/static/img/empty-states/promotion-v2-empty-state-hero.svg"},showDescription(){return!this.hideDescription&&this.description&&this.description.length>0},assetFilter(){return Shopware.Filter.getByName("asset")},actionSlotsAvailable(){return this.isCompatEnabled("INSTANCE_SCOPED_SLOTS")?!!this.$slots.actions||!!this.$scopedSlots.actions:!!this.$slots.actions}}}},422:function(e,t,n){var s=n(489);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[e.id,s,""]]),s.locals&&(e.exports=s.locals),(0,n(534).A)("57b4ba15",s,!0,{})},534:function(e,t,n){"use strict";function s(e,t){for(var n=[],s={},r=0;r<t.length;r++){var i=t[r],a=i[0],o={id:e+":"+r,css:i[1],media:i[2],sourceMap:i[3]};s[a]?s[a].parts.push(o):n.push(s[a]={id:a,parts:[o]})}return n}n.d(t,{A:function(){return f}});var r,i="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var a={},o=i&&(document.head||document.getElementsByTagName("head")[0]),c=null,d=0,l=!1,p=function(){},u=null,v="data-vue-ssr-id",h="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function f(e,t,n,r){l=n,u=r||{};var i=s(e,t);return m(i),function(t){for(var n=[],r=0;r<i.length;r++){var o=a[i[r].id];o.refs--,n.push(o)}t?m(i=s(e,t)):i=[];for(var r=0;r<n.length;r++){var o=n[r];if(0===o.refs){for(var c=0;c<o.parts.length;c++)o.parts[c]();delete a[o.id]}}}}function m(e){for(var t=0;t<e.length;t++){var n=e[t],s=a[n.id];if(s){s.refs++;for(var r=0;r<s.parts.length;r++)s.parts[r](n.parts[r]);for(;r<n.parts.length;r++)s.parts.push(y(n.parts[r]));s.parts.length>n.parts.length&&(s.parts.length=n.parts.length)}else{for(var i=[],r=0;r<n.parts.length;r++)i.push(y(n.parts[r]));a[n.id]={id:n.id,refs:1,parts:i}}}}function g(){var e=document.createElement("style");return e.type="text/css",o.appendChild(e),e}function y(e){var t,n,s=document.querySelector("style["+v+'~="'+e.id+'"]');if(s){if(l)return p;s.parentNode.removeChild(s)}if(h){var r=d++;t=S.bind(null,s=c||(c=g()),r,!1),n=S.bind(null,s,r,!0)}else t=C.bind(null,s=g()),n=function(){s.parentNode.removeChild(s)};return t(e),function(s){s?(s.css!==e.css||s.media!==e.media||s.sourceMap!==e.sourceMap)&&t(e=s):n()}}var b=(r=[],function(e,t){return r[e]=t,r.filter(Boolean).join("\n")});function S(e,t,n,s){var r=n?"":s.css;if(e.styleSheet)e.styleSheet.cssText=b(t,r);else{var i=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function C(e,t){var n=t.css,s=t.media,r=t.sourceMap;if(s&&e.setAttribute("media",s),u.ssrId&&e.setAttribute(v,t.id),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}}]);