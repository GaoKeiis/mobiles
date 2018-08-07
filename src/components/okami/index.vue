<template>
  <div class="okami">
	  <div class="o_bgimg">
	  		<el-select class="o_game" v-model="value" placeholder="选择陪练的游戏">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
  		</el-select>
  		<el-select class="o_dan" v-model="values" placeholder="选择您的游戏段位">
			    <el-option
			      v-for="item in optionn"
			      :key="item.value"
			      :label="item.label"
			      :values="item.values">
			    </el-option>
  		</el-select>
  		<el-input class='information' v-model="input" placeholder="请填写您的QQ或微信号"></el-input>
      <div class="returnBtn" @click="routerGo()">返回</div>
  		<p class="o_btn">提交</p>
	  </div>
  </div>
</template>

<script>

export default {
  name: 'playlist',
  data () {
    return {
    	options: [{
          value: '王者荣耀',
          label: '王者荣耀'
        }, {
          value: '英雄联盟',
          label: '英雄联盟'
        }, {
          value: '绝地求生',
          label: '绝地求生'
        }, {
          value: '荒野行动',
          label: '荒野行动'
        }],
        value: '',
        optionn: [{
          value: '王者',
          label: '王者'
        }, {
          value: '英雄',
          label: '英雄'
        }, {
          value: '绝地',
          label: '绝地'
        }, {
          value: '荒野',
          label: '荒野'
        }],
        values: ''
    }
  },
  components: {},
  created () {
  },
  methods:{
    routerGo(){
      this.$router.go(-1);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.o_bgimg{
	text-align: center;
	padding-top: 40%;
}
.o_game{
	margin-bottom: 12px;
}
.o_dan{
	margin-bottom: 12px;
}
.information{
	width: 50%;
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

