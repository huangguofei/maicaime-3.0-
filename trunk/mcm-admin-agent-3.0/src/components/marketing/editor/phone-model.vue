<!-- 手机模型 -->
<template>
	<div class="phone-model">
		<span class="p-icon"><i class="p-icon-2"></i><i class="p-icon-1"></i></span>
		<div class="phone-content">
			<header>
				{{title}}
			</header>
			<div class="editor-con">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props : {
			title : {
				type : String,
				default : "主页管理"
			}
		}
	}
</script>
<style lang="less" scoped>
	@import "../../../common/less/config.less";
	.phone-model{
		padding:60px 0;
		background: #FFF;
		width:390px;
		border-radius:60px;
		@back:#D6E2EF;
		position: relative;
		float:left;
		margin-left:10%;
		.p-icon{
			position: absolute;
			top:20px;
			left:50%;
			margin-left:-35px;
		}
		.p-icon-1{
			display: inline-block;
			width:60px;
			height:5px;
			border-radius: 6px;
			background: @back;
			position: relative;
			top:-1px;
			right:-5px;
		}
		.p-icon-2{
			display: inline-block;
			width:8px;
			height:8px;
			border-radius: 50%;
			background: @back;
		}
		.phone-content{
			width:375px;
			margin:auto;
			background: #f3f3f3;
			header{
				background: #000;
				color:#FFF;
				height:42px;
				line-height: 42px;
				text-align: center;
				font-size:@size-title;
			}
			.editor-con{
				min-height: 600px;
			}
		}
	}
</style>