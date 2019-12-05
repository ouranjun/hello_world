/*声明全局变量*/
var index = 0,
    timer=null,  //当前显示图片的索引，默认值为0
    prev = byId('prev'),    //下一张
    next = byId('next'),    //上一张
    pics = byId('banner').getElementsByTagName('div'),
    size = pics.length,
    dots= byId('dots').getElementsByTagName('span'),
    dotsSize=dots.length,
    subMenu=byId('sub-menu'),
    subMemuBox=subMenu.getElementsByClassName('inner-box'),
    menuItem=byId('menu-content').getElementsByTagName('div');
    console.log(subMemuBox)

//封装getElementById()
function byId(id){
    return typeof(id) === 'string' ? document.getElementById(id) : id;
}

/*封装通用事件绑定方法
    element绑定事件的DOM元素
    事件名type
    事件处理程序handler
*/
function addHandler(element,type,handler){
    //非IE
    if(element.addEventListener){
        element.addEventListener(type,handler,true)
        //IE支持DOM2级
    }else if(element.attachEvent){
        element.attachEvent('on'+type,handler)
        //IE不支持DOM2
    }else{
        element['on'+type] = handler;
    }
}
/*
//点击下一张图片封装
function nextFn(){
    index++;
    if(index>=size){
        index=0;
    }
    if(index>0){
    pics[index-1].style.display='none';
    pics[index].style.display='block'
    dots[index].setAttribute('class','active');
    dots[index-1].removeAttribute('class','active');
    }
    else{
    pics[index].style.display='block'
    dots[index].setAttribute('class','active');
    dots[size-1].removeAttribute('class','active');

    }
}

// 点击下一张按钮显示下一张图片
addHandler(next,'click',nextFn);

// 点击上一张按钮显示上一张图片
addHandler(prev,'click',function(){
    index--;
    if(index<0){
        index=size-1;
    }
    if(index!==2){
    pics[index+1].style.display='none';
    pics[index].style.display='block';
    dots[index].setAttribute('class','active');
    dots[index+1].removeAttribute('class','active');
    console.log(index);
}else{
    pics[0].style.display='none';
    pics[size-1].style.display='block';  
    dots[index].setAttribute('class','active');
    dots[0].removeAttribute('class','active');
    console.log(index);  
    }
});

//圆点图点击效果
function dotsFn(dotsNum){
    if(index!==dotsNum){
        dots[dotsNum].setAttribute('class','active');
        dots[index].removeAttribute('class','active');
        pics[dotsNum].style.display='block';
        pics[index].style.display='none'
    }
        index=dotsNum;
}

addHandler(dots[1],'click',function(){
    dotsFn(1);
    console.log(index);
});
addHandler(dots[2],'click',function(){
    dotsFn(2);
    console.log(index);
});
addHandler(dots[0],'click',function(){
    dotsFn(0);
    console.log(index)
});

//定时器，隔2s自动切换
setInterval(nextFn, 3000);

//鼠标经过主菜单时子菜单出现

*/
//-------- 以上是自己写的 --------
//---------以下是教程----------


//清除定时器，停止自动播放
function stopAutoPlay(){
    if(timer){
        clearInterval(timer);
    }
}

//图片自动轮播
function startAutoPlay(){
    timer = setInterval(function(){
        index++;
        if(index>=size){
            index = 0;
        }
        changeImg();
    },3000)
}

//封装changeImg()的方法
function changeImg(){
    for(var i=0,len=dots.length;i<len;i++){
        dots[i].className = '';
        pics[i].style.display = 'none';
    }
    dots[index].className = 'active';
    pics[index].style.display='block';
}

function slideImg(){
    startAutoPlay();
    var main = byId('main');
    var banner = byId('banner');
    var menuContent = byId('menu-content');

    addHandler(main,'mouseover',stopAutoPlay);
    addHandler(main,'mouseout',startAutoPlay);

    //点击导航切换
    for(var i=0,len=dots.length;i<len;i++){
        dots[i].id = i;
        addHandler(dots[i],'click',function(){
            index = this.id;
            changeImg();
        })
    }

    //下一张
    addHandler(next,'click',function(){
        index++;
        if(index>=size) index=0;
        changeImg();
    })

     //上一张
     addHandler(prev,'click',function(){
        index--
        if(index<0) index=size-1;
        changeImg();
    })

    //菜单
    for(var m=0,mlen=menuItem.length;m<mlen;m++){
        menuItem[m].setAttribute('data-index',m);
        addHandler(menuItem[m],'mouseover',function(){
            subMenu.className = 'sub-menu';

            var idx = this.getAttribute('data-index');
           // console.log(menuItem[1]);
            for(var j=0,jlen=subMemuBox.length;j<jlen;j++){
                subMemuBox[j].style.display = 'none';
                menuItem[j].style.background = 'none';
            }
            subMemuBox[idx].style.display='block';
            menuItem[idx].style.background = 'rgba(0,0,0,0.1)';
        });
    }
    addHandler(subMenu,'mouseover',function(){
        this.className='sub-menu';
    });

    addHandler(subMenu,'mouseout',function(){
        this.className='sub-menu hide';
    });

    addHandler(banner,'mouseout',function(){
        subMenu.className='sub-menu hide';
    });

    addHandler(menuContent,'mouseout',function(){
        subMenu.className='sub-menu hide';
    });

}

addHandler(window,'load',slideImg);