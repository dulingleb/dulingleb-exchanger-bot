(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"4evo":function(e,t,n){"use strict";n.d(t,"a",function(){return r});var s=n("ofXK"),i=n("Wp6s"),a=n("fXoL");let r=(()=>{class e{}return e.\u0275mod=a.Mb({type:e}),e.\u0275inj=a.Lb({factory:function(t){return new(t||e)},imports:[[s.c,i.d]]}),e})()},Pfez:function(e,t,n){"use strict";n.d(t,"a",function(){return c});var s=n("fXoL"),i=n("r629");const a=[[["","header",""]],[["","actions",""]],[["","content",""]],[["","footer",""]]],r=["[header]","[actions]","[content]","[footer]"];let c=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s.Ib({type:e,selectors:[["app-page-content"]],ngContentSelectors:r,decls:11,vars:0,consts:[["layout-content",""],[1,"header"],[1,"title"],[1,"actions"]],template:function(e,t){1&e&&(s.kc(a),s.Ub(0,"app-page-content-layout"),s.Ub(1,"section",0),s.Ub(2,"header",1),s.Ub(3,"h2",2),s.jc(4),s.Tb(),s.Ub(5,"div",3),s.jc(6,1),s.Tb(),s.Tb(),s.Ub(7,"article"),s.jc(8,2),s.Tb(),s.Ub(9,"footer"),s.jc(10,3),s.Tb(),s.Tb(),s.Tb())},directives:[i.a],styles:[".header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}"],changeDetection:0}),e})()},SIxm:function(e,t,n){"use strict";n.r(t),n.d(t,"SettingsCommonModule",function(){return q});var s=n("ofXK"),i=n("3Pt+"),a=n("sYmb"),r=n("NFeN"),c=n("qFsG"),o=n("bTqV"),m=n("kmnG"),b=n("1jcm"),l=n("4evo"),u=n("tyNb"),g=n("nYR2"),p=n("1G5W"),f=n("XNiG"),d=n("i/bw"),h=n("fXoL"),v=n("FwLO"),T=n("Pfez");let y=(()=>{class e{constructor(){this.changeValue=new h.o,this.form=new i.f({course:new i.d("",[i.r.min(0)]),minExchange:new i.d("",[i.r.min(0)]),maxExchange:new i.d("",[i.r.min(0)])})}set limitSettings(e){this.initFormFields(e)}save(){const e=this.form.get("course").value,t=this.form.get("minExchange").value,n=this.form.get("maxExchange").value;this.changeValue.emit({course:e,minExchange:t,maxExchange:n})}initFormFields(e){this.form.patchValue({course:null==e?void 0:e.course,minExchange:null==e?void 0:e.minExchange,maxExchange:null==e?void 0:e.maxExchange})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=h.Ib({type:e,selectors:[["app-settings-common-limits"]],inputs:{inRequest:"inRequest",limitSettings:"limitSettings"},outputs:{changeValue:"changeValue"},decls:28,vars:17,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group"],["appearance","fill"],["formControlName","course","type","number","min","0","step","1","matInput",""],["formControlName","minExchange","type","number","min","0","step","0.00001","matInput",""],["formControlName","maxExchange","type","number","min","0","step","0.00001","matInput",""],["mat-raised-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(h.Ub(0,"app-page-content"),h.Sb(1,0),h.Ac(2),h.gc(3,"translate"),h.Rb(),h.Sb(4,1),h.Ub(5,"form",2),h.bc("ngSubmit",function(){return t.save()}),h.Ub(6,"div",3),h.Ub(7,"mat-form-field",4),h.Ub(8,"mat-label"),h.Ac(9),h.gc(10,"translate"),h.Tb(),h.Pb(11,"input",5),h.Tb(),h.Tb(),h.Ub(12,"div",3),h.Ub(13,"mat-form-field",4),h.Ub(14,"mat-label"),h.Ac(15),h.gc(16,"translate"),h.Tb(),h.Pb(17,"input",6),h.Tb(),h.Tb(),h.Ub(18,"div",3),h.Ub(19,"mat-form-field",4),h.Ub(20,"mat-label"),h.Ac(21),h.gc(22,"translate"),h.Tb(),h.Pb(23,"input",7),h.Tb(),h.Tb(),h.Ub(24,"div",3),h.Ub(25,"button",8),h.Ac(26),h.gc(27,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Rb(),h.Tb()),2&e&&(h.Db(2),h.Cc(" ",h.hc(3,7,"settings.limits.pageTitle")," "),h.Db(3),h.lc("formGroup",t.form),h.Db(4),h.Bc(h.hc(10,9,"settings.limits.course")),h.Db(6),h.Bc(h.hc(16,11,"settings.limits.minExchange")),h.Db(6),h.Bc(h.hc(22,13,"settings.limits.maxExchange")),h.Db(4),h.lc("disabled",t.form.invalid),h.Db(1),h.Bc(h.hc(27,15,"settings.saveBtn")))},directives:[T.a,i.s,i.m,i.g,m.c,m.f,i.c,i.p,c.b,i.l,i.e,o.b],pipes:[a.c],styles:[".form[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);grid-column-gap:1.5rem}"]}),e})(),U=(()=>{class e{constructor(){this.changeMode=new h.o,this.form=new i.f({isDemo:new i.d(!1)})}set isDemo(e){this.initFormFields(e)}save(){const e=this.form.get("isDemo").value;this.changeMode.emit(e)}initFormFields(e){this.form.patchValue({isDemo:e})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=h.Ib({type:e,selectors:[["app-settings-common-mode"]],inputs:{inRequest:"inRequest",isDemo:"isDemo"},outputs:{changeMode:"changeMode"},decls:15,vars:11,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group","is-demo"],["labelPosition","before","color","primary","formControlName","isDemo"],[1,"form-group"],["mat-raised-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(h.Ub(0,"app-page-content"),h.Sb(1,0),h.Ac(2),h.gc(3,"translate"),h.Rb(),h.Sb(4,1),h.Ub(5,"form",2),h.bc("ngSubmit",function(){return t.save()}),h.Ub(6,"div",3),h.Ub(7,"mat-slide-toggle",4),h.Ub(8,"mat-label"),h.Ac(9),h.gc(10,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Ub(11,"div",5),h.Ub(12,"button",6),h.Ac(13),h.gc(14,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Rb(),h.Tb()),2&e&&(h.Db(2),h.Cc(" ",h.hc(3,5,"settings.mode.pageTitle")," "),h.Db(3),h.lc("formGroup",t.form),h.Db(4),h.Bc(h.hc(10,7,"settings.mode.isDemo")),h.Db(3),h.lc("disabled",t.form.invalid),h.Db(1),h.Bc(h.hc(14,9,"settings.saveBtn")))},directives:[T.a,i.s,i.m,i.g,b.a,i.l,i.e,m.f,o.b],pipes:[a.c],styles:[".is-demo[_ngcontent-%COMP%]{margin-bottom:3rem}"]}),e})(),S=(()=>{class e{constructor(e){this.adminFacade=e,this.changeValue=new h.o,this.form=new i.f({telegramToken:new i.d(""),username:new i.d("")})}set telegramSettings(e){this.initFormFields(e)}saveTelegram(){const e=this.form.get("telegramToken").value,t=this.form.get("username").value;this.changeValue.emit({telegramToken:e,username:t})}initFormFields(e){this.form.patchValue({telegramToken:null==e?void 0:e.telegramToken,username:null==e?void 0:e.username})}}return e.\u0275fac=function(t){return new(t||e)(h.Ob(d.a))},e.\u0275cmp=h.Ib({type:e,selectors:[["app-settings-common-telegram"]],inputs:{inRequest:"inRequest",telegramSettings:"telegramSettings"},outputs:{changeValue:"changeValue"},decls:21,vars:14,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group"],["appearance","fill"],["formControlName","telegramToken","type","text","matInput",""],["formControlName","username","type","text","matInput",""],["mat-raised-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(h.Ub(0,"app-page-content"),h.Sb(1,0),h.Ac(2),h.gc(3,"translate"),h.Rb(),h.Sb(4,1),h.Ub(5,"form",2),h.bc("ngSubmit",function(){return t.saveTelegram()}),h.Ub(6,"div",3),h.Ub(7,"mat-form-field",4),h.Ub(8,"mat-label"),h.Ac(9),h.gc(10,"translate"),h.Tb(),h.Pb(11,"input",5),h.Tb(),h.Tb(),h.Ub(12,"div",3),h.Ub(13,"mat-form-field",4),h.Ub(14,"mat-label"),h.Ac(15),h.gc(16,"translate"),h.Tb(),h.Pb(17,"input",6),h.Tb(),h.Tb(),h.Ub(18,"button",7),h.Ac(19),h.gc(20,"translate"),h.Tb(),h.Tb(),h.Rb(),h.Tb()),2&e&&(h.Db(2),h.Cc(" ",h.hc(3,6,"settings.telegram.pageTitle")," "),h.Db(3),h.lc("formGroup",t.form),h.Db(4),h.Bc(h.hc(10,8,"settings.telegram.telegramToken")),h.Db(6),h.Bc(h.hc(16,10,"settings.telegram.username")),h.Db(3),h.lc("disabled",t.form.invalid),h.Db(1),h.Bc(h.hc(20,12,"settings.saveBtn")))},directives:[T.a,i.s,i.m,i.g,m.c,m.f,i.c,c.b,i.l,i.e,o.b],pipes:[a.c],encapsulation:2}),e})(),R=(()=>{class e{constructor(){this.changeValue=new h.o,this.form=new i.f({coinbaseKey:new i.d(""),coinbaseSecret:new i.d("")})}set keysSetting(e){this.initFormFields(e)}saveKeys(){const e=this.form.get("coinbaseKey").value,t=this.form.get("coinbaseSecret").value;this.changeValue.emit({coinbaseKey:e,coinbaseSecret:t})}initFormFields(e){this.form.patchValue({coinbaseKey:null==e?void 0:e.coinbaseKey,coinbaseSecret:null==e?void 0:e.coinbaseSecret})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=h.Ib({type:e,selectors:[["app-settings-common-keys"]],inputs:{inRequest:"inRequest",keysSetting:"keysSetting"},outputs:{changeValue:"changeValue"},decls:21,vars:14,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group"],["appearance","fill"],["formControlName","coinbaseKey","type","text","matInput",""],["formControlName","coinbaseSecret","type","text","matInput",""],["mat-raised-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(h.Ub(0,"app-page-content"),h.Sb(1,0),h.Ac(2),h.gc(3,"translate"),h.Rb(),h.Sb(4,1),h.Ub(5,"form",2),h.bc("ngSubmit",function(){return t.saveKeys()}),h.Ub(6,"div",3),h.Ub(7,"mat-form-field",4),h.Ub(8,"mat-label"),h.Ac(9),h.gc(10,"translate"),h.Tb(),h.Pb(11,"input",5),h.Tb(),h.Tb(),h.Ub(12,"div",3),h.Ub(13,"mat-form-field",4),h.Ub(14,"mat-label"),h.Ac(15),h.gc(16,"translate"),h.Tb(),h.Pb(17,"input",6),h.Tb(),h.Tb(),h.Ub(18,"button",7),h.Ac(19),h.gc(20,"translate"),h.Tb(),h.Tb(),h.Rb(),h.Tb()),2&e&&(h.Db(2),h.Cc(" ",h.hc(3,6,"settings.keys.pageTitle")," "),h.Db(3),h.lc("formGroup",t.form),h.Db(4),h.Bc(h.hc(10,8,"settings.keys.coinbaseKey")),h.Db(6),h.Bc(h.hc(16,10,"settings.keys.coinbaseSecret")),h.Db(3),h.lc("disabled",t.form.invalid),h.Db(1),h.Bc(h.hc(20,12,"settings.saveBtn")))},directives:[T.a,i.s,i.m,i.g,m.c,m.f,i.c,c.b,i.l,i.e,o.b],pipes:[a.c],encapsulation:2}),e})(),D=(()=>{class e{constructor(){this.changeValue=new h.o,this.form=new i.f({refUsersCount:new i.d(""),refPercent:new i.d("")})}set refSettings(e){this.initFormFields(e)}save(){const e=this.form.get("refUsersCount").value,t=this.form.get("refPercent").value;this.changeValue.emit({refUsersCount:e,refPercent:t})}initFormFields(e){this.form.patchValue({refUsersCount:e.refUsersCount,refPercent:e.refPercent})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=h.Ib({type:e,selectors:[["app-settings-common-ref"]],inputs:{inRequest:"inRequest",refSettings:"refSettings"},outputs:{changeValue:"changeValue"},decls:22,vars:14,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group"],["appearance","fill"],["formControlName","refUsersCount","type","number","min","1","matInput",""],["formControlName","refPercent","type","number","min","0","matInput",""],["mat-raised-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(h.Ub(0,"app-page-content"),h.Sb(1,0),h.Ac(2),h.gc(3,"translate"),h.Rb(),h.Sb(4,1),h.Ub(5,"form",2),h.bc("ngSubmit",function(){return t.save()}),h.Ub(6,"div",3),h.Ub(7,"mat-form-field",4),h.Ub(8,"mat-label"),h.Ac(9),h.gc(10,"translate"),h.Tb(),h.Pb(11,"input",5),h.Tb(),h.Tb(),h.Ub(12,"div",3),h.Ub(13,"mat-form-field",4),h.Ub(14,"mat-label"),h.Ac(15),h.gc(16,"translate"),h.Tb(),h.Pb(17,"input",6),h.Tb(),h.Tb(),h.Ub(18,"div",3),h.Ub(19,"button",7),h.Ac(20),h.gc(21,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Rb(),h.Tb()),2&e&&(h.Db(2),h.Cc(" ",h.hc(3,6,"settings.ref.pageTitle")," "),h.Db(3),h.lc("formGroup",t.form),h.Db(4),h.Bc(h.hc(10,8,"settings.ref.refUsersCount")),h.Db(6),h.Bc(h.hc(16,10,"settings.ref.refPercent")),h.Db(4),h.lc("disabled",t.form.invalid),h.Db(1),h.Bc(h.hc(21,12,"settings.saveBtn")))},directives:[T.a,i.s,i.m,i.g,m.c,m.f,i.c,i.p,c.b,i.l,i.e,o.b],pipes:[a.c],encapsulation:2}),e})();const F=[{path:"",component:(()=>{class e{constructor(e,t,n){this.adminFacade=e,this.uiFacade=t,this.settingApiService=n,this.destroy$=new f.a}ngOnInit(){this.inRequest=!0,this.settingApiService.getSettings().pipe(Object(g.a)(()=>this.inRequest=!1),Object(p.a)(this.destroy$)).subscribe(e=>this.initFormFields(e),e=>this.uiFacade.addErrorNotification(e.message))}saveLimits(e){this.inRequest=!0,this.settingApiService.saveLimits(e).pipe(Object(g.a)(()=>this.inRequest=!1),Object(p.a)(this.destroy$)).subscribe(e=>this.initFormFields(e),e=>this.uiFacade.addErrorNotification(e.message))}saveMode(e){this.inRequest=!0,this.settingApiService.saveMode(e).pipe(Object(g.a)(()=>this.inRequest=!1),Object(p.a)(this.destroy$)).subscribe(e=>this.initFormFields(e),e=>this.uiFacade.addErrorNotification(e.message))}saveTelegram(e){this.inRequest=!0,this.settingApiService.saveTelegram(e).pipe(Object(g.a)(()=>this.inRequest=!1),Object(p.a)(this.destroy$)).subscribe(e=>this.initFormFields(e),e=>this.uiFacade.addErrorNotification(e.message))}saveRef(e){this.inRequest=!0,this.settingApiService.saveRef(e).pipe(Object(g.a)(()=>this.inRequest=!1),Object(p.a)(this.destroy$)).subscribe(e=>this.initFormFields(e),e=>this.uiFacade.addErrorNotification(e.message))}saveKeys(e){this.inRequest=!0,this.settingApiService.saveKeys(e).pipe(Object(g.a)(()=>this.inRequest=!1),Object(p.a)(this.destroy$)).subscribe(e=>this.initFormFields(e),e=>this.uiFacade.addErrorNotification(e.message))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}initFormFields(e){this.isDemo=e.demo,this.limitSettings={course:e.course,minExchange:e.minExchange,maxExchange:e.maxExchange},this.refSettings={refPercent:e.refPercent,refUsersCount:e.refUsersCount},this.telegramSettings={telegramToken:e.telegramToken,username:e.username},this.keysSetting={coinbaseKey:e.coinbaseKey,coinbaseSecret:e.coinbaseSecret}}}return e.\u0275fac=function(t){return new(t||e)(h.Ob(d.a),h.Ob(d.f),h.Ob(v.e))},e.\u0275cmp=h.Ib({type:e,selectors:[["app-settings-common"]],decls:8,vars:10,consts:[[1,"settings-block"],[1,"limits-form",3,"inRequest","limitSettings","changeValue"],[1,"limits-form",3,"inRequest","isDemo","changeMode"],[1,"telegram-form",3,"inRequest","telegramSettings","changeValue"],[1,"keys-form",3,"inRequest","keysSetting","changeValue"],[1,"telegram-form",3,"inRequest","refSettings","changeValue"]],template:function(e,t){1&e&&(h.Ub(0,"section",0),h.Ub(1,"app-settings-common-limits",1),h.bc("changeValue",function(e){return t.saveLimits(e)}),h.Tb(),h.Ub(2,"app-settings-common-mode",2),h.bc("changeMode",function(e){return t.saveMode(e)}),h.Tb(),h.Tb(),h.Ub(3,"section",0),h.Ub(4,"app-settings-common-telegram",3),h.bc("changeValue",function(e){return t.saveTelegram(e)}),h.Tb(),h.Ub(5,"app-settings-common-keys",4),h.bc("changeValue",function(e){return t.saveKeys(e)}),h.Tb(),h.Tb(),h.Ub(6,"section",0),h.Ub(7,"app-settings-common-ref",5),h.bc("changeValue",function(e){return t.saveRef(e)}),h.Tb(),h.Tb()),2&e&&(h.Db(1),h.lc("inRequest",t.inRequest)("limitSettings",t.limitSettings),h.Db(1),h.lc("inRequest",t.inRequest)("isDemo",t.isDemo),h.Db(2),h.lc("inRequest",t.inRequest)("telegramSettings",t.telegramSettings),h.Db(1),h.lc("inRequest",t.inRequest)("keysSetting",t.keysSetting),h.Db(2),h.lc("inRequest",t.inRequest)("refSettings",t.refSettings))},directives:[y,U,S,R,D],styles:[".settings-block[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr)}"]}),e})()}];let w=(()=>{class e{}return e.\u0275mod=h.Mb({type:e}),e.\u0275inj=h.Lb({factory:function(t){return new(t||e)},imports:[[u.h.forChild(F)],u.h]}),e})(),q=(()=>{class e{}return e.\u0275mod=h.Mb({type:e}),e.\u0275inj=h.Lb({factory:function(t){return new(t||e)},imports:[[s.c,a.b,i.q,r.b,c.c,o.c,m.e,b.b,l.a,w]]}),e})()},r629:function(e,t,n){"use strict";n.d(t,"a",function(){return c});var s=n("fXoL"),i=n("Wp6s");const a=[[["","layout-content",""]]],r=["[layout-content]"];let c=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s.Ib({type:e,selectors:[["app-page-content-layout"]],ngContentSelectors:r,decls:3,vars:0,consts:[[1,"app-container"],[1,"layout-content"]],template:function(e,t){1&e&&(s.kc(a),s.Ub(0,"section",0),s.Ub(1,"mat-card",1),s.jc(2),s.Tb(),s.Tb())},directives:[i.a],encapsulation:2,changeDetection:0}),e})()}}]);