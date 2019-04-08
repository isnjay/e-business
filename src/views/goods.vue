<template>
<div>
  <div class="goods">
    <!-- 商家模块头部 组件 -->
    <div class="sellerHeader">
        <!-- 主要内容： -->
        <!--  商城顶部  -->
        <div class="mallBox">
          <a href="#" class="login">登录</a>
            <div class="sellerLogo">  
                <img src="static/img/timg.jpg"/>             
            </div>
            <div class="contents">
                <h3 id="shopName">小谷围幸运商城</h3><br/><br/>
               

                <div class="supports">
                  <li v-for="words in evaluate">
                    <span class="text">{{ words.word }}</span>
                  </li>
                </div>
            </div>
            



        </div>
        
        
    </div>
    <!-- 公告 
    <div class="notice">
        <div class="bulletinWrapper" @click="detailShow = true">
            <span class="brand"><i class="icon iconfont icon-zhekouqia"></i></span>
            <span class="text">折扣商品0.85折起</span>
            <span class="selection"><i class="icon iconfont icon-xiangxiazhankai"></i></span>
        </div>
                              -->
        <!-- 背景 -->
        <div class="background">       
        </div>

        <!-- 浮层详情 
        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detailWrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">深圳麦当劳红荔西路餐厅</h1>
                        <div class="title">
                            <div class="leftline"></div>
                            <div class="samlltitle">优惠信息</div>
                            <div class="rightline"></div>
                        </div>

                        <ul class="detail-supports">
                            <li class="supports-item" v-for="discount in discounts">
                                <span class="icon"><i class="discount.img"></i></span>
                                <span class="text">{{ discount.detail}}</span>
                            </li>
                        </ul>

                        <div class="title">
                            <div class="leftline2"></div>
                            <div class="smalltitle">商家公告</div>
                            <div class="rightline"></div>
                        </div>

                        <div class="detail-text">
                            <p class="text"></p>
                        </div>
                    </div>
                </div>

                <div class="detail-close" @click="detailShow = false">
                    <i class="icon iconfont icon-guanbi"></i>
                </div>
            </div>
        </transition>               -->

        <!-- 返回按钮 -->
        <div class="back" @click="back">
            <i class="icon-arrow_lift"></i>
        </div>
    </div>

        
    <div class="tab">
        <div class="tabItem" :class="{'tabline': tabActive === 1}" @click="tabActive = 1">
            <router-link to=''>商品</router-link>
        </div>
        <div class="tabItem" :class="{'tabline': tabActive === 2}" @click="tabActive = 2">
            <router-link to='#'>评价</router-link>
        </div>
        <div class="tabItem" :class="{'tabline': tabActive === 3}" @click="tabActive = 3">
            <router-link to='#'>商家</router-link>
        </div>
    </div>
    <div class="foodItem">
        <div class="leftNav">
            <ul>
                <li class="meun" v-for="(name,index) in typeFood" @click="show(name, index)"  :class="{'active': isActive === index}">                   
                    <span>{{ name.type_name }}</span>
                </li>
            </ul>
        </div>
        <div class="foodlist">
            <ul class="foodul">
                <li class="food" v-for="foodname in renderFoodDetail">
                    <div class="picture">
                        <img src='static/img/timg.jpg'>
                    </div>
                    <div class="foodcontent">
                        <h2 class="foodname">{{ foodname.c_name }}</h2>                            
                        <div class="extra">
                            <span class="sellcount">月售200份</span>
                            <span class="rating">好评率93%</span>
                        </div>
                        <div class="piece">
                            <span class="now">￥{{ foodname.piece }}</span>
                            <div class="control">
                                <transition name="move">
                                    <div class="decrease1" @click.stop.prevent="decrease(foodname, $event)">
                                        <i class="icon iconfont icon-offline"></i>                                       
                                    </div>
                                </transition> 
                                <div class="num1" v-show="menu[foodname.c_id] > 0">{{ menu[foodname.c_id] }}</div>
                                <div class="add1" @click.stop.prevent="add(foodname, $event)">
                                    <i class="icon iconfont icon-addition_fill"></i>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="shopcar">
        <div class="content">
            <div class="main">
                <div class="left" @click="shopcartclick">
                    <div class="logoPart">
                        <div class="logo" :class="{'logoLight': totalnum > 0}">
                            <i class="icon iconfont icon-gouwuche"></i>
                        </div>
                        <div class="count" v-show="totalnum > 0">{{ totalnum }}</div>
                    </div>
                    <div class="price" :class="{'priceLight': totalnum >0}">￥{{ totalPrice }}</div>
                </div>
                <div class="right">
                    <div class="pay" :class="{'payLight':totalnum >0}" @click="payDesc()">
                        <span>去结算</span>
                    </div>
                </div>
                <!-- <div class="payment" v-show="paymentshow">
                    <h2 class="paymentTitle">结算</h2>
                    <div class="paymentContent">
                        <p>您共需要支付{{ totalPrice }}</p>
                    </div>
                    <div class="paymentButton">
                        <div class="sure" @click="sure">
                            <span>确定</span>
                        </div>
                        <div class="cancle" @click="cancle">
                            <span>取消</span>
                        </div>
                    </div>
                </div>                    -->
            </div>
        </div>
    </div>
    <transition name="fold" >
        <div class="shopcartList" v-show="listShow">
            <div class="listHeader">
                <h1 class="listTitle">购物车</h1>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="listContent">
                <ul>
                    <li class="listFood" v-for="foodlist in selectFoods">
                        <span class="listFoodname">{{ foodlist.c_name }}</span>
                        <div class="listFoodprice">
                            <span>￥{{ foodlist.price }}</span>
                        </div>
                        <div class="control">
                            <transition name="move">
                                <div class="decrease2" @click.stop.prevent="decrease(foodlist, $event)">
                                    <i class="icon iconfont icon-offline"></i>                                       
                                </div>
                            </transition> 
                            <div class="num2" v-show="foodlist.c_num > 0">{{ foodlist.c_num }}</div>
                            <div class="add2" @click.stop.prevent="add(foodlist, $event)">
                                <i class="icon iconfont icon-addition_fill"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
    <transition name="fade">
        <div class="cartlistBackground" @click="hideList" v-show="listShow"></div>
    </transition>
    <!-- <transition name="fade">
        <div class="paymentBackground" @click="hideList" v-show="paymentshow"></div>
    </transition> -->
 </div>
