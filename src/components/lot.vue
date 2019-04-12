<template>
   <div id="rotary-table">
        <div class="award" v-for="(award,index) in awards" :key="index" :class="['award'+index,{'active': index==current}]">
          
          <div :class="['1','2','33']"></div>
            <!-- {{['award'+index,{'active': index==current}]}} -->
            {{award.name}}
        </div>
        <div id="start-btn" @click="start">开始</div>
    </div>
</template>
<script>
export default {
  name: "lot",
 
  components: {
  
  },
  data() {
    return {
      current: 0,  
            awards: [  // 奖品数组
                { id: 1, name: '空' },
                { id: 2, name: '眼镜' },
                { id: 3, name: '包' },
                { id: 4, name: '啥都没有' },
                { id: 5, name: '书' },
                { id: 6, name: '手链' },
                { id: 7, name: '美女' },
                { id: 8, name: 'iphone' }
            ],
            speed: 200,   // 速度
            diff: 15,   // 速度增加的值
            award: {},   // 抽中的奖品
            time: 0   // 记录开始抽奖时的时间
    };
  },
  methods: {
       start(){
            // 开始抽奖
            this.drawAward();
            this.time = Date.now();
            this.speed = 200;
            this.diff = 15;
        },
        drawAward(){
            // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
            // setTimeout( () => {
            //     this.award = {
            //         id: '1',
            //         name: '啥都没有',
            //     };
            // }, 2000 );
            this.move();
        },
        move(){
            window.timeout = setTimeout( () => {
                this.current++;
                if ( this.current > 7 ) {
                    this.current = 0;
                }

                // 若抽中的奖品id存在，则开始减速转动
                if (  ( Date.now() - this.time ) / 1000 > 2 ) {
                    this.speed += this.diff;   // 转动减速
                   
// && this.award.id == this.awards[ this.current ].id 
                     // 若转动时间超过4秒，并且奖品id等于小格子的奖品id，则停下来！
                    if ( ( Date.now() - this.time ) / 1000 > 4 ) {
                     this.award =  this.awards[ this.current ] 
                      // console.log(this.awards[ this.current ])
                        clearTimeout( window.timeout );
                        setTimeout( () => {
                            alert( this.award.name );
                        }, 0 );
                        return;
                    }



                    // 若转动时间超过4秒，并且奖品id等于小格子的奖品id，则停下来！
                    // if ( ( Date.now() - this.time ) / 1000 > 4 && this.award.id == this.awards[ this.current ].id ) {
                    //     clearTimeout( window.timeout );
                    //     setTimeout( () => {
                    //         alert( this.award.name );
                    //     }, 0 );
                    //     return;
                    // }

                // 若抽中的奖品不存在，则加速转动
                } else {
                    this.speed -= this.diff;   // 转动加速
                }

                this.move();
            }, this.speed );
        }
  },

};
</script>
<style lang="less">
#rotary-table {
        width: 340px;
        height: 349px;
        position: relative;
        margin: auto;
        background-color: antiquewhite;
        .award {
            width: 90px;
            height: 96px;
            line-height: 96px;
            text-align: center;
            float: left;
            position: absolute;
            overflow: hidden;
            background-color: aquamarine;
            &.active {
                background-color: darkgoldenrod;
            }
            &.award0 {
                top: 21px;
                left: 21px;
            }
            &.award1 {
                top: 21px;
                left: 125px;
            }
            &.award2 {
                top: 21px;
                right: 22px;
            }
            &.award3 {
                top: 126px;
                right: 22px;
            }
            &.award4 {
                bottom: 22.5px;
                right: 22px;
            }
            &.award5 {
                bottom: 22.5px;
                right: 125.5px;
            }
            &.award6 {
                bottom: 22.5px;
                left: 21px;
            }
            &.award7 {
                top: 126px;
                left: 21px;
            }
        }
        #start-btn {
            position: absolute;
            top: 125px;
            left: 124px;
            width: 90px;
            height: 96px;
            line-height: 90px;
            text-align: center;
            background-color: coral;
        }
    }
</style>
