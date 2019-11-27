//获取select下拉列表标签
//获取html标签
//设置body的内边距10px

let select = document.querySelector('.theme');
let html = document.querySelector('html');
document.body.style.padding="10px";

//创建下拉列表值改变时执行相应函数
function updata(bgColor,textColor){
    html.style.backgroundColor=bgColor;
    html.style.color=textColor;
}

select.onchange=function(){

    (select.value=='black')? updata('black','white') : updata('white','black');
    

}


/*switch语句 天气预备*/
//获取下拉列表select weather 的标签
//获取段落文字p标签 weatherText
let weather = document.querySelector('.weather');
let weatherText = document.querySelector('.weatherText');

weather.addEventListener('change',updataWeather);

function updataWeather(){
    let choice = weather.value;
    switch(choice){
        case 'sunny' : 
        weatherText.textContent='It is nice and sunny outside today. Wear shorts! Go to the beach, or the park, and get an ice cream.';
        break;
        case 'rain' :
        weatherText.textContent='Rain is falling outside; take a rain coat and a brolly, and don\'t stay out for too long.'
        break;
        case 'snowing' :
        weatherText.textContent='The snow is coming down — it is freezing! Best to stay in with a cup of hot chocolate, or go build a snowman.'
        break;
        case 'overcast' :
        weatherText.textContent='It isn\'t raining, but the sky is grey and gloomy; it could turn any minute, so take a rain coat just in case.'
        break;
        default:
        weatherText.textContent='';

    }



}