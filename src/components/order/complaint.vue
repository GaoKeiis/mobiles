<template>
  <div class="concel homes">
		<div class="c_reason main">
    <div class="returnBtn" @click="routerGo()">返回</div>
			<h4>请选择投诉原因</h4>
			<ul class="choice">
				<li v-for='(choiceArr,ind) in choiceArr' @click='choiceFn(ind)'>{{choiceArr}}</li>
			</ul>
			<div class="detailed">
				<h5>请描述详细原因</h5>
				<el-input
				  type="textarea"
				  :rows="3"
				  placeholder="请详细说明原因，反应更快哦"
				  v-model="textarea">
				</el-input>
			</div>
			<!-- <div class="screenshot">
				<h5>截图</h5>
				<el-upload class='screen'
					  action="http://127.0.0.1:20001/Administration/MediaApiLhUploadHandler"
					  accept="image/jpeg,image/gif,image/png,image/bmp"
					  list-type="picture-card"
					  :on-preview="handlePictureCardPreview"
					  :before-upload="beforeAvatarUpload"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
					  <img width="100%" v-lazy="dialogImageUrl" alt="">
					</el-dialog>
			</div> -->
		</div>
    <footer class='foot' @click='sublimts()'>
        提交
    </footer>
  </div>
</template>

<script>

export default {
  name: 'concel',
  data () {
    return {
    	textarea: '',
    	dialogImageUrl: '',
        dialogVisible: false,
        imageFileName:[],
        choicestr:[],
        choiceArr:['没完成订单','态度恶劣','服务差','技术不好','虚假信息','其他原因']
    }
  },
  components: {},
  created () {
  },
  updated(){
      for(let i = 0; i<$("a").length;i++){
       if($("a").eq(i).attr("target") == "_blank"){
         $("a").eq(i).css("visibility","hidden")
      }
    }
  },
  methods:{
  	 beforeAvatarUpload(file) {
  	 	this.imageFileName.push(file.name);
            const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!isLt2M) {
                this.common.errorTip('上传图片大小不能超过 2MB!');
            }
            return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
  	 },
    routerGo(){
      this.$router.go(-1);
    },
  	handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      choiceFn(ind){
      	if($('.choice li').eq(ind).attr('class') == "bluer"){
			$('.choice li').eq(ind).removeClass('bluer');
      	}else{
      		$('.choice li').eq(ind).addClass('bluer');
      	}
      },
      // 弹框
      alertFn(tit){
          this.$alert(tit);
          $('.el-message-box__btns button').css('background',"#fff");
          $('.el-message-box__btns button').css('border',0);
          $('.el-message-box__header button').css('display','none')
          $(".v-modal").css("display","block");
          $(".el-message-box__wrapper").css("display","block");
         setTimeout(function(){
           $(".el-message-box__btns button").trigger("click");
          
         },2000)
      },
      sublimts(){
      		var that = this;
		  if(this.textarea === " " || $('.bluer').length == 0){
      		 this.alertFn('请选择或请填写取消原因');
      	}//else if(this.imageFileName == ""){
      		 // this.$alert('请截图');
      		 // $('.el-message-box__btns button').css('background',"#fff");
      		 // $('.el-message-box__btns button').css('border',0);
      		 // setTimeout(function(){
      		 // 	$(".el-message-box__btns button").trigger("click");
      		 // },2000)
      	//}
      	else{
      		    if($('.bluer').length != 0){
		      		this.choicestr = [];
		      		for(var i = 0; i<$('.bluer').length;i++){
		      			this.choicestr.push($('.bluer').eq(i).text());
		      		}
		      	}
		      		let tokens = this.$route.query.tokens,
	      			order_no = this.$route.query.order_no,
	      			choicestr = this.choicestr.join(',');
		      this.$http.post("/h5/esport-api/v1/order/complaint_order",{'user_token':tokens,"order_no":order_no,"type":1,"tag_list":choicestr,"content":this.textarea},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.data!=""){
                  if(response.body.msg == "ok"){
                   this.alertFn("投诉成功");
                   setTimeout(()=>{
                    this.$router.push({path: '/orderlist'})
                 },2000);
                  }else{
                    this.alertFn(response.body.msg);
                     setTimeout(()=>{
                      this.$router.push({path: '/orderlist'})
                   },2000);
                  }
               }else{
                this.alertFn('服务器异常，请重新加载');
              }
            },
          (error)=>{
            console.log(error);
          })
      	}
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.concel{
	padding-top: 18px; 
}
.c_reason{
	padding: 0 10px;
	h4{
		color: #151516;
		font-size: 16px;
		padding-bottom: 15px;
	}
	ul{
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		li{
			padding: 7px 0;
			margin-left: 10px;
			margin-bottom: 10px;
			background: #D8D8D8;
			color: #333333;
			font-size: 14px;
			width: 30%;
			border-radius: 20px;
		}
	}
}
.detailed{
	padding-top: 30px;
	padding-bottom: 30px;
	h5{
		font-size: 16px;
		color: #151516;
		padding-bottom: 10px;
	}
}
.choice .bluer{
	background: #3285FF;
	color: #fff;
}
.screenshot{
	h5{
		color: #151516;
		font-size: 16px;
		padding-bottom: 10px;
	}
}
.foot{
	font-size: 18px;
	background: #3285FF;
	color: #fff;
	text-align: center;
	padding: 12px 0;
}
.returnBtn{
  position: fixed;
  bottom: 30px;
  left: 20px;
  background: #000;
  opacity: .6;
  color: #fff;
  font-size: 1.2rem;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  line-height:42px;
  text-align: center;
  z-index: 10;
} 
</style>

