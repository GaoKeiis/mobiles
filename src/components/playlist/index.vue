<template>
  <div class="playlist">
    <div class='homes'>
      <div class="p_tit">
        <ul class="p_uls">
          <li class="p_list" :class="{actives:iscur==ind}" @click='iscur = ind,parentclick(playtitArr.code,ind)' v-for='(playtitArr,ind) in playtit'>
          {{playtitArr.name}}
          <p :class="{active:iscur==ind}"></p>
          </li>
        </ul>
        
      </div>
<div class="kings main">
<div class="returnBtn" @click="routerGo()">返回</div>
   <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
    <div class="kings_list">
        <div class="lings_dl" v-for="(listarr,ind) in codelits" @click="getcode('/sdetails',listarr.user_game_service_id)">
            <dl>
                  <dt>
                    <img v-lazy=listarr.avatar alt="">
                  </dt> 
                  <dd>
                    <div class="play_tit">
                      <p>{{listarr.nick_name}}</p>
                    </div>
                    <div class="paly_con">
                      <p v-if='listarr.service_num == 0'>{{listarr.service_grade_name}}</p>
                      <p v-else>接单<b>{{listarr.service_num}}</b>次</p>
                      <span>￥<b>{{listarr.per_price}}</b>/小时</span>
                    </div>
                     
                  </dd>
                </dl>
                <div class="lingImg">
                  <img src="@/static/images/lcon/voices.png" class="voiceimg" @click='voicesFn(listarr)'>
                    <audio class='audiorefs'>
                      <source :src=listarr.audio type="audio/mpeg">
                   </audio>
                </div>
                 
           </div>
        </div>
        </v-scroll>
      </div>
  </div>
</div>
</template>

