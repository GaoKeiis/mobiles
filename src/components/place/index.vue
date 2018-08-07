<template>
  <div class="place homes">
	<div class="place_main main">
  <div class="returnBtn" @click="routerGo()">返回</div>
	<ul class="p_ulst">
  <li>
    <h6>服务类型</h6>
    <el-select class="o_game" style="width: 50%;" v-model="valuenr" @change="changeFn(valuenr)">
          <el-option
            v-for="(item,ind) in resp" 
            v-if="item.type!=3"
            :key="item.game_service_name"
            :label="item.game_service_name"
            :value="item.game_service_name">
          </el-option>
      </el-select></li>
		<li>
		<h6>我的大区</h6>
		<el-select class="o_game" style="width: 50%;" v-model="value" placeholder="点击选择" @change="changeFs(value)">
			    <el-option
			      v-for="item in bigAreaLists"
			      :key="item.name"
			      :label="item.name"
			      :value="item.name">
			    </el-option>
  		</el-select></li>
  		<li>
		<h6>我的段位</h6>
		<el-select class="o_game o_games" @change="changesFn(valuen)" style="width: 50%;" v-model="valuen" placeholder="点击选择">
			    <el-option
			      v-for="(item,ind) in gradeLists"
			      :key="item.name"
			      :label="item.name"
			      :value="item.name">
			    </el-option>
  		</el-select></li>
  		<li>
		<h6 v-if="placelistype == 1">服务时间</h6>
    <h6 v-else-if="placelistype == 2">净胜局</h6>
		<el-select class="o_game" style="width: 50%;" v-model="values" placeholder="点击选择">
			    <el-option
			      v-for="item in numLists"
			      :key="item"
			      :label="item"
			      :value="item">
			    </el-option>
  		</el-select></li>
	</ul>
	<div class="contact">
			<h5>联系方式</h5>
			<div class="cont_p">
				<p>
				<span class='vcode' :value="sth" v-if='sth!=""' style='background:#3285FF;' @click="flag==true && vcodeFn()">获取验证码</span>
				<span :value="sth" v-else>获取验证码</span>
				<div class="el-input phone">
          <input type="text" v-model="sth"  @input="sth = $event.target.value" autocomplete="off" style="text-align: left;" placeholder="请输入手机号" class="el-input__inner"></div></p>
				<p><div class="el-input vercode">
          <input type="text" autocomplete="off" placeholder="请输入验证码" class="el-input__inner" style="text-align: left;">
          </div></p>
			</div>
		</div>		
	</div>
	<footer class='o_foot' @click='paymentFn()'>
			<h6>合计：<span>{{Math.floor(values*gradeprice*100)/100}}</span>元</h6>
			<p>去支付</p>
	</footer>
</div>
</template>

<script>

