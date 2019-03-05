if ('DeviceOrientationEvent' in window) {
  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
} else {
  document.getElementById('logoContainer').innerText = 'Device Orientation API not supported.';
}

function deviceOrientationHandler (eventData) {
  var tiltLR = eventData.gamma;
  var tiltFB = eventData.beta;
  var dir = eventData.alpha;
  
  document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
  document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
  document.getElementById("doDirection").innerHTML = Math.round(dir);

  var logo = document.getElementById("imgLogo");
  //logo.style.webkitTransform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
  //logo.style.MozTransform = "rotate(" + tiltLR + "deg)";
  //logo.style.transform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
  
  var max = 25;
  
  //logo.style.transform = "translate("+(tiltLR)*-1+"px,"+(tiltFB)*-1+"px)";
  
  if((tiltLR < max*-1 || tiltLR > max) && (tiltFB < max*-1 || tiltFB > max)){
    logo.style.transform = "translate("+(max)*-1+"px,"+(max)*-1+"px)";
  }else if((tiltLR < max*-1 || tiltLR > max) && (tiltFB > max*-1 || tiltFB < max)){
    logo.style.transform = "translate("+(max)*-1+"px,"+(tiltFB)*-1+"px)";
  }else if((tiltLR > max*-1 || tiltLR < max) && (tiltFB < max*-1 || tiltFB > max)){
    logo.style.transform = "translate("+(tiltLR)*-1+"px,"+(max)*-1+"px)";
  }else{
    logo.style.transform = "translate("+(tiltLR)*-1+"px,"+(tiltFB)*-1+"px)";
  }
  
    
}
