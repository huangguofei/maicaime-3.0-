<template>
	<article class="page-layer sales-rank">
		<header ref="head">
			<ul>
				<li :class="{active:rankType==1}" @click="changeRank('1')">菜品排行</li>
				<li :class="{active:rankType==2}" @click="changeRank('2')">客户排行</li>
				<!-- <li :class="{active:rankType==3}" @click="changeRank('3')">订单排行</li> -->
			</ul>
			<router-link :to="{path:'/user/salesTimeSearch',query:{type:1}}" class="select-time"><img src="../../../images/mine_rank_calendar2@2x.png" /></router-link>
		</header>
		<nav class="padding" ref="nav">
			<span class="title" v-if="rankType == 1">菜品排行榜</span>
			<span class="title" v-else-if="rankType == 2">客户排行榜</span>
			<span class="title" v-else>订单排行</span>
			<!--<span class="title">客户排行榜</span><span class="title">订单排行榜</span>-->
			<span class="search pull-right" @click="isShowSearch=!isShowSearch">{{searchStatus}}<img src="../../../images/order_arrow.png" /></span>
			<ul class="search-list padding" v-if="isShowSearch">
				<li @click="changeSearh(7)">7天排行榜</li>
				<li @click="changeSearh(30)">30天排行榜</li>
				<li @click="changeSearh(90)">90天排行榜</li>
			</ul>
		</nav>
		<article class="list bk-white" ref="content">
			<scroll :pullingDown="true" :pullUpLoad="true" @pullingUp="onPullingUp" ref="scroll">
				<rank-list v-for="(v,k) in listData" :listData="v" :index="k" :rankType="rankType"></rank-list>
			</scroll>
		</article>
	</article>
</template>

<script>
	import rankList from "components/user/saleRankList"
	import salesRankAction from "actionurl/user/salesRank"
	import scroll from "components/common/scroll"
	export default {
		data() {
			return {
				listData: [],
				rankType: 1,
				isShowSearch: false,
				searchStatus:"七天排行榜",
				option : {
					pageNum : 1,
					size : 10,
		          	startDate : "",
		          	endDate : ""
				},
				dayStatus : 7
			}
		},
		components: {
			rankList,
			scroll
		},
		created() {
			var query = this.$route.query;
			if(query.type && query.s && query.e) {
				this.rankType = query.type;
				this.option.startDate = query.s;
				this.option.endDate = query.e;
			} else {
				this.initQueryDate(7);
			}
			if(this.rankType == 1) {
				salesRankAction.getProdRandData(this);
			} else if(this.rankType == 2) {
				salesRankAction.getCustRankData(this);
			}
		},
		mounted() {
			if(this.$refs.head) {
				const h = this.$refs.head.getBoundingClientRect().height;
				const n = this.$refs.nav.getBoundingClientRect().height;
				this.$refs.content.style.height = (document.body.clientHeight - h - n) + "px";
			}
		},
		methods: {
			changeRank(type) {
				this.rankType = type;
				this.dayStatus = 7;
				var option = this.option;
				option.pageNum = 1;
				this.initQueryDate(this.dayStatus);
				if(type == "3") {
					cJs.message("程序员们正在加班赶");
					return false;
				}
				this.listData = [];
				this.changeSearh(this.dayStatus);
			},
			changeSearh(status){
				if(status == 7) {
					this.searchStatus = "7天排行榜";
				} else if(status == 30) {
					this.searchStatus = "30天排行榜";
				} else {
					this.searchStatus = "90天排行榜";
				}
				this.listData = [];
				this.dayStatus = status;
				this.isShowSearch=false;
				this.initQueryDate(status);
				var option = this.option;
				option.pageNum = 1;
				if(this.rankType == 1) {
					salesRankAction.getProdRandData(this);
				} else if(this.rankType == 2) {
					salesRankAction.getCustRankData(this);
				}
			},
			initQueryDate(days) {
				var endDate = new Date();
				var year = endDate.getFullYear();
				var mon = endDate.getMonth()+1;
				var day = endDate.getDate();
				this.option.endDate = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);;
				this.option.startDate = this.getBeforeDate(days);
			},
			getBeforeDate(n) {
				var n = n;
				var d = new Date();
				var year = d.getFullYear();
				var mon=d.getMonth()+1;
				var day=d.getDate();
				if(day <= n){
		             if(mon>1) {
		                mon=mon-1;
		           	 }else {
						year = year-1;
						mon = 12;
		              }
				}
				d.setDate(d.getDate()-n);
				year = d.getFullYear();
				mon=d.getMonth()+1;
				day=d.getDate();
				return year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
			},
			onPullingUp() {
				var _that = this;
				setTimeout(() => {
					if(_that.rankType == 1) {
						salesRankAction.getProdRandData(_that, (count) => {
							_that.pullingUpPage(count);
						});
					}else if(_that.rankType == 2) {
						salesRankAction.getCustRankData(_that, (count) => {
							_that.pullingUpPage(count);
						});
					}
				}, 500);
			},
			pullingUpPage(count) {
				if(count >= 10) {
					this.$refs.scroll.forceUpdate();
				} else {
					setTimeout(() => {
						this.$refs.scroll.forceUpdate(true);
					}, 20);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../../common/less/config.less";
	.sales-rank {
		header {
			position: relative;
			background: #222222;
			.pxrem(height, 80);
			.pxrem(padding-top, 10);
			ul {
				width: 70%;
				margin: 0 auto;
				display: flex;
				color: #fff;
				border: 1px solid #fff;
				.pxrem(border-radius, 8);
				li {
					width: 50%;
					.pxrem(height, 60);
					.pxrem(line-height, 60);
					.pxrem(padding-left, 25);
					.pxrem(padding-right, 25);
					border-left: 1px solid #fff;
					box-sizing: border-box;
					text-align: center;
				}
				li:first-child {
					border: 0;
				}
				li.active {
					background: #fff;
					color: #222;
				}
			}
			.select-time {
				position: absolute;
				.pxrem(right, 20);
				.pxrem(top, 18);
				.pxrem(width, 45);
				img {
					width: 100%;
				}
			}
		}
		nav {
			.pxrem(height, 90);
			position: relative;
			box-sizing: border-box;
			span {
				display: inline-block;
				.pxrem(line-height, 58);
				.pxrem(font-size, 28);
			}
			.search {
				img {
					.pxrem(margin-left, 5);
				}
			}
			.search-list {
				position: absolute;
				.pxrem(right, 10);
				.pxrem(top, 110);
				background: #fff;
				box-shadow: 0px 0px 10px #ccc;
				z-index: 1;
				&:before {
					content: '';
					display: inline-block;
					border-left: 10px solid transparent;
					border-right: 10px solid transparent;
					border-bottom: 10px solid hsla(0, 0%, 80%, 0.41);;
					/*border-bottom-color: rgba(0, 0, 0, 0.2);*/
					position: absolute;
					.pxrem(top,-25);
					.pxrem(right,10);
					
				}
				&:after {
					content: '';
					display: inline-block;
					border-left: 9px solid transparent;
					border-right: 9px solid transparent;
					border-bottom: 9px solid #ffffff;
					position: absolute;
					.pxrem(top,-24);
					.pxrem(right,12);
				}
				li {
					.pxrem(width, 200);
					.pxrem(height, 60);
					.pxrem(line-height, 60);
					text-align: center;
				}
			}
		}
	}
</style>