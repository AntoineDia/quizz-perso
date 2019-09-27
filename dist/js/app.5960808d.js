(function(n){function t(t){for(var s,a,r=t[0],u=t[1],l=t[2],d=0,g=[];d<r.length;d++)a=r[d],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&g.push(i[a][0]),i[a]=0;for(s in u)Object.prototype.hasOwnProperty.call(u,s)&&(n[s]=u[s]);c&&c(t);while(g.length)g.shift()();return o.push.apply(o,l||[]),e()}function e(){for(var n,t=0;t<o.length;t++){for(var e=o[t],s=!0,r=1;r<e.length;r++){var u=e[r];0!==i[u]&&(s=!1)}s&&(o.splice(t--,1),n=a(a.s=e[0]))}return n}var s={},i={app:0},o=[];function a(t){if(s[t])return s[t].exports;var e=s[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=n,a.c=s,a.d=function(n,t,e){a.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},a.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},a.t=function(n,t){if(1&t&&(n=a(n)),8&t)return n;if(4&t&&"object"===typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(a.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var s in n)a.d(e,s,function(t){return n[t]}.bind(null,s));return e},a.n=function(n){var t=n&&n.__esModule?function(){return n["default"]}:function(){return n};return a.d(t,"a",t),t},a.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},a.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],u=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var c=u;o.push([0,"chunk-vendors"]),e()})({0:function(n,t,e){n.exports=e("56d7")},"034f":function(n,t,e){"use strict";var s=e("1765"),i=e.n(s);i.a},1511:function(n,t,e){"use strict";var s=e("87a9"),i=e.n(s);i.a},1765:function(n,t,e){},"56d7":function(n,t,e){"use strict";e.r(t);e("8605"),e("7382"),e("a34d"),e("0c51");var s=e("2b0e"),i=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{attrs:{id:"app"}},[0===Object.keys(n.config).length?e("div",{staticClass:"row max"},[e("h1",[n._v("Questionary")]),e("label",[n._v("Previous")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:n.oldJson,expression:"oldJson"}],attrs:{rows:"5",placeholder:"Enter a questionary config JSON"},domProps:{value:n.oldJson},on:{input:function(t){t.target.composing||(n.oldJson=t.target.value)}}}),e("br"),e("button",{on:{click:n.loadConfig}},[n._v("Load")]),e("br"),e("br"),e("button",{on:{click:function(t){n.config=n.Questionary()}}},[n._v("\n      New")])]):e("div",[e("div",{staticClass:"row"},[e("h1",[n._v("Main")]),e("div",{staticClass:"labelInput content"},[e("label",[n._v("Name")]),e("input",{directives:[{name:"model",rawName:"v-model",value:n.config.name,expression:"config.name"}],attrs:{placeholder:"Name of the questionary"},domProps:{value:n.config.name},on:{input:function(t){t.target.composing||n.$set(n.config,"name",t.target.value)}}})])]),e("div",{staticClass:"row"},[e("h1",[n._v("Languages")]),e("div",{staticClass:"content langs"},n._l(n.langs,(function(t){return e("div",{key:t,staticClass:"lang",on:{click:function(e){return n.removeLang(t)}}},[n._v(n._s(t))])})),0),e("input",{directives:[{name:"model",rawName:"v-model",value:n.newLang,expression:"newLang"}],staticClass:"gluedRigth tinyInput",class:{langError:n.langError},attrs:{placeholder:"Language",maxlength:"2"},domProps:{value:n.newLang},on:{keyup:function(t){return!t.type.indexOf("key")&&n._k(t.keyCode,"enter",13,t.key,"Enter")?null:n.addLangage(t)},input:function(t){t.target.composing||(n.newLang=t.target.value)}}}),e("button",{staticClass:"gluedLeft",on:{click:n.addLangage}},[n._v("Add")])]),e("div",{staticClass:"row"},[e("h1",[n._v("Questions")]),n.langs[0]?e("Questions",{attrs:{questions:n.config.questions,langs:n.langs}}):e("p",[n._v("Add a language to edit questions")])],1)]),Object.keys(n.config).length>0?e("div",{staticClass:"row max"},[e("button",{on:{click:n.save}},[n._v("GET JSON")])]):n._e()])},o=[],a=(e("2435"),e("1595"),e("d19f"),e("e4f3"),function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[n._l(n.questionsInAllLangs,(function(t,s){return e("div",{key:t[s],attrs:{id:"questions"}},[e("div",{staticClass:"inline"},[e("div",{staticClass:"tileLang",staticStyle:{visibility:"hidden"}},[n._v("hh")]),e("label",[n._v("Question "+n._s(s+1))])]),n._l(t,(function(t,s){return e("div",{key:s,staticClass:"questionTitle",class:[n.translationMode||s===n.langs[0]?"":"height0"]},[e("div",{staticClass:"tileLang gluedRigth",class:n.translationMode?"intoAnimation":"",on:{click:function(n){return n.target.nextElementSibling.focus()}}},[n._v(n._s(s))]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.question,expression:"question.question"}],staticClass:"inputQuestion gluedAll",attrs:{type:"text",placeholder:"What to ask?"},domProps:{value:t.question},on:{input:function(e){e.target.composing||n.$set(t,"question",e.target.value)}}}),e("button",{staticClass:"edit expand gluedLeft"}),e("button",{staticClass:"edit translation gluedRigth",on:{click:function(t){n.translationMode=!n.translationMode}}}),e("button",{staticClass:"edit delete gluedLeft"})])}))],2)})),e("div",[e("button",{staticClass:"add",on:{click:n.addQuestion}},[n._v("Add question")])])],2)}),r=[],u=(e("6ecd"),{name:"Questions",data:function(){return{translationMode:!1}},props:["questions","langs"],computed:{questionsInAllLangs:function(){var n=this;return this.questions[this.langs[0]].map((function(t,e){return n.langs.reduce((function(t,s){return t[s]=n.questions[s][e],t}),{})}))}},methods:{addQuestion:function(){var n=this;this.langs.forEach((function(t){n.questions[t].push(n.$parent.Question())}),{})}}}),l=u,c=(e("1511"),e("ea2e")),d=Object(c["a"])(l,a,r,!1,null,null,null),g=d.exports,f={name:"App",components:{Questions:g},data:function(){return{oldJson:"",defaultLangs:["fr","en","es","ba","de"],langs:[],config:{},newLang:"",langError:!1}},computed:{lang0:function(){return this.langs?this.langs[0]:null},currentQuestionId:function(){return this.config.questions?this.config.questions[this.lang0].length:0}},methods:{loadConfig:function(){try{this.config=JSON.parse(this.old)}catch(n){alert("JSON Incorect")}},Questionary:function(){this.langs=this.defaultLangs;var n=this;return{name:"",questions:n.defaultLangs.reduce((function(t,e){return t[e]=[n.Question()],t}),{})}},Question:function(){var n=this;return{id:"q"+n.currentQuestionId,question:"",next:"",max:1,min:1,col:2,row:1,options:[n.Answer(),n.Answer()]}},Answer:function(){return{src:"",tags:[],next:""}},removeLang:function(n){this.langs.splice(this.langs.indexOf(n),1),delete this.config.questions[n]},addLangage:function(){if(this.newLang=this.newLang.toLowerCase(),this.newLang.length<2||~this.langs.indexOf(this.newLang)){var n=this;return setTimeout((function(){n.langError=!1}),2e3),this.langError=!0}this.langs.push(this.newLang),this.$set(this.config.questions,this.newLang,[]),this.fillQuestions(this.newLang),this.newLang=""},fillQuestions:function(n){var t=this;this.config.questions[this.lang0].forEach((function(e,s){t.$set(t.config.questions[n],s,t.Question()),t.config.questions[n][s].id="q"+s}))},save:function(){console.log("Vue model",this),console.log("config",this.config)}}},p=f,h=(e("034f"),Object(c["a"])(p,i,o,!1,null,null,null)),v=h.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(n){return n(v)}}).$mount("#app")},"87a9":function(n,t,e){}});
//# sourceMappingURL=app.5960808d.js.map