(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{vloQ:function(t,e,i){"use strict";i.r(e),i.d(e,"SettingsCommissionModule",function(){return L});var s=i("ofXK"),n=i("3Pt+"),o=i("bTqV"),r=i("kmnG"),a=i("qFsG"),c=i("NFeN"),m=i("sYmb"),b=i("ir1t"),l=i("+dTB"),p=i("ULOc"),d=i("4evo"),u=i("tyNb"),g=i("5+tZ"),h=i("1G5W"),f=i("XNiG"),v=i("LRne"),T=i("i/bw"),y=i("fXoL"),D=i("FwLO"),R=i("Pfez"),U=i("Kbm1");let I=(()=>{class t{constructor(t,e,i,s){this.router=t,this.route=e,this.settingApiService=i,this.uiFacade=s,this.errors={},this.destroy$=new f.a,this.form=new n.f({from:new n.d("",[n.r.required,n.r.min(0)]),to:new n.d("",[n.r.required,n.r.min(0)]),percent:new n.d("",[n.r.required,n.r.min(0)])})}ngOnInit(){this.inRequest=!0,this.route.paramMap.pipe(Object(g.a)(t=>{const e=+t.get("id");return e?this.settingApiService.getCommission(e):Object(v.a)({})}),Object(h.a)(this.destroy$)).subscribe(t=>{this.inRequest=!1,this.commission=t,this.form.patchValue({from:t.from,to:t.to,percent:t.percent})},t=>this.showError(t))}save(){const t=this.form.get("from").value,e=this.form.get("to").value,i=this.form.get("percent").value,s=Object.assign(Object.assign({},this.commission),{from:t,to:e,percent:i});this.commission.id?this.updateRequisite(s):this.addRequisite(s)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}updateRequisite(t){this.inRequest=!0,this.settingApiService.updateCommission(t).subscribe(()=>this.router.navigateByUrl("/settings/commissions"),t=>this.showError(t))}addRequisite(t){this.inRequest=!0,this.settingApiService.addCommission(t).subscribe(()=>this.router.navigateByUrl("/settings/commissions"),t=>this.showError(t))}showError(t){var e;this.inRequest=!1,this.errors=(null==t?void 0:t.errors)||{};for(const i of Object.keys(this.errors))null===(e=this.form.get(i))||void 0===e||e.setErrors({valid:!1});this.uiFacade.addErrorNotification(t.message)}}return t.\u0275fac=function(e){return new(e||t)(y.Ob(u.f),y.Ob(u.a),y.Ob(D.e),y.Ob(T.f))},t.\u0275cmp=y.Ib({type:t,selectors:[["app-settings-commission-edit"]],decls:34,vars:20,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group"],["appearance","fill"],["formControlName","from","type","number","min","0","step","0.0001","matInput",""],["name","from",3,"errors"],["formControlName","to","type","number","min","0","step","0.0015","matInput",""],["name","to",3,"errors"],["formControlName","percent","type","number","min","0","step","0.1","matInput",""],["name","percent",3,"errors"],["mat-raised-button","","color","primary",3,"disabled"]],template:function(t,e){1&t&&(y.Ub(0,"app-page-content"),y.Sb(1,0),y.Ac(2),y.gc(3,"translate"),y.Rb(),y.Sb(4,1),y.Ub(5,"form",2),y.bc("ngSubmit",function(){return e.save()}),y.Ub(6,"div",3),y.Ub(7,"mat-form-field",4),y.Ub(8,"mat-label"),y.Ac(9),y.gc(10,"translate"),y.Tb(),y.Pb(11,"input",5),y.Ub(12,"mat-error"),y.Pb(13,"app-input-error",6),y.Tb(),y.Tb(),y.Tb(),y.Ub(14,"div",3),y.Ub(15,"mat-form-field",4),y.Ub(16,"mat-label"),y.Ac(17),y.gc(18,"translate"),y.Tb(),y.Pb(19,"input",7),y.Ub(20,"mat-error"),y.Pb(21,"app-input-error",8),y.Tb(),y.Tb(),y.Tb(),y.Ub(22,"div",3),y.Ub(23,"mat-form-field",4),y.Ub(24,"mat-label"),y.Ac(25),y.gc(26,"translate"),y.Tb(),y.Pb(27,"input",9),y.Ub(28,"mat-error"),y.Pb(29,"app-input-error",10),y.Tb(),y.Tb(),y.Tb(),y.Ub(30,"div",3),y.Ub(31,"button",11),y.Ac(32),y.gc(33,"translate"),y.Tb(),y.Tb(),y.Tb(),y.Rb(),y.Tb()),2&t&&(y.Db(2),y.Cc(" ",y.hc(3,10,null!=e.commission&&e.commission.id?"settings.commissions.edit.pageTitle":"settings.commissions.new.pageTitle")," "),y.Db(3),y.lc("formGroup",e.form),y.Db(4),y.Bc(y.hc(10,12,"settings.commissions.edit.input.from")),y.Db(4),y.lc("errors",e.errors),y.Db(4),y.Bc(y.hc(18,14,"settings.commissions.edit.input.to")),y.Db(4),y.lc("errors",e.errors),y.Db(4),y.Bc(y.hc(26,16,"settings.commissions.edit.input.percent")),y.Db(4),y.lc("errors",e.errors),y.Db(2),y.lc("disabled",e.form.invalid||e.inRequest),y.Db(1),y.Bc(y.hc(33,18,"settings.commissions.edit.saveBtn")))},directives:[R.a,n.s,n.m,n.g,r.c,r.f,n.c,n.p,a.b,n.l,n.e,r.b,U.a,o.b],pipes:[m.c],styles:[".form[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);grid-column-gap:1.5rem}"]}),t})();var A=i("nYR2");const O=function(t){return["/settings/commissions",t,"edit"]};let S=(()=>{class t{constructor(t,e,i){this.route=t,this.settingApiService=e,this.uiFacade=i,this.destroy$=new f.a}ngOnInit(){this.route.paramMap.pipe(Object(g.a)(t=>this.settingApiService.getCommission(+t.get("id"))),Object(A.a)(()=>this.inRequest=!1),Object(h.a)(this.destroy$)).subscribe(t=>{this.commission=t},t=>{this.uiFacade.addErrorNotification(t.message)})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}}return t.\u0275fac=function(e){return new(e||t)(y.Ob(u.a),y.Ob(D.e),y.Ob(T.f))},t.\u0275cmp=y.Ib({type:t,selectors:[["app-settings-commission-info"]],decls:31,vars:21,consts:[["header",""],["actions",""],["mat-raised-button","","color","primary",3,"routerLink"],["content",""],[1,"info-table-block"],[1,"item"],[1,"title"],[1,"value"]],template:function(t,e){1&t&&(y.Ub(0,"app-page-content"),y.Sb(1,0),y.Ac(2),y.gc(3,"translate"),y.Rb(),y.Sb(4,1),y.Ub(5,"a",2),y.Ub(6,"mat-icon"),y.Ac(7,"edit"),y.Tb(),y.Ub(8,"span"),y.Ac(9),y.gc(10,"translate"),y.Tb(),y.Tb(),y.Rb(),y.Sb(11,3),y.Ub(12,"section",4),y.Ub(13,"div",5),y.Ub(14,"p",6),y.Ac(15),y.gc(16,"translate"),y.Tb(),y.Ub(17,"p",7),y.Ac(18),y.Tb(),y.Tb(),y.Ub(19,"div",5),y.Ub(20,"p",6),y.Ac(21),y.gc(22,"translate"),y.Tb(),y.Ub(23,"p",7),y.Ac(24),y.Tb(),y.Tb(),y.Ub(25,"div",5),y.Ub(26,"p",6),y.Ac(27),y.gc(28,"translate"),y.Tb(),y.Ub(29,"p",7),y.Ac(30),y.Tb(),y.Tb(),y.Tb(),y.Rb(),y.Tb()),2&t&&(y.Db(2),y.Cc(" ",y.hc(3,9,"settings.commissions.info.pageTitle")," "),y.Db(3),y.lc("routerLink",y.nc(19,O,null==e.commission?null:e.commission.id)),y.Db(4),y.Bc(y.hc(10,11,"settings.commissions.info.editBtn")),y.Db(6),y.Bc(y.hc(16,13,"settings.commissions.edit.input.from")),y.Db(3),y.Bc(null==e.commission?null:e.commission.from),y.Db(3),y.Bc(y.hc(22,15,"settings.commissions.edit.input.to")),y.Db(3),y.Bc(null==e.commission?null:e.commission.to),y.Db(3),y.Bc(y.hc(28,17,"settings.commissions.edit.input.percent")),y.Db(3),y.Bc(null==e.commission?null:e.commission.percent))},directives:[R.a,o.a,u.h,c.a],pipes:[m.c],encapsulation:2}),t})();var w=i("zp1y"),N=i("pLZG"),F=i("vkgz"),q=i("sKXY");const E=[{name:"from",nameI18n:"settings.commissions.table.from",type:q.g.STRING,sort:!0,allowedForRoles:[T.d.SUPER_ADMIN,T.d.ADMIN]},{name:"to",nameI18n:"settings.commissions.table.to",sort:!0,type:q.g.STRING,allowedForRoles:[T.d.SUPER_ADMIN,T.d.ADMIN]},{name:"percent",nameI18n:"settings.commissions.table.percent",type:q.g.STRING,sort:!0,allowedForRoles:[T.d.SUPER_ADMIN,T.d.ADMIN]},{name:"info",nameI18n:"table.action.info",type:q.g.STRING,actionData:{link:t=>`/settings/commissions/${null==t?void 0:t.id}/info`,actionType:q.f.LINK,eventType:q.e.INFO},allowedForRoles:[T.d.SUPER_ADMIN,T.d.ADMIN]},{name:"edit",nameI18n:"table.action.edit",type:q.g.STRING,actionData:{link:t=>`/settings/commissions/${null==t?void 0:t.id}/edit`,actionType:q.f.LINK,eventType:q.e.EDIT},allowedForRoles:[T.d.SUPER_ADMIN,T.d.ADMIN]},{name:"delete",nameI18n:"table.action.delete",type:q.g.STRING,actionData:{actionType:q.f.EVENT,eventType:q.e.DELETE},allowedForRoles:[T.d.SUPER_ADMIN,T.d.ADMIN]}];var C=i("7FcC");const M=[{path:"",component:(()=>{class t{constructor(t,e,i,s){this.adminFacade=t,this.uiFacade=e,this.confirmModalService=i,this.settingApiService=s,this.commissions=[],this.tableColumns=E,this.destroy$=new f.a}ngOnInit(){this.initFilterFields()}getSettingCommissionList(t=this.requestApiQuery){this.requestApiQuery=t,this.inRequest=!0,this.settingApiService.getCommissionList(t).pipe(Object(w.a)(this.adminFacade.admin$),Object(A.a)(()=>this.inRequest=!1),Object(h.a)(this.destroy$)).subscribe(([t,e])=>{this.commissions=t.data,this.paginator={length:t.total,page:t.currentPage,pageSize:t.pageSize}},t=>{this.uiFacade.addErrorNotification(t.message)})}setEventData(t){t.event===q.e.DELETE&&this.deleteCommission(t.data)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}deleteCommission(t){this.confirmModalService.openDialog({titleI18n:"confirm.deleteModal.title",titleKeyI18n:"",messageI18n:"confirm.deleteModal.message",messageKeyI18n:`${t.from} - ${t.to} : ${t.percent} %`,confirmBtn:!0,cancelBtn:!0}).pipe(Object(N.a)(t=>t),Object(F.a)(()=>this.inRequest=!0),Object(g.a)(()=>this.settingApiService.deleteCommission(t.id)),Object(A.a)(()=>this.inRequest=!1),Object(h.a)(this.destroy$)).subscribe(()=>{this.commissions=this.commissions.filter(e=>e.id!==t.id),this.getSettingCommissionList()},t=>{this.uiFacade.addErrorNotification(t.message)})}initFilterFields(){this.filterFields=[]}}return t.\u0275fac=function(e){return new(e||t)(y.Ob(T.a),y.Ob(T.f),y.Ob(l.b),y.Ob(D.e))},t.\u0275cmp=y.Ib({type:t,selectors:[["app-settings-commissions"]],decls:11,vars:11,consts:[[3,"tableColumns","inRequest","items","filterFields","paginator","getList","eventData"],["table-title",""],["table-actions",""],["mat-raised-button","","color","primary","disableRipple","true","routerLink","/settings/commissions/new",1,"nav-link"]],template:function(t,e){1&t&&(y.Ub(0,"app-page-content-table",0),y.bc("getList",function(t){return e.getSettingCommissionList(t)})("eventData",function(t){return e.setEventData(t)}),y.Sb(1,1),y.Ac(2),y.gc(3,"translate"),y.Rb(),y.Sb(4,2),y.Ub(5,"a",3),y.Ub(6,"mat-icon"),y.Ac(7,"add"),y.Tb(),y.Ub(8,"span"),y.Ac(9),y.gc(10,"translate"),y.Tb(),y.Tb(),y.Rb(),y.Tb()),2&t&&(y.lc("tableColumns",e.tableColumns)("inRequest",e.inRequest)("items",e.commissions)("filterFields",e.filterFields)("paginator",e.paginator),y.Db(2),y.Cc(" ",y.hc(3,7,"settings.commissions.tableHeader.title")," "),y.Db(7),y.Bc(y.hc(10,9,"settings.commissions.tableHeader.addBtn")))},directives:[C.a,o.a,u.h,c.a],pipes:[m.c],encapsulation:2}),t})()},{path:"new",component:I},{path:":id/edit",component:I},{path:":id/info",component:S}];let B=(()=>{class t{}return t.\u0275mod=y.Mb({type:t}),t.\u0275inj=y.Lb({factory:function(e){return new(e||t)},imports:[[u.i.forChild(M)],u.i]}),t})(),L=(()=>{class t{}return t.\u0275mod=y.Mb({type:t}),t.\u0275inj=y.Lb({factory:function(e){return new(e||t)},imports:[[s.c,c.b,a.c,o.c,r.e,m.b,n.q,b.a,l.a,p.a,d.a,B]]}),t})()}}]);