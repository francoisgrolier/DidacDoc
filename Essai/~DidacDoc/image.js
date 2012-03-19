document.onmousedown=coordinates;
document.onmouseup=mouseup;

function coordinates(e)
{
if (e == null) { e = window.event;}
var sender = (typeof( window.event ) != "undefined" ) ? e.srcElement : e.target;

if (sender.id=="imu")
  {
  mouseover=true;
  pleft=parseInt(DivIma.left);
  ptop=parseInt(DivIma.top);
  xcoor=e.clientX;
  ycoor=e.clientY;
  document.onmousemove=moveImage;
  }
return false;
}

function moveImage(e)
{
if (e == null) { e = window.event;}
DivIma.left=pleft+e.clientX-xcoor+"px";
DivIma.top=ptop+e.clientY-ycoor+"px";
return false;
}

function mouseup(e)
{
document.onmousemove=null;
}

function windowage()
{
document.getElementById("body").style.backgroundColor=fond;

Imag=document.getElementById("imu");
//alert(Imag.width);
//alert(Imag.height);
imW=Imag.width;
imH=Imag.height;
raIm=imW/imH;

DivIma=document.getElementById("im").style;
cliW=document.documentElement.clientWidth;
cliH=document.documentElement.clientHeight;
raCli=cliW/cliH;

if (raCli<raIm) {Imag.width=cliW;Imag.height=Imag.width/raIm;}
else {Imag.height=cliH-8;Imag.width=Imag.height*raIm;}
imgPosition();
zoom=Imag.width;
}

function realpixel() {zoom=imW;zoomImag();}
function minus() {zoom=zoom-50;zoomImag();}
function plus()  {zoom=zoom+50;zoomImag();}

function zoomImag()
{
Imag.width=zoom;
Imag.height=Imag.width/raIm;
//imgPosition();
}

function imgPosition(){
DivIma.left=(cliW-Imag.width)/2+"px";
DivIma.top=(cliH-Imag.height)/2+"px";
}
