import service from '@/utils/request'

// @Tags GameMatches
// @Summary 创建GameMatches
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.GameMatches true "创建GameMatches"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /GameMatch/createGameMatches [post]
export const createGameMatches = (data) => {
     return service({
         url: "/game_match/createGameMatches",
         method: 'post',
         data
     })
 }


// @Tags GameMatches
// @Summary 删除GameMatches
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.GameMatches true "删除GameMatches"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /GameMatch/deleteGameMatches [delete]
 export const deleteGameMatches = (data) => {
     return service({
         url: "/game_match/deleteGameMatches",
         method: 'delete',
         data
     })
 }

// @Tags GameMatches
// @Summary 删除GameMatches
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除GameMatches"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /GameMatch/deleteGameMatches [delete]
 export const deleteGameMatchesByIds = (data) => {
     return service({
         url: "/game_match/deleteGameMatchesByIds",
         method: 'delete',
         data
     })
 }

// @Tags GameMatches
// @Summary 更新GameMatches
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.GameMatches true "更新GameMatches"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /GameMatch/updateGameMatches [put]
 export const updateGameMatches = (data) => {
     return service({
         url: "/game_match/updateGameMatches",
         method: 'put',
         data
     })
 }


// @Tags GameMatches
// @Summary 用id查询GameMatches
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.GameMatches true "用id查询GameMatches"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /GameMatch/findGameMatches [get]
 export const findGameMatches = (params) => {
     return service({
         url: "/game_match/findGameMatches",
         method: 'get',
         params
     })
 }


// @Tags GameMatches
// @Summary 分页获取GameMatches列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取GameMatches列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /GameMatch/getGameMatchesList [get]
 export const getGameMatchesList = (params) => {
     return service({
         url: "/game_match/getGameMatchesList",
         method: 'get',
         params
     })
 }

export const getGameMatchOtherData = (params) => {
    return service({
        url: "/game_match/getGameMatchesOtherData",
        method: 'get',
        params
    })
}