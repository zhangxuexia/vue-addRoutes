const config = {
  mockUrl: '/php/public',
  imgUpload: '/php/public/index.php/api/upload/uploadLogo', // 图片上传 logo
  uploadExcel: '/php/public/index.php/api/upload/uploadExcel', // 批量上传EXCEL
  uploadOther: '/php/public/index.php/api/upload/uploadOther', // 上传网站其他信息
  uploadReport: '/php/public/index.php/api/upload/uploadReport', //  ，类型：doc/pdf
  itemOptions: [{
    value: '-1',
    label: '请选择'
  }, {
    value: '0',
    label: '单号'
  }, {
    value: '1',
    label: '企业'
  }, {
    value: '2',
    label: '网址'
  }, {
    value: '3',
    label: '保险计划'
  }, {
    value: '4',
    label: '保险状态'
  }],
  statusOptions: [{
    value: '0',
    label: '服务中'
  }, {
    value: '1',
    label: '事故中'
  }, {
    value: '2',
    label: '已完成'
  }]
}
export default config
