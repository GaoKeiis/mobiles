<template>
  <div id="app" class="">
   <div class="home">
     <router-view></router-view>
   </div>
    
  </div>
</template>

<script>
import './static/css/reset.css';
import './static/css/common.css';
export default {
  name: 'App',
   created () {
   
    },
     updated(){
      for(let i = 0; i<$("a").length;i++){
       if($("a").eq(i).attr("target") == "_blank"){
         $("a").eq(i).css("visibility","hidden")
      }
    }
  }
}
</script>

<style>
#app{
  height:100%;

}
.home{
  height:100%;
}
.homes{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: -webkit-flex;  
    display: flex;          
    display: -webkit-box; 
    display: -moz-box;      
    display: -ms-flexbox;
  flex-direction: column;
}
.main{
  overflow: hidden;
  overflow-y: scroll;
 //-webkit-overflow-scrolling: touch;
  //overflow-scrolling: touch;
  -webkit-flex: 1;       
    -ms-flex: 1;            
    flex: 1;               
    -webkit-box-flex: 1;     
    -moz-box-flex: 1;          
}
</style>
