$(function(){

    var pageSize = 6;
    var laypage, layer;
    var select = {
        type: 1,
        page: 1
    }
    layui.use(['laypage', 'layer'], function(){
        laypage = layui.laypage;
        layer = layui.layer;
        getDesignerType();
    });


    function getDesignerType(){
        $('#designer-list').loading();
        $.ajax({
            url: GLOBAL.domain + '/designer/v2/getDesignStyleList',
            type:'POST',
            success: function(data){
                if(data.code==200 && data.data.length>0){
                    var designrTypes = [];
                    data.data.forEach(function(item,index){
                        designrTypes.push({
                            name:item.name,
                            typeId:item.id
                        });
                    });
                    var html = template("DesignerType",{designrTypes:designrTypes});
                    $('#designer-menu').html(html);
                    select.type = designrTypes[0]['typeId']
                    getDesginers();
                }else{
                    layer.msg(data.msg);
                    $('#designer-list').hideLoading();
                }
            },
            error: function(xhr, type, errorThrown) {
                $('#designer-list').hideLoading();
                layer.msg('网络错误',{time:500});
            }
        })
    }

    function getDesginers(){
        $.ajax({
            url: GLOBAL.domain + '/designer/findByDesignStyle',
            data:{
                styleId: select.type,
                pageNum: select.page,
                pageSize: pageSize
            },
            type:'post',
            success:function(data){
                $('#designer-list').hideLoading();
                if(data.code == 200 && data.data.list.length>0){
                    var designers = [];
                    data.data.list.forEach(function(item){
                        designers.push({
                            cover: getResizeImgUrl(item.picture, 'md'),
                            description: item.signature,
                            name: item.nickname
                        });
                    });
                    var html = template("DesignerList",{designers:designers});
                    $('#designer-list').html(html);

                    if(select.page == 1 && data.data.hasNextPage){
                        pageParse(data.data.total);
                    }
                }
            },
            error: function(){
                $('#designer-list').hideLoading();
                layer.msg('网络错误！');
            }
        })
    }

    function pageParse(total){
        laypage.render({
            elem: 'designer-page',
            limit: pageSize,
            count: total,
            theme: '#ec9282',
            jump: function(obj, first){
                if(!first){
                    select.page = obj.curr;
                    getDesginers();
                }
            }
        });
    }


    /* bind-event */
    $('#designer-menu').on('click', 'li', function(){
        var $this = $(this);
        var typeId = $this.attr('data-id');
        $this.addClass('act').siblings().removeClass('act');
        select.type = typeId;
        select.page = 1;
        getDesginers();
    });

});
