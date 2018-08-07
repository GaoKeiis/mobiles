
<template>
  <div class="sdetails homes" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
  <div class="main">
  <div class="returnBtn" @click="routerGo()">返回</div>
	<div class="exhibition">
		<div class="d_bgimg">
			<img v-lazy=detailsstr.avatar alt="">
		</div>
		<div class="e_ulst">
			<ul>
				<li v-if='detailsstr.video_url == "" || detailsstr.video_image == " "' style="display:none;"><img v-lazy=detailsstr.video_image alt="" style="display:none;">
				<img src="@/static/images/lcon/videoicon.png" class="videoicon" @click="open2" style="display:none;"><video class='videos' style="display:none;" v-lazy=detailsstr.video_url
				></video></li>
				<li v-else><img v-lazy=detailsstr.video_image alt="">
				<img src="@/static/images/lcon/videoicon.png" class="videoicon" @click="open2"><video class='videos' style="display:none;" v-lazy=detailsstr.video_url
				></video></li>
				<li v-for='(imagelist,ind) in detailsstr.image_list' class="lists"><img @click="open3(ind)" v-lazy=imagelist alt=""></li>
			</ul>
		</div>
	</div>
	<div class="d_main main">
		<div class="brief">
			<h5>{{detailsstr.game_service_name}}</h5>
			<p>￥<b>{{detailsstr.per_price}}</b>/小时</p>
		</div>
		<ul class="nain_icon">
			<li v-for='(list,ind) in detailsstr.tag_list'>{{list}}</li>
		</ul>
		<div class="d_score">
			<span v-if='detailsstr.num == 0'>{{detailsstr.service_grade_name}}</span>
			<span v-else>接单<b>{{detailsstr.num}}</b>次</span>
			<div class="star" v-if='detailsstr.star == ""'>
				<el-rate style="display: inline-block;" v-if="isgns==true"
					  v-model="value5"
					  disabled
					  text-color="#ff9900"
					  score-template="{value}">
					</el-rate>
			</div>
			<div class="star" v-else>
				<el-rate style="display: inline-block;" v-if="isgns==true"
					  v-model="value5"
					  disabled
					  show-score
					  text-color="#ff9900"
					  score-template="{value}.0">
					</el-rate>
					<el-rate style="display: inline-block;" v-else
					  v-model="value5"
					  disabled
					  show-score
					  text-color="#ff9900"
					  score-template="{value}">
					</el-rate>
				</div>
			</div>
	</div>
	<div class="release">
		<dl>
			<dt>
				<img v-lazy=detailsstr.avatar alt="">
			</dt>
			<dd>
			<div class="nameflex">
					<h6>{{detailsstr.nick_name}}</h6>
					<span v-if='detailsstr.sex == 1'><img src="@/static/images/lcon/male.png" alt="">{{detailsstr.age}}</span>
					<span v-else style="background:#F62C7C;"><img src="@/static/images/lcon/female.png" alt="">{{detailsstr.age}}</span>
				</div>
				<p @click='voicesFn(detailsstr.audio_duration)'>
					<img class="n_voices" v-lazy=this.srcimg1>
					 <audio class='audioref' id="audiorefs" :src=detailsstr.audio>
	               </audio>
					<span>{{detailsstr.audio_duration}}"</span>
				</p>
			</dd>
		</dl>
		<div class="signicon">
			<p>最高实力<span>{{detailsstr.max_grade_name}}</span></p>
			<p>游戏大区<span>{{detailsstr.service_platform}}</span></p>
		</div>
		<div class="d_content">
			<p>{{detailsstr.remark}}</p>
		</div>
	</div>
	<div class="evaluate" v-if="commentsind !=0">
		<h5>服务评价<span>({{commentsind}})</span></h5>
		<dl v-for='comments in comments'>
			<dt>
				<img v-lazy=comments.avatar alt="">
			</dt>
			<dd>
				<h6>{{comments.nick_name}}</h6>
				<time>{{comments.comment_time}}</time>
				<div class="star">
				<el-rate style="display: inline-block;" v-if="isgnp==true"
					  v-model="valuen"
					  disabled
					  show-score
					  text-color="#ff9900"
					  score-template="{value}.0">
					</el-rate>

					<el-rate style="display: inline-block;" v-else
					  v-model="valuen"
					  disabled
					  show-score
					  text-color="#ff9900"
					  score-template="{value}">
					</el-rate>
				</div>
				<p>{{comments.content}}</p>
			</dd>
		</dl>
	</div>
	<div class="evaluate" v-else>
		<h5>服务评价<span>({{commentsind}})</span></h5>
		<div class="nothing">暂无评价</div>
	</div>
	
