(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{iD7u:function(e,t,s){"use strict";s.r(t),s.d(t,"UsersModule",function(){return B});var n=s("ofXK"),a=s("sYmb"),i=s("NFeN"),r=s("bTqV"),o=s("kmnG"),b=s("1jcm"),c=s("qFsG"),l=s("3Pt+"),u=s("4evo"),d=s("ULOc"),m=s("tyNb"),p=s("5+tZ"),f=s("nYR2"),h=s("1G5W"),g=s("XNiG"),U=s("i/bw"),T=s("fXoL"),A=s("FwLO"),D=s("Pfez");let I=(()=>{class e{constructor(e,t,s,n){this.router=e,this.route=t,this.uiFacade=s,this.telegramUserApiService=n,this.destroy$=new g.a,this.form=new l.f({discount:new l.d("",[l.r.min(0),l.r.max(100)]),comment:new l.d(""),ban:new l.d("")})}ngOnInit(){this.route.paramMap.pipe(Object(p.a)(e=>this.telegramUserApiService.getUser(+e.get("id"))),Object(f.a)(()=>this.inRequest=!1),Object(h.a)(this.destroy$)).subscribe(e=>{this.user=e,this.form.patchValue({discount:e.discount,comment:e.comment,ban:e.ban})},e=>{this.uiFacade.addErrorNotification(e.message)})}save(){const e=this.form.get("discount").value,t=this.form.get("comment").value,s=this.form.get("ban").value;this.telegramUserApiService.updateUser({id:this.user.id,discount:e,comment:t,ban:s}).pipe(Object(f.a)(()=>this.inRequest=!1),Object(h.a)(this.destroy$)).subscribe(e=>this.router.navigateByUrl("/users"),e=>{this.uiFacade.addErrorNotification(e.message)})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}}return e.\u0275fac=function(t){return new(t||e)(T.Ob(m.f),T.Ob(m.a),T.Ob(U.f),T.Ob(A.f))},e.\u0275cmp=T.Ib({type:e,selectors:[["app-user-edit"]],decls:80,vars:50,consts:[["header",""],["content",""],[1,"wrapper"],[1,"info-table-block"],[1,"item"],[1,"title"],[1,"value"],["href",""],[1,"edit-info-block"],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group"],["appearance","fill"],["formControlName","discount","type","number","min","0","max","100","step","0.5","matInput",""],["formControlName","comment","matInput",""],["labelPosition","before","color","primary","formControlName","ban"],["mat-raised-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(T.Ub(0,"app-page-content"),T.Sb(1,0),T.Ac(2),T.gc(3,"translate"),T.Ub(4,"i"),T.Ac(5),T.Tb(),T.Rb(),T.Sb(6,1),T.Ub(7,"div",2),T.Ub(8,"section",3),T.Ub(9,"div",4),T.Ub(10,"p",5),T.Ac(11),T.gc(12,"translate"),T.Tb(),T.Ub(13,"p",6),T.Ac(14),T.Tb(),T.Tb(),T.Ub(15,"div",4),T.Ub(16,"p",5),T.Ac(17),T.gc(18,"translate"),T.Tb(),T.Ub(19,"p",6),T.Ac(20),T.Tb(),T.Tb(),T.Ub(21,"div",4),T.Ub(22,"p",5),T.Ac(23),T.gc(24,"translate"),T.Tb(),T.Ub(25,"p",6),T.Ac(26),T.Tb(),T.Tb(),T.Ub(27,"div",4),T.Ub(28,"p",5),T.Ac(29),T.gc(30,"translate"),T.Tb(),T.Ub(31,"p",6),T.Ub(32,"a",7),T.Ac(33),T.Tb(),T.Tb(),T.Tb(),T.Ub(34,"div",4),T.Ub(35,"p",5),T.Ac(36),T.gc(37,"translate"),T.Tb(),T.Ub(38,"p",6),T.Ac(39),T.Tb(),T.Tb(),T.Ub(40,"div",4),T.Ub(41,"p",5),T.Ac(42),T.gc(43,"translate"),T.Tb(),T.Ub(44,"p",6),T.Ac(45),T.Tb(),T.Tb(),T.Ub(46,"div",4),T.Ub(47,"p",5),T.Ac(48),T.gc(49,"translate"),T.Tb(),T.Ub(50,"p",6),T.Ac(51),T.Tb(),T.Tb(),T.Ub(52,"div",4),T.Ub(53,"p",5),T.Ac(54),T.gc(55,"translate"),T.Tb(),T.Ub(56,"p",6),T.Ac(57),T.Tb(),T.Tb(),T.Tb(),T.Ub(58,"div",8),T.Ub(59,"form",9),T.bc("ngSubmit",function(){return t.save()}),T.Ub(60,"div",10),T.Ub(61,"mat-form-field",11),T.Ub(62,"mat-label"),T.Ac(63),T.gc(64,"translate"),T.Tb(),T.Pb(65,"input",12),T.Tb(),T.Tb(),T.Ub(66,"div",10),T.Ub(67,"mat-form-field",11),T.Ub(68,"mat-label"),T.Ac(69),T.gc(70,"translate"),T.Tb(),T.Pb(71,"textarea",13),T.Tb(),T.Tb(),T.Ub(72,"div",10),T.Ub(73,"mat-slide-toggle",14),T.Ub(74,"mat-label"),T.Ac(75),T.gc(76,"translate"),T.Tb(),T.Tb(),T.Tb(),T.Ub(77,"button",15),T.Ac(78),T.gc(79,"translate"),T.Tb(),T.Tb(),T.Tb(),T.Tb(),T.Rb(),T.Tb()),2&e&&(T.Db(2),T.Cc(" ",T.hc(3,24,"user.edit.pageTitle")," "),T.Db(3),T.Bc(null==t.user?null:t.user.username),T.Db(6),T.Bc(T.hc(12,26,"user.info.id")),T.Db(3),T.Bc(null==t.user?null:t.user.id),T.Db(3),T.Bc(T.hc(18,28,"user.info.username")),T.Db(3),T.Bc(null==t.user?null:t.user.username),T.Db(3),T.Bc(T.hc(24,30,"user.info.name")),T.Db(3),T.Bc(((null==t.user?null:t.user.firstName)||"")+" "+((null==t.user?null:t.user.lastName)||"")),T.Db(3),T.Bc(T.hc(30,32,"user.info.operationsCount")),T.Db(4),T.Bc(null==t.user?null:t.user.operationsCount),T.Db(3),T.Bc(T.hc(37,34,"user.info.operationsSum")),T.Db(3),T.Bc(null==t.user?null:t.user.operationsSum),T.Db(3),T.Bc(T.hc(43,36,"user.info.ref")),T.Db(3),T.Bc(null==t.user?null:t.user.operationsSum),T.Db(3),T.Bc(T.hc(49,38,"user.info.operationsRef")),T.Db(3),T.Bc(null==t.user?null:t.user.operationsSum),T.Db(3),T.Bc(T.hc(55,40,"user.info.operationsREfSum")),T.Db(3),T.Bc(null==t.user?null:t.user.operationsSum),T.Db(2),T.lc("formGroup",t.form),T.Db(4),T.Bc(T.hc(64,42,"user.edit.input.discount")),T.Db(6),T.Bc(T.hc(70,44,"user.edit.input.comment")),T.Db(6),T.Bc(T.hc(76,46,"user.edit.input.ban")),T.Db(2),T.lc("disabled",t.form.invalid),T.Db(1),T.Bc(T.hc(79,48,"user.edit.save")))},directives:[D.a,l.s,l.m,l.g,o.c,o.f,l.c,l.p,c.b,l.l,l.e,b.a,r.b],pipes:[a.c],styles:[".wrapper[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);grid-column-gap:1.5rem}"]}),e})();var v=s("zp1y"),y=s("uhkJ"),N=s("sKXY");const S=[{name:"username",nameI18n:"users.table.username",type:N.g.STRING,sort:!0,allowedForRoles:[U.d.SUPER_ADMIN,U.d.ADMIN]},{name:"operationsCount",nameI18n:"users.table.operationsCount",type:N.g.STRING,sort:!0,allowedForRoles:[U.d.SUPER_ADMIN,U.d.ADMIN]},{name:"operationsSum",nameI18n:"users.table.operationsSum",type:N.g.STRING,sort:!0,allowedForRoles:[U.d.SUPER_ADMIN,U.d.ADMIN]},{name:"discount",nameI18n:"users.table.discount",type:N.g.STRING,sort:!0,allowedForRoles:[U.d.SUPER_ADMIN,U.d.ADMIN]},{name:"ban",nameI18n:"users.table.ban",type:N.g.STRING,icon:e=>e.ban?"clear":"done",class:e=>e.ban?"text-warn":"text-accent",allowedForRoles:[U.d.SUPER_ADMIN,U.d.ADMIN]},{name:"edit",nameI18n:"table.action.edit",type:N.g.STRING,actionData:{link:e=>`/users/${e.id}/edit`,actionType:N.f.LINK,eventType:N.e.EDIT},allowedForRoles:[U.d.SUPER_ADMIN,U.d.ADMIN]}];var R=s("7FcC");const w=[{path:"",component:(()=>{class e{constructor(e,t,s){this.adminFacade=e,this.uiFacade=t,this.adminApiService=s,this.users=[],this.tableColumns=S,this.destroy$=new g.a}ngOnInit(){this.initFilterFields()}getAdminList(e){this.inRequest=!0,this.adminApiService.getList(e).pipe(Object(v.a)(this.adminFacade.admin$),Object(f.a)(()=>this.inRequest=!1),Object(h.a)(this.destroy$)).subscribe(([e,t])=>{this.users=e.data,this.paginator={length:e.total,page:e.currentPage,pageSize:e.pageSize}},e=>this.uiFacade.addErrorNotification(e.message))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}initFilterFields(){this.filterFields=[{labelI18n:"users.table.username",name:"username",type:y.a.INPUT},{labelI18n:"users.table.discount",name:"discount",type:y.a.INPUT},{labelI18n:"users.table.ban",name:"ban",type:y.a.SELECT,options:[{value:!1,titleI18n:"user.ban.0",class:"text-accent"},{value:!0,titleI18n:"user.ban.1",class:"text-warn"}]}]}}return e.\u0275fac=function(t){return new(t||e)(T.Ob(U.a),T.Ob(U.f),T.Ob(A.f))},e.\u0275cmp=T.Ib({type:e,selectors:[["app-users"]],decls:4,vars:8,consts:[[3,"tableColumns","inRequest","items","filterFields","paginator","getList"],["table-title",""]],template:function(e,t){1&e&&(T.Ub(0,"app-page-content-table",0),T.bc("getList",function(e){return t.getAdminList(e)}),T.Sb(1,1),T.Ac(2),T.gc(3,"translate"),T.Rb(),T.Tb()),2&e&&(T.lc("tableColumns",t.tableColumns)("inRequest",t.inRequest)("items",t.users)("filterFields",t.filterFields)("paginator",t.paginator),T.Db(2),T.Cc(" ",T.hc(3,6,"users.tableHeader.title")," "))},directives:[R.a],pipes:[a.c],encapsulation:2}),e})()},{path:":id/edit",component:I}];let F=(()=>{class e{}return e.\u0275mod=T.Mb({type:e}),e.\u0275inj=T.Lb({factory:function(t){return new(t||e)},imports:[[m.h.forChild(w)],m.h]}),e})(),B=(()=>{class e{}return e.\u0275mod=T.Mb({type:e}),e.\u0275inj=T.Lb({factory:function(t){return new(t||e)},imports:[[n.c,a.b,l.q,i.b,r.c,b.b,o.e,c.c,d.a,u.a,F]]}),e})()}}]);