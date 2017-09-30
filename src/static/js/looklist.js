
$(function(){
    var pageSize = 12;
    var laypage, layer;
    layui.use(['laypage', 'layer'], function(){
        laypage = layui.laypage;
        layer = layui.layer;

        getLookList(1);
    });


    /* event-bind */
    $('#look-list').on('click', '.look-cover', function(){
        var id = $(this).attr('data-id');
        $('#detail-box').fadeIn();
        getLookDetail(id);
        getLookComment(id);
    });

    $('#detail-close').on('click',function(){
        $('#detail-box').fadeOut();
    });

    $('#detail-dom').on('click','.prod-btn', function(){
        showAppTips();
    });
    $('#detail-comment').on('click','.comment-more', function(){
        showAppTips();
    });



    /* functions */
    function getLookList(page){
        $('#look-list').loading();
        $.ajax({
            url: GLOBAL.domain + '/look/list',
            data: {
                pageNum: page,
                pageSize: pageSize
            },
            type: 'POST',
            success: function(data){
                $('#look-list').hideLoading();
                if(data.code==200 && data.data.list.length>0){
                    var looklist = [];
                    data.data.list.forEach(function(item,index){
                        looklist.push({
                            id: item.id,
                            cover: getResizeImgUrl(item.cover, 'md'),
                            description: item.description,
                            title: item.title
                        })
                    });
                    var listDom = template('lookList', {looklist:looklist});
                    $('#look-list').html(listDom);

                    if(page == 1 && data.data.hasNextPage){
                        pageParse(data.data.total);
                    }
                }else{
                    layer.msg(data.msg, {time: 1000});
                }

            },
            error: function(){
                layer.msg('网络错误',{time:500});
            }
        });
    }

    function pageParse(total){
        laypage.render({
            elem: 'look-page',
            limit: pageSize,
            count: total,
            theme: '#ec9282',
            jump: function(obj, first){
                if(!first){
                    getLookList(obj.curr);
                }
            }
        });
    }

    function getLookDetail(id){
        $('#detail-dom').loading();
        $.ajax({
            url: GLOBAL.domain + '/look/detail',
            data: {
                lookId: id
            },
            type: 'POST',
            success: function(data){
                $('#detail-dom').hideLoading();
                if(data.code==200){
                    var look = {
                        likeNum: data.data.likeNum,
                        publishTime: data.data.publishTime,
                        viewNum: data.data.viewNum,
                        commentNum: data.data.commentNum,
                        likeNum: data.data.likeNum
                    }
                    var prducts = [];
                    data.data.linkList.forEach(function(item){
                        prducts.push({
                            id: item.id,
                            cover: getResizeImgUrl(item.img, 'sm'),
							description :item.description,
							name:item.name,
							statusName:item.statusName,
			  				memberId :item.memberId,
			  				marketPrice:item.marketPrice,
			  				orgPrice:item.orgPrice,
			  			  	price:item.price,
                            isDiscount: item.isDiscount
                        });
                    });
                    var banners = [];
                    data.data.lookDetails.forEach(function(item){
                        banners.push({
                            cover: getResizeImgUrl(item.picture, 'md'),
                            thumbsCover: getSquareImgUrl(getResizeImgUrl(item.picture, 200)),
							id: item.id,
							detail: item.detail,
							sort: item.sort
                        })
                    });

                    var listDom = template('lookDetail', {
                        look: look,
                        prducts: prducts,
                        banners: banners
                    });
                    $('#detail-dom').html(listDom);
                    swiperSet();
                }else{
                    layer.msg(data.msg, {time: 1000});
                }
            },
            error: function(){
                $('#detail-dom').hideLoading();
                layer.msg('网络错误', {time: 500});
            }
        });
    }

    function getLookComment(id){
        $('#detail-comment').loading();
        $.ajax({
            url: GLOBAL.domain + '/look/commentList',
            data: {
                lookId : id,
				pageNum : 1,
				pageSize : 3
            },
            type: 'POST',
            success: function(data){
                $('#detail-comment').hideLoading();
                if(data.code==200){
                    var comments = [];
                    data.data.list.forEach(function(item,index){
                        var childList=[];
                        item.childList.forEach(function(item){
                            childList.push({
                                name1 : item.author.nickname,
                                name2 : item.parentAuthor.nickname,
                                childContent : item.content,
                                commentId : item.id,
                            })
                        });
                        comments.push({
                            avatar : getResizeImgUrl(item.author.avatar, 'avatar'),
                            nickname : item.author.nickname,
                            createTime : item.createTime,
                            content : item.content,
                            commentId : item.id,
                            childList : childList,
                            hasChild : childList.length==0?false:true
                        });
                    });
                    var commentDom = template('lookComment', {
                        commentNum: data.data.total,
                        comments: comments
                    });
                    $('#detail-comment').html(commentDom);
                    swiperSet();
                }else{
                    layer.msg(data.msg, {time: 1000});
                }
            },
            error: function(){
                $('#detail-comment').hideLoading();
                layer.msg('网络错误',{time:500});
            }
        });
    }

    function getSquareImgUrl(addr){
        return  addr + ',/crop,x_0,y_0,w_200,h_200';
    }

    function swiperSet(){

        /* banners */
        var galleryTop = new Swiper('.detail-banner-top', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });
        var galleryThumbs = new Swiper('.detail-banner-thumbs', {
            spaceBetween: 16,
            centeredSlides: true,
            slidesPerView: 7,
            initialSlide:0,
            touchRatio: 0.2,
            slideToClickedSlide: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
        /* scroll */
        var swiper = new Swiper('.detail-scroll', {
            scrollbar: '.swiper-scrollbar',
            direction: 'vertical',
            mousewheelControl: true,
            slidesPerView: 'auto',
            freeMode: true,
            roundLengths : true
        });
    }


});
