function rafr(){var a=window.innerHeight;a=a?a:document.body.clientHeight;var b=window.innerWidth;b=b?b:document.body.clientWidth;if(hautt){Ifrd.style.left="0px";Ifrd.style.top="1px";Ifrd.style.height=a+"px";Ifrd.style.width=b+"px";Deb.style.display="none";Header.style.display="none"}else{Deb.style.display="block";Header.style.display="inline";Logo.style.display=disp_logo?"block":"none";var c=ObjHeight(Logo,0);c=ObjHeight(Ti,c);Header.style.height=c+"px";var d=ObjHeight(Logof,0);Footer.style.height=d+"px";var e=a-d;Header.style.width=b+"px";Deb.style.top=c+1+"px";if(menut=="V"){Deb.style.height=e-c-1+"px";var f=ObjWidth(Deb);Deb.style.width=f+"px";Ifrd.style.left=f+"px";Ifrd.style.top=c+1+"px";Ifrd.style.width=b-f+1+"px";Ifrd.style.height=e-c-1+"px"}else{var g=ObjHeight(Deb,0);var h=c+g;Deb.style.height=g+"px";Deb.style.width=b+"px";Ifrd.style.left="0px";Ifrd.style.top=h+1+"px";Ifrd.style.width=b+"px";Ifrd.style.height=e-h-1+"px"}Footer.style.top=e+"px";Footer.style.width=b+"px"}}function ObjHeight(a,b){var c=a.scrollHeight;return c>b?c:b}function ObjWidth(a){return a.scrollWidth}function init_page(){z(0);Audiop.style.left="-2000px";hautt=false;rafr();window.onresize=rafr;Body.onmousemove=function(a){bord=9;a=a?a:window.event;var b=parseInt(a.clientX);var c=parseInt(a.clientY);if(hautt){if(c<bord){hautt=false;rafr()}}else{if(b<bord&&b>0&&c>Yw-bord){hautt=true;rafr()}}}}function z(a){if(raf_menu!=a){include_css(nom_fic);include_js(nom_fic);include_js(nom_fic+"2");raf_menu=a}}function rinit(){include_js(nom_fic+"3");setTimeout("rinit()",parseInt(rafraich)*1e3)}function callback(a,b,c,g,h,i,j,l,m){v=[];n=[];mp=[];d=[];d[0]="";f=[];e=[];menu=[];k=0;x=0;x=0;mp3=0;docu=a;niv=b;arbu=c;d=g;f=h;e=i;repsys=j;chemrel=l;file=m;chemrel="";repsys=repsys.slice(3);var o=Deb;while(o.firstChild){o.removeChild(o.firstChild)}if(docu[1]!="")aa([0,0,docu[1][0],0,0]);titr.innerHTML=conv(d[0]);lance(docu)}function include_css(a){node=document.getElementById(a+"_css");if(node){var b=node.parentNode;b.removeChild(node)}var c=document.createElement("link");var d=document.getElementsByTagName("head")[0];c.setAttribute("rel","stylesheet");c.setAttribute("type","text/css");c.setAttribute("id",a+"_css");c.setAttribute("href","~DidacDoc/"+a+".css?time="+(new Date).getTime());d.appendChild(c)}function include_js(a){node=document.getElementById(a);if(node){var b=node.parentNode;b.removeChild(node)}var c=document.createElement("script");var d=document.getElementsByTagName("head")[0];c.setAttribute("type","text/javascript");c.setAttribute("id",a);c.setAttribute("src","~DidacDoc/"+a+".js?time="+(new Date).getTime());d.appendChild(c)}function t(a){while(a.tagName!="LI")a=a.parentNode;a=a.firstChild;while(a.tagName!="UL"){a=a.nextSibling;if(a==null)return}var b=a.getAttribute("a");affarbo(arbor(b));D1.innerHTML="";var c=a.style.display=="none"?"m":"p";menu[b]=c;a.style.display=c=="m"?"block":"none";rafr();var d="";for(var e=0;e<=kk;e++)d+=menu[e];date=new Date;date.setMonth(date.getMonth()+6);document.cookie="menu="+escape(d)+"; expires="+date.toGMTString()}function o(a,b){a=a.firstChild;while(a.tagName!="UL")a=a.nextSibling;a.style.display=b}function y(b){t(b);a(b)}function h(a){window.open(arbor(a.getAttribute("a"))+"~"+file+".html","_top")}function stat2(a){var b=new XMLHttpRequest;b.open("GET",a,true);b.onreadystatechange=function(c){if(b.readyState===4){var d=b.getResponseHeader("X-Frame-Options");alert(b);alert(d);if(d.indexOf("x-frame-options")!=-1)window.open(a,"_blank");else window.open(a,"p")}};b.send(null)}function stat(a){var b=null;if(window.XMLHttpRequest)b=new XMLHttpRequest;else if(window.ActiveXObject)b=new ActiveXObject("Microsoft.XMLHTTP");else{alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");return}b.open("GET",a,false);b.onreadystatechange=function(){if(this.readyState==4)Ifrd.innerHTML=b.responseText};b.send(null)}function aa(a,b){var c=a[1];var g=e[a[2]];var h=parseInt(a[3]);var i=a[4];var j=f[c];spli=j.split(g+g);if(spli.length>1)spli2=spli[1].ltrim();arb=arbor(a[0]);affarbo(arb);if(i!=0)D1.innerHTML=conv(j);hre=arb+(i!=0?j:d[c]);var k="p";if(images.indexOf(g.toLowerCase())!=-1)hre=media(hre,g);else{switch(g){case"*l":hre=hre+"/index.html";break;case"*":hre=hre+"/index.htm";break;case"@":hre=urlcode(spli2);break;case"#":hre=urlcode(spli2);k="_blank";break;case"!":if(spli2.charAt(0)=="~")hre="file:///c:/"+urlcode(spli2.slice(1));else hre=arb+j+"/"+urlcode(spli2);break;case"=":hre=urlcode(spli2);break;case"dia":case"flv":case"swf":hre=media(hre,g);break;default:hre=hre+(h==2?"-.":".")+g}}if(g.toLowerCase()=="mp3"){if(ahre==hre){if(mp3Pause){Audiop.style.left=b.offsetLeft+30;niftyplayer("niftyPlayer1").play(encode(hre));mp3Pause=false}else{niftyplayer("niftyPlayer1").pause();Audiop.style.left="-2000px";mp3Pause=true}}else{Audiop.style.left=b.offsetLeft+30;niftyplayer("niftyPlayer1").loadAndPlay(encode(hre));mp3Pause=false;ahre=hre}}else{j=conv(j);if(h==6||h==2||j.indexOf(titrepasse)!=-1)paass(hre,"p",j,1);else{window.open(hre,k)}}}function affarbo(a){var b=a.split("/");D2.innerHTML="";D3.innerHTML="";D4.innerHTML="";D5.innerHTML="";D6.innerHTML="";D7.innerHTML="";D8.innerHTML="";for(var c=0;c<b.length;c++)document.getElementById("d"+String(c+2)).innerHTML=" "+b[c]}function a(a){if(oobj)oobj.style.backgroundColor="";a.style.backgroundColor=SelBckGrd;oobj=a;var b=a.getAttribute("a");var c=b.split(" ");aa(c,a.parentNode)}function media(a,b){re=/\//g;return"~DidacDoc/"+b+"_"+a.replace(re,"[[")+".htm"}function paass(a,b,c,d){var e=window.prompt("Mot de passe :","");if(e==mot_passe)window.open(a,b)}function encode(a){a=a.replace(/\r\n/g,"\n");var b="";for(var c=0;c<a.length;c++){var d=a.charCodeAt(c);if(d<128)b+=String.fromCharCode(d);else if(d>127&&d<2048){b+=String.fromCharCode(d>>6|192);b+=String.fromCharCode(d&63|128)}else{b+=String.fromCharCode(d>>12|224);b+=String.fromCharCode(d>>6&63|128);b+=String.fromCharCode(d&63|128)}}return b}function arbor(a){var b="z";var c="";while(a>0){var e=arbu.charAt(a-1);if(e<b){re=/~~/g;che=d[a].replace(re,"");c=urlcode(che)+"/"+c;if(e=="a")return c;b=e}a--}return c}function findarbo(a,b,c){fic=a[2];for(fe in fic){li=fic[fe];ff=li[0];ext=li[1];if(ext!="")for(ex=0;ex<ext.length;ex++)if(c==f[ff]+"."+e[ext[ex]])return b}a=a[3];for(de in a){ret=findarbo(a[de],a[de][0],c);if(ret!=-1)return ret}return-1}function lance(a){var b="";menu=[];if(document.cookie)b=document.cookie.slice(5);for(k=0;k<b.length;k++)menu[k]=b.charAt(k);menu[0]="m";kk=0;CreeMenu(a,Deb,0,-1,"block")}function CreeMenu(a,b,c,e,f){e++;var g=a[2];var i=a[3];if(i==""&&g=="")return;var j=CreEl(b,"ul");if(e==0)newatt(j,"id","nav");newatt(j,"a",c);if(menut=="V")j.style.display=f;var k=g.length;for(fe in g){var l=g[fe];uf=CreEl(j,"li");creeliens(uf,c,l[0],l[1],1)}if(e>=niveau_menu)return;var m=i.length;for(de in i){var n=i[de];var o=n[0];ub=CreEl(j,"li");newatt(ub,"class","dir");var p=conv(d[o]);if(d[o].indexOf("~~")==0){ub=CreEl(ub,"div");ub.appendChild(document.createTextNode(" "+p.slice(2)));ub.innerHTML=ub.innerHTML;ub.onclick=function(){h(this)};newatt(ub,"a",String(o));continue}kk++;let=menu[kk];if("mp".indexOf(let)==-1){let="p";menu[kk]=let}creeliens(ub,o,o,n[1],0);CreeMenu(n,ub,o,e,let=="p"?"none":"block")}}function creeliens(b,c,g,h,i){var j=conv(i?f[g]:d[c]);if(h==""){obja=CreEl(b,"div");obja.onclick=function(){t(this)};obja.appendChild(document.createTextNode(j));obja.innerHTML=obja.innerHTML}else{for(ex=0;ex<h.length;ex++){var k=h[ex];var l=e[k];var m=codecase(l);var n=iconName(m,l,j,titrepasse);var o=ex==h.length-1;obja=CreEl(b,"div");newatt(obja,"a",String(c)+" "+String(g)+" "+String(k)+" "+String(m)+" "+String(i));obja.onclick=i==0&&c!=0?function(){y(this)}:function(){a(this)};var p=CreEl(obja,"img");alert(n);p.src="~DidacDoc/icons/Ico_"+n+".png";p.width=16;p.height=16;newatt(p,"onerror","i(this)");p.onclick=o&&i==0&&c!=0?function(){y(this)}:function(){a(this)};obja.appendChild(document.createTextNode(o?" "+j:""));obja.innerHTML=obja.innerHTML}}return}function CreEl(a,b){return a.appendChild(document.createElement(b))}function i(a){a.src="~DidacDoc/images/vert.png"}function iconName(a,b,c,d){var e="";var g="0";if(a==1)g="1";if(c.indexOf(d)!=-1||a==2||a==6)g="6";switch(b){case"@":e="html";break;case"*":e="html";break;case"*l":e="html";break;case"!":case"=":var h=f[ff].split(b+b);if(h.length==2){var i=h[1].indexOf(".");if(i>0)e=h[1].slice(i+1);else e=""}else e="html";break;default:e=b}return e.toLowerCase()+g}function codecase(a){if(a.length<3)return 0;var b=0;if(isU(a.charAt(0)))b+=4;if(isU(a.charAt(1)))b+=2;if(isU(a.charAt(2)))b+=1;return b}function isU(a){if("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(a)==-1)return false;return true}function newatt(a,b,c){att=document.createAttribute(b);att.nodeValue=c;a.setAttributeNode(att)}function urlcode(a){re=/;/g;a=a.replace(re,":");re=/\[/g;a=a.replace(re,"/");return a}function conv(a){pos=a.indexOf("..");pref="";if(pos<4&&pos>0){pref=a.substr(0,pos);a=(prefix==1?pref+" ":"")+a.slice(pos+2)}re=/\^/g;a=a.replace(re,"?");ca=a.charAt(0);pos=a.indexOf("!!");if(pos==-1){pos=a.indexOf("@@");if(pos==-1)pos=a.indexOf("==");if(pos==-1)pos=a.indexOf("##")}if(pos!=-1)a=a.substr(0,pos);return a}Xw=0;Yw=0;ahre="";mp3Pause=false;niv=0;String.prototype.ltrim=function(){return this.replace(/^\s*/g,"")};document.onselectstart=function(){return false};Body=document.getElementById("body");Header=document.getElementById("header");Logo=document.getElementById("logo");Footer=document.getElementById("footer");Logof=document.getElementById("logof");Ti=document.getElementById("ti");Audiop=document.getElementById("audiop");Deb=document.getElementById("deb");Nav=document.getElementById("nav");Ifrd=document.getElementById("ifrd");titr=document.getElementById("d0");D1=document.getElementById("d1");D2=document.getElementById("d2");D3=document.getElementById("d3");D4=document.getElementById("d4");D5=document.getElementById("d5");D6=document.getElementById("d6");D7=document.getElementById("d7");D8=document.getElementById("d8");titr.style.cursor="pointer";pref="";oobj=null;raf_menu=-1;hautt=false;MARGE=0