<template>
  <div class="orderlist homes" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="or_home main">
      <p>您现在还没有订单呦~~~快去下单吧</p>
        <span @click="open">联系客服</span>
    </div>
    <div class="or_content main">
      <div class="or_main" v-for='(order,ind) in getorders' >
        <dl @click="contentFn()">
          <dt>
            <img v-lazy=order.avatar alt="">
          </dt>
          <dd>
            <div class="or_tit"> 
              <h6 v-if="order.nick_name.length>7" class="nowraps">{{order.nick_name}}</h6>
              <h6 v-else>{{order.nick_name}}</h6>
              <p>微信:<span>{{order.weixin_account}}</span></p>
            </div>
            <p>服务类型：<span>{{order.service_name}}</span></p>
            <div>
                <p><span>{{order.big_area}}</span> | <span>{{order.grade_name}}</span> | <span>{{order.dan}}[</span><span>{{order.money/order.num}}</span>元/{{order.price_unit}}] | <span>{{order.num}}</span>{{order.price_unit}}</p>
            </div>
            <ul class="dots">
              <li @click="open">联系客服</li>
              <li v-if = "order.order_status!=6"><router-link :to="{path:'/cancel',query: {tokens:tokens,order_no:order.order_no}}">取消订单</router-link></li>
              <li v-if = "order.order_status==3 || order.order_status==4"><router-link :to="{path:'/complaint',query: {tokens:tokens,order_no:order.order_no}}">投诉订单</router-link></li>
            </ul>
          </dd>
        </dl>
        <ul class="dot" @click="dotFn(ind)">
                <li></li>
                <li></li>
                <li></li>
          </ul>
        <div class="ordernumber" @click="contentFn()">
          <ul>
            <li>订单号:<span>{{order.order_no}}</span></li>
            <li>总价:<span>{{order.money}}</span>元</li>
          </ul>
        </div>
        <div class="timestate" @click="contentFn()">
            <time>{{order.order_time}}</time>
            <span v-if='order.order_status==1'>待支付</span>
            <span v-else-if='order.order_status==2'>待接单</span>
            <span v-else-if='order.order_status==3'>进行中</span>
            <span v-else-if='order.order_status==4'>已完成</span>
            <span v-else-if='order.order_status==5'>客服处理中</span>
            <span v-else-if='order.order_status==6'>已取消</span>
        </div>
        </div>
    </div>
    <div class="foot">
      <dl @click='routerGo()'>
        <dt><img src="../../static/images/lcon/home1.png" alt=""></dt>
        <dd>首页</dd>
      </dl>
       <dl @click='orderFn()'>
        <dt><img src="../../static/images/lcon/order2.png" alt=""></dt>
        <dd>订单</dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderlist',
  data () {
    return {
      getorders:'',
      getordern:"",
      tokens:"",
      loading:true
    }
  },
  components: {},
  created () {
    this.getcode();
  },
   updated(){
      for(let i = 0; i<$("a").length;i++){
       if($("a").eq(i).attr("target") == "_blank"){
         $("a").eq(i).css("visibility","hidden")
      }
    }
  },
  methods:{
    routerGo(){
       this.$router.push({path:'/'})
    },
     GetParam(url, id) {
            url = url+ "";
            let regstr = "/(\\?|\\&)" + id + "=([^\\&]+)/",
            reg = eval(regstr),//eval可以将 regstr字符串转换为 正则表达式
            result = url.match(reg);
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
         var aId = this.GetParam(aidUrl,"code");
          this.$http.post("/h5/esport-api/v1/baidu/authcode_to_uid",{'auth_code':aId,"redirect_url":"http://m.pw.dui1dui.com/#/orderlist"},{emulateJSON: true}).then(
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
                  this.getorder();
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
      this.getorder();
    }
  },
    contentFn(){
      $('.dots').each(function(i,val){
         if($('.dots').eq(i).css('display') == 'block'){
          $('.dots').eq(i).css('display','none')
        }
      })
    },
    getorder(){
      let userToken = JSON.parse(localStorage.getItem('userToken'));
        this.tokens = userToken.user_token;
        this.$http.post("/h5/esport-api/v1/order/list_order_record",{'user_token':this.tokens,"role_type":1,"type":1,"page_no":1,"page_size":10},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.code==2000){
                  this.getordern = response.body.data;
                  if(this.getordern!=""){
                    this.loading = false;
                    this.getorders = this.getordern;
                    $(".or_home").css("display","none");
                    $(".or_content").css("display","block");
                  }else{
                    this.loading = false;
                    $(".or_home").css("display","block");
                    $(".or_content").css("display","none");
                  }
                }else{
                  this.loading = false;
                  $(".or_home").css("display","block");
                  $(".or_content").css("display","none");
                }
              },
              (error)=>{
                console.log(error);
              })
    },
    dotFn(ind){
       if($('.dots').eq(ind).css('display') == 'none'){
          $('.dots').eq(ind).css('display','block');
          $('.dots').eq(ind).parents(".or_main").siblings().find('.dots').css("display","none")
        }

    },
      open() {
        const h = this.$createElement;
        this.$msgbox({
          title: '联系客服',
          center: true,
          message: h('div', null, [
            h('p', null, '联系QQ：2796640267'),
            h('p', null, '工作时间：9:00~20:00')
          ]),
           confirmButtonText: '知道了',
         });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.orderlist{
  height: 100%;
}
	.or_content{
    display: none;
    dl{
      display: flex;
      padding: 18px 15px;
      dt{
        padding-right: 16px;
        width: 60px;
        height: 60px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
      }
      dd{
        p{
          color: #999999;
          font-size: 1.4rem;

        }
      }
    }
  }
 .or_main .or_tit{
    white-space: nowrap;
    padding-bottom: 10px;
    display: flex;
     h6{
          color: #151516;
          font-size: 1.5rem;
          
        }
        p{
          font-size: 1rem;
          margin-left: 9px;
          border-radius: 4px;
          background: #81D740;
          padding: 6px 8px 2px 8px;
          color: #151516;
        }
  }
  .or_main{
     position: relative;
      padding-bottom:6px; 
    border-bottom: 5px solid #F5F5F5;
  }
  .dot{
    position: absolute;
    right: 0;
    top:0;
    padding: 26px;
    li{
      width:3px;
      height:3px; 
      background:rgba(51,51,51,1);
      margin-bottom: 2px;
    }
  }
  .ordernumber{
    padding:  0px 15px 10px 15px;
    border-bottom:1px dashed #F3F3F3; 
    ul{
      display: flex;
      justify-content:space-around;
      li{
        white-space: nowrap;
        flex:1;
        color: #999999;
        font-size: 1.2rem;
        &:nth-child(2){
          color:#151516;
          font-size: 1.4rem;
          text-align: right;
          margin-right: 10px;
        }
      }
    }
  }
  .timestate{
    padding: 10px 15px 3px 15px;
    display: flex;
    justify-content:space-around;
    color: #999999;
    time{
      flex:1;
      font-size: 1.2rem;
    }
    span{
      flex:1;
      color: #3285FF;
      font-size: 14px;
       text-align: right;
      margin-right: 10px;
    }
  }
  .dots{
    display: none;
    position: absolute;
    right: 5%;
    top: 20%;
    padding: 10px 12px; 
    background:rgba(255,255,255,1);
    box-shadow: 0px 4px 8px 0px rgba(40,40,40,0.2);
    z-index: 20;
    li{
      padding: 4px 0;
      color: #666666;
      font-size: 14px;
      border-bottom: 1px solid #EEEEEE; 
      &:nth-child(3){
        border-bottom:0;
        padding-bottom: 0;
      }
    }
  }
.nowraps{
  width: 82px;
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.or_home{
  display: none;
 text-align: center;
    p{
     padding-top: 50%;
       text-align: center;
      font-size: 1.6rem;
      font-weight: bold;
      padding-bottom: 30px;
    }
    span{
        border-radius: 6px;
        padding: 10px 40px;
        background: #3285ff;
        font-size: 1.6rem;
        color: #fff;
    }
}
.foot{
  display: flex;
  justify-content: space-around;
  padding: 6px 0;
  dl{
    dt{
      height: 26px;
      img{
        height: 100%;
      }
    }
    dd{
      font-size: 1.2rem;
      text-align: center;
    }
  }
}
</style>

