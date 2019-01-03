!(function() {


// changeSpeed//初速度
// acceleration//加速度
// acces//阻力（用于影响改变加速度）
// changemod//变化模式(1-9)
// changeColor1//开始颜色
// changeColor2//想要变化的颜色
// callback//回调函数
// clear//是否开启清理模式（清除背景颜色，画布变透明）

//画布切换画面控制函数
function canvasChange(obj,option, callback) {

  console.log(option)
  // changeSpeed, acceleration, acces, changemod, changeColor1, changeColor2, callback, clear
  var ctx = obj.getContext("2d");
  var width = window.innerWidth;
  var height = window.innerHeight;
  var hw = height/width;
  var maxArc = Math.ceil(Math.sqrt(width*width/4 + height*height/4));
  var $deg = 0;
  var speed = option.changeSpeed? option.changeSpeed : 5;
  var acce = option.acceleration? option.acceleration : 0;
  var acces = option.acces? option.acces : 0;
  var mod = option.changemod ? option.changemod : 1;
  var color1 = option.changeColor1 ? option.changeColor1 : "#000000";
  var color2 = option.changeColor2 ? option.changeColor2 : "#ffffff";
  var fn = callback ? callback : function () {};
  var r=0;
  var l=0;
  var arcs;
  var bolang = 1;
  var fudu = 40;
  var wave = 0;
  var arrSin;
  var clear = option.clear;
  var xiedu = 0;//倒水的斜度

  if(typeof clear == 'boolean'){
    var isClear = clear;
  } else {
    var isClear = false;
  }
  obj.width = width;
  obj.height = height;
  // images.width = width;
  // images.height = height;

//    color(color1);
//
//    ctx.fillRect(0,0,width,height);
//       console.log(img);
//       console.log(ctx);
//    setTimeout(function () {
//      ctx.drawImage(img,0,0,width,height);
//    },5);

  // console.log(1);

  if ( mod == 1 ) {
    color(color1);
    startArc();
  } else if (mod == 2) {
    color(color1);
    arcs = randomTL(5);
    startArcs();
  } else if (mod == 3) {
    color(color1);
    startR();
  } else if (mod == 4) {
    color(color1);
    startR2();
  } else if (mod == 5) {
    color(color1);
    startRS();
  } else if (mod == 6) {
    color(color1);
    startXR();
  } else if (mod == 7) {
    color(color1);
    startATR();
  } else if (mod == 8) {
    color(color1);
    startR4();
  } else if (mod == 9) {
    color(color1);
    startSin();
  } else  {
    alert('changemod的值请控制在1-9')
  }







  //时钟转圈渐变
  function startArc() {
    clearArc($deg, color2);
    if ( speed + acce <= 3 ) {
      speed = 3;
    } else {
      speed =  speed + acce;
    }
    $deg = $deg + speed;
    if( $deg <= 360 + speed) {
      setTimeout(function () {
        startArc();
      },15);
      // window.cancelAnimationFrame(startArc);
      // window.requestAnimationFrame(startArc);
    } else {
      fn();
    }
  }
  function clearArc(deg, arcColor) {
    ctx.restore();
    ctx.clearRect(0, 0 , width, height);
    ctx.beginPath();
    ctx.save();
    ctx.fillRect(0,0,width,height);
    ctx.moveTo(width/2,height/2);
    ctx.lineTo(width/2,maxArc);
    ctx.arc(width/2, height/2, maxArc, Math.PI*(-0.5), Math.PI*(deg/360 *2-0.5), false);
    ctx.lineTo(width/2,height/2);
    ctx.clip();

    if (isClear) {
      ctx.clearRect(0,0,width,height);
    } else {
      ctx.fillStyle = arcColor;
      ctx.fillRect(0,0,width,height);
    }
    ctx.closePath();
  }

  //多圆圈渐变消失
  function startArcs() {
    a(arcs, color2);
    if ( speed + acce <= 4 ) {
      speed = 4;
    } else {
      speed =  speed + acce;
    }
    r = r + speed;
    if( r <= height || r <= width) {
      setTimeout(function () {
        startArcs();
      },15);
      // window.cancelAnimationFrame(startArcs);
      // window.requestAnimationFrame(startArcs);
    } else {
      fn();
    }
  }
  function a(arcs, arcColor) {
    ctx.restore();
    ctx.clearRect(0, 0 , width, height);
    ctx.beginPath();
    ctx.save();
    ctx.fillRect(0,0,width,height);

    for ( var i = 0; i < arcs.length; i++) {
      clearArcs(arcs[i].left, arcs[i].top, r);
    }
    ctx.clip();
    if (isClear) {
      ctx.clearRect(0,0,width,height);
    } else {
      ctx.fillStyle = arcColor;
      ctx.fillRect(0,0,width,height);
    }
    ctx.closePath();
  }
  function clearArcs(arcsLeft, arcsTop, r) {
    ctx.moveTo(arcsLeft,arcsTop);
    ctx.arc(arcsLeft, arcsTop, r, 0, 2*Math.PI, false);
  }

  //正方形上下飞出
  function startR() {
    clearR(l, color2);
    if ( speed + acce <= 5 ) {
      speed = 5;
    } else {
      speed =  speed + acce;
    }
    l = l+  speed;
    if( l <= (height + speed)) {
      setTimeout(function () {
        startR();
      },15);
      // window.cancelAnimationFrame(startR);
      // window.requestAnimationFrame(startR);
    } else {
      fn();
    }
  }
  function clearR(long, arcColor) {
    ctx.restore();
    ctx.clearRect(0, 0 , width, height);
    ctx.beginPath();
    ctx.save();
    ctx.fillRect(0,0,width,height);
    if (isClear) {
      ctx.clearRect(0        , height - long           , Math.ceil(width/4), long);
      ctx.clearRect(Math.floor(width/4)  , 0            , Math.ceil(width/4), long);
      ctx.clearRect(Math.floor(width/2)  , height - long, Math.ceil(width/4), long);
      ctx.clearRect(Math.floor(width*3/4), 0            , Math.ceil(width/4), long);
    } else {
      ctx.fillStyle = arcColor;
      ctx.fillRect(0        , height - long           , Math.ceil(width/4), long);
      ctx.fillRect(Math.floor(width/4)  , 0            , Math.ceil(width/4), long);
      ctx.fillRect(Math.floor(width/2)  , height - long, Math.ceil(width/4), long);
      ctx.fillRect(Math.floor(width*3/4), 0            , Math.ceil(width/4), long);
    }
    ctx.closePath();
  }

  //正方形左右飞出
  function startR2() {
    clearR2(l, color2);
    if ( speed + acce <= 2 ) {
      speed = 2;
    } else {
      speed =  speed + acce;
    }
    l = l+  speed;
    if( l <= (width/2 + speed)) {
      setTimeout(function () {
        startR2();
      },15);
      // window.cancelAnimationFrame(startR2);
      // window.requestAnimationFrame(startR2);
    } else {
      fn();
    }
  }
//    function clearR2(long, arcColor) {
//      ctx.restore();
//      ctx.clearRect(0, 0 , width, height);
//      ctx.beginPath();
//      ctx.save();
//      ctx.drawImage(images,0,0,width,height);
////      ctx.fillRect(0,0,width,height);
//      if (isClear) {
//        ctx.clearRect(width/2 - long, 0, 2*long, height);
//      } else {
//        ctx.fillStyle = arcColor;
//        ctx.fillRect(width/2 - long , 0, 2*long, height);
//      }
//      ctx.closePath();
//    }
  function clearR2(long, arcColor) {
    ctx.restore();
    ctx.clearRect(0, 0 , width, height);
    ctx.beginPath();
    ctx.save();
    ctx.fillRect(0,0,width,height);
    if (isClear) {
      ctx.clearRect(width/2 - long, 0, 2*long, height);
    } else {
      ctx.fillStyle = arcColor;
      ctx.fillRect(width/2 - long , 0, 2*long, height);
    }
    ctx.closePath();
  }

  //多正方形居中消失
  function startRS() {
    clearRS(l, color2);
    if ( speed + acce <= 1 ) {
      speed = 1;
    } else {
      speed =  speed + acce;
    }
    l = l+  speed;
    if( l < (Math.ceil(width/8) + speed + speed + acce)) {
      setTimeout(function () {
        startRS();
      },15);
      // window.cancelAnimationFrame(startRS);
      // window.requestAnimationFrame(startRS);
    } else {
      ctx.fillRect(0, 0 , width, height);
      fn();
    }
  }
  function clearRS(long, restColor) {
    ctx.restore();
    ctx.clearRect(0, 0 , width, height);
    ctx.beginPath();
    ctx.save();
    ctx.fillRect(0,0,width,height);
    if (isClear) {
      for (var i=0; i < 4; i++) {
        for (var j=0; j< Math.ceil(hw*4); j++ ) {
          ctx.clearRect(i*width/4 + width/8 - long, j*width/4 + width/8 - long, 2*long, 2*long);
        }
      }
    } else {
      ctx.fillStyle = restColor;
      for (var i=0; i < 4; i++) {
        for (var j=0; j< Math.ceil(hw*4); j++ ) {
          ctx.fillRect(i*width/4 + width/8 - long, j*width/4 + width/8 - long, 2*long, 2*long);
        }
      }
    }
    ctx.closePath();
  }

  //斜边消失
  function startXR() {
    clearXR(l, color2);
    if ( speed + acce <= 1 ) {
      speed = 1;
    } else {
      speed =  speed + acce;
      acce = acce + acces;
    }
    l = l+  speed;
    if( l <= (width + speed)) {
      setTimeout(function () {
        startXR();
      },15);
      // window.cancelAnimationFrame(startXR);
      // window.requestAnimationFrame(startXR);
    } else {
      fn();
    }
  }
  function clearXR(long, restColor) {
    ctx.restore();
    ctx.clearRect(0, 0 , width, height);
    ctx.beginPath();
    ctx.save();
    ctx.fillRect(0,0,width,height);

    ctx.moveTo(width - long, 0);
    ctx.lineTo(width ,0);
    ctx.lineTo(width ,height/2 - width/2);
    ctx.lineTo(width - long, long + height/2 -width/2);
    ctx.lineTo(width - long, 0);
    ctx.moveTo(0, height/2 + width/2);
    ctx.lineTo(long ,height/2 + width/2 - long);
    ctx.lineTo(long ,height);
    ctx.lineTo(0, height);
    ctx.lineTo(0, height/2 + width/2);
    ctx.clip();
    if (isClear) {
      ctx.clearRect(0,0,width,height);
    } else {
      ctx.fillStyle = restColor;
      ctx.fillRect(0,0,width,height);
    }
    ctx.closePath();

  }

  //右上角消失覆盖
  function startATR(){
    clearATR(arcs, color2);
    if ( speed + acce <= 4 ) {
      speed = 4;
    } else {
      speed =  speed + acce;
      acce = acce + acces;
    }
    r = r + speed;
    if( r <= Math.ceil(Math.sqrt(width*width + height*height)) + speed) {
      setTimeout(function () {
        startATR();
      },15);
      // window.cancelAnimationFrame(startATR);
      // window.requestAnimationFrame(startATR);
    } else {
      color('yellow');
      speed = -speed;
      setTimeout(function () {
        restartATR();
      }, 500);
    }
  }
  function restartATR(){
    clearATR(arcs, color2);
//      if ( speed + acce <= 4 ) {
//        speed = 4;
//      } else {
    speed =  speed + acce;
    acce = acce - acces;
//      }
    r = r + speed;
    if( r > 0) {
      window.cancelAnimationFrame(restartATR);
      window.requestAnimationFrame(restartATR);
    } else {
      fn();
    }
  }
  function clearATR() {
    ctx.restore();
    ctx.clearRect(0, 0 , width, height);
    ctx.beginPath();
    ctx.save();
    ctx.fillRect(0,0,width,height);
    clearArcs(width, 0, r);
    ctx.clip();
    ctx.clearRect(0,0,width,height);
    ctx.closePath();
  }

  //正方形4个左右飞出
  function startR4() {
    clearR4(l, color2);
    if ( speed + acce <= 1 ) {
      speed = 2;
    } else {
      speed =  speed + acce;
    }
    l = l+  speed;
    if( l < (width*3/4 + speed + acce)) {
      setTimeout(function () {
        startR4();
      },15);
      // window.cancelAnimationFrame(startR4);
      // window.requestAnimationFrame(startR4);
    } else {
      ctx.fillRect(0, 0 , width, height);
      fn();
    }
  }
//    function clearR2(long, arcColor) {
//      ctx.restore();
//      ctx.clearRect(0, 0 , width, height);
//      ctx.beginPath();
//      ctx.save();
//      ctx.drawImage(images,0,0,width,height);
////      ctx.fillRect(0,0,width,height);
//      if (isClear) {
//        ctx.clearRect(width/2 - long, 0, 2*long, height);
//      } else {
//        ctx.fillStyle = arcColor;
//        ctx.fillRect(width/2 - long , 0, 2*long, height);
//      }
//      ctx.closePath();
//    }
  function clearR4(long, arcColor) {
    ctx.restore();
    ctx.clearRect(0, 0 , width, height);
    ctx.beginPath();
    ctx.save();
    ctx.fillRect(0,0,width,height);
    if (isClear) {
      ctx.clearRect(width/4 - long - long*2/3, 0, 2*long, height);
      ctx.clearRect(width/4*3 - long + long*2/3, 0, 2*long, height);
    } else {
      ctx.fillStyle = arcColor;
      ctx.fillRect(width/4 - long , 0, 2*long, height);
      ctx.fillRect(width/4*3 - long , 0, 2*long, height);

    }
    ctx.closePath();
  }

  //sin水面
  function startSin() {
    cleartSin(l, color2);
    if ( speed + acce <= 1 ) {
      speed = 1;
    } else {
      speed =  speed + acce;
    }
    l = l+  speed;
    wave = wave + 0.008;
    if( l <= height + speed + fudu +  Math.abs(xiedu) ) {
      setTimeout(function () {
        startSin();
      },15);
      // window.cancelAnimationFrame(startSin);
      // window.requestAnimationFrame(startSin);
    } else {
      ctx.fillRect(0, 0 , width, height);
      fn();
    }
  }
  function cleartSin(long, sincolor) {
    ctx.restore();
    ctx.clearRect(0, 0 , width, height);
    ctx.beginPath();
    ctx.save();
    ctx.fillRect(0,0,width,height);
    ctx.moveTo(0, long + fudu*Math.sin(2*Math.PI*wave)- xiedu/2) ;
    for (var i= 0; i <= bolang; i=i+0.01) {
      var x = width*i;
      var y = long + fudu*Math.sin(2*Math.PI*i + 2*Math.PI*wave) +  i*xiedu - xiedu/2;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width,long + fudu*Math.sin(2*Math.PI*bolang + 2*Math.PI*wave) + bolang*xiedu - xiedu/2);
    ctx.lineTo(width, -(fudu + 1));
    ctx.lineTo(0, -(fudu + 1));
    ctx.lineTo(0, long + fudu*Math.sin(2*Math.PI*wave)- xiedu/2);
    ctx.clip();
    if (isClear) {
      ctx.clearRect(0,0,width,height);
    } else {
      ctx.fillStyle = sincolor;
      ctx.fillRect(0,0,width,height);
    }
    ctx.closePath();
  }

  //油漆
  function startSin2() {
    clearSin2(l);


    speed =  speed + acce;

    l = l+  speed;
    if( l <= height + speed + fudu + 100 ) {
      setTimeout(function () {
        startSin2();
      },20);
      // window.cancelAnimationFrame(startSin2);
      // window.requestAnimationFrame(startSin2);
    } else {
      ctx.clearRect(0, 0 , width, height);
      fn();
    }
  }
  function clearSin2(long) {
    ctx.restore();
    ctx.clearRect(0, 0 , width, height);
    ctx.beginPath();
    ctx.save();
    ctx.fillRect(0,0,width,height);
    ctx.moveTo(0, long) ;
    console.log(arrSin.length);
    for (var i= 0; i < arrSin.length; i++) {
      var x = width*i/arrSin.length;
      arrSin[i] = arrSin[i] + Math.random()*10;
      var y = long + arrSin[i];
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width,long+ arrSin[arrSin.length-1]);
//      console.log(x);
    ctx.lineTo(width, -(fudu + 100));
    ctx.lineTo(0, -(fudu + 100));

    ctx.lineTo(0, long + fudu*Math.sin(2*Math.PI*wave));
    ctx.clip();
    ctx.clearRect(0,0,width,height);
    ctx.closePath();
  }

  function randomSin(ss) {
    var arr=[];
    for (var i= 0; i <= 10; i=i+0.2) {
      var y = 40*Math.sin(2*Math.PI*i);
      arr.push(y);
    }
    return arr;
  }

  //生成随机坐标
  function randomTL(val) {
    var arr = [];

    for (var i =0; i < val; i++) {
      arr[i] = {
        top: Math.random()*height,
        left: Math.random()*width
      };

    }

    return arr;
  }

  //设置初始颜色
  function color(coler) {
    ctx.restore();
    ctx.fillStyle= coler;
    ctx.save();
  }
}

window.canvasChange = canvasChange;

})();