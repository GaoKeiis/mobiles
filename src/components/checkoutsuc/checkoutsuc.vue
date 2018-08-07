<template>
  <div class="confirm homes">
  	<div class="main con_letter">
  	<div class="returnBtn" @click="routerGo()">返回</div>
  		 <dl class="letrens">
  			<dt><img v-lazy=placelist.avatar alt=""></dt>
  			<dd>
  			 <div class="ddflex">
	            <h6>{{placelist.nick_name}}</h6>
	            <div class="accouts">微信:<span>{{placelist.wechat}}</span></div>
          	</div>
  				<p>服务类型：<span>{{placelist.service_name}}</span></p>
  				<p><span>{{placelist.large_area}}</span> | <span>{{placelist.grade_name}}[{{placelist.money}}/{{placelist.price_unit}}]</span> | <span>{{placelist.num}}</span>{{placelist.price_unit}}</p>
  			</dd>
  		</dl>
  		<div class="succe">
  			<p>您可以点击复制上方的微信号联系大神</p>
  			<div class='succeimg'>
  				<img src="@/static/images/lcon/suces.png" alt="">
  			</div>
  			<div class='sucesPrompt'>
  				<h6>下单成功啦</h6>
  				<p>请留下联系方式，大神会联系你哦~</p>
				  <el-input placeholder="请输入内容" v-model="input5" class="input-with-select inputbod" style="width:80%;">
				    <el-select v-model="select" slot="prepend" placeholder="请选择">
				      <el-option label="QQ" value="1"></el-option>
				      <el-option label="微信" value="2"></el-option>
				    </el-select>
				  </el-input>
  				
  			</div>
  			<div class="dmines">
  				<span @click="dmine()">确定</span>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>

