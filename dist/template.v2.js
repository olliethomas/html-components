(function(e,t){'object'==typeof exports&&'undefined'!=typeof module?t():'function'==typeof define&&define.amd?define(t):t()})(this,function(){'use strict';function e(e,t){e.title=t.title,t.published&&(t.published instanceof Date?e.publishedDate=t.published:t.published.constructor===String&&(e.publishedDate=new Date(t.published))),t.publishedDate&&(t.publishedDate instanceof Date?e.publishedDate=t.publishedDate:t.publishedDate.constructor===String?e.publishedDate=new Date(t.publishedDate):console.error('Don\'t know what to do with published date: '+t.publishedDate)),e.description=t.description,e.authors=t.authors.map((e)=>new wi(e)),e.katex=t.katex,e.password=t.password,t.doi&&(e.doi=t.doi)}function t(e=document){const t=new Set,n=e.querySelectorAll('d-cite');for(const i of n){const e=i.getAttribute('key')||i.getAttribute('bibtex-key'),n=e.split(',').map((e)=>e.trim());for(const e of n)t.add(e)}return[...t]}function n(e,t,n,i){if(null==e.author)return'';var a=e.author.split(' and ');let d=a.map((e)=>{if(e=e.trim(),-1!=e.indexOf(','))var n=e.split(',')[0].trim(),i=e.split(',')[1];else if(-1!=e.indexOf(' '))var n=e.split(' ').slice(-1)[0].trim(),i=e.split(' ').slice(0,-1).join(' ');else var n=e.trim();var a='';return void 0!=i&&(a=i.trim().split(' ').map((e)=>e.trim()[0]),a=a.join('.')+'.'),t.replace('${F}',i).replace('${L}',n).replace('${I}',a).trim()});if(1<a.length){var r=d.slice(0,a.length-1).join(n);return r+=(i||n)+d[a.length-1],r}return d[0]}function i(e){var t=e.journal||e.booktitle||'';if('volume'in e){var n=e.issue||e.number;n=void 0==n?'':'('+n+')',t+=', Vol '+e.volume+n}return'pages'in e&&(t+=', pp. '+e.pages),''!=t&&(t+='. '),'publisher'in e&&(t+=e.publisher,'.'!=t[t.length-1]&&(t+='.')),t}function a(e){if('url'in e){var t=e.url,n=/arxiv\.org\/abs\/([0-9\.]*)/.exec(t);if(null!=n&&(t=`http://arxiv.org/pdf/${n[1]}.pdf`),'.pdf'==t.slice(-4))var i='PDF';else if('.html'==t.slice(-5))var i='HTML';return` &ensp;<a href="${t}">[${i||'link'}]</a>`}return''}function d(e,t){return'doi'in e?`${t?'<br>':''} <a href="https://doi.org/${e.doi}" style="text-decoration:inherit;">DOI: ${e.doi}</a>`:''}function r(e){return'<span class="title">'+e.title+'</span> '}function o(e){if(e){var t=r(e);return t+=a(e)+'<br>',e.author&&(t+=n(e,'${L}, ${I}',', ',' and '),(e.year||e.date)&&(t+=', ')),t+=e.year||e.date?(e.year||e.date)+'. ':'. ',t+=i(e),t+=d(e),t}return'?'}function l(e){if(e){var t='';t+='<strong>'+e.title+'</strong>',t+=a(e),t+='<br>';var r=n(e,'${I} ${L}',', ')+'.',o=i(e).trim()+' '+e.year+'. '+d(e,!0);return t+=(r+o).length<hi(40,e.title.length)?r+' '+o:r+'<br>'+o,t}return'?'}function s(){return-1!==['interactive','complete'].indexOf(document.readyState)}function c(e){for(let t of e.authors){const e=!!t.affiliation,n=!!t.affiliations;if(e)if(n)console.warn(`Author ${t.author} has both old-style ("affiliation" & "affiliationURL") and new style ("affiliations") affiliation information!`);else{let e={name:t.affiliation};t.affiliationURL&&(e.url=t.affiliationURL),t.affiliations=[e]}}return e}function u(e){const t=e.firstElementChild;if(t){const e=t.getAttribute('type');if('json'==e.split('/')[1]){const e=t.textContent,n=JSON.parse(e);return c(n)}console.error('Distill only supports JSON frontmatter tags anymore; no more YAML.')}else console.error('You added a frontmatter tag but did not provide a script tag with front matter data in it. Please take a look at our templates.');return{}}function p(e){const t='distill-prerendered-styles',n=e.getElementById(t);if(!n){const n=e.createElement('style');n.id=t,n.type='text/css';const i=e.createTextNode(Pi);n.appendChild(i);const a=e.head.querySelector('script');e.head.insertBefore(n,a)}}function g(e,t){console.debug('Runlevel 0: Polyfill required: '+e.name);const n=document.createElement('script');n.src=e.url,n.async=!1,t&&(n.onload=function(){t(e)}),n.onerror=function(){new Error('Runlevel 0: Polyfills failed to load script '+e.name)},document.head.appendChild(n)}function f(e,t){return t={exports:{}},e(t,t.exports),t.exports}function h(e){return e.replace(/[\t\n ]+/g,' ').replace(/{\\["^`.'acu~Hvs]( )?([a-zA-Z])}/g,(e,t,n)=>n).replace(/{\\([a-zA-Z])}/g,(e,t)=>t)}function b(e){const t=new Map,n=Xi.toJSON(e);for(const i of n){for(const[e,t]of Object.entries(i.entryTags))i.entryTags[e.toLowerCase()]=h(t);i.entryTags.type=i.entryType,t.set(i.citationKey,i.entryTags)}return t}function m(e){return`@article{${e.slug},
  author = {${e.bibtexAuthors}},
  title = {${e.title}},
  journal = {${e.journal.title}},
  year = {${e.publishedYear}},
  note = {${e.url}},
  doi = {${e.doi}}
}`}function y(e){return`
  <div class="byline grid">
    <div class="authors-affiliations grid">
      <h3>Authors</h3>
      <h3>Affiliations</h3>
      ${e.authors.map((e)=>`
        <p class="author">
          ${e.personalURL?`
            <a class="name" href="${e.personalURL}">${e.name}</a>`:`
            <span class="name">${e.name}</span>`}
        </p>
        <p class="affiliation">
        ${e.affiliations.map((e)=>e.url?`<a class="affiliation" href="${e.url}">${e.name}</a>`:`<span class="affiliation">${e.name}</span>`).join(', ')}
        </p>
      `).join('')}
    </div>
    <div>
      <h3>Published</h3>
      ${e.publishedDate?`
        <p>${e.publishedMonth} ${e.publishedDay}, ${e.publishedYear}</p> `:`
        <p><em>Not published yet.</em></p>`}
    </div>
    <div>
      <h3>DOI</h3>
      ${e.doi?`
        <p><a href="https://doi.org/${e.doi}">${e.doi}</a></p>`:`
        <p><em>No DOI yet.</em></p>`}
    </div>
  </div>
`}function x(e,t,n=document){if(0<t.size){e.style.display='';let i=e.querySelector('.references');if(i)i.innerHTML='';else{const t=n.createElement('style');t.innerHTML=ta,e.appendChild(t);const a=n.createElement('h3');a.id='references',a.textContent='References',e.appendChild(a),i=n.createElement('ol'),i.id='references-list',i.className='references',e.appendChild(i)}for(const[e,a]of t){const t=n.createElement('li');t.id=e,t.innerHTML=o(a),i.appendChild(t)}}else e.style.display='none'}function k(e,t){let n=`
  <style>

  d-toc {
    contain: layout style;
    display: block;
  }

  d-toc ul {
    padding-left: 0;
  }

  d-toc ul > ul {
    padding-left: 24px;
  }

  d-toc a {
    border-bottom: none;
    text-decoration: none;
  }

  </style>
  <nav role="navigation" class="table-of-contents"></nav>
  <h2>Table of contents</h2>
  <ul>`;for(const i of t){const e='D-TITLE'==i.parentElement.tagName,t=i.getAttribute('no-toc');if(e||t)continue;const a=i.textContent,d='#'+i.getAttribute('id');let r='<li><a href="'+d+'">'+a+'</a></li>';'H3'==i.tagName?r='<ul>'+r+'</ul>':r+='<br>',n+=r}n+='</ul></nav>',e.innerHTML=n}function v(e){return function(t,n){return xa(e(t),n)}}function w(e,t,n){var i=(t-e)/ui(0,n),a=fi(ci(i)/si),d=i/li(10,a);return 0<=a?(d>=Ca?10:d>=Sa?5:d>=Ta?2:1)*li(10,a):-li(10,-a)/(d>=Ca?10:d>=Sa?5:d>=Ta?2:1)}function S(e,t,n){var i=oi(t-e)/ui(0,n),a=li(10,fi(ci(i)/si)),d=i/a;return d>=Ca?a*=10:d>=Sa?a*=5:d>=Ta&&(a*=2),t<e?-a:a}function _(e,t){var n=Object.create(e.prototype);for(var i in t)n[i]=t[i];return n}function L(){}function M(){return this.rgb().formatHex()}function U(){return this.rgb().formatRgb()}function O(e){var t,n;return e=(e+'').trim().toLowerCase(),(t=Oa.exec(e))?(n=t[1].length,t=parseInt(t[1],16),6===n?N(t):3===n?new q(15&t>>8|240&t>>4,15&t>>4|240&t,(15&t)<<4|15&t,1):8===n?new q(255&t>>24,255&t>>16,255&t>>8,(255&t)/255):4===n?new q(15&t>>12|240&t>>8,15&t>>8|240&t>>4,15&t>>4|240&t,((15&t)<<4|15&t)/255):null):(t=Na.exec(e))?new q(t[1],t[2],t[3],1):(t=Ia.exec(e))?new q(255*t[1]/100,255*t[2]/100,255*t[3]/100,1):(t=ja.exec(e))?I(t[1],t[2],t[3],t[4]):(t=Ra.exec(e))?I(255*t[1]/100,255*t[2]/100,255*t[3]/100,t[4]):(t=qa.exec(e))?z(t[1],t[2]/100,t[3]/100,1):(t=Ha.exec(e))?z(t[1],t[2]/100,t[3]/100,t[4]):Pa.hasOwnProperty(e)?N(Pa[e]):'transparent'===e?new q(NaN,NaN,NaN,0):null}function N(e){return new q(255&e>>16,255&e>>8,255&e,1)}function I(e,t,n,i){return 0>=i&&(e=t=n=NaN),new q(e,t,n,i)}function j(e){return(e instanceof L||(e=O(e)),!e)?new q:(e=e.rgb(),new q(e.r,e.g,e.b,e.opacity))}function R(e,t,n,i){return 1===arguments.length?j(e):new q(e,t,n,null==i?1:i)}function q(e,t,n,i){this.r=+e,this.g=+t,this.b=+n,this.opacity=+i}function H(){return'#'+F(this.r)+F(this.g)+F(this.b)}function P(){var e=this.opacity;return e=isNaN(e)?1:ui(0,hi(1,e)),(1===e?'rgb(':'rgba(')+ui(0,hi(255,gi(this.r)||0))+', '+ui(0,hi(255,gi(this.g)||0))+', '+ui(0,hi(255,gi(this.b)||0))+(1===e?')':', '+e+')')}function F(e){return e=ui(0,hi(255,gi(e)||0)),(16>e?'0':'')+e.toString(16)}function z(e,t,n,i){return 0>=i?e=t=n=NaN:0>=n||1<=n?e=t=NaN:0>=t&&(e=NaN),new W(e,t,n,i)}function Y(e){if(e instanceof W)return new W(e.h,e.s,e.l,e.opacity);if(e instanceof L||(e=O(e)),!e)return new W;if(e instanceof W)return e;e=e.rgb();var t=e.r/255,n=e.g/255,i=e.b/255,a=hi(t,n,i),d=ui(t,n,i),r=NaN,c=d-a,s=(d+a)/2;return c?(r=t===d?(n-i)/c+6*(n<i):n===d?(i-t)/c+2:(t-n)/c+4,c/=0.5>s?d+a:2-d-a,r*=60):c=0<s&&1>s?0:r,new W(r,c,s,e.opacity)}function W(e,t,n,i){this.h=+e,this.s=+t,this.l=+n,this.opacity=+i}function V(e,t,n){return 255*(60>e?t+(n-t)*e/60:180>e?n:240>e?t+(n-t)*(240-e)/60:t)}function $(e){if(e instanceof Q)return new Q(e.l,e.a,e.b,e.opacity);if(e instanceof te)return ne(e);e instanceof q||(e=j(e));var t,n,i=G(e.r),a=G(e.g),d=G(e.b),r=X((0.2225045*i+0.7168786*a+0.0606169*d)/Xn);return i===a&&a===d?t=n=r:(t=X((0.4360747*i+0.3850649*a+0.1430804*d)/K),n=X((0.0139322*i+0.0971045*a+0.7141733*d)/Yn)),new Q(116*r-16,500*(t-r),200*(r-n),e.opacity)}function Q(e,t,n,i){this.l=+e,this.a=+t,this.b=+n,this.opacity=+i}function X(e){return e>Va?li(e,1/3):e/Wa+Zn}function Z(e){return e>Ba?e*e*e:Wa*(e-Zn)}function J(e){return 255*(0.0031308>=e?12.92*e:1.055*li(e,1/2.4)-0.055)}function G(e){return 0.04045>=(e/=255)?e/12.92:li((e+0.055)/1.055,2.4)}function ee(e){if(e instanceof te)return new te(e.h,e.c,e.l,e.opacity);if(e instanceof Q||(e=$(e)),0===e.a&&0===e.b)return new te(NaN,0<e.l&&100>e.l?0:NaN,e.l,e.opacity);var t=di(e.b,e.a)*za;return new te(0>t?t+360:t,ai(e.a*e.a+e.b*e.b),e.l,e.opacity)}function te(e,t,n,i){this.h=+e,this.c=+t,this.l=+n,this.opacity=+i}function ne(e){if(isNaN(e.h))return new Q(e.l,0,0,e.opacity);var t=e.h*Fa;return new Q(e.l,ii(t)*e.c,ni(t)*e.c,e.opacity)}function ie(e){if(e instanceof de)return new de(e.h,e.s,e.l,e.opacity);e instanceof q||(e=j(e));var t=e.r/255,n=e.g/255,i=e.b/255,a=(Qa*i+E*t-$a*n)/(Qa+E-$a),d=i-a,r=(D*(n-a)-B*d)/C,o=ai(r*r+d*d)/(D*a*(1-a)),l=o?di(r,d)*za-120:NaN;return new de(0>l?l+360:l,o,a,e.opacity)}function ae(e,t,n,i){return 1===arguments.length?ie(e):new de(e,t,n,null==i?1:i)}function de(e,t,n,i){this.h=+e,this.s=+t,this.l=+n,this.opacity=+i}function oe(e,n){return function(i){return e+i*n}}function le(e,n,i){return e=li(e,i),n=li(n,i)-e,i=1/i,function(a){return li(e+a*n,i)}}function se(e){return 1==(e=+e)?ce:function(t,n){return n-t?le(t,n,e):Xa(isNaN(t)?n:t)}}function ce(e,t){var n=t-e;return n?oe(e,n):Xa(isNaN(e)?t:e)}function ue(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function pe(e,t){var n,i=t?t.length:0,a=e?hi(i,e.length):0,d=Array(a),r=Array(i);for(n=0;n<a;++n)d[n]=dd(e[n],t[n]);for(;n<i;++n)r[n]=t[n];return function(e){for(n=0;n<a;++n)r[n]=d[n](e);return r}}function ge(e){return function(){return e}}function fe(e){return function(n){return e(n)+''}}function he(e){return function t(n){function i(i,t){var a=e((i=ae(i)).h,(t=ae(t)).h),d=ce(i.s,t.s),r=ce(i.l,t.l),o=ce(i.opacity,t.opacity);return function(e){return i.h=a(e),i.s=d(e),i.l=r(li(e,n)),i.opacity=o(e),i+''}}return n=+n,i.gamma=t,i}(1)}function be(e,t){return(t-=e=+e)?function(n){return(n-e)/t}:ld(t)}function me(e){return function(t,n){var i=e(t=+t,n=+n);return function(e){return e<=t?0:e>=n?1:i(e)}}}function ye(e){return function(n,i){var d=e(n=+n,i=+i);return function(e){return 0>=e?n:1<=e?i:d(e)}}}function xe(e,t,n,i){var a=e[0],d=e[1],r=t[0],o=t[1];return d<a?(a=n(d,a),r=i(o,r)):(a=n(a,d),r=i(r,o)),function(e){return r(a(e))}}function ke(e,t,n,a){var o=hi(e.length,t.length)-1,l=Array(o),d=Array(o),r=-1;for(e[o]<e[0]&&(e=e.slice().reverse(),t=t.slice().reverse());++r<o;)l[r]=n(e[r],e[r+1]),d[r]=a(t[r],t[r+1]);return function(t){var n=va(e,t,1,o)-1;return d[n](l[n](t))}}function ve(e,t){return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp())}function we(e,t){function n(){return a=2<hi(o.length,l.length)?ke:xe,d=r=null,i}function i(t){return(d||(d=a(o,l,c?me(e):e,s)))(+t)}var a,d,r,o=sd,l=sd,s=dd,c=!1;return i.invert=function(e){return(r||(r=a(l,o,be,c?ye(t):t)))(+e)},i.domain=function(e){return arguments.length?(o=map.call(e,number),n()):o.slice()},i.range=function(e){return arguments.length?(l=slice.call(e),n()):l.slice()},i.rangeRound=function(e){return l=slice.call(e),interpolate=rd,n()},i.clamp=function(e){return arguments.length?(c=!!e,n()):c},i.interpolate=function(e){return arguments.length?(interpolate=e,n()):s},n()}function Ce(e){if(!(t=fd.exec(e)))throw new Error('invalid format: '+e);var t;return new Se({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}function Se(e){this.fill=e.fill===void 0?' ':e.fill+'',this.align=e.align===void 0?'>':e.align+'',this.sign=e.sign===void 0?'-':e.sign+'',this.symbol=e.symbol===void 0?'':e.symbol+'',this.zero=!!e.zero,this.width=e.width===void 0?void 0:+e.width,this.comma=!!e.comma,this.precision=e.precision===void 0?void 0:+e.precision,this.trim=!!e.trim,this.type=e.type===void 0?'':e.type+''}function Te(e){var t=e.domain;return e.ticks=function(e){var n=t();return _a(n[0],n[n.length-1],null==e?10:e)},e.tickFormat=function(e,n){return Ad(t(),e,n)},e.nice=function(n){null==n&&(n=10);var i,a=t(),d=0,r=a.length-1,o=a[d],l=a[r];return l<o&&(i=o,o=l,l=i,i=d,d=r,r=i),i=w(o,l,n),0<i?(o=fi(o/i)*i,l=pi(l/i)*i,i=w(o,l,n)):0>i&&(o=pi(o*i)/i,l=fi(l*i)/i,i=w(o,l,n)),0<i?(a[d]=fi(o/i)*i,a[r]=pi(l/i)*i,t(a)):0>i&&(a[d]=pi(o*i)/i,a[r]=fi(l*i)/i,t(a)),e},e}function _e(){var e=we(be,ed);return e.copy=function(){return ve(e,_e())},Te(e)}function Le(e,t,n,i){function a(t){return e(t=0===arguments.length?new Date:new Date(+t)),t}return a.floor=function(t){return e(t=new Date(+t)),t},a.ceil=function(n){return e(n=new Date(n-1)),t(n,1),e(n),n},a.round=function(e){var t=a(e),n=a.ceil(e);return e-t<n-e?t:n},a.offset=function(e,n){return t(e=new Date(+e),null==n?1:fi(n)),e},a.range=function(n,i,d){var r,o=[];if(n=a.ceil(n),d=null==d?1:fi(d),!(n<i)||!(0<d))return o;do o.push(r=new Date(+n)),t(n,d),e(n);while(r<n&&n<i);return o},a.filter=function(n){return Le(function(t){if(t>=t)for(;e(t),!n(t);)t.setTime(t-1)},function(e,i){if(e>=e)if(0>i)for(;0>=++i;)for(;t(e,-1),!n(e););else for(;0<=--i;)for(;t(e,1),!n(e););})},n&&(a.count=function(t,i){return Zn.setTime(+t),Ba.setTime(+i),e(Zn),e(Ba),fi(n(Ed,Dd))},a.every=function(e){return e=fi(e),isFinite(e)&&0<e?1<e?a.filter(i?function(t){return 0==i(t)%e}:function(t){return 0==a.count(0,t)%e}):a:null}),a}function Ae(e){return Le(function(t){t.setDate(t.getDate()-(t.getDay()+7-e)%7),t.setHours(0,0,0,0)},function(e,t){e.setDate(e.getDate()+7*t)},function(e,t){return(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*Od)/jd})}function Ee(e){return Le(function(t){t.setUTCDate(t.getUTCDate()-(t.getUTCDay()+7-e)%7),t.setUTCHours(0,0,0,0)},function(e,t){e.setUTCDate(e.getUTCDate()+7*t)},function(e,t){return(t-e)/jd})}function De(e){if(0<=e.y&&100>e.y){var t=new Date(-1,e.m,e.d,e.H,e.M,e.S,e.L);return t.setFullYear(e.y),t}return new Date(e.y,e.m,e.d,e.H,e.M,e.S,e.L)}function Me(e){if(0<=e.y&&100>e.y){var t=new Date(Date.UTC(-1,e.m,e.d,e.H,e.M,e.S,e.L));return t.setUTCFullYear(e.y),t}return new Date(Date.UTC(e.y,e.m,e.d,e.H,e.M,e.S,e.L))}function Ue(e,t,n){return{y:e,m:t,d:n,H:0,M:0,S:0,L:0}}function Oe(e){function t(e,t){return function(a){var d,r,o,l=[],s=-1,i=0,c=e.length;for(a instanceof Date||(a=new Date(+a));++s<c;)37===e.charCodeAt(s)&&(l.push(e.slice(i,s)),null==(r=ur[d=e.charAt(++s)])?r='e'===d?' ':'0':d=e.charAt(++s),(o=t[d])&&(d=o(a,r)),l.push(d),i=s+1);return l.push(e.slice(i,s)),l.join('')}}function n(e,t){return function(n){var r,o,l=Ue(1900,void 0,1),d=a(l,e,n+='',0);if(d!=n.length)return null;if('Q'in l)return new Date(l.Q);if('s'in l)return new Date(1e3*l.s+('L'in l?l.L:0));if(t&&!('Z'in l)&&(l.Z=0),'p'in l&&(l.H=l.H%12+12*l.p),void 0===l.m&&(l.m='q'in l?l.q:0),'V'in l){if(1>l.V||53<l.V)return null;'w'in l||(l.w=1),'Z'in l?(r=Me(Ue(l.y,0,1)),Pd=r.getUTCDay(),r=4<o||0===o?er.ceil(r):er(r),r=Jd.offset(r,7*(l.V-1)),l.y=r.getUTCFullYear(),l.m=r.getUTCMonth(),l.d=r.getUTCDate()+(l.w+6)%7):(r=De(Ue(l.y,0,1)),Pd=r.getDay(),r=4<o||0===o?zd.ceil(r):zd(r),r=Pd.offset(r,7*(l.V-1)),l.y=r.getFullYear(),l.m=r.getMonth(),l.d=r.getDate()+(l.w+6)%7)}else('W'in l||'U'in l)&&('w'in l||(l.w='u'in l?l.u%7:'W'in l?1:0),o='Z'in l?Me(Ue(l.y,0,1)).getUTCDay():De(Ue(l.y,0,1)).getDay(),l.m=0,l.d='W'in l?(l.w+6)%7+7*l.W-(o+5)%7:l.w+7*l.U-(o+6)%7);return'Z'in l?(l.H+=0|l.Z/100,l.M+=l.Z%100,Me(l)):De(l)}}function a(e,t,a,d){for(var r,o,l=0,i=t.length,n=a.length;l<i;){if(d>=n)return-1;if(r=t.charCodeAt(l++),37===r){if(r=t.charAt(l++),o=S[r in ur?t.charAt(l++):r],!o||0>(d=o(e,a,d)))return-1;}else if(r!=a.charCodeAt(d++))return-1}return d}var r=e.dateTime,o=e.date,l=e.time,i=e.periods,s=e.days,c=e.shortDays,u=e.months,p=e.shortMonths,g=je(i),f=Re(i),h=je(s),b=Re(s),m=je(c),y=Re(c),x=je(u),k=Re(u),v=je(p),w=Re(p),d={a:function(e){return c[e.getDay()]},A:function(e){return s[e.getDay()]},b:function(e){return p[e.getMonth()]},B:function(e){return u[e.getMonth()]},c:null,d:at,e:at,f:st,H:dt,I:rt,j:ot,L:lt,m:ct,M:ut,p:function(e){return i[+(12<=e.getHours())]},q:function(e){return 1+~~(e.getMonth()/3)},Q:Ht,s:Pt,S:pt,u:gt,U:ft,V:ht,w:bt,W:mt,x:null,X:null,y:yt,Y:xt,Z:kt,"%":qt},C={a:function(e){return c[e.getUTCDay()]},A:function(e){return s[e.getUTCDay()]},b:function(e){return p[e.getUTCMonth()]},B:function(e){return u[e.getUTCMonth()]},c:null,d:vt,e:vt,f:_t,H:wt,I:Ct,j:St,L:Tt,m:Lt,M:At,p:function(e){return i[+(12<=e.getUTCHours())]},q:function(e){return 1+~~(e.getUTCMonth()/3)},Q:Ht,s:Pt,S:Et,u:Dt,U:Mt,V:Ut,w:Ot,W:Nt,x:null,X:null,y:It,Y:jt,Z:Rt,"%":qt},S={a:function(e,t,a){var i=m.exec(t.slice(a));return i?(e.w=y[i[0].toLowerCase()],a+i[0].length):-1},A:function(e,t,a){var i=h.exec(t.slice(a));return i?(e.w=b[i[0].toLowerCase()],a+i[0].length):-1},b:function(e,t,a){var i=v.exec(t.slice(a));return i?(e.m=w[i[0].toLowerCase()],a+i[0].length):-1},B:function(e,t,a){var i=x.exec(t.slice(a));return i?(e.m=k[i[0].toLowerCase()],a+i[0].length):-1},c:function(e,t,n){return a(e,r,t,n)},d:$e,e:$e,f:et,H:Xe,I:Xe,j:Qe,L:Ge,m:Ke,M:Ze,p:function(e,t,a){var i=g.exec(t.slice(a));return i?(e.p=f[i[0].toLowerCase()],a+i[0].length):-1},q:Ve,Q:nt,s:it,S:Je,u:He,U:Pe,V:Fe,w:qe,W:ze,x:function(e,t,n){return a(e,o,t,n)},X:function(e,t,n){return a(e,l,t,n)},y:Be,Y:Ye,Z:We,"%":tt};return d.x=t(o,d),d.X=t(l,d),d.c=t(r,d),C.x=t(o,C),C.X=t(l,C),C.c=t(r,C),{format:function(e){var n=t(e+='',d);return n.toString=function(){return e},n},parse:function(e){var t=n(e+='',!1);return t.toString=function(){return e},t},utcFormat:function(e){var n=t(e+='',C);return n.toString=function(){return e},n},utcParse:function(e){var t=n(e+='',!0);return t.toString=function(){return e},t}}}function Ne(e,t,n){var i=0>e?'-':'',a=(i?-e:e)+'',d=a.length;return i+(d<n?Array(n-d+1).join(t)+a:a)}function Ie(e){return e.replace(fr,'\\$&')}function je(e){return new RegExp('^(?:'+e.map(Ie).join('|')+')','i')}function Re(e){for(var t={},a=-1,i=e.length;++a<i;)t[e[a].toLowerCase()]=a;return t}function qe(e,t,a){var i=pr.exec(t.slice(a,a+1));return i?(e.w=+i[0],a+i[0].length):-1}function He(e,t,a){var i=pr.exec(t.slice(a,a+1));return i?(e.u=+i[0],a+i[0].length):-1}function Pe(e,t,a){var i=pr.exec(t.slice(a,a+2));return i?(e.U=+i[0],a+i[0].length):-1}function Fe(e,t,a){var i=pr.exec(t.slice(a,a+2));return i?(e.V=+i[0],a+i[0].length):-1}function ze(e,t,a){var i=pr.exec(t.slice(a,a+2));return i?(e.W=+i[0],a+i[0].length):-1}function Ye(e,t,a){var i=pr.exec(t.slice(a,a+4));return i?(e.y=+i[0],a+i[0].length):-1}function Be(e,t,a){var i=pr.exec(t.slice(a,a+2));return i?(e.y=+i[0]+(68<+i[0]?1900:2e3),a+i[0].length):-1}function We(e,t,a){var i=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(a,a+6));return i?(e.Z=i[1]?0:-(i[2]+(i[3]||'00')),a+i[0].length):-1}function Ve(e,t,a){var i=pr.exec(t.slice(a,a+1));return i?(e.q=3*i[0]-3,a+i[0].length):-1}function Ke(e,t,a){var i=pr.exec(t.slice(a,a+2));return i?(e.m=i[0]-1,a+i[0].length):-1}function $e(e,t,a){var i=pr.exec(t.slice(a,a+2));return i?(e.d=+i[0],a+i[0].length):-1}function Qe(e,t,a){var i=pr.exec(t.slice(a,a+3));return i?(e.m=0,e.d=+i[0],a+i[0].length):-1}function Xe(e,t,a){var i=pr.exec(t.slice(a,a+2));return i?(e.H=+i[0],a+i[0].length):-1}function Ze(e,t,a){var i=pr.exec(t.slice(a,a+2));return i?(e.M=+i[0],a+i[0].length):-1}function Je(e,t,a){var i=pr.exec(t.slice(a,a+2));return i?(e.S=+i[0],a+i[0].length):-1}function Ge(e,t,a){var i=pr.exec(t.slice(a,a+3));return i?(e.L=+i[0],a+i[0].length):-1}function et(e,t,a){var i=pr.exec(t.slice(a,a+6));return i?(e.L=fi(i[0]/1e3),a+i[0].length):-1}function tt(e,t,a){var i=gr.exec(t.slice(a,a+1));return i?a+i[0].length:-1}function nt(e,t,a){var i=pr.exec(t.slice(a));return i?(e.Q=+i[0],a+i[0].length):-1}function it(e,t,a){var i=pr.exec(t.slice(a));return i?(e.s=+i[0],a+i[0].length):-1}function at(e,t){return Ne(e.getDate(),t,2)}function dt(e,t){return Ne(e.getHours(),t,2)}function rt(e,t){return Ne(e.getHours()%12||12,t,2)}function ot(e,t){return Ne(1+Pd.count(Qd(e),e),t,3)}function lt(e,t){return Ne(e.getMilliseconds(),t,3)}function st(e,t){return lt(e,t)+'000'}function ct(e,t){return Ne(e.getMonth()+1,t,2)}function ut(e,t){return Ne(e.getMinutes(),t,2)}function pt(e,t){return Ne(e.getSeconds(),t,2)}function gt(e){var t=e.getDay();return 0===t?7:t}function ft(e,t){return Ne(Fd.count(Qd(e)-1,e),t,2)}function ht(e,t){var n=e.getDay();return e=4<=n||0===n?Wd(e):Wd.ceil(e),Ne(Wd.count(Qd(e),e)+(4===Qd(e).getDay()),t,2)}function bt(e){return e.getDay()}function mt(e,t){return Ne(zd.count(Qd(e)-1,e),t,2)}function yt(e,t){return Ne(e.getFullYear()%100,t,2)}function xt(e,t){return Ne(e.getFullYear()%1e4,t,4)}function kt(e){var t=e.getTimezoneOffset();return(0<t?'-':(t*=-1,'+'))+Ne(0|t/60,'0',2)+Ne(t%60,'0',2)}function vt(e,t){return Ne(e.getUTCDate(),t,2)}function wt(e,t){return Ne(e.getUTCHours(),t,2)}function Ct(e,t){return Ne(e.getUTCHours()%12||12,t,2)}function St(e,t){return Ne(1+Jd.count(or(e),e),t,3)}function Tt(e,t){return Ne(e.getUTCMilliseconds(),t,3)}function _t(e,t){return Tt(e,t)+'000'}function Lt(e,t){return Ne(e.getUTCMonth()+1,t,2)}function At(e,t){return Ne(e.getUTCMinutes(),t,2)}function Et(e,t){return Ne(e.getUTCSeconds(),t,2)}function Dt(e){var t=e.getUTCDay();return 0===t?7:t}function Mt(e,t){return Ne(Gd.count(or(e)-1,e),t,2)}function Ut(e,t){var n=e.getUTCDay();return e=4<=n||0===n?ir(e):ir.ceil(e),Ne(ir.count(or(e),e)+(4===or(e).getUTCDay()),t,2)}function Ot(e){return e.getUTCDay()}function Nt(e,t){return Ne(er.count(or(e)-1,e),t,2)}function It(e,t){return Ne(e.getUTCFullYear()%100,t,2)}function jt(e,t){return Ne(e.getUTCFullYear()%1e4,t,4)}function Rt(){return'+0000'}function qt(){return'%'}function Ht(e){return+e}function Pt(e){return fi(+e/1e3)}function Ft(e){var i=e.length;return function(n){return e[ui(0,hi(i-1,fi(n*i)))]}}function zt(){for(var e,t=0,i=arguments.length,n={};t<i;++t){if(!(e=arguments[t]+'')||e in n||/[\s.]/.test(e))throw new Error('illegal type: '+e);n[e]=[]}return new Yt(n)}function Yt(e){this._=e}function Bt(e,n){return e.trim().split(/^|\s+/).map(function(e){var a='',d=e.indexOf('.');if(0<=d&&(a=e.slice(d+1),e=e.slice(0,d)),e&&!n.hasOwnProperty(e))throw new Error('unknown type: '+e);return{type:e,name:a}})}function Wt(e,t){for(var a,d=0,i=e.length;d<i;++d)if((a=e[d]).name===t)return a.value}function Vt(e,t,a){for(var d=0,i=e.length;d<i;++d)if(e[d].name===t){e[d]=Tr,e=e.slice(0,d).concat(e.slice(d+1));break}return null!=a&&e.push({name:t,value:a}),e}function Kt(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===_r&&t.documentElement.namespaceURI===_r?t.createElement(e):t.createElementNS(n,e)}}function $t(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Qt(){}function Xt(){return[]}function Zt(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}function Jt(e,t,n,a,d,r){for(var o,l=0,i=t.length,s=r.length;l<s;++l)(o=t[l])?(o.__data__=r[l],a[l]=o):n[l]=new Zt(e,r[l]);for(;l<i;++l)(o=t[l])&&(d[l]=o)}function Gt(e,t,n,a,d,r,o){var l,i,s,c={},u=t.length,p=r.length,g=Array(u);for(l=0;l<u;++l)(i=t[l])&&(g[l]=s=Ir+o.call(i,i.__data__,l,t),s in c?d[l]=i:c[s]=i);for(l=0;l<p;++l)s=Ir+o.call(e,r[l],l,r),(i=c[s])?(a[l]=i,i.__data__=r[l],c[s]=null):n[l]=new Zt(e,r[l]);for(l=0;l<u;++l)(i=t[l])&&c[g[l]]===i&&(d[l]=i)}function en(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function tn(e){return function(){this.removeAttribute(e)}}function nn(e){return function(){this.removeAttributeNS(e.space,e.local)}}function an(e,t){return function(){this.setAttribute(e,t)}}function dn(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function rn(e,t){return function(){var n=t.apply(this,arguments);null==n?this.removeAttribute(e):this.setAttribute(e,n)}}function on(e,t){return function(){var n=t.apply(this,arguments);null==n?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function ln(e){return function(){this.style.removeProperty(e)}}function sn(e,t,n){return function(){this.style.setProperty(e,t,n)}}function cn(e,t,n){return function(){var i=t.apply(this,arguments);null==i?this.style.removeProperty(e):this.style.setProperty(e,i,n)}}function un(e,t){return e.style.getPropertyValue(t)||jr(e).getComputedStyle(e,null).getPropertyValue(t)}function pn(e){return function(){delete this[e]}}function gn(e,t){return function(){this[e]=t}}function fn(e,t){return function(){var n=t.apply(this,arguments);null==n?delete this[e]:this[e]=n}}function hn(e){return e.trim().split(/^|\s+/)}function bn(e){return e.classList||new mn(e)}function mn(e){this._node=e,this._names=hn(e.getAttribute('class')||'')}function yn(e,t){for(var a=bn(e),d=-1,i=t.length;++d<i;)a.add(t[d])}function xn(e,t){for(var a=bn(e),d=-1,i=t.length;++d<i;)a.remove(t[d])}function kn(e){return function(){yn(this,e)}}function vn(e){return function(){xn(this,e)}}function wn(e,t){return function(){(t.apply(this,arguments)?yn:xn)(this,e)}}function Cn(){this.textContent=''}function Sn(e){return function(){this.textContent=e}}function Tn(e){return function(){var t=e.apply(this,arguments);this.textContent=null==t?'':t}}function _n(){this.innerHTML=''}function Ln(e){return function(){this.innerHTML=e}}function An(e){return function(){var t=e.apply(this,arguments);this.innerHTML=null==t?'':t}}function En(){this.nextSibling&&this.parentNode.appendChild(this)}function Dn(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Mn(){return null}function Un(){var e=this.parentNode;e&&e.removeChild(this)}function On(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Nn(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function In(e,t,n){return e=jn(e,t,n),function(t){var n=t.relatedTarget;n&&(n===this||8&n.compareDocumentPosition(this))||e.call(this,t)}}function jn(e,t,n){return function(i){var a=qr;qr=i;try{e.call(this,this.__data__,t,n)}finally{qr=a}}}function Rn(e){return e.trim().split(/^|\s+/).map(function(e){var n='',a=e.indexOf('.');return 0<=a&&(n=e.slice(a+1),e=e.slice(0,a)),{type:e,name:n}})}function qn(e){return function(){var t=this.__on;if(t){for(var n,a=0,d=-1,i=t.length;a<i;++a)(n=t[a],(!e.type||n.type===e.type)&&n.name===e.name)?this.removeEventListener(n.type,n.listener,n.capture):t[++d]=n;++d?t.length=d:delete this.__on}}}function Hn(e,t,n){var a=Rr.hasOwnProperty(e.type)?In:jn;return function(r,d,i){var l,o=this.__on,s=a(t,d,i);if(o)for(var c=0,u=o.length;c<u;++c)if((l=o[c]).type===e.type&&l.name===e.name)return this.removeEventListener(l.type,l.listener,l.capture),this.addEventListener(l.type,l.listener=s,l.capture=n),void(l.value=t);this.addEventListener(e.type,s,n),l={type:e.type,name:e.name,value:t,listener:s,capture:n},o?o.push(l):this.__on=[l]}}function Pn(e,t,n,i){var a=qr;e.sourceEvent=qr,qr=e;try{return t.apply(n,i)}finally{qr=a}}function Fn(e,t,n){var i=jr(e),a=i.CustomEvent;'function'==typeof a?a=new a(t,n):(a=i.document.createEvent('Event'),n?(a.initEvent(t,n.bubbles,n.cancelable),a.detail=n.detail):a.initEvent(t,!1,!1)),e.dispatchEvent(a)}function zn(e,t){return function(){return Fn(this,e,t)}}function Bn(e,t){return function(){return Fn(this,e,t.apply(this,arguments))}}function Wn(e,t){this._groups=e,this._parents=t}function Vn(){qr.stopImmediatePropagation()}function Kn(e,t){var n=e.document.documentElement,i=Fr(e).on('dragstart.drag',null);t&&(i.on('click.drag',Vr,!0),setTimeout(function(){i.on('click.drag',null)},0)),'onselectstart'in n?i.on('selectstart.drag',null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}function $n(e,t,n,i,a,d,r,o,l,s){this.target=e,this.type=t,this.subject=n,this.identifier=i,this.active=a,this.x=d,this.y=r,this.dx=o,this.dy=l,this._=s}function Qn(){return!qr.ctrlKey&&!qr.button}function Jn(){return this.parentNode}function Gn(e){return null==e?{x:qr.x,y:qr.y}:e}function ei(){return navigator.maxTouchPoints||'ontouchstart'in this}function ti(e){let t=ro;'undefined'!=typeof e.githubUrl&&(t+=`
    <h3 id="updates-and-corrections">Updates and Corrections</h3>
    <p>`,e.githubCompareUpdatesUrl&&(t+=`<a href="${e.githubCompareUpdatesUrl}">View all changes</a> to this article since it was first published.`),t+=`
    If you see mistakes or want to suggest changes, please <a href="${e.githubUrl+'/issues/new'}">create an issue on GitHub</a>. </p>
    `);const n=e.journal;return'undefined'!=typeof n&&'Distill'===n.title&&(t+=`
    <h3 id="reuse">Reuse</h3>
    <p>Diagrams and text are licensed under Creative Commons Attribution <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a> with the <a class="github" href="${e.githubUrl}">source available on GitHub</a>, unless noted otherwise. The figures that have been reused from other sources don’t fall under this license and can be recognized by a note in their caption: “Figure from …”.</p>
    `),'undefined'!=typeof e.publishedDate&&(t+=`
    <h3 id="citation">Citation</h3>
    <p>For attribution in academic contexts, please cite this work as</p>
    <pre class="citation short">${e.concatenatedAuthors}, "${e.title}", Distill, ${e.publishedYear}.</pre>
    <p>BibTeX citation</p>
    <pre class="citation long">${m(e)}</pre>
    `),t}var ni=Math.sin,ii=Math.cos,ai=Math.sqrt,di=Math.atan2,ri=Math.PI,oi=Math.abs,li=Math.pow,si=Math.LN10,ci=Math.log,ui=Math.max,pi=Math.ceil,gi=Math.round,fi=Math.floor,hi=Math.min;const bi=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],mi=['Jan.','Feb.','March','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'],yi=(e)=>10>e?'0'+e:e,xi=function(e){const t=bi[e.getDay()].substring(0,3),n=yi(e.getDate()),i=mi[e.getMonth()].substring(0,3),a=e.getFullYear().toString(),d=e.getUTCHours().toString(),r=e.getUTCMinutes().toString(),o=e.getUTCSeconds().toString();return`${t}, ${n} ${i} ${a} ${d}:${r}:${o} Z`},ki=function(e){const t=Array.from(e).reduce((e,[t,n])=>Object.assign(e,{[t]:n}),{});return t},vi=function(e){const t=new Map;for(var n in e)e.hasOwnProperty(n)&&t.set(n,e[n]);return t};class wi{constructor(e){this.name=e.author,this.personalURL=e.authorURL,this.affiliation=e.affiliation,this.affiliationURL=e.affiliationURL,this.affiliations=e.affiliations||[]}get firstName(){const e=this.name.split(' ');return e.slice(0,e.length-1).join(' ')}get lastName(){const e=this.name.split(' ');return e[e.length-1]}}class Ci{constructor(){this.title='unnamed article',this.description='',this.authors=[],this.bibliography=new Map,this.bibliographyParsed=!1,this.citations=[],this.citationsCollected=!1,this.journal={},this.katex={},this.doi=void 0,this.publishedDate=void 0}set url(e){this._url=e}get url(){if(this._url)return this._url;return this.distillPath&&this.journal.url?this.journal.url+'/'+this.distillPath:this.journal.url?this.journal.url:void 0}get githubUrl(){return this.githubPath?'https://github.com/'+this.githubPath:void 0}set previewURL(e){this._previewURL=e}get previewURL(){return this._previewURL?this._previewURL:this.url+'/thumbnail.jpg'}get publishedDateRFC(){return xi(this.publishedDate)}get updatedDateRFC(){return xi(this.updatedDate)}get publishedYear(){return this.publishedDate.getFullYear()}get publishedMonth(){return mi[this.publishedDate.getMonth()]}get publishedDay(){return this.publishedDate.getDate()}get publishedMonthPadded(){return yi(this.publishedDate.getMonth()+1)}get publishedDayPadded(){return yi(this.publishedDate.getDate())}get publishedISODateOnly(){return this.publishedDate.toISOString().split('T')[0]}get volume(){const e=this.publishedYear-2015;if(1>e)throw new Error('Invalid publish date detected during computing volume');return e}get issue(){return this.publishedDate.getMonth()+1}get concatenatedAuthors(){if(2<this.authors.length)return this.authors[0].lastName+', et al.';return 2===this.authors.length?this.authors[0].lastName+' & '+this.authors[1].lastName:1===this.authors.length?this.authors[0].lastName:void 0}get bibtexAuthors(){return this.authors.map((e)=>{return e.lastName+', '+e.firstName}).join(' and ')}get slug(){let e='';return this.authors.length&&(e+=this.authors[0].lastName.toLowerCase(),e+=this.publishedYear,e+=this.title.split(' ')[0].toLowerCase()),e||'Untitled'}get bibliographyEntries(){return new Map(this.citations.map((e)=>{const t=this.bibliography.get(e);return[e,t]}))}set bibliography(e){e instanceof Map?this._bibliography=e:'object'==typeof e&&(this._bibliography=vi(e))}get bibliography(){return this._bibliography}static fromObject(e){const t=new Ci;return Object.assign(t,e),t}assignToObject(e){Object.assign(e,this),e.bibliography=ki(this.bibliographyEntries),e.url=this.url,e.doi=this.doi,e.githubUrl=this.githubUrl,e.previewURL=this.previewURL,this.publishedDate&&(e.volume=this.volume,e.issue=this.issue,e.publishedDateRFC=this.publishedDateRFC,e.publishedYear=this.publishedYear,e.publishedMonth=this.publishedMonth,e.publishedDay=this.publishedDay,e.publishedMonthPadded=this.publishedMonthPadded,e.publishedDayPadded=this.publishedDayPadded),this.updatedDate&&(e.updatedDateRFC=this.updatedDateRFC),e.concatenatedAuthors=this.concatenatedAuthors,e.bibtexAuthors=this.bibtexAuthors,e.slug=this.slug}}const Si=(e)=>{return class extends e{constructor(){super();const e={childList:!0,characterData:!0,subtree:!0},t=new MutationObserver(()=>{t.disconnect(),this.renderIfPossible(),t.observe(this,e)});t.observe(this,e)}connectedCallback(){super.connectedCallback(),this.renderIfPossible()}renderIfPossible(){this.textContent&&this.root&&this.renderContent()}renderContent(){console.error(`Your class ${this.constructor.name} must provide a custom renderContent() method!`)}}},Ti=(e,t,n=!0)=>{return(i)=>{const a=document.createElement('template');return a.innerHTML=t,n&&'ShadyCSS'in window&&ShadyCSS.prepareTemplate(a,e),class extends i{static get is(){return e}constructor(){super(),this.clone=document.importNode(a.content,!0),n&&(this.attachShadow({mode:'open'}),this.shadowRoot.appendChild(this.clone))}connectedCallback(){this.hasAttribute('distill-prerendered')||(n?'ShadyCSS'in window&&ShadyCSS.styleElement(this):this.insertBefore(this.clone,this.firstChild))}get root(){return n?this.shadowRoot:this}$(e){return this.root.querySelector(e)}$$(e){return this.root.querySelectorAll(e)}}}};var _i='/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nspan.katex-display {\n  text-align: left;\n  padding: 8px 0 8px 0;\n  margin: 0.5em 0 0.5em 1em;\n}\n\nspan.katex {\n  -webkit-font-smoothing: antialiased;\n  color: rgba(0, 0, 0, 0.8);\n  font-size: 1.18em;\n}\n';const Li=function(e,t,n){let i=n,a=0;for(const d=e.length;i<t.length;){const n=t[i];if(0>=a&&t.slice(i,i+d)===e)return i;'\\'===n?i++:'{'===n?a++:'}'===n&&a--;i++}return-1},Ai=function(e,t,n,i){const a=[];for(let d=0;d<e.length;d++)if('text'===e[d].type){const r=e[d].data;let o,l=!0,s=0;for(o=r.indexOf(t),-1!==o&&(s=o,a.push({type:'text',data:r.slice(0,s)}),l=!1);;){if(l){if(o=r.indexOf(t,s),-1===o)break;a.push({type:'text',data:r.slice(s,o)}),s=o}else{if(o=Li(n,r,s+t.length),-1===o)break;a.push({type:'math',data:r.slice(s+t.length,o),rawData:r.slice(s,o+n.length),display:i}),s=o+n.length}l=!l}a.push({type:'text',data:r.slice(s)})}else a.push(e[d]);return a},Ei=function(e,t){let n=[{type:'text',data:e}];for(let a=0;a<t.length;a++){const e=t[a];n=Ai(n,e.left,e.right,e.display||!1)}return n},Di=function(e,t){const n=Ei(e,t.delimiters),a=document.createDocumentFragment();for(let d=0;d<n.length;d++)if('text'===n[d].type)a.appendChild(document.createTextNode(n[d].data));else{const e=document.createElement('d-math'),i=n[d].data;t.displayMode=n[d].display;try{e.textContent=i,t.displayMode&&e.setAttribute('block','')}catch(i){if(!(i instanceof katex.ParseError))throw i;t.errorCallback('KaTeX auto-render: Failed to parse `'+n[d].data+'` with ',i),a.appendChild(document.createTextNode(n[d].rawData));continue}a.appendChild(e)}return a},Mi=function(e,t){for(let n=0;n<e.childNodes.length;n++){const i=e.childNodes[n];if(3===i.nodeType){const a=i.textContent;if(t.mightHaveMath(a)){const d=Di(a,t);n+=d.childNodes.length-1,e.replaceChild(d,i)}}else if(1===i.nodeType){const e=-1===t.ignoredTags.indexOf(i.nodeName.toLowerCase());e&&Mi(i,t)}}},Ui={delimiters:[{left:'$$',right:'$$',display:!0},{left:'\\[',right:'\\]',display:!0},{left:'\\(',right:'\\)',display:!1}],ignoredTags:['script','noscript','style','textarea','pre','code','svg'],errorCallback:function(e,t){console.error(e,t)}},Oi=function(e,t){if(!e)throw new Error('No element provided to render');const n=Object.assign({},Ui,t),i=n.delimiters.flatMap((e)=>[e.left,e.right]);n.mightHaveMath=(e)=>i.some((t)=>-1!==e.indexOf(t)),Mi(e,n)},Ni='<link rel="stylesheet" href="https://distill.pub/third-party/katex/katex.min.css" crossorigin="anonymous">',Ii=Ti('d-math',`
${Ni}
<style>

:host {
  display: inline-block;
  contain: style;
}

:host([block]) {
  display: block;
}

${_i}
</style>
<span id='katex-container'></span>
`);class T extends Si(Ii(HTMLElement)){static set katexOptions(e){T._katexOptions=e,T.katexOptions.delimiters&&(T.katexAdded?T.katexLoadedCallback():T.addKatex())}static get katexOptions(){return T._katexOptions||(T._katexOptions={delimiters:[{left:'$$',right:'$$',display:!1}]}),T._katexOptions}static katexLoadedCallback(){const e=document.querySelectorAll('d-math');for(const t of e)t.renderContent();T.katexOptions.delimiters&&Oi(document.body,T.katexOptions)}static addKatex(){document.head.insertAdjacentHTML('beforeend',Ni);const e=document.createElement('script');e.src='https://distill.pub/third-party/katex/katex.min.js',e.async=!0,e.onload=T.katexLoadedCallback,e.crossorigin='anonymous',document.head.appendChild(e),T.katexAdded=!0}get options(){const e={displayMode:this.hasAttribute('block')};return Object.assign(e,T.katexOptions)}connectedCallback(){super.connectedCallback(),T.katexAdded||T.addKatex()}renderContent(){if('undefined'!=typeof katex){const e=this.root.querySelector('#katex-container');katex.render(this.textContent,e,this.options)}}}T.katexAdded=!1,T.inlineMathRendered=!1,window.DMath=T;class ji extends HTMLElement{static get is(){return'd-front-matter'}constructor(){super();const e=new MutationObserver((e)=>{for(const t of e)if('SCRIPT'===t.target.nodeName||'characterData'===t.type){const e=u(this);this.notify(e)}});e.observe(this,{childList:!0,characterData:!0,subtree:!0})}notify(e){const t=new CustomEvent('onFrontMatterChanged',{detail:e,bubbles:!0});document.dispatchEvent(t)}}var Ri=function(e,t){const n=e.body,i=n.querySelector('d-article');if(!i)return void console.warn('No d-article tag found; skipping adding optional components!');let a=e.querySelector('d-byline');a||(t.authors?(a=e.createElement('d-byline'),n.insertBefore(a,i)):console.warn('No authors found in front matter; please add them before submission!'));let d=e.querySelector('d-title');d||(d=e.createElement('d-title'),n.insertBefore(d,a));let r=d.querySelector('h1');r||(r=e.createElement('h1'),r.textContent=t.title,d.insertBefore(r,d.firstChild));const o='undefined'!=typeof t.password;let l=n.querySelector('d-interstitial');if(o&&!l){const i='undefined'!=typeof window,a=i&&window.location.hostname.includes('localhost');i&&a||(l=e.createElement('d-interstitial'),l.password=t.password,n.insertBefore(l,n.firstChild))}else!o&&l&&l.parentElement.removeChild(this);let s=e.querySelector('d-appendix');s||(s=e.createElement('d-appendix'),e.body.appendChild(s));let c=e.querySelector('d-footnote-list');c||(c=e.createElement('d-footnote-list'),s.appendChild(c));let u=e.querySelector('d-citation-list');u||(u=e.createElement('d-citation-list'),s.appendChild(u))};const qi=new Ci,Hi={frontMatter:qi,waitingOn:{bibliography:[],citations:[]},listeners:{onCiteKeyCreated(e){const[t,n]=e.detail;if(!qi.citationsCollected)return void Hi.waitingOn.citations.push(()=>Hi.listeners.onCiteKeyCreated(e));if(!qi.bibliographyParsed)return void Hi.waitingOn.bibliography.push(()=>Hi.listeners.onCiteKeyCreated(e));const i=n.map((e)=>qi.citations.indexOf(e));t.numbers=i;const a=n.map((e)=>qi.bibliography.get(e));t.entries=a},onCiteKeyChanged(){qi.citations=t(),qi.citationsCollected=!0;for(const e of Hi.waitingOn.citations.slice())e();const e=document.querySelector('d-citation-list'),n=new Map(qi.citations.map((e)=>{return[e,qi.bibliography.get(e)]}));e.citations=n;const i=document.querySelectorAll('d-cite');for(const e of i){console.log(e);const t=e.keys,n=t.map((e)=>qi.citations.indexOf(e));e.numbers=n;const i=t.map((e)=>qi.bibliography.get(e));e.entries=i}},onCiteKeyRemoved(e){Hi.listeners.onCiteKeyChanged(e)},onBibliographyChanged(e){const t=document.querySelector('d-citation-list'),n=e.detail;qi.bibliography=n,qi.bibliographyParsed=!0;for(const t of Hi.waitingOn.bibliography.slice())t();if(!qi.citationsCollected)return void Hi.waitingOn.citations.push(function(){Hi.listeners.onBibliographyChanged({target:e.target,detail:e.detail})});if(t.hasAttribute('distill-prerendered'))console.debug('Citation list was prerendered; not updating it.');else{const e=new Map(qi.citations.map((e)=>{return[e,qi.bibliography.get(e)]}));t.citations=e}},onFootnoteChanged(){const e=document.querySelector('d-footnote-list');if(e){const t=document.querySelectorAll('d-footnote');e.footnotes=t}},onFrontMatterChanged(t){const n=t.detail;e(qi,n);const i=document.querySelector('d-interstitial');i&&('undefined'==typeof qi.password?i.parentElement.removeChild(i):i.password=qi.password);const a=document.body.hasAttribute('distill-prerendered');if(!a&&s()){Ri(document,qi);const e=document.querySelector('distill-appendix');e&&(e.frontMatter=qi);const t=document.querySelector('d-byline');t&&(t.frontMatter=qi),n.katex&&(T.katexOptions=n.katex)}},DOMContentLoaded(){if(Hi.loaded)return void console.warn('Controller received DOMContentLoaded but was already loaded!');if(!s())return void console.warn('Controller received DOMContentLoaded at document.readyState: '+document.readyState+'!');Hi.loaded=!0,console.debug('Runlevel 4: Controller running DOMContentLoaded');const e=document.querySelector('d-front-matter');if(e){const t=u(e);Hi.listeners.onFrontMatterChanged({detail:t})}qi.citations=t(),qi.citationsCollected=!0;for(const e of Hi.waitingOn.citations.slice())e();if(qi.bibliographyParsed)for(const e of Hi.waitingOn.bibliography.slice())e();const n=document.querySelector('d-footnote-list');if(n){const e=document.querySelectorAll('d-footnote');n.footnotes=e}}}};const Pi='/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nhtml {\n  font-size: 14px;\n\tline-height: 1.6em;\n  /* font-family: "Libre Franklin", "Helvetica Neue", sans-serif; */\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;\n  /*, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";*/\n  text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\n@media(min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n\nbody {\n  margin: 0;\n}\n\na {\n  color: #004276;\n}\n\nfigure {\n  margin: 0;\n}\n\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\ntable th {\n\ttext-align: left;\n}\n\ntable thead {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\ntable thead th {\n  padding-bottom: 0.5em;\n}\n\ntable tbody :first-child td {\n  padding-top: 0.5em;\n}\n\npre {\n  overflow: auto;\n  max-width: 100%;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1em;\n}\n\nsup, sub {\n  vertical-align: baseline;\n  position: relative;\n  top: -0.4em;\n  line-height: 1em;\n}\n\nsub {\n  top: 0.4em;\n}\n\n.kicker,\n.marker {\n  font-size: 15px;\n  font-weight: 600;\n  color: rgba(0, 0, 0, 0.5);\n}\n\n\n/* Headline */\n\n@media(min-width: 1024px) {\n  d-title h1 span {\n    display: block;\n  }\n}\n\n/* Figure */\n\nfigure {\n  position: relative;\n  margin-bottom: 2.5em;\n  margin-top: 1.5em;\n}\n\nfigcaption+figure {\n\n}\n\nfigure img {\n  width: 100%;\n}\n\nfigure svg text,\nfigure svg tspan {\n}\n\nfigcaption,\n.figcaption {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 12px;\n  line-height: 1.5em;\n}\n\n@media(min-width: 1024px) {\nfigcaption,\n.figcaption {\n    font-size: 13px;\n  }\n}\n\nfigure.external img {\n  background: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);\n  padding: 18px;\n  box-sizing: border-box;\n}\n\nfigcaption a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\nfigcaption b,\nfigcaption strong {\n  font-weight: 600;\n  color: rgba(0, 0, 0, 1.0);\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n@supports not (display: grid) {\n  .base-grid,\n  distill-header,\n  pal-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  pal-footer,\n  distill-footer {\n    display: block;\n    padding: 8px;\n  }\n}\n\n.base-grid,\ndistill-header,\npal-header,\nd-title,\nd-abstract,\nd-article,\nd-appendix,\ndistill-appendix,\nd-byline,\nd-footnote-list,\nd-citation-list,\npal-footer,\ndistill-footer {\n  display: grid;\n  justify-items: stretch;\n  grid-template-columns: [screen-start] 8px [page-start kicker-start text-start gutter-start middle-start] 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [text-end page-end gutter-end kicker-end middle-end] 8px [screen-end];\n  grid-column-gap: 8px;\n}\n\n.grid {\n  display: grid;\n  grid-column-gap: 8px;\n}\n\n@media(min-width: 768px) {\n  .base-grid,\n  distill-header,\n  pal-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  pal-footer,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start middle-start text-start] 45px 45px 45px 45px 45px 45px 45px 45px [ kicker-end text-end gutter-start] 45px [middle-end] 45px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 16px;\n  }\n\n  .grid {\n    grid-column-gap: 16px;\n  }\n}\n\n@media(min-width: 1000px) {\n  .base-grid,\n  distill-header,\n  pal-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  pal-footer,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 50px [middle-start] 50px [text-start kicker-end] 50px 50px 50px 50px 50px 50px 50px 50px [text-end gutter-start] 50px [middle-end] 50px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 16px;\n  }\n\n  .grid {\n    grid-column-gap: 16px;\n  }\n}\n\n@media(min-width: 1180px) {\n  .base-grid,\n  distill-header,\n  pal-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  pal-footer,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 60px [middle-start] 60px [text-start kicker-end] 60px 60px 60px 60px 60px 60px 60px 60px [text-end gutter-start] 60px [middle-end] 60px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 32px;\n  }\n\n  .grid {\n    grid-column-gap: 32px;\n  }\n}\n\n\n\n\n.base-grid {\n  grid-column: screen;\n}\n\n/* .l-body,\nd-article > *  {\n  grid-column: text;\n}\n\n.l-page,\nd-title > *,\nd-figure {\n  grid-column: page;\n} */\n\n.l-gutter {\n  grid-column: gutter;\n}\n\n.l-text,\n.l-body {\n  grid-column: text;\n}\n\n.l-page {\n  grid-column: page;\n}\n\n.l-body-outset {\n  grid-column: middle;\n}\n\n.l-page-outset {\n  grid-column: page;\n}\n\n.l-screen {\n  grid-column: screen;\n}\n\n.l-screen-inset {\n  grid-column: screen;\n  padding-left: 16px;\n  padding-left: 16px;\n}\n\n\n/* Aside */\n\nd-article aside {\n  grid-column: gutter;\n  font-size: 12px;\n  line-height: 1.6em;\n  color: rgba(0, 0, 0, 0.6)\n}\n\n@media(min-width: 768px) {\n  aside {\n    grid-column: gutter;\n  }\n\n  .side {\n    grid-column: gutter;\n  }\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-title {\n  padding: 2rem 0 1.5rem;\n  contain: layout style;\n  overflow-x: hidden;\n}\n\n@media(min-width: 768px) {\n  d-title {\n    padding: 4rem 0 1.5rem;\n  }\n}\n\nd-title h1 {\n  grid-column: text;\n  font-size: 40px;\n  font-weight: 700;\n  line-height: 1.1em;\n  margin: 0 0 0.5rem;\n}\n\n@media(min-width: 768px) {\n  d-title h1 {\n    font-size: 50px;\n  }\n}\n\nd-title p {\n  font-weight: 300;\n  font-size: 1.2rem;\n  line-height: 1.55em;\n  grid-column: text;\n}\n\nd-title .status {\n  margin-top: 0px;\n  font-size: 12px;\n  color: #009688;\n  opacity: 0.8;\n  grid-column: kicker;\n}\n\nd-title .status span {\n  line-height: 1;\n  display: inline-block;\n  padding: 6px 0;\n  border-bottom: 1px solid #80cbc4;\n  font-size: 11px;\n  text-transform: uppercase;\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-byline {\n  contain: style;\n  overflow: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  font-size: 0.8rem;\n  line-height: 1.8em;\n  padding: 1.5rem 0;\n  min-height: 1.8em;\n}\n\n\nd-byline .byline {\n  grid-template-columns: 1fr 1fr;\n  grid-column: text;\n}\n\n@media(min-width: 768px) {\n  d-byline .byline {\n    grid-template-columns: 1fr 1fr 1fr 1fr;\n  }\n}\n\nd-byline .authors-affiliations {\n  grid-column-end: span 2;\n  grid-template-columns: 1fr 1fr;\n  margin-bottom: 1em;\n}\n\n@media(min-width: 768px) {\n  d-byline .authors-affiliations {\n    margin-bottom: 0;\n  }\n}\n\nd-byline h3 {\n  font-size: 0.6rem;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.5);\n  margin: 0;\n  text-transform: uppercase;\n}\n\nd-byline p {\n  margin: 0;\n}\n\nd-byline a,\nd-article d-byline a {\n  color: rgba(0, 0, 0, 0.8);\n  text-decoration: none;\n  border-bottom: none;\n}\n\nd-article d-byline a:hover {\n  text-decoration: underline;\n  border-bottom: none;\n}\n\nd-byline p.author {\n  font-weight: 500;\n}\n\nd-byline .affiliations {\n\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-article {\n  contain: layout style;\n  overflow-x: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  padding-top: 2rem;\n  color: rgba(0, 0, 0, 0.8);\n}\n\nd-article > * {\n  grid-column: text;\n}\n\n@media(min-width: 768px) {\n  d-article {\n    font-size: 16px;\n  }\n}\n\n@media(min-width: 1024px) {\n  d-article {\n    font-size: 1.06rem;\n    line-height: 1.7em;\n  }\n}\n\n\n/* H2 */\n\n\nd-article .marker {\n  text-decoration: none;\n  border: none;\n  counter-reset: section;\n  grid-column: kicker;\n  line-height: 1.7em;\n}\n\nd-article .marker:hover {\n  border: none;\n}\n\nd-article .marker span {\n  padding: 0 3px 4px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  position: relative;\n  top: 4px;\n}\n\nd-article .marker:hover span {\n  color: rgba(0, 0, 0, 0.7);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.7);\n}\n\nd-article h2 {\n  font-weight: 600;\n  font-size: 24px;\n  line-height: 1.25em;\n  margin: 2rem 0 1.5rem 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding-bottom: 1rem;\n}\n\n@media(min-width: 1024px) {\n  d-article h2 {\n    font-size: 36px;\n  }\n}\n\n/* H3 */\n\nd-article h3 {\n  font-weight: 700;\n  font-size: 18px;\n  line-height: 1.4em;\n  margin-bottom: 1em;\n  margin-top: 2em;\n}\n\n@media(min-width: 1024px) {\n  d-article h3 {\n    font-size: 20px;\n  }\n}\n\n/* H4 */\n\nd-article h4 {\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 14px;\n  line-height: 1.4em;\n}\n\nd-article a {\n  color: inherit;\n}\n\nd-article p,\nd-article ul,\nd-article ol,\nd-article blockquote {\n  margin-top: 0;\n  margin-bottom: 1em;\n  margin-left: 0;\n  margin-right: 0;\n}\n\nd-article blockquote {\n  border-left: 2px solid rgba(0, 0, 0, 0.2);\n  padding-left: 2em;\n  font-style: italic;\n  color: rgba(0, 0, 0, 0.6);\n}\n\nd-article a {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.4);\n  text-decoration: none;\n}\n\nd-article a:hover {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.8);\n}\n\nd-article .link {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\nd-article ul,\nd-article ol {\n  padding-left: 24px;\n}\n\nd-article li {\n  margin-bottom: 1em;\n  margin-left: 0;\n  padding-left: 0;\n}\n\nd-article li:last-child {\n  margin-bottom: 0;\n}\n\nd-article pre {\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n\nd-article hr {\n  grid-column: screen;\n  width: 100%;\n  border: none;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nd-article section {\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nd-article span.equation-mimic {\n  font-family: georgia;\n  font-size: 115%;\n  font-style: italic;\n}\n\nd-article > d-code,\nd-article section > d-code  {\n  display: block;\n}\n\nd-article > d-math[block],\nd-article section > d-math[block]  {\n  display: block;\n}\n\n@media (max-width: 768px) {\n  d-article > d-code,\n  d-article section > d-code,\n  d-article > d-math[block],\n  d-article section > d-math[block] {\n      overflow-x: scroll;\n      -ms-overflow-style: none;  // IE 10+\n      overflow: -moz-scrollbars-none;  // Firefox\n  }\n\n  d-article > d-code::-webkit-scrollbar,\n  d-article section > d-code::-webkit-scrollbar,\n  d-article > d-math[block]::-webkit-scrollbar,\n  d-article section > d-math[block]::-webkit-scrollbar {\n    display: none;  // Safari and Chrome\n  }\n}\n\nd-article .citation {\n  color: #668;\n  cursor: pointer;\n}\n\nd-include {\n  width: auto;\n  display: block;\n}\n\nd-figure {\n  contain: layout style;\n}\n\n/* KaTeX */\n\n.katex, .katex-prerendered {\n  contain: style;\n  display: inline-block;\n}\n\n/* Tables */\n\nd-article table {\n  border-collapse: collapse;\n  margin-bottom: 1.5rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n\nd-article table th {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n\nd-article table td {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\nd-article table tr:last-of-type td {\n  border-bottom: none;\n}\n\nd-article table th,\nd-article table td {\n  font-size: 15px;\n  padding: 2px 8px;\n}\n\nd-article table tbody :first-child td {\n  padding-top: 2px;\n}\n'+_i+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n@media print {\n\n  @page {\n    size: 8in 11in;\n    @bottom-right {\n      content: counter(page) " of " counter(pages);\n    }\n  }\n\n  html {\n    /* no general margins -- CSS Grid takes care of those */\n  }\n\n  p, code {\n    page-break-inside: avoid;\n  }\n\n  h2, h3 {\n    page-break-after: avoid;\n  }\n\n  d-header {\n    visibility: hidden;\n  }\n\n  d-footer {\n    display: none!important;\n  }\n\n}\n',Fi=[{name:'WebComponents',support:function(){return'customElements'in window&&'attachShadow'in Element.prototype&&'getRootNode'in Element.prototype&&'content'in document.createElement('template')&&'Promise'in window&&'from'in Array},url:'https://distill.pub/third-party/polyfills/webcomponents-lite.js'},{name:'IntersectionObserver',support:function(){return'IntersectionObserver'in window&&'IntersectionObserverEntry'in window},url:'https://distill.pub/third-party/polyfills/intersection-observer.js'}];class zi{static browserSupportsAllFeatures(){return Fi.every((e)=>e.support())}static load(e){const t=function(t){t.loaded=!0,console.debug('Runlevel 0: Polyfill has finished loading: '+t.name),zi.neededPolyfills.every((e)=>e.loaded)&&(console.debug('Runlevel 0: All required polyfills have finished loading.'),console.debug('Runlevel 0->1.'),window.distillRunlevel=1,e())};for(const n of zi.neededPolyfills)g(n,t)}static get neededPolyfills(){return zi._neededPolyfills||(zi._neededPolyfills=Fi.filter((e)=>!e.support())),zi._neededPolyfills}}const Yi=Ti('d-abstract',`
<style>
  :host {
    font-size: 1.25rem;
    line-height: 1.6em;
    color: rgba(0, 0, 0, 0.7);
    -webkit-font-smoothing: antialiased;
  }

  ::slotted(p) {
    margin-top: 0;
    margin-bottom: 1em;
    grid-column: text-start / middle-end;
  }
  ${function(e){return`${e} {
      grid-column: left / text;
    }
  `}('d-abstract')}
</style>

<slot></slot>
`);class Bi extends Yi(HTMLElement){}const Wi=Ti('d-appendix',`
<style>

d-appendix {
  contain: layout style;
  font-size: 0.8em;
  line-height: 1.7em;
  margin-top: 60px;
  margin-bottom: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0,0,0,0.5);
  padding-top: 60px;
  padding-bottom: 48px;
}

d-appendix h3 {
  grid-column: page-start / text-start;
  font-size: 15px;
  font-weight: 500;
  margin-top: 1em;
  margin-bottom: 0;
  color: rgba(0,0,0,0.65);
}

d-appendix h3 + * {
  margin-top: 1em;
}

d-appendix ol {
  padding: 0 0 0 15px;
}

@media (min-width: 768px) {
  d-appendix ol {
    padding: 0 0 0 30px;
    margin-left: -30px;
  }
}

d-appendix li {
  margin-bottom: 1em;
}

d-appendix a {
  color: rgba(0, 0, 0, 0.6);
}

d-appendix > * {
  grid-column: text;
}

d-appendix > d-footnote-list,
d-appendix > d-citation-list,
d-appendix > distill-appendix {
  grid-column: screen;
}

</style>

`,!1);class Vi extends Wi(HTMLElement){}const Ki=/^\s*$/;class $i extends HTMLElement{static get is(){return'd-article'}constructor(){super(),new MutationObserver((e)=>{for(const t of e)for(const e of t.addedNodes)switch(e.nodeName){case'#text':{const t=e.nodeValue;if(!Ki.test(t)){console.warn('Use of unwrapped text in distill articles is discouraged as it breaks layout! Please wrap any text in a <span> or <p> tag. We found the following text: '+t);const n=document.createElement('span');n.innerHTML=e.nodeValue,e.parentNode.insertBefore(n,e),e.parentNode.removeChild(e)}}}}).observe(this,{childList:!0})}}var Qi='undefined'==typeof window?'undefined'==typeof global?'undefined'==typeof self?{}:self:global:window,Xi=f(function(e,t){(function(e){function t(){this.months=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],this.notKey=[',','{','}',' ','='],this.pos=0,this.input='',this.entries=[],this.currentEntry='',this.setInput=function(e){this.input=e},this.getEntries=function(){return this.entries},this.isWhitespace=function(e){return' '==e||'\r'==e||'\t'==e||'\n'==e},this.match=function(e,t){if((void 0==t||null==t)&&(t=!0),this.skipWhitespace(t),this.input.substring(this.pos,this.pos+e.length)==e)this.pos+=e.length;else throw'Token mismatch, expected '+e+', found '+this.input.substring(this.pos);this.skipWhitespace(t)},this.tryMatch=function(e,t){return(void 0==t||null==t)&&(t=!0),this.skipWhitespace(t),this.input.substring(this.pos,this.pos+e.length)==e},this.matchAt=function(){for(;this.input.length>this.pos&&'@'!=this.input[this.pos];)this.pos++;return!('@'!=this.input[this.pos])},this.skipWhitespace=function(e){for(;this.isWhitespace(this.input[this.pos]);)this.pos++;if('%'==this.input[this.pos]&&!0==e){for(;'\n'!=this.input[this.pos];)this.pos++;this.skipWhitespace(e)}},this.value_braces=function(){var e=0;this.match('{',!1);for(var t=this.pos,n=!1;;){if(!n)if('}'==this.input[this.pos]){if(0<e)e--;else{var i=this.pos;return this.match('}',!1),this.input.substring(t,i)}}else if('{'==this.input[this.pos])e++;else if(this.pos>=this.input.length-1)throw'Unterminated value';n='\\'==this.input[this.pos]&&!1==n,this.pos++}},this.value_comment=function(){for(var e='',t=0;!(this.tryMatch('}',!1)&&0==t);){if(e+=this.input[this.pos],'{'==this.input[this.pos]&&t++,'}'==this.input[this.pos]&&t--,this.pos>=this.input.length-1)throw'Unterminated value:'+this.input.substring(start);this.pos++}return e},this.value_quotes=function(){this.match('"',!1);for(var e=this.pos,t=!1;;){if(!t){if('"'==this.input[this.pos]){var n=this.pos;return this.match('"',!1),this.input.substring(e,n)}if(this.pos>=this.input.length-1)throw'Unterminated value:'+this.input.substring(e)}t='\\'==this.input[this.pos]&&!1==t,this.pos++}},this.single_value=function(){var e=this.pos;if(this.tryMatch('{'))return this.value_braces();if(this.tryMatch('"'))return this.value_quotes();var t=this.key();if(t.match('^[0-9]+$'))return t;if(0<=this.months.indexOf(t.toLowerCase()))return t.toLowerCase();throw'Value expected:'+this.input.substring(e)+' for key: '+t},this.value=function(){for(var e=[this.single_value()];this.tryMatch('#');)this.match('#'),e.push(this.single_value());return e.join('')},this.key=function(){for(var e=this.pos;;){if(this.pos>=this.input.length)throw'Runaway key';if(0<=this.notKey.indexOf(this.input[this.pos]))return this.input.substring(e,this.pos);this.pos++}},this.key_equals_value=function(){var e=this.key();if(this.tryMatch('=')){this.match('=');var t=this.value();return[e,t]}throw'... = value expected, equals sign missing:'+this.input.substring(this.pos)},this.key_value_list=function(){var e=this.key_equals_value();for(this.currentEntry.entryTags={},this.currentEntry.entryTags[e[0]]=e[1];this.tryMatch(',')&&(this.match(','),!this.tryMatch('}'));)e=this.key_equals_value(),this.currentEntry.entryTags[e[0]]=e[1]},this.entry_body=function(e){this.currentEntry={},this.currentEntry.citationKey=this.key(),this.currentEntry.entryType=e.substring(1),this.match(','),this.key_value_list(),this.entries.push(this.currentEntry)},this.directive=function(){return this.match('@'),'@'+this.key()},this.preamble=function(){this.currentEntry={},this.currentEntry.entryType='PREAMBLE',this.currentEntry.entry=this.value_comment(),this.entries.push(this.currentEntry)},this.comment=function(){this.currentEntry={},this.currentEntry.entryType='COMMENT',this.currentEntry.entry=this.value_comment(),this.entries.push(this.currentEntry)},this.entry=function(e){this.entry_body(e)},this.bibtex=function(){for(;this.matchAt();){var e=this.directive();this.match('{'),'@STRING'==e?this.string():'@PREAMBLE'==e?this.preamble():'@COMMENT'==e?this.comment():this.entry(e),this.match('}')}}}e.toJSON=function(e){var n=new t;return n.setInput(e),n.bibtex(),n.entries},e.toBibtex=function(e){var t='';for(var n in e){if(t+='@'+e[n].entryType,t+='{',e[n].citationKey&&(t+=e[n].citationKey+', '),e[n].entry&&(t+=e[n].entry),e[n].entryTags){var i='';for(var a in e[n].entryTags)0!=i.length&&(i+=', '),i+=a+'= {'+e[n].entryTags[a]+'}';t+=i}t+='}\n\n'}return t}})(t)});class Zi extends HTMLElement{static get is(){return'd-bibliography'}constructor(){super();const e=new MutationObserver((e)=>{for(const t of e)('SCRIPT'===t.target.nodeName||'characterData'===t.type)&&this.parseIfPossible()});e.observe(this,{childList:!0,characterData:!0,subtree:!0})}connectedCallback(){requestAnimationFrame(()=>{this.parseIfPossible()})}parseIfPossible(){const e=this.querySelector('script');if(e)if('text/bibtex'==e.type){const t=e.textContent;if(this.bibtex!==t){this.bibtex=t;const e=b(this.bibtex);this.notify(e)}}else if('text/json'==e.type){const t=new Map(JSON.parse(e.textContent));this.notify(t)}else console.warn('Unsupported bibliography script tag type: '+e.type)}notify(e){const t=new CustomEvent('onBibliographyChanged',{detail:e,bubbles:!0});this.dispatchEvent(t)}static get observedAttributes(){return['src']}receivedBibtex(e){const t=b(e.target.response);this.notify(t)}attributeChangedCallback(e,t,n){var i=new XMLHttpRequest;i.onload=(t)=>this.receivedBibtex(t),i.onerror=()=>console.warn(`Could not load Bibtex! (tried ${n})`),i.responseType='text',i.open('GET',n,!0),i.send()}}class Ji extends HTMLElement{static get is(){return'd-byline'}set frontMatter(e){this.innerHTML=y(e)}}const Gi=Ti('d-cite',`
<style>

:host {
  display: inline-block;
}

.citation {
  color: hsla(206, 90%, 20%, 0.7);
}

.citation-number {
  cursor: default;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", Helvetica, sans-serif;
  font-size: 75%;
  color: hsla(206, 90%, 20%, 0.7);
  display: inline-block;
  line-height: 1.1em;
  text-align: center;
  position: relative;
  top: -2px;
  margin: 0 2px;
}

figcaption .citation-number {
  font-size: 11px;
  font-weight: normal;
  top: -2px;
  line-height: 1em;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 15px 10px 15px 10px;
  border-bottom: 1px solid rgba(0,0,0,0.1)
}

ul li:last-of-type {
  border-bottom: none;
}

</style>

<d-hover-box id="hover-box"></d-hover-box>

<div id="citation-" class="citation">
  <span class="citation-number"></span>
</div>
`);class ea extends Gi(HTMLElement){constructor(){super(),this._numbers=[],this._entries=[]}connectedCallback(){this.outerSpan=this.root.querySelector('#citation-'),this.innerSpan=this.root.querySelector('.citation-number'),this.hoverBox=this.root.querySelector('d-hover-box'),window.customElements.whenDefined('d-hover-box').then(()=>{this.hoverBox.listen(this)}),this.numbers&&this.displayNumbers(this.numbers),this.entries&&this.displayEntries(this.entries)}static get observedAttributes(){return['key','bibtex-key']}attributeChangedCallback(e,t,n){const i=t?'onCiteKeyChanged':'onCiteKeyCreated',a=n.split(',').map((e)=>e.trim()),d={detail:[this,a],bubbles:!0},r=new CustomEvent(i,d);document.dispatchEvent(r)}set key(e){this.setAttribute('key',e)}get key(){return this.getAttribute('key')||this.getAttribute('bibtex-key')}get keys(){const e=this.key.split(',');return console.log(e),e}set numbers(e){this._numbers=e,this.displayNumbers(e)}get numbers(){return this._numbers}displayNumbers(e){if(this.innerSpan){const t=e.map((e)=>{return-1==e?'?':e+1+''}),n='['+t.join(', ')+']';this.innerSpan.textContent=n}}set entries(e){this._entries=e,this.displayEntries(e)}get entries(){return this._entries}displayEntries(e){this.hoverBox&&(this.hoverBox.innerHTML=`<ul>
      ${e.map(l).map((e)=>`<li>${e}</li>`).join('\n')}
    </ul>`)}}const ta=`
d-citation-list {
  contain: style;
}

d-citation-list .references {
  grid-column: text;
}

d-citation-list .references .title {
  font-weight: 500;
}
`;class na extends HTMLElement{static get is(){return'd-citation-list'}connectedCallback(){this.hasAttribute('distill-prerendered')||(this.style.display='none')}set citations(e){x(this,e)}}var ia=f(function(e){var t='undefined'==typeof window?'undefined'!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{}:window,n=function(e){function t(e,t,n,i,a){this.type=e,this.content=t,this.alias=n,this.length=0|(i||'').length,this.greedy=!!a}var n=/\blang(?:uage)?-([\w-]+)\b/i,i=0,a={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof t?new t(e.type,a.util.encode(e.content),e.alias):Array.isArray(e)?e.map(a.util.encode):e.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\u00a0/g,' ')},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,'__id',{value:++i}),e.__id},clone:function e(t,n){var d,i,r=a.util.type(t);switch(n=n||{},r){case'Object':if(i=a.util.objId(t),n[i])return n[i];for(var o in d={},n[i]=d,t)t.hasOwnProperty(o)&&(d[o]=e(t[o],n));return d;case'Array':return(i=a.util.objId(t),n[i])?n[i]:(d=[],n[i]=d,t.forEach(function(t,a){d[a]=e(t,n)}),d);default:return t;}},getLanguage:function(e){for(;e&&!n.test(e.className);)e=e.parentElement;return e?(e.className.match(n)||[,'none'])[1].toLowerCase():'none'},currentScript:function(){if('undefined'==typeof document)return null;if('currentScript'in document)return document.currentScript;try{throw new Error}catch(i){var e=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(i.stack)||[])[1];if(e){var t=document.getElementsByTagName('script');for(var n in t)if(t[n].src==e)return t[n]}return null}}},languages:{extend:function(e,t){var n=a.util.clone(a.languages[e]);for(var i in t)n[i]=t[i];return n},insertBefore:function(e,t,n,i){i=i||a.languages;var d=i[e],r={};for(var o in d)if(d.hasOwnProperty(o)){if(o==t)for(var l in n)n.hasOwnProperty(l)&&(r[l]=n[l]);n.hasOwnProperty(o)||(r[o]=d[o])}var s=i[e];return i[e]=r,a.languages.DFS(a.languages,function(t,n){n===s&&t!=e&&(this[t]=r)}),r},DFS:function e(t,n,d,r){r=r||{};var o=a.util.objId;for(var l in t)if(t.hasOwnProperty(l)){n.call(t,l,t[l],d||l);var i=t[l],s=a.util.type(i);'Object'!==s||r[o(i)]?'Array'===s&&!r[o(i)]&&(r[o(i)]=!0,e(i,n,l,r)):(r[o(i)]=!0,e(i,n,null,r))}}},plugins:{},highlightAll:function(e,t){a.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var d={callback:n,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run('before-highlightall',d),d.elements=Array.prototype.slice.apply(d.container.querySelectorAll(d.selector)),a.hooks.run('before-all-elements-highlight',d);for(var r,o=0;r=d.elements[o++];)a.highlightElement(r,!0===t,d.callback)},highlightElement:function(t,i,d){function r(e){u.highlightedCode=e,a.hooks.run('before-insert',u),u.element.innerHTML=u.highlightedCode,a.hooks.run('after-highlight',u),a.hooks.run('complete',u),d&&d.call(u.element)}var o=a.util.getLanguage(t),l=a.languages[o];t.className=t.className.replace(n,'').replace(/\s+/g,' ')+' language-'+o;var s=t.parentNode;s&&'pre'===s.nodeName.toLowerCase()&&(s.className=s.className.replace(n,'').replace(/\s+/g,' ')+' language-'+o);var c=t.textContent,u={element:t,language:o,grammar:l,code:c};if(a.hooks.run('before-sanity-check',u),!u.code)return a.hooks.run('complete',u),void(d&&d.call(u.element));if(a.hooks.run('before-highlight',u),!u.grammar)return void r(a.util.encode(u.code));if(i&&e.Worker){var p=new Worker(a.filename);p.onmessage=function(e){r(e.data)},p.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else r(a.highlight(u.code,u.grammar,u.language))},highlight:function(e,n,i){var d={code:e,grammar:n,language:i};return a.hooks.run('before-tokenize',d),d.tokens=a.tokenize(d.code,d.grammar),a.hooks.run('after-tokenize',d),t.stringify(a.util.encode(d.tokens),d.language)},matchGrammar:function(e,n,d,r,o,l,s){for(var c in d)if(d.hasOwnProperty(c)&&d[c]){var u=d[c];u=Array.isArray(u)?u:[u];for(var g=0;g<u.length;++g){if(s&&s==c+','+g)return;var f=u[g],h=f.inside,b=!!f.lookbehind,m=!!f.greedy,y=0,x=f.alias;if(m&&!f.pattern.global){var v=f.pattern.toString().match(/[imsuy]*$/)[0];f.pattern=RegExp(f.pattern.source,v+'g')}f=f.pattern||f;for(var w,C=r,i=o;C<n.length;i+=n[C].length,++C){if(w=n[C],n.length>e.length)return;if(!(w instanceof t)){if(m&&C!=n.length-1){f.lastIndex=i;var S=f.exec(e);if(!S)break;for(var T=S.index+(b&&S[1]?S[1].length:0),_=S.index+S[0].length,L=C,k=i,p=n.length;L<p&&(k<_||!n[L].type&&!n[L-1].greedy);++L)k+=n[L].length,T>=k&&(++C,i=k);if(n[C]instanceof t)continue;A=L-C,w=e.slice(i,k),S.index-=i}else{f.lastIndex=0;var S=f.exec(w),A=1}if(!S){if(l)break;continue}b&&(y=S[1]?S[1].length:0);var T=S.index+y,S=S[0].slice(y),_=T+S.length,E=w.slice(0,T),D=w.slice(_),M=[C,A];E&&(++C,i+=E.length,M.push(E));var U=new t(c,h?a.tokenize(S,h):S,x,S,m);if(M.push(U),D&&M.push(D),Array.prototype.splice.apply(n,M),1!=A&&a.matchGrammar(e,n,d,C,i,!0,c+','+g),l)break}}}}},tokenize:function(e,t){var n=[e],i=t.rest;if(i){for(var d in i)t[d]=i[d];delete t.rest}return a.matchGrammar(e,n,t,0,0,!1),n},hooks:{all:{},add:function(e,t){var n=a.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=a.hooks.all[e];if(n&&n.length)for(var d,r=0;d=n[r++];)d(t)}},Token:t};if(e.Prism=a,t.stringify=function(e,n){if('string'==typeof e)return e;if(Array.isArray(e))return e.map(function(e){return t.stringify(e,n)}).join('');var i={type:e.type,content:t.stringify(e.content,n),tag:'span',classes:['token',e.type],attributes:{},language:n};if(e.alias){var d=Array.isArray(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,d)}a.hooks.run('wrap',i);var r=Object.keys(i.attributes).map(function(e){return e+'="'+(i.attributes[e]||'').replace(/"/g,'&quot;')+'"'}).join(' ');return'<'+i.tag+' class="'+i.classes.join(' ')+'"'+(r?' '+r:'')+'>'+i.content+'</'+i.tag+'>'},!e.document)return e.addEventListener?(a.disableWorkerMessageHandler||e.addEventListener('message',function(t){var n=JSON.parse(t.data),i=n.language,d=n.code,r=n.immediateClose;e.postMessage(a.highlight(d,a.languages[i],i)),r&&e.close()},!1),a):a;var d=a.util.currentScript();if(d&&(a.filename=d.src,d.hasAttribute('data-manual')&&(a.manual=!0)),!a.manual){function e(){a.manual||a.highlightAll()}var r=document.readyState;'loading'===r||'interactive'===r&&d&&d.defer?document.addEventListener('DOMContentLoaded',e):window.requestAnimationFrame?window.requestAnimationFrame(e):window.setTimeout(e,16)}return a}(t);e.exports&&(e.exports=n),'undefined'!=typeof Qi&&(Qi.Prism=n),n.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,greedy:!0},cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},n.languages.markup.tag.inside['attr-value'].inside.entity=n.languages.markup.entity,n.hooks.add('wrap',function(e){'entity'===e.type&&(e.attributes.title=e.content.replace(/&amp;/,'&'))}),Object.defineProperty(n.languages.markup.tag,'addInlined',{value:function(e,t){var i={};i['language-'+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[t]},i.cdata=/^<!\[CDATA\[|\]\]>$/i;var a={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:i}};a['language-'+t]={pattern:/[\s\S]+/,inside:n.languages[t]};var d={};d[e]={pattern:RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g,e),'i'),lookbehind:!0,greedy:!0,inside:a},n.languages.insertBefore('markup','cdata',d)}}),n.languages.xml=n.languages.extend('markup',{}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,function(e){var t=/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,inside:{rule:/@[\w-]+/}},url:{pattern:RegExp('url\\((?:'+t.source+'|[^\n\r()]*)\\)','i'),inside:{function:/^url/i,punctuation:/^\(|\)$/}},selector:RegExp('[^{}\\s](?:[^{};"\']|'+t.source+')*?(?=\\s*\\{)'),string:{pattern:t,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var n=e.languages.markup;n&&(n.tag.addInlined('style','css'),e.languages.insertBefore('inside','attr-value',{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:n.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:e.languages.css}},alias:'language-css'}},n.tag))}(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend('clike',{"class-name":[n.languages.clike['class-name'],{pattern:/(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,function:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,operator:/--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/}),n.languages.javascript['class-name'][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,n.languages.insertBefore('javascript','keyword',{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*[\s\S]*?\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,alias:'function'},parameter:[{pattern:/(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore('javascript','string',{"template-string":{pattern:/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:'string'},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:'punctuation'},rest:n.languages.javascript}},string:/[\s\S]+/}}}),n.languages.markup&&n.languages.markup.tag.addInlined('script','javascript'),n.languages.js=n.languages.javascript,function(){'undefined'!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(e){e=e||document;var t={js:'javascript',py:'python',rb:'ruby',ps1:'powershell',psm1:'powershell',sh:'bash',bat:'batch',h:'c',tex:'latex'};Array.prototype.slice.call(e.querySelectorAll('pre[data-src]')).forEach(function(e){if(!e.hasAttribute('data-src-loaded')){for(var i,a=e.getAttribute('data-src'),d=e,r=/\blang(?:uage)?-([\w-]+)\b/i;d&&!r.test(d.className);)d=d.parentNode;if(d&&(i=(e.className.match(r)||[,''])[1]),!i){var o=(a.match(/\.(\w+)$/)||[,''])[1];i=t[o]||o}var l=document.createElement('code');l.className='language-'+i,e.textContent='',l.textContent='Loading\u2026',e.appendChild(l);var s=new XMLHttpRequest;s.open('GET',a,!0),s.onreadystatechange=function(){4==s.readyState&&(400>s.status&&s.responseText?(l.textContent=s.responseText,n.highlightElement(l),e.setAttribute('data-src-loaded','')):400<=s.status?l.textContent='\u2716 Error '+s.status+' while fetching file: '+s.statusText:l.textContent='\u2716 Error: File does not exist or is empty')},s.send(null)}})},document.addEventListener('DOMContentLoaded',function(){self.Prism.fileHighlight()}))}()});Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},"string-interpolation":{pattern:/(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:'punctuation'},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i,greedy:!0,alias:'string'},string:{pattern:/(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^\s*)@\w+(?:\.\w+)*/im,lookbehind:!0,alias:['annotation','punctuation'],inside:{punctuation:/\./}},keyword:/\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:True|False|None)\b/,number:/(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python['string-interpolation'].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python,Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},Prism.languages.lua={comment:/^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,string:{pattern:/(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,greedy:!0},number:/\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,keyword:/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,function:/(?!\d)\w+(?=\s*(?:[({]))/,operator:[/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,{pattern:/(^|[^.])\.\.(?!\.)/,lookbehind:!0}],punctuation:/[\[\](){},;]|\.+|:+/},function(e){var t={environment:{pattern:/\$\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\b/,alias:'constant'},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:/(\{)\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\b/,lookbehind:!0,alias:'constant'}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/};e.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:'important'},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:'function'},{pattern:/\b\w+(?=\s*\(\s*\)\s*\{)/,alias:'function'}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:'variable',lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,inside:{environment:{pattern:/(^|[\s;|&]|[<>]\()\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\b/,lookbehind:!0,alias:'constant'}},alias:'variable',lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)(?:[\s\S])*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:t},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)(?:[\s\S])*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0},{pattern:/(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,greedy:!0,inside:t}],environment:{pattern:/\$?\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\b/,alias:'constant'},variable:t.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,lookbehind:!0,alias:'class-name'},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:'important'},operator:{pattern:/\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,inside:{"file-descriptor":{pattern:/^\d/,alias:'important'}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}};for(var n=['comment','function-name','for-or-select','assign-left','string','environment','function','keyword','builtin','boolean','file-descriptor','operator','punctuation','number'],a=t.variable[1].inside,d=0;d<n.length;d++)a[n[d]]=e.languages.bash[n[d]];e.languages.shell=e.languages.bash}(Prism),Prism.languages.go=Prism.languages.extend('clike',{keyword:/\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,builtin:/\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,boolean:/\b(?:_|iota|nil|true|false)\b/,operator:/[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,number:/(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,string:{pattern:/(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,greedy:!0}}),delete Prism.languages.go['class-name'],function(e){function t(e,t){return e=e.replace(/<inner>/g,n),t&&(e=e+'|'+e.replace(/_/g,'\\*')),RegExp(/((?:^|[^\\])(?:\\{2})*)/.source+'(?:'+e+')')}var n=/(?:\\.|[^\\\n\r]|(?:\r?\n|\r)(?!\r?\n|\r))/.source,i=/(?:\\.|``.+?``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,a=/\|?__(?:\|__)+\|?(?:(?:\r?\n|\r)|$)/.source.replace(/__/g,i),d=/\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\r?\n|\r)/.source;e.languages.markdown=e.languages.extend('markup',{}),e.languages.insertBefore('markdown','prolog',{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:'punctuation'},table:{pattern:RegExp('^'+a+d+'(?:'+a+')*','m'),inside:{"table-data-rows":{pattern:RegExp('^('+a+d+')(?:'+a+')*$'),lookbehind:!0,inside:{"table-data":{pattern:RegExp(i),inside:e.languages.markdown},punctuation:/\|/}},"table-line":{pattern:RegExp('^('+a+')'+d+'$'),lookbehind:!0,inside:{punctuation:/\||:?-{3,}:?/}},"table-header-row":{pattern:RegExp('^'+a+'$'),inside:{"table-header":{pattern:RegExp(i),alias:'important',inside:e.languages.markdown},punctuation:/\|/}}}},code:[{pattern:/(^[ \t]*(?:\r?\n|\r))(?: {4}|\t).+(?:(?:\r?\n|\r)(?: {4}|\t).+)*/m,lookbehind:!0,alias:'keyword'},{pattern:/``.+?``|`[^`\r\n]+`/,alias:'keyword'},{pattern:/^```[\s\S]*?^```$/m,greedy:!0,inside:{"code-block":{pattern:/^(```.*(?:\r?\n|\r))[\s\S]+?(?=(?:\r?\n|\r)^```$)/m,lookbehind:!0},"code-language":{pattern:/^(```).+/,lookbehind:!0},punctuation:/```/}}],title:[{pattern:/\S.*(?:\r?\n|\r)(?:==+|--+)(?=[ \t]*$)/m,alias:'important',inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:'important',inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:'punctuation'},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:'punctuation'},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:'url'},bold:{pattern:t(/__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__/.source,!0),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^..)[\s\S]+(?=..$)/,lookbehind:!0,inside:{}},punctuation:/\*\*|__/}},italic:{pattern:t(/_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_/.source,!0),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^.)[\s\S]+(?=.$)/,lookbehind:!0,inside:{}},punctuation:/[*_]/}},strike:{pattern:t(/(~~?)(?:(?!~)<inner>)+?\2/.source,!1),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^~~?)[\s\S]+(?=\1$)/,lookbehind:!0,inside:{}},punctuation:/~~?/}},url:{pattern:t(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[(?:(?!\])<inner>)+\])/.source,!1),lookbehind:!0,greedy:!0,inside:{variable:{pattern:/(\[)[^\]]+(?=\]$)/,lookbehind:!0},content:{pattern:/(^!?\[)[^\]]+(?=\])/,lookbehind:!0,inside:{}},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),['url','bold','italic','strike'].forEach(function(t){['url','bold','italic','strike'].forEach(function(n){t!==n&&(e.languages.markdown[t].inside.content.inside[n]=e.languages.markdown[n])})}),e.hooks.add('after-tokenize',function(e){function t(e){if(e&&'string'!=typeof e)for(var n,a=0,i=e.length;a<i;a++){if(n=e[a],'code'!==n.type){t(n.content);continue}var d=n.content[1],r=n.content[3];if(d&&r&&'code-language'===d.type&&'code-block'===r.type&&'string'==typeof d.content){var o=d.content.replace(/\b#/g,'sharp').replace(/\b\+\+/g,'pp');o=(/[a-z][\w-]*/i.exec(o)||[''])[0].toLowerCase();var l='language-'+o;r.alias?'string'==typeof r.alias?r.alias=[r.alias,l]:r.alias.push(l):r.alias=[l]}}}'markdown'!==e.language&&'md'!==e.language||t(e.tokens)}),e.hooks.add('wrap',function(t){if('code-block'===t.type){for(var n='',a=0,i=t.classes.length;a<i;a++){var d=t.classes[a],r=/language-(.+)/.exec(d);if(r){n=r[1];break}}var o=e.languages[n];if(!!o){var l=t.content.replace(/&lt;/g,'<').replace(/&amp;/g,'&');t.content=e.highlight(l,o,n)}else if(n&&'none'!==n&&e.plugins.autoloader){var s='md-'+new Date().valueOf()+'-'+fi(1e16*Math.random());t.attributes.id=s,e.plugins.autoloader.loadLanguages(n,function(){var t=document.getElementById(s);t&&(t.innerHTML=e.highlight(t.textContent,e.languages[n],n))})}}}),e.languages.md=e.languages.markdown}(Prism),Prism.languages.julia={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},string:/("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2/,keyword:/\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\b/,boolean:/\b(?:true|false)\b/,number:/(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:[efp][+-]?\d+)?j?/i,operator:/[-+*^%÷&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥]/,punctuation:/[{}[\];(),.:]/,constant:/\b(?:(?:NaN|Inf)(?:16|32|64)?)\b/};const aa=Ti('d-code',`
<style>

code {
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  padding: 4px 7px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);
}

pre code {
  display: block;
  border-left: 2px solid rgba(0, 0, 0, .1);
  padding: 0 0 0 36px;
}

${'/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*="language-"],\npre[class*="language-"] {\n\tcolor: black;\n\tbackground: none;\n\ttext-shadow: 0 1px white;\n\tfont-family: Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace;\n\tfont-size: 1em;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,\ncode[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\npre[class*="language-"]::selection, pre[class*="language-"] ::selection,\ncode[class*="language-"]::selection, code[class*="language-"] ::selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\n@media print {\n\tcode[class*="language-"],\n\tpre[class*="language-"] {\n\t\ttext-shadow: none;\n\t}\n}\n\n/* Code blocks */\npre[class*="language-"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*="language-"],\npre[class*="language-"] {\n\tbackground: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*="language-"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #999;\n}\n\n.token.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n\tcolor: #9a6e3a;\n\tbackground: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n\tcolor: #07a;\n}\n\n.token.function,\n.token.class-name {\n\tcolor: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n\tcolor: #e90;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n'}
</style>

<code id="code-container"></code>

`);class da extends Si(aa(HTMLElement)){renderContent(){if(this.languageName=this.getAttribute('language'),!this.languageName)return void console.warn('You need to provide a language attribute to your <d-code> block to let us know how to highlight your code; e.g.:\n <d-code language="python">zeros = np.zeros(shape)</d-code>.');const e=ia.languages[this.languageName];if(void 0==e)return void console.warn(`Distill does not yet support highlighting your code block in "${this.languageName}'.`);let t=this.textContent;const n=this.shadowRoot.querySelector('#code-container');if(this.hasAttribute('block')){t=t.replace(/\n/,'');const e=t.match(/\s*/);if(t=t.replace(new RegExp('\n'+e,'g'),'\n'),t=t.trim(),n.parentNode instanceof ShadowRoot){const e=document.createElement('pre');this.shadowRoot.removeChild(n),e.appendChild(n),this.shadowRoot.appendChild(e)}}n.className=`language-${this.languageName}`,n.innerHTML=ia.highlight(t,e)}}const ra=Ti('d-footnote',`
<style>

d-math[block] {
  display: block;
}

:host {

}

sup {
  line-height: 1em;
  font-size: 0.75em;
  position: relative;
  top: -.5em;
  vertical-align: baseline;
}

span {
  color: hsla(206, 90%, 20%, 0.7);
  cursor: default;
}

.footnote-container {
  padding: 10px;
}

</style>

<d-hover-box>
  <div class="footnote-container">
    <slot id="slot"></slot>
  </div>
</d-hover-box>

<sup>
  <span id="fn-" data-hover-ref=""></span>
</sup>

`);class oa extends ra(HTMLElement){constructor(){super();const e=new MutationObserver(this.notify);e.observe(this,{childList:!0,characterData:!0,subtree:!0})}notify(){const e={detail:this,bubbles:!0},t=new CustomEvent('onFootnoteChanged',e);document.dispatchEvent(t)}connectedCallback(){this.hoverBox=this.root.querySelector('d-hover-box'),window.customElements.whenDefined('d-hover-box').then(()=>{this.hoverBox.listen(this)}),oa.currentFootnoteId+=1;const e=oa.currentFootnoteId.toString();this.root.host.id='d-footnote-'+e;const t='dt-fn-hover-box-'+e;this.hoverBox.id=t;const n=this.root.querySelector('#fn-');n.setAttribute('id','fn-'+e),n.setAttribute('data-hover-ref',t),n.textContent=e}}oa.currentFootnoteId=0;const la=Ti('d-footnote-list',`
<style>

d-footnote-list {
  contain: layout style;
}

d-footnote-list > * {
  grid-column: text;
}

d-footnote-list a.footnote-backlink {
  color: rgba(0,0,0,0.3);
  padding-left: 0.5em;
}

</style>

<h3>Footnotes</h3>
<ol></ol>
`,!1);class sa extends la(HTMLElement){connectedCallback(){super.connectedCallback(),this.list=this.root.querySelector('ol'),this.root.style.display='none'}set footnotes(e){if(this.list.innerHTML='',e.length){this.root.style.display='';for(const t of e){const e=document.createElement('li');e.id=t.id+'-listing',e.innerHTML=t.innerHTML;const n=document.createElement('a');n.setAttribute('class','footnote-backlink'),n.textContent='[\u21A9]',n.href='#'+t.id,e.appendChild(n),this.list.appendChild(e)}}else this.root.style.display='none'}}const ca=Ti('d-hover-box',`
<style>

:host {
  position: absolute;
  width: 100%;
  left: 0px;
  z-index: 10000;
  display: none;
  white-space: normal
}

.container {
  position: relative;
  width: 704px;
  max-width: 100vw;
  margin: 0 auto;
}

.panel {
  position: absolute;
  font-size: 1rem;
  line-height: 1.5em;
  top: 0;
  left: 0;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(250, 250, 250, 0.95);
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

</style>

<div class="container">
  <div class="panel">
    <slot></slot>
  </div>
</div>
`);class ua extends ca(HTMLElement){constructor(){super()}connectedCallback(){}listen(e){this.bindDivEvents(this),this.bindTriggerEvents(e)}bindDivEvents(e){e.addEventListener('mouseover',()=>{this.visible||this.showAtNode(e),this.stopTimeout()}),e.addEventListener('mouseout',()=>{this.extendTimeout(500)}),e.addEventListener('touchstart',(e)=>{e.stopPropagation()},{passive:!0}),document.body.addEventListener('touchstart',()=>{this.hide()},{passive:!0})}bindTriggerEvents(e){e.addEventListener('mouseover',()=>{this.visible||this.showAtNode(e),this.stopTimeout()}),e.addEventListener('mouseout',()=>{this.extendTimeout(300)}),e.addEventListener('touchstart',(t)=>{this.visible?this.hide():this.showAtNode(e),t.stopPropagation()},{passive:!0})}show(e){this.visible=!0,this.style.display='block',this.style.top=gi(e[1]+10)+'px'}showAtNode(e){const t=e.getBoundingClientRect();this.show([e.offsetLeft+t.width,e.offsetTop+t.height])}hide(){this.visible=!1,this.style.display='none',this.stopTimeout()}stopTimeout(){this.timeout&&clearTimeout(this.timeout)}extendTimeout(e){this.stopTimeout(),this.timeout=setTimeout(()=>{this.hide()},e)}}class pa extends HTMLElement{static get is(){return'd-title'}}const ga=Ti('d-references',`
<style>
d-references {
  display: block;
}
</style>
`,!1);class fa extends ga(HTMLElement){}class ha extends HTMLElement{static get is(){return'd-toc'}connectedCallback(){this.getAttribute('prerendered')||(window.onload=()=>{const e=document.querySelector('d-article'),t=e.querySelectorAll('h2, h3');k(this,t)})}}class ba extends HTMLElement{static get is(){return'd-figure'}static get readyQueue(){return ba._readyQueue||(ba._readyQueue=[]),ba._readyQueue}static addToReadyQueue(e){-1===ba.readyQueue.indexOf(e)&&(ba.readyQueue.push(e),ba.runReadyQueue())}static runReadyQueue(){const e=ba.readyQueue.sort((e,t)=>e._seenOnScreen-t._seenOnScreen).filter((e)=>!e._ready).pop();e&&(e.ready(),requestAnimationFrame(ba.runReadyQueue))}constructor(){super(),this._ready=!1,this._onscreen=!1,this._offscreen=!0}connectedCallback(){this.loadsWhileScrolling=this.hasAttribute('loadsWhileScrolling'),ba.marginObserver.observe(this),ba.directObserver.observe(this)}disconnectedCallback(){ba.marginObserver.unobserve(this),ba.directObserver.unobserve(this)}static get marginObserver(){if(!ba._marginObserver){const e=window.innerHeight,t=fi(2*e),n=ba.didObserveMarginIntersection,i=new IntersectionObserver(n,{rootMargin:t+'px 0px '+t+'px 0px',threshold:0.01});ba._marginObserver=i}return ba._marginObserver}static didObserveMarginIntersection(e){for(const t of e){const e=t.target;t.isIntersecting&&!e._ready&&ba.addToReadyQueue(e)}}static get directObserver(){return ba._directObserver||(ba._directObserver=new IntersectionObserver(ba.didObserveDirectIntersection,{rootMargin:'0px',threshold:[0,1]})),ba._directObserver}static didObserveDirectIntersection(e){for(const t of e){const e=t.target;t.isIntersecting?(e._seenOnScreen=new Date,e._offscreen&&e.onscreen()):e._onscreen&&e.offscreen()}}addEventListener(e,t){super.addEventListener(e,t),'ready'===e&&-1!==ba.readyQueue.indexOf(this)&&(this._ready=!1,ba.runReadyQueue()),'onscreen'===e&&this.onscreen()}ready(){this._ready=!0,ba.marginObserver.unobserve(this);const e=new CustomEvent('ready');this.dispatchEvent(e)}onscreen(){this._onscreen=!0,this._offscreen=!1;const e=new CustomEvent('onscreen');this.dispatchEvent(e)}offscreen(){this._onscreen=!1,this._offscreen=!0;const e=new CustomEvent('offscreen');this.dispatchEvent(e)}}if('undefined'!=typeof window){ba.isScrolling=!1;let e;window.addEventListener('scroll',()=>{ba.isScrolling=!0,clearTimeout(e),e=setTimeout(()=>{ba.isScrolling=!1,ba.runReadyQueue()},500)},!0)}const ma=Ti('d-interstitial',`
<style>

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;

  opacity: 1;
  visibility: visible;

  display: flex;
  flex-flow: column;
  justify-content: center;
  z-index: 2147483647 /* MaxInt32 */

}

.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
  padding: 2em;
}

h1 {
  text-decoration: underline;
  text-decoration-color: hsl(0,100%,40%);
  -webkit-text-decoration-color: hsl(0,100%,40%);
  margin-bottom: 1em;
  line-height: 1.5em;
}

input[type="password"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  -webkit-border-radius: none;
  -moz-border-radius: none;
  -ms-border-radius: none;
  -o-border-radius: none;
  border-radius: none;
  outline: none;

  font-size: 18px;
  background: none;
  width: 25%;
  padding: 10px;
  border: none;
  border-bottom: solid 2px #999;
  transition: border .3s;
}

input[type="password"]:focus {
  border-bottom: solid 2px #333;
}

input[type="password"].wrong {
  border-bottom: solid 2px hsl(0,100%,40%);
}

p small {
  color: #888;
}

.logo {
  position: relative;
  font-size: 1.5em;
  margin-bottom: 3em;
}

.logo svg {
  width: 36px;
  position: relative;
  top: 6px;
  margin-right: 2px;
}

.logo svg path {
  fill: none;
  stroke: black;
  stroke-width: 2px;
}

</style>

<div class="overlay">
  <div class="container">
    <h1>This article is in review.</h1>
    <p>Do not share this URL or the contents of this article. Thank you!</p>
    <input id="interstitial-password-input" type="password" name="password" autofocus/>
    <p><small>Enter the password we shared with you as part of the review process to view the article.</small></p>
  </div>
</div>
`);class ya extends ma(HTMLElement){connectedCallback(){if(this.shouldRemoveSelf())this.parentElement.removeChild(this);else{const e=this.root.querySelector('#interstitial-password-input');e.oninput=(e)=>this.passwordChanged(e)}}passwordChanged(e){const t=e.target.value;t===this.password&&(console.log('Correct password entered.'),this.parentElement.removeChild(this),'undefined'!=typeof Storage&&(console.log('Saved that correct password was entered.'),localStorage.setItem(this.localStorageIdentifier(),'true')))}shouldRemoveSelf(){return window&&window.location.hostname==='distill.pub'?(console.warn('Interstitial found on production, hiding it.'),!0):'undefined'!=typeof Storage&&'true'===localStorage.getItem(this.localStorageIdentifier())&&(console.log('Loaded that correct password was entered before; skipping interstitial.'),!0)}localStorageIdentifier(){return'distill-drafts'+(window?window.location.pathname:'-')+'interstitial-password-correct'}}var xa=function(e,t){return e<t?-1:e>t?1:e>=t?0:NaN},ka=function(e){return 1===e.length&&(e=v(e)),{left:function(t,n,i,a){for(null==i&&(i=0),null==a&&(a=t.length);i<a;){var d=i+a>>>1;0>e(t[d],n)?i=d+1:a=d}return i},right:function(t,n,i,a){for(null==i&&(i=0),null==a&&(a=t.length);i<a;){var d=i+a>>>1;0<e(t[d],n)?a=d:i=d+1}return i}}}(xa),va=ka.right,wa=function(e,t,a){e=+e,t=+t,a=2>(i=arguments.length)?(t=e,e=0,1):3>i?1:+a;for(var d=-1,i=0|ui(0,pi((t-e)/a)),n=Array(i);++d<i;)n[d]=e+d*a;return n},Ca=7.0710678118654755,Sa=3.1622776601683795,Ta=1.4142135623730951,_a=function(e,t,a){var d,r,n,o,l=-1;if(t=+t,e=+e,a=+a,e===t&&0<a)return[e];if((d=t<e)&&(r=e,e=t,t=r),0===(o=w(e,t,a))||!isFinite(o))return[];if(0<o)for(e=pi(e/o),t=fi(t/o),n=Array(r=pi(t-e+1));++l<r;)n[l]=(e+l)*o;else for(e=fi(e*o),t=pi(t*o),n=Array(r=pi(e-t+1));++l<r;)n[l]=(e-l)/o;return d&&n.reverse(),n},La=Array.prototype,Aa=La.map,Ea=La.slice,Da=function(e,t,n){e.prototype=t.prototype=n,n.constructor=e},Ma=0.7,Ua=1/Ma,Oa=/^#([0-9a-f]{3,8})$/,Na=/^rgb\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*\)$/,Ia=/^rgb\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*\)$/,ja=/^rgba\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/,Ra=/^rgba\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/,qa=/^hsl\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*\)$/,Ha=/^hsla\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/,Pa={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Da(L,O,{copy:function(e){return Object.assign(new this.constructor,this,e)},displayable:function(){return this.rgb().displayable()},hex:M,formatHex:M,formatHsl:function(){return Y(this).formatHsl()},formatRgb:U,toString:U}),Da(q,R,_(L,{brighter:function(e){return e=null==e?Ua:li(Ua,e),new q(this.r*e,this.g*e,this.b*e,this.opacity)},darker:function(e){return e=null==e?Ma:li(Ma,e),new q(this.r*e,this.g*e,this.b*e,this.opacity)},rgb:function(){return this},displayable:function(){return-0.5<=this.r&&255.5>this.r&&-0.5<=this.g&&255.5>this.g&&-0.5<=this.b&&255.5>this.b&&0<=this.opacity&&1>=this.opacity},hex:H,formatHex:H,formatRgb:P,toString:P})),Da(W,function(e,t,n,i){return 1===arguments.length?Y(e):new W(e,t,n,null==i?1:i)},_(L,{brighter:function(e){return e=null==e?Ua:li(Ua,e),new W(this.h,this.s,this.l*e,this.opacity)},darker:function(e){return e=null==e?Ma:li(Ma,e),new W(this.h,this.s,this.l*e,this.opacity)},rgb:function(){var e=this.h%360+360*(0>this.h),t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,i=n+(0.5>n?n:1-n)*t,a=2*n-i;return new q(V(240<=e?e-240:e+120,a,i),V(e,a,i),V(120>e?e+240:e-120,a,i),this.opacity)},displayable:function(){return(0<=this.s&&1>=this.s||isNaN(this.s))&&0<=this.l&&1>=this.l&&0<=this.opacity&&1>=this.opacity},formatHsl:function(){var e=this.opacity;return e=isNaN(e)?1:ui(0,hi(1,e)),(1===e?'hsl(':'hsla(')+(this.h||0)+', '+100*(this.s||0)+'%, '+100*(this.l||0)+'%'+(1===e?')':', '+e+')')}}));var Fa=ri/180,za=180/ri,Ya=18,K=0.96422,Xn=1,Yn=0.82521,Zn=4/29,Ba=6/29,Wa=3*Ba*Ba,Va=Ba*Ba*Ba;Da(Q,function(e,t,n,i){return 1===arguments.length?$(e):new Q(e,t,n,null==i?1:i)},_(L,{brighter:function(e){return new Q(this.l+Ya*(null==e?1:e),this.a,this.b,this.opacity)},darker:function(e){return new Q(this.l-Ya*(null==e?1:e),this.a,this.b,this.opacity)},rgb:function(){var e=(this.l+16)/116,t=isNaN(this.a)?e:e+this.a/500,n=isNaN(this.b)?e:e-this.b/200;return t=K*Z(t),e=Xn*Z(e),n=Yn*Z(n),new q(J(3.1338561*t-1.6168667*e-0.4906146*n),J(-0.9787684*t+1.9161415*e+0.033454*n),J(0.0719453*t-0.2289914*e+1.4052427*n),this.opacity)}})),Da(te,function(e,t,n,i){return 1===arguments.length?ee(e):new te(e,t,n,null==i?1:i)},_(L,{brighter:function(e){return new te(this.h,this.c,this.l+Ya*(null==e?1:e),this.opacity)},darker:function(e){return new te(this.h,this.c,this.l-Ya*(null==e?1:e),this.opacity)},rgb:function(){return ne(this).rgb()}}));var Ka=-0.14861,A=+1.78277,B=-0.29227,C=-0.90649,D=+1.97294,E=D*C,$a=D*A,Qa=A*B-C*Ka;Da(de,ae,_(L,{brighter:function(e){return e=null==e?Ua:li(Ua,e),new de(this.h,this.s,this.l*e,this.opacity)},darker:function(e){return e=null==e?Ma:li(Ma,e),new de(this.h,this.s,this.l*e,this.opacity)},rgb:function(){var e=isNaN(this.h)?0:(this.h+120)*Fa,t=+this.l,n=isNaN(this.s)?0:this.s*t*(1-t),i=ii(e),a=ni(e);return new q(255*(t+n*(Ka*i+A*a)),255*(t+n*(B*i+C*a)),255*(t+n*(D*i)),this.opacity)}}));var Xa=function(e){return function(){return e}},Za=function e(t){function n(e,t){var n=i((e=R(e)).r,(t=R(t)).r),a=i(e.g,t.g),d=i(e.b,t.b),r=ce(e.opacity,t.opacity);return function(i){return e.r=n(i),e.g=a(i),e.b=d(i),e.opacity=r(i),e+''}}var i=se(t);return n.gamma=e,n}(1),Ja=function(e,a){a||(a=[]);var d,i=e?hi(a.length,e.length):0,n=a.slice();return function(r){for(d=0;d<i;++d)n[d]=e[d]*(1-r)+a[d]*r;return n}},Ga=function(e,n){var i=new Date;return e=+e,n=+n,function(a){return i.setTime(e*(1-a)+n*a),i}},ed=function(e,n){return e=+e,n=+n,function(i){return e*(1-i)+n*i}},td=function(e,t){var n,d={},i={};for(n in(null===e||'object'!=typeof e)&&(e={}),(null===t||'object'!=typeof t)&&(t={}),t)n in e?d[n]=dd(e[n],t[n]):i[n]=t[n];return function(e){for(n in d)i[n]=d[n](e);return i}},nd=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,id=new RegExp(nd.source,'g'),ad=function(e,n){var t,a,d,r=nd.lastIndex=id.lastIndex=0,o=-1,l=[],s=[];for(e+='',n+='';(t=nd.exec(e))&&(a=id.exec(n));)(d=a.index)>r&&(d=n.slice(r,d),l[o]?l[o]+=d:l[++o]=d),(t=t[0])===(a=a[0])?l[o]?l[o]+=a:l[++o]=a:(l[++o]=null,s.push({i:o,x:ed(t,a)})),r=id.lastIndex;return r<n.length&&(d=n.slice(r),l[o]?l[o]+=d:l[++o]=d),2>l.length?s[0]?fe(s[0].x):ge(n):(n=s.length,function(e){for(var t,a=0;a<n;++a)l[(t=s[a]).i]=t.x(e);return l.join('')})},dd=function(e,n){var i,a=typeof n;return null==n||'boolean'==a?Xa(n):('number'==a?ed:'string'==a?(i=O(n))?(n=i,R):ad:n instanceof O?Za:n instanceof Date?Ga:ue(n)?Ja:Array.isArray(n)?pe:'function'!=typeof n.valueOf&&'function'!=typeof n.toString||isNaN(n)?td:ed)(e,n)},rd=function(e,n){return e=+e,n=+n,function(i){return gi(e*(1-i)+n*i)}};he(function(e,t){var n=t-e;return n?oe(e,180<n||-180>n?n-360*gi(n/360):n):Xa(isNaN(e)?t:e)});var od=he(ce),ld=function(e){return function(){return e}},sd=[0,1],cd=function(e,t){if(0>(n=(e=t?e.toExponential(t-1):e.toExponential()).indexOf('e')))return null;var n,i=e.slice(0,n);return[1<i.length?i[0]+i.slice(2):i,+e.slice(n+1)]},ud=function(e){return e=cd(oi(e)),e?e[1]:NaN},pd=function(e,n){return function(a,d){for(var r=a.length,i=[],t=0,o=e[0],l=0;0<r&&0<o&&(l+o+1>d&&(o=ui(1,d-l)),i.push(a.substring(r-=o,r+o)),!((l+=o+1)>d));)o=e[t=(t+1)%e.length];return i.reverse().join(n)}},gd=function(e){return function(t){return t.replace(/[0-9]/g,function(t){return e[+t]})}},fd=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;Ce.prototype=Se.prototype,Se.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?'0':'')+(this.width===void 0?'':ui(1,0|this.width))+(this.comma?',':'')+(this.precision===void 0?'':'.'+ui(0,0|this.precision))+(this.trim?'~':'')+this.type};var re,hd,bd,md,yd=function(e){out:for(var t,a=e.length,n=1,i=-1;n<a;++n)switch(e[n]){case'.':i=t=n;break;case'0':0===i&&(i=n),t=n;break;default:if(!+e[n])break out;0<i&&(i=0);}return 0<i?e.slice(0,i)+e.slice(t+1):e},xd=function(e,t){var n=cd(e,t);if(!n)return e+'';var i=n[0],a=n[1];return 0>a?'0.'+Array(-a).join('0')+i:i.length>a+1?i.slice(0,a+1)+'.'+i.slice(a+1):i+Array(a-i.length+2).join('0')},kd={"%":function(e,t){return(100*e).toFixed(t)},b:function(e){return gi(e).toString(2)},c:function(e){return e+''},d:function(e){return gi(e).toString(10)},e:function(e,t){return e.toExponential(t)},f:function(e,t){return e.toFixed(t)},g:function(e,t){return e.toPrecision(t)},o:function(e){return gi(e).toString(8)},p:function(e,t){return xd(100*e,t)},r:xd,s:function(e,t){var a=cd(e,t);if(!a)return e+'';var r=a[0],o=a[1],l=o-(re=3*ui(-8,hi(8,fi(o/3))))+1,i=r.length;return l===i?r:l>i?r+Array(l-i+1).join('0'):0<l?r.slice(0,l)+'.'+r.slice(l):'0.'+Array(1-l).join('0')+cd(e,ui(0,t+l-1))[0]},X:function(e){return gi(e).toString(16).toUpperCase()},x:function(e){return gi(e).toString(16)}},vd=function(e){return e},wd=Array.prototype.map,Cd=['y','z','a','f','p','n','\xB5','m','','k','M','G','T','P','E','Z','Y'],Sd=function(e){function t(e){function t(e){var t,i,n,o=k,g=v;if('c'===x)g=w(e)+g,e='';else{e=+e;var S=0>e;if(e=isNaN(e)?s:w(oi(e),m),y&&(e=yd(e)),S&&0==+e&&(S=!1),o=(S?'('===p?p:l:'-'===p||'('===p?'':p)+o,g=('s'===x?Cd[8+re/3]:'')+g+(S&&'('===p?')':''),C)for(t=-1,i=e.length;++t<i;)if(n=e.charCodeAt(t),48>n||57<n){g=(46===n?d+e.slice(t+1):e.slice(t))+g,e=e.slice(0,t);break}}b&&!f&&(e=a(e,Infinity));var T=o.length+e.length+g.length,_=T<h?Array(h-T+1).join(u):'';switch(b&&f&&(e=a(_+e,_.length?h-g.length:Infinity),_=''),c){case'<':e=o+e+g+_;break;case'=':e=o+_+e+g;break;case'^':e=_.slice(0,T=_.length>>1)+o+e+g+_.slice(T);break;default:e=_+o+e+g;}return r(e)}e=Ce(e);var u=e.fill,c=e.align,p=e.sign,g=e.symbol,f=e.zero,h=e.width,b=e.comma,m=e.precision,y=e.trim,x=e.type;'n'===x?(b=!0,x='g'):!kd[x]&&(void 0===m&&(m=12),y=!0,x='g'),(f||'0'===u&&'='===c)&&(f=!0,u='0',c='=');var k='$'===g?n:'#'===g&&/[boxX]/.test(x)?'0'+x.toLowerCase():'',v='$'===g?i:/[%p]/.test(x)?o:'',w=kd[x],C=/[defgprs%]/.test(x);return m=void 0===m?6:/[gprs]/.test(x)?ui(1,hi(21,m)):ui(0,hi(20,m)),t.toString=function(){return e+''},t}var a=e.grouping===void 0||e.thousands===void 0?vd:pd(wd.call(e.grouping,Number),e.thousands+''),n=e.currency===void 0?'':e.currency[0]+'',i=e.currency===void 0?'':e.currency[1]+'',d=e.decimal===void 0?'.':e.decimal+'',r=e.numerals===void 0?vd:gd(wd.call(e.numerals,String)),o=e.percent===void 0?'%':e.percent+'',l=e.minus===void 0?'-':e.minus+'',s=e.nan===void 0?'NaN':e.nan+'';return{format:t,formatPrefix:function(n,i){var a=t((n=Ce(n),n.type='f',n)),d=3*ui(-8,hi(8,fi(ud(i)/3))),r=li(10,-d),o=Cd[8+d/3];return function(e){return a(r*e)+o}}}};(function(e){return hd=Sd(e),bd=hd.format,md=hd.formatPrefix,hd})({decimal:'.',thousands:',',grouping:[3],currency:['$',''],minus:'-'});var Td=function(e){return ui(0,-ud(oi(e)))},_d=function(e,t){return ui(0,3*ui(-8,hi(8,fi(ud(t)/3)))-ud(oi(e)))},Ld=function(e,t){return e=oi(e),t=oi(t)-e,ui(0,ud(t)-ud(e))+1},Ad=function(e,t,n){var i,a=e[0],d=e[e.length-1],r=S(a,d,null==t?10:t);switch(n=Ce(null==n?',f':n),n.type){case's':{var o=ui(oi(a),oi(d));return null!=n.precision||isNaN(i=_d(r,o))||(n.precision=i),md(n,o)}case'':case'e':case'g':case'p':case'r':{null!=n.precision||isNaN(i=Ld(r,ui(oi(a),oi(d))))||(n.precision=i-('e'===n.type));break}case'f':case'%':{null!=n.precision||isNaN(i=Td(r))||(n.precision=i-2*('%'===n.type));break}}return bd(n)},Ed=new Date,Dd=new Date,Md=Le(function(){},function(e,t){e.setTime(+e+t)},function(e,t){return t-e});Md.every=function(e){return e=fi(e),isFinite(e)&&0<e?1<e?Le(function(t){t.setTime(fi(t/e)*e)},function(t,n){t.setTime(+t+n*e)},function(t,n){return(n-t)/e}):Md:null};var Ud=1e3,Od=6e4,Nd=36e5,Id=864e5,jd=6048e5,Rd=Le(function(e){e.setTime(e-e.getMilliseconds())},function(e,t){e.setTime(+e+t*Ud)},function(e,t){return(t-e)/Ud},function(e){return e.getUTCSeconds()}),qd=Le(function(e){e.setTime(e-e.getMilliseconds()-e.getSeconds()*Ud)},function(e,t){e.setTime(+e+t*Od)},function(e,t){return(t-e)/Od},function(e){return e.getMinutes()}),Hd=Le(function(e){e.setTime(e-e.getMilliseconds()-e.getSeconds()*Ud-e.getMinutes()*Od)},function(e,t){e.setTime(+e+t*Nd)},function(e,t){return(t-e)/Nd},function(e){return e.getHours()}),Pd=Le(function(e){e.setHours(0,0,0,0)},function(e,t){e.setDate(e.getDate()+t)},function(e,t){return(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*Od)/Id},function(e){return e.getDate()-1}),Fd=Ae(0),zd=Ae(1),Yd=Ae(2),Bd=Ae(3),Wd=Ae(4),Vd=Ae(5),Kd=Ae(6),$d=Le(function(e){e.setDate(1),e.setHours(0,0,0,0)},function(e,t){e.setMonth(e.getMonth()+t)},function(e,t){return t.getMonth()-e.getMonth()+12*(t.getFullYear()-e.getFullYear())},function(e){return e.getMonth()}),Qd=Le(function(e){e.setMonth(0,1),e.setHours(0,0,0,0)},function(e,t){e.setFullYear(e.getFullYear()+t)},function(e,t){return t.getFullYear()-e.getFullYear()},function(e){return e.getFullYear()});Qd.every=function(e){return isFinite(e=fi(e))&&0<e?Le(function(t){t.setFullYear(fi(t.getFullYear()/e)*e),t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,n){t.setFullYear(t.getFullYear()+n*e)}):null};var Xd=Le(function(e){e.setUTCSeconds(0,0)},function(e,t){e.setTime(+e+t*Od)},function(e,t){return(t-e)/Od},function(e){return e.getUTCMinutes()}),Zd=Le(function(e){e.setUTCMinutes(0,0,0)},function(e,t){e.setTime(+e+t*Nd)},function(e,t){return(t-e)/Nd},function(e){return e.getUTCHours()}),Jd=Le(function(e){e.setUTCHours(0,0,0,0)},function(e,t){e.setUTCDate(e.getUTCDate()+t)},function(e,t){return(t-e)/Id},function(e){return e.getUTCDate()-1}),Gd=Ee(0),er=Ee(1),tr=Ee(2),nr=Ee(3),ir=Ee(4),ar=Ee(5),dr=Ee(6),rr=Le(function(e){e.setUTCDate(1),e.setUTCHours(0,0,0,0)},function(e,t){e.setUTCMonth(e.getUTCMonth()+t)},function(e,t){return t.getUTCMonth()-e.getUTCMonth()+12*(t.getUTCFullYear()-e.getUTCFullYear())},function(e){return e.getUTCMonth()}),or=Le(function(e){e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},function(e,t){e.setUTCFullYear(e.getUTCFullYear()+t)},function(e,t){return t.getUTCFullYear()-e.getUTCFullYear()},function(e){return e.getUTCFullYear()});or.every=function(e){return isFinite(e=fi(e))&&0<e?Le(function(t){t.setUTCFullYear(fi(t.getUTCFullYear()/e)*e),t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCFullYear(t.getUTCFullYear()+n*e)}):null};var lr,sr,cr,ur={0:'0',"-":'',_:' '},pr=/^\s*\d+/,gr=/^%/,fr=/[\\^$*+?|[\]().{}]/g;(function(e){return lr=Oe(e),sr=lr.utcFormat,cr=lr.utcParse,lr})({dateTime:'%x, %X',date:'%-m/%-d/%Y',time:'%-I:%M:%S %p',periods:['AM','PM'],days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],months:['January','February','March','April','May','June','July','August','September','October','November','December'],shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']});var hr='%Y-%m-%dT%H:%M:%S.%LZ',br=Date.prototype.toISOString?function(e){return e.toISOString()}:sr(hr),mr=+new Date('2000-01-01T00:00:00.000Z')?function(e){var t=new Date(e);return isNaN(t)?null:t}:cr(hr),yr=function(e){return e.match(/.{6}/g).map(function(e){return'#'+e})};yr('1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf'),yr('393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6'),yr('3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9'),yr('1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5'),od(ae(300,0.5,0),ae(-240,0.5,1));var xr=od(ae(-100,0.75,0.35),ae(80,1.5,0.8)),kr=od(ae(260,0.75,0.35),ae(80,1.5,0.8)),vr=ae();Ft(yr('44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725'));var wr=Ft(yr('00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf')),Cr=Ft(yr('00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4')),Sr=Ft(yr('0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921')),Tr={value:function(){}};Yt.prototype=zt.prototype={constructor:Yt,on:function(e,a){var d,t=this._,r=Bt(e+'',t),o=-1,i=r.length;if(2>arguments.length){for(;++o<i;)if((d=(e=r[o]).type)&&(d=Wt(t[d],e.name)))return d;return}if(null!=a&&'function'!=typeof a)throw new Error('invalid callback: '+a);for(;++o<i;)if(d=(e=r[o]).type)t[d]=Vt(t[d],e.name,a);else if(null==a)for(d in t)t[d]=Vt(t[d],e.name,null);return this},copy:function(){var e={},n=this._;for(var i in n)e[i]=n[i].slice();return new Yt(e)},call:function(e,a){if(0<(d=arguments.length-2))for(var d,n,t=Array(d),r=0;r<d;++r)t[r]=arguments[r+2];if(!this._.hasOwnProperty(e))throw new Error('unknown type: '+e);for(n=this._[e],r=0,d=n.length;r<d;++r)n[r].value.apply(a,t)},apply:function(e,a,d){if(!this._.hasOwnProperty(e))throw new Error('unknown type: '+e);for(var r=this._[e],t=0,i=r.length;t<i;++t)r[t].value.apply(a,d)}};var _r='http://www.w3.org/1999/xhtml',Lr={svg:'http://www.w3.org/2000/svg',xhtml:_r,xlink:'http://www.w3.org/1999/xlink',xml:'http://www.w3.org/XML/1998/namespace',xmlns:'http://www.w3.org/2000/xmlns/'},Ar=function(e){var t=e+='',n=t.indexOf(':');return 0<=n&&'xmlns'!==(t=e.slice(0,n))&&(e=e.slice(n+1)),Lr.hasOwnProperty(t)?{space:Lr[t],local:e}:e},Er=function(e){var t=Ar(e);return(t.local?$t:Kt)(t)},Dr=function(e){return null==e?Qt:function(){return this.querySelector(e)}},Mr=function(e){return null==e?Xt:function(){return this.querySelectorAll(e)}},Ur=function(e){return function(){return this.matches(e)}},Or=function(e){return Array(e.length)};Zt.prototype={constructor:Zt,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};var Nr=function(e){return function(){return e}},Ir='$',jr=function(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView};mn.prototype={add:function(e){var t=this._names.indexOf(e);0>t&&(this._names.push(e),this._node.setAttribute('class',this._names.join(' ')))},remove:function(e){var t=this._names.indexOf(e);0<=t&&(this._names.splice(t,1),this._node.setAttribute('class',this._names.join(' ')))},contains:function(e){return 0<=this._names.indexOf(e)}};var Rr={},qr=null;if('undefined'!=typeof document){var Hr=document.documentElement;'onmouseenter'in Hr||(Rr={mouseenter:'mouseover',mouseleave:'mouseout'})}var Pr=[null];Wn.prototype=function(){return new Wn([[document.documentElement]],Pr)}.prototype={constructor:Wn,select:function(e){'function'!=typeof e&&(e=Dr(e));for(var t=this._groups,a=t.length,d=Array(a),r=0;r<a;++r)for(var o,l,s=t[r],c=s.length,n=d[r]=Array(c),u=0;u<c;++u)(o=s[u])&&(l=e.call(o,o.__data__,u,s))&&('__data__'in o&&(l.__data__=o.__data__),n[u]=l);return new Wn(d,this._parents)},selectAll:function(e){'function'!=typeof e&&(e=Mr(e));for(var t=this._groups,a=t.length,d=[],r=[],o=0;o<a;++o)for(var l,s=t[o],c=s.length,n=0;n<c;++n)(l=s[n])&&(d.push(e.call(l,l.__data__,n,s)),r.push(l));return new Wn(d,r)},filter:function(e){'function'!=typeof e&&(e=Ur(e));for(var t=this._groups,a=t.length,d=Array(a),r=0;r<a;++r)for(var o,l=t[r],s=l.length,n=d[r]=[],c=0;c<s;++c)(o=l[c])&&e.call(o,o.__data__,c,l)&&n.push(o);return new Wn(d,this._parents)},data:function(e,t){if(!e)return g=Array(this.size()),s=-1,this.each(function(e){g[++s]=e}),g;var n=t?Gt:Jt,i=this._parents,a=this._groups;'function'!=typeof e&&(e=Nr(e));for(var d=a.length,r=Array(d),o=Array(d),l=Array(d),s=0;s<d;++s){var c=i[s],u=a[s],p=u.length,g=e.call(c,c&&c.__data__,s,i),f=g.length,h=o[s]=Array(f),b=r[s]=Array(f),m=l[s]=Array(p);n(c,u,h,b,m,g,t);for(var y,x,k=0,v=0;k<f;++k)if(y=h[k]){for(k>=v&&(v=k+1);!(x=b[v])&&++v<f;);y._next=x||null}}return r=new Wn(r,i),r._enter=o,r._exit=l,r},enter:function(){return new Wn(this._enter||this._groups.map(Or),this._parents)},exit:function(){return new Wn(this._exit||this._groups.map(Or),this._parents)},join:function(e,t,n){var i=this.enter(),a=this,d=this.exit();return i='function'==typeof e?e(i):i.append(e+''),null!=t&&(a=t(a)),null==n?d.remove():n(d),i&&a?i.merge(a).order():a},merge:function(e){for(var t=this._groups,a=e._groups,d=t.length,r=a.length,o=hi(d,r),l=Array(d),s=0;s<o;++s)for(var c,u=t[s],p=a[s],g=u.length,n=l[s]=Array(g),f=0;f<g;++f)(c=u[f]||p[f])&&(n[f]=c);for(;s<d;++s)l[s]=t[s];return new Wn(l,this._parents)},order:function(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var a,d=e[t],r=d.length-1,i=d[r];0<=--r;)(a=d[r])&&(i&&4^a.compareDocumentPosition(i)&&i.parentNode.insertBefore(a,i),i=a);return this},sort:function(e){function t(t,n){return t&&n?e(t.__data__,n.__data__):!t-!n}e||(e=en);for(var a=this._groups,d=a.length,r=Array(d),o=0;o<d;++o){for(var l,s=a[o],c=s.length,n=r[o]=Array(c),u=0;u<c;++u)(l=s[u])&&(n[u]=l);n.sort(t)}return new Wn(r,this._parents).order()},call:function(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this},nodes:function(){var e=Array(this.size()),t=-1;return this.each(function(){e[++t]=this}),e},node:function(){for(var e=this._groups,t=0,a=e.length;t<a;++t)for(var d,r=e[t],o=0,i=r.length;o<i;++o)if(d=r[o],d)return d;return null},size:function(){var e=0;return this.each(function(){++e}),e},empty:function(){return!this.node()},each:function(e){for(var t=this._groups,a=0,d=t.length;a<d;++a)for(var r,o=t[a],l=0,i=o.length;l<i;++l)(r=o[l])&&e.call(r,r.__data__,l,o);return this},attr:function(e,t){var n=Ar(e);if(2>arguments.length){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((null==t?n.local?nn:tn:'function'==typeof t?n.local?on:rn:n.local?dn:an)(n,t))},style:function(e,t,n){return 1<arguments.length?this.each((null==t?ln:'function'==typeof t?cn:sn)(e,t,null==n?'':n)):un(this.node(),e)},property:function(e,t){return 1<arguments.length?this.each((null==t?pn:'function'==typeof t?fn:gn)(e,t)):this.node()[e]},classed:function(e,t){var a=hn(e+'');if(2>arguments.length){for(var d=bn(this.node()),r=-1,i=a.length;++r<i;)if(!d.contains(a[r]))return!1;return!0}return this.each(('function'==typeof t?wn:t?kn:vn)(a,t))},text:function(e){return arguments.length?this.each(null==e?Cn:('function'==typeof e?Tn:Sn)(e)):this.node().textContent},html:function(e){return arguments.length?this.each(null==e?_n:('function'==typeof e?An:Ln)(e)):this.node().innerHTML},raise:function(){return this.each(En)},lower:function(){return this.each(Dn)},append:function(e){var t='function'==typeof e?e:Er(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})},insert:function(e,t){var n='function'==typeof e?e:Er(e),i=null==t?Mn:'function'==typeof t?t:Dr(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})},remove:function(){return this.each(Un)},clone:function(e){return this.select(e?Nn:On)},datum:function(e){return arguments.length?this.property('__data__',e):this.node().__data__},on:function(e,a,d){var r,i,t=Rn(e+''),l=t.length;if(2>arguments.length){var n=this.node().__on;if(n)for(var s,o=0,c=n.length;o<c;++o)for(r=0,s=n[o];r<l;++r)if((i=t[r]).type===s.type&&i.name===s.name)return s.value;return}for(n=a?Hn:qn,null==d&&(d=!1),r=0;r<l;++r)this.each(n(t[r],a,d));return this},dispatch:function(e,t){return this.each(('function'==typeof t?Bn:zn)(e,t))}};var Fr=function(e){return'string'==typeof e?new Wn([[document.querySelector(e)]],[document.documentElement]):new Wn([[e]],Pr)},zr=function(){for(var e,t=qr;e=t.sourceEvent;)t=e;return t},Yr=function(e,t){var n=e.ownerSVGElement||e;if(n.createSVGPoint){var i=n.createSVGPoint();return i.x=t.clientX,i.y=t.clientY,i=i.matrixTransform(e.getScreenCTM().inverse()),[i.x,i.y]}var a=e.getBoundingClientRect();return[t.clientX-a.left-e.clientLeft,t.clientY-a.top-e.clientTop]},Br=function(e){var t=zr();return t.changedTouches&&(t=t.changedTouches[0]),Yr(e,t)},Wr=function(e,t,a){3>arguments.length&&(a=t,t=zr().changedTouches);for(var d,r=0,i=t?t.length:0;r<i;++r)if((d=t[r]).identifier===a)return Yr(e,d);return null},Vr=function(){qr.preventDefault(),qr.stopImmediatePropagation()},Kr=function(e){var t=e.document.documentElement,n=Fr(e).on('dragstart.drag',Vr,!0);'onselectstart'in t?n.on('selectstart.drag',Vr,!0):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect='none')};$n.prototype.on=function(){var e=this._.on.apply(this._,arguments);return e===this._?this:e};var $r=function(){function e(e){e.on('mousedown.drag',t).filter(h).on('touchstart.drag',a).on('touchmove.drag',d).on('touchend.drag touchcancel.drag',r).style('touch-action','none').style('-webkit-tap-highlight-color','rgba(0,0,0,0)')}function t(){if(!u&&p.apply(this,arguments)){var e=o('mouse',g.apply(this,arguments),Br,this,arguments);e&&(Fr(qr.view).on('mousemove.drag',n,!0).on('mouseup.drag',i,!0),Kr(qr.view),Vn(),c=!1,l=qr.clientX,s=qr.clientY,e('start'))}}function n(){if(Vr(),!c){var e=qr.clientX-l,t=qr.clientY-s;c=e*e+t*t>x}b.mouse('drag')}function i(){Fr(qr.view).on('mousemove.drag mouseup.drag',null),Kn(qr.view,c),Vr(),b.mouse('end')}function a(){if(p.apply(this,arguments)){var e,t,i=qr.changedTouches,a=g.apply(this,arguments),d=i.length;for(e=0;e<d;++e)(t=o(i[e].identifier,a,Wr,this,arguments))&&(Vn(),t('start'))}}function d(){var e,t,i=qr.changedTouches,a=i.length;for(e=0;e<a;++e)(t=b[i[e].identifier])&&(Vr(),t('drag'))}function r(){var e,t,i=qr.changedTouches,a=i.length;for(u&&clearTimeout(u),u=setTimeout(function(){u=null},500),e=0;e<a;++e)(t=b[i[e].identifier])&&(Vn(),t('end'))}function o(t,i,a,d,r){var o,l,s,c=a(i,t),u=m.copy();return Pn(new $n(e,'beforestart',o,t,y,c[0],c[1],0,0,u),function(){return null!=(qr.subject=o=f.apply(d,r))&&(l=o.x-c[0]||0,s=o.y-c[1]||0,!0)})?function p(g){var f,n=c;switch(g){case'start':b[t]=p,f=y++;break;case'end':delete b[t],--y;case'drag':c=a(i,t),f=y;}Pn(new $n(e,g,o,t,f,c[0]+l,c[1]+s,c[0]-n[0],c[1]-n[1],u),u.apply,u,[g,d,r])}:void 0}var l,s,c,u,p=Qn,g=Jn,f=Gn,h=ei,b={},m=zt('start','drag','end'),y=0,x=0;return e.filter=function(t){return arguments.length?(p='function'==typeof t?t:constant(!!t),e):p},e.container=function(t){return arguments.length?(g='function'==typeof t?t:constant(t),e):g},e.subject=function(t){return arguments.length?(f='function'==typeof t?t:constant(t),e):f},e.touchable=function(t){return arguments.length?(h='function'==typeof t?t:constant(!!t),e):h},e.on=function(){var t=m.on.apply(m,arguments);return t===m?e:t},e.clickDistance=function(t){return arguments.length?(x=(t=+t)*t,e):ai(x)},e};const Qr=Ti('d-slider',`
<style>
  :host {
    position: relative;
    display: inline-block;
  }

  :host(:focus) {
    outline: none;
  }

  .background {
    padding: 9px 0;
    color: white;
    position: relative;
  }

  .track {
    height: 3px;
    width: 100%;
    border-radius: 2px;
    background-color: hsla(0, 0%, 0%, 0.2);
  }

  .track-fill {
    position: absolute;
    top: 9px;
    height: 3px;
    border-radius: 4px;
    background-color: hsl(24, 100%, 50%);
  }

  .knob-container {
    position: absolute;
    top: 10px;
  }

  .knob {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 13px;
    height: 13px;
    background-color: hsl(24, 100%, 50%);
    border-radius: 50%;
    transition-property: transform;
    transition-duration: 0.18s;
    transition-timing-function: ease;
  }
  .mousedown .knob {
    transform: scale(1.5);
  }

  .knob-highlight {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 13px;
    height: 13px;
    background-color: hsla(0, 0%, 0%, 0.1);
    border-radius: 50%;
    transition-property: transform;
    transition-duration: 0.18s;
    transition-timing-function: ease;
  }

  .focus .knob-highlight {
    transform: scale(2);
  }

  .ticks {
    position: absolute;
    top: 16px;
    height: 4px;
    width: 100%;
    z-index: -1;
  }

  .ticks .tick {
    position: absolute;
    height: 100%;
    border-left: 1px solid hsla(0, 0%, 0%, 0.2);
  }

</style>

  <div class='background'>
    <div class='track'></div>
    <div class='track-fill'></div>
    <div class='knob-container'>
      <div class='knob-highlight'></div>
      <div class='knob'></div>
    </div>
    <div class='ticks'></div>
  </div>
`),Xr={left:37,up:38,right:39,down:40,pageUp:33,pageDown:34,end:35,home:36};class Zr extends Qr(HTMLElement){connectedCallback(){this.connected=!0,this.setAttribute('role','slider'),this.hasAttribute('tabindex')||this.setAttribute('tabindex',0),this.mouseEvent=!1,this.knob=this.root.querySelector('.knob-container'),this.background=this.root.querySelector('.background'),this.trackFill=this.root.querySelector('.track-fill'),this.track=this.root.querySelector('.track'),this.min=this.min?this.min:0,this.max=this.max?this.max:100,this.scale=_e().domain([this.min,this.max]).range([0,1]).clamp(!0),this.origin=this.origin===void 0?this.min:this.origin,this.step=this.step?this.step:1,this.update(this.value?this.value:0),this.ticks=!!this.ticks&&this.ticks,this.renderTicks(),this.drag=$r().container(this.background).on('start',()=>{this.mouseEvent=!0,this.background.classList.add('mousedown'),this.changeValue=this.value,this.dragUpdate()}).on('drag',()=>{this.dragUpdate()}).on('end',()=>{this.mouseEvent=!1,this.background.classList.remove('mousedown'),this.dragUpdate(),this.changeValue!==this.value&&this.dispatchChange(),this.changeValue=this.value}),this.drag(Fr(this.background)),this.addEventListener('focusin',()=>{this.mouseEvent||this.background.classList.add('focus')}),this.addEventListener('focusout',()=>{this.background.classList.remove('focus')}),this.addEventListener('keydown',this.onKeyDown)}static get observedAttributes(){return['min','max','value','step','ticks','origin','tickValues','tickLabels']}attributeChangedCallback(e,t,n){isNaN(n)||void 0===n||null===n||('min'==e&&(this.min=+n,this.setAttribute('aria-valuemin',this.min)),'max'==e&&(this.max=+n,this.setAttribute('aria-valuemax',this.max)),'value'==e&&this.update(+n),'origin'==e&&(this.origin=+n),'step'==e&&0<n&&(this.step=+n),'ticks'==e&&(this.ticks=!(''!==n)||n))}onKeyDown(e){this.changeValue=this.value;let t=!1;switch(e.keyCode){case Xr.left:case Xr.down:this.update(this.value-this.step),t=!0;break;case Xr.right:case Xr.up:this.update(this.value+this.step),t=!0;break;case Xr.pageUp:this.update(this.value+10*this.step),t=!0;break;case Xr.pageDown:this.update(this.value+10*this.step),t=!0;break;case Xr.home:this.update(this.min),t=!0;break;case Xr.end:this.update(this.max),t=!0;break;default:}t&&(this.background.classList.add('focus'),e.preventDefault(),e.stopPropagation(),this.changeValue!==this.value&&this.dispatchChange())}validateValueRange(e,t,n){return ui(hi(t,n),e)}quantizeValue(e,t){return gi(e/t)*t}dragUpdate(){const e=this.background.getBoundingClientRect(),t=qr.x,n=e.width;this.update(this.scale.invert(t/n))}update(e){let t=e;'any'!==this.step&&(t=this.quantizeValue(e,this.step)),t=this.validateValueRange(this.min,this.max,t),this.connected&&(this.knob.style.left=100*this.scale(t)+'%',this.trackFill.style.width=100*this.scale(this.min+oi(t-this.origin))+'%',this.trackFill.style.left=100*this.scale(hi(t,this.origin))+'%'),this.value!==t&&(this.value=t,this.setAttribute('aria-valuenow',this.value),this.dispatchInput())}dispatchChange(){const t=new Event('change');this.dispatchEvent(t,{})}dispatchInput(){const t=new Event('input');this.dispatchEvent(t,{})}renderTicks(){const e=this.root.querySelector('.ticks');if(!1!==this.ticks){let t=[];t=0<this.ticks?this.scale.ticks(this.ticks):'any'===this.step?this.scale.ticks():wa(this.min,this.max+1e-6,this.step),t.forEach((t)=>{const n=document.createElement('div');n.classList.add('tick'),n.style.left=100*this.scale(t)+'%',e.appendChild(n)})}else e.style.display='none'}}var Jr='<svg viewBox="-607 419 64 64">\n  <path d="M-573.4,478.9c-8,0-14.6-6.4-14.6-14.5s14.6-25.9,14.6-40.8c0,14.9,14.6,32.8,14.6,40.8S-565.4,478.9-573.4,478.9z"/>\n</svg>\n';const Gr=`
<style>
pal-header {
  position: relative;
  height: 60px;
  background-color: hsl(200, 60%, 15%);
  width: 100%;
  box-sizing: border-box;
  z-index: 2;
  color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}
pal-header .content {
  height: 70px;
  grid-column: page;
}
pal-header a {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 22px 0;
}
pal-header a:hover {
  color: rgba(255, 255, 255, 1);
}
pal-header svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}
@media(min-width: 1080px) {
  pal-header {
    height: 70px;
  }
  pal-header a {
    height: 70px;
    line-height: 70px;
    padding: 28px 0;
  }
  pal-header .logo {
  }
}
pal-header svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}
pal-header .logo {
  font-size: 17px;
  font-weight: 200;
}
pal-header .nav {
  float: right;
  font-weight: 300;
}
pal-header .nav a {
  font-size: 12px;
  margin-left: 24px;
  text-transform: uppercase;
}
</style>
<div class="content">
  <a href="https://predictive-analytics-lab.github.io/" class="logo">
    ${Jr}
    Predictive Analytics Laboratory
  </a>
  <nav class="nav">
    <a href="https://predictive-analytics-lab.com/reading">Reading Group</a>
    <a href="https://predictive-analytics-lab.com/publications">Publications</a>
    <a href="https://predictive-analytics-lab.com/jobs">Jobs</a>
  </nav>
</div>
`,eo=Ti('pal-header',Gr,!1);class to extends eo(HTMLElement){}const no=`
<style>
distill-header {
  position: relative;
  height: 60px;
  background-color: hsl(200, 60%, 15%);
  width: 100%;
  box-sizing: border-box;
  z-index: 2;
  color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}
distill-header .content {
  height: 70px;
  grid-column: page;
}
distill-header a {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 22px 0;
}
distill-header a:hover {
  color: rgba(255, 255, 255, 1);
}
distill-header svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}
@media(min-width: 1080px) {
  distill-header {
    height: 70px;
  }
  distill-header a {
    height: 70px;
    line-height: 70px;
    padding: 28px 0;
  }
  distill-header .logo {
  }
}
distill-header svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}
distill-header .logo {
  font-size: 17px;
  font-weight: 200;
}
distill-header .nav {
  float: right;
  font-weight: 300;
}
distill-header .nav a {
  font-size: 12px;
  margin-left: 24px;
  text-transform: uppercase;
}
</style>
<div class="content">
  <a href="/" class="logo">
    ${Jr}
    Distill
  </a>
  <nav class="nav">
    <a href="/about/">About</a>
    <a href="/prize/">Prize</a>
    <a href="/journal/">Submit</a>
  </nav>
