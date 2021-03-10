import service from '@/utils/request'

// @Tags RoomMetrics
// @Summary 创建RoomMetrics
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.RoomMetrics true "创建RoomMetrics"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /rMetrics/createRoomMetrics [post]
export const createRoomMetrics = (data) => {
     return service({
         url: "/rMetricsCount/createRoomMetrics",
         method: 'post',
         data
     })
 }


// @Tags RoomMetrics
// @Summary 删除RoomMetrics
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.RoomMetrics true "删除RoomMetrics"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /rMetrics/deleteRoomMetrics [delete]
 export const deleteRoomMetrics = (data) => {
     return service({
         url: "/rMetricsCount/deleteRoomMetrics",
         method: 'delete',
         data
     })
 }

// @Tags RoomMetrics
// @Summary 删除RoomMetrics
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除RoomMetrics"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /rMetrics/deleteRoomMetrics [delete]
 export const deleteRoomMetricsByIds = (data) => {
     return service({
         url: "/rMetricsCount/deleteRoomMetricsByIds",
         method: 'delete',
         data
     })
 }

// @Tags RoomMetrics
// @Summary 更新RoomMetrics
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.RoomMetrics true "更新RoomMetrics"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /rMetrics/updateRoomMetrics [put]
 export const updateRoomMetrics = (data) => {
     return service({
         url: "/rMetricsCount/updateRoomMetrics",
         method: 'put',
         data
     })
 }


// @Tags RoomMetrics
// @Summary 用id查询RoomMetrics
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.RoomMetrics true "用id查询RoomMetrics"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /rMetrics/findRoomMetrics [get]
 export const findRoomMetrics = (params) => {
     return service({
         url: "/rMetricsCount/findRoomMetrics",
         method: 'get',
         params
     })
 }


// @Tags RoomMetrics
// @Summary 分页获取RoomMetrics列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取RoomMetrics列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /rMetrics/getRoomMetricsList [get]
 export const getRoomMetricsList = (params) => {
     return service({
         url: "/rMetricsCount/getRoomMetricsList",
         method: 'get',
         params
     })
 }

export const createRoomMetricsCountJob = (data) => {
    return service({
        url: "/rMetricsCount/doJob",
        method: 'post',
        data
    })
}