</div>
</template>
<script>
// import { MessageBox } from 'mint-ui';
// import api from '@/api';
export default {
    name: 'goods',
    components: {},
    data () {
        return {
            logoimg: '',
            detailShow: false,
            isActive: 0,
            orderline: true,
            ratingline: false,
            shopline: false,
            evaluate: [{
                word: '"价格低"'
            }, {
                word: '"质量好"'
            }, {
                word: '"服务棒"'
            }],
            discounts: [{
                img: 'icon iconfont icon-zhekouqia',
                detail: '折扣商品0.85折起'
            }, {
                img: 'icon iconfont icon-manjian',
                detail: '满25减2'
            }, {
                img: 'icon iconfont icon-huodongyouxian',
                detail: '本店所有优惠不可叠加使用'
            }],
            typeFood: [],
            // all data
            foodDetail: [],
            // render data
            renderFoodDetail: [],
            menu: {},
            select: [],
            listShow: false,
            paymentshow: false,
            // 商品总数量
            totalnum: 0,
            tabActive: 1
        };
    },
    props: {
        seller: {
            type: Object
        },
        food: {
            type: Object
        },
        //  加入购物车的商品
        // 起送费
        minPrice: {
            type: Number,
            default: 0
        }
    },
    watch: {},
    methods: {
        back () {
            this.$router.push({
                path: '/index'
            });
        },
        show (name, index) {
            // this.foodDetail.map(val => {
            //     if (name.type_id === val.type_id) {
            //         console.log(this);
            //         this._foodDetail.push(val);
            //     }
            // });
            const renderFoodDetail = this.foodDetail.filter(val => name.type_id === val.type_id);
            this.renderFoodDetail = renderFoodDetail;
            this.isActive = index;
        },
        decrease (foodname, event) {
            if (this.menu[foodname.c_id] > 0) {
                if (this.totalnum > 0) {
                    this.totalnum = this.totalnum - 1;
                }
            }
            if (this.menu[foodname.c_id] > 1) {
                const val = this.menu[foodname.c_id] - 1;
                this.$set(this.menu, foodname.c_id, val);
            } else {
                this.$delete(this.menu, foodname.c_id);
            }
            if (this.totalnum === 0) {
                this.listShow = false;
            }
        },
        add (foodname, event) {
            if (this.menu[foodname.c_id]) {
                const val = this.menu[foodname.c_id] + 1;
                this.$set(this.menu, foodname.c_id, val);
            } else {
                this.menu = {
                    ...this.menu, // 扩展运算符
                    [foodname.c_id]: 1
                };
            }
            this.totalnum++;
            // console.log(foodname);
            // console.log(this.menu);
            // console.log(Object.keys(this.menu));
        },
        // pay () {
        //     if (this.totalPrice > 0) {
        //         this.paymentshow = true;
        //     }
        // },
        shopcartclick () {
            if (this.totalnum === 0) {
                this.listShow = false;
            } else if (this.listShow === true) {
                this.listShow = false;
            } else {
                this.listShow = true;
            }
        },
        hideList () {
            this.listShow = false;
            this.paymentshow = false;
        },
        payDesc () {
            if (this.listShow === false) {
                if (this.totalnum > 0) {
                    this.listShow = true;
                }
            } else {
                this.turnToOrderSucess();
            }
        },
        empty () {
            this.menu = {};
            this.totalnum = 0;
            this.listShow = false;
        },
        turnToOrderSucess () {
            // const tid = this.$route.params.tableid;
            // const resid = this.$route.params.resid;
            // api.orderList({
            //     menu: this.menu,
            //     't_id': tid,
            //     'res_id': resid
            // }).then(res => {
            //     console.log(res);
            //     this.$router.push(`/orderSuccess/${res.data.data['o_id']}`);
            // }).catch();
        }
    },
    filters: {},
    computed: {
        totalPrice () {
            let total = 0;
            for (let i = 0; i < this.selectFoods.length; i++) {
                total += this.selectFoods[i].c_num * (this.selectFoods[i].price * 100);
            }
            return total / 100;
        },
        selectFoods () {
            let select = [];
            let menuArr = Object.keys(this.menu);
            menuArr = menuArr.map(val => parseInt(val));
            this.foodDetail.forEach(val => {
                if (menuArr.includes(val.c_id)) {
                    select.push({
                        'c_id': val.c_id,
                        'c_num': this.menu[val.c_id],
                        'c_name': val.c_name,
                        price: val.piece
                    });
                    console.log(this.select.length);
                }
                // for (var i = 0; i < select.length; i++) {
                //     if (select.c_num === 0) {
                //         select.splice(i, 1);
                //     }
                // }
            });
            return select;
        }
    },
    created () {
        // Promise.all([
            // api.getFoodList().then(res => {
            //     if (res.data.status === 200) {
            //         this.foodDetail = res.data.data;
            //     }
            // }),
            // api.getFoodType().then(res => {
            //     if (res.data.status === 200) {
            //         this.typeFood = res.data.data;
            //     }
            // })
        // ]).then(_ => {
        //     this.show(this.typeFood[0], this.isActive);
        //     return this.foodDetail.c_id;
        // });
        // console.log(this.$route);
        // console.log(this);
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  slot-scope>
.goods {
    position: relative;
    height: 100%;
}
.sellerHeader {
    width: 100%;
    height: 100px;
    position: relative;
    color:#fff;
    font-weight: 200;
    overflow: hidden;
    background-color:	#00B2EE;
}
.mallBox{
    height: 100px;
    background: rgba(201,21,35,0);
    min-width: 320px;
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
    position: relative;
}

 .login{
    position: absolute;
    right: 10px;
    top: 0;
    width: 50px;
    height: 50px;
    font-weight:700;
    line-height: 40px;
    text-align: center;
    color: #222;
}
.contentWrapper {
    position: relative;
    float: left;
    padding: 32px 12px 18px 24px;
}
.sellerLogo {
    position: relative;
    float: left;
    width: 150px;
    height: 100px;
    font-size: 14px;
    vertical-align: top;
    
}
.sellerLogo img {
    width: 150px;
    height: 100px;
    border-radius: 12px;
}
.brand i {
    color: rgb(200, 130, 214);  
}
.selection{
    float: right;
    margin-right: 10px;
}
.contents {
    position: relative;
    float: right;
    height: 60px;
    width: 240px;
    top:40px;
    margin: 0;
}
.contents span {
    position: relative;
    float: left;
    font-size: 14px;
    margin-left: 10px;
}
.supports li {
    list-style-type: none;
    float: left;
    width: 25%;
    margin-left: 10px;
}
.supports span {
    margin: 0;
}
.supports-item span {
    font-size: 14px;
}
#shopName {
    margin:0 8px 4px 6px;
    float: left;
    font-size: 16px;
}
#shopName span {
    margin:2px 0 8px 6px;
    font-size: 10px;

}
.notice{
    width: 100%;
    height: 20px;
    font-size: 14px;
    position: relative;
}
.detail {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 100;
    overflow: auto;
    background-color: rgba(7,17,27,.8);
    color: white;
}
.detail-main {
    text-align: center;
    padding-top: 64px;
    padding-bottom: 64px;
}
.name {
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
}
.title {
    width: 80%;
    margin: 28px auto;
    text-align: center;
}
.leftline {
    flex: 1;
    position: relative;
    top:10.5px;
    left: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    width: 35%;
}
.leftline2 {
    flex: 1;
    position: relative;
    top: 104px;
    left: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    width: 35%;
}
.rightline{
    flex: 1;
    position: relative;
    top: -8.5px;
    left: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    width: 35%;
    float: right;
}
.smalltitle {
    text-align: center;
    padding: 0 12px;
    font-size: 14px;
    font-weight: 600;
}
.detail-supports {
    list-style-type: none;
    color: white;
    float: left;
    text-align: left;
    width: 80%;
    margin: 0 auto;
}
.supports-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
}
.detail-close {
    text-align: center;
}
.content brand {
    width: 30px;
    height: 18px;
    display: inline-block;
    vertical-align: top;
    background-size: 30px 18px;
    background-repeat: no-repeat;
}
.tab{
    display: flex;
    width: 100%;
    height: 35px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #ccc;
}
.tabItem {
    text-align:center;
    width: 33.3%;
}
.tabline {
    border-bottom: 2px #ffda61 solid;
}
a {
    text-decoration:none;
    color:rgb(51, 60, 68);
}
.tab a :hover {
    color: black;
    text-decoration: underline;
}
hr {
    margin: 0 ;
}
.foodItem{
    display: flex;
    position: absolute;
    top: 156px;
    bottom: 46px;
    width: 100%;
    background-color: #fff;
    overflow: hidden
}
.leftNav{
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
}
.leftNav ul {
    list-style-type: none;
    width: 80px;
    padding: 0;
    margin: 0;
}
.leftNav span {
    font-size: 12px;
}
.meun {
    display: table;
    width: 100%;
    height: 34px;
    line-height: 34px;
    font-size: 16px;
    text-align: center;
}
.meun span {
    margin: 0;
}
.active {
    background-color: white;
}
.foodlist{
    flex: 1;
}
.foodul {
    margin: 0;
    padding: 0;
    overflow: scroll;
    height:100%;
}
.foodtitle {
    list-style-type: none;
}
.foodtitle h1 {
    margin-top: 0;
}
.rfoodtitle {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background-color: #f3f5f7;
}
.food{
    position: relative;
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
}
.picture{
    flex: 0 0 57px;
    width: 57px;
    height: 57px;
    margin-right: 10px;
}
.picture img {
    width: 57px;
    height: 57px;
}
.foodcontent {
    flex: 1;
}
.foodname {
    font-size: 14px;
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    color: rgb(7, 17, 27);
}
.extra {
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 0;
    color: rgb(147, 153, 159);
}
.sellcount {
    font-size: 10px;
    margin-left: 0;
    margin-right: 12px;
}
.rating {
    font-size: 10px;
}
.piece{
    font-weight: 700;
    line-height: 24px;
}
.now {
    margin: 0 8px 0 0;
    font-size: 14px;
    color: rgb(240, 20, 20);
}
.old {
    font-size: 10px;
    color: rgb(147, 153, 159);
    text-decoration: line-through;
}
.control {
    font-size: 0;
    line-height: 24px;
    float: right;
}
/* 页面点餐点击样式 */
.decrease1, .add1 {
    display: inline-block;
    padding: 5px;
}
.decrease1 i {
    font-size: 24px;
    color: #5ED14F;
    display: inline-block;
    font-weight: 500;
}
.add1 i {
    font-size: 24px;
    color: #5ED14F;
    display: inline-block;
    font-weight: 500;
}
.num1 {
    display: inline-block;
    padding: 5px;
    font-size: 14px;
    text-align: center;
    color: rgb(147, 153, 159);
    vertical-align: top;
}
.decrease2, .add2 {
    display: inline-block;
}
 /* 购物车点击样式 */
