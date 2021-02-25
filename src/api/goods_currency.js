import service from '@/utils/request'

// @Tags GoodsCurrency
// @Summary 创建GoodsCurrency
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.GoodsCurrency true "创建GoodsCurrency"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /Goodscurreny/createGoodsCurrency [post]
export const createGoodsCurrency = (data) => {
     return service({
         url: "/goodsCurreny/createGoodsCurrency",
         method: 'post',
         data
     })
 }


// @Tags GoodsCurrency
// @Summary 删除GoodsCurrency
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.GoodsCurrency true "删除GoodsCurrency"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /Goodscurreny/deleteGoodsCurrency [delete]
 export const deleteGoodsCurrency = (data) => {
     return service({
         url: "/goodsCurreny/deleteGoodsCurrency",
         method: 'delete',
         data
     })
 }

// @Tags GoodsCurrency
// @Summary 删除GoodsCurrency
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除GoodsCurrency"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /Goodscurreny/deleteGoodsCurrency [delete]
 export const deleteGoodsCurrencyByIds = (data) => {
     return service({
         url: "/goodsCurreny/deleteGoodsCurrencyByIds",
         method: 'delete',
         data
     })
 }

// @Tags GoodsCurrency
// @Summary 更新GoodsCurrency
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.GoodsCurrency true "更新GoodsCurrency"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /Goodscurreny/updateGoodsCurrency [put]
 export const updateGoodsCurrency = (data) => {
     return service({
         url: "/goodsCurreny/updateGoodsCurrency",
         method: 'put',
         data
     })
 }


// @Tags GoodsCurrency
// @Summary 用id查询GoodsCurrency
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.GoodsCurrency true "用id查询GoodsCurrency"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /Goodscurreny/findGoodsCurrency [get]
 export const findGoodsCurrency = (params) => {
     return service({
         url: "/goodsCurreny/findGoodsCurrency",
         method: 'get',
         params
     })
 }


// @Tags GoodsCurrency
// @Summary 分页获取GoodsCurrency列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取GoodsCurrency列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /Goodscurreny/getGoodsCurrencyList [get]
 export const getGoodsCurrencyList = (params) => {
     return service({
         url: "/goodsCurreny/getGoodsCurrencyList",
         method: 'get',
         params
     })
 }


export const goodsCurrencySearch = (params) => {
    return service({
        url: "/goodsCurreny/goodsCurrencySearch",
        method: 'get',
        params
    })
}