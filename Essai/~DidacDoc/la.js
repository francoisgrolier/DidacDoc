/// Hauteur, Largeur fenetre
Xw=0;
Yw=0;

ahre='';
mp3Pause=false;
niv=0;
String.prototype.ltrim = function() {return this.replace(/^\s*/g, "")}
document.onselectstart=function() {return false;}

Header=document.getElementById('header');
Logo=document.getElementById('logo');
Footer=document.getElementById('footer');
Logof=document.getElementById('logof');
Ti=document.getElementById('ti');
Audiop=document.getElementById('audiop');

Deb=document.getElementById('deb');
Nav=document.getElementById('nav');

Ifrd=document.getElementById('ifrd');

titr=document.getElementById("d0");
D1=document.getElementById("d1");
D2=document.getElementById("d2");
D3=document.getElementById("d3");
D4=document.getElementById("d4");
D5=document.getElementById("d5");
D6=document.getElementById("d6");
D7=document.getElementById("d7");
D8=document.getElementById("d8");
titr.style.cursor='pointer';


pref="";
function conv(titre)
{
pos=titre.indexOf('..');
pref="";
if ((pos<4)&&(pos>0))
    {
    pref=titre.substr(0,pos);
    titre=((prefix==1)?pref+' ':'')+titre.slice(pos+2);
    }
re=/\^/g;titre=titre.replace(re,'?');
ca=titre.charAt(0);
pos=titre.indexOf('!!');
if (pos==-1)
    {
    pos=titre.indexOf('@@');
    if (pos==-1) pos=titre.indexOf('==');
    if (pos==-1) pos=titre.indexOf('##');
    }
if (pos!=-1) titre=titre.substr(0,pos);
return titre;
}

function urlcode(titre)
{
re=/;/g;titre=titre.replace(re,':');
re=/\[/g;titre=titre.replace(re,'/');
//titre=escape(titre);   // probleme avec les espaces
return titre;
}

function newatt(obj,type,val)  // attribut 'a=' pour memoriser n° dossier, fichier, ext
{
att=document.createAttribute(type);
att.nodeValue =val;
obj.setAttributeNode(att);
}

function isU(val) ///// MAJUSCULE ?
{
if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(val) == -1) return false;
return true;
}

function codecase(exte)
{
if (exte.length< 3 ) return 0;
var aa=0;
if (isU(exte.charAt(0))) aa+=4;  //  xxx=0 xxX=1 (lecture seule) xXx=2 (mot de passe et -)
if (isU(exte.charAt(1))) aa+=2;  //  xXX=3 Xxx=4 (Htm) XxX=5
if (isU(exte.charAt(2))) aa+=1;  //  XXx=6 (mot de passe) XXX=7
return aa;
}


//////////////////////// CREATION DU MENU
////    preparation du lien associé au fichier
function iconName(code,exten,titre,titrepasse)
{
var type='';
var coda='0';
if (code==1) coda='1';  // lecture seule
if ((titre.indexOf(titrepasse)!=-1) || (code==2||code==6)) coda='6';  // mot de passe
switch(exten)
    {
    case '@' : type='html';break;           // A creer une icone speciale pour les liens http
    case '*' : type='html';break;
    case '*l': type='html';break;
    case '#': type='html';break;
    case '!' :
    case '=' :
        var spli=f[ff].split(exten+exten);
        if (spli.length==2)
            {
            var pos=spli[1].indexOf('.');
            if (pos>0) type=spli[1].slice(pos+1); // l'extension
            else type=''; // icone ?
            }
        else type='html';
        break;
    default : type=exten;
    }
return type.toLowerCase()+coda
}

// affichage des icones ou en cas d'echec d'une icone de remplacement
/*function i(o){
var src=o.src;
src=src.substring(src.lastIndexOf("/")+1);
o.src="~DidacDoc/icons/Ico_"+src+".png";
if (o.src.slice(-8)==".png.png") o.src='~DidacDoc/images/vert.png'; 
}*/

// affichage des icones ou en cas d'echec d'une icone de remplacement
function i(o){
 o.src='~DidacDoc/images/vert.png'; 
}

function CreEl(obj,el){return obj.appendChild(document.createElement(el));}

