(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),c=t.n(u),o=(t(20),t(2)),i=t(3),l=function(e){var n=e.newFilter,t=e.onChange;return r.a.createElement(r.a.Fragment,null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.addPerson,t=e.newName,a=e.newNumber,u=e.handleNameChange,c=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:u})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},f=function(e){var n=e.persons.filter((function(n){return n.name.toLowerCase().includes(e.filter)}));return r.a.createElement(r.a.Fragment,null,n.map((function(n){return r.a.createElement("p",{key:n.name},n.name," ",n.number,r.a.createElement("button",{onClick:e.remove,value:n.id},"delete"))})))},s=t(4),d=t.n(s),h="/api/persons",b=function(){return d.a.get(h).then((function(e){return e.data}))},p=function(e){return d.a.post(h,e).then((function(e){return e.data}))},g=function(e,n){return d.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return d.a.delete("".concat(h,"/").concat(e))},E=function(e){var n=e.notification;if(null===n.message)return null;var t={backgroundColor:"#00d774"};return n.success||(t={backgroundColor:"#ff3355"}),r.a.createElement("div",{style:Object(o.a)(Object(o.a)({},{width:"600px",height:"40px",margin:"20px 0 20px 0",padding:"0",lineHeight:"40px",borderRadius:"30px",color:"white",textAlign:"center",fontSize:"17px",transition:"transform 0.2s ease-in-out",transform:"translateY(-4px)"}),t)},r.a.createElement("p",null,n.message))},w=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),s=Object(i.a)(c,2),d=s[0],h=s[1],w=Object(a.useState)(""),j=Object(i.a)(w,2),O=j[0],C=j[1],x=Object(a.useState)(""),N=Object(i.a)(x,2),k=N[0],S=N[1],y=Object(a.useState)({message:null,success:!0}),D=Object(i.a)(y,2),F=D[0],I=D[1];Object(a.useEffect)((function(){b().then((function(e){u(e)}))}),[]);var P=function(){if(window.confirm("".concat(d," is already added to phonebook, replace the old number with a new one?"))){var e=t.find((function(e){return e.name===d})),n=Object(o.a)(Object(o.a)({},e),{},{number:O});g(e.id,n).then((function(a){u(t.map((function(e){return e.id!==n.id?e:a}))),A("Updated ".concat(d," from ").concat(e.number," to ").concat(n.number),!0)})).catch((function(e){u(t.filter((function(e){return e.id!==n.id}))),A("Information of '".concat(d,"' has already been removed from server"),!1)}))}},A=function(e,n){I({message:e,success:n}),setTimeout((function(){I({message:null,success:!0})}),3e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{notification:F}),r.a.createElement(l,{newFilter:k,onChange:function(e){return S(e.target.value)}}),r.a.createElement("h3",null,"add a new"),r.a.createElement(m,{addPerson:function(e){(e.preventDefault(),t.map((function(e){return e.name})).includes(d))?P():p({name:d,number:O}).then((function(e){u(t.concat(e)),A("Added ".concat(e.name),!0),h(""),C("")}))},newName:d,newNumber:O,handleNameChange:function(e){return h(e.target.value)},handleNumberChange:function(e){return C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(f,{persons:t,filter:k,remove:function(e){e.preventDefault();var n=parseInt(e.target.value),a=t.find((function(e){return e.id===n})).name;window.confirm("Delete ".concat(a,"?"))&&v(n).then((function(){u(t.filter((function(e){return e.id!==n}))),A("Deleted ".concat(a),!0)}))}}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.d4410908.chunk.js.map