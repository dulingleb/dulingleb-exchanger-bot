(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{iD7u:function(e,t,s){"use strict";s.r(t),s.d(t,"UsersModule",function(){return M});var i=s("ofXK"),r=s("sYmb"),n=s("NFeN"),a=s("bTqV"),o=s("kmnG"),c=s("1jcm"),b=s("qFsG"),u=s("3Pt+"),l=s("4evo"),d=s("ULOc"),m=s("ir1t"),p=s("tyNb"),h=s("5+tZ"),f=s("zp1y"),D=s("1G5W"),g=s("nYR2"),U=s("XNiG"),T=s("i/bw"),v=s("sKXY"),I=s("fXoL"),A=s("FwLO"),E=s("Pfez"),N=s("Kbm1");function R(e,t){if(1&e){const e=I.Vb();I.Ub(0,"button",20),I.bc("click",function(){return I.vc(e),I.fc().appointAdmin()}),I.Dc(1),I.gc(2,"translate"),I.Tb()}if(2&e){const e=I.fc();I.lc("disabled",e.inRequest),I.Db(1),I.Ec(I.hc(2,2,e.isAdmin?"user.edit.fireAdminBtn":"user.edit.appointAdminBtn"))}}let w=(()=>{class e{constructor(e,t,s,i){this.router=e,this.route=t,this.uiFacade=s,this.telegramUserApiService=i,this.existAdmin=!0,this.isAdmin=!1,this.errors={},this.destroy$=new U.a,this.form=new u.f({discount:new u.d("",[u.r.min(0),u.r.max(100)]),comment:new u.d(""),ban:new u.d("")})}ngOnInit(){this.route.paramMap.pipe(Object(h.a)(e=>this.telegramUserApiService.getUser(+e.get("id"))),Object(f.a)(this.telegramUserApiService.existsAdmin()),Object(D.a)(this.destroy$)).subscribe(([e,t])=>{this.inRequest=!1,this.user=e,this.isAdmin=this.user.role===v.h.ADMIN,this.existAdmin=t,this.form.patchValue({discount:e.discount,comment:e.comment,ban:e.ban})},e=>this.showError(e))}save(){this.inRequest=!0;const e=this.form.get("discount").value,t=this.form.get("comment").value,s=this.form.get("ban").value;this.telegramUserApiService.updateUser({id:this.user.id,discount:e,comment:t,ban:s}).pipe(Object(g.a)(()=>this.inRequest=!1),Object(D.a)(this.destroy$)).subscribe(e=>this.showSuccess(e),e=>this.showError(e))}appointAdmin(){this.inRequest=!0,this.telegramUserApiService.appointAdmin(this.user.id,this.user.role===v.h.ADMIN?v.h.USER:v.h.ADMIN).pipe(Object(g.a)(()=>this.inRequest=!1),Object(D.a)(this.destroy$)).subscribe(e=>{this.user.role=e.data.role,this.existAdmin=this.user.role===v.h.ADMIN,this.isAdmin=this.user.role===v.h.ADMIN,this.uiFacade.addInfoNotification(e.message)},e=>this.showError(e))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}showSuccess(e){this.uiFacade.addInfoNotification(e.message),this.router.navigateByUrl("/users")}showError(e){var t;this.inRequest=!1,this.errors=(null==e?void 0:e.errors)||{};for(const s of Object.keys(this.errors))null===(t=this.form.get(s))||void 0===t||t.setErrors({valid:!1});this.uiFacade.addErrorNotification(e.message)}}return e.\u0275fac=function(t){return new(t||e)(I.Ob(p.f),I.Ob(p.a),I.Ob(T.f),I.Ob(A.f))},e.\u0275cmp=I.Ib({type:e,selectors:[["app-user-edit"]],decls:92,vars:57,consts:[["header",""],["actions",""],["mat-raised-button","","color","warn",3,"disabled","click",4,"ngIf"],["content",""],[1,"wrapper"],[1,"info-table-block"],[1,"item"],[1,"title"],[1,"value"],["href",""],[1,"edit-info-block"],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group"],["appearance","fill"],["formControlName","discount","type","number","min","0","max","100","step","0.5","matInput",""],["name","discount",3,"errors"],["formControlName","comment","matInput",""],["name","comment",3,"errors"],["labelPosition","before","color","primary","formControlName","ban"],["mat-raised-button","","color","primary",3,"disabled"],["mat-raised-button","","color","warn",3,"disabled","click"]],template:function(e,t){1&e&&(I.Ub(0,"app-page-content"),I.Sb(1,0),I.Dc(2),I.gc(3,"translate"),I.Ub(4,"i"),I.Dc(5),I.Tb(),I.Rb(),I.Sb(6,1),I.Cc(7,R,3,4,"button",2),I.Rb(),I.Sb(8,3),I.Ub(9,"div",4),I.Ub(10,"section",5),I.Ub(11,"div",6),I.Ub(12,"p",7),I.Dc(13),I.gc(14,"translate"),I.Tb(),I.Ub(15,"p",8),I.Dc(16),I.Tb(),I.Tb(),I.Ub(17,"div",6),I.Ub(18,"p",7),I.Dc(19),I.gc(20,"translate"),I.Tb(),I.Ub(21,"p",8),I.Dc(22),I.Tb(),I.Tb(),I.Ub(23,"div",6),I.Ub(24,"p",7),I.Dc(25),I.gc(26,"translate"),I.Tb(),I.Ub(27,"p",8),I.Dc(28),I.Tb(),I.Tb(),I.Ub(29,"div",6),I.Ub(30,"p",7),I.Dc(31),I.gc(32,"translate"),I.Tb(),I.Ub(33,"p",8),I.Ub(34,"a",9),I.Dc(35),I.Tb(),I.Tb(),I.Tb(),I.Ub(36,"div",6),I.Ub(37,"p",7),I.Dc(38),I.gc(39,"translate"),I.Tb(),I.Ub(40,"p",8),I.Dc(41),I.Tb(),I.Tb(),I.Ub(42,"div",6),I.Ub(43,"p",7),I.Dc(44),I.gc(45,"translate"),I.Tb(),I.Ub(46,"p",8),I.Dc(47),I.Tb(),I.Tb(),I.Ub(48,"div",6),I.Ub(49,"p",7),I.Dc(50),I.gc(51,"translate"),I.Tb(),I.Ub(52,"p",8),I.Dc(53),I.Tb(),I.Tb(),I.Ub(54,"div",6),I.Ub(55,"p",7),I.Dc(56),I.gc(57,"translate"),I.Tb(),I.Ub(58,"p",8),I.Dc(59),I.Tb(),I.Tb(),I.Ub(60,"div",6),I.Ub(61,"p",7),I.Dc(62),I.gc(63,"translate"),I.Tb(),I.Ub(64,"p",8),I.Dc(65),I.Tb(),I.Tb(),I.Tb(),I.Ub(66,"div",10),I.Ub(67,"form",11),I.bc("ngSubmit",function(){return t.save()}),I.Ub(68,"div",12),I.Ub(69,"mat-form-field",13),I.Ub(70,"mat-label"),I.Dc(71),I.gc(72,"translate"),I.Tb(),I.Pb(73,"input",14),I.Ub(74,"mat-error"),I.Pb(75,"app-input-error",15),I.Tb(),I.Tb(),I.Tb(),I.Ub(76,"div",12),I.Ub(77,"mat-form-field",13),I.Ub(78,"mat-label"),I.Dc(79),I.gc(80,"translate"),I.Tb(),I.Pb(81,"textarea",16),I.Ub(82,"mat-error"),I.Pb(83,"app-input-error",17),I.Tb(),I.Tb(),I.Tb(),I.Ub(84,"div",12),I.Ub(85,"mat-slide-toggle",18),I.Ub(86,"mat-label"),I.Dc(87),I.gc(88,"translate"),I.Tb(),I.Tb(),I.Tb(),I.Ub(89,"button",19),I.Dc(90),I.gc(91,"translate"),I.Tb(),I.Tb(),I.Tb(),I.Tb(),I.Rb(),I.Tb()),2&e&&(I.Db(2),I.Fc(" ",I.hc(3,29,"user.edit.pageTitle")," "),I.Db(3),I.Ec(null==t.user?null:t.user.username),I.Db(2),I.lc("ngIf",!t.existAdmin||t.isAdmin),I.Db(6),I.Ec(I.hc(14,31,"user.info.id")),I.Db(3),I.Ec(null==t.user?null:t.user.id),I.Db(3),I.Ec(I.hc(20,33,"user.info.username")),I.Db(3),I.Ec(null==t.user?null:t.user.username),I.Db(3),I.Ec(I.hc(26,35,"user.info.name")),I.Db(3),I.Ec(((null==t.user?null:t.user.firstName)||"")+" "+((null==t.user?null:t.user.lastName)||"")),I.Db(3),I.Ec(I.hc(32,37,"user.info.operationsCount")),I.Db(4),I.Ec(null==t.user?null:t.user.operationsCount),I.Db(3),I.Ec(I.hc(39,39,"user.info.operationsSum")),I.Db(3),I.Ec(null==t.user?null:t.user.operationsSum),I.Db(3),I.Ec(I.hc(45,41,"user.info.refCount")),I.Db(3),I.Ec(null==t.user?null:t.user.refCount),I.Db(3),I.Ec(I.hc(51,43,"user.info.refActiveCount")),I.Db(3),I.Ec(null==t.user?null:t.user.refActiveCount),I.Db(3),I.Ec(I.hc(57,45,"user.info.refOperationsCount")),I.Db(3),I.Ec(null==t.user?null:t.user.refOperationsCount),I.Db(3),I.Ec(I.hc(63,47,"user.info.refOperationsSum")),I.Db(3),I.Ec(null==t.user?null:t.user.refOperationsSum),I.Db(2),I.lc("formGroup",t.form),I.Db(4),I.Ec(I.hc(72,49,"user.edit.input.discount")),I.Db(4),I.lc("errors",t.errors),I.Db(4),I.Ec(I.hc(80,51,"user.edit.input.comment")),I.Db(4),I.lc("errors",t.errors),I.Db(4),I.Ec(I.hc(88,53,"user.edit.input.ban")),I.Db(2),I.lc("disabled",t.form.invalid||t.inRequest),I.Db(1),I.Ec(I.hc(91,55,"user.edit.saveBtn")))},directives:[E.a,i.l,u.s,u.m,u.g,o.c,o.f,u.c,u.p,b.b,u.l,u.e,o.b,N.a,c.a,a.b],pipes:[r.c],styles:[".wrapper[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);grid-column-gap:1.5rem}"]}),e})();var y=s("uhkJ");const S=[{name:"username",nameI18n:"users.table.username",type:v.g.STRING,sort:!0,allowedForRoles:[T.d.SUPER_ADMIN,T.d.ADMIN]},{name:"operationsCount",nameI18n:"users.table.operationsCount",type:v.g.STRING,sort:!0,allowedForRoles:[T.d.SUPER_ADMIN,T.d.ADMIN]},{name:"operationsSum",nameI18n:"users.table.operationsSum",type:v.g.STRING,sort:!0,allowedForRoles:[T.d.SUPER_ADMIN,T.d.ADMIN]},{name:"discount",nameI18n:"users.table.discount",type:v.g.STRING,sort:!0,allowedForRoles:[T.d.SUPER_ADMIN,T.d.ADMIN]},{name:"ban",nameI18n:"users.table.ban",type:v.g.STRING,icon:e=>e.ban?"clear":"done",class:e=>e.ban?"text-warn":"text-accent",allowedForRoles:[T.d.SUPER_ADMIN,T.d.ADMIN]},{name:"edit",nameI18n:"table.action.edit",type:v.g.STRING,actionData:{link:e=>`/users/${e.id}/edit`,actionType:v.f.LINK,eventType:v.e.INFO},allowedForRoles:[T.d.SUPER_ADMIN,T.d.ADMIN]}];var O=s("7FcC");const F=[{path:"",component:(()=>{class e{constructor(e,t,s,i){this.router=e,this.adminFacade=t,this.uiFacade=s,this.adminApiService=i,this.users=[],this.tableColumns=S,this.destroy$=new U.a}ngOnInit(){this.initFilterFields()}getAdminList(e){this.inRequest=!0,this.adminApiService.getList(e).pipe(Object(f.a)(this.adminFacade.admin$),Object(g.a)(()=>this.inRequest=!1),Object(D.a)(this.destroy$)).subscribe(([e,t])=>{this.users=e.data,this.paginator={length:e.total,page:e.currentPage,pageSize:e.pageSize}},e=>this.uiFacade.addErrorNotification(e.message))}eventUser(e){this.router.navigate(["users",e.id,"edit"])}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}initFilterFields(){this.filterFields=[{labelI18n:"users.table.username",name:"username",type:y.a.INPUT},{labelI18n:"users.table.discount",name:"discount",type:y.a.INPUT},{labelI18n:"users.table.ban",name:"ban",type:y.a.SELECT,options:[{value:!1,titleI18n:"user.ban.0",class:"text-accent"},{value:!0,titleI18n:"user.ban.1",class:"text-warn"}]}]}}return e.\u0275fac=function(t){return new(t||e)(I.Ob(p.f),I.Ob(T.a),I.Ob(T.f),I.Ob(A.f))},e.\u0275cmp=I.Ib({type:e,selectors:[["app-users"]],decls:4,vars:8,consts:[[3,"tableColumns","inRequest","items","filterFields","paginator","getList","eventRow"],["table-title",""]],template:function(e,t){1&e&&(I.Ub(0,"app-page-content-table",0),I.bc("getList",function(e){return t.getAdminList(e)})("eventRow",function(e){return t.eventUser(e)}),I.Sb(1,1),I.Dc(2),I.gc(3,"translate"),I.Rb(),I.Tb()),2&e&&(I.lc("tableColumns",t.tableColumns)("inRequest",t.inRequest)("items",t.users)("filterFields",t.filterFields)("paginator",t.paginator),I.Db(2),I.Fc(" ",I.hc(3,6,"users.tableHeader.title")," "))},directives:[O.a],pipes:[r.c],encapsulation:2}),e})()},{path:":id/edit",component:w}];let C=(()=>{class e{}return e.\u0275mod=I.Mb({type:e}),e.\u0275inj=I.Lb({factory:function(t){return new(t||e)},imports:[[p.i.forChild(F)],p.i]}),e})(),M=(()=>{class e{}return e.\u0275mod=I.Mb({type:e}),e.\u0275inj=I.Lb({factory:function(t){return new(t||e)},imports:[[i.c,r.b,u.q,n.b,a.c,c.b,o.e,b.c,d.a,l.a,C,m.a]]}),e})()}}]);