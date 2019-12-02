const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');
var i = 1;

/* 遍历图片并添加至缩略图区 */
for( i=1;i<=5;i++){

    var newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/pic'+i+'.jpg');
    thumbBar.appendChild(newImage);

    //单击缩略图显示图片
    newImage.onclick=function(e){
        var imgSrc = e.target.getAttribute('src')
        
        i=imgSrc.charAt(10);
        displayedImage.setAttribute('src',imgSrc)

    }
}


i=1;
function autoImg(){
    
    //imgSrc =newImage.getAttribute('src')
    displayedImage.setAttribute('src','images/pic'+i+'.jpg')
    i++;
    if(i>5){
        i=1;
    }
    
}

   
    /*添加计时器1秒自动切图*/

setInterval('autoImg()',2000)
    


    



/* 编写 变亮/变暗 按钮 */

btn.onclick = function(e){
    const btnName = e.target.getAttribute('class');
    if(btnName=='light'){
        btn.textContent='变暗';
        btn.setAttribute('class','dark');
        overlay.style.backgroundColor = 'rgba(0,0,0,0)'

    }else{
        btn.textContent='变亮';
        btn.setAttribute('class','light');
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)'
    }
}