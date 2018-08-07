<template>
  <div class="confirm homes">
  	<div class="main con_letter">
    <div class="returnBtn" @click="routerGo()">返回</div>
  		<h4>订单信息</h4>
  		<dl class="letrens">
  			<dt><img :src=placelist.avatar alt=""></dt>
  			<dd>
          <div class="ddflex">
            <h6>{{placelist.nick_name}}</h6>
            <div class="accouts">微信号:<span>{{account}}</span></div>
          </div>
  				<p>服务类型：<span>{{serviceName}}</span></p>
  				<p><span>{{area}}</span> | <span>{{paragraph}}</span> | <span>{{service}}</span>局</p>
  			</dd>
  		</dl>
  		<div class="ordermode">
  			<h5>选择支付方式</h5>
  			<ul>
  				<li><img src="@/static/images/lcon/alipay.png" alt=""></li>
  				<li><span>支付宝支付</span></li>
  				<li><el-checkbox v-model="checked"></el-checkbox></li>
  			</ul>
  		</div>
  	</div>

  	<footer class='c_foot'>
  		<h6>合计：<span>{{otalPrice}}</span>元</h6>
		<p @click="clickroute()">确认下单</p>
  	</footer>
  </div>

</template>

<script>

export default {
  name: 'playlist',
  data () {
    return {
    	checked: true,
    	area:"",
    	paragraph:"",
    	service:"",
    	otalPrice:"",
    	placelist:"",
    	userToken:"",
    	serviceName:"",
      serviceId:"",
    	account:""
    }
  },
  components: {},
  created () {
  	this.getconfim();
  },
  methods:{
  	clickroute(){
  		if(this.checked == true){
         let users = JSON.parse(localStorage.getItem('userToken'));
        let paragraph = this.$route.query.paragraph,
            service = this.$route.query.service,
            otalPrice = this.$route.query.otalPrice,
            serviceId = this.$route.query.serviceId,
            userToken = this.$route.query.userToken,
            large_area = this.$route.query.area;
             location.href = "/h5/esport-api/v1/baidu/make_order?user_token="+users.user_token+"&large_area="+large_area+"&grade_name="+paragraph+"&num="+service+"&service_user_token="+userToken+"&service_id="+serviceId+"&pay_type="+1+"&source="+3+"&money="+otalPrice+"&client_type=1";
  		}else{
  			  this.$alert('请选择支付方式');
               $('.el-message-box__btns button').css('background',"#fff");
               $('.el-message-box__btns button').css('border',0);
               $('.el-message-box__header button').css('display','none')
               $(".v-modal").css("display","block");
              $(".el-message-box__wrapper").css("display","block");
             setTimeout(function(){
              $(".v-modal").css("display","none");
              $(".el-message-box__wrapper").css("display","none");
              
             },2000)
  		}
  	},
    routerGo(){
      this.$router.go(-1);
    },
  	getconfim(){
          let serviceId = this.$route.query.serviceId,
              large_area = this.$route.query.area,
              paragraph = this.$route.query.paragraph;
  				this.account = this.$route.query.account;
  				this.userToken = this.$route.query.userToken;
  				this.paragraph = this.$route.query.paragraph;
  				this.service = this.$route.query.service;
  				this.otalPrice = this.$route.query.otalPrice;
  		this.$http.post("/h5/esport-api/v1/order/fill_order",{'user_token':this.userToken},{emulateJSON: true}).then(
                (response)=>{
                if(response.body.data!=""){	

                  this.placelist = response.body.data;
                  if(this.placelist.nick_name.length>=7){
                      $(".ddflex h6").addClass("nowraps")
                  }
                  for(var i = 0;i<this.placelist.service_list.length;i++){
                    if(serviceId == this.placelist.service_list[i].game_service_id){
                        this.areaFn(i,large_area)
                        this.paragraphFn(i,paragraph)
                        this.serviceName = this.placelist.service_list[i].game_service_name

                    }
                  }
                  
      
                }else{
             this.$alert('服务器异常，请重新加载');
               $('.el-message-box__btns button').css('background',"#fff");
               $('.el-message-box__btns button').css('border',0);
               $('.el-message-box__header button').css('display','none')
               $(".v-modal").css("display","block");
              $(".el-message-box__wrapper").css("display","block");
             setTimeout(function(){
              $(".v-modal").css("display","none");
              $(".el-message-box__wrapper").css("display","none");
              
             },2000)
                }
               
              },
              (error)=>{
                console.log(error);
              })
  	},
    // 大区
    areaFn(i,l){
       for(var s = 0;s<this.placelist.service_list[i].big_area_list.length;s++){
          if(l == this.placelist.service_list[i].big_area_list[s].id){
              this.area = this.placelist.service_list[i].big_area_list[s].name
          }
        }
    },
    // 段位
    paragraphFn(i,p){
      for(var s = 0;s<this.placelist.service_list[i].grade_list.length;s++){
          if(p == this.placelist.service_list[i].grade_list[s].grade_name){
              this.paragraph = this.placelist.service_list[i].grade_list[s].name
          }
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.con_letter{
	padding: 30px 15px;
	h4{
		font-size: 18px;
		color: #151516;
		padding-bottom: 14px;
	}
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
        width:100%;
				height: 100%;
				border-radius: 100%;
			}
		}
		dd{
      white-space: nowrap;
			h6{
        white-space: nowrap;
				color: #151516;
				font-size: 16px;
			}
			p{
		    padding-bottom: 4px;
				color: #999999;
				 font-size: 1.2rem;
			}
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
.ordermode{
	padding: 30px 10px 0 10px;
	h5{
		color: #151516;
		font-size: 1.8rem;
	}
	ul{
		padding-top: 20px;
		display: flex;

		li{
			line-height: 45px;
			&:nth-child(1){
				padding-right:9px;
				height: 50px;
				img{
				height: 100%;
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
  position:fixed;
  bottom: 60px;
  right: 10px;
 
  display: flex;
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  h6{
    padding-right: 20px;
    color: #151516;
    font-size: 16px;
  }
  p{
    margin-right: 10px;
    background: #3285FF;
    color: #fff;
    padding: 0 14px;
    border-radius: 5px;
    font-size: 16px;
    
  }
}
.nowraps{
  width: 96px;
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
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

