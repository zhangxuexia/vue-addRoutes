const config = {
  mockUrl: '/php/public',
  imgUpload: '/php/public/upload/uploadLogo', // 图片上传 logo
  uploadExcel: '/php/public/upload/uploadExcel', // 上传EXCEL
  uploadOther: '/php/public/upload/uploadOther', // 上传其他信息
  uploadReport: '/php/public/upload/uploadReport', //  ，类型：doc/pdf
  itemOptions: [{
    value: '-1',
    label: '请选择'
  }, {
    value: '0',
    label: '第一项'
  }, {
    value: '1',
    label: '第二项'
  }, {
    value: '2',
    label: '第三项'
  }, {
    value: '3',
    label: '第四项'
  }, {
    value: '4',
    label: '第五项'
  }],
  statusOptions: [{
    value: '0',
    label: '状态1'
  }, {
    value: '1',
    label: '状态2'
  }, {
    value: '2',
    label: '状态3'
  }]
}
export default config
