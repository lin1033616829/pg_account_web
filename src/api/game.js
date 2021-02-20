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

// @Tags Game
// @Summary 获取其他游戏信息
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "获取其他游戏信息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /game/getGameOtherData [get]
 export const getGameOtherData = (params) => {
     return service({
         url: "/game/getOtherData",
         method: 'get',
         params
     })
 }

// @Tags Game
// @Summary 通知游戏缓存
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "通知游戏缓存"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /game/notifyGame [get]
export const notifyGame = (params) => {
    return service({
        url: "/game/notify",
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
export const updateGameStatus = (params) => {
    return service({
        url: "/game/updateStatus",
        method: 'put',
        params
    })
}

// @Tags Game
// @Summary 搜索获取Game列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "搜索获取Game列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /game/getGameList [get]
export const searchGameList = (params) => {
    return service({
        url: "/game/searchGameList",
        method: 'get',
        params
    })
}