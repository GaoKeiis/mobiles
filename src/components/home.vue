<template>
  <div class="homepage homes">
    <div class="p_tit">
      <ul class="p_uls">
        <li class="p_list" :class="{actives:iscur==ind}" @click='iscur = ind,parentclick(playtitArr.code,ind,playtitArr.name)' v-for='(playtitArr,ind) in playtit'>
        {{playtitArr.name}}
        </li>
      </ul>
      <div class="page_list" v-if="menu.length == 2">
        <p v-for="(menu,ind) in menu" @click='menuFn(ind,menu.code,menu.name)' :class="{bgblues:menuInd==ind}">{{menu.name}}</p>
      </div>
       <div class="page_list" v-else>
        <span v-for="(menu,ind) in menu" @click='menuFn(ind,menu.code,menu.name)' style="background: #3285ff; display:block;">{{menu.name}}</span>
      </div>
      
    </div>
    <section class="h_main main">
    <div v-if='playtitName != "推荐"'>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
      <div class="kings_list" v-if='menuName == "美女陪玩"'>
        <div class="lings_dl" v-for="(listarr,ind) in codelits">
            <dl @click="getcode('/sdetails',listarr.user_game_service_id)">
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
                  <img src="@/static/images/lcon/voices.png" class="voiceimg" @click='voicesFns(listarr)'>
                    <audio class='audiorefs'>
                      <source :src=listarr.audio type="audio/mpeg">
                   </audio>
                </div>
           </div>
        </div>
         <div class="kings_list" v-else>
          <div class="play_dl play_dls" style="display:inline-block;" v-for="(listarrs,ind) in codelits">
             <dl @click="getcode('/sdetails',listarrs.user_game_service_id)">
                <dt>
                  <img v-lazy=listarrs.avatar alt="" class="sparringimg">
                </dt>
                <dd>
                   <div class="play_tit" style="display: block;">
                      <p>{{listarrs.nick_name}}</p>
                    </div>
                 <div class="paly_con">
                      <p v-if='listarrs.service_num == 0'>{{listarrs.service_grade_name}}</p>
                      <p v-else>接单<b>{{listarrs.service_num}}</b>次</p>
                      <span>￥<b>{{listarrs.per_price}}</b>/小时</span>
                    </div>
                </dd>
              </dl>
              <div class="voicens s_voicens">
                <img :src=srcimg class="sparrings" @click='sparringFn(listarrs)'>
                 <audio class='audioref'>
                    <source :src=listarrs.audio type="audio/mpeg">
                 </audio>
              </div>
          </div>
        </div>
         <div style="text-align: center;font-size: 1.2rem;">© 2018 北京和勤新泰技术有限公司 京ICP备05081996号-6</div>
        </v-scroll>
        </div>
  <div v-else>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
      <div class="kings_list" v-if='menuName == "美女陪玩"'>
        <div class="lings_dl play_dl" v-for="(listarr,ind) in codelits">
            <dl @click="getcode('/sdetails',listarr.user_game_service_id)">
                  <dt>
                    <img v-lazy=listarr.avatar alt="">
                  </dt> 
                  <dd>
                    <div class="play_tit" style="padding:0;" v-if="listarr.nick_name.length >7">
                       <p class="nowraps">{{listarr.nick_name}}</p>
                        <span>{{listarr.game_name}}</span>
                      </div>
                       <div class="play_tit" v-else>
                        <p style="flex:1;">{{listarr.nick_name}}</p>
                        <span>{{listarr.game_name}}</span>
                      </div>
                    <div class="paly_con">
                      <p v-if='listarr.service_num == 0'>{{listarr.service_grade_name}}</p>
                      <p v-else>接单<b>{{listarr.service_num}}</b>次</p>
                      <span>￥<b>{{listarr.per_price}}</b>/小时</span>
                    </div>
                  </dd>
                </dl>
                <div class="lingImg">
                  <img src="@/static/images/lcon/voices.png" class="voiceimg" @click='voicesFns(listarr)'>
                    <audio class='audiorefs'>
                      <source :src=listarr.audio type="audio/mpeg">
                   </audio>
                </div>
           </div>
        </div>
      <div class="main_s" v-else>
        <div class="kings_list">
          <div class="play_dl play_dls" style="display:inline-block;" v-for="(listarrs,ind) in codelits">
             <dl @click="getcode('/sdetails',listarrs.user_game_service_id)">
                <dt>
                  <img v-lazy=listarrs.avatar alt="" class="sparringimg">
                </dt>
                <dd>
                  <div class="play_tit">
                    <p v-if="listarrs.nick_name.length >7" class="nowraps">{{listarrs.nick_name}}</p>
                    <p v-else style="flex:1;">{{listarrs.nick_name}}</p>
                    <span>{{listarrs.service_grade_name}}</span>
                  </div>
                  <div class="paly_con">
                    <p v-if='listarrs.service_num == 0'>{{listarrs.service_grade_name}}</p>
                    <p v-else>接单<b>{{listarrs.service_num}}</b>次</p>
                    <span>￥<b>{{listarrs.per_price}}</b>/小时</span>
                  </div>
                </dd>
              </dl>
               <div class="voicens s_voicens">
                <img :src=srcimg class="sparrings" @click='sparringFn(listarrs)'>
                 <audio class='audioref'>
                    <source :src=listarrs.audio type="audio/mpeg">
                 </audio>
             </div>
          </div>
        </div>
      </div>
   
    <div style="text-align: center;display:none;">
        <a href="http://m.zx.dui1dui.com/">资讯</a>
        <a href="http://m.sy.dui1dui.com/">手游交易</a>
        <a href="http://zj.dui1dui.com/wap">装机</a>
        <a href="http://m.ds.dui1dui.com/">读书</a>
        <a href="http://m.sw.dui1dui.com/">实物</a>
        <a href="http://jy.dui1dui.com/index.php/wap/index/pubg.html">steam饰品交易</a>
      </div>
       <div style="text-align: center;font-size: 1.2rem;">© 2018 北京和勤新泰技术有限公司 京ICP备05081996号-6</div>
      </v-scroll>

    </div>
  </section>
    <div class="foot">
      <dl @click='orderHome()'>
        <dt><img src="../static/images/lcon/home.png" alt=""></dt>
        <dd>首页</dd>
      </dl>
       <dl @click='orderFn()'>
        <dt><img src="../static/images/lcon/order.png" alt=""></dt>
        <dd>订单</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Scroll from './playlist/swipers.vue';