</div>

<div class="pading" style="z-index: 2010; display:none;" @click="open()">
	<swiper class="swipers" :options="swiperOption" ref="mySwiper" style="position: fixed;top: 50%;transform: translateY(-50%);width: 100%;">
		<swiper-slide class="listsn" :key = ind v-for="(item,ind) in detailsstr.image_list"><img :src=item style="width:100%;">
		</swiper-slide>
	</swiper>
	<video class='videoe' @click="open()" style="display:none;width:100%; height:71%; position:fixed;right: 0;left: 0;top:0;bottom: 0;margin:auto;" :src=detailsstr.video_url></video>
	</div>

<div class="v-modal" @click="open()" tabindex="0" style="z-index: 2000; display:none;opacity:1;">
	
</div>
<footer class="foot" @click="footFn()">
	下单
</footer>
</div>
</template>

<script>

export default {
  name: 'sdetails',
  data () {
    return {
    	srcimg1:require("@/static/images/lcon/voiceicon1.png"),
    	srcimg2:require("@/static/images/lcon/voiceicon2.png"),
    	srcimg3:require("@/static/images/lcon/voiceicon3.png"),
    	isgn:false,
    	isgns:false,
    	isgnp:false,
    	loading:true,
    	value5:0,
    	valuen:1,
    	detailsstr:[],
    	comments:[],
    	commentsind:"",
    	tmitseconds:"",
    	durations:"",
    	serviceId:"",
    	swiperOption: {
	       notNextTick: true,	
	       pagination: '.swiper-pagination',
	       lazyLoading : true,
	       preloadImages:false,
	        initialSlide :0,
		    observer:true,//修改swiper自己或子元素时，自动初始化swiper
		    observeParents:true//修改swiper的父元素时，自动初始化swiper
	     },
	     onSlideChangeEnd: swiper => {  
            this.page = swiper.realIndex+1;  
            this.index = swiper.realIndex;  
        }  
    }
  },
   computed: {  
    swiper() {  
      return this.$refs.mySwiper.swiper;  
    }  
},  
  components: {},
  created () {
  	
  	this.getcode();
  },
  methods:{
   GetParam(url, id) {
            url = url+ "";
            let regstr = "/(\\?|\\&)" + id + "=([^\\&]+)/",
            reg = eval(regstr),//eval可以将 regstr字符串转换为 正则表达式
            result = url.match(reg);//匹配的结果是：result[0]=?sid=22 result[1]=sid result[2]=22。所以下面我们返回result[2]
            if (result && result[2]) {
                return result[2];
            }
        },
  	 getcode(){
  	  let verif = JSON.parse(localStorage.getItem('verification'));
      if(verif == "" || verif==null){ 
         let aidUrl =window.location.href;
        if(aidUrl.indexOf("code")<0){
        }else{
       var aId =  this.GetParam(aidUrl,"code"),
       	   redirect = this.GetParam(aidUrl,"id");
        this.$http.post("/h5/esport-api/v1/baidu/authcode_to_uid",{'auth_code':aId,"redirect_url":"http://m.pw.dui1dui.com/#/sdetails?id="+redirect},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.data!=""){ 
                  let detailsstr = response.body.data;
                   let verification={
                      access_token:detailsstr.access_token,
                      user_name:detailsstr.user_name,
                      uid:detailsstr.uid
                    }
                   localStorage.setItem('verification', JSON.stringify(verification));
                   let userToken = {
                          user_token:detailsstr.user_token,
                        }
                localStorage.setItem('userToken', JSON.stringify(userToken));
                this.getjsonFn();
                }else{
	             	this.$alert('服务器异常，请重新加载');
	               $('.el-message-box__btns button').css('background',"#fff");
	               $('.el-message-box__btns button').css('border',0);
	               $('.el-message-box__header button').css('display','none')
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
       		this.getjsonFn();
    	}      
  },
  	footFn(){
  		this.$router.push({path:'/place',query:{userToken:this.detailsstr.user_token,account:this.detailsstr.weixin_account,serviceId:this.serviceId,serviceName:this.detailsstr.game_service_name}})
  	},
  	routerGo(){
     	 this.$router.push({path:'/'});
  	},
  	getjsonFn(){
  		let id = this.$route.query.id;
  		this.$http.post("/h5/esport-api/v1/service/service_detail2",{'user_game_service_id':id},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.data!=""){	
                  this.loading = false;
                  this.detailsstr = response.body.data;
                  this.serviceId = this.detailsstr.game_service_id;
                  var reg = /.*\..*/;
                  	this.value5 = this.detailsstr.star*1
                  	if(reg.test(this.value5) == false){
                  		
                  		this.isgns = true;	
                  	}else{
                  		this.isgns = false;	
                  	}
                  if(this.detailsstr.tag_list.length>3){
                  	this.detailsstr.tag_list.length=3
                  }
                  if(this.detailsstr.nick_name.length > 7){
                  	$(".release dd h6").addClass("nowraps")
                  }
                }else{
                	this.alertFn('服务器异常，请重新加载');
                }
               
              },
              (error)=>{
                console.log(error);
              })

  		this.$http.post("/h5/esport-api/v1/order/list_order_service_comment",{'user_game_service_id':id},{emulateJSON: true}).then(
              (response)=>{
                  this.comments = response.body.data;
                  this.commentsind = this.comments.length;
                  if(this.comments!=""){
                  for(let i = 0;i<this.commentsind;i++){
						this.valuen = this.comments[i].star*1;
						 var reg = /.*\..*/;
		                  	if(reg.test(this.valuen) == false){
		                  		this.isgnp = true;	
		                  	}else{
		                  		this.isgnp = false;	
		                  	}
                  	}                  	
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
  	voicesFn(audioDuration){
  	 	clearInterval(this.timers);
  	  clearInterval(this.durations);
      let audiorefs = $('#audiorefs'),
      	  nvoices = document.getElementsByClassName('n_voices')[0];
      if (this.isgn == false) {
        	  let duration = Math.ceil(audiorefs[0].duration);
     		 if(audioDuration == 0){
     		 	this.alertFn('服务者没有留言');
          }else{
          	 this.isgn = true;
        		audiorefs[0].play();
             this.playFn(duration);
          }
        }else{
          clearInterval(this.timers);
          audiorefs[0].pause();
         nvoices.src = this.srcimg1;
         
         this.isgn = false;
        }
    },
    playFn(duration){
    	let nvoices = document.getElementsByClassName('n_voices')[0];
    	let arr = [this.srcimg3,this.srcimg2,this.srcimg1];
    	var n = 0;
          this.timers = setInterval(()=>{
            nvoices.src = arr[n];
            n++;
            if (n == 3) {
              n = 0;
            };
          },400);
          this.durations = setInterval(()=>{
		        duration--;
		        if(duration<=0){
		           clearInterval(this.timers);
		           nvoices.src = this.srcimg1;
		        }
		      },1000)
    },
  	open(){
  		if($('.v-modal').css('display') == "block"){
  			$('.v-modal').css('display',"none");
       		$('.pading').css('display',"none");
       		if($('.pading video')[0]!=undefined){
       			$('.pading video')[0].pause();
       		}
  		}
  	},
  	open2() {
  		$('.v-modal').css('display',"block");
       	$('.pading').css('display',"block");
       	$('.pading .videoe').css("display","block");
       	$('.pading .videoe')[0].play();
       	$('.pading .swipers').css("display","none");
       	
       	if($('.v-modal').css('display') == 'none'){
       		$('.pading video')[0].pause();
       	}
      },
      open3(i){
      	$('.pading .swipers').css("display","block");
  		$('.pading .videoe').css("display","none")
   		$('.v-modal').css('display',"block");
   		$('.pading').css('display',"block");
   		this.swiper.slideTo(i, i, false);
		
      }
  },
  // 组件摧毁前
  beforeDestroy(){
    clearInterval(this.timers);
    clearInterval(this.durations);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.e_ulst{
	width: 100%;
	position: absolute;
	bottom:12px;
	ul{
	  display: -webkit-box;
            white-space: nowrap;
            overflow: hidden;
            -webkit-backface-visibility: hidden;
            -webkit-perspective: 1000;
            -webkit-overflow-scrolling: touch;
            text-align: justify;
            overflow-x: initial;
		li{	

			position: relative;
			padding-left: 8px;
			width:90px;
			height:90px;
			img{
				width: 100%;
				border-radius: 6px;
				height: 100%;
			}
		}
	}
}
.exhibition{
	position: relative;
}
.exhibition .videoicon{
	position: absolute;
	  left: 0;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  margin: auto;
	  z-index: 1;
	  height: 36px;
	  width: auto;
}
.d_bgimg{
	img{
		width: 100%;
	}
}
.d_main{
	padding:20px 15px;
	border-bottom: 6px solid #F5F5F5;
}
.nain_icon{
		padding: 15px 0;
		display: flex;
		align-content: center;
		li{
			font-size: 1.4rem;
			white-space: nowrap;
			height: 25px;
			line-height: 25px;
			padding:4px 14px 0 14px;
			color: #2580E7;
			border:1px solid #2480E4;
			border-radius: 40px; 
			margin-right: 10px;
		}
}
.brief{
	justify-content:space-between;
	display: flex;
	h5{
		font-size: 1.8rem;
		color: #151516;
	}
	p{
		color: #FF4F0C;
		font-size: 1.4rem;
		b{
			font-size: 2rem;
		}
	}
}
.d_score{
	display: flex;
	justify-content:space-between;
	span{
		font-size: 1.4rem;
		color: #999999;
		b{
			font-weight: normal;
		}
	}
}
.release{
	padding: 15px 0;
	border-bottom: 6px solid #F5F5F5;
	dl{
		display: flex;
		dt{
			padding: 0 10px 0 20px;
			width: 60px;
			height: 60px;
			img{
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
		}
		dd{
			white-space: nowrap;
			h6{
				font-size: 1.4rem;
				margin-right: 6px;
			}
			span{
				padding: 0 10px;
				background:rgba(44,114,246,1);
				border-radius: 6px;
				font-size: 1.45rem;
				color: #fff;
				img{
					margin-top: 6px;
					height: 12px;
					padding-right: 3px;
				} 
			}
			p{
				margin: 12px 0;
				display: flex;
				justify-content: space-between;
				background:linear-gradient(90deg,rgba(50,133,255,1),rgba(43,140,228,1));
				border-radius: 0px 39px 39px 56px;
				color: #fff;
				width: 116px;
				height: 30px;
				font-size: 1.4rem;
				display: flex;
				img{
					margin-top: 8px;
					margin-left: 18px;
					height: 14px;
				}
				span{
					line-height: 30px;
					margin-right: 20px; 
					border-radius: 0px 39px 39px 39px;
					padding: 0;
					background:linear-gradient(90deg,rgba(50,133,255,1),rgba(43,140,228,1));
				}
			}
		}
	}
}
.nameflex{
	display: flex;
}
.signicon{
	padding: 8px 17px;
	display: flex;
	p{
		flex:1;
		white-space: nowrap;
		font-size: 1.2rem;
		padding-right: 26px;
		color: #666666;
		span{
			padding-left: 6px;
			font-size: 1.4rem;
			color: #151516;
			font-weight: bold;
		}
		&:nth-child(1){
			justify-content: center;
			padding-right: 55px;
		}
		&:nth-child(2){
			text-indent: -55px;
			white-space: normal;
		}
	}
}
.d_content{
	padding: 14px 17px;
	p{
		font-size: 1.4rem;
	}
}
.evaluate{
	h5{
		padding: 10px 15px;
		color: #151516;
		font-size: 1.4rem;
	}
	dl{
		padding: 15px 20px 15px 20px;
		display: flex;
		dt{
			width: 40px;
			height: 40px;
			img{
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
		}
		dd{
			position: relative;
			flex:1;
			padding-left: 10px;

			h6{
				font-weight: normal;
				color: #666666;
				font-size: 1.5rem;
			}
			time{
				color: #999999;
				font-size: 1.2rem;
				position: absolute;
				right: 0;
				top:0;
			}
			p{
				padding-top: 6px;
				color: #151516;
				font-size: 1.6rem;
			}
		}
	}
}
.nothing{
	text-align: center;
	padding: 15px 0 70px 0;
	font-size: 1.4rem;
	font-weight: bold;
}
.star{
	white-space: nowrap;
	color: #ff9900;
	font-size: 1.2rem;
}
.foot{
	/*position: fixed;
	bottom: 60px;
	right: 0;
	width: 34%;*/
	padding: 10px 0;
	text-align: center;
	background:rgba(50,133,255,1);
	color: rgba(255,255,255,1);
	font-size: 1.6rem;
}
.nowraps{
	width: 80px;
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.listsn{
	text-align: center;
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
}
</style>

