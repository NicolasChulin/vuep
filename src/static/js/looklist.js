
    $(document).ready(function() {
       /* 头部导航*/
     
        /*轮播图片幻灯*/
        var galleryTop = new Swiper('.gallery-top', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 10,
            loop:true,
       });
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            touchRatio: 0.2,
            loop:true,
            slideToClickedSlide: true
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
       /* 评论区域*/
        $('.content').flexText();
   /*     textarea限制字数*/

        function keyUP(t){
            var len = $(t).val().length;
            if(len > 139){
                $(t).val($(t).val().substring(0,140));
            }
        }

    /*点击评论创建评论条*/

        $('.commentAll').on('click','.plBtn',function(){
            var myDate = new Date();
            //获取当前年
            var year=myDate.getFullYear();
            //获取当前月
            var month=myDate.getMonth()+1;
            //获取当前日
            var date=myDate.getDate();
            var h=myDate.getHours();       //获取当前小时数(0-23)
            var m=myDate.getMinutes();     //获取当前分钟数(0-59)
            if(m<10) m = '0' + m;
            var s=myDate.getSeconds();
            if(s<10) s = '0' + s;
            var now=year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
            //获取输入内容
            var oSize = $(this).siblings('.flex-text-wrap').find('.comment-input').val();
            console.log(oSize);
            //动态创建评论模块
            oHtml = '<div class="comment-show-con clearfix"><div class="comment-show-con-img pull-left"><img src="../images/header-img-comment_03.png" alt=""></div> <div class="comment-show-con-list pull-left clearfix"><div class="pl-text clearfix"> <a href="#" class="comment-size-name">David Beckham : </a> <span class="my-pl-con">&nbsp;'+ oSize +'</span> </div> <div class="date-dz"> 发表于:<span class="date-dz-left comment-time">'+now+'</span></div><div class="hf-list-con"></div></div> </div>';
            if(oSize.replace(/(^\s*)|(\s*$)/g, "") != ''){
            $(this).parents('.reviewArea ').siblings('.comment-show').prepend(oHtml);
            $(this).siblings('.flex-text-wrap').find('.comment-input').prop('value','').siblings('pre').find('span').text('');
            }
        });
        /*滚动条*/
            var swiper = new Swiper('.swiper-mt', {
            scrollbar: '.swiper-scrollbar',
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheelControl: true,
            freeMode: true
            });



    });






 


