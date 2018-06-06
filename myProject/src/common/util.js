export function getForm (formId) {
  const form = document.getElementById(formId)
  var arr = {}
  for (var i = 0; i < form.elements.length; i++) {
    var feled = form.elements[i]
    switch (feled.type) {
      case undefined:
      case 'button':
      case 'file':
      case 'reset':
      case 'submit':
        break
      case 'checkbox':
      case 'radio':
        break
      default:
        if (feled.name !== '') {
          if (arr[feled.name]) {
            arr[feled.name] = arr[feled.name] + ',' + feled.value
          } else {
            arr[feled.name] = feled.value
          }
        }
    }
  }
  return arr
}
export function dealList (list) {
  list.map((item) => {
    if (item.status === '0') {
      item.statusStr = '<span  class="blue">状态1</span>'
    } else if (item.status === '1') {
      item.statusStr = '<span  class="red">状态2</span>'
    } else {
      item.statusStr = '<span  class="green">状态3</span>'
    }
  })
  return list
}
export function dealStatus (list) {
  list.map((item) => {
    if (item.status === '0' || item.status === '1') {
      item.statusStr = '<span  class="blue">状态1</span>'
    } else if (item.status === '2') {
      item.statusStr = '<span  class="red">状态2</span>'
    } else if (item.status === '3') {
      item.statusStr = '<span  class="green">状态3</span>'
    } else if (item.status === '4') {
      item.statusStr = '<span class="red">状态4</span>'
    } else if (item.status === '5') {
      item.statusStr = '<span class="green">状态5</span>'
    }
  })
  return list
}
// 计算高度
export function computedHight (id) {
  let divHeight = 0
  divHeight = document.getElementById(id).offsetHeight
  return divHeight
}
// type:image 图片类型，excel:excel文件类型，other:网站其他信息类型,report:上传报告类型
export function getFileType (file, type) {
  let fileArr = file.split('.')
  let index = fileArr.length - 1
  let fileType = fileArr[index]
  let isType = false
  let imageArr = ['jpg', 'png', 'gif', 'jpeg']
  let excelArr = ['xls', 'xlsx']
  let reportArr = ['doc', 'docx', 'pdf']
  let otherArr = ['gif', 'xls', 'xlsx', 'jpeg', 'jpg', 'png', 'doc', 'gz', 'docx', 'pdf', 'zip', 'rar', 'txt']
  switch (type) {
    case 'image':
      isType = imageArr.indexOf(fileType)
      break
    case 'excel':
      isType = excelArr.indexOf(fileType)
      break
    case 'report':
      isType = reportArr.indexOf(fileType)
      break
    case 'other':
      isType = otherArr.indexOf(fileType)
      break
  }
  return isType >= 0
}
