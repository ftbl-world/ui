(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{48:function(e,t,c){},49:function(e,t,c){},50:function(e,t,c){},56:function(e,t,c){},61:function(e,t,c){"use strict";c.r(t);var a=c(2),s=c(0),n=c.n(s),l=c(8),r=c.n(l),i=(c(48),c(39)),j=c(10);c(49);var d=function(){return Object(a.jsx)("div",{className:"headerContainer",children:Object(a.jsx)("div",{className:"header__title",children:Object(a.jsx)("h2",{children:"ftbl.world"})})})},o=c(31),h=c(93),b=c(92),u=c(35),m=c.n(u);c(50);var O=function(){var e=Object(s.useState)([]),t=Object(o.a)(e,2),c=t[0],n=t[1],l=Object(s.useState)("AllLeagues"),r=Object(o.a)(l,2),i=r[0],j=r[1],d=Object(s.useState)(!1),u=Object(o.a)(d,2),O=u[0],x=u[1],v=function(){fetch("https://floating-crag-91660.herokuapp.com/",{mode:"cors",headers:{"Access-Control-Allow-Origin":"*"}}).then((function(e){return e.json()})).catch((function(e){x(!0)})).then((function(e){n(e)}))},g=function(e){var t=new Date(e),c=("0"+t.getHours()).slice(-2),a=("0"+t.getMinutes()).slice(-2);return"".concat(c,":").concat(a)};return Object(s.useEffect)((function(){var e=localStorage.getItem("ftbl-selected-league")||"AllLeagues";j(e),v(),setInterval((function(){v()}),15e3),m()(document).ready((function(){var e=new Date,t=e.getDate(),c=e.getMonth()+1;c<10&&(c="0"+c),t<10&&(t="0"+t);var a=e.getFullYear()+"-"+c+"-"+t;m()("#datepicker").attr("value",a)}))}),[]),Object(a.jsxs)("div",{className:"liveContainer",children:[Object(a.jsx)("div",{className:"liveContainer__header",children:Object(a.jsxs)("div",{className:"liveContainer__header__content",children:[Object(a.jsx)("span",{className:"live__dot"}),Object(a.jsx)("span",{className:"live__title",children:"Live Scores"})]})}),Object(a.jsx)("div",{className:"liveContainer__body",children:Object(a.jsxs)("div",{className:"liveContainer__body__scores",children:[!0===O&&Object(a.jsx)("div",{className:"errorPage",children:Object(a.jsx)("span",{children:"Cannot fetch the data right now."})}),!1===O&&Object(a.jsx)("div",{className:"league__selector",children:Object(a.jsxs)(b.a,{id:"leagueSelect",value:i,onChange:function(e){return function(e){j(e.target.value),localStorage.setItem("ftbl-selected-league",e.target.value)}(e)},children:[Object(a.jsx)(h.a,{value:"AllLeagues",children:"All Leagues"}),!1===O&&c.map((function(e,t){return Object(a.jsx)(h.a,{value:e.leagueID,children:e.name})}))]})}),!1===O&&c.filter((function(e){return"AllLeagues"===i?e:e.leagueID===i})).map((function(e,t){return Object(a.jsxs)("div",{id:e.leagueID,className:"liveContainer__body__leagueContainer",children:[Object(a.jsx)("div",{className:"leagueNameContainer",children:Object(a.jsx)("span",{className:"leagueName",children:e.name})}),Object(a.jsx)("table",{children:Object(a.jsxs)("tbody",{children:[e.matches.length>0&&e.matches.map((function(e){return Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{className:"liveScore__homeTeam",children:Object(a.jsxs)("div",{className:"home__name__logo",children:[Object(a.jsx)("span",{className:"homeTeam",children:e.homeTeam}),Object(a.jsx)("img",{src:e.homeTeamLogoUrl,width:"20",height:"20",alt:""})]})}),Object(a.jsx)("td",{className:"liveScore",children:Object(a.jsxs)("div",{className:"liveScoreContainer",children:[""!==e.time.state&&Object(a.jsx)("span",{className:"state",children:Object(a.jsx)("b",{children:e.time.state})}),""===e.time.state?Object(a.jsx)("span",{className:"score",children:Object(a.jsxs)("b",{children:["\xa0\xa0\xa0",g(e.time.status),"\xa0\xa0\xa0"]})}):Object(a.jsx)("span",{className:"score",children:Object(a.jsxs)("b",{children:["\xa0\xa0\xa0",e.homeScore," - ",e.awayScore,"\xa0\xa0\xa0"]})})]})}),Object(a.jsx)("td",{className:"liveScore__awayTeam",children:Object(a.jsxs)("div",{className:"away__name__logo",children:[Object(a.jsx)("img",{src:e.awayTeamLogoUrl,width:"20",height:"20",alt:""}),Object(a.jsx)("span",{className:"awayTeam",children:e.awayTeam})]})})]},e.matchID)})),0===e.matches.length&&Object(a.jsx)("tr",{children:Object(a.jsx)("td",{children:Object(a.jsx)("div",{className:"noGames",children:Object(a.jsx)("span",{children:Object(a.jsx)("b",{children:"No scheduled matches today."})})})})})]})})]},e.leagueID)}))]})})]})};c(56);var x=function(){return Object(a.jsx)(i.a,{children:Object(a.jsx)("div",{id:"wrapper",children:Object(a.jsxs)(j.c,{children:[Object(a.jsx)(j.a,{path:"/home",render:function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(d,{})})}}),Object(a.jsx)(j.a,{path:"/score",render:function(){return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(d,{}),Object(a.jsx)(O,{})]})}}),Object(a.jsx)(j.a,{path:"/",render:function(){return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(d,{}),Object(a.jsx)(O,{})]})}})]})})})},v=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,95)).then((function(t){var c=t.getCLS,a=t.getFID,s=t.getFCP,n=t.getLCP,l=t.getTTFB;c(e),a(e),s(e),n(e),l(e)}))};r.a.render(Object(a.jsx)(n.a.StrictMode,{children:Object(a.jsx)(x,{})}),document.getElementById("root")),v()}},[[61,1,2]]]);
//# sourceMappingURL=main.2af5ada8.chunk.js.map