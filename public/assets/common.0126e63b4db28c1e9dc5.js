(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"+dTB":function(n,e,t){"use strict";t.d(e,"b",function(){return g}),t.d(e,"a",function(){return b});var o=t("0IaG"),i=t("fXoL"),s=t("ofXK"),r=t("bTqV"),a=t("sYmb");function c(n,e){1&n&&(i.Ub(0,"button",5),i.Ac(1),i.gc(2,"translate"),i.Tb()),2&n&&(i.lc("mat-dialog-close",!0),i.Db(1),i.Bc(i.hc(2,2,"confirm.ok")))}function l(n,e){1&n&&(i.Ub(0,"button",6),i.Ac(1),i.gc(2,"translate"),i.Tb()),2&n&&(i.Db(1),i.Bc(i.hc(2,1,"confirm.cancel")))}const d=function(n){return{titleKey:n}},h=function(n){return{messageKey:n}};let u=(()=>{class n{constructor(n){this.data=n}}return n.\u0275fac=function(e){return new(e||n)(i.Ob(o.a))},n.\u0275cmp=i.Ib({type:n,selectors:[["app-confirm-modal"]],decls:10,vars:14,consts:[["mat-dialog-title",""],[1,"mat-typography"],[1,"actions"],["mat-button","","color","primary","cdkFocusInitial","",3,"mat-dialog-close",4,"ngIf"],["mat-button","","mat-dialog-close","","color","warn",4,"ngIf"],["mat-button","","color","primary","cdkFocusInitial","",3,"mat-dialog-close"],["mat-button","","mat-dialog-close","","color","warn"]],template:function(n,e){1&n&&(i.Ub(0,"h2",0),i.Ac(1),i.gc(2,"translate"),i.Tb(),i.Ub(3,"mat-dialog-content",1),i.Ub(4,"p"),i.Ac(5),i.gc(6,"translate"),i.Tb(),i.Tb(),i.Ub(7,"mat-dialog-actions",2),i.zc(8,c,3,4,"button",3),i.zc(9,l,3,3,"button",4),i.Tb()),2&n&&(i.Db(1),i.Bc(i.ic(2,4,e.data.titleI18n,i.nc(10,d,e.data.titleKeyI18n))),i.Db(4),i.Bc(i.ic(6,7,e.data.messageI18n,i.nc(12,h,e.data.messageKeyI18n))),i.Db(3),i.lc("ngIf",e.data.confirmBtn),i.Db(1),i.lc("ngIf",e.data.cancelBtn))},directives:[o.g,o.e,o.c,s.l,r.b,o.d],pipes:[a.c],styles:[".actions[_ngcontent-%COMP%]{justify-content:flex-end}"],changeDetection:0}),n})(),g=(()=>{class n{constructor(n){this.dialog=n}openDialog(n){return this.dialog.open(u,{data:n}).afterClosed()}}return n.\u0275fac=function(e){return new(e||n)(i.Yb(o.b))},n.\u0275prov=i.Kb({token:n,factory:n.\u0275fac}),n})(),b=(()=>{class n{}return n.\u0275mod=i.Mb({type:n}),n.\u0275inj=i.Lb({factory:function(e){return new(e||n)},providers:[g],imports:[[s.c,o.f,r.c,a.b]]}),n})()},KVI4:function(n,e,t){"use strict";t.d(e,"a",function(){return r});var o=t("fXoL"),i=t("3Pt+"),s=t("fB2i");let r=(()=>{class n{constructor(){this.initSettings=this.getEditorSettings()}set height(n){this.initSettings=this.getEditorSettings(n)}writeValue(n){n!==this.innerValue&&(this.innerValue=n)}registerOnChange(n){this.onChangeCallback=n}registerOnTouched(){}onChange(){this.onChangeCallback(this.text)}getEditorSettings(n=400){return{height:n||400,menubar:!1,force_br_newlines:!0,force_p_newlines:!1,forced_root_block:"",formats:{underline:{inline:"u",exact:!0},strikethrough:{inline:"del",exact:!0}},style_formats:[{title:"Pre",format:"pre"}],valid_children:"body[span,strong,em,u,del]",plugins:["code help wordcount emoticons"],toolbar:"undo redo | styleselect | bold italic underline strikethrough | emoticons | removeformat | code",init_instance_callback:()=>{document.querySelector(".tox .tox-notification--in").style.display="none"}}}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=o.Ib({type:n,selectors:[["app-format-editor"]],inputs:{label:"label",height:"height"},features:[o.Cb([{provide:i.j,useExisting:Object(o.W)(()=>n),multi:!0}])],decls:3,vars:3,consts:[[3,"init","ngModel","ngModelChange"]],template:function(n,e){1&n&&(o.Ub(0,"label"),o.Ac(1),o.Tb(),o.Ub(2,"editor",0),o.bc("ngModelChange",function(n){return e.text=n})("ngModelChange",function(){return e.onChange()}),o.Tb()),2&n&&(o.Db(1),o.Bc(e.label),o.Db(1),o.lc("init",e.initSettings)("ngModel",e.text))},directives:[s.a,i.l,i.o],styles:["[_nghost-%COMP%]{display:block;padding-bottom:1rem}[_nghost-%COMP%]   label[_ngcontent-%COMP%]{display:block;padding-bottom:.5rem}"]}),n})()},fB2i:function(n,e,t){"use strict";t.d(e,"a",function(){return v}),t.d(e,"b",function(){return D});var o=t("fXoL"),i=t("ofXK"),s=t("3Pt+");function r(n,e){}const a=()=>{const n="undefined"!=typeof window?window:void 0;return n&&n.tinymce?n.tinymce:null};let c=(()=>{class n{constructor(){this.onBeforePaste=new o.o,this.onBlur=new o.o,this.onClick=new o.o,this.onContextMenu=new o.o,this.onCopy=new o.o,this.onCut=new o.o,this.onDblclick=new o.o,this.onDrag=new o.o,this.onDragDrop=new o.o,this.onDragEnd=new o.o,this.onDragGesture=new o.o,this.onDragOver=new o.o,this.onDrop=new o.o,this.onFocus=new o.o,this.onFocusIn=new o.o,this.onFocusOut=new o.o,this.onKeyDown=new o.o,this.onKeyPress=new o.o,this.onKeyUp=new o.o,this.onMouseDown=new o.o,this.onMouseEnter=new o.o,this.onMouseLeave=new o.o,this.onMouseMove=new o.o,this.onMouseOut=new o.o,this.onMouseOver=new o.o,this.onMouseUp=new o.o,this.onPaste=new o.o,this.onSelectionChange=new o.o,this.onActivate=new o.o,this.onAddUndo=new o.o,this.onBeforeAddUndo=new o.o,this.onBeforeExecCommand=new o.o,this.onBeforeGetContent=new o.o,this.onBeforeRenderUI=new o.o,this.onBeforeSetContent=new o.o,this.onChange=new o.o,this.onClearUndos=new o.o,this.onDeactivate=new o.o,this.onDirty=new o.o,this.onExecCommand=new o.o,this.onGetContent=new o.o,this.onHide=new o.o,this.onInit=new o.o,this.onInitNgModel=new o.o,this.onLoadContent=new o.o,this.onNodeChange=new o.o,this.onPostProcess=new o.o,this.onPostRender=new o.o,this.onPreInit=new o.o,this.onPreProcess=new o.o,this.onProgressState=new o.o,this.onRedo=new o.o,this.onRemove=new o.o,this.onReset=new o.o,this.onSaveContent=new o.o,this.onSetAttrib=new o.o,this.onObjectResizeStart=new o.o,this.onObjectResized=new o.o,this.onObjectSelected=new o.o,this.onSetContent=new o.o,this.onShow=new o.o,this.onSubmit=new o.o,this.onUndo=new o.o,this.onVisualAid=new o.o}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275dir=o.Jb({type:n,outputs:{onBeforePaste:"onBeforePaste",onBlur:"onBlur",onClick:"onClick",onContextMenu:"onContextMenu",onCopy:"onCopy",onCut:"onCut",onDblclick:"onDblclick",onDrag:"onDrag",onDragDrop:"onDragDrop",onDragEnd:"onDragEnd",onDragGesture:"onDragGesture",onDragOver:"onDragOver",onDrop:"onDrop",onFocus:"onFocus",onFocusIn:"onFocusIn",onFocusOut:"onFocusOut",onKeyDown:"onKeyDown",onKeyPress:"onKeyPress",onKeyUp:"onKeyUp",onMouseDown:"onMouseDown",onMouseEnter:"onMouseEnter",onMouseLeave:"onMouseLeave",onMouseMove:"onMouseMove",onMouseOut:"onMouseOut",onMouseOver:"onMouseOver",onMouseUp:"onMouseUp",onPaste:"onPaste",onSelectionChange:"onSelectionChange",onActivate:"onActivate",onAddUndo:"onAddUndo",onBeforeAddUndo:"onBeforeAddUndo",onBeforeExecCommand:"onBeforeExecCommand",onBeforeGetContent:"onBeforeGetContent",onBeforeRenderUI:"onBeforeRenderUI",onBeforeSetContent:"onBeforeSetContent",onChange:"onChange",onClearUndos:"onClearUndos",onDeactivate:"onDeactivate",onDirty:"onDirty",onExecCommand:"onExecCommand",onGetContent:"onGetContent",onHide:"onHide",onInit:"onInit",onInitNgModel:"onInitNgModel",onLoadContent:"onLoadContent",onNodeChange:"onNodeChange",onPostProcess:"onPostProcess",onPostRender:"onPostRender",onPreInit:"onPreInit",onPreProcess:"onPreProcess",onProgressState:"onProgressState",onRedo:"onRedo",onRemove:"onRemove",onReset:"onReset",onSaveContent:"onSaveContent",onSetAttrib:"onSetAttrib",onObjectResizeStart:"onObjectResizeStart",onObjectResized:"onObjectResized",onObjectSelected:"onObjectSelected",onSetContent:"onSetContent",onShow:"onShow",onSubmit:"onSubmit",onUndo:"onUndo",onVisualAid:"onVisualAid"}}),n})();const l=["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"],d=(n,e)=>"string"==typeof n?n.split(",").map(n=>n.trim()):Array.isArray(n)?n:e;let h=0;const u=n=>{const e=(new Date).getTime(),t=Math.floor(1e9*Math.random());return h++,n+"_"+t+h+String(e)},g=n=>void 0!==n&&"textarea"===n.tagName.toLowerCase(),b=n=>void 0===n||""===n?[]:Array.isArray(n)?n:n.split(" "),m=()=>{},p=n=>null==n,f=()=>({listeners:[],scriptId:u("tiny-script"),scriptLoaded:!1}),w=(()=>{let n=f();return{load:(e,t,o)=>{n.scriptLoaded?o():(n.listeners.push(o),e.getElementById(n.scriptId)||((e,t,o,i)=>{const s=t.createElement("script");s.referrerPolicy="origin",s.type="application/javascript",s.id=e,s.src=o;const r=()=>{s.removeEventListener("load",r),n.listeners.forEach(n=>n()),n.scriptLoaded=!0};s.addEventListener("load",r),t.head&&t.head.appendChild(s)})(n.scriptId,e,t))},reinitialize:()=>{n=f()}}})(),C=new o.s("TINYMCE_SCRIPT_SRC"),y={provide:s.j,useExisting:Object(o.W)(()=>v),multi:!0};let v=(()=>{class n extends c{constructor(n,e,t,o){super(),this.platformId=t,this.tinymceScriptSrc=o,this.cloudChannel="5",this.apiKey="no-api-key",this.id="",this.modelEvents="change input undo redo",this.onTouchedCallback=m,this.onChangeCallback=m,this._elementRef=n,this.ngZone=e,this.initialise=this.initialise.bind(this)}set disabled(n){this._disabled=n,this._editor&&this._editor.initialized&&this._editor.setMode(n?"readonly":"design")}get disabled(){return this._disabled}get editor(){return this._editor}writeValue(n){this._editor&&this._editor.initialized?this._editor.setContent(p(n)?"":n):this.initialValue=null===n?void 0:n}registerOnChange(n){this.onChangeCallback=n}registerOnTouched(n){this.onTouchedCallback=n}setDisabledState(n){this._editor?this._editor.setMode(n?"readonly":"design"):n&&(this.init=Object.assign(Object.assign({},this.init),{readonly:!0}))}ngAfterViewInit(){Object(i.s)(this.platformId)&&(this.id=this.id||u("tiny-angular"),this.inline=void 0!==this.inline?"boolean"!=typeof this.inline||this.inline:this.init&&this.init.inline,this.createElement(),null!==a()?this.initialise():this._element&&this._element.ownerDocument&&w.load(this._element.ownerDocument,this.getScriptSrc(),this.initialise))}ngOnDestroy(){null!==a()&&a().remove(this._editor)}createElement(){this._element=document.createElement(this.inline?"string"==typeof this.tagName?this.tagName:"div":"textarea"),this._element&&(this._element.id=this.id,g(this._element)&&(this._element.style.visibility="hidden"),this._elementRef.nativeElement.appendChild(this._element))}initialise(){const n=Object.assign(Object.assign({},this.init),{target:this._element,inline:this.inline,readonly:this.disabled,plugins:(e=this.init&&this.init.plugins,t=this.plugins,b(e).concat(b(t))),toolbar:this.toolbar||this.init&&this.init.toolbar,setup:n=>{this._editor=n,n.on("init",e=>{this.initEditor(n)}),((n,e)=>{(n=>{const e=d(n.ignoreEvents,[]);return d(n.allowedEvents,l).filter(n=>l.includes(n)&&!e.includes(n))})(n).forEach(t=>{const o=n[t];e.on(t.substring(2),t=>n.ngZone.run(()=>o.emit({event:t,editor:e})))})})(this,n),this.init&&"function"==typeof this.init.setup&&this.init.setup(n)}});var e,t;g(this._element)&&(this._element.style.visibility=""),this.ngZone.runOutsideAngular(()=>{a().init(n)})}getScriptSrc(){return p(this.tinymceScriptSrc)?`https://cdn.tiny.cloud/1/${this.apiKey}/tinymce/${this.cloudChannel}/tinymce.min.js`:this.tinymceScriptSrc}initEditor(n){n.on("blur",()=>this.ngZone.run(()=>this.onTouchedCallback())),n.on(this.modelEvents,()=>{this.ngZone.run(()=>this.onChangeCallback(n.getContent({format:this.outputFormat})))}),"string"==typeof this.initialValue&&this.ngZone.run(()=>{n.setContent(this.initialValue),n.getContent()!==this.initialValue&&this.onChangeCallback(n.getContent({format:this.outputFormat})),void 0!==this.onInitNgModel&&this.onInitNgModel.emit(n)})}}return n.\u0275fac=function(e){return new(e||n)(o.Ob(o.l),o.Ob(o.B),o.Ob(o.D),o.Ob(C,8))},n.\u0275cmp=o.Ib({type:n,selectors:[["editor"]],inputs:{cloudChannel:"cloudChannel",apiKey:"apiKey",id:"id",modelEvents:"modelEvents",disabled:"disabled",initialValue:"initialValue",init:"init",inline:"inline",outputFormat:"outputFormat",tagName:"tagName",plugins:"plugins",toolbar:"toolbar",allowedEvents:"allowedEvents",ignoreEvents:"ignoreEvents"},features:[o.Cb([y]),o.Ab],decls:1,vars:0,template:function(n,e){1&n&&o.zc(0,r,0,0,"ng-template")},styles:["[_nghost-%COMP%] { display: block; }"]}),n})(),D=(()=>{class n{}return n.\u0275mod=o.Mb({type:n}),n.\u0275inj=o.Lb({factory:function(e){return new(e||n)},imports:[[i.c,s.h]]}),n})()},xoVn:function(n,e,t){"use strict";t.d(e,"a",function(){return a});var o=t("ofXK"),i=t("fB2i"),s=t("3Pt+"),r=t("fXoL");let a=(()=>{class n{}return n.\u0275mod=r.Mb({type:n}),n.\u0275inj=r.Lb({factory:function(e){return new(e||n)},imports:[[o.c,s.h,i.b]]}),n})()}}]);