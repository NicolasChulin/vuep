$(function(){
	     /*调用列表函数*/
          getlooklist();
          getpngSrc();
         /* 动态获取数据*/
       
       var pngSrc='';
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
    						}
    						console.log(pngSrc)
    					},
    					error: function(xhr, type, errorThrown) {

    						console.log(xhr);
    					}
					})
			}
		/*获取商品详情*/
    function getlooklist() {
       $.ajax({
          url : 'http://192.168.1.254:8070/look/list/',
          data:{
              memberToken :1,
              pageNo : 1,
              pageSize : 12
              },
          dataType:'json',
          type:'post',
          timeout: 500,
          success: function(data) {
          	var datas = data.data.list;
          	var matchList = [];
          	var looklistId ='';
            if(data.code==200){
              datas.forEach(function(item,index){
            	matchList.push({
            			description:item.description,
            			id:item.id,
            			title:item.title,
            			postimg: pngSrc + "/" +  item.cover
  		      })

  	})
    var html = template("looklist", {matchList:matchList});
       /* console.log(html);*/
    $('#look_box').html(html);
    ModalEffects(function(event) {
    	var id;
    	var target = $(event.target);
    	if(target.hasClass('md-trigger')){
    		id = target.attr('data-id');
    	}else{
    		id = target.parents('.md-trigger').attr('data-id');
     }

 	// var index = event;
$.ajax({
        url : 'http://192.168.1.254:8070/look/detail',
        data:{
        lookId : id,
        memberToken :1	
        },
          dataType:'json',
          type:'post',
          timeout: 500,
          success:function(data){
            console.log(data);
            var lookDil = [];
            var lookphoto = [];
            if(data.code == 200){
              var detailtime = data.data.publishTime;
              var likes = data.data.viewNum;
                data.data.lookDetails.forEach(function(item,index){
                lookDil.push({
                  DetailsImg:pngSrc + "/" +  item.picture,
                  DetailsId:item.id,
                  Detailstext:item.detail,
                  sort:item.sort,
                  Detail_T:detailtime,
                  viewNum:likes
                  /*  console.log(lookDil);*/
                  data.data.linkList.forEach(function(item,index){
                    lookphoto.push({
                      testimg :pngSrc + "/" +  item.img,
                      testId:item.id,
                      testDescription :item.description,
                      testName:item.name,
                      statusName:item.statusName,
                      id:item.id,
                      memberId :item.memberId,
                      olPrice:item.orgPrice,
                      	/*   olPrice:200, */
                      myPrice:item.price
                    })
                  })
                  var html = template("lookDel", {lookDil:lookDil,lookphoto:lookphoto});
                  $('#lookDetial').html(html);
                }
              }
            })
          });
        }
      }
    })
  }

})