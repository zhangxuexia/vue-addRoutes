# 项目结构
mock:node.js搭建的模拟数据的小服务


myProject:vue项目。登录权限设置，根据角色，动态添加路由

#启动mock：

进入mock目录后

 npm install

 npm start

 #启动 myProject

 npm install

 npm run dev

 #用户名 密码

 角色1 : 123  a123456

 角色2 : 456  a123456

 #2019.5.30更新
 这种权限路由拼接的方式，灵活度太低，不适用复杂点的项目，只适合练习。
 目前项目采用：页面路由meta上加参数权限id,在beforeEach上根据用户权限id集合判断。
