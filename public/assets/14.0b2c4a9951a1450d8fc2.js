(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{lD6O:function(t,e,i){"use strict";i.r(e),i.d(e,"OperationsModule",function(){return G});var a=i("ofXK"),n=i("sYmb"),o=i("Wp6s"),s=i("NFeN"),r=i("bTqV"),c=i("qFsG"),l=i("3Pt+"),b=i("tyNb"),p=i("4evo"),u=i("ULOc"),d=i("PSzV"),m=i("M0ag"),h=i("5+tZ"),f=i("nYR2"),g=i("1G5W"),C=i("XNiG"),I=i("i/bw"),N=function(t){return t[t.IN_PAY=1]="IN_PAY",t[t.SUCCESS=2]="SUCCESS",t[t.ERROR=3]="ERROR",t[t.IN_SEND_CHECK=4]="IN_SEND_CHECK",t[t.ON_CHECK=5]="ON_CHECK",t[t.CANCEL=6]="CANCEL",t}({});const S={[N.IN_PAY]:"text-black",[N.SUCCESS]:"text-accent",[N.ERROR]:"text-warn",[N.IN_SEND_CHECK]:"text-gray",[N.ON_CHECK]:"text-gray",[N.CANCEL]:"text-gray"};var A=i("YMfE"),O=i("sKXY");const E=[{name:"id",nameI18n:"operations.table.id",type:O.g.STRING,sort:!0,allowedForRoles:[I.d.SUPER_ADMIN,I.d.ADMIN]},{name:"username",value:t=>Object(A.c)(t.telegramUser),nameI18n:"operations.table.username",type:O.g.STRING,allowedForRoles:[I.d.SUPER_ADMIN,I.d.ADMIN]},{name:"amount",nameI18n:"operations.table.amount",type:O.g.STRING,sort:!0,allowedForRoles:[I.d.SUPER_ADMIN,I.d.ADMIN]},{name:"price",nameI18n:"operations.table.price",type:O.g.STRING,sort:!0,allowedForRoles:[I.d.SUPER_ADMIN,I.d.ADMIN]},{name:"status",nameI18n:"operations.table.status",type:O.g.STRING,class:t=>S[t.status],translate:t=>`operation.status.${t.status}`,sort:!0,allowedForRoles:[I.d.SUPER_ADMIN,I.d.ADMIN]},{name:"info",nameI18n:"table.action.info",type:O.g.STRING,actionData:{link:t=>`/operations/${null==t?void 0:t.id}/info`,actionType:O.f.LINK,eventType:O.e.INFO},allowedForRoles:[I.d.SUPER_ADMIN,I.d.ADMIN]}];var U=i("fXoL"),D=i("FwLO"),R=i("Pfez"),T=i("kmnG"),y=i("U5Oo"),v=i("mETp");function F(t,e){1&t&&U.Pb(0,"app-loading-spinner")}function _(t,e){if(1&t){const t=U.Vb();U.Ub(0,"button",19),U.bc("click",function(){return U.sc(t),U.fc().setSuccess()}),U.Ac(1),U.gc(2,"translate"),U.Tb()}2&t&&(U.Db(1),U.Bc(U.hc(2,1,"operation.info.confirmBtn")))}function q(t,e){if(1&t){const t=U.Vb();U.Ub(0,"button",19),U.bc("click",function(){return U.sc(t),U.fc().setCancel()}),U.Ac(1),U.gc(2,"translate"),U.Tb()}2&t&&(U.Db(1),U.Bc(U.hc(2,1,"operation.info.operatorBtn")))}function w(t,e){if(1&t){const t=U.Vb();U.Ub(0,"button",20),U.bc("click",function(){return U.sc(t),U.fc().setToOperator()}),U.Ac(1),U.gc(2,"translate"),U.Tb()}2&t&&(U.Db(1),U.Bc(U.hc(2,1,"operation.info.cancelBtn")))}const P=function(){return["/operations"]},L=function(t){return{user:t}},B=function(t){return["/settings/requisites",t,"info"]};let k=(()=>{class t{constructor(t,e,i){this.route=t,this.uiFacade=e,this.operationApiService=i,this.OPERATION_CLASS=S,this.EOperationStatus=N,this.destroy$=new C.a,this.form=new l.f({comment:new l.d("")})}ngOnInit(){this.inRequest=!0,this.route.paramMap.pipe(Object(h.a)(t=>this.operationApiService.getOperation(+t.get("id")).pipe(Object(f.a)(()=>this.inRequest=!1))),Object(g.a)(this.destroy$)).subscribe(t=>{this.operation=t,this.initFormData()})}addComment(){this.inRequest=!0;const t=this.form.get("comment").value;this.operationApiService.addComment(this.operation.id,t).pipe(Object(f.a)(()=>this.inRequest=!1),Object(g.a)(this.destroy$)).subscribe(t=>{this.operation=t.data,this.initFormData(),this.uiFacade.addInfoNotification(t.message)},t=>this.uiFacade.addErrorNotification(t.message))}setSuccess(){this.inRequest=!0,this.operationApiService.setSuccess(this.operation.id).pipe(Object(f.a)(()=>this.inRequest=!1),Object(g.a)(this.destroy$)).subscribe(t=>this.uiFacade.addInfoNotification(t.message),t=>this.uiFacade.addErrorNotification(t.message))}setCancel(){this.inRequest=!0,this.operationApiService.setCancel(this.operation.id).pipe(Object(f.a)(()=>this.inRequest=!1),Object(g.a)(this.destroy$)).subscribe(t=>this.uiFacade.addInfoNotification(t.message),t=>this.uiFacade.addErrorNotification(t.message))}setToOperator(){this.inRequest=!0,this.operationApiService.setToOperator(this.operation.id).pipe(Object(f.a)(()=>this.inRequest=!1),Object(g.a)(this.destroy$)).subscribe(t=>this.uiFacade.addInfoNotification(t.message),t=>this.uiFacade.addErrorNotification(t.message))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}initFormData(){this.form.patchValue({comment:this.operation.comment})}}return t.\u0275fac=function(e){return new(e||t)(U.Ob(b.a),U.Ob(I.f),U.Ob(D.d))},t.\u0275cmp=U.Ib({type:t,selectors:[["app-operation-info"]],decls:71,vars:60,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],[4,"ngIf"],[1,"info-table-block"],[1,"item"],[1,"title"],[1,"value"],[3,"routerLink","queryParams"],[3,"routerLink"],[1,"value",3,"ngClass"],[1,"item","item-form-group"],[1,"form-group"],["appearance","fill"],["formControlName","comment","matInput",""],[1,"form-group","btn-group"],["mat-raised-button","","color","primary",3,"disabled"],["type","button","mat-raised-button","","color","basic",3,"click",4,"ngIf"],["type","button","mat-raised-button","","color","warn",3,"click",4,"ngIf"],["type","button","mat-raised-button","","color","basic",3,"click"],["type","button","mat-raised-button","","color","warn",3,"click"]],template:function(t,e){1&t&&(U.Ub(0,"app-page-content"),U.Sb(1,0),U.Ac(2),U.gc(3,"translate"),U.Ub(4,"i"),U.Ac(5),U.Tb(),U.Rb(),U.Sb(6,1),U.Ub(7,"form",2),U.bc("ngSubmit",function(){return e.addComment()}),U.zc(8,F,1,0,"app-loading-spinner",3),U.Ub(9,"section",4),U.Ub(10,"div",5),U.Ub(11,"p",6),U.Ac(12),U.gc(13,"translate"),U.Tb(),U.Ub(14,"p",7),U.Ac(15),U.Tb(),U.Tb(),U.Ub(16,"div",5),U.Ub(17,"p",6),U.Ac(18),U.gc(19,"translate"),U.Tb(),U.Ub(20,"p",7),U.Ac(21),U.Tb(),U.Tb(),U.Ub(22,"div",5),U.Ub(23,"p",6),U.Ac(24),U.gc(25,"translate"),U.Tb(),U.Ub(26,"p",7),U.Ub(27,"a",8),U.Ac(28),U.gc(29,"userName"),U.Tb(),U.Tb(),U.Tb(),U.Ub(30,"div",5),U.Ub(31,"p",6),U.Ac(32),U.gc(33,"translate"),U.Tb(),U.Ub(34,"p",7),U.Ub(35,"a",9),U.Ac(36),U.Tb(),U.Tb(),U.Tb(),U.Ub(37,"div",5),U.Ub(38,"p",6),U.Ac(39),U.gc(40,"translate"),U.Tb(),U.Ub(41,"p",7),U.Ac(42),U.Tb(),U.Tb(),U.Ub(43,"div",5),U.Ub(44,"p",6),U.Ac(45),U.gc(46,"translate"),U.Tb(),U.Ub(47,"p",7),U.Ac(48),U.gc(49,"date"),U.Tb(),U.Tb(),U.Ub(50,"div",5),U.Ub(51,"p",6),U.Ac(52),U.gc(53,"translate"),U.Tb(),U.Ub(54,"p",10),U.Ac(55),U.gc(56,"translate"),U.Tb(),U.Tb(),U.Ub(57,"div",11),U.Ub(58,"div",12),U.Ub(59,"mat-form-field",13),U.Ub(60,"mat-label"),U.Ac(61),U.gc(62,"translate"),U.Tb(),U.Pb(63,"textarea",14),U.Tb(),U.Tb(),U.Tb(),U.Tb(),U.Ub(64,"div",15),U.Ub(65,"button",16),U.Ac(66),U.gc(67,"translate"),U.Tb(),U.zc(68,_,3,3,"button",17),U.zc(69,q,3,3,"button",17),U.zc(70,w,3,3,"button",18),U.Tb(),U.Tb(),U.Rb(),U.Tb()),2&t&&(U.Db(2),U.Cc(" ",U.hc(3,28,"operation.info.pageTitle")," "),U.Db(3),U.Cc("#",null==e.operation?null:e.operation.id,""),U.Db(2),U.lc("formGroup",e.form),U.Db(1),U.lc("ngIf",e.inRequest),U.Db(4),U.Bc(U.hc(13,30,"operation.info.amount")),U.Db(3),U.Bc(null==e.operation?null:e.operation.amount),U.Db(3),U.Bc(U.hc(19,32,"operation.info.price")),U.Db(3),U.Bc(null==e.operation?null:e.operation.price),U.Db(3),U.Bc(U.hc(25,34,"operation.info.user")),U.Db(3),U.lc("routerLink",U.mc(55,P))("queryParams",U.nc(56,L,null==e.operation?null:e.operation.telegramUserId)),U.Db(1),U.Bc(U.hc(29,36,null==e.operation?null:e.operation.telegramUser)),U.Db(4),U.Bc(U.hc(33,38,"operation.info.detail")),U.Db(3),U.lc("routerLink",U.nc(58,B,null==e.operation?null:e.operation.bankDetailId)),U.Db(1),U.Bc(null==e.operation||null==e.operation.bankDetails?null:e.operation.bankDetails.title),U.Db(3),U.Bc(U.hc(40,40,"operation.info.btcAddress")),U.Db(3),U.Bc(null==e.operation?null:e.operation.btcAddress),U.Db(3),U.Bc(U.hc(46,42,"operation.info.date")),U.Db(3),U.Bc(U.ic(49,44,null==e.operation?null:e.operation.createdAt,"d.MM.yyyy hh:mm")),U.Db(4),U.Bc(U.hc(53,47,"operation.info.status")),U.Db(2),U.lc("ngClass",e.OPERATION_CLASS[null==e.operation?null:e.operation.status]),U.Db(1),U.Bc(U.hc(56,49,"operation.status."+(null==e.operation?null:e.operation.status))),U.Db(6),U.Bc(U.hc(62,51,"operation.info.comment")),U.Db(4),U.lc("disabled",e.form.invalid),U.Db(1),U.Bc(U.hc(67,53,"operation.info.saveBtn")),U.Db(2),U.lc("ngIf",(null==e.operation?null:e.operation.status)===e.EOperationStatus.ON_CHECK),U.Db(1),U.lc("ngIf",(null==e.operation?null:e.operation.status)===e.EOperationStatus.ON_CHECK),U.Db(1),U.lc("ngIf",(null==e.operation?null:e.operation.status)===e.EOperationStatus.ON_CHECK))},directives:[R.a,l.s,l.m,l.g,a.l,b.g,a.j,T.c,T.f,l.c,c.b,l.l,l.e,r.b,y.a],pipes:[n.c,v.a,a.e],encapsulation:2}),t})();var M=i("zp1y"),j=i("uhkJ"),K=i("7FcC");const H=[{path:"",component:(()=>{class t{constructor(t,e,i,a){this.route=t,this.adminFacade=e,this.uiFacade=i,this.operationApiService=a,this.operations=[],this.initFilterValues=[],this.tableColumns=E,this.destroy$=new C.a}ngOnInit(){this.route.queryParams.pipe(Object(g.a)(this.destroy$)).subscribe(t=>{void 0!==t.user&&(this.userId=+t.user,this.initFilterValues.push({name:"telegramUserId",value:this.userId+""})),this.initFilterFields()})}getOperationsList(t=this.requestApiQuery){this.requestApiQuery=t,this.inRequest=!0,this.operationApiService.getList(t).pipe(Object(M.a)(this.adminFacade.admin$),Object(f.a)(()=>this.inRequest=!1),Object(g.a)(this.destroy$)).subscribe(([t,e])=>{this.operations=t.data,this.paginator={length:t.total,page:t.currentPage,pageSize:t.pageSize}},t=>{this.uiFacade.addErrorNotification(t.message)})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}initFilterFields(){this.filterFields=[{labelI18n:"operations.table.telegramUserId",name:"telegramUserId",type:j.a.INPUT},{labelI18n:"operations.table.username",name:"telegramUserName",type:j.a.INPUT},{labelI18n:"operations.table.status",name:"status",type:j.a.SELECT,options:[{value:N.IN_PAY,titleI18n:"operation.status."+N.IN_PAY,class:S[N.IN_PAY]},{value:N.SUCCESS,titleI18n:"operation.status."+N.SUCCESS,class:S[N.SUCCESS]},{value:N.ERROR,titleI18n:"operation.status."+N.ERROR,class:S[N.ERROR]},{value:N.IN_SEND_CHECK,titleI18n:"operation.status."+N.IN_SEND_CHECK,class:S[N.IN_SEND_CHECK]},{value:N.ON_CHECK,titleI18n:"operation.status."+N.ON_CHECK,class:S[N.ON_CHECK]},{value:N.CANCEL,titleI18n:"operation.status."+N.CANCEL,class:S[N.CANCEL]}]}]}}return t.\u0275fac=function(e){return new(e||t)(U.Ob(b.a),U.Ob(I.a),U.Ob(I.f),U.Ob(D.d))},t.\u0275cmp=U.Ib({type:t,selectors:[["app-operations"]],decls:4,vars:9,consts:[[3,"tableColumns","inRequest","items","filterFields","initFilterValues","paginator","getList"],["table-title",""]],template:function(t,e){1&t&&(U.Ub(0,"app-page-content-table",0),U.bc("getList",function(t){return e.getOperationsList(t)}),U.Sb(1,1),U.Ac(2),U.gc(3,"translate"),U.Rb(),U.Tb()),2&t&&(U.lc("tableColumns",e.tableColumns)("inRequest",e.inRequest)("items",e.operations)("filterFields",e.filterFields)("initFilterValues",e.initFilterValues)("paginator",e.paginator),U.Db(2),U.Cc(" ",U.hc(3,7,"operations.tableHeader.title")," "))},directives:[K.a],pipes:[n.c],encapsulation:2}),t})()},{path:":id/info",component:k}];let $=(()=>{class t{}return t.\u0275mod=U.Mb({type:t}),t.\u0275inj=U.Lb({factory:function(e){return new(e||t)},imports:[[b.h.forChild(H)],b.h]}),t})(),G=(()=>{class t{}return t.\u0275mod=U.Mb({type:t}),t.\u0275inj=U.Lb({factory:function(e){return new(e||t)},imports:[[a.c,o.d,s.b,r.c,c.c,l.q,n.b,b.h,$,m.a,d.a,u.a,p.a]]}),t})()}}]);