</div>
`,io=Ti('distill-header',no,!1);class ao extends io(HTMLElement){}const ro=`
<style>
  distill-appendix {
    contain: layout style;
  }

  distill-appendix .citation {
    font-size: 11px;
    line-height: 15px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 18px;
    border: 1px solid rgba(0,0,0,0.1);
    background: rgba(0, 0, 0, 0.02);
    padding: 10px 18px;
    border-radius: 3px;
    color: rgba(150, 150, 150, 1);
    overflow: hidden;
    margin-top: -12px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  distill-appendix > * {
    grid-column: text;
  }
</style>
`;class oo extends HTMLElement{static get is(){return'distill-appendix'}set frontMatter(e){this.innerHTML=ti(e)}}const lo=`
<style>

:host {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  padding: 2rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: hsl(180, 5%, 15%); /*hsl(200, 60%, 15%);*/
  text-align: left;
  contain: content;
}

.footer-container .logo svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}

.footer-container .logo svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}

.footer-container .logo {
  font-size: 17px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-right: 6px;
}

.footer-container {
  grid-column: text;
}

.footer-container .nav {
  font-size: 0.9em;
  margin-top: 1.5em;
}

.footer-container .nav a {
  color: rgba(255, 255, 255, 0.8);
  margin-right: 6px;
  text-decoration: none;
}