.decrease2 i {
    font-size: 24px;
    color: #5ED14F;
    display: inline-block;
    font-weight: 500;
}
.add2 i {
    font-size: 24px;
    color: #5ED14F;
    display: inline-block;
    font-weight: 500;
}
.num2 {
    display: inline-block;
    font-size: 14px;
    text-align: center;
    color: rgb(147, 153, 159);
    vertical-align: top;
}
.move-enter-active, .move-leave-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all .4s;
}
.move-enter-active, .move-leave-active i {
    transform: rotate(0);
    transition: all .4s;
}
.move-enter, .move-leave-to {
    opacity: 0;
    transform: translate3d(24px, 0, 0);
    transition: all .4s;
}
.move-enter, .move-leave-to i {
    transform: rotate(360deg);
    transition: all .4s;
}
.content {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    z-index: 50;
}
.main {
    display: flex;
    width: 100%;
    height: 48px;
    font-size: 0;
    background-color: #141d27;
}
.left {
    flex:1;
}
.logoPart {
    display: inline-block;
    position: relative;
    top: -10px;
    box-sizing: border-box;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    vertical-align: top;
    text-align: center;
    background-color: #141d27;
}
.logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #2b343c;
}
.logo i {
    font-size: 24px;
    line-height: 44px;
    color: #80858a;
}
.logoLight {
    background-color: #ffda61;
}
.logoLight i{
    color: #333;
}
.count{
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    border-radius: 12px 12px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background-color: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}
.price {
    display: inline-block;
    box-sizing: border-box;
    margin-top: 12px;
    padding-right: 12px;
    vertical-align: top;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.pcicelight{
    color: #fff;
}
desc {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
}
.right {
    flex: 0 0 105px;
    width: 105px;
    text-align: center;
}
.pay {
    height: 48px;
    line-height: 48px;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    background-color: #2b333b;
}
/* .payment {
    width: 300px;
    border: 1px solid #bbb;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 3px 5px #bbb;
    position: absolute;
    z-index: 50;
    left: 50%;
    transform:translate(-50%,-250%);
    text-align: center;	
}
.paymentTitle {
    font-size: 16px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin:0;
    padding-top: 10px;
    text-align: center;
}
.paymentContent {
    padding: 10px 20px 15px;
    min-height: 36px;
    text-align: center;
}
.paymentContent p {
    font-size: 14px;
    line-height: 36px;
    text-align: center;
    margin: 0;
    color: #999;
}
.paymentButton {
    width: 100%;
    height: 30px;
    text-align: center;
    float: left;
}
.cancle, .sure {
    display: block;
    width: 50%;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    margin: 30px auto;
    text-align: center;
    color:#000;
    cursor: pointer;
    border-top: 1px solid #999;
}
.cancle {
    border-right: 1px solid #999;
}
.sure {
    float: right;
    color: #26a2ff;
} */ 
.payLight {
    background-color: #FFDA61;
    color: #333;
}
.shopcartList {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 41;
    height: 50%;
    width: 100%;
    transform: translate3d(0, 50%, 0);
    background-color: white;
    max-height: 70%;
}
.fold-enter-active, .fold-leave-active {
    transition: all 0.5s;
}
.fold-enter, .fold-leave-active {
        transform: translate3d(0, 0, 0);
}
.listHeader {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.listTitle {
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27);
    margin: 0;
}
.empty {
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220);
    margin:0;
}
.listContent {
    max-height: 70%;
    padding: 0 18px;
    background-color: #fff;
    overflow: scroll;
}
.listContent ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.listFood {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.listFoodname {
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
}
.listFoodprice {
    position: absolute;
    right: 95px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
}
.listControl {
    position: absolute;
    right: 0;
    bottom: -5px;
}
.backgroundall {
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.6);
}
.cartlistBackground {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    opacity: 1;
    filter: blur(10px);
    background: rgba(7, 17, 27, 0.6);
}
.paymentBackground {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    opacity: 1;
    filter: blur(10px);
    background: rgba(7, 17, 27, 0.6);
}
.background .fold-enter-active, .fold-leave-active {
    transition: all 0.5s;
}
.background .fold-enter, .fold-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
}
</style>
