#这是一个使用NODEJS开发的,WEB管理系统
##主要功能：
* 后台用户管理
CRUD，密码重置,发邮件,多角色管理
* 资源管理
CRUD
* 角色管理
CRUD，权限配置
##技术特点：
* 使用了ES6语法，使用了ES6的Iterator
* 用了Tj的CO模块，所以不存在回调噩梦
* 为了让pm2管理运行进程，并且多进程共享session，用了redis存放session
##环境要求：
* node.js(v6.4.0)
* mysql(v5)
* redis(v3)
##安装指南
    1.安装canvas模块
        参照：https://www.npmjs.com/package/canvas
    2.安装pm2模块
        参照：https://www.npmjs.com/package/pm2
    3.安装redis，并启动
    4.在项目根目录下运行npm install
##配置
    1.配置运行模式（开发模式/产品模式）：./app.js
    2.配置web服务端口：./app.js
    3.配置数据库：./core/config/db/db.js
        并且在你的mysql中创建对应的数据库
    4.首次运行前，要修改./core/models/dbinit.js，把数据预制的代码放开（去掉注释），成功运行后记住要恢复
##运行/停止
* pm2托管
        1.执行./pm2-start.sh，即可启动/或重启
        2.执行./pm2-stop.sh，即可停止
        3.执行pm2 logs查看运行是否报错
* 单进程运行
        1.执行:node ./bin/www
        
## License

  [MIT](LICENSE)

  
    
  
