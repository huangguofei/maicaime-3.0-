<!-- 设置推荐食材 -->
<template>
	<div class="referrals-prod">
		<header>
			<label>推荐食材</label>
			<el-radio class="radio" v-model="radio" label="1">智能推荐</el-radio> 
  			<el-radio class="radio" v-model="radio" label="2" disabled>手动设置</el-radio>
		</header>
		<section v-if="radio == 2">
			<ul>
				<li class="prod-item" v-for="p in 5">
					<div class="p-img">
						<img src="../../../../images/home_meat.png">
					</div>
					<div class="info">
						<p class="name">优选胡萝卜 井冈胡 萝卜 约500</p>
						<p class="price">¥4.50</p>
						<span class="or-price">¥5.20</span>
					</div>
					<div class="event">
						<!-- <span class="edit">编辑</span> -->
						<span class="del">删除</span>
					</div>
				</li>
				<li class="prod-item prod-add el-icon-plus" @click="addprods">
					<span>添加食材</span>
				</li>
			</ul>
		</section>
		<prods-dialog ref="dialog"></prods-dialog>
	</div>	
</template>
<script>
	import prodsDialog from "components/marketing/editor/home/prods-dialog"
	export default{
		data() {
			return{
				radio : '1'
			}
		},
		components : {
			prodsDialog
		},
		methods : {
			addprods() {
				this.$refs.dialog.dialogTableVisible = true;
			}
		}
	}
</script>
<style lang="less">
@import "../../../../common/less/config.less";
.referrals-prod{
	header{
		label{
			margin-right:20px;
		}
	}
	section{
		margin-top:20px;
		&:after{
			.clearFloat;
		}
	}
	.prod-item{
		position: relative;
		width:182px;
		height:260px;
		@b:1px solid @color-border;
		border:@b;
		float:left;
		margin-left:-1px;
		margin-top:-1px;
		.event{
			position: absolute;
			top:0;
			right:0;
			padding:5px;
			background: @color-main;
			span{
				display: inline-block;
				padding:0 5px;
				color:#FFF;
				cursor: pointer;
			}
			.edit{
				border-right:1px solid #FFF;
			}
		}
		.p-img{
			height:137px;
			text-align: center;
			margin-top:20px;
			img{
				height:100%;
			}
		}
		.info{
			padding:10px;
			.name{
				font-size:@size-title;
			}
			.price{
				font-size:@size-m-title;
				color:@color-yellow;
			}
			.or-price{
				text-decoration: line-through;
				color:#999;
			}
		}
	}
	.prod-add{
		font-size:28px;
		line-height: 240px;
		text-align: center;
		color:@color-main;
		position: relative;
		cursor: pointer;
		span{
			font-size:@size-title;
			position: absolute;
			bottom:-10px;
			left:60px;
		}
	}

}
</style>