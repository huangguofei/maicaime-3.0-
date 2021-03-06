/**
 * author hgf 
 * day    2017-9-27
 * 订单
 */
import serverAPI from "apiurl/order"
import cityApi from "apiurl/public"
export default {
	/*获取订单列表数据*/
	getOrderListData(vm, callback) {
		var option = vm.option;
		serverAPI.orderAPI(option, (result) => {
			if(JSON.stringify(option.orderStatus) == "[30,40]") {
				result.resultList.forEach((v, k) => {
					v.select = false;
					//通过比较现在时间和配送结束时间，判断是否是即将送达和忘记收货
//					if(vm.selectIndex == 2) { //即将送达
//						if(Date.parse(new Date(v.deliveryEndTime)) < Date.parse(new Date())) {
//							delete result.resultList[k];
//						}
//					} else if(vm.selectIndex == 3) { //忘记收货
//						if(Date.parse(new Date(v.deliveryEndTime)) > Date.parse(new Date())) {
//							delete result.resultList[k];
//						}
//					}
				});
			}
			var orderStatus = "";
			if(option.orderStatus) {
				orderStatus = option.orderStatus instanceof Array ? option.orderStatus.toString() : option.orderStatus;
			} else {
				orderStatus = vm.orderStatus;
			}
			if(orderStatus == vm.orderType) {
				vm.$store.commit("CONCAT_ORDER_LIST", result.resultList);
			} else {
				vm.$store.commit("UPDATE_ORDER_LIST", result.resultList);
			}
			vm.$store.commit("SELECT_ORDER_TYPE", orderStatus);
			option.total = result.totalCount;
			var len = result.resultList.length;
			if(len > 0) {
				option.pageNum = result.currentPage + 1;
				vm.$store.commit("RECORD_THAT_PAGE", option.pageNum);
			}
			callback ? callback(len) : "";
			vm.isLoad = true;
		}, (error) => {
			vm.isLoad = true;
		});
	},
	/*获取订单详情*/
	getOrderDetails(vm) {
		var data = {
			orderId: vm.orderId
		}
		if(vm.orderStatus == 20)
			serverAPI.orderNoPayDetailsAPI(data, (result) => {
				for(var i in result.products) {
					var item = result.products[i];
					if(item.products.length > 2) {
						item.msg = "(还有" + (item.products.length - 2) + "件食材)";
						item.showAll = false;
					}
					for(var j in item.products) {
						item.products[j].practicalNum = item.products[j].actualQuantity;
					}
				}
				vm.orderDetailsInfo = result;
				vm.orderStatus = result.orderStatusId;
			});
		else
			serverAPI.orderDetailsAPI(data, (result) => {
				result.showAll = false;
				if(result.products.length > 2) {
					result.msg = "(还有" + (result.products.length - 2) + "件食材)";
				}
				for(var i in result.products)
					result.products[i].practicalNum = result.products[i].actualQuantity;
				vm.orderDetailsInfo = result;
				vm.orderStatus = result.orderStatusId;
			});
	},
	/*确认收货*/
	orderConfirmReceipt(vm, orderId, callback) {
		var data = [],
			params = {};
		if(orderId) {
			vm.foodData.products.forEach(function(val, key) {
				data.push({
					orderProductId: val.orderProductId,
					actualQuantity: val.practicalNum
				});
			});
			params.orderId = orderId;
		} else {
			if(vm.orderDetailsInfo.products.length != 0) {
				_mergeData(vm.orderDetailsInfo.products);
			}
			params.orderId = vm.orderId;
		}
		params.orderprductIds = JSON.stringify(data);
		serverAPI.orderConfirmReceiptAPI(params, (result) => {
			if(result > 0) {
				callback ? callback(result) : null;
			} else {
				vm.$router.push({
					name: "order.success"
				});
			}

		});

		function _mergeData(list) {
			for(var i in list) {
				if(list[i].products) {
					_mergeData(list[i].products);
				} else {
					data.push({
						orderProductId: list[i].orderProductId,
						actualQuantity: list[i].practicalNum
					});
				}
			}
		}
	},
	/*批量收货*/
	orderAllConfirmReceipt(vm, datas) {
		serverAPI.orderAllConfirmReceiptAPI({
			orderIds: datas
		}, (result) => {
			console.log(result);
			var price = 0;
			for(var i in result) {
				price += result[i];
			}
			if(price > 0) {
				vm.$router.push({
					name: "order.index.obligation"
				});
			} else {
				vm.$router.push({
					name: "order.index.accomplish"
				});
			}
		});
	},
	/*积分订单确认收货*/
	integralOrderConfirmReceipt(vm, id) {
		var params = {
			orderId: id,
			orderprductIds: ""
		};
		serverAPI.orderConfirmReceiptAPI(params, (result) => {
			if(result > 0) {
				callback ? callback(result) : null;
			} else {
				vm.$router.push({
					name: "order.success"
				});
			}

		});
	},
	/*取消订单*/
	orderCancel(vm) {
		serverAPI.orderCancelAPI({
			orderId: vm.orderId,
			cause: ""
		}, (result) => {
			cJs.message("取消成功");
			setTimeout(() => {
				vm.$router.go(0);
			}, 1000);
			//			vm.$router.push({
			//				name: "often.orders.success"
			//			});
		});

	},
	/*获取订单食材列表*/
	orderFood(vm, id, discountAmount) {
		serverAPI.orderFoodAPI({
			orderId: id
		}, (result) => {
			vm.foodData.totalAmount = 0;
			result.forEach(function(val, key) {
				val.practicalNum = val.actualQuantity;
				vm.foodData.totalAmount += val.totalAmount;
			});
			vm.foodData.totalAmount -= discountAmount;
			if(vm.foodData.totalAmount < 0) {
				vm.foodData.totalAmount = 0;
			}
			vm.foodData.products = result;
			vm.foodData.discountAmount = discountAmount;
		});
	}

}