import service from '@/utils/request'

// @Tags Student
// @Summary 创建Student
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Student true "创建Student"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /student1/createStudent [post]
export const createStudent = (data) => {
     return service({
         url: "/student1/createStudent",
         method: 'post',
         data
     })
 }


// @Tags Student
// @Summary 删除Student
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Student true "删除Student"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /student1/deleteStudent [delete]
 export const deleteStudent = (data) => {
     return service({
         url: "/student1/deleteStudent",
         method: 'delete',
         data
     })
 }

// @Tags Student
// @Summary 删除Student
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Student"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /student1/deleteStudent [delete]
 export const deleteStudentByIds = (data) => {
     return service({
         url: "/student1/deleteStudentByIds",
         method: 'delete',
         data
     })
 }

// @Tags Student
// @Summary 更新Student
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Student true "更新Student"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /student1/updateStudent [put]
 export const updateStudent = (data) => {
     return service({
         url: "/student1/updateStudent",
         method: 'put',
         data
     })
 }


// @Tags Student
// @Summary 用id查询Student
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Student true "用id查询Student"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /student1/findStudent [get]
 export const findStudent = (params) => {
     return service({
         url: "/student1/findStudent",
         method: 'get',
         params
     })
 }


// @Tags Student
// @Summary 分页获取Student列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取Student列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /student1/getStudentList [get]
 export const getStudentList = (params) => {
     return service({
         url: "/student1/getStudentList",
         method: 'get',
         params
     })
 }