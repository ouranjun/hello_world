//ui-search定义
$.fn.UiSearch = function () { 
    var ui = $(this);
    $('.ui-search-selected',ui).on('click', function () {
        $('.ui-search-select-list').show();
        return false;
    });

    $('.ui-search-select-list a',ui).on('click', function () {
        $('.ui-search-selected').text($(this).text());
        $('.ui-search-select-list').hide();
        return false;
    });
    $('body').on('click', function () {
        $('.ui-search-select-list').hide();
    });
 }

// ui-tab 定规

/**
 * @param {string} header TAB组件的选项卡切换部分className  里边又若干个 .item
 * @param {string} content TAB组件的选项卡内容区域  里边又若干个 .item
 * @param {string} focus_prefix TAB组件的选项卡高亮选项  可选
 * 
 */

 $.fn.UiTab = function (header,content,focus_prefix) {
     var ui = $(this);
     var header = $(header,ui);
     var content = $(content,ui);
     var focus_prefix = focus_prefix || '';
  
     header.on('click',function () {
         var index = $(this).index();
         header.removeClass(focus_prefix+'item_focus').eq(index).addClass(focus_prefix+'item_focus')
         content.hide().eq(index).show();

         return false;
        
     })
 }

 $.fn.UiBackTop = function(){
    var ui = $(this);
    var el ='<a class="ui_backTop" href="#3"></a>';
    ui.append(el);
    $(window).on('scroll',function () {

        var top = $(document).scrollTop()
       
        if(top>100){
            $('.ui_backTop').show();
        }else{
            $('.ui_backTop').hide();
        }
       
    }
    );

    $('.ui_backTop').on('click', function () {
       $(window).scrollTop(0);
       
    });


 }

//ui-slidder
/**
 * 1.左右箭头需要能控制翻页
 * 2.翻页的时候，进度点，需联动focus
 * 3.翻到第三页的时候，下一页需要回到第一页，翻到第一页的时候同理
 * 4.进度点，点击需切换到对应的页面
 * 5(无操作) 需自动切换
 * 6.滚动过程中，屏蔽其他操作
 * 
 */
$.fn.UiSlider = function(){
    var ui = $(this);

    var wrap = $('.ui-slider-wrap')

    var btn_prev = $('.ui-slider-arrow .left',ui),
        btn_next = $('.ui-slider-arrow .right',ui),

        items = $('.ui-slider-wrap .item',ui),
        tips = $('.ui-slider-process .item',ui);

        //预定义
        var current = 0;
        var size = items.size();
        var width = items.eq(0).width();
        var enableAuto = true

        ui.on('mouseover',function(){
            enableAuto = false;
        })
        .on('mouseout',function(){
            enableAuto =true
        })



        //具体操作
        wrap.on('move_prev',function(){
            if(current<=0){
                current=size
            }
            current = current - 1;
            wrap.triggerHandler('move_to',current)
        })
        .on('move_next',function(){
            
            if(current>=size-1){
                current=-1;
            }
            current = current + 1;
            wrap.triggerHandler('move_to',current)
        })
        .on('move_to',function(evt,index){
            wrap.css('left',index*width*-1)
            tips.removeClass('item-focus').eq(index).addClass('item-focus')

        })
        .on('move_auto',function(){
            setInterval(function(){
                enableAuto && wrap.triggerHandler('move_next')
            }
            ,3000)
        })
        .triggerHandler('move_auto')
        
        //事件
        btn_prev.on('click',function(){
            wrap.triggerHandler('move_prev');
        })
        btn_next.on('click',function(){
            console.log('111')
            wrap.triggerHandler('move_next');
        })
        tips.on('click',function(){
            var index = $(this).index();
            wrap.triggerHandler('move_to',index);
        })

}




//页面脚本逻辑
$(document).ready(function () {
    $('.ui-search').UiSearch();
    $('.content_tab').UiTab('.caption > .item','.block > .item');
    $('.content_tab').UiTab('.block_caption > a','.block_content > .block_content-warp','block_caption_');
    $('html').UiBackTop();
    $('.ui-slider').UiSlider();
});