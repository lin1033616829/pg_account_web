import service from '@/utils/request'

// @Tags Game
// @Summary 创建Game
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Game true "创建Game"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /game/createGame [post]
export const createGame = (data) => {
     return service({
         url: "/game/createGame",
         method: 'post',
         data
     })
 }


// @Tags Game
// @Summary 删除Game
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Game true "删除Game"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /game/deleteGame [delete]
 export const deleteGame = (data) => {
     return service({
         url: "/game/deleteGame",
         method: 'delete',
         data
     })
 }

// @Tags Game
// @Summary 删除Game
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Game"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /game/deleteGame [delete]
 export const deleteGameByIds = (data) => {
     return service({
         url: "/game/deleteGameByIds",
         method: 'delete',
         data
     })
 }

// @Tags Game
// @Summary 更新Game
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Game true "更新Game"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /game/updateGame [put]
 export const updateGame = (data) => {
     return service({
         url: "/game/updateGame",
         method: 'put',
         data
     })
 }


// @Tags Game
// @Summary 用id查询Game
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Game true "用id查询Game"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /game/findGame [get]
 export const findGame = (params) => {
     return service({
         url: "/game/findGame",
         method: 'get',
         params
     })
 }


// @Tags Game
// @Summary 分页获取Game列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取Game列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /game/getGameList [get]
 export const getGameList = (params) => {
     return service({
         url: "/game/getGameList",
         method: 'get',
         params
     })
 }

 export const getGameOtherData = (params) => {
     return service({
         url: "/game/getOtherData",
         method: 'get',
         params
     })
 }