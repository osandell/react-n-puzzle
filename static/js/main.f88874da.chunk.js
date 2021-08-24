(this["webpackJsonpreact-n-puzzle"]=this["webpackJsonpreact-n-puzzle"]||[]).push([[0],{81:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(9),c=t.n(r),l=t(43),i=t(44),s=t(16),u=t(14),d=t(59),b=t(105),j=t(117),m=t(112),f=t(113),h=t(115),O=t(106),v=t(114),p=t(47),w=t.n(p),x=t(46),g=t.n(x),C=t(61),y=t(3),k=Object(b.a)((function(e){return Object(j.a)({root:function(e){return{width:45,height:50,margin:2,backgroundColor:"#444","&:hover":{backgroundColor:"#00000090"},"@media (hover: hover)":{"&:hover":{backgroundColor:"#00000090"}},visibility:"".concat(null===e.value?"hidden":"visible")}}})})),B=function(e){var n=k(e);return Object(y.jsx)(O.a,{className:n.root,onClick:function(){return e.onClick(e.position)},children:null===e.value?"\xa0":e.value})},N=Object(b.a)((function(e){return Object(j.a)({root:{display:"inline-flex",flexDirection:"column",background:"orange",borderRadius:5}})})),S=function(e){for(var n=e.boardConfig,t=e.handleClickTile,o=N(),a=[],r=0;r<n.length;r++){for(var c=n[r],l=[],i=0;i<c.length;i++)l.push(Object(y.jsx)(B,{position:{row:r,column:i},value:c[i],onClick:function(e){return t(e)}},i));a.push(Object(y.jsx)(h.a,{children:l},r))}return Object(y.jsx)(h.a,{"data-testid":"board",className:o.root,children:a})},D=t(116),F=t(111),I=t(108),R=t(109),T=t(110),z=function(e){var n=e.content,t=e.setContent,o=function(){void 0!==n.alternative1Function&&n.alternative1Function(),t(null)},a=null;return void 0!==n.description&&(a=Object(y.jsx)(I.a,{children:Object(y.jsx)(R.a,{id:"alert-dialog-description",children:n.description})})),Object(y.jsx)("div",{children:Object(y.jsxs)(D.a,{open:!0,onClose:o,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(y.jsx)(T.a,{id:"alert-dialog-title",children:n.title}),a,Object(y.jsxs)(F.a,{children:[Object(y.jsx)(O.a,{onClick:o,color:"secondary",children:n.alternative1}),void 0!==n.alternative2&&Object(y.jsx)(O.a,{onClick:function(){void 0!==n.alternative2Function&&n.alternative2Function(),t(null)},color:"secondary",autoFocus:!0,children:n.alternative2})]})]})})},M=Object(d.a)({palette:{type:"dark"},typography:{fontFamily:'"Open Sans", sans-serif'}}),A=Object(b.a)((function(e){var n,t,o,a;return Object(j.a)({root:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minWidth:320,width:"100vw",height:"100vh",padding:20,background:"#333"},contentContainer:(n={width:"100vw",height:5304},Object(u.a)(n,"".concat(e.breakpoints.up("md")),{width:594,height:314}),Object(u.a)(n,"".concat(e.breakpoints.down("sm")," and (orientation: landscape)"),{width:540,height:314}),n),levelBox:(t={justifyContent:"center",display:"flex",marginBottom:40},Object(u.a)(t,"".concat(e.breakpoints.up("md")),{justifyContent:"flex-start"}),Object(u.a)(t,"".concat(e.breakpoints.down("sm")," and (orientation: landscape)"),{justifyContent:"flex-start"}),t),panelAndBoardContainer:(o={display:"flex",alignItems:"center",flexDirection:"column"},Object(u.a)(o,"".concat(e.breakpoints.up("md")),{flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between"}),Object(u.a)(o,"".concat(e.breakpoints.down("sm")," and (orientation: landscape)"),{flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between"}),o),controlPanel:(a={display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},Object(u.a)(a,"".concat(e.breakpoints.up("md")),{alignItems:"flex-start",marginRight:50}),Object(u.a)(a,"".concat(e.breakpoints.down("sm")," and (orientation: landscape)"),{alignItems:"flex-start",marginRight:20}),a),shuffleButton:{marginTop:20,marginBottom:40,backgroundColor:"#4a4a4a","&:hover":{backgroundColor:"#4a4a4a"},"@media (hover: hover)":{"&:hover":{backgroundColor:"#0000000a"}}},nrOfRowsOrColumnsBox:Object(u.a)({display:"flex",alignItems:"center",justifyContent:"space-between",width:272,marginBottom:20},"".concat(e.breakpoints.down("sm")," and (orientation: landscape)"),{width:232}),nrOfRowsOrColumnsText:{display:"flex",alignItems:"center",borderRadius:8,padding:5,fontSize:16,margin:"0 10px 0 10px",userSelect:"none"},increaseOrDecreaseButton:{backgroundColor:"#4a4a4a","&:hover":{backgroundColor:"#4a4a4a"},"@media (hover: hover)":{"&:hover":{backgroundColor:"#0000000a"}}},rootButton:{"&$disabled":{backgroundColor:"#4a4a4a"}},disabled:{},boardBox:{display:"flex",justifyContent:"center"},typography:{userSelect:"none"}})}));var P=function(){var e=A(),n=Object(o.useState)(2),t=Object(s.a)(n,2),a=t[0],r=t[1],c=Object(o.useState)(2),u=Object(s.a)(c,2),d=u[0],b=u[1],j=Object(o.useState)([]),p=Object(s.a)(j,2),x=p[0],k=p[1],B=Object(o.useState)({row:a-1,column:d-1}),N=Object(s.a)(B,2),D=N[0],F=N[1],I=Object(o.useState)(1),R=Object(s.a)(I,2),T=R[0],P=R[1],L=Object(o.useState)(null),E=Object(s.a)(L,2),J=E[0],Y=E[1],q=Object(o.useState)(!1),G=Object(s.a)(q,2),K=G[0],W=G[1],$=function(e,n,t){if(e.row===t.row)if(e.column<t.column)for(var o={row:e.row,column:t.column-1};o.column>=e.column;)n[t.row][t.column]=n[o.row][o.column],o.column=o.column-1,t={row:t.row,column:t.column-1};else for(var a={row:e.row,column:t.column+1};a.column<=e.column;)n[t.row][t.column]=n[a.row][a.column],a.column=a.column+1,t={row:t.row,column:t.column+1};else if(e.column===t.column)if(e.row<t.row)for(var r={row:t.row-1,column:e.column};r.row>=e.row;)n[t.row][t.column]=n[r.row][r.column],r.row=r.row-1,t={row:t.row-1,column:t.column};else for(var c={row:t.row+1,column:e.column};c.row<=e.row;)n[t.row][t.column]=n[c.row][c.column],c.row=c.row+1,t={row:t.row+1,column:t.column};return n[t.row][t.column]=null,[n,t]},H=Object(o.useCallback)((function(e,n){var t,o;o=Math.random()<.5?"horizontal":"vertical";for(var r=a*d*4,c=0;c<r;c++)if("horizontal"===o){for(var l=!1,i=0;!l;){var u=Math.round(Math.random()*(d-1));u!==n.column&&(i=u,l=!0)}t={row:n.row,column:i};var b=$(t,e,n),j=Object(s.a)(b,2);e=j[0],n=j[1],o="vertical"}else if("vertical"===o){for(var m=!1,f=0;!m;){var h=Math.round(Math.random()*(a-1));h!==n.row&&(f=h,m=!0)}t={row:f,column:n.column};var O=$(t,e,n),v=Object(s.a)(O,2);e=v[0],n=v[1],o="horizontal"}e[n.row][n.column]=null,k(e),F(n)}),[d,a]);Object(o.useEffect)((function(){for(var e=[],n=0;n<a;n++){e.push([]);for(var t=0;t<d;t++)n===a-1&&t===d-1?e[n].push(null):e[n].push(n*d+t+1)}H(e,{row:a-1,column:d-1})}),[k,a,d,H]);var Q=function(e){Y({title:"Are you sure?",description:"This will quit your current game.",alternative1:"Cancel",alternative2:"OK",alternative2Function:function(){e(),W(!1)}})};return Object(y.jsxs)(m.a,{theme:M,children:[Object(y.jsx)(f.a,{}),Object(y.jsx)(h.a,{className:e.root,children:Object(y.jsxs)(h.a,{className:e.contentContainer,children:[Object(y.jsx)(h.a,{className:e.levelBox,children:Object(y.jsx)(C.a,{className:e.typography,display:"block",variant:"h4",color:"secondary",children:"Level "+T})}),Object(y.jsxs)(h.a,{className:e.panelAndBoardContainer,children:[Object(y.jsxs)(h.a,{className:e.controlPanel,children:[Object(y.jsxs)(h.a,{className:e.nrOfRowsOrColumnsBox,children:[Object(y.jsx)(C.a,{className:e.typography,display:"block",variant:"body1",style:{width:"120px"},children:"Rows:"}),Object(y.jsx)(v.a,{className:e.increaseOrDecreaseButton,classes:{root:e.rootButton,disabled:e.disabled},"aria-label":"subtract",disabled:2===a,onClick:function(){K?Q((function(){r(a-1),P(T-1)})):(r(a-1),P(T-1))},children:Object(y.jsx)(g.a,{})}),Object(y.jsx)("span",{className:e.nrOfRowsOrColumnsText,children:a}),Object(y.jsx)(v.a,{className:e.increaseOrDecreaseButton,classes:{root:e.rootButton,disabled:e.disabled},"aria-label":"add",disabled:4===a,onClick:function(){K?Q((function(){r(a+1),P(T+1)})):(r(a+1),P(T+1))},children:Object(y.jsx)(w.a,{})})]}),Object(y.jsxs)(h.a,{className:e.nrOfRowsOrColumnsBox,children:[Object(y.jsx)(C.a,{className:e.typography,display:"block",variant:"body1",style:{width:"120px"},children:"Columns:"}),Object(y.jsx)(v.a,{className:e.increaseOrDecreaseButton,classes:{root:e.rootButton,disabled:e.disabled},"aria-label":"subtract",disabled:2===d,onClick:function(){K?Q((function(){b(d-1),P(T-1)})):(b(d-1),P(T-1))},children:Object(y.jsx)(g.a,{})}),Object(y.jsx)("span",{className:e.nrOfRowsOrColumnsText,children:d}),Object(y.jsx)(v.a,{className:e.increaseOrDecreaseButton,classes:{root:e.rootButton,disabled:e.disabled},"aria-label":"add",disabled:4===d,onClick:function(){K?Q((function(){b(d+1),P(T+1)})):(b(d+1),P(T+1))},children:Object(y.jsx)(w.a,{})})]}),Object(y.jsx)(O.a,{className:e.shuffleButton,onClick:function(){K?Q((function(){return H(Object(i.a)(x),Object(l.a)({},D))})):H(Object(i.a)(x),Object(l.a)({},D))},children:"shuffle"})]}),Object(y.jsx)(h.a,{className:e.boardBox,children:Object(y.jsx)(S,{boardConfig:x,handleClickTile:function(e){return function(e){if(e.row===D.row||e.column===D.column){var n=$(e,Object(i.a)(x),Object(l.a)({},D)),t=Object(s.a)(n,2),o=t[0],c=t[1];!K&&W(!0);for(var u=!0,j=0;j<a&&u;j++)for(var m=0;m<d&&u;m++)o[j][m]===j*d+m+1||j===a-1&&m===d-1||(u=!1);u&&Y(5===T?{title:"Congratulations!",description:"You have finished the last level. Great job!!",alternative2:"Ok"}:{title:"Congratulations!",description:"You finished level ".concat(T,". Advancing to level ").concat(T+1,"."),alternative2:"Ok",alternative2Function:function(){d<=a?b(d+1):r(a+1),P(T+1)}}),k(o),F(c)}}(e)}})})]}),null!==J&&Object(y.jsx)(z,{content:J,setContent:Y})]})})]})},L=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,119)).then((function(n){var t=n.getCLS,o=n.getFID,a=n.getFCP,r=n.getLCP,c=n.getTTFB;t(e),o(e),a(e),r(e),c(e)}))};c.a.render(Object(y.jsx)(a.a.StrictMode,{children:Object(y.jsx)(P,{})}),document.getElementById("root")),L()}},[[81,1,2]]]);
//# sourceMappingURL=main.f88874da.chunk.js.map