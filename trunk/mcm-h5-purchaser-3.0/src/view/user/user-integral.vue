<template>
	<article class="page-layer user-integral">
		<section class="bg"></section>
		<article class="user-main padding">
			<article class="user-header item padding" ref="header">
				<p class=""><img src="../../images/user_pig.png" />当前积分</p>
				<h3>{{integralData.amount}}</h3>
				<section class="rule">
					积分规则说明
					<img src="../../images/user-view.png" />
				</section>
			</article>
			<article class="user-conten" >
				<h2 class="padding">———— <img src="../../images/user-title.png"/>积分明细 ————</h2>
				<div class="content" ref="content">
					<scroll :pullingDown="true" :pullUpLoad="true"  @pullingUp="onPullingUp" ref="scroll">
						<ul class="integral-list">
							<li class="padding" v-for="(v,k) in integralListData">
								<section class="pull-left">
									<p>{{v.approachText}}</p>
									<span>{{v.timeCreated}}</span>
								</section>
								<span class="pull-right" :class="{reduce:v.typeId==0||v.typeId==7}">{{v.typeId==0||v.typeId==7?'':'+'}}
									{{v.amount.toFixed(2)}}
								</span>
							</li>
							
						</ul>
					</scroll>
				</div>
				
			</article>
		</article>
	</article>
</template>

<script>
	import integralServer from 'actionurl/user/integral'
	import scroll from "components/common/scroll"
	export default {
		data(){
			return{
				integralData:'',
				integralListData:[],
				option : {
		          	pageNum : 1,
		          	size : 10,
		          	pages : 1,
		          	total : 0,
		          	walletType : 1
	            },
			}
		},
		created(){
			integralServer.getIntegral(this);
			integralServer.getIntegralList(this);
		},
		mounted() {
			this.calculateViewHeight();
		},
		methods : {
			onPullingUp() {
				var _that = this;
				setTimeout(() => {
					integralServer.getIntegralList(_that, (count) => {
						_that.pullingUpPage(count);
					});
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
			},
			calculateViewHeight() {
				if(this.$refs.header) {
					const h = this.$refs.header.getBoundingClientRect().height;
					this.$refs.content.style.height = (document.body.clientHeight - h - 50) + "px";
				}
			}
		},
		components : {
			scroll
		}
	}
</script>

<style lang="less" scoped>
	@import "../../common/less/config.less";
	.bg {
		position: fixed;
		top: 0;
		width: 100%;
		background: #19191E;
		.pxrem(height, 130);
		z-index: -1;
	}
	
	.user-main {
		.item {
			background: #fff;
			.pxrem(margin-bottom, 20);
			.header {
				border-bottom: 1px solid #E5E5E5;
			}
		}
		.user-header {
			position: relative;
			.pxrem(height, 220);
			.pxrem(padding, 40);
			box-sizing: border-box;
			background: #3D4247;
			.pxrem(border-radius, 10);
			color: #B4C4DB;
			p {
				.pxrem(font-size, 28);
				img {
					.pxrem(width, 35);
					.pxrem(margin-right, 5);
					vertical-align: bottom;
				}
			}
			h3 {
				.pxrem(font-size, 70);
				.pxrem(text-indent, 40);
			}
			.rule {
				position: absolute;
				right: 0;
				.pxrem(top, 75);
				.pxrem(height, 60);
				.pxrem(line-height, 60);
				.pxrem(font-size, 26);
				background: #B4C4DB;
				.pxrem(border-top-left-radius, 28);
				.pxrem(border-bottom-left-radius, 28);
				color: #393E43;
				.pxrem(padding-left, 20);
				.pxrem(padding-right, 20);
				img {
					.pxrem(width, 30);
					vertical-align: sub;
				}
			}
		}
		.user-conten {
			background: #fff;
			.pxrem(border-top-left-radius, 10);
			.pxrem(border-top-right-radius, 28);
			h2 {
				text-align: center;
				.pxrem(font-size, 36);
				vertical-align: middle;
				border-bottom: 1px dashed #D7D7D7;
				position: relative;
				.common() {
					content: "";
					display: inline-block;
					.pxrem(width, 20);
					.pxrem(height, 20);
					.pxrem(border-radius, 10);
					position: absolute;
					background: @m-back;
					.pxrem(bottom, -15);
				}
				&:before {
					.common();
					.pxrem(left, -15);
				}
				&:after {
					.common();
					.pxrem(right, -15);
				}
				img {
					.pxrem(width, 40);
					.pxrem(margin-right, 10);
				}
			}
			ul {
				li {
					.clearfix();
					border-bottom: 1px solid #EEEEEE;
					section {
						p {
							.pxrem(font-size, 32);
						}
						span {
							.pxrem(font-size, 24);
							color: #666;
						}
					}
					&>span {
						.pxrem(font-size, 36);
						color: #1EC551;
						.pxrem(height, 80);
						.pxrem(line-height, 80);
					}
					.reduce{
						color: #F9AB0C;
					}
				}
			}
		}
	}
</style>