</style>

<div class='footer-container'>

  <a href="/" class="logo">
    ${Jr}
    Predictive Analytics Laboratory
  </a> is dedicated to solving big problems with big ideas

  <div class="nav">
    <a href="https://predictive-analytics-lab.com/#important_dates">About</a>
    <a href="https://predictive-analytics-lab.com/#projects">Projects</a>
    <a href="https://predictive-analytics-lab.com/#teampics">Team</a>
    <a href="https://predictive-analytics-lab.com/publications">Publications</a>
    <a href="https://predictive-analytics-lab.com/reading">Reading Group</a>
    <a href="https://predictive-analytics-lab.com/#contactUs">Contact</a>
    <a href="https://github.com/predictive-analytics-lab">GitHub</a>
  </div>

</div>

`,so=Ti('pal-footer',lo);class co extends so(HTMLElement){}const uo=`
<style>

:host {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  padding: 2rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: hsl(180, 5%, 15%); /*hsl(200, 60%, 15%);*/
  text-align: left;
  contain: content;
}

.footer-container .logo svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}

.footer-container .logo svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}

.footer-container .logo {
  font-size: 17px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-right: 6px;
}

.footer-container {
  grid-column: text;
}

.footer-container .nav {
  font-size: 0.9em;
  margin-top: 1.5em;
}

