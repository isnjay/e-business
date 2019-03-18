<template>
    <div class="goodsOrder">
    <!-- 头部图像 -->
        <div class="orderHeader">
            <span class="before"><i class="icon iconfont icon-xitongfanhui"></i></span>
        </div>
        <div class="maincontent">
            <div class="content">
                <h2 class="title">商家已接单</h2>
                <p>商品准备中，请稍等，有问题请联系商家</p>        
                <div class="button">
                    <button class="press" :class="{'buttonbgcolor': isAtive1}" @click="choose1">买单</button>
                    <button class="press" :class="{'buttonbgcolor': isAtive2}" @click="choose2">加菜</button>
                </div>
            </div>
            <div class="payment" v-show="clickshow">
                <span class="tips">结账功能尚未开通，请到前台买单！</span>
                <span class="icon"><i class="icon iconfont icon-guanbi" @click="close()"></i></span>
            </div>
            <div class="foodlist">
                <div class="foodlistHesder">
                    <span class="shopname">深圳麦当劳红荔西路餐厅<i></i></span>             
                </div>
                <div class="foodlistcontent">
                    <div class="fooddetail">
                        <ul>
                            <li class="detail" v-for="food in foodlist">
                                <div class="word">
                                    <span class="foodname">{{ food.c_name}}</span>
                                    <span class="foodprice">￥{{ food.piece }}</span>
                                    <span class="foodnumber">x{{ food.num }}</span>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                    <div class="buttom">
                        <div class="total">
                            <span>合计</span>
                            <span class="redcolor">￥{{ totalprice }}</span>
                        </div> 
                    </div>            
                </div>                        
            </div>
        </div>
    </div>
</template>
<script>
// import api from '@/api';
export default {
    name: 'goodsOrder',
    data () {
        return {
            isAtive1: false,
            isAtive2: true,
            clickshow: false,
            foodlist: [],
            totalprice: 0
        };
    },
    computed: {},
    created () {
        // const id = this.$route.params['o_id'];
        // api.getOrder(id).then(res => {
        //     this.foodlist = res.data.data.menu;
        //     this.totalprice = res.data.data.total_price;
        // });
    },
    methods: {
        choose1 () {
            this.isAtive1 = true;
            this.isAtive2 = false;
            this.clickshow = true;
        },
        choose2 () {
            this.isAtive2 = true;
            this.isAtive1 = false;
        },
        close () {
            this.clickshow = false;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style slot-scope>
* {
    margin: 0;
    padding: 0;
}
.goodsOrder {
    padding:5px 10px;
    background:  #F8F8F8;
    position: relative;
}
.orderHeader {
    width: 100%;
    height: 150px;
    background: url("/static/img/logo.jpg");
}
.before i {
    float: left;
    margin: 10px 0 0 10px;
}
.maincontent {
    width: 100%;
    height: 100%;
}
.content {
    height: 100px;
    position: relative;
    padding: 10px;
    background: #fff;
    margin: 10px 0;
}
.title {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin: 5px 0;
}
.content p {
    font-size: 14px;
    text-align: center;
    color: #999;
    margin-bottom: 10px;
}
.button {
    text-align: center;
    background: #fff;
}
.press {
    width: 25%;
    height: 30px;
    border: 1px solid #999;
    margin: 0 10px;
    background: #fff;
    color: #999;
    border-radius: 5px;
}
.buttonbgcolor {
    background: #ffda61;
}
.payment {
    text-align: center;
    background: rgba(7, 17, 27, 0.6);;
    padding: 10px 0;
    border-radius: 10px;
    color: white;
}
.icon {
    float: right;
    margin: 1.2px 10px 0 0;
}
.foodlist {
    margin-top: 10px;
    width: 100%;
    background: #fff;
}
.foodlistHesder {
    height: 30px;
    padding: 3px;
    color: #999;
    text-align: center;
    font-size: 14px;   
}
.fooddetail {
    list-style-type: none;
}
.word {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: left;
    font-size: 14px;
}
.foodnumber {
    float: right;
    margin-right: 30px;
}
.detail img {
    width: 30px;
    height: 30px;
    position: relative;
}
.foodname, .foodprice {
    margin-bottom: 10px;
    padding-left: 20px;
}
.buttom {
    width: 100%;
    height: 20px;
}
.total {
    float: right;
    margin-right: 30px;
}
.redcolor {
    color: red;
}
</style>
