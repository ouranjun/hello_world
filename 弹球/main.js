// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const para = document.querySelector('p');
const div = document.querySelector('div');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;



//为小球建立模型---设定形状类层次结构
class shape{
  constructor(x,y,velX,velY,exists){
  this.x=x;
  this.y=y;
  this.velX=velX;
  this.velY=velY;
  this.exists=exists;
  }
}

//Ball继承shape方法

class Ball extends shape{
  constructor(x,y,velX,velY,color,size,exitsts){
  super(x,y,velX,velY,exitsts);
    this.color=color;
    this.size=size;
  }
  //绘画小球
  draw(){

    ctx.beginPath();  //声明开始画图形
    ctx.fillStyle=this.color; //定义图形颜色
    //arc画圆弧 x.y为中心坐标 size为半径 0-2*Math.PI=360°
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI); 
    ctx.fill(); //声明结束绘画，并以color填充

  }

  //小球坐标变化
  update(){
    if((this.x+this.size)>=width){
      this.velX = -(this.velX)
    }
  
    if((this.x-this.size)<=0){
      this.velX = -(this.velX)
    }
  
    if((this.y+this.size)>=height){
      this.velY = -(this.velY)
    }
  
    if((this.y-this.size)<=0){
      this.velY = -(this.velY)
    }
  
    this.x+=this.velX;
    this.y+=this.velY;
  
  }
  //小球碰撞事件
  collisionDetect(){
    for(var j = 0;j<balls.length;j++){
      if(this!==balls[j]){
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx*dx+dy*dy);
  
        if(distance < this.size + balls[j].size && balls[j].exists){
          balls[j].color = this.color = randomColor();
        
        }
      }
    }
  }
}

//定义恶魔圈继承shape
class EavilCircle extends shape{
  constructor(x,y,exists){
    super(x,y,exists);

    this.velX=20;
    this.velY=20;
    this.color='white';
    this.size=30;
    this.setControls();

  }

  //绘画小球
  draw(){

    ctx.beginPath();  //声明开始画图形
    ctx.strokeStyle=this.color; //定义图形颜色
    ctx.lineWidth=3  ;//描边粗细
    //arc画圆弧 x.y为中心坐标 size为半径 0-2*Math.PI=360°
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI); 
    ctx.stroke(); //声明结束绘画，并以color填充

  }

  //小球坐标变化
  checkBounds(){
    if((this.x+this.size)>=width){
      this.x -= this.size;
    }
  
    if((this.x-this.size)<=0){
      this.x +=this.size;
    }
  
    if((this.y+this.size)>=height){
      this.y -= this.size
    }
  
    if((this.y-this.size)<=0){
      this.y += this.size
  }
}

  //键盘事件
  setControls(){
    window.onkeydown= e =>{
      switch(e.key){
        case 'a' :
        case 'A' :
        case 'ArrowLeft' :
          this.x -=this.velX;
          break; 
        case 'd' :
        case 'D' :
        case 'ArrowRight' :
          this.x +=this.velX;
          break; 
        case 'w' :
        case 'W' :
        case 'ArrowUp' :
          this.y -=this.velY;
          break; 
        case 's' :
        case 'S' :
        case 'ArrowDown' :
          this.y +=this.velY;
          break; 
      }
    };
  }
  //小球碰撞事件
  collisionDetect(){
    for(var j = 0;j<balls.length;j++){
      if(balls[j].exists){
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx*dx+dy*dy);
  
        if(distance < this.size + balls[j].size){
          balls[j].exists = false;
          count--;
          para.textContent='还剩'+count+'个球';
          this.size+=2;
          if(count===0){
            alert('你赢了，游戏结束！')
            let restart = document.createElement('button');
            restart.textContent='重新开始';
            div.appendChild(restart);
          }
        }
      }
    }
  }
}

//存放小球的数组
const balls = [];
const eviBall = new EavilCircle(
  random(0,width),
  random(0,height),
  true
);
let count = 0;

//执行动画
loop();

// 生成随机数的函数
function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}




//让小球动起来

function loop(){
  
  ctx.fillStyle = 'rgba(0,0,0,0.25)'
  ctx.fillRect(0,0,width,height);

  while(balls.length < 25){
    const size = random(10,20)
    var ball = new Ball(
      random(0+size,width-size),
      random(0+size,height-size),
      random(-7,7),
      random(-7,7),
      randomColor(),
      size,
      true
    );
    balls.push(ball);
    count++;
    para.textContent = '还剩'+count+'个球';
  }

  


  for(var i = 0;i<balls.length;i++){
    if(balls[i].exists){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
    }
  }

  eviBall.draw();
  eviBall.checkBounds();
  eviBall.collisionDetect();


  requestAnimationFrame(loop);
}
