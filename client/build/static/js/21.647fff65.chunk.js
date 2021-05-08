(this["webpackJsonponline-shop"]=this["webpackJsonponline-shop"]||[]).push([[21],{203:function(e,s,c){"use strict";c(0);var a=c(36),t=[{id:1,name:"Home",fullName:"Home",link:"/"},{id:2,name:"Shop",fullName:"Shop Page",link:"/shop"},{id:3,name:"Women",fullName:"Women Collections",link:"/shop/women"},{id:4,name:"Men",fullName:"Men Collections",link:"/shop/men"},{id:5,name:"Kids",fullName:"Kids Collections",link:"/shop/kids"},{id:6,name:"Accessories",fullName:"Accessories",link:"/shop/accessories"},{id:7,name:"New Arrivals",fullName:"New Arrivals",link:"/shop/new-arrivals"},{id:8,name:"Sale",fullName:"All Sale Collections",link:"/shop/sale"},{id:9,name:"Stores",fullName:"Store Locator",link:"/stores"},{id:10,name:"Checkout",fullName:"Checkout",link:"/checkout"},{id:10,name:"Favourites",fullName:"Favourites",link:"/favourites"},{id:11,name:"Account",fullName:"My Account",link:"/account"},{id:12,name:"Popular",fullName:"Best Sellers",link:"/shop/popular"}],n=c(2);s.a=function(e){var s=e.path,c=e.productName,l=e.productPath,r=s.split(", ").map((function(e){return t.filter((function(s){return s.name.toLowerCase()===e.replace("-"," ")}))[0]}));return Object(n.jsx)("div",{className:"breadcrumbs py-5",children:Object(n.jsxs)("div",{className:"wrapper",children:[Object(n.jsx)("h2",{className:"title uppercase bold",children:c||r.slice(-1)[0].fullName}),Object(n.jsx)("div",{}),Object(n.jsx)("div",{className:"link-group",children:Object(n.jsxs)("span",{className:"link",children:[r.map((function(e){return Object(n.jsx)(a.b,{to:e.link,children:e.name},e.id)})),l&&Object(n.jsx)(a.b,{to:l,children:c})]})})]})})}},328:function(e,s,c){"use strict";c.r(s);var a=c(197),t=c(0),n=c(202),l=c.n(n),r=c(18),i=c.n(r),o=c(30),d=c(24),j=c(5),m=c(7),u=c(207),b=c(203),h=c(48),p=c(3),O=c(307),x=c(2),N=function(e){var s=e.setPaymentDetails,c=Object(t.useState)({name:"",cardNumber:"",mmyy:"",cvv:"",addressLine:"",postal:"",country:"Canada",state:""}),n=Object(a.a)(c,2),l=n[0],r=n[1],i=l.name,o=l.cardNumber,d=l.mmyy,j=l.cvv,m=l.addressLine,u=l.postal,b=l.country,N=l.state,v=function(e){var s=e.target,c=s.name,a=s.value;r(Object(p.a)(Object(p.a)({},l),{},Object(h.a)({},c,a)))};return Object(t.useEffect)((function(){return s(l),function(){}}),[l,s]),Object(x.jsxs)("div",{className:"section billing-details",children:[Object(x.jsx)("h3",{className:"bold my-5",children:"Billing Details"}),Object(x.jsxs)("div",{className:"d-flex ml-3",children:[Object(x.jsx)("h4",{className:"col-6 label",children:"Country*"}),Object(x.jsx)("h4",{className:"col-6 label",children:"Province*"})]}),Object(x.jsxs)("div",{className:"d-flex flex-wrap justify-content-around select-country",children:[Object(x.jsx)("div",{className:"col-5 option",children:Object(x.jsx)(O.a,{value:b,onChange:function(e){return r(Object(p.a)(Object(p.a)({},l),{},{country:e,state:""}))}})}),Object(x.jsx)("div",{className:"col-5 option",children:Object(x.jsx)(O.b,{country:b,value:N,onChange:function(e){return r(Object(p.a)(Object(p.a)({},l),{},{state:e}))}})})]}),Object(x.jsxs)("div",{className:"form p-5  my-5",children:[Object(x.jsx)("input",{className:"input",name:"name",value:i,onChange:v,placeholder:"Name on Card"}),Object(x.jsx)("input",{className:"input",name:"cardNumber",value:o,onChange:v,placeholder:"Card Number"}),Object(x.jsxs)("div",{className:"d-flex ",children:[Object(x.jsx)("input",{className:"input mr-5",name:"mmyy",value:d,onChange:v,placeholder:"MM / YY"}),Object(x.jsx)("input",{className:"input w-50",name:"cvv",value:j,onChange:v,placeholder:"CVV"})]}),Object(x.jsx)("input",{className:"input",name:"addressLine",value:m,onChange:v,placeholder:"Address Line"}),Object(x.jsx)("input",{className:"input",name:"postal",value:u,onChange:v,placeholder:"Zip / Postal Code"}),Object(x.jsxs)("div",{className:"mt-4",children:[Object(x.jsx)("input",{type:"checkbox",id:"shippingAddress",name:"shippingAddress",defaultChecked:!0,onChange:function(){return console.log("Hi! I has not implemented this feature yet :D")}}),Object(x.jsx)("label",{htmlFor:"shippingAddress",className:"ml-4",children:"Shipping Address is the same as billing address"})]}),Object(x.jsxs)("div",{className:"secure-connection m-4 d-flex justify-content-center align-items-end",children:[Object(x.jsx)("i",{className:"bi bi-shield-lock-fill icon"}),Object(x.jsx)("h5",{className:"ml-2",children:"Secure Connection"})]})]}),Object(x.jsxs)("div",{className:"test-card color",children:[Object(x.jsx)("span",{className:"",children:"*Please use the following mock credit card for testing payments:*"}),Object(x.jsxs)("div",{className:"pl-5 my-3",children:["Address: any random place",Object(x.jsx)("br",{}),"Name on Card: any name",Object(x.jsx)("br",{}),"Card Number: 4242 4242 4242 4242",Object(x.jsx)("br",{}),"MM/YY: 01/23",Object(x.jsx)("br",{}),"CVV: 123",Object(x.jsx)("br",{}),"Zip: 999999"]}),Object(x.jsx)("span",{className:"",children:"*For testing purpose, shipping address and billing address will be the same. No validation for card also.*"})]})]})},v=c(198),f=c(209),y=c(14),C=function(e){var s=e.product,c=e.order,a=c.size,t=c.color,n=c.colorPrice,l=c.colorDiscount,r=c.quantity;return Object(x.jsxs)("div",{className:"line row",children:[Object(x.jsxs)("div",{className:"col-7",children:[Object(x.jsxs)("span",{children:[s.name," \xd7 ",r]}),Object(x.jsx)("br",{}),Object(x.jsxs)("span",{children:["Color: ",t,Object(x.jsx)("span",{className:"px-3",children:"-"}),"Size: ",a.toUpperCase()]})]}),Object(x.jsxs)("span",{className:"col-5 text-center",children:["$",Object(y.c)(n,l,r)]})]})},g=Object(d.b)({cartItems:f.a,cartTotal:f.c}),k=Object(o.b)(g)((function(e){var s,c=e.cartTotal,a=e.cartItems,t=e.handleSubmit,n=Number(5.18);return s=1*c>50||1*c===0?c:(1*c+n).toFixed(2),Object(x.jsx)("div",{className:"section order-summary",children:Object(x.jsxs)("div",{className:"inner mt-5 px-5 py-3",children:[Object(x.jsx)("h3",{className:"bold my-5",children:"Order Summary"}),Object(x.jsxs)("div",{className:"line row",children:[Object(x.jsx)("span",{className:"col-7 text-center",children:"PRODUCT"}),Object(x.jsx)("span",{className:"col-5 text-center",children:"TOTAL"})]}),a.map((function(e,s){return Object(x.jsx)(C,{product:e.item,order:e.order},s)})),Object(x.jsxs)("div",{className:"line row",children:[Object(x.jsx)("span",{className:"col-7 bold",children:"Cart Subtotal"}),Object(x.jsxs)("span",{className:"col-5 text-center bold",children:["$",c]})]}),Object(x.jsxs)("div",{className:"line row",children:[Object(x.jsx)("span",{className:"col-7 bold",children:"Shipping & Handling:"}),Object(x.jsx)("span",{className:"col-5 text-center bold",children:c>50?"Free":"$ ".concat(n)})]}),Object(x.jsxs)("div",{className:"row total mb-4 mt-3",children:[Object(x.jsx)("span",{className:"col-7 bold",children:"Order Total"}),Object(x.jsxs)("span",{className:"col-5 text-center bold color",children:["$",s]})]}),Object(x.jsx)("h5",{className:"terms",children:"By completing your purchase you agree to these Terms of Service."}),Object(x.jsx)("div",{className:"text-center my-5",children:Object(x.jsx)(v.a,{styleClass:"color square mx-4",name:"Complete Payment",onClick:function(){return t(a)}})})]})})})),w=c(46),S=c(208),A=Object(d.b)({currentUser:w.a});s.default=Object(o.b)(A,(function(e){return{clearCart:function(){return e(Object(S.b)())}}}))((function(e){var s=e.currentUser,c=e.clearCart,n=Object(t.useState)(),r=Object(a.a)(n,2),o=r[0],d=r[1],h=Object(m.g)();return Object(x.jsxs)("div",{className:"checkout",children:[Object(x.jsxs)(l.a,{children:[Object(x.jsx)("title",{children:"Shine | Checkout"}),Object(x.jsx)("meta",{name:"description",content:"Shine Online Shop"})]}),Object(x.jsxs)(u.a,{children:[Object(x.jsx)(b.a,{path:"home, checkout"}),Object(x.jsxs)("div",{className:"container",children:[Object(x.jsx)("div",{className:"row"}),Object(x.jsxs)("div",{className:"row",children:[Object(x.jsx)("div",{className:"col-md-6",children:Object(x.jsx)(N,{setPaymentDetails:d})}),Object(x.jsx)("div",{className:"col-md-6",children:Object(x.jsx)(k,{handleSubmit:function(e){if(0===e.length)return j.b.error("Please add at least 1 item to cart.");var a=Object(y.n)(o);if(a){var t={items:e.map((function(e){return{product:e.item.id,color:e.order.color,size:e.order.size,quantity:e.order.quantity}})),user:s?s.id:"",phone:"4234234242",shippingAddress:{country:a.country,state:a.state,postal:a.postal,addressLine:a.addressLine}};i.a.post("".concat("https://shine-fashion.herokuapp.com","/api/v1/orders"),t).then((function(e){j.b.success("Your order has been created successfully! Thank you for shopping with us!",y.m),window.setTimeout((function(){h.push("/")}),2e3),c()})).catch((function(e){j.b.error("Sorry we couldn't proceed your order. Please try again.")}))}}})})]})]})]})]})}))}}]);