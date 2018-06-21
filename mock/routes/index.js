var express = require('express');
var router = express.Router();
/* 权限路由：0:角色1、1:角色2 */
/* GET home page. */
//1.用户端 个人中心
let login = false, role = false
router.post('/php/public/user/userDetail', function(req, res, next) {
   let user = {
       "status": "1",
       "data": {
           "userName": "野渡",   //用户名
           "mobile": "13355989898",      //联系方式
           "logo": null,        //logo
           "company": "百度",    //企业名称
           "website":"www.1.com",//网址
           "address":"北京",  //地址
           "phone":"0530-7898787",         //企业电话
           "businessLicense":"11er45345",  //营业执照
           "orgCode":"123wer3453" ,     //企业组织代码
           "userType":"0"
       }
   }
    if(login){
       user.status = "0";
    }
    if (role) {
        user.data.userType = "1";
    }
    res.json(user);
});
router.post('/php/public/user/login', function(req, res, next) {
    login = true;
    if(req.body.userName === '456'){
        role = true;
    }
    res.json({
        "status": "0",
        "data": {
            "userName": "野渡",   //用户名
            "mobile": "13355989898",      //联系方式
            "logo": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525859355171&di=133b1738c89a1add80049db388baaa03&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F07%2F79%2F16pic_779291_b.jpg",        //logo
            "company": "百度",    //企业名称
            "website":"www.1.com",//网址
            "address":"北京",  //地址
            "phone":"0530-7898787",         //企业电话
            "businessLicense":"11er45345",  //营业执照
            "orgCode":"123wer3453" ,     //企业组织代码
            "userType":"1"
        }
    });


});
router.post('/php/public/user/logout', function(req, res, next) {
    /* const query=req.body.name;
    alert(query);*/
    login = false;
    role = false;
    res.json({
        "status": "0",
        "data": {
            "userName": "野渡",   //用户名
            "mobile": "13355989898",      //联系方式
            "logo": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525859355171&di=133b1738c89a1add80049db388baaa03&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F07%2F79%2F16pic_779291_b.jpg",        //logo
            "company": "百度",    //企业名称
            "website":"www.1.com",//网址
            "address":"北京",  //地址
            "phone":"0530-7898787",         //企业电话
            "businessLicense":"11er45345",  //营业执照
            "orgCode":"123wer3453" ,     //企业组织代码
            "userType":"1"
        }
    });


});
router.post('/php/public/update', function(req, res, next) {
    /* const query=req.body.name;
    alert(query);*/
    res.json({
        "status": "1",
        /* "data": ['错误']*/
        "data": {
            "userName": "野渡修改",   //用户名
            "mobile": "13355989898",      //联系方式
            "logo": "http://pic1.5442.com/2015/1002/03/02.jpg",        //logo
            "company": "百度",    //企业名称
            "website":"www.1.com",//网址
            "address":"北京",  //地址
            "phone":"0530-7898787",         //企业电话
            "businessLicense":"11er45345",  //营业执照
            "orgCode":"123wer3453" ,     //企业组织代码
            "userType":"1"
        }
    });


});
// 2.上传文件接口
router.post('/php/public/user/uploadFile', function(req, res, next) {
    res.json({
        "status": "0",
        "data": "sd/sd.text"
    });
});
router.post('/php/public/upload/uploadReport', function(req, res, next) {
    res.json({
        "status": "0",
        "data": "sdsdfsfdsfsdfdsfdsdfsfsfdsfsfdsfsdfsdfsfsfsfsfsdfssd/sd.text"
    });
});
router.post('/php/public/upload/uploadOther', function(req, res, next) {
    res.json({
        "status": "1",
        "data": "sd/sd.text"
    });
});
//3.上传图片接口
router.post('/php/public/user/uploadImg', function(req, res, next) {
    res.json({
        "status": "0",
        "data": "http://img.zcool.cn/community/018d4e554967920000019ae9df1533.jpg@900w_1l_2o_100sh.jpg"
    });
});
// 6.修改密码
router.post('/php/public/user/resetPassword', function(req, res, next) {
    res.json({
        "status": "0",
        "data": "sd/sd.text"
    });
});
router.post('/php/public/list', function(req, res, next) {
    res.json({
        "status": "0",
        "data":{
            "totalNumber" : "50",
            "dataList":[{
                "policyNum":"01q23", //号
                "insurantComName": "阿里",   //企业
                "insurantWebsite": "www.a.com",   //网址
                "policyPlan": "A计划",    //计划
                "status":"1",//状态
                "validityStart":"20180101" //时间
            },
                {
                    "policyNum":"01q45", //号
                    "insurantComName": "阿里",   //企业
                    "insurantWebsite": "www.a.com",   //网址
                    "policyPlan": "A计划",    //计划
                    "status":"1",//状态
                    "validityStart":"20180101" //时间
                }

            ]}
    })
});
router.post('/php/public/policy/serviceList', function(req, res, next) {
    res.json({
        "status": "0",
        "data":{
            "totalNumber" : "50",
            "dataList":[{
                "id":"1", //保单号
                "name": "阿里"   //企业
            },
                {
                    "id":"2", //保单号
                    "name": "阿里"   //企业
                },
                {
                    "id":"3", //保单号
                    "name": "阿里"   //企业
                },
                {
                    "id":"4", //保单号
                    "name": "阿里"   //企业
                },
                {
                    "id":"5", //保单号
                    "name": "阿里"   //企业
                }

            ]}
    })
});
router.post('/add', function(req, res, next) {
    res.json({
        "status": "0",
        "data": "sd/sd.text"
    });
});
module.exports = router;
