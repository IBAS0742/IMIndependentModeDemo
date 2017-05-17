/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();

var app = express();
var server = require('http').Server(app);

/* app 配置 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
/* app 配置完成 */

/*加载签名工具*/
global.sig = require('./sigGet/sig').sig;
/*加载签名工具完成*/

/*加载实体对象*/
global.userInfoEntity = require('./entity/userInfoEntity').userInfoEntity;
/*加载实体对象完成*/

/*加载相关数据库操作到全局中*/
global.redisOP = require('./db/redisPoolPackage').redisPoolPackage;
global.redisOP.inti();
global.sqlOP = require('./db/mysqlOP').sqlOP;
/*加载数据操作完成*/

/*将工具类导入到全局中*/
global.regEX = require('./utils/regEX').regEX;
global.userInfoCheck = require('./utils/checkUserInfo').userInfoCheck;
/*工具加载完成*/

/*加载账户管理操作*/
var loginOP = require('./accountOP/loginDearWith').login;
/*账户管理操作加载完成*/

// Routes
router.get('/UserLogin',function(req,res){
  var userInfo = req.query.userInfo;
  loginOP.login(userInfo,function (ret) {
    res.json(ret);
  });
  //res.json({ sig : loginOP.login(userInfo)});
});

router.post('/UserLogin',function(req,res){
  var userInfo = req.body.userInfo;
  loginOP.login(userInfo,function (ret) {
    res.json(ret);
  });
  //res.json({ sig : loginOP.login(userInfo)});
});

router.get('*',function(req,res) {
  res.render('error');
});
router.get('*',function(req,res) {
  res.json({error : "访问内容不存在",errorCode : "404",subscription : "请联系管理员"});
});

app.use('/', router);

server.listen(3008, function() {
  console.log("port : 3008");
});
