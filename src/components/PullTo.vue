<template>
<div class="yo-scroll"
  :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
  @touchstart="touchStart($event)"
  @touchmove="touchMove($event)"
  @touchend="touchEnd($event)"
  @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
    <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <header class="pull-refresh">
        <slot name="pull-refresh">
           <span class="down-tip">下拉更新</span>
           <span class="up-tip">松开更新</span>
           <span class="refresh-tip">更新中</span>
        </slot>
      </header>
      <slot></slot>
      <footer class="load-more">
        <slot name="load-more">
          <!-- <span>加载中……</span> -->

          <load-more v-if="!IsCompleted" :tip="'加载中'"></load-more>
           <load-more v-if="IsCompleted&&!hide" :show-loading="false" :tip="'数据已加载完'" background-color="#fbf9fe"></load-more>


        </slot>
      </footer>
    </section>
   
  </div>
</template>

<script>
import { LoadMore } from 'vux'
export default {
  name: "PullTod",

   props: {
    offset: {
      type: Number,
      default: 40
    },
    enableInfinite: {
      type: Boolean,
      default: true
    },
    enableRefresh: {
      type: Boolean,
      default: true
    },
    IsCompleted:{
       type: Boolean,
      default: false,
    },
    hide:{
       type: Boolean,
      default: false,
    },
    onRefresh: {
      type: Function,
      default: undefined,
      required: false
    },
    onInfinite: {
      type: Function,
      default: undefined,
      require: false
    }
  },
  components: {
    LoadMore
  },

  data() {
    return {

       top: 0,
      state: 0,
      startY: 0,
      touching: false,
      infiniteLoading: false,
    };
  },

  methods: {

     touchStart(e) {
      this.startY = e.targetTouches[0].pageY
      this.startScroll = this.$el.scrollTop || 0
      this.touching = true
    },
    touchMove(e) {
     
      if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
        return
      }
      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
      if (diff > 0) e.preventDefault()
      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
      if (this.state === 2) { // in refreshing
        return
      }
      // console.log(this.top,this.offset)
      
      if (this.top >= this.offset) {
        this.state = 1
      } else {
        this.state = 0
      }
      // console.log(e)
    },
    touchEnd(e) {
      if (!this.enableRefresh) return
      this.touching = false
      if (this.state === 2) { // in refreshing
        this.state = 2
        this.top = this.offset
        return
      }
      if (this.top >= this.offset) { // do refresh
        this.refresh()
      } else { // cancel refresh
        this.state = 0
        this.top = 0
      }
    },
    refresh() {
      this.state = 2
      this.top = this.offset
      this.onRefresh(this.refreshDone)
      this.infiniteLoading = false
      // console.log(1111111)
    },
    refreshDone() {
      this.state = 0
      this.top = 0
    },

    infinite() {
      this.infiniteLoading = true
      this.onInfinite(this.infiniteDone)
    },

    infiniteDone() {
      this.infiniteLoading = false
    },

    onScroll(e) {
      // console.log(this.enableInfinite,this.infiniteLoading)
      if (!this.enableInfinite || this.infiniteLoading) {
        return
      }
     
      let outerHeight = this.$el.clientHeight
      let innerHeight = this.$el.querySelector('.inner').clientHeight
      let scrollTop = this.$el.scrollTop
      let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0
      let infiniteHeight = this.$el.querySelector('.load-more').clientHeight
      let bottom = innerHeight - outerHeight - scrollTop - ptrHeight
      //  console.log(bottom,infiniteHeight)
      if (bottom < infiniteHeight){
        //  console.log(11111)
this.infinite()
      } 
    }

    //  loadmore() {
    //     setTimeout(() => {
    //       this.dataList = this.dataList.concat(this.dataList);
    //     }, 1000);
    //   },


  //      scroll(person) {
  // //  let isLoading = false
  //  window.onscroll = () => {
  //    let _that = this
  //   // 距离底部200px时加载一次
  //   let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 20
  //   if (bottomOfWindow && this.isLoading == false) {
  //    this.isLoading = true
    
  //    setTimeout(function(){
  //      _that.isLoading = false
  //      _that.dataList = _that.dataList.concat(this.dataList);
  //       console.log('数据请求完成！')
  //    },1000)

     
  //    this.dataList = this.dataList.concat(this.dataList);
  //   //  axios.get(`https://randomuser.me/api/`).then(response => {
  //   //   person.push(response.data.results[0])
  //   //   isLoading = false
  //   //  })
  //   }
  //  }
  // }

  },
  
mounted() {
  // this.scroll(this.dataList)
 }

};
</script>

<style scoped rel="stylesheet/less" lang="less">
.yo-scroll {
  position: absolute;
  top: 0rem;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  // background-color: #ddd
}
.yo-scroll .inner {
  position: absolute;
  top: -2rem;
  width: 100%;
  transition-duration: 300ms;
}
.yo-scroll .pull-refresh {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.yo-scroll.touch .inner {
  transition-duration: 0ms;
}
.yo-scroll.down .down-tip {
  display: block;
}
.yo-scroll.up .up-tip {
  display: block;
}
.yo-scroll.refresh .refresh-tip {
  display: block;
}
.yo-scroll .down-tip,
.yo-scroll .refresh-tip,
.yo-scroll .up-tip {
  display: none;
}
.yo-scroll .load-more {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}  

</style>
