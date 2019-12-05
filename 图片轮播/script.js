var index=0,
    timer=null,
    bgImg=document.querySelectorAll('.bgImg'),
    outBox=document.querySelector('.outBox'),
    span = document.querySelectorAll('span');

//封装监听器
function addHandler(element,type,handler){
    //非IE
    if(element.addEventListener){
    element.addEventListener(type,handler,true);
    //IE支持DOM2级
    }else if(element.attachEvent){
        element.attachEvent('on'+type,handler);
    //IE不支持DOM2级
    }else{
        element['on'+type] = handler
    }
    
}
//封装图片轮播
function imgAutoPlay(){
    for(var i=0;i<bgImg.length;i++){
        bgImg[i].style.display='none';
        span[i].style.background='none';
    }
    bgImg[index].style.display='block'; 
    span[index].style.background='#ffcc00'; 
}
//清除定时器
function stopAutoPlay(){
    if(timer){
        clearInterval(timer)
    }
}
//定时3S切换
function startAutoPlay(){
    timer=setInterval(function(){
    index++;
    if(index>=span.length){
        index=0;
    }
    imgAutoPlay();
},3000)

}
startAutoPlay();
addHandler(outBox,'mouseover',stopAutoPlay);
addHandler(outBox,'mouseout',startAutoPlay);

//标题点击事件
for(var i=0;i<span.length;i++){
    span[i].id=i;
    console.log(span[i].id)
    addHandler(span[i],'click',function(){
        index=this.id;
        imgAutoPlay();
    });
}

