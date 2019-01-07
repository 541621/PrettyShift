# canvasChange
一个简单的canvas过场效果集合

使用方法:
  canvasChange(object, {
    changeSpeed:number,//初速度
    acceleration:number,//加速度
    acces:number,//阻力（用于影响改变加速度）
    changemod:number,//变化模式(1-9)
    changeColor1:string,//开始颜色
    changeColor2:string,//想要变化的颜色
    clear:Booleans//是否开启清理模式（清除背景颜色，画布变透明）
  }, callback);


参数说明：
object：需要变化的canvas对象
changeSpeed：动画变化的初始速度（number）
acceleration：改变动画变化速度的加速度（number）
acces：阻力（用于影响改变加速度）（number）
changemod：变化模式(1-9)（number）
  1：时钟转圈渐变
  2：多圆圈渐变消失
  3：正方形上下飞出
  4：正方形左右飞出
  5：多正方形居中消失
  6：斜边消失
  7：右上角圆形消失后覆盖
  8：正方形4个左右飞出
  9：sin函数水面下降
changeColor1：开始颜色（string）
changeColor2：想要变化的颜色（string）
clear：是否开启清理模式（清除背景颜色，画布变透明）（Booleans）
callback：动画完毕的回调函数（function）
