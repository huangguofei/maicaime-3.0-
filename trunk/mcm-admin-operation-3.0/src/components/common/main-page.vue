<template>
	<div class="main-page">
		<div class="left">
			<slot name="leftMenu"></slot>			
		</div>
		<div class="right">
			<slot name="pageContent"></slot>
		</div>
	</div>
</template>
<style lang="less" scoped>
	@import "../../common/less/config.less";
	@h:100%;
	.main-page{
		padding-top:10px;
		height:@h;
		position: relative;
		.left{
			width:160px;
			background: #FFF;
			height:@h;
			position: absolute;
		}
		.right{
			height:@h;
			padding-left: 150px;
		}
		&:after{
			.clearFloat;
		}
	}
</style>
