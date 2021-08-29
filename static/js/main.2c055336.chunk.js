(this["webpackJsonpreact-n-puzzle"]=this["webpackJsonpreact-n-puzzle"]||[]).push([[0],{80:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(9),c=t.n(r),l=t(32),i=t(33),s=t(16),u=t(58),d=t(104),b=t(116),h=t(111),m=t(112),j=t(114),f=t(105),v=t(113),O=t(46),p=t.n(O),g=t(45),w=t.n(g),x=t(60),C=t(3),k=50,y=Object(d.a)((function(e){return Object(b.a)({root:function(e){return{minWidth:k,minHeight:k,width:k,height:k,margin:2,position:"".concat(e.hidden?"initial":"absolute"),visibility:"".concat(e.hidden?"hidden":"visible"),left:52*e.position.column,top:52*e.position.row,transition:"all 0.6s ease",backgroundColor:"#444","&:hover":{backgroundColor:"#00000090"},"@media (hover: hover)":{"&:hover":{backgroundColor:"#00000090"}}}}})})),B=function(e){var n=y(e);return Object(C.jsx)(f.a,{className:n.root,onClick:function(){return e.onClick(e.position)},children:e.value})},N=Object(d.a)((function(e){return Object(b.a)({root:function(e){return{display:"inline-flex",position:"relative",flexDirection:"column",background:"orange",borderRadius:5}}})})),D=function(e){for(var n=N(e),t=[],o=[],a=0;a<e.boardConfig.length;a++){for(var r=e.boardConfig[a],c=[],l=0;l<r.length;l++)null!==r[l]&&t.push(Object(C.jsx)(B,{position:{row:a,column:l},value:r[l],onClick:function(n){return e.handleClickTile(n)}},r[l])),c.push(Object(C.jsx)(B,{position:{row:a,column:l},hidden:!0,onClick:function(n){return e.handleClickTile(n)}},l));o.push(Object(C.jsx)(j.a,{children:c},a))}return Object(C.jsxs)(j.a,{"data-testid":"board",className:n.root,children:[t,o]})},F=t(115),I=t(110),R=t(107),S=t(108),T=t(109),z=function(e){var n=e.content,t=e.setContent,o=function(){void 0!==n.alternative1Function&&n.alternative1Function(),t(null)},a=null;return void 0!==n.description&&(a=Object(C.jsx)(R.a,{children:Object(C.jsx)(S.a,{id:"alert-dialog-description",children:n.description})})),Object(C.jsx)("div",{children:Object(C.jsxs)(F.a,{open:!0,onClose:o,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(C.jsx)(T.a,{id:"alert-dialog-title",children:n.title}),a,Object(C.jsxs)(I.a,{children:[Object(C.jsx)(f.a,{onClick:o,color:"secondary",children:n.alternative1}),void 0!==n.alternative2&&Object(C.jsx)(f.a,{onClick:function(){void 0!==n.alternative2Function&&n.alternative2Function(),t(null)},color:"secondary",autoFocus:!0,children:n.alternative2})]})]})})},M=Object(u.a)({palette:{type:"dark"},typography:{fontFamily:'"Open Sans", sans-serif'}}),A=Object(d.a)((function(e){var n,t,o,a;return Object(b.a)({root:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minWidth:320,width:"100vw",height:"100vh",padding:20,background:"#333"},contentContainer:(n={width:"100vw",height:5304},Object(s.a)(n,"".concat(e.breakpoints.up("md")),{width:594,height:314}),Object(s.a)(n,"".concat(e.breakpoints.down("sm")," and (orientation: landscape)"),{width:540,height:314}),n),levelBox:(t={justifyContent:"center",display:"flex",marginBottom:40},Object(s.a)(t,"".concat(e.breakpoints.up("md")),{justifyContent:"flex-start"}),Object(s.a)(t,"".concat(e.breakpoints.down("sm")," and (orientation: landscape)"),{justifyContent:"flex-start"}),t),panelAndBoardContainer:(o={display:"flex",alignItems:"center",flexDirection:"column"},Object(s.a)(o,"".concat(e.breakpoints.up("md")),{flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between"}),Object(s.a)(o,"".concat(e.breakpoints.down("sm")," and (orientation: landscape)"),{flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between"}),o),controlPanel:(a={display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},Object(s.a)(a,"".concat(e.breakpoints.up("md")),{alignItems:"flex-start",marginRight:50}),Object(s.a)(a,"".concat(e.breakpoints.down("sm")," and (orientation: landscape)"),{alignItems:"flex-start",marginRight:20}),a),shuffleButton:{marginTop:20,marginBottom:40,backgroundColor:"#4a4a4a","&:hover":{backgroundColor:"#4a4a4a"},"@media (hover: hover)":{"&:hover":{backgroundColor:"#0000000a"}}},nrOfRowsOrColumnsBox:Object(s.a)({display:"flex",alignItems:"center",justifyContent:"space-between",width:272,marginBottom:20},"".concat(e.breakpoints.down("sm")," and (orientation: landscape)"),{width:232}),nrOfRowsOrColumnsText:{display:"flex",alignItems:"center",borderRadius:8,padding:5,fontSize:16,margin:"0 10px 0 10px",userSelect:"none"},increaseOrDecreaseButton:{backgroundColor:"#4a4a4a","&:hover":{backgroundColor:"#4a4a4a"},"@media (hover: hover)":{"&:hover":{backgroundColor:"#0000000a"}}},rootButton:{"&$disabled":{backgroundColor:"#4a4a4a"}},disabled:{},boardBox:{display:"flex",justifyContent:"center"},typography:{userSelect:"none"}})}));var P=function(){var e=A(),n=function(e){for(var n={row:0,column:0},t=0;t<e.length;t++)for(var o=e[t],a=0;a<o.length;a++){null===o[a]&&(n={row:t,column:a})}return n},t=Object(o.useCallback)((function(e,t){var o=n(t);if(e.row===o.row)if(e.column<o.column)for(var a={row:e.row,column:o.column-1};a.column>=e.column;)t[o.row][o.column]=t[a.row][a.column],a.column=a.column-1,o={row:o.row,column:o.column-1};else for(var r={row:e.row,column:o.column+1};r.column<=e.column;)t[o.row][o.column]=t[r.row][r.column],r.column=r.column+1,o={row:o.row,column:o.column+1};else if(e.column===o.column)if(e.row<o.row)for(var c={row:o.row-1,column:e.column};c.row>=e.row;)t[o.row][o.column]=t[c.row][c.column],c.row=c.row-1,o={row:o.row-1,column:o.column};else for(var l={row:o.row+1,column:e.column};l.row<=e.row;)t[o.row][o.column]=t[l.row][l.column],l.row=l.row+1,o={row:o.row+1,column:o.column};return t[o.row][o.column]=null,t}),[]),a=Object(o.useCallback)((function(e){console.log(e);var o,a=e.length,r=e[0].length,c={row:0,column:0};o=Math.random()<.5?"horizontal":"vertical";for(var l=a*r*4,i=0;i<l;i++){var s=n(e);if("horizontal"===o){for(var u=!1,d=0;!u;){var b=Math.round(Math.random()*(r-1));b!==s.column&&(d=b,u=!0)}c={row:s.row,column:d},o="vertical"}else if("vertical"===o){for(var h=!1,m=0;!h;){var j=Math.round(Math.random()*(a-1));j!==s.row&&(m=j,h=!0)}c={row:m,column:s.column},o="horizontal"}e=t(c,e)}return e}),[t]),r=function(e,n){for(var t=[],o=0;o<e;o++){t.push([]);for(var r=0;r<n;r++)o===e-1&&r===n-1?t[o].push(null):t[o].push(o*n+r+1)}return a(t)},c=Object(o.useState)((function(){return r(2,2)})),s=Object(i.a)(c,2),u=s[0],d=s[1],b=Object(o.useState)(1),O=Object(i.a)(b,2),g=O[0],k=O[1],y=Object(o.useState)(null),B=Object(i.a)(y,2),N=B[0],F=B[1],I=Object(o.useState)(!1),R=Object(i.a)(I,2),S=R[0],T=R[1],P=function(e){F({title:"Are you sure?",description:"This will quit your current game.",alternative1:"Cancel",alternative2:"OK",alternative2Function:function(){e(),T(!1)}})},L=u.length,J=u[0].length;return Object(C.jsxs)(h.a,{theme:M,children:[Object(C.jsx)(m.a,{}),Object(C.jsx)(j.a,{className:e.root,children:Object(C.jsxs)(j.a,{className:e.contentContainer,children:[Object(C.jsx)(j.a,{className:e.levelBox,children:Object(C.jsx)(x.a,{className:e.typography,display:"block",variant:"h4",color:"secondary",children:"Level "+g})}),Object(C.jsxs)(j.a,{className:e.panelAndBoardContainer,children:[Object(C.jsxs)(j.a,{className:e.controlPanel,children:[Object(C.jsxs)(j.a,{className:e.nrOfRowsOrColumnsBox,children:[Object(C.jsx)(x.a,{className:e.typography,display:"block",variant:"body1",style:{width:"120px"},children:"Rows:"}),Object(C.jsx)(v.a,{className:e.increaseOrDecreaseButton,classes:{root:e.rootButton,disabled:e.disabled},"aria-label":"subtract",disabled:2===L,onClick:function(){var e=u.length,n=u[0].length;if(S)P((function(){k(g-1);var t=r(e-1,n);d(t)}));else{k(g-1);var t=r(e-1,n);d(t)}},children:Object(C.jsx)(w.a,{})}),Object(C.jsx)("span",{className:e.nrOfRowsOrColumnsText,children:L}),Object(C.jsx)(v.a,{className:e.increaseOrDecreaseButton,classes:{root:e.rootButton,disabled:e.disabled},"aria-label":"add",disabled:4===L,onClick:function(){var e=u.length,n=u[0].length;if(S)P((function(){k(g+1);var t=r(e+1,n);d(t)}));else{k(g+1);var t=r(e+1,n);d(t)}},children:Object(C.jsx)(p.a,{})})]}),Object(C.jsxs)(j.a,{className:e.nrOfRowsOrColumnsBox,children:[Object(C.jsx)(x.a,{className:e.typography,display:"block",variant:"body1",style:{width:"120px"},children:"Columns:"}),Object(C.jsx)(v.a,{className:e.increaseOrDecreaseButton,classes:{root:e.rootButton,disabled:e.disabled},"aria-label":"subtract",disabled:2===J,onClick:function(){var e=u.length,n=u[0].length;if(S)P((function(){k(g-1);var t=r(e,n-1);d(t)}));else{k(g-1);var t=r(e,n-1);d(t)}},children:Object(C.jsx)(w.a,{})}),Object(C.jsx)("span",{className:e.nrOfRowsOrColumnsText,children:J}),Object(C.jsx)(v.a,{className:e.increaseOrDecreaseButton,classes:{root:e.rootButton,disabled:e.disabled},"aria-label":"add",disabled:4===J,onClick:function(){var e=u.length,n=u[0].length;if(S)P((function(){k(g+1);var t=r(e,n+1);d(t)}));else{k(g+1);var t=r(e,n+1);d(t)}},children:Object(C.jsx)(p.a,{})})]}),Object(C.jsx)(f.a,{className:e.shuffleButton,onClick:function(){S?P((function(){return d(a(Object(l.a)(u)))})):d(a(Object(l.a)(u)))},children:"shuffle"})]}),Object(C.jsx)(j.a,{className:e.boardBox,children:Object(C.jsx)(D,{boardConfig:u,handleClickTile:function(e){return function(e){var o=n(Object(l.a)(u));if(e.row===o.row||e.column===o.column){var a=t(e,Object(l.a)(u));!S&&T(!0);for(var c=!0,i=0;i<L&&c;i++)for(var s=0;s<J&&c;s++)a[i][s]===i*J+s+1||i===L-1&&s===J-1||(c=!1);if(c){var b=a.length,h=a[0].length;F(5===g?{title:"Congratulations!",description:"You have finished the last level. Great job!!",alternative2:"Ok"}:{title:"Congratulations!",description:"You finished level ".concat(g,". Advancing to level ").concat(g+1,"."),alternative2:"Ok",alternative2Function:function(){a=h<=b?r(b,h+1):r(b+1,h),k(g+1),d(a)}})}d(a)}}(e)}})})]}),null!==N&&Object(C.jsx)(z,{content:N,setContent:F})]})})]})},L=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,118)).then((function(n){var t=n.getCLS,o=n.getFID,a=n.getFCP,r=n.getLCP,c=n.getTTFB;t(e),o(e),a(e),r(e),c(e)}))};c.a.render(Object(C.jsx)(a.a.StrictMode,{children:Object(C.jsx)(P,{})}),document.getElementById("root")),L()}},[[80,1,2]]]);
//# sourceMappingURL=main.2c055336.chunk.js.map