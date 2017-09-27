   $(document).ready(function() {
        $('#nav li').hover(function() {
            $('ul', this).stop().fadeIn(300);
            $(this).children('a:first').addClass("hov");
        }, function() {
            $('ul', this).stop().fadeOut(300);
            $(this).children('a:first').removeClass("hov");

        });
        // 回到顶部
		if($(this).scrollTop()==0){
				$(".side .toTop").hide();
					}
		$(window).scroll(function(event) {
					/* Act on the event */
				if($(this).scrollTop()==0){
						$(".side.toTop").hide();
					}
				if($(this).scrollTop()!=0){
						$(".side .toTop").show();
					}
			});	
            // 侧边回到顶部
		$(".side .toTop").click(function(event) {
								/* Act on the event */
			$("html,body").animate({
			    scrollTop:"0px"},
				 666
			)
		});
        $(".side .side_e").mouseover(function(){
            $(".side_e .s_look").addClass('.side_active').stop().slideDown(200);

        })
         $(".side .side_e").mouseout(function(){
           $(".side_e .s_look").removeClass('.side_active').stop().slideUp(200); 

        })
        $('.regard_ul>li').click(function(){
        var index = $(this).index();
        console.log(index);
        /*alert(index)*/
        window.location.href="./regard.html?index="+index;
    })
        /*事件绑定完成后执行事件*/
        var pngSrc='';
        
        getpngSrc();
        function getShow(){
           
            $(".tab>li").mouseover(function () {
            $(this).addClass("active").siblings("li").removeClass("active");
            //获取li的索引
            var index = $(this).index();
            $(".products>div:eq(" + index + ")").addClass("selected").siblings("div").removeClass("selected");
        });
        //鼠标悬停出现效果
            $(".designer_png>img").mouseover(function () {
                $(this).next(".designer_m").animate({opacity: "show", left: "0"}, "slow(1000)");
    
            });
            $(".designer_png>img").mouseleave(function () {
            $(this).next(".designer_m").animate({opacity: "hide", left: "-100%"}, "slow(1000)");

        });  
    }
 
    /*动态获取数据*/
      
        /* 图片解析*/
        
        function getpngSrc(){
            $.ajax({
                url :'http://192.168.1.254:8070/oss/getImgDomain',
                dataType: 'json',
                type: 'POST',
                timeout: 500,
                success: function(data) {
                    if(data.code==200){
                        pngSrc=data.data.imgDomain;
                        getdesigner();
                    }
                    console.log(pngSrc)
                },
                error: function(xhr, type, errorThrown) {
                    console.log(xhr);
                }
            })
        }          
        function getdesigner(){
            var designrList = []; 
            $.ajax({
                url:'http://192.168.1.254:8070/designer/v2/getDesignStyleList',
                dataType:'json',
                type:'post',
                timeout: 500,
                success:function(data){
              
                if(data.code==200){
                    data.data.forEach(function(item,index){
                        designrList.push({
                        Name:item.name,
                        designerId:item.id
                        }) 
                    });
                      console.log(designrList);
                    getdesginerPng(designrList[0]['designerId'])
                var html = template("denger_l",{designrList:designrList});
                $('#designer_n').html(html);
                    }
                },
                error: function(xhr, type, errorThrown) {
                    console.log(xhr);
                 }
            })
        }
        function getdesginerPng(designerId){
            var designer_main=[];
            $.ajax({
                url:'http://192.168.1.254:8070/designer/findByDesignStyle',
                data:{
                    memberToken:1,
                    styleId:designerId,
                    pageNum:1,
                    pageSize:10
                },
                dataType:'json',
                type:'post',
                timeout: 500,
                success:function(data){
                    console.log(data);
                    if(data.code == 200){
                        data.data.list.forEach(function(item){
                            designer_main.push({
                              designerPng:pngSrc+ "/" +item.picture,
                              d_signature:item.signature,
                              d_Name:item.brandName

                            })  
                        });
                        console.log(designer_main);
                        var html = template("denger_m",{designer_main:designer_main});
                        $('#d_products').html(html);
                        getShow();
                    }
                   
                }
            })
         }

       

    })