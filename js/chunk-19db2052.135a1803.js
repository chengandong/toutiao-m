(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-19db2052"],{"1e83":function(t,e,r){},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var n=r("1d80"),a=r("5899"),s="["+a+"]",i=RegExp("^"+s+s+"*"),u=RegExp(s+s+"*$"),c=function(t){return function(e){var r=String(n(e));return 1&t&&(r=r.replace(i,"")),2&t&&(r=r.replace(u,"")),r}};t.exports={start:c(1),end:c(2),trim:c(3)}},7156:function(t,e,r){var n=r("861d"),a=r("d2bb");t.exports=function(t,e,r){var s,i;return a&&"function"==typeof(s=e.constructor)&&s!==r&&n(i=s.prototype)&&i!==r.prototype&&a(t,i),t}},"86be":function(t,e,r){"use strict";var n=r("1e83"),a=r.n(n);a.a},a9e3:function(t,e,r){"use strict";var n=r("83ab"),a=r("da84"),s=r("94ca"),i=r("6eeb"),u=r("5135"),c=r("c6b6"),o=r("7156"),f=r("c04e"),l=r("d039"),d=r("7c73"),p=r("241c").f,v=r("06cf").f,_=r("9bf2").f,b=r("58a8").trim,h="Number",m=a[h],C=m.prototype,I=c(d(C))==h,E=function(t){var e,r,n,a,s,i,u,c,o=f(t,!1);if("string"==typeof o&&o.length>2)if(o=b(o),e=o.charCodeAt(0),43===e||45===e){if(r=o.charCodeAt(2),88===r||120===r)return NaN}else if(48===e){switch(o.charCodeAt(1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+o}for(s=o.slice(2),i=s.length,u=0;u<i;u++)if(c=s.charCodeAt(u),c<48||c>a)return NaN;return parseInt(s,n)}return+o};if(s(h,!m(" 0o1")||!m("0b1")||m("+0x1"))){for(var g,w=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof w&&(I?l((function(){C.valueOf.call(r)})):c(r)!=h)?o(new m(E(e)),r,w):E(e)},O=n?p(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;O.length>N;N++)u(m,g=O[N])&&!u(w,g)&&_(w,g,v(m,g));w.prototype=C,C.constructor=w,i(a,h,w)}},c24f:function(t,e,r){"use strict";r.d(e,"g",(function(){return a})),r.d(e,"h",(function(){return s})),r.d(e,"e",(function(){return i})),r.d(e,"d",(function(){return u})),r.d(e,"a",(function(){return c})),r.d(e,"b",(function(){return o})),r.d(e,"f",(function(){return f})),r.d(e,"j",(function(){return l})),r.d(e,"i",(function(){return d})),r.d(e,"c",(function(){return p}));var n=r("b775"),a=function(t){return Object(n["a"])({method:"POST",url:"/app/v1_0/authorizations",data:t})},s=function(t){return Object(n["a"])({method:"GET",url:"/app/v1_0/sms/codes/".concat(t)})},i=function(){return Object(n["a"])({method:"GET",url:"/app/v1_0/user"})},u=function(){return Object(n["a"])({method:"GET",url:"/app/v1_0/user/channels"})},c=function(t){return Object(n["a"])({method:"POST",url:"/app/v1_0/user/followings",data:{target:t}})},o=function(t){return Object(n["a"])({method:"DELETE",url:"/app/v1_0/user/followings/".concat(t)})},f=function(){return Object(n["a"])({method:"GET",url:"/app/v1_0/user/profile"})},l=function(t){return Object(n["a"])({method:"PATCH",url:"/app/v1_0/user/profile",data:t})},d=function(t){return Object(n["a"])({method:"PATCH",url:"/app/v1_0/user/photo",data:t})},p=function(t){return Object(n["a"])({method:"GET",url:"/app/v1_0/users/".concat(t)})}},e382:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"user-container"},[r("van-nav-bar",{staticClass:"app-nav-bar",attrs:{title:t.user.name,"left-arrow":""},on:{"click-left":function(e){return t.$router.back()}}}),r("user-info",{attrs:{user:t.user}})],1)},a=[],s=(r("a9e3"),r("96cf"),r("1da1")),i=r("c24f"),u=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"user-info"},[r("div",{staticClass:"row-warp"},[r("van-image",{staticClass:"col-img",attrs:{fit:"cover",round:"",src:t.user.photo},on:{click:function(e){return t.onPreviewImg(t.user.photo)}}}),r("div",{staticClass:"col-info"},[r("div",{staticClass:"row1"},[r("div",{staticClass:"item"},[r("div",{staticClass:"count"},[t._v(t._s(t.user.art_count))]),r("div",{staticClass:"text"},[t._v("发布")])]),r("div",{staticClass:"item"},[r("div",{staticClass:"count"},[t._v(t._s(t.user.follow_count))]),r("div",{staticClass:"text"},[t._v("关注")])]),r("div",{staticClass:"item"},[r("div",{staticClass:"count"},[t._v(t._s(t.user.fans_count))]),r("div",{staticClass:"text"},[t._v("粉丝")])]),r("div",{staticClass:"item"},[r("div",{staticClass:"count"},[t._v(t._s(t.user.like_count))]),r("div",{staticClass:"text"},[t._v("获赞")])])]),r("div",{staticClass:"row2"},[r("van-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.$router.push("/user/chat")}}},[t._v("私信")]),r("van-button",{attrs:{type:"info",size:"small"}},[t._v("关注")])],1)])],1),r("div",{staticClass:"intro-wrap"},[t.user.is_media?r("div",{staticClass:"media"},[r("span",[t._v("认证：")]),r("span",[t._v(t._s(t.user.certi))])]):t._e(),r("div",{staticClass:"intro"},[r("span",[t._v("简介：")]),r("span",[t._v(t._s(t.user.intro))])])])])},c=[],o=r("28a2"),f={name:"UserInfo",props:{user:{type:Object,required:!0}},data:function(){return{}},methods:{onPreviewImg:function(t){Object(o["a"])([t])}}},l=f,d=(r("86be"),r("2877")),p=Object(d["a"])(l,u,c,!1,null,"5a0262c0",null),v=p.exports,_={name:"UserIndex",components:{UserInfo:v},props:{userId:{type:[String,Number,Object],required:!0}},data:function(){return{user:{id:this.userId}}},created:function(){this.loadUser()},methods:{loadUser:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["c"])(t.userId);case 2:r=e.sent,n=r.data,t.user=n.data;case 5:case"end":return e.stop()}}),e)})))()}}},b=_,h=Object(d["a"])(b,n,a,!1,null,null,null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-19db2052.135a1803.js.map