.footer-container .nav a {
  color: rgba(255, 255, 255, 0.8);
  margin-right: 6px;
  text-decoration: none;
}

</style>

<div class='footer-container'>

  <a href="/" class="logo">
    ${Jr}
    Distill
  </a> is dedicated to clear explanations of machine learning

  <div class="nav">
    <a href="https://distill.pub/about/">About</a>
    <a href="https://distill.pub/journal/">Submit</a>
    <a href="https://distill.pub/prize/">Prize</a>
    <a href="https://distill.pub/archive/">Archive</a>
    <a href="https://distill.pub/rss.xml">RSS</a>
    <a href="https://github.com/distillpub">GitHub</a>
    <a href="https://twitter.com/distillpub">Twitter</a>
    &nbsp;&nbsp;&nbsp;&nbsp; ISSN 2476-0757
  </div>

</div>

`,po=Ti('distill-footer',uo);class go extends po(HTMLElement){}window.distill={runlevel:0,initialize:function(){if(1>window.distill.runlevel)throw new Error('Insufficient Runlevel for Distill Template!');if('distill'in window&&window.distill.templateIsLoading)throw new Error('Runlevel 1: Distill Template is getting loaded more than once, aborting!');else window.distill.templateIsLoading=!0,console.debug('Runlevel 1: Distill Template has started loading.');p(document),console.debug('Runlevel 1: Static Distill styles have been added.'),console.debug('Runlevel 1->2.'),window.distill.runlevel+=1;for(const[e,t]of Object.entries(Hi.listeners))'function'==typeof t?document.addEventListener(e,t):console.error('Runlevel 2: Controller listeners need to be functions!');console.debug('Runlevel 2: We can now listen to controller events.'),console.debug('Runlevel 2->3.'),window.distill.runlevel+=1;if(2>window.distill.runlevel)throw new Error('Insufficient Runlevel for adding custom elements!');const e=[Bi,Vi,$i,Zi,Ji,ea,na,da,oa,sa,ji,ua,pa,T,fa,ha,ba,Zr,ya].concat([to,ao,oo,co,go]);for(const t of e)console.debug('Runlevel 2: Registering custom element: '+t.is),customElements.define(t.is,t);console.debug('Runlevel 3: Distill Template finished registering custom elements.'),console.debug('Runlevel 3->4.'),window.distill.runlevel+=1,s()&&Hi.listeners.DOMContentLoaded(),console.debug('Runlevel 4: Distill Template initialisation complete.'),window.distill.templateIsLoading=!1,window.distill.templateHasLoaded=!0},templateIsLoading:!1},zi.browserSupportsAllFeatures()?(console.debug('Runlevel 0: No need for polyfills.'),console.debug('Runlevel 0->1.'),window.distill.runlevel+=1,window.distill.initialize()):(console.debug('Runlevel 0: Distill Template is loading polyfills.'),zi.load(window.distill.initialize))});
//# sourceMappingURL=template.v2.js.map
