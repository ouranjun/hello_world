//customName输入自定义名称变量
//randomize 生成随机故事按钮
//<p .story>存储故事
//randomValueFromArray()函数 接受一个数组,随机返回数组中之一

const customName = document.getElementById('customName');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
        //random保存随机数 获取数组长度并随机生成0-array.length之间的随机数
        const random = Math.floor(Math.random()*array.length);
        return array[random];


}
//创建初始字符串与各个数组
let storyText = '外面是華氏94度，所以:insertx:散步了。當他們到達:inserty:時，他們凝視了片刻，然後是:insertz:鮑勃看到了整個東西，但並不感到驚訝-:insertx:重300磅，那是一個炎熱的日子。';
let storyX =['大哥哥','老爷爷','爸爸超人'];
let storyY = ['大明湖畔','维多利亚港','夜上海'];
let storyZ = ['激动的跳了起来,并且哭了','很失望,难过的笑了片刻','自身燃烧,融化了'];

//给randomize按钮添加单击事件 执行resul()函数
randomize.addEventListener('click',result);

//创建result()函数

function result(){
    //newStory新变量保存字符串
    let newStory = storyText;
    //获取数组随机的值
    let xitem = randomValueFromArray(storyX);
    let yitem = randomValueFromArray(storyY);
    let zitem = randomValueFromArray(storyZ);

    //replace内置方法 替换newStory的值
    newStory = newStory.replace(':insertx:',xitem);
    newStory = newStory.replace(':insertx:',xitem);
    newStory = newStory.replace(':inserty:',yitem);
    newStory = newStory.replace(':insertz:',zitem);

    //输入框有内容时
    if(customName.value !==''){
        const name = customName.value;
        newStory = newStory.replace('鮑勃',name);

    }
    //添加内容,设为可见
    story.textContent=newStory;
    story.style.visibility='visible';

}