export default {
  name: 'home',
  data () {
    return {
      srcimg:require("../static/images/lcon/voices.png"),
      srcimg1:require("../static/images/lcon/s1.png"),
      srcimg2:require("../static/images/lcon/s2.png"),
      srcimg3:require("../static/images/lcon/s3.png"),
      menuCode:"",
      menu:[],
      menuInd:0,
      iscur:0,
      playtit:[],
      playtitcode:"",
      timers:'',
      codelits:[],
      menuName:"",
      playtitName:"推荐",
      codeInd:0,
      clicktext:"",
      scroll:"",
      durations:'',
      counter : 2, //默认已经显示出15条数据 count等于一是让从16条开始加载
      num : 10,  // 一次显示多少条
      pageStart : 0, // 开始页数
      pageEnd : 0, // 结束页数
      listdata: [], // 下拉更新数据存放数组
      downdata: [],  // 上拉更多的数据存放数组
      scroll:""
    }
  },
  
  components: {
    'v-scroll': Scroll
  },
  created () {
    this.parentFn();
   
  },
  updated(){
    this.phonetic();
    this.mensu()
  },
  methods:{
    GetParam(url, id){
            url = url+ "";
            let regstr = "/(\\?|\\&)" + id + "=([^\\&]+)/",
            reg = eval(regstr),//eval可以将 regstr字符串转换为 正则表达式
            result = url.match(reg);
            if (result && result[2]) {
                return result[2];
            }
       },     
    mensu() {
        if($('.yo-scroll').height()>$('.kings_list').height()){
             $(".load-more").css("display","none");
          }
      },
     getcode(paths,id){
       localStorage.removeItem("verification");
        localStorage.removeItem("userToken");
       let verif = JSON.parse(localStorage.getItem('verification'));
      if(verif == "" || verif==null){
        if(id == ""){
          window.location.href = "https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=86ENSUXs8xRN9RX37UC5VhrB&redirect_uri="+encodeURIComponent("http://m.pw.dui1dui.com/#"+paths)+"&scope=basic&display=mobile";
        }else{
          window.location.href = "https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=86ENSUXs8xRN9RX37UC5VhrB&redirect_uri="+encodeURIComponent("http://m.pw.dui1dui.com/#"+paths+"?id="+id)+"&scope=basic&display=mobile";
        }
    }
  },
  onRefresh(done) {
         this.getList();
         done() // call done
    },
    onInfinite(done) {
        this.$http.post("/h5/esport-api/v1/service/list_play_game_service",{'menu_code':this.menuCode,'page_no':this.counter,'page_size':this.num},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.data!=""){
                  this.counter++;
                 done()
                  let codelitsjson = response.body.data;
                    codelitsjson.forEach((m,i)=>{
                      this.codelits.push(m);
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
    getList(){//点击二级菜单渲染
        this.$http.post("/h5/esport-api/v1/service/list_play_game_service",{'menu_code':this.menuCode,'page_no':1,'page_size':this.num},{emulateJSON: true}).then(
          (response)=>{
            if(response.body.code == 2000){
              $(".load-more").css("display","flex");
              this.counter = 2;
              this.codelits = response.body.data;
            }else{
              this.alertFn(response.body.msg);
            }
           
          },
          (error)=>{
            console.log(error);
          })
     },
      parentclick(code,ind,names) {//点击一级菜单添加样式
        this.codeInd = ind;
        this.playtitcode = code;
        this.playtitName = names;
        this.secondFn(this.playtitcode);
        this.audioPause();
      },
      audioPause(){//音频切换时取消播放
        $('.yo-scroll').scrollTop(0);
        $(".load-more").css("display","flex");
          clearInterval(this.timers);
          clearInterval(this.durations);
          let voiceimg = document.getElementsByClassName('voiceimg'),
              playDls = document.getElementsByClassName('play_dls'),
              sparrings = document.getElementsByClassName('sparrings'),
              lings = document.getElementsByClassName('lings_dl');
          this.codelits.forEach((m,i)=>{
            if(lings[i]!=undefined){
              lings[i].getElementsByClassName('audiorefs')[0].pause();
              voiceimg[i].src = this.srcimg;
             lings[i].getElementsByClassName('audiorefs')[0].currentTime = 0;
            }else if(playDls!=undefined){
              playDls[i].getElementsByClassName('audioref')[0].pause();
              sparrings[i].src = this.srcimg;
              playDls[i].getElementsByClassName('audioref')[0].currentTime = 0;
            }
          })
      },
    phonetic(){//判断是否有音频，有就显示图标
      this.codelits.forEach((m,i)=>{
          if(m.audio == ""){
            $(".lingImg").eq(i).css("display","none");
             $(".p_voicens").eq(i).css("display","none");
             $(".s_voicens").eq(i).css("display","none");
          }else{
            $(".lingImg").eq(i).css("display","block");
            $(".p_voicens").eq(i).css("display","block");
             $(".s_voicens").eq(i).css("display","block");
          }
        })
    },
    parentFn(){//一级菜单列表接口
      this.$http.post("/h5/esport-api/v1/system/sub_menu_list",{'parant_code':'M10075'},{emulateJSON: true}).then(
        (response)=>{
          if(response.body.data!=""){
             response.body.data.forEach((m,i)=>{
                this.playtit.push(m);
              })
            var menuCode = this.GetParam(document.URL,"menuCode");

            if(menuCode == undefined){
              this.playtitcode = this.playtit[0].code;
            }else{
                 if(menuCode.length>6){
                  menuCode = menuCode.substring(0,6)
                }
               this.playtit.forEach((m,i)=>{
               if(m.code == menuCode){
                  this.iscur = i
                }
              })
              this.playtitcode = menuCode;
            }
            this.secondFn(this.playtitcode)
          }else{
            this.alertFn('系统菜单不存在或已下线');
          }
        },
        (error)=>{
          console.log(error);
        })
    },
    secondFn(playtitcode){//二级菜单列表
      this.$http.post("/h5/esport-api/v1/system/sub_menu_list",{'parant_code':playtitcode},{emulateJSON: true}).then(
        (response)=>{
          if(response.body.data!=""){
            this.menu = response.body.data;
            this.menuInd = 0;
             this.menuName = this.menu[0].name
            this.menuCode = this.menu[0].code;
            this.condeFn(this.menuCode);
          }else{
            this.alertFn('系统菜单不存在或已下线');
          }
         
        },
        (error)=>{
          console.log(error);
        })
    },
    menuFn(ind,code,names){//点击二级菜单
      this.menuInd = ind;
      this.menuCode = code;
      this.menuName = names;
      this.condeFn(this.menuCode);
       this.audioPause();
    },
    condeFn(playtitcode){//对应列表显示
        this.$http.post("/h5/esport-api/v1/service/list_play_game_service",{'menu_code':playtitcode,'page_no':1,'page_size':10},{emulateJSON: true}).then(
              (response)=>{
                if(response.body.code == 2000){
                  this.codelits = response.body.data;
                }else{
                  this.alertFn(response.body.msg);
                }
               
              },
              (error)=>{
                console.log(error);
              })
    },
    voicesFns(obj){
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
              console.log(2)
            }
            lings[i].getElementsByClassName('audiorefs')[0].pause();
            voiceimg[i].src = this.srcimg;
          }
        });
    },
    sparringFn(obj){
        clearInterval(this.timers);
         clearInterval(this.durations);
        let audioref = document.getElementsByClassName('audioref'),
            sparrings = document.getElementsByClassName('sparrings'),
            lings = document.getElementsByClassName('play_dls');
      this.codelits.forEach((m,i)=>{

        if(obj.user_game_service_id == m.user_game_service_id && (this.clicktext != obj.user_game_service_id || this.clicktext == '')){
          this.clicktext = obj.user_game_service_id;
          audioref[i].load()
          audioref[i].oncanplay =()=>{ 
              audioref[i].play();
             let duration = Math.ceil(audioref[i].duration);
              this.playsFn(i,duration);
           }
           
        }else{
          if(this.clicktext == obj.user_game_service_id && obj.user_game_service_id == m.user_game_service_id){
            this.clicktext = "";
          }

          lings[i].getElementsByClassName('audioref')[0].pause();
          sparrings[i].src = this.srcimg;
        }
      });
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
    },
    playsFn(ind,duration){
      var n = 0;
      let arr = [this.srcimg1,this.srcimg2,this.srcimg3];
      this.timers = setInterval(()=>{
        $('.sparrings').eq(ind).attr("src",arr[n])
        n++;
        if (n == 3) {
          n = 0;
        };
      },400)
       this.durations = setInterval(()=>{
        duration--;
        if(duration<=0){
           clearInterval(this.timers);
            $('.sparrings').eq(ind).attr("src",this.srcimg)
        }
      },1000)
  },
  orderFn(){
     this.getcode('/orderlist',"")
    },
    orderHome(){
      location.reload();
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
::-webkit-scrollbar {display:none}
 .p_tit{
     padding: 18px 10px 3px 10px;
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
        font-size: 1.6rem;
      }
       .actives{
          font-size: 1.8rem;
          font-weight: bold;
          color: #4182F5;
        }
    }
  }
.page_list{
  padding-top: 10px;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  p{
    font-size: 1.4rem;
    padding: 5px 10px 3px 10px;
    border: 1px solid #979797;
    color: #999999;
    &:nth-child(1){
      border-bottom-left-radius: 60px;
      border-top-left-radius: 60px;
      border-right:0;
    }
    &:nth-child(2){
      border-bottom-right-radius: 60px;
      border-top-right-radius: 60px;
      border-left:0;
    }
  }
  span{
    padding: 5px 10px 3px 10px;
    border: 1px solid #3285FF;
    border-radius: 17px;
    color: #fff;
    font-size: 1.4rem;
  }
  .bgblues{
    color: #fff;
    background: #3285FF;
    border: 1px solid #3285FF;
  }
}

.h_main{
  padding: 0 8px;
}
  .m_head{
    padding-top: 18px;
    padding-bottom: 12px;
    position: relative;
    p{
      margin-left: -8px;
      color: #fff;
      background: #3285ff;
      font-weight: bold;
      padding: 4px 20px 1px 12px;
      font-size: 1.6rem;
      display: inline-block;
      border-radius: 0 16px 16px 0; 
    }
    img{
      height: 12px;
      display: inline-block;
    }
  }
  .m_right{
      position: absolute;
      right: 12px;
      top:23px;
      font-size: 1.4rem;
      a{
        span{
          color: #333333;
          font-size: 1.4rem;
        }
      }
    }
    .play_dl:nth-child(odd) {
    margin-right: 12px;
}
    .play_dl{
      display: inline-block;
      position: relative;
       width: 48%;
      dl{
        background:rgba(255,255,255,1);
        box-shadow: 0px 2px 20px 0px rgba(0,0,0,0.12); 
        border-radius: 6px; 
        margin-bottom: 10px;
        &:nth-child(even){
          margin-right: 10px;
        }
        dd{
          padding-top: .9rem;
          div{
            display: flex;
            justify-content:space-around;
             white-space: nowrap;
          }
        }
      }
    }
    .play_dls{
      dl{
        dt{
          height: 98px;
          img{
            border-radius: 6px 6px 0 0; 
            width: 100%;
            height: 100%;
          }
      }
    }
}
.voicens{
      position: absolute;
      right: 9px;
      top: 9px;
      img{
        height: 30px;
      }
    }
    .play_tit{
      padding: 0 1.2rem;
      p{
        padding-top: 6px;
        font-size: 1.6rem;
        color:#151516;

      }
      span{
        margin-top: 5px;
        font-size: 10px;
        border: 1px solid #999999;
        padding: 5px 5px 2px 5px;
        border-radius: 8px; 
      }
    }
    .paly_con{
      padding: 0 1.2rem 8px 1.2rem;
       p{
        flex:1;
        padding-top: 10px;
        font-size: 1.2rem;
        color:#999999;
        b{
          font-weight: normal;
        }
      }
      span{
        padding-top: 6px;
        font-size: 1.2rem;
        color:#FF4F0C;
        b{
          font-size: 1.8rem;
        }
      }
    }
.nowraps{
  width: 83px;
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.foot{
  border-top: 1px solid #EEEEEE;
  display: flex;
  justify-content: space-around;
  padding: 2px 0;
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
            height: 170px;
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
        padding-top: 9px;
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
        padding-top: 12px;
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
</style>