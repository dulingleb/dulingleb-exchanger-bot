(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"4evo":function(e,t,n){"use strict";n.d(t,"a",function(){return a});var r=n("ofXK"),o=n("Wp6s"),s=n("fXoL");let a=(()=>{class e{}return e.\u0275mod=s.Mb({type:e}),e.\u0275inj=s.Lb({factory:function(t){return new(t||e)},imports:[[r.c,o.d]]}),e})()},Pfez:function(e,t,n){"use strict";n.d(t,"a",function(){return c});var r=n("fXoL"),o=n("r629");const s=[[["","header",""]],[["","actions",""]],[["","content",""]],[["","footer",""]]],a=["[header]","[actions]","[content]","[footer]"];let c=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r.Ib({type:e,selectors:[["app-page-content"]],ngContentSelectors:a,decls:11,vars:0,consts:[["layout-content",""],[1,"header"],[1,"title"],[1,"actions"]],template:function(e,t){1&e&&(r.kc(s),r.Ub(0,"app-page-content-layout"),r.Ub(1,"section",0),r.Ub(2,"header",1),r.Ub(3,"h2",2),r.jc(4),r.Tb(),r.Ub(5,"div",3),r.jc(6,1),r.Tb(),r.Tb(),r.Ub(7,"article"),r.jc(8,2),r.Tb(),r.Ub(9,"footer"),r.jc(10,3),r.Tb(),r.Tb(),r.Tb())},directives:[o.a],styles:[".header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}"],changeDetection:0}),e})()},r629:function(e,t,n){"use strict";n.d(t,"a",function(){return c});var r=n("fXoL"),o=n("Wp6s");const s=[[["","layout-content",""]]],a=["[layout-content]"];let c=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r.Ib({type:e,selectors:[["app-page-content-layout"]],ngContentSelectors:a,decls:3,vars:0,consts:[[1,"app-container"],[1,"layout-content"]],template:function(e,t){1&e&&(r.kc(s),r.Ub(0,"section",0),r.Ub(1,"mat-card",1),r.jc(2),r.Tb(),r.Tb())},directives:[o.a],encapsulation:2,changeDetection:0}),e})()},"uk+G":function(e,t,n){"use strict";n.r(t),n.d(t,"MailingModule",function(){return L});var r=n("ofXK"),o=n("Wp6s"),s=n("NFeN"),a=n("kmnG"),c=n("bTqV"),i=n("qFsG"),b=n("sYmb"),l=n("3Pt+"),u=n("4evo"),p=n("xoVn"),d=n("ir1t"),f=n("tyNb"),m=n("nYR2"),h=n("1G5W"),g=n("XNiG"),y=n("i/bw"),v=n("fXoL"),w=n("FwLO"),T=n("Pfez"),U=n("KVI4"),j=n("Kbm1");const D=[{path:"",component:(()=>{class e{constructor(e,t){this.uiFacade=e,this.mailingApiService=t,this.errors={},this.destroy$=new g.a,this.form=new l.f({message:new l.d("")})}addMessage(){this.inRequest=!0;const e=this.form.get("message").value;this.mailingApiService.addMessage(e).pipe(Object(m.a)(()=>this.inRequest=!1),Object(h.a)(this.destroy$)).subscribe(e=>{this.uiFacade.addInfoNotification(e.message)},e=>this.showError(e))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}showError(e){var t;this.inRequest=!1,this.errors=(null==e?void 0:e.errors)||{};for(const n of Object.keys(this.errors))null===(t=this.form.get(n))||void 0===t||t.setErrors({valid:!1});this.uiFacade.addErrorNotification(e.message)}}return e.\u0275fac=function(t){return new(t||e)(v.Ob(y.f),v.Ob(w.c))},e.\u0275cmp=v.Ib({type:e,selectors:[["app-mailing"]],decls:13,vars:13,consts:[["header",""],["content",""],[1,"form",3,"formGroup","ngSubmit"],["formControlName","message",3,"label","height"],["name","message",3,"errors"],["mat-raised-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(v.Ub(0,"app-page-content"),v.Sb(1,0),v.Dc(2),v.gc(3,"translate"),v.Rb(),v.Sb(4,1),v.Ub(5,"form",2),v.bc("ngSubmit",function(){return t.addMessage()}),v.Pb(6,"app-format-editor",3),v.gc(7,"translate"),v.Ub(8,"mat-error"),v.Pb(9,"app-input-error",4),v.Tb(),v.Ub(10,"button",5),v.Dc(11),v.gc(12,"translate"),v.Tb(),v.Tb(),v.Rb(),v.Tb()),2&e&&(v.Db(2),v.Fc(" ",v.hc(3,7,"mailing.pageTitle")," "),v.Db(3),v.lc("formGroup",t.form),v.Db(1),v.lc("label",v.hc(7,9,"mailing.message"))("height",300),v.Db(3),v.lc("errors",t.form.invalid&&t.errors),v.Db(1),v.lc("disabled",t.form.invalid||t.inRequest),v.Db(1),v.Ec(v.hc(12,11,"mailing.send")))},directives:[T.a,l.s,l.m,l.g,U.a,l.l,l.e,a.b,j.a,c.b],pipes:[b.c],encapsulation:2}),e})()}];let M=(()=>{class e{}return e.\u0275mod=v.Mb({type:e}),e.\u0275inj=v.Lb({factory:function(t){return new(t||e)},imports:[[f.i.forChild(D)],f.i]}),e})(),L=(()=>{class e{}return e.\u0275mod=v.Mb({type:e}),e.\u0275inj=v.Lb({factory:function(t){return new(t||e)},imports:[[r.c,o.d,s.b,i.c,c.c,a.e,b.b,l.q,u.a,M,p.a,d.a]]}),e})()}}]);