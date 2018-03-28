/**
 * hgf 2017年12月8日
 * 数据模块
 */
import https from "../axios/https"
/*对账信息*/
export const checkAPI = {
	/*获取对账列表*/
	checkListAPI: (...v) => https.commAjax(cJs.apiDataReturnParams("get", "/trade/generalList", v)),
	/*采购商充值统计数据*/
	rechargeStatisticsAPI: (...v) => https.commAjax(cJs.apiDataReturnParams("get", "/trade/rechargeStats", v)),
}
/*提现申请*/
export const depositApplyAPI = {
	/*获取提现申请列表*/
	depositApplyListAPI: (...v) => https.commAjax(cJs.apiDataReturnParams("get", "/withdraw/list", v)),
	/*修改提现状态*/
	depositApplyChangeAPI: (...v) => https.commAjax(cJs.apiDataReturnParams("post", "/withdraw/changeStatus", v)),
	/*获取提现详情*/
	depositApplyDetailsAPI: (...v) => https.commAjax(cJs.apiDataReturnParams("get", "/withdraw/getWithdrawInfo", v)),
	/*修改备注*/
	depositApplyRemarkAPI: (...v) => https.commAjax(cJs.apiDataReturnParams("post", "/withdraw/changeOpRemark", v)),

}

/*账单列表*/
export const billAPI = {
	/*账单列表*/
	billListAPI: (...v) => https.commAjax(cJs.apiDataReturnParams("get", "/bill/list", v)),
	/*详情*/
	billDetailAPI: (...v) => https.commAjax(cJs.apiDataReturnParams("get", "/bill/recordList", v)),
	/*账单头部信息*/
	billHeadAPI: (...v) => https.commAjax(cJs.apiDataReturnParams("get", "/bill/info", v)),
}