import request from '@/utils/request'
// 获取分页列表  /admin/product/baseTrademark/{page}/{limit} get
export const reqTradeMark = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get'
})
// 添加品牌  /admin/product/baseTrademark/save post
export const reqAddTradeMark = (data) => request({
  url: '/admin/product/baseTrademark/save',
  method: 'post',
  data
})
// 修改品牌  /admin/product/baseTrademark/update put
export const reqReviseTradeMark = (data) => request({
  url: '/admin/product/baseTrademark/update',
  method: 'put',
  data
})
// 删除品牌 /admin/product/baseTrademark/remove/{id} delete
export const reqRemoveTradeMark = (id) => request({
  url: `/admin/product/baseTrademark/remove/${id}`,
  method: 'delete'
})
