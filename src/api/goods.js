import service from '@/utils/request'

// @Tags Goods
// @Summary 创建Goods
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Goods true "创建Goods"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /goods/createGoods [post]
export const createGoods = (data) => {
     return service({
         url: "/goods/createGoods",
         method: 'post',
         data
     })
 }


// @Tags Goods
// @Summary 删除Goods
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Goods true "删除Goods"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /goods/deleteGoods [delete]
 export const deleteGoods = (data) => {
     return service({
         url: "/goods/deleteGoods",
         method: 'delete',
         data
     })
 }

// @Tags Goods
// @Summary 删除Goods
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Goods"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /goods/deleteGoods [delete]
 export const deleteGoodsByIds = (data) => {
     return service({
         url: "/goods/deleteGoodsByIds",
         method: 'delete',
         data
     })
 }

// @Tags Goods
// @Summary 更新Goods
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Goods true "更新Goods"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /goods/updateGoods [put]
 export const updateGoods = (data) => {
     return service({
         url: "/goods/updateGoods",
         method: 'put',
         data
     })
 }


// @Tags Goods
// @Summary 用id查询Goods
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Goods true "用id查询Goods"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /goods/findGoods [get]
 export const findGoods = (params) => {
     return service({
         url: "/goods/findGoods",
         method: 'get',
         params
     })
 }


// @Tags Goods
// @Summary 分页获取Goods列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取Goods列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /goods/getGoodsList [get]
 export const getGoodsList = (params) => {
     return service({
         url: "/goods/getGoodsList",
         method: 'get',
         params
     })
 }

export const notify = (params) => {
    return service({
        url: "/goods/notify",
        method: 'put',
        params
    })
}

// @Tags Game
// @Summary 更新游戏的状态
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "更新游戏的状态"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /game/notifyGame [get]
export const updateGoodsSaleStatus = (params) => {
    return service({
        url: "/goods/updateSaleStatus",
        method: 'put',
        params
    })
}