//获取下拉列表标签 select month
//获取H1标签 monthName
//获取ul monthShow 标签
let month = document.querySelector('.month');
let monthName = document.querySelector('.monthName');
let monthShow = document.querySelector('.monthShow');
let days;

//下拉列表改变时 执行函数
month.onchange=function(){
    
    
    let choice = month.value;

    if(choice==='February'){
        days = 28;
    }else if (choice==='January' || choice==='March' || choice==='May' || choice==='July' || choice==='August' || choice==='October' ||choice==='December' ){
        days = 31;
    }else{
        days=30;
    }

    createDays(days,choice)
}
    
    function createDays(days,choice){
        //标题文字改变
        monthName.textContent = choice;
        monthShow.innerHTML='';

        //创建div bgcolor=blue color = white width=120px height=30;
        for(var i = 1;i<=days;i++){
        //创建li无序列表
        let li = document.createElement('li');
        monthShow.appendChild(li);
        li.textContent=i;

        }
        //获取当前日期
    let day = new Date();
    let today = day.getDate();
    console.log(today);
    
    }

    //初次执行
    createDays(31,'January') 


    
    