export default {
  name: 'playlist',
  data () {
    return {
    	area:"",
    	paragraph:"",
    	service:"",
    	placelist:"",
    	userId:"",
    	serviceName:"",
    	account:"",
    	 input5: '',
    	select: '',
    	order_no:"" 
    }
  },
  components: {},
  created () {
  	this.getconfim();
  },
  updated(){
      for(let i = 0; i<$("a").length;i++){
       if($("a").eq(i).attr("target") == "_blank"){
         $("a").eq(i).css("visibility","hidden")
		     }
		 }
  	$(".el-input__inner").eq(1).css({"border":"1px solid #dcdfe6","text-align":"left"})
  },
  methods:{
  	routerGo(){
      this.$router.go(-1);
    },
  	getconfim(){
            var reg = new RegExp("(^|&)" + "out_trade_no" + "=([^&]*)(&|$)"); 
            var r = location.href.substr(1).match(reg);  //匹配目标参数
             this.order_no = unescape(r[2]);//unescape(r[2]);
  			let users = JSON.parse(localStorage.getItem('userToken'));
  			// users.user_token
  		this.$http.post("/h5/esport-api/v1/order/order_detail",{'user_token':users.user_token,"order_no":this.order_no},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.data!=""){	
                  this.placelist = response.body.data;
                  if(this.placelist.nick_name.length>=7){
                      $(".ddflex h6").addClass("nowraps")
                  }
                }else{
		             this.$alert('服务器异常，请重新加载');
		               $('.el-message-box__btns button').css('background',"#fff");
		               $('.el-message-box__btns button').css('border',0);
		               $('.el-message-box__header button').css('display','none')
		               $(".v-modal").css("display","block");
		              $(".el-message-box__wrapper").css("display","block");
		             setTimeout(function(){
		               $(".el-message-box__btns button").trigger("click");
		              
		             },2000)
                }
               
              },
              (error)=>{
                console.log(error);
              })
  	},
  	dmine(){
  		if(this.select == "" || this.input5==""){
  			this.$alert('请选择输入你的QQ/微信号');
               $('.el-message-box__btns button').css('background',"#fff");
               $('.el-message-box__btns button').css('border',0);
               $('.el-message-box__header button').css('display','none')
                $(".v-modal").css("display","block");
              $(".el-message-box__wrapper").css("display","block");
             setTimeout(function(){
               $(".el-message-box__btns button").trigger("click");
              
             },2000)
  		}else{
  			 if(this.select == 1){
  			 	var regex = /^[1-9]\d{4,14}$/;
               		if(regex.test(this.input5) == false){
               			this.$alert('QQ号不正确');
		               $('.el-message-box__btns button').css('background',"#fff");
		               $('.el-message-box__btns button').css('border',0);
		               $('.el-message-box__header button').css('display','none')
		               $(".v-modal").css("display","block");
		              $(".el-message-box__wrapper").css("display","block");
		             setTimeout(function(){
		               $(".el-message-box__btns button").trigger("click");
		              
		             },2000)
               		}else{
               			this.$http.post("/h5/esport-api/v1/baidu/send_contact",{'contact_type':this.select,"order_no":this.order_no,"contact_account":this.input5},{emulateJSON: true}).then(
		              (response)=>{
		                if(response.body.data!=""){	
		                  let datas = response.body.data;
		                  	this.$router.push({path: '/orderlist'})
		                }else{
				             this.$alert('服务器异常，请重新加载');
				               $('.el-message-box__btns button').css('background',"#fff");
				               $('.el-message-box__btns button').css('border',0);
				               $('.el-message-box__header button').css('display','none')
				                $(".v-modal").css("display","block");
					              $(".el-message-box__wrapper").css("display","block");
					             setTimeout(function(){
					              $(".el-message-box__btns button").trigger("click");
					              
					             },2000)
		                }
		               
		              },
		              (error)=>{
		                console.log(error);
		              })
               		}
               }else{
	            this.$http.post("/h5/esport-api/v1/baidu/send_contact",{'contact_type':this.select,"order_no":this.order_no,"contact_account":this.input5},{emulateJSON: true}).then(
	              (response)=>{
	                if(response.body.data!=""){	
	                  let datas = response.body.data;
	                  this.$router.push({path: '/orderlist'})
	                }else{
			             this.$alert('服务器异常，请重新加载');
			               $('.el-message-box__btns button').css('background',"#fff");
			               $('.el-message-box__btns button').css('border',0);
			               $('.el-message-box__header button').css('display','none')
			               $(".v-modal").css("display","block");
			              $(".el-message-box__wrapper").css("display","block");
			             setTimeout(function(){
			               $(".el-message-box__btns button").trigger("click");
			              
			             },2000)
	                }
	               
	              },
	              (error)=>{
	                console.log(error);
	              })
	  			// this.$router.push({path: '/orderlist'})
               }
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.con_letter{
	padding: 18px 10px;
}
.inputbod .el-input__inner{
	border: 1px solid #dcdfe6;
}
.letrens{
	display: flex;
		background:rgba(255,255,255,1);
		box-shadow: 0px 4px 10px 0px rgba(40,40,40,0.15); 
		border-radius: 16px;
		padding: 15px 16px; 
		dt{
			padding-right: 20px;
			width: 70px;
			height: 70px;
			img{
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
		}
		dd{
			h6{
				 white-space: nowrap;
				color: #151516;
				font-size: 16px;
				p{
					margin-left: 18px;
					display: inline-block;
					font-size: 1.2rem;
					background: #81D740;
					padding: 6px 8px;
					color: #151516;
					border-radius: 5px;
				}
			}
			p{
				padding-bottom: 3px;
				color: #999999;
				font-size: 14px;
			}
		}
}
.ordermode{
	padding: 30px 10px 0 10px;
	h5{
		color: #151516;
		font-size: 16px;
	}
	ul{
		padding-top: 20px;
		display: flex;

		li{
			line-height: 45px;
			&:nth-child(1){
				padding-right:9px;
				width:16%;
				img{
				width: 100%;
			}
			}
			span{
				font-size: 14px;
				color: #151516;
			}
			&:nth-child(3){
				text-align: right;
				flex:1;
			}
		}
	}
}
.c_foot{
	display: flex;
	justify-content:space-between;
	padding: 26px 10px;
	h6{
		padding-left: 20px;
		color: #151516;
		font-size: 16px;
	}
	p{
			margin: -5px 0;
		background: #3285FF;
		
		padding: 8px 18px;
		border-radius: 5px;
		font-size: 16px;
		a{
			color: #fff;
		}
	}
}
.el-input .el-input__inner{
	border: 0;
	border-bottom: 1px solid #EEEEEE; 
}
.succe{
	text-align: center;
	p{
		padding-top: 15px;
		color: #999999;
		font-size: 1.6rem;
		padding-bottom: 20px;
	}
	.succeimg{
		height: 75px;
		img{
			height: 100%;
		}
	}
}
.sucesPrompt{
	h6{
		color: #151516;
		font-size: 2rem;
		padding-top: 2.2rem;
		padding-bottom: 1.4rem;
	}
	p{
		color: #151516;
		font-size: 1.8rem;
		padding-bottom: 2rem;
	}
	
}
.dmines{
	margin-top: 35px;	
	span{
		padding: 10px 40px;
		background:rgba(50,133,255,1);
		border-radius: 6px ; 
		color: #fff;
		font-size: 1.6rem;
	}
}
.phone{
	padding-bottom: 3rem;
	input{
		width: 50%;
	}
}
.ddflex{
  display: flex;
  padding-bottom: 10px;
}
.accouts{
	  white-space: nowrap;
      margin-left: 8px;
      font-size: 1.2rem;
      background: #81D740;
      padding: 4px 8px;
      color: #151516;
      border-radius: 5px;
}
.nowraps{
  width: 96px;
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
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