// obj
// nd n° de dossier
// ff n° de fichier
// ext liste des extensions
// ty==0 : titre de dossier
function creeliens(obj,nd,ff,ext,ty)
{
var titre=conv(ty?f[ff]:d[nd]);  //// nom du dossier ou du fichier
if (ext=="")    // titre de dossier sans fichier associé
    {
    //obja=obj;
    obja=CreEl(obj,"div");
    obja.onclick=function(){t(this);};
    var im=CreEl(obja,"img");                                            // icone du lien
    //im.src=icName;
    im.src="~DidacDoc/icons/0.png";
    im.width=1;
    im.height=16;
    obja.appendChild(document.createTextNode(" "+titre));// nom de fichier ou de dossier
    obja.innerHTML=obja.innerHTML;// nom de fichier ou de dossier
    }
else
    {
    for(ex=0;ex<ext.length;ex++)  // parcours la liste des n° d'extensions
        {
        var extt=ext[ex];       //n° de l'extension du fichier
        var exten=e[extt];      // nom de l'extension du fichier
        var code=codecase(exten);
        var icName=iconName(code,exten,titre,titrepasse);

        var fin=(ex==ext.length-1);
        
        obja=CreEl(obj,'div');
        newatt(obja,'a',String(nd)+' '+String(ff)+' '+String(extt)+' '+String(code)+' '+String(ty));
        obja.onclick =((ty==0)&&(nd!=0)) ? function(){y(this)} : function(){a(this)} ; //if (true)

        var im=CreEl(obja,"img");                                            // icone du lien
        //im.src=icName;
        im.src="~DidacDoc/icons/Ico_"+icName+".png";
        im.width=16;
        im.height=16;
        newatt(im,'onerror',"i(this)");
        im.onclick =((fin)&&(ty==0)&&(nd!=0)) ? function(){y(this)} : function(){a(this)} ; //if (true)

        obja.appendChild(document.createTextNode((fin) ? " "+titre : ""));// nom de fichier ou de dossier
        obja.innerHTML=obja.innerHTML;// nom de fichier ou de dossier
        }

    }
return;
}

function CreeMenu(docc,obj,nd,a,visib)
{
a++;
var fic=docc[2];
var doc=docc[3];
//alert(docc);
if (doc=='' && fic=='') return;
///////////////////////////////////////////////
var ul=CreEl(obj,"ul");                 // UL
if (a==0) newatt(ul,'id','nav');                      // a -> n° de dossier (pour l'enregistrement des cookies
newatt(ul,'a',nd);                      // a -> n° de dossier (pour l'enregistrement des cookies
if (menut=="V") ul.style.display=visib; //pour le menu lateral
///////////////////////////////////////////////
var lenfic=fic.length;
for (fe in fic) // fichiers (liens)
    {
    var fi=fic[fe];
    ///////////////////////////////////////////
    uf=CreEl(ul,"li");                  // LI
    ///////////////////////////////////////////
    creeliens(uf,nd,fi[0],fi[1],1);
    }
if(a>=niveau_menu) return;

var lendoc=doc.length;
for (de in doc)  // dossiers
    {
    var doo=doc[de];
    var dd=doo[0];       // n° de dossier
    ///////////////////////////////////////////////
    ub=CreEl(ul,"li");
    newatt(ub,'class','dir');

    // rupture dans l'arborescence
    var dos=conv(d[dd]);
    if (d[dd].indexOf('~~')==0)
        {
        ub=CreEl(ub,'div');
        ub.appendChild(document.createTextNode(" "+dos.slice(2)));// supprime ~~
        ub.innerHTML=ub.innerHTML;// supprime ~~
        ub.onclick=function(){h(this)};
        newatt(ub,'a',String(dd));
        continue;
        }

    // récuperation du menu
    kk++;let=menu[kk];
    if ('mp'.indexOf(let)==-1) {let='p';menu[kk]=let;}

    // suite traitement de l'arborescence
    creeliens(ub,dd,dd,doo[1],0);   //fichiers associes aux titres
    CreeMenu(doo,ub,dd,a,((let=='p')?'none':'block'));   // modif en 07/2011 pour menu déroulant
    }
}

function lance(docu) // main
{
/// lecture de configuration du menu arborescent dans le cookie
var men='';
menu=[];
if(document.cookie) men=document.cookie.slice(5);
//alert(men);
for(k=0;k<men.length;k++) menu[k]=men.charAt(k);
menu[0]='m';
kk=0;

CreeMenu(docu,Deb,0,-1,'block');
}

