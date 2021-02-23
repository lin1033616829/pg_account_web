import service from '@/utils/request'

// @Tags GoodsTag
// @Summary 创建GoodsTag
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.GoodsTag true "创建GoodsTag"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /GTags/createGoodsTag [post]
export const createGoodsTag = (data) => {
     return service({
         url: "/goodsTag/createGoodsTag",
         method: 'post',
         data
     })
 }


// @Tags GoodsTag
// @Summary 删除GoodsTag
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.GoodsTag true "删除GoodsTag"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /GTags/deleteGoodsTag [delete]
 export const deleteGoodsTag = (data) => {
     return service({
         url: "/goodsTag/deleteGoodsTag",
         method: 'delete',
         data
     })
 }

// @Tags GoodsTag
// @Summary 删除GoodsTag
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除GoodsTag"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /GTags/deleteGoodsTag [delete]
 export const deleteGoodsTagByIds = (data) => {
     return service({
         url: "/goodsTag/deleteGoodsTagByIds",
         method: 'delete',
         data
     })
 }

// @Tags GoodsTag
// @Summary 更新GoodsTag
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.GoodsTag true "更新GoodsTag"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /GTags/updateGoodsTag [put]
 export const updateGoodsTag = (data) => {
     return service({
         url: "/goodsTag/updateGoodsTag",
         method: 'put',
         data
     })
 }


// @Tags GoodsTag
// @Summary 用id查询GoodsTag
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.GoodsTag true "用id查询GoodsTag"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /GTags/findGoodsTag [get]
 export const findGoodsTag = (params) => {
     return service({
         url: "/goodsTag/findGoodsTag",
         method: 'get',
         params
     })
 }


// @Tags GoodsTag
// @Summary 分页获取GoodsTag列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取GoodsTag列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /GTags/getGoodsTagList [get]
 export const getGoodsTagList = (params) => {
     return service({
         url: "/goodsTag/getGoodsTagList",
         method: 'get',
         params
     })
 }