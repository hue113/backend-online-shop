(this["webpackJsonponline-shop"]=this["webpackJsonponline-shop"]||[]).push([[14],{203:function(e,c,t){"use strict";t(0);var s=t(36),n=[{id:1,name:"Home",fullName:"Home",link:"/"},{id:2,name:"Shop",fullName:"Shop Page",link:"/shop"},{id:3,name:"Women",fullName:"Women Collections",link:"/shop/women"},{id:4,name:"Men",fullName:"Men Collections",link:"/shop/men"},{id:5,name:"Kids",fullName:"Kids Collections",link:"/shop/kids"},{id:6,name:"Accessories",fullName:"Accessories",link:"/shop/accessories"},{id:7,name:"New Arrivals",fullName:"New Arrivals",link:"/shop/new-arrivals"},{id:8,name:"Sale",fullName:"All Sale Collections",link:"/shop/sale"},{id:9,name:"Stores",fullName:"Store Locator",link:"/stores"},{id:10,name:"Checkout",fullName:"Checkout",link:"/checkout"},{id:10,name:"Favourites",fullName:"Favourites",link:"/favourites"},{id:11,name:"Account",fullName:"My Account",link:"/account"},{id:12,name:"Popular",fullName:"Best Sellers",link:"/shop/popular"}],i=t(2);c.a=function(e){var c=e.path,t=e.productName,r=e.productPath,a=c.split(", ").map((function(e){return n.filter((function(c){return c.name.toLowerCase()===e.replace("-"," ")}))[0]}));return Object(i.jsx)("div",{className:"breadcrumbs py-5",children:Object(i.jsxs)("div",{className:"wrapper",children:[Object(i.jsx)("h2",{className:"title uppercase bold",children:t||a.slice(-1)[0].fullName}),Object(i.jsx)("div",{}),Object(i.jsx)("div",{className:"link-group",children:Object(i.jsxs)("span",{className:"link",children:[a.map((function(e){return Object(i.jsx)(s.b,{to:e.link,children:e.name},e.id)})),r&&Object(i.jsx)(s.b,{to:r,children:t})]})})]})})}},210:function(e,c,t){"use strict";var s=t(0),n=t(197),i=t(30),r=t(36),a=t(24),o=t(22),l=t(199),d=t(216),j=t(215),u=t(5),b=t(198),m=t(14),p=t(208),h=t(2),x=Object(i.b)(null,(function(e){return{addItemToFavourite:function(c){return e(Object(l.a)(c))},addItemToCart:function(c,t){return e(Object(p.a)(c,t))}}}))((function(e){var c=e.product,t=e.addItemToFavourite,i=e.addItemToCart,a=c.name,o=c.price,l=c.variation,p=c.rating,x=c.shortDescription,O=c.sku,f=Object(s.useState)({color:l?l[0].color:"",colorPrice:l?l[0].price:"",colorDiscount:l?l[0].discount:""}),v=Object(n.a)(f,2),N=v[0],g=v[1],k=N.color,w=N.colorPrice,C=N.colorDiscount,y=Object(s.useState)(),P=Object(n.a)(y,2),S=P[0],A=P[1],F=Object(s.useState)(1),L=Object(n.a)(F,2),z=L[0],I=L[1];return Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{className:"star",children:Object(m.j)(p)}),Object(h.jsx)(r.b,{to:"/products/".concat(a.toLowerCase().replace(/ /g,"-"),".").concat(O),children:Object(h.jsx)("h3",{className:"title mt-3",children:a})}),Object(h.jsx)("div",{className:"price my-4",children:0===C?Object(h.jsxs)("span",{className:"mr-5",children:["$",w.toFixed(2)]}):Object(h.jsxs)("div",{children:[Object(h.jsxs)("span",{className:"mr-4 old-price",children:["$",w.toFixed(2)]}),Object(h.jsxs)("span",{className:"sale-price",children:["$",Object(m.c)(o,C)]})]})}),Object(h.jsx)("p",{className:"description pb-1",children:x}),Object(h.jsxs)("div",{className:"options d-flex pt-2",children:[Object(h.jsxs)("div",{className:"colorPick mr-5",children:[Object(h.jsx)("h5",{children:"Color"}),Object(h.jsx)("div",{className:"color-btn color d-flex py-3",children:Object(h.jsx)(d.a,{title:k,onSelect:function(e){var c=l.find((function(c){return c.color===e}));g({color:e,colorPrice:c.price,colorDiscount:c.discount})},children:l.map((function(e,c){return Object(h.jsx)(j.a.Item,{eventKey:e.color,children:e.color},c)}))})})]}),Object(h.jsxs)("div",{className:"sizePick ml-4",children:[Object(h.jsx)("h5",{children:"Size"}),Object(h.jsx)("div",{className:"size-content d-flex my-4 w-100",children:l.filter((function(e){return e.color===k}))[0].size.map((function(e,c){return 0===e.stock?Object(h.jsx)("div",{className:"outOfStock mr-3 ",children:Object(h.jsx)("div",{className:"text d-flex justify-content-center align-items-center",children:e.name.toUpperCase()})},c):Object(h.jsx)("button",{className:"box sizebtn s".concat(e.name," mr-3 d-flex justify-content-center align-items-center"),onClick:function(){return function(e,c){document.querySelectorAll(".sizebtn").forEach((function(e){e.classList.remove("focus")})),document.querySelector(".box.sizebtn.s".concat(e)).classList.add("focus"),A(e)}(e.name)},children:e.name.toUpperCase()},c)}))})]})]}),Object(h.jsxs)("div",{className:"quantity pt-1 d-flex align-items-center",children:[Object(h.jsx)("h5",{className:"mr-5 my-0",children:"Quantity"}),Object(h.jsx)("div",{className:"quantity-btn",children:Object(h.jsx)("input",{className:"py-3 text-center",type:"number",pattern:"[0-9]*",min:"1",value:z,onChange:function(e){return I(Number(e.target.value))}})})]}),Object(h.jsxs)("div",{className:"py-5",children:[Object(h.jsx)(b.a,{styleClass:"color square lighter mx-4",name:"Add To Cart",onClick:function(){return function(e,t,s,n,r){e&&n&&r?(i(c,{color:e,colorPrice:t,colorDiscount:s,size:n,quantity:r}),document.querySelectorAll(".sizebtn").forEach((function(e){e.classList.remove("focus")})),I(1),A(null),u.b.success("You've just added ".concat(r," ").concat(a," - Size: ").concat(n.toUpperCase()," & Color: ").concat(e," successfully !"),m.m)):u.b.error("Please choose color & size",m.m)}(k,w,C,S,z)}}),Object(h.jsx)(b.a,{onClick:function(){return t(c)},styleClass:"color square lighter mx-4",children:Object(h.jsx)("i",{className:"bi bi-heart"})})]})]})})),O=t(3),f=t(220),v=t.n(f),N={lazyLoad:!0,showBullets:!0,showPlayButton:!1,showFullscreenButton:!1},g=function(e){var c=e.product,t=[];return c.image.map((function(e){return t.push({original:e,thumbnail:e})})),Object(h.jsx)("div",{className:"image-gallery-wrapper",children:Object(h.jsx)(v.a,Object(O.a)(Object(O.a)({},N),{},{items:t}))})},k=function(e){var c=e.product,t=e.onClick;return Object(h.jsx)("div",{className:"product-quickview",id:"quickview",children:Object(h.jsxs)("div",{className:"inner row",children:[Object(h.jsx)("div",{className:"image",children:Object(h.jsx)(g,{product:c})}),Object(h.jsx)("div",{className:"detail",children:Object(h.jsx)(x,{product:c})}),Object(h.jsx)("div",{className:"close-btn px-4 py-3",onClick:t,children:Object(h.jsx)("i",{className:"bi bi-x-circle"})})]})})},w=t(204),C=t(212),y=document.getElementById("product_modal"),P=Object(a.b)({showProductModal:C.d}),S=Object(i.b)(P,(function(e){return{addItemToFavourite:function(c){return e(Object(l.a)(c))},toggleProductModal:function(){return e(Object(w.d)())}}}))((function(e){var c=e.product,t=e.addItemToFavourite,i=Object(s.useState)(!1),a=Object(n.a)(i,2),l=a[0],d=a[1],j=window.screen.width<600,u=c.name,b=c.image,p=c.sku,x=c.price,O=c.isNewItem,f=c.variation;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("div",{className:"product-card-grid",children:[Object(h.jsxs)("div",{className:"image-box mb-3",children:[Object(h.jsx)(r.b,{to:"/products/".concat(u.toLowerCase().replace(/ /g,"-"),".").concat(p),children:Object(h.jsx)("img",{src:b[0],alt:u})}),O&&Object(h.jsx)("div",{className:"special new p-3",children:"New"}),0===f[0].discount?"":Object(h.jsxs)("div",{className:"special sale p-3",children:["-",f[0].discount,"%"]}),Object(h.jsxs)("div",{className:"icon-group",children:[Object(h.jsx)("div",{className:"box favourite mb-2 px-3 py-2",onClick:function(){return t(c)},children:Object(h.jsx)("i",{className:"bi bi-heart icon"})}),!0===j?Object(h.jsx)("div",{className:"box cart px-3 py-2",children:Object(h.jsx)(r.b,{to:"/products/".concat(u.toLowerCase().replace(/ /g,"-"),".").concat(p),children:Object(h.jsx)("i",{className:"bi bi-bag-plus icon"})})}):Object(h.jsx)("div",{className:"box cart px-3 py-2",onClick:function(){return d(!0)},children:Object(h.jsx)("i",{className:"bi bi-bag-plus icon"})})]})]}),Object(h.jsxs)("div",{className:"content",children:[Object(h.jsx)(r.b,{to:"/products/".concat(u.toLowerCase().replace(/ /g,"-"),".").concat(p),children:Object(h.jsx)("h3",{className:"name",children:u})}),0===f[0].discount?Object(h.jsx)("div",{children:Object(h.jsxs)("span",{className:"mr-4",children:["$",x.toFixed(2)]})}):Object(h.jsxs)("div",{children:[Object(h.jsxs)("span",{className:"mr-4 old-price",children:["$",x.toFixed(2)]}),Object(h.jsxs)("span",{className:"sale-price",children:["$",Object(m.c)(x,f[0].discount)]})]})]})]}),l&&!1===j?Object(o.createPortal)(Object(h.jsx)(k,{product:c,onClick:function(){return d(!1)}}),y):""]})})),A=document.getElementById("product_modal"),F=Object(i.b)(null,(function(e){return{addItemToFavourite:function(c){return e(Object(l.a)(c))}}}))((function(e){var c=e.product,t=e.addItemToFavourite,i=Object(s.useState)(!1),a=Object(n.a)(i,2),l=a[0],d=a[1],j=c.name,u=c.image,b=c.sku,p=c.price,x=c.isNewItem,O=c.variation,f=c.shortDescription;return Object(h.jsxs)("div",{className:"product-card-single row",children:[Object(h.jsxs)("div",{className:"image-box col-sm-4 mb-4",children:[Object(h.jsx)(r.b,{to:"/products/".concat(j.toLowerCase().replace(/ /g,"-"),".").concat(b),children:Object(h.jsx)("img",{src:u,alt:j})}),x&&Object(h.jsx)("div",{className:"special new p-3",children:"New"}),0===O[0].discount?"":Object(h.jsxs)("div",{className:"special sale p-3",children:["-",O[0].discount,"%"]})]}),Object(h.jsxs)("div",{className:"content px-4 col-sm-8 d-flex flex-column",children:[Object(h.jsx)(r.b,{to:"/products/".concat(j.toLowerCase().replace(/ /g,"-"),".").concat(b),className:"my-3 order-md-1 order-lg-2",children:Object(h.jsx)("h4",{className:"bold",children:j})}),Object(h.jsx)("div",{className:"price mb-3 order-md-2 order-lg-1",children:0===O[0].discount?Object(h.jsxs)("span",{className:"mr-4",children:["$",p.toFixed(2)]}):Object(h.jsxs)("div",{children:[Object(h.jsxs)("span",{className:"mr-4 old-price",children:["$",p.toFixed(2)]}),Object(h.jsxs)("span",{className:"sale-price",children:["$",Object(m.c)(p,O[0].discount)]})]})}),Object(h.jsxs)("div",{className:"icon-group d-flex order-md-3 order-lg-4 mb-3",children:[Object(h.jsx)("i",{className:"bi bi-heart icon mr-5",onClick:function(){return t(c)}}),Object(h.jsx)("i",{className:"bi bi-bag-plus icon",onClick:function(){return d(!0)}})]}),Object(h.jsx)("p",{className:"description order-md-4 order-lg-2 mb-4",children:f})]}),l?Object(o.createPortal)(Object(h.jsx)(k,{product:c,onClick:function(){return d(!1)}}),A):""]})}));c.a=function(e){var c=e.product,t=e.singleColumn;return Object(h.jsx)("div",{className:"product-card col px-4 pb-5 mb-2",children:t?Object(h.jsx)(F,{product:c}):Object(h.jsx)(S,{related:!0,product:c})})}},238:function(e,c,t){"use strict";var s=t(0),n=t(255),i=t.n(n),r=t(210),a=t(2),o={container:".my-slider",lazyload:!0,mouseDrag:!0,loop:!0,items:1,gutter:10,controlsText:["<",">"],arrowKeys:!0,nav:!0,navPosition:"bottom",navContainer:!1,navAsThumbnails:!0,responsive:{350:{items:2,controls:!0,edgePadding:10},700:{items:4,edgePadding:10}}};c.a=function(e){var c=e.products;return Object(s.useEffect)((function(){return document.querySelectorAll('button[data-controls="next"]').forEach((function(e){e.innerHTML='<i class="bi bi-chevron-right icon" />'})),document.querySelectorAll('button[data-controls="prev"]').forEach((function(e){e.innerHTML='<i class="bi bi-chevron-left icon" />'})),function(){}}),[]),Object(a.jsx)("div",{className:"product-slider",children:Object(a.jsx)(i.a,{settings:o,className:"row mx-1 my-2",children:c.map((function(e){return Object(a.jsx)(r.a,{product:e},e.sku)}))})})}},330:function(e,c,t){"use strict";t.r(c);var s=t(0),n=t(202),i=t.n(n),r=t(30),a=t(24),o=t(207),l=t(36),d=t(238),j=t(2),u=function(e){var c=e.data,t=e.title,s=e.link;return Object(j.jsx)("div",{className:"section shop-preview",children:Object(j.jsxs)("div",{className:"container",children:[Object(j.jsxs)("div",{className:"section-title d-flex align-items-baseline pb-4 mb-4",children:[Object(j.jsx)("h2",{className:"ml-5",children:t}),Object(j.jsxs)(l.b,{to:s,className:"text-link ml-auto mr-5",children:["View all ",Object(j.jsx)("i",{className:"bi bi-arrow-right"})]})]}),Object(j.jsx)("div",{className:"row",children:c&&Object(j.jsx)(d.a,{products:c})})]})})},b=t(203),m=t(226),p=t(221),h=Object(a.b)({allProducts:p.f,womenProducts:p.h,menProducts:p.d,kidsProducts:p.c,accessoriesProducts:p.a,newArrivalsProducts:p.e,saleProducts:p.g});c.default=Object(r.b)(h,(function(e){return{fetchProductsStartAsync:function(){return e(Object(m.a)())}}}))((function(e){var c=e.fetchProductsStartAsync,t=e.allProducts,n=e.womenProducts,r=e.menProducts,a=e.kidsProducts,l=e.accessoriesProducts,d=e.newArrivalsProducts,m=e.saleProducts;return Object(s.useEffect)((function(){c()}),[c]),Object(j.jsxs)("div",{className:"shop",children:[Object(j.jsxs)(i.a,{children:[Object(j.jsx)("title",{children:"Shine | Shop All Collections "}),Object(j.jsx)("meta",{name:"description",content:"Shine Online Shop"})]}),Object(j.jsxs)(o.a,{children:[Object(j.jsx)(b.a,{path:"home, shop"}),t&&Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(u,{title:"Women Collections",link:"/shop/women",data:n}),Object(j.jsx)(u,{title:"Men Collections",link:"/shop/men",data:r}),Object(j.jsx)(u,{title:"Kids Collections",link:"/shop/kids",data:a}),Object(j.jsx)(u,{title:"Shoes & Accessories",link:"/shop/accessories",data:l}),Object(j.jsx)(u,{title:"New Arrivals",link:"/shop/new-arrivals",data:d}),Object(j.jsx)(u,{title:"All Sale Products",link:"/shop/sale",data:m})]})]})]})}))}}]);