function findarbo(doc,nd,fich) // cherche un fichier dans l'arborescence
{
fic=doc[2];
for (fe in fic) // fichiers
    {
    li=fic[fe];
    ff=li[0];       // n° de fichier
    ext=li[1];
    if (ext!="") for (ex=0;ex<ext.length;ex++) if(fich==f[ff]+'.'+e[ext[ex]]) return nd;
    }
doc=doc[3];
for (de in doc)
    {
    ret=findarbo(doc[de],doc[de][0],fich); // dossier
    if (ret!=-1) return ret;
    }
return -1;
}

//   RECONSTITUE le chemin d'un fichier dans L'ARBORESCENCE
function arbor(i)
{
var acar='z';
var chemin="";
while(i>0)
    {
    var car=arbu.charAt(i-1);
    if (car<acar)
        {
        re=/~~/g;che=d[i].replace(re,''); // supprime les ~~ des dossiers de rupture de l'arborescence
        chemin=urlcode(che)+"/"+chemin;
        //if (car=='a')return "../"+chemin;
        if (car=='a')return chemin;
        acar=car;
        }
    i--;
    }
//return "../"+chemin;
return chemin;
}


///////////////////////////////////////////////  ENCODE UFT8
function encode(string) 
    {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
 
    for (var n = 0; n < string.length; n++) 
        {
        var c = string.charCodeAt(n);
        if (c < 128)  utftext += String.fromCharCode(c);
        else if((c > 127) && (c < 2048)) 
            {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
			}
        else 
            {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	}

///////////////////////////////////////////////   FONCTIONS DE LIENS
function paass(nom,page,text,mode) // mot de passe
{
//text=text.toLowerCase();
//var da=new Date();
//var min=da.getMinutes();
//var diz=parseInt(min/10);
//var unit=min%10;
//var ind1=diz%2;
//var ind2=unit%2;
//tex1=text.charAt(ind1);
//tex2=text.charAt(ind2+2);
//un=String.fromCharCode('a'.charCodeAt(0)+unit)
//di=String.fromCharCode('a'.charCodeAt(0)+diz)
var rip =window.prompt('Mot de passe :','');//+tex2+un+tex1+di
if (rip==mot_passe) window.open(nom,page);
}

/// fonction pour lire les fichiers htm dans ~DidacDoc pour les images,flv,swf,dia

function media(hre,ext) {re=/\//g;return '~DidacDoc/'+ext+'_'+hre.replace(re,'[[')+'.htm';}

//   ACTIVATION DES LIENS SUR LES DOCUMENTS)
// recupere les 5 parametres de l'attribut 'a' :
// ah[0] -> n° dossier
// ah[1] ->  n° fichier
// ah[2] ->  n° extension
// ah[3] ->  type de fichier (normal=0,lecture seule=1,correction=2)
// ah[4] ->  associé à un dossier 0 sinon 1
oobj=null;

function a(obj)
{
if (SelBckGrd!="")
    {
    if (oobj) oobj.style.backgroundColor="";  //surbrillance du lien sélectionné
    obj.style.backgroundColor=SelBckGrd;
    }
oobj=obj;

var ui=obj.getAttribute('a');
var ah=ui.split(' ');
aa(ah,obj.parentNode);
}

function affarbo(arb)
{
////// affichage de l'arborescence du fichier ouvert
var doo=arb.split('/');
D2.innerHTML="";
D3.innerHTML="";
D4.innerHTML="";
D5.innerHTML="";
D6.innerHTML="";
D7.innerHTML="";
D8.innerHTML="";
for(var i=0;i<doo.length;i++)
    document.getElementById('d'+String(i+2)).innerHTML='&nbsp;'+doo[i];
}

function aa(ah,obj)
{
var nfic=ah[1];
var ext=e[ah[2]];
var tup= parseInt(ah[3]);
var typ=ah[4];
var tit=f[nfic]; // nom de fichier
spli=tit.split(ext+ext);
if (spli.length>1) spli2=spli[1].ltrim();

arb=arbor(ah[0]);
affarbo(arb); ////// affichage de l'arborescence


if (typ!=0) D1.innerHTML=conv(tit);

hre=arb+((typ!=0)?tit:d[nfic]); //
//alert(hre+ext);
var fmode='p';
if (images.indexOf(ext.toLowerCase())!=-1) hre=media(hre,ext);
else
    {
    switch(ext)
        {
        case '*l': hre=hre+'/index.html';break;         // dossier-lien sur index.html du dossier
        case '*' : hre=hre+'/index.htm';break;
        //case '@' : hre="http://"+urlcode(spli2);break;  // prefixe @ pour les url
        case '@' : hre=urlcode(spli2);break;  // prefixe @ pour les url
        case '#' : hre=urlcode(spli2);fmode='_blank';break;  // prefixe @ pour les url
        case '!' :                                      // dossier-lien sur un fichier du doosier
            if (spli2.charAt(0)=='~') hre='file:///c:/'+urlcode(spli2.slice(1));else hre=arb+tit+'/'+urlcode(spli2);break;
        //case '=' : var ndn=findarbo(docu,0,spli2); if(ndn>=0) hre=arbor(ndn)+urlcode(spli2);break;  // dossier lien sur fichier dans l'arbo
        case '=' : hre=urlcode(spli2);break;  // dossier lien sur fichier dans l'arbo
        case 'dia' :
        case 'flv' :
        case 'swf' : hre=media(hre,ext);break;
        default  : hre=hre+((tup==2)?'-.':'.')+ext;
        }
    }
//document.write(hre);
//alert(hre);
//hre='../'+hre
if (ext.toLowerCase()=='mp3')
    {
    if (ahre==hre)
        {
        if (mp3Pause)
            {
            Audiop.style.left=obj.offsetLeft+30;
            niftyplayer('niftyPlayer1').play(encode(hre));
            mp3Pause=false;
            }
        else
            {
            niftyplayer('niftyPlayer1').pause();
            Audiop.style.left="-2000px";
            mp3Pause=true;
            }
        }
    else
        {
        Audiop.style.left=obj.offsetLeft+30;
        niftyplayer('niftyPlayer1').loadAndPlay(encode(hre));
        mp3Pause=false;
        ahre=hre;
        }
    }
else
    {
    tit=conv(tit);
    if (tup==6 || tup==2  || tit.indexOf(titrepasse)!=-1 ) paass(hre,'p',tit,1);
    else 
        {
        window.open(hre,fmode);
        //stat2(hre);             // pour les url 'x-frame-options') qui ne sont pas iframable (google)
        }
    }
}

function stat(url){
var xhr_object = null; 
if(window.XMLHttpRequest) xhr_object = new XMLHttpRequest(); // Firefox 
else if(window.ActiveXObject) xhr_object = new ActiveXObject("Microsoft.XMLHTTP"); // Internet Explorer 
else {  
    alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); // XMLHttpRequest non supporté par le navigateur
    return; 
    } 

xhr_object.open("GET", url, false); 
xhr_object.onreadystatechange = function() 
{if(this.readyState == 4) Ifrd.innerHTML=xhr_object.responseText;
} 
xhr_object.send(null);
}

function stat2(url){
var oXHR = new XMLHttpRequest();
oXHR.open("GET", url, true);
oXHR.onreadystatechange = function (oEvent) {
    if (oXHR.readyState === 4) {

        var headers = oXHR.getResponseHeader('X-Frame-Options');//.toLowerCase();
        alert(oXHR);
        
        alert(headers);
        //alert('tuyty');
        if (headers.indexOf('x-frame-options')!=-1) 
            window.open(url,'_blank');//,"height=200,width=400,status=yes,toolbar=no,menubar=no,location=no");
            else window.open(url,'p');
    }
}
oXHR.send(null);
}

function h(obj){window.open(arbor(obj.getAttribute('a'))+'~'+file+'.html','_top');}     // rupture dans l'arborescence
function y(obj){t(obj);a(obj);}                                                         // fichier associé à titre de dossier
function o(obj,visib){obj=obj.firstChild;while (obj.tagName!='UL') obj=obj.nextSibling;if (menut=="V") obj.style.display=visib;} // fichier associé à titre de dossier

//   COOKIE  MENUS AFFICHAGEsfhoversfhover
function t(obj){
while (obj.tagName!='LI') obj=obj.parentNode; // LI
obj=obj.firstChild;  // img + ou -
while (obj.tagName!='UL') {obj=obj.nextSibling;if (obj==null) return;} // UL
// MENU
var ui=obj.getAttribute('a');
//alert(ui);

affarbo(arbor(ui)); ////// affichage de l'arborescence
D1.innerHTML="";

var v=(obj.style.display=='none')?'m':'p';
menu[ui]=v;
obj.style.display=((v=='m')?'block':'none');
rafr();

//// ecriture des dossiers ouverts de l'arborescence du menu dans le cookie

var men='';
for(var i=0;i<=kk;i++) men+=menu[i];
//alert(men);
date=new Date;
date.setMonth(date.getMonth()+6);
document.cookie="menu="+escape(men)+"; expires="+date.toGMTString();
//alert(document.cookie);
}

///////////////////////////////////////////////////////////////////////////////
///// appel dynamique d'un fichier .js
function include_js (url) {
/// supprime le dernier fichier .js chargé -> pas sur que ca marche
node=document.getElementById(url);
//    alert(node.src);
if (node) {
    var parent = node.parentNode;
    parent.removeChild(node);
    }
    //alert(node);

var s = document.createElement('script');
var h = document.getElementsByTagName('head')[0];
s.setAttribute('type', 'text/javascript');
s.setAttribute('id', url);
s.setAttribute('src', '~DidacDoc/'+url + '.js?time=' + ((new Date()).getTime()));
h.appendChild(s);/**/
}

function include_css (url) {
/// supprime le dernier fichier .css chargé -> pas sur que ca marche
node=document.getElementById(url+'_css');
if (node) {
    var parent = node.parentNode;
    parent.removeChild(node);
    }
var s = document.createElement('link');
var h = document.getElementsByTagName('head')[0];
s.setAttribute('rel', 'stylesheet');
s.setAttribute('type', 'text/css');
s.setAttribute('id', url+'_css');
s.setAttribute('href', '~DidacDoc/'+url+'.css?time=' + ((new Date()).getTime()));//
h.appendChild(s);
}

///// recharge les variables du fichier 2.js et du nouveau menu
function callback(vdocu,vniv,varbu,vd,vf,ve,vrepsys,vchemrel,vfile) {
    //alert(menu.nodeName);
    v=[];n=[];mp=[];d=[];d[0]='';f=[];e=[];menu=[];k=0;x=0;x=0;mp3=0;
    docu=vdocu;
    niv=vniv;
    arbu=varbu;
    d=vd;
    f=vf;
    e=ve;
    repsys=vrepsys;
    chemrel=vchemrel;
    file=vfile;
    chemrel='';                //chemin relatif
    repsys=repsys.slice(3);
    var monNoeud= Deb;
    while(monNoeud.firstChild){monNoeud.removeChild(monNoeud.firstChild);}; // efface le menu precedent
    if (docu[1]!='') aa([0,0,docu[1][0],0,0]);  // affiche le 1er document associe au titre
    titr.innerHTML=conv(d[0]);         // Titre
    //var im=CreEl(Logo,"img");                                            // icone du lien
    //im.src='~DidacDoc/images/Didac Doc2.png';
    lance(docu);
}

////////////////   MISE A JOUR AUTOMATIQUE DU MENU  ////////////////////////////////////////
////////////////  recharge regulierement le fichier xxx3.js
///////////////   s'il  a change (la valeur a de z(a)) on recharge le nouveau menu (xxx2.js)
function rinit()
{
setTimeout("rinit2()",parseInt(rafraich)*1000);
}

function rinit2()
{
include_js(file+'3');
setTimeout("rinit2()",parseInt(rafraich)*1000);
}

raf_menu=-1;
//// rafraichi le fichier Html si modif du X3.js
function z(a)
{
//alert(a);
if (raf_menu==-1) raf_menu=a;
else 
    {
    if (raf_menu!=a)
        {
        include_css(file);
        include_js(file);
        include_js(file+'2');
        //include_css(file+'_MenuType');
        //include_css(file+'_MenuCoul');
        raf_menu=a;
        }
    }
}

Yh=0;
////////////   Body onload
function init_page()
{
Audiop.style.left="-2000px";
hautt=false;
Yh=ObjHeight(Deb,0);
rafr();
window.onresize =rafr;

/// 'PLEIN ECRAN' SI SOURIS BORD GAUCHE
/// 'PLEIN ECRAN' SI SOURIS BORD HAUT

document.onmousemove=(function(event){
    bord=9;
    event = event?event:window.event;
    var xx =parseInt(event.clientX);
    var yy =parseInt(event.clientY);
    if (hautt)
        {
        if ((yy<bord) && (xx>0) && (xx>Xw-bord))// 
            {
            hautt=false;
            rafr();
            }
        }
    else
        {
        if ((xx<bord) && (xx>0) && (yy>Yw-bord))
            {
            hautt=true;
            rafr();
            }
        }
   });

}

///////////////////// fonctions de cadres
function ObjWidth(obj)
{
return obj.scrollWidth;
//var X=obj.clientWidth;
//return (X)?(X):obj.offsetWidth;
}

function ObjHeight(obj,Ys)
{
var Y=obj.scrollHeight;
//var Y=obj.offsetHeight;
//Y=(Y)?(Y):obj.clientHeight;
return (Y>Ys)?Y:Ys;
}

hautt=false;
Yw=0;Xw=0;
MARGE=0;
function rafr()  // recalcul des cadres si cadre C en plein ecran
{
//alert("rafr");
///// CALCUL HAUTEUR DE LA FENETRE
Yw = window.innerHeight;
Yw=(Yw)?(Yw):document.body.clientHeight;
//alert(Yw);
///// CALCUL LARGEUR DE LA FENETRE
Xw = window.innerWidth;
Xw=(Xw)?(Xw):document.body.clientWidth;
//alert(Yw);
if (hautt)
    {
    ///// CADRE PRINCIPAL HAUTEUR PLEINE FENETRE
    Ifrd.style.left="0px";
    Ifrd.style.top="1px";
    Ifrd.style.height=Yw+"px";
    Ifrd.style.width=Xw+"px";

    ////// EFFACE LE MENU
    Deb.style.display='none';
    Header.style.display='none';
    Footer.style.display='none';
    //Audiop.style.left='-2000px';
    }
else
    {
    ////// REAFFICHE LE MENU
    Deb.style.display='block';
    Header.style.display='inline';
    Footer.style.display='inline';
    Logo.style.display=(disp_logo)?'block':'none';

    ///// CALCUL HAUTEUR DU HEADER
    var Y1=ObjHeight(Logo,0);
    Y1=ObjHeight(Ti,Y1);
    Header.style.height=Y1+"px";
    //alert(Y1);

    ///// CALCUL HAUTEUR DU FOOTER
    var Hf=ObjHeight(Logof,0);
    Footer.style.height=Hf+"px";
    var Y3=Yw-Hf;    
    

    
    ////////////    POSITION DU HEADER
    Header.style.width=Xw+"px";
    //Header.style.bottom=Y1+"px";

    ////////////    POSITION DU MENU
    Deb.style.top=(Y1+1)+"px";
    
    if (menut=="V")
        {
        Deb.style.height=(Y3-Y1-1)+"px";

        ///// CALCUL LARGEUR DU MENU
        var X1=ObjWidth(Deb);
        Deb.style.width=X1+"px";
        ////////////    POSITION DU CADRE PRINCIPALE
        Ifrd.style.left=X1+"px";
        Ifrd.style.top=(Y1+1)+"px";
        Ifrd.style.width=(Xw-X1+1)+"px";
        Ifrd.style.height=(Y3-Y1-1)+"px";
        }
    else
        {
        ///// CALCUL HAUTEUR DU HEADER
        //alert(Nav);
        var Y2=Y1+Yh;
        //alert(Y2);
        
        Deb.style.height=Yh+"px";
        Deb.style.width=Xw+"px";
        //Deb.style.bottom=Y2+"px";

        ////////////    POSITION DU CADRE PRINCIPALE
        Ifrd.style.left="0px";
        Ifrd.style.top=(Y2+1)+"px";
        Ifrd.style.width=Xw+"px";
        Ifrd.style.height=(Y3-Y2-1)+"px";
        }
    
    ////////////    POSITION DU FOOTER
    Footer.style.top=Y3+"px";
    Footer.style.width=Xw+"px";
    }
}