<script>
import api from '@/api/api';
import Scroll from './swipers.vue';
export default {
  name: 'playlist',
  data () {
    return {
      playtit:[],
      playtitcode:"",
      activeName: 0,
      srcimg: require("@/static/images/lcon/voices.png"),
      srcimg1:require("@/static/images/lcon/s1.png"),
      srcimg2:require("@/static/images/lcon/s2.png"),
      srcimg3:require("@/static/images/lcon/s3.png"),
      timers:'',
      codelits:[],
      clicktext:"",
      iscur:0,
      durations:'',
      counter : 2, //默认已经显示出15条数据 count等于一是让从16条开始加载
      num : 10,  // 一次显示多少条
      pageStart : 0, // 开始页数
      pageEnd : 0, // 结束页数
      listdata: [], // 下拉更新数据存放数组
      downdata: []  // 上拉更多的数据存放数组
    }
  },
  components: {
    'v-scroll': Scroll
  },
  created () {
    this.parentFn();
  },
  updated(){
    this.alphabet();
  },
  methods:{
    getcode(paths,id){
        localStorage.removeItem("verification");
        localStorage.removeItem("userToken");
       let verif = JSON.parse(localStorage.getItem('verification'));
      if(verif == "" || verif==null){
          window.location.href = "https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=86ENSUXs8xRN9RX37UC5VhrB&redirect_uri="+encodeURIComponent("http://m.pw.dui1dui.com#"+paths+"?id="+id)+"&scope=basic&display=mobile";
    }
  },
    getList(){
      this.$http.post("/h5/esport-api/v1/service/list_play_game_service",{'menu_code':this.playtitcode,'page_no':1,'page_size':this.num},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.data!=""){
                  $(".load-more span").html("加载中...");
                  $(".load-more").css("display","flex");
                  this.counter = 2;
                  this.codelits = response.body.data;
                  clearInterval(this.timers);
                  clearInterval(this.durations);
              let voiceimg = document.getElementsByClassName('voiceimg'),
                   lings = document.getElementsByClassName('lings_dl');
                    this.codelits.forEach((m,i)=>{
                      if(lings[i]!=undefined){
                        lings[i].getElementsByClassName('audiorefs')[0].pause();
                        voiceimg[i].src = this.srcimg;
                      }
                    })
                }else{
                  this.alertFn('服务器异常，请重新加载');
                }
               
              },
              (error)=>{
                console.log(error);
              })
     },
    routerGo(){
      this.$router.go(-1);
    },
        // 弹框
    alertFn(tit){
        this.$confirm(tit);
       //  $('.el-message-box__btns button').css('background',"#fff");
       //  $('.el-message-box__btns button').css('border',0);
       //  $('.el-message-box__header button').css('display','none')
       //  $(".v-modal").css("display","block");
       //  $(".el-message-box__wrapper").css("display","block");
       // setTimeout(function(){
       //  $(".v-modal").css("display","none");
       //  $(".el-message-box__wrapper").css("display","none");
        
       // },2000)
    },
    onRefresh(done) {
         this.getList();
         done() // call done
      
    },
    onInfinite(done) {
        this.$http.post("/h5/esport-api/v1/service/list_play_game_service",{'menu_code':this.playtitcode,'page_no':this.counter,'page_size':this.num},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.data!=""){
                  this.counter++;
                 done()
                  let codelitsjson = response.body.data;
                  clearInterval(this.timers);
                  clearInterval(this.durations);
              let voiceimg = document.getElementsByClassName('voiceimg'),
                   lings = document.getElementsByClassName('lings_dl')
                    codelitsjson.forEach((m,i)=>{
                      this.codelits.push(m);
                      if(lings[i]!=undefined){
                        lings[i].getElementsByClassName('audiorefs')[0].pause();
                        voiceimg[i].src = this.srcimg;
                      }
                    })
                 
                }else{
                   $(".load-more span").html("数据已加载完");
                  if($(".load-more span").text() == "数据已加载完"){
                       setTimeout(()=>{
                          $(".load-more").css("display","none");
                            done()
                       },2000)
                     
                  }
                }
              },
              (error)=>{
                console.log(error);
              })
      
     },
    alphabet(){
       this.codelits.forEach((m,i)=>{
          if(m.audio == ""){
            $(".lingImg").eq(i).css("display","none")
          }
        })
    },
     parentclick(code,ind) {
      this.playtitcode = code;
       $('.p_uls li').eq(ind).addClass('actives').siblings().removeClass('actives');
        $('.p_uls li p').eq(ind).addClass('active').parent("li").siblings().find("p").removeClass('active');
         this.condeFn(this.playtitcode)
      },
  parentFn(){
      let parent = this.$route.query.parent;
      this.$http.post("/h5/esport-api/v1/system/sub_menu_list",{'parant_code':parent},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.data!=""){
                  console.log(response)
                  this.playtit = response.body.data;
                  this.playtitcode = this.playtit[0].code;
                  this.condeFn(this.playtitcode)
                }else{
             this.alertFn('服务器异常，请重新加载');
                }
               
              },
              (error)=>{
                console.log(error);
              })
  },
    condeFn(playtitcode){
        this.$http.post("/h5/esport-api/v1/service/list_play_game_service",{'menu_code':this.playtitcode,'page_no':1,'page_size':10},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.data!=""){
                  this.codelits = response.body.data;
                  clearInterval(this.timers);
                  clearInterval(this.durations);
              let voiceimg = document.getElementsByClassName('voiceimg'),
                   lings = document.getElementsByClassName('lings_dl')
                    this.codelits.forEach((m,i)=>{
                      if(lings[i]!=undefined){
                        lings[i].getElementsByClassName('audiorefs')[0].pause();
                        voiceimg[i].src = this.srcimg;
                      }
                    })
                }else{
             this.alertFn('服务器异常，请重新加载');
                }
               
              },
              (error)=>{
                console.log(error);
              })
    },
    voicesFn(obj){
       clearInterval(this.timers);
      clearInterval(this.durations);
        let audiorefs = document.getElementsByClassName('audiorefs'),
            voiceimg = document.getElementsByClassName('voiceimg');
        let lings = document.getElementsByClassName('lings_dl');
        this.codelits.forEach((m,i)=>{
          if(obj.user_game_service_id == m.user_game_service_id && (this.clicktext != obj.user_game_service_id || this.clicktext == '')){
            this.clicktext = obj.user_game_service_id;
            
             let duration = Math.ceil(audiorefs[i].duration);
                // 开始当前音频
                audiorefs[i].play();
               this.playFns(i,duration);
          }else{
            if(this.clicktext == obj.user_game_service_id  && obj.user_game_service_id == m.user_game_service_id){
              this.clicktext = "";
            }
            lings[i].getElementsByClassName('audiorefs')[0].pause();
            voiceimg[i].src = this.srcimg;
          }
        });
    },
    //音频播放
    playFns(ind,duration){
      var n = 0;
      let arr = [this.srcimg1,this.srcimg2,this.srcimg3];
      this.timers = setInterval(()=>{
        $('.voiceimg').eq(ind).attr("src",arr[n])
        n++;
        if (n == 3) {
          n = 0;
        };
      },400)
       this.durations = setInterval(()=>{
        duration--;
        if(duration<=0){
           clearInterval(this.timers);
           $('.voiceimg').eq(ind).attr("src",this.srcimg)
        }
      },1000)
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
  .p_tit{
     padding: 10px 10px 3px 10px;
    ul{
      text-align: center;
      display: -webkit-box;
      white-space: nowrap;
      overflow: hidden;
      -webkit-backface-visibility: hidden;
      -webkit-perspective: 1000;
      -webkit-overflow-scrolling: touch;
      text-align: justify;
      overflow-x: initial;
      overflow: hidden;
      overflow-x: scroll;
      li{
        position: relative;
        padding-bottom: 5px;
        margin-right: 20px; 
        white-space: nowrap;
        color: #999999;
        font-size: 1.5rem;
        a{
          padding-bottom: 4px;
        }
        p{
          margin-top: 10px; 
        }
      }
    }
  }
    .p_tits{
     padding: 10px 10px 3px 10px;
       ul{
          display: flex;
          align-items: center;
          text-align: center;
          li{
            flex:1;
            position: relative;
            padding-bottom: 5px;
            white-space: nowrap;
            color: #999999;
            font-size: 1.5rem;
            a{
              padding-bottom: 4px;
            }
            p{
              margin-top: 10px; 
            }
          }
       }
    }
   .p_tit .actives,.p_tits .actives{
    color: #151516;
   }
   .p_tits .active{
     border-bottom: 2px solid #151516;
      font-weight: bold;
      margin: 8px 25px 0 25px;
  }
 .p_tit .active{
      border-bottom: 2px solid #151516;
      font-weight: bold;
      margin: 8px 15px 0 15px;
  }
  .lings_dl{
     &:nth-child(odd){
          margin-right: 12px;
        }
        position: relative;
        display: inline-block;
         width: 48%;
      dl{
       
        background:rgba(255,255,255,1);
        box-shadow: 0px 2px 20px 0px rgba(0,0,0,0.12); 
        border-radius: 6px; 
        margin-bottom: 10px;
        dt{
          img{
            border-radius: 6px 6px 0 0; 
            width: 100%;
            height: 164px;
          }
        }
      }
}
.lingImg{
      position: absolute;
      right: 9px;
      top: 9px;
      img{
        height: 30px;
      }
}
    .kings_list{
      padding: 0 10px; 
      
    }
    .play_tit{
        padding: 0 1.2rem;
      p{
        padding-top: 6px;
        font-size: 1.4rem;
        color:#151516;
      }
    }
    .paly_con{
      display: flex;
      justify-content:space-around;
       white-space: nowrap;
      padding: 0 1.2rem 8px 1.2rem;
       p{
        flex:1;
        padding-top: 9px;
        font-size: 12px;
        color:#999999;
        b{
          font-weight: normal;
        }
      }
      span{

        padding-top: 7px;
        font-size: 10px;
        color:#FF4F0C;
        b{
          font-size: 18px;
        }
      }
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

