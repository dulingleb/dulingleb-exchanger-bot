(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"4evo":function(e,t,r){"use strict";r.d(t,"a",function(){return o});var s=r("ofXK"),n=r("Wp6s"),i=r("fXoL");let o=(()=>{class e{}return e.\u0275mod=i.Mb({type:e}),e.\u0275inj=i.Lb({factory:function(t){return new(t||e)},imports:[[s.c,n.d]]}),e})()},Pfez:function(e,t,r){"use strict";r.d(t,"a",function(){return a});var s=r("fXoL"),n=r("r629");const i=[[["","header",""]],[["","actions",""]],[["","content",""]],[["","footer",""]]],o=["[header]","[actions]","[content]","[footer]"];let a=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s.Ib({type:e,selectors:[["app-page-content"]],ngContentSelectors:o,decls:11,vars:0,consts:[["layout-content",""],[1,"header"],[1,"title"],[1,"actions"]],template:function(e,t){1&e&&(s.kc(i),s.Ub(0,"app-page-content-layout"),s.Ub(1,"section",0),s.Ub(2,"header",1),s.Ub(3,"h2",2),s.jc(4),s.Tb(),s.Ub(5,"div",3),s.jc(6,1),s.Tb(),s.Tb(),s.Ub(7,"article"),s.jc(8,2),s.Tb(),s.Ub(9,"footer"),s.jc(10,3),s.Tb(),s.Tb(),s.Tb())},directives:[n.a],styles:[".header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}"],changeDetection:0}),e})()},SIxm:function(e,t,r){"use strict";r.r(t),r.d(t,"SettingsCommonModule",function(){return x});var s=r("ofXK"),n=r("3Pt+"),i=r("sYmb"),o=r("NFeN"),a=r("qFsG"),c=r("bTqV"),b=r("kmnG"),m=r("1jcm"),l=r("ir1t"),u=r("4evo"),g=r("tyNb"),p=r("nYR2"),f=r("1G5W"),h=r("XNiG"),d=r("i/bw"),v=r("fXoL"),T=r("FwLO"),y=r("Pfez"),U=r("Kbm1");let D=(()=>{class e{constructor(){this.changeValue=new v.o,this.form=new n.f({course:new n.d("",[n.r.min(0)]),minExchange:new n.d("",[n.r.min(0)]),maxExchange:new n.d("",[n.r.min(0)])})}set limitSettings(e){this.initFormFields(e)}ngOnChanges(e){var t;void 0!==(null===(t=e.errors)||void 0===t?void 0:t.currentValue)&&this.showError()}save(){const e=this.form.get("course").value,t=this.form.get("minExchange").value,r=this.form.get("maxExchange").value;this.changeValue.emit({course:e,minExchange:t,maxExchange:r})}initFormFields(e){this.form.patchValue({course:null==e?void 0:e.course,minExchange:null==e?void 0:e.minExchange,maxExchange:null==e?void 0:e.maxExchange})}showError(){var e;for(const t of Object.keys(this.errors))null===(e=this.form.get(t))||void 0===e||e.setErrors({valid:!1})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=v.Ib({type:e,selectors:[["app-settings-common-limits"]],inputs:{inRequest:"inRequest",errors:"errors",limitSettings:"limitSettings"},outputs:{changeValue:"changeValue"},features:[v.Bb],decls:34,vars:20,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group"],["appearance","fill"],["formControlName","course","type","number","min","0","step","1","matInput",""],["name","course",3,"errors"],["formControlName","minExchange","type","number","min","0","step","0.00001","matInput",""],["name","minExchange",3,"errors"],["formControlName","maxExchange","type","number","min","0","step","0.00001","matInput",""],["name","maxExchange",3,"errors"],["mat-raised-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(v.Ub(0,"app-page-content"),v.Sb(1,0),v.Dc(2),v.gc(3,"translate"),v.Rb(),v.Sb(4,1),v.Ub(5,"form",2),v.bc("ngSubmit",function(){return t.save()}),v.Ub(6,"div",3),v.Ub(7,"mat-form-field",4),v.Ub(8,"mat-label"),v.Dc(9),v.gc(10,"translate"),v.Tb(),v.Pb(11,"input",5),v.Ub(12,"mat-error"),v.Pb(13,"app-input-error",6),v.Tb(),v.Tb(),v.Tb(),v.Ub(14,"div",3),v.Ub(15,"mat-form-field",4),v.Ub(16,"mat-label"),v.Dc(17),v.gc(18,"translate"),v.Tb(),v.Pb(19,"input",7),v.Ub(20,"mat-error"),v.Pb(21,"app-input-error",8),v.Tb(),v.Tb(),v.Tb(),v.Ub(22,"div",3),v.Ub(23,"mat-form-field",4),v.Ub(24,"mat-label"),v.Dc(25),v.gc(26,"translate"),v.Tb(),v.Pb(27,"input",9),v.Ub(28,"mat-error"),v.Pb(29,"app-input-error",10),v.Tb(),v.Tb(),v.Tb(),v.Ub(30,"div",3),v.Ub(31,"button",11),v.Dc(32),v.gc(33,"translate"),v.Tb(),v.Tb(),v.Tb(),v.Rb(),v.Tb()),2&e&&(v.Db(2),v.Fc(" ",v.hc(3,10,"settings.limits.pageTitle")," "),v.Db(3),v.lc("formGroup",t.form),v.Db(4),v.Ec(v.hc(10,12,"settings.limits.course")),v.Db(4),v.lc("errors",t.errors),v.Db(4),v.Ec(v.hc(18,14,"settings.limits.minExchange")),v.Db(4),v.lc("errors",t.errors),v.Db(4),v.Ec(v.hc(26,16,"settings.limits.maxExchange")),v.Db(4),v.lc("errors",t.errors),v.Db(2),v.lc("disabled",t.form.invalid||t.inRequest),v.Db(1),v.Ec(v.hc(33,18,"settings.saveBtn")))},directives:[y.a,n.s,n.m,n.g,b.c,b.f,n.c,n.p,a.b,n.l,n.e,b.b,U.a,c.b],pipes:[i.c],styles:[".form[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);grid-column-gap:1.5rem}"]}),e})(),S=(()=>{class e{constructor(){this.changeMode=new v.o,this.form=new n.f({isDemo:new n.d(!1)})}set isDemo(e){this.initFormFields(e)}ngOnChanges(e){var t;void 0!==(null===(t=e.errors)||void 0===t?void 0:t.currentValue)&&this.showError()}save(){const e=this.form.get("isDemo").value;this.changeMode.emit(e)}initFormFields(e){this.form.patchValue({isDemo:e})}showError(){var e;for(const t of Object.keys(this.errors))null===(e=this.form.get(t))||void 0===e||e.setErrors({valid:!1})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=v.Ib({type:e,selectors:[["app-settings-common-mode"]],inputs:{inRequest:"inRequest",errors:"errors",isDemo:"isDemo"},outputs:{changeMode:"changeMode"},features:[v.Bb],decls:15,vars:11,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group","is-demo"],["labelPosition","before","color","primary","formControlName","isDemo"],[1,"form-group"],["mat-raised-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(v.Ub(0,"app-page-content"),v.Sb(1,0),v.Dc(2),v.gc(3,"translate"),v.Rb(),v.Sb(4,1),v.Ub(5,"form",2),v.bc("ngSubmit",function(){return t.save()}),v.Ub(6,"div",3),v.Ub(7,"mat-slide-toggle",4),v.Ub(8,"mat-label"),v.Dc(9),v.gc(10,"translate"),v.Tb(),v.Tb(),v.Tb(),v.Ub(11,"div",5),v.Ub(12,"button",6),v.Dc(13),v.gc(14,"translate"),v.Tb(),v.Tb(),v.Tb(),v.Rb(),v.Tb()),2&e&&(v.Db(2),v.Fc(" ",v.hc(3,5,"settings.mode.pageTitle")," "),v.Db(3),v.lc("formGroup",t.form),v.Db(4),v.Ec(v.hc(10,7,"settings.mode.isDemo")),v.Db(3),v.lc("disabled",t.form.invalid||t.inRequest),v.Db(1),v.Ec(v.hc(14,9,"settings.saveBtn")))},directives:[y.a,n.s,n.m,n.g,m.a,n.l,n.e,b.f,c.b],pipes:[i.c],styles:[".is-demo[_ngcontent-%COMP%]{margin-bottom:3rem}"]}),e})(),w=(()=>{class e{constructor(e){this.adminFacade=e,this.changeValue=new v.o,this.form=new n.f({telegramToken:new n.d(""),username:new n.d("")})}set telegramSettings(e){this.initFormFields(e)}ngOnChanges(e){var t;void 0!==(null===(t=e.errors)||void 0===t?void 0:t.currentValue)&&this.showError()}saveTelegram(){const e=this.form.get("telegramToken").value,t=this.form.get("username").value;this.changeValue.emit({telegramToken:e,username:t})}initFormFields(e){this.form.patchValue({telegramToken:null==e?void 0:e.telegramToken,username:null==e?void 0:e.username})}showError(){var e;for(const t of Object.keys(this.errors))null===(e=this.form.get(t))||void 0===e||e.setErrors({valid:!1})}}return e.\u0275fac=function(t){return new(t||e)(v.Ob(d.a))},e.\u0275cmp=v.Ib({type:e,selectors:[["app-settings-common-telegram"]],inputs:{inRequest:"inRequest",errors:"errors",telegramSettings:"telegramSettings"},outputs:{changeValue:"changeValue"},features:[v.Bb],decls:25,vars:16,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group"],["appearance","fill"],["formControlName","telegramToken","type","text","matInput",""],["name","telegramToken",3,"errors"],["formControlName","username","type","text","matInput",""],["name","username",3,"errors"],["mat-raised-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(v.Ub(0,"app-page-content"),v.Sb(1,0),v.Dc(2),v.gc(3,"translate"),v.Rb(),v.Sb(4,1),v.Ub(5,"form",2),v.bc("ngSubmit",function(){return t.saveTelegram()}),v.Ub(6,"div",3),v.Ub(7,"mat-form-field",4),v.Ub(8,"mat-label"),v.Dc(9),v.gc(10,"translate"),v.Tb(),v.Pb(11,"input",5),v.Ub(12,"mat-error"),v.Pb(13,"app-input-error",6),v.Tb(),v.Tb(),v.Tb(),v.Ub(14,"div",3),v.Ub(15,"mat-form-field",4),v.Ub(16,"mat-label"),v.Dc(17),v.gc(18,"translate"),v.Tb(),v.Pb(19,"input",7),v.Ub(20,"mat-error"),v.Pb(21,"app-input-error",8),v.Tb(),v.Tb(),v.Tb(),v.Ub(22,"button",9),v.Dc(23),v.gc(24,"translate"),v.Tb(),v.Tb(),v.Rb(),v.Tb()),2&e&&(v.Db(2),v.Fc(" ",v.hc(3,8,"settings.telegram.pageTitle")," "),v.Db(3),v.lc("formGroup",t.form),v.Db(4),v.Ec(v.hc(10,10,"settings.telegram.telegramToken")),v.Db(4),v.lc("errors",t.errors),v.Db(4),v.Ec(v.hc(18,12,"settings.telegram.username")),v.Db(4),v.lc("errors",t.errors),v.Db(1),v.lc("disabled",t.form.invalid||t.inRequest),v.Db(1),v.Ec(v.hc(24,14,"settings.saveBtn")))},directives:[y.a,n.s,n.m,n.g,b.c,b.f,n.c,a.b,n.l,n.e,b.b,U.a,c.b],pipes:[i.c],encapsulation:2}),e})(),E=(()=>{class e{constructor(){this.changeValue=new v.o,this.form=new n.f({coinbaseKey:new n.d(""),coinbaseSecret:new n.d("")})}set keysSetting(e){this.initFormFields(e)}ngOnChanges(e){var t;void 0!==(null===(t=e.errors)||void 0===t?void 0:t.currentValue)&&this.showError()}saveKeys(){const e=this.form.get("coinbaseKey").value,t=this.form.get("coinbaseSecret").value;this.changeValue.emit({coinbaseKey:e,coinbaseSecret:t})}initFormFields(e){this.form.patchValue({coinbaseKey:null==e?void 0:e.coinbaseKey,coinbaseSecret:null==e?void 0:e.coinbaseSecret})}showError(){var e;for(const t of Object.keys(this.errors))null===(e=this.form.get(t))||void 0===e||e.setErrors({valid:!1})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=v.Ib({type:e,selectors:[["app-settings-common-keys"]],inputs:{inRequest:"inRequest",errors:"errors",keysSetting:"keysSetting"},outputs:{changeValue:"changeValue"},features:[v.Bb],decls:25,vars:16,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group"],["appearance","fill"],["formControlName","coinbaseKey","type","text","matInput",""],["name","coinbaseKey",3,"errors"],["formControlName","coinbaseSecret","type","text","matInput",""],["name","coinbaseSecret",3,"errors"],["mat-raised-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(v.Ub(0,"app-page-content"),v.Sb(1,0),v.Dc(2),v.gc(3,"translate"),v.Rb(),v.Sb(4,1),v.Ub(5,"form",2),v.bc("ngSubmit",function(){return t.saveKeys()}),v.Ub(6,"div",3),v.Ub(7,"mat-form-field",4),v.Ub(8,"mat-label"),v.Dc(9),v.gc(10,"translate"),v.Tb(),v.Pb(11,"input",5),v.Ub(12,"mat-error"),v.Pb(13,"app-input-error",6),v.Tb(),v.Tb(),v.Tb(),v.Ub(14,"div",3),v.Ub(15,"mat-form-field",4),v.Ub(16,"mat-label"),v.Dc(17),v.gc(18,"translate"),v.Tb(),v.Pb(19,"input",7),v.Ub(20,"mat-error"),v.Pb(21,"app-input-error",8),v.Tb(),v.Tb(),v.Tb(),v.Ub(22,"button",9),v.Dc(23),v.gc(24,"translate"),v.Tb(),v.Tb(),v.Rb(),v.Tb()),2&e&&(v.Db(2),v.Fc(" ",v.hc(3,8,"settings.keys.pageTitle")," "),v.Db(3),v.lc("formGroup",t.form),v.Db(4),v.Ec(v.hc(10,10,"settings.keys.coinbaseKey")),v.Db(4),v.lc("errors",t.errors),v.Db(4),v.Ec(v.hc(18,12,"settings.keys.coinbaseSecret")),v.Db(4),v.lc("errors",t.errors),v.Db(1),v.lc("disabled",t.form.invalid||t.inRequest),v.Db(1),v.Ec(v.hc(24,14,"settings.saveBtn")))},directives:[y.a,n.s,n.m,n.g,b.c,b.f,n.c,a.b,n.l,n.e,b.b,U.a,c.b],pipes:[i.c],encapsulation:2}),e})(),R=(()=>{class e{constructor(){this.changeValue=new v.o,this.form=new n.f({refUsersCount:new n.d(""),refPercent:new n.d("")})}set refSettings(e){this.initFormFields(e)}ngOnChanges(e){var t;void 0!==(null===(t=e.errors)||void 0===t?void 0:t.currentValue)&&this.showError()}save(){const e=this.form.get("refUsersCount").value,t=this.form.get("refPercent").value;this.changeValue.emit({refUsersCount:e,refPercent:t})}initFormFields(e){this.form.patchValue({refUsersCount:null==e?void 0:e.refUsersCount,refPercent:null==e?void 0:e.refPercent})}showError(){var e;for(const t of Object.keys(this.errors))null===(e=this.form.get(t))||void 0===e||e.setErrors({valid:!1})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=v.Ib({type:e,selectors:[["app-settings-common-ref"]],inputs:{inRequest:"inRequest",errors:"errors",refSettings:"refSettings"},outputs:{changeValue:"changeValue"},features:[v.Bb],decls:26,vars:16,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],[1,"form-group"],["appearance","fill"],["formControlName","refUsersCount","type","number","min","1","matInput",""],["name","refUsersCount",3,"errors"],["formControlName","refPercent","type","number","min","0","matInput",""],["name","refPercent",3,"errors"],["mat-raised-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(v.Ub(0,"app-page-content"),v.Sb(1,0),v.Dc(2),v.gc(3,"translate"),v.Rb(),v.Sb(4,1),v.Ub(5,"form",2),v.bc("ngSubmit",function(){return t.save()}),v.Ub(6,"div",3),v.Ub(7,"mat-form-field",4),v.Ub(8,"mat-label"),v.Dc(9),v.gc(10,"translate"),v.Tb(),v.Pb(11,"input",5),v.Ub(12,"mat-error"),v.Pb(13,"app-input-error",6),v.Tb(),v.Tb(),v.Tb(),v.Ub(14,"div",3),v.Ub(15,"mat-form-field",4),v.Ub(16,"mat-label"),v.Dc(17),v.gc(18,"translate"),v.Tb(),v.Pb(19,"input",7),v.Ub(20,"mat-error"),v.Pb(21,"app-input-error",8),v.Tb(),v.Tb(),v.Tb(),v.Ub(22,"div",3),v.Ub(23,"button",9),v.Dc(24),v.gc(25,"translate"),v.Tb(),v.Tb(),v.Tb(),v.Rb(),v.Tb()),2&e&&(v.Db(2),v.Fc(" ",v.hc(3,8,"settings.ref.pageTitle")," "),v.Db(3),v.lc("formGroup",t.form),v.Db(4),v.Ec(v.hc(10,10,"settings.ref.refUsersCount")),v.Db(4),v.lc("errors",t.errors),v.Db(4),v.Ec(v.hc(18,12,"settings.ref.refPercent")),v.Db(4),v.lc("errors",t.errors),v.Db(2),v.lc("disabled",t.form.invalid||t.inRequest),v.Db(1),v.Ec(v.hc(25,14,"settings.saveBtn")))},directives:[y.a,n.s,n.m,n.g,b.c,b.f,n.c,n.p,a.b,n.l,n.e,b.b,U.a,c.b],pipes:[i.c],encapsulation:2}),e})();const q=[{path:"",component:(()=>{class e{constructor(e,t,r){this.adminFacade=e,this.uiFacade=t,this.settingApiService=r,this.errors={},this.destroy$=new h.a}ngOnInit(){this.inRequest=!0,this.settingApiService.getSettings().pipe(Object(p.a)(()=>this.inRequest=!1),Object(f.a)(this.destroy$)).subscribe(e=>this.initFormFields(e),e=>this.showError(e))}saveLimits(e){this.inRequest=!0,this.settingApiService.saveLimits(e).pipe(Object(p.a)(()=>this.inRequest=!1),Object(f.a)(this.destroy$)).subscribe(e=>this.showSuccess(e),e=>this.showError(e))}saveMode(e){this.inRequest=!0,this.settingApiService.saveMode(e).pipe(Object(p.a)(()=>this.inRequest=!1),Object(f.a)(this.destroy$)).subscribe(e=>this.showSuccess(e),e=>this.showError(e))}saveTelegram(e){this.inRequest=!0,this.settingApiService.saveTelegram(e).pipe(Object(p.a)(()=>this.inRequest=!1),Object(f.a)(this.destroy$)).subscribe(e=>this.showSuccess(e),e=>this.showError(e))}saveRef(e){this.inRequest=!0,this.settingApiService.saveRef(e).pipe(Object(p.a)(()=>this.inRequest=!1),Object(f.a)(this.destroy$)).subscribe(e=>this.showSuccess(e),e=>this.showError(e))}saveKeys(e){this.inRequest=!0,this.settingApiService.saveKeys(e).pipe(Object(p.a)(()=>this.inRequest=!1),Object(f.a)(this.destroy$)).subscribe(e=>this.showSuccess(e),e=>this.showError(e))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}showSuccess(e){this.uiFacade.addInfoNotification(e.message),this.initFormFields(e.data)}showError(e){this.inRequest=!1,this.errors=(null==e?void 0:e.errors)||{},this.uiFacade.addErrorNotification(e.message)}initFormFields(e){this.isDemo=e.demo,this.limitSettings={course:e.course,minExchange:e.minExchange,maxExchange:e.maxExchange},this.refSettings={refPercent:e.refPercent,refUsersCount:e.refUsersCount},this.telegramSettings={telegramToken:e.telegramToken,username:e.username},this.keysSetting={coinbaseKey:e.coinbaseKey,coinbaseSecret:e.coinbaseSecret}}}return e.\u0275fac=function(t){return new(t||e)(v.Ob(d.a),v.Ob(d.f),v.Ob(T.e))},e.\u0275cmp=v.Ib({type:e,selectors:[["app-settings-common"]],decls:8,vars:15,consts:[[1,"settings-block"],[1,"limits-form",3,"inRequest","limitSettings","errors","changeValue"],[1,"limits-form",3,"inRequest","isDemo","errors","changeMode"],[1,"telegram-form",3,"inRequest","telegramSettings","errors","changeValue"],[1,"keys-form",3,"inRequest","keysSetting","errors","changeValue"],[1,"telegram-form",3,"inRequest","refSettings","errors","changeValue"]],template:function(e,t){1&e&&(v.Ub(0,"section",0),v.Ub(1,"app-settings-common-limits",1),v.bc("changeValue",function(e){return t.saveLimits(e)}),v.Tb(),v.Ub(2,"app-settings-common-mode",2),v.bc("changeMode",function(e){return t.saveMode(e)}),v.Tb(),v.Tb(),v.Ub(3,"section",0),v.Ub(4,"app-settings-common-telegram",3),v.bc("changeValue",function(e){return t.saveTelegram(e)}),v.Tb(),v.Ub(5,"app-settings-common-keys",4),v.bc("changeValue",function(e){return t.saveKeys(e)}),v.Tb(),v.Tb(),v.Ub(6,"section",0),v.Ub(7,"app-settings-common-ref",5),v.bc("changeValue",function(e){return t.saveRef(e)}),v.Tb(),v.Tb()),2&e&&(v.Db(1),v.lc("inRequest",t.inRequest)("limitSettings",t.limitSettings)("errors",t.errors),v.Db(1),v.lc("inRequest",t.inRequest)("isDemo",t.isDemo)("errors",t.errors),v.Db(2),v.lc("inRequest",t.inRequest)("telegramSettings",t.telegramSettings)("errors",t.errors),v.Db(1),v.lc("inRequest",t.inRequest)("keysSetting",t.keysSetting)("errors",t.errors),v.Db(2),v.lc("inRequest",t.inRequest)("refSettings",t.refSettings)("errors",t.errors))},directives:[D,S,w,E,R],styles:[".settings-block[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr)}"]}),e})()}];let F=(()=>{class e{}return e.\u0275mod=v.Mb({type:e}),e.\u0275inj=v.Lb({factory:function(t){return new(t||e)},imports:[[g.i.forChild(q)],g.i]}),e})(),x=(()=>{class e{}return e.\u0275mod=v.Mb({type:e}),e.\u0275inj=v.Lb({factory:function(t){return new(t||e)},imports:[[s.c,i.b,n.q,o.b,a.c,c.c,b.e,m.b,l.a,u.a,F]]}),e})()},r629:function(e,t,r){"use strict";r.d(t,"a",function(){return a});var s=r("fXoL"),n=r("Wp6s");const i=[[["","layout-content",""]]],o=["[layout-content]"];let a=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s.Ib({type:e,selectors:[["app-page-content-layout"]],ngContentSelectors:o,decls:3,vars:0,consts:[[1,"app-container"],[1,"layout-content"]],template:function(e,t){1&e&&(s.kc(i),s.Ub(0,"section",0),s.Ub(1,"mat-card",1),s.jc(2),s.Tb(),s.Tb())},directives:[n.a],encapsulation:2,changeDetection:0}),e})()}}]);