export default {
  name: 'sdetails',
  data () {
    return {
    	sth:"",
    	pasts:'',
      valuenr:"",
      value: '',
      valuen: '',
      values: '',
      placelist:"",
      gradeList:"",
      gradeLists:[],
      bigAreaLists:[],
      areaListId:"",
      flag:true,
      second:"",
      numLists:[],
      indes:0,
      gradeName:"",
      setIsg:true,
      placelistype:[],
      gradeprice:"",
      resp:[]
    }
  },
  components: {},
  created () {
  	this.placeFn();
  },
  updated(){
    this.getlocaFn();
     for(let i = 0; i<$("a").length;i++){
       if($("a").eq(i).attr("target") == "_blank"){
         $("a").eq(i).css("visibility","hidden")
      }
    }
  },
methods:{
   routerGo(){
      this.$router.go(-1);
    },
    changesFn(valuer){
       let len = this.placelist.service_list[this.indes].grade_list.length,
        gradeList = this.placelist.service_list[this.indes].grade_list;
        for(var i = 0;i<len;i++){
          if(gradeList[i].name == valuer){
             this.gradeName = gradeList[i].grade_name;
             this.gradeprice = gradeList[i].price;
          }
        }
    },
    changeFs(valuer){
      let len = this.placelist.service_list[this.indes].big_area_list.length,
        areaList = this.placelist.service_list[this.indes].big_area_list;
      for(var i = 0;i<len;i++){
        if(areaList[i].name == valuer){
           this.areaListId = areaList[i].id;
        }
      }
    },
    changeFn(valuer){
      for(var i = 0;i<this.placelist.service_list.length;i++){
        if(this.placelist.service_list[i].game_service_name == valuer){
          this.indes = i;

        }
      }
      this.value="";
      this.valuen="";
      this.values="",
      this.bigAreaLists = this.placelist.service_list[this.indes].big_area_list;
      this.gradeLists = this.placelist.service_list[this.indes].grade_list;
      this.numLists = this.placelist.service_list[this.indes].num_list;
      this.placelistype = this.placelist.service_list[this.indes].type;
    },
  	placeFn(){
  		let userToken = this.$route.query.userToken;
          this.valuenr = this.$route.query.serviceName;
		    this.$http.post("/h5/esport-api/v1/order/fill_order",{'user_token':userToken},{emulateJSON: true}).then(
            (response)=>{
              if(response.body.data!=""){	
                this.placelist = response.body.data;
                 for(var i = 0;i<this.placelist.service_list.length;i++){
                  if(this.placelist.service_list[i].game_service_name == this.valuenr){
                    this.indes = i;
                  }
                   if(this.placelist.service_list[i].type !=3){
                      this.resp.push(this.placelist.service_list[i])
                   }
                }
                
                this.placelistype = this.placelist.service_list[this.indes].type;
               
                this.bigAreaLists = this.placelist.service_list[this.indes].big_area_list;
                this.gradeLists = this.placelist.service_list[this.indes].grade_list;
                this.numLists = this.placelist.service_list[this.indes].num_list;
              }else{
                this.alertFn('服务器异常，请重新加载')
              }
             
            },
            (error)=>{
              console.log(error);
            })
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
        $(".v-modal").css("display","none"); 
        $(".el-message-box__wrapper").css("display","none");
        
       },2000)
    },
  	paymentFn() {
  		let vercode = $('.vercode input').val();
  		let phone = $('.phone input').val();
  		let userToken = this.$route.query.userToken,
          serviceId = this.placelist.service_list[this.indes].game_service_id,
  				account = this.$route.query.account,
  				otalPrice = $('.o_foot h6 span').text(),
  				paragraph =	$('.o_games .el-input__inner').val();
  		if($(".contact").css("display")=='block'){
  	    if(this.value == "" || this.valuen == "" || this.values == ""){
    		  this.alertFn('请填写完整信息')
    		}else if(vercode == ""){
          this.alertFn('验证码不能为空');
    		}else if(vercode != ""){
  			this.$http.post("/h5/esport-api/v1/user/verify_sms",{'type':1,"phone":phone,"captcha":vercode},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.data!=""){	
                  if(response.body.data.is_verify_captcha == true){
                    this.registerFn()
                  }else{
                    this.alertFn('验证码输入错误，请重新输入');
                  }
          }else{
             this.alertFn('服务器异常，请重新加载');
              }
        },
        (error)=>{
          console.log(error);
        })
  		}
  		}else{
  			 if(this.value == "" || this.valuen == "" || this.values == ""){
           this.alertFn('请填写完整信息');
  		}else{
  			this.$router.push({path:'/confirm',query:{"userToken":userToken,"area":this.areaListId,"paragraph":this.gradeName,"service":this.values,"otalPrice":otalPrice,"account":account,"serviceId":serviceId}})
  			} 
  	}	
},
// 第三方注册
  registerFn(){
    let phone = $('.phone input').val(),
        otalPrice = $('.o_foot h6 span').text(),
       userToke = this.$route.query.userToken,
        account = this.$route.query.account,
        serviceId = this.placelist.service_list[this.indes].game_service_id,
        verification = JSON.parse(localStorage.getItem('verification')),
       paragraph = $('.o_games .el-input__inner').val();
      this.$http.post("/h5/esport-api/v1/user/third_regist",{'type':5,"phone":phone,"uid":verification.uid,"nick_name":verification.user_name,"access_token":verification.access_token},{emulateJSON: true}).then(
          (response)=>{
            if(response.body.data!="" || response.body.data!=undefined){ 
                  let userToken = {
                          user_token:response.body.data.user_token,
                        }
                localStorage.setItem('userToken', JSON.stringify(userToken));
                this.$router.push({path:'/confirm',query:{"userToken":userToke,"area":this.areaListId,"paragraph":this.gradeName,"service":this.values,"otalPrice":otalPrice,"account":account,"serviceId":serviceId}});

      }else{
          this.alertFn('服务器异常，请重新加载');
          }
    },
    (error)=>{
      console.log(error);
    })
  },
  	setIntFn(){
      var timer;
  		var that = this;
		    timer = setInterval(()=>{
		  		this.second--;
            $('.vcode').css({"padding":"4px 32px;","background":"#ccc"})
            $('.vcode').html(this.second);
             this.flag = false;
					if(this.second<=0){
             that.flag = true;
						$('.vcode').css({"padding":"3px 5px;","background":"#3285FF"})
					 $('.vcode').html("获取验证码");
           clearInterval(timer);
					 }
           
		  		},1000);
  	},
  	vcodeFn(){
  		let reg = /^1[34578][0-9]{9}$/;
  		let phone = $('.phone input').val();
  		if(reg.test(phone)){

  			this.$http.post("/h5/esport-api/v1/user/send_sms",{'type':1,"phone":phone},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.data!=""){	
                    this.alertFn('已发送验证码，请注意查收');
                    this.setIntFn();

                 let gettime = JSON.parse(localStorage.getItem('gettime'));
                 if(gettime =="" || gettime == null){
                     var timestamp=new Date().getSeconds();
                     this.second = 60;
                     $('.vcode').css({"padding":"4px 32px;","background":"#ccc"})
                        $('.vcode').html(this.second);
                        let t = {
                                  time:timestamp,
                                }
                          localStorage.setItem('gettime', JSON.stringify(t));
                    }else{
                        var timestamps=new Date().getSeconds();
                   
                        var time1=timestamps-gettime.time;
                        if(time1<= 0){
                          localStorage.removeItem('gettime');
                          this.second = 60;
                        }else{
                          this.second = 60-time1;
                        }
                        $('.vcode').css({"padding":"4px 32px;","background":"#ccc"})
                        $('.vcode').html(this.second);
                    }
                }else{
                  this.alertFn('服务器异常，请重新加载');
                }
               
              },
              (error)=>{
                console.log(error);
              })
  		}else{
         this.alertFn('手机号不正确');
  		}
  	},
  	getlocaFn(){
  		 let userToken = JSON.parse(localStorage.getItem('userToken'));
  		 if(userToken.user_token == null || userToken.user_token == ""){
  		 		$(".contact").removeClass("dispnone");
  		 }else{
  		 	$(".contact").addClass("dispnone");
  		 }
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.place_main{
	padding: 30px 10px;
}
.p_ulst{
	li{
		margin-bottom: 20px;
		padding: 8px 15px;
		display: flex;
		justify-content:space-between;
		background:rgba(255,255,255,1);
		box-shadow: 0px 2px 10px 0px rgba(40,40,40,0.15); 
		border-radius: 9px; 
		h6{
			margin-top: 5px; 
			font-size: 16px;
			color: #333333;
		}
	}
}
.el-input .el-input__inner{
	border: 0;
  text-align: right;
}
.phone{
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid #eee;
}
.vercode{
  height: 45px;
  line-height: 45px;
}
.dispnone{
	display: none;
}
.contact{
	padding: 20px 0;
	h5{
		color: #151516;
		font-size: 1.8rem;
		padding-bottom: 14px;
		padding-left: 20px;
	}
}
.cont_p{
	background:rgba(255,255,255,1);
	box-shadow: 0px 2px 10px 0px rgba(40,40,40,0.15); 
	border-radius: 16px; 
	p{
		position: relative;
		span{
			font-size: 14px;
			padding: 4px 5px; 
			position: absolute;
			top:6px;
      border-radius: 4px;
			right: 14px;
			background: #DDDDDD;
			color: #fff;
			z-index: 1;
		}
	}
}
.o_foot{
  /*position: fixed;
  bottom:60px;
  right: 0;*/
	display: flex;
	height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  justify-content: space-between;
	h6{
		padding-left: 38px;
		color: #151516;
		font-size: 16px;
	}
	p{
		margin-right: 10px;
		background: #3285FF;
		color: #fff;
		padding: 0 20px;
		border-radius: 5px;
		font-size: 16px;
		
	}
}
.returnBtn{
  position: fixed;
  bottom: 60px;
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

