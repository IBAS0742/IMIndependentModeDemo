## IMIndependentModeDemo
## 通过独立方式使用腾讯云的云通信服务获取签名demo

>accountOP (账号相关操作)<br/>
db (mysql 数据库操作和 redis 操作)<br/>
entity (账号信息实体类)<br/>
logs (日志 通过 autoReboot.sh 开启是用到)<br/>
public (这里存放相关前端代码)<br/>
routes (路由/当前为空)<br/>
sigGet (签名获取接口，相关证书请到[腾讯云IM](https://console.qcloud.com/avc)下载)<br/>
utils (正则表达式和一些工具)<br/>
views(视图)<br/>
> - autoReboot.sh (部署到 linux 后，通过以下命令进行部署)
> - ```nohup ./autoReboot_dataServer.sh > a.log 2>&1 &```
> - package.json (依赖项)
> - usgSign.js (使用 node 启动该项即可)
> - 无法运行或运行失败说明.txt (一些声明)

> **需要修改的文件:
> - ./db/mysqlOP.js (修改数据库 ip 和 密码)
> - ./db/redisPoolPackage.js (修改 redis ip 和 密码)
> - ./sigGet/sig.js (修改 SDKAPPID)
> - ./sigGet/private_key (下载)
> - ./sigGet/public_key (下载)
> - ./entity/userInfoEntity.js (根据需求进行修改)
> - ./accountOP/loginDearWith.js (如果实体类使用了其他规则进行限定，则这里应当适当修改)
> - ./utils/regEX.js (这里的正则并没有完全实现，仅实现邮箱作为参考)
> - ./utils/checkUserInfo.js (这里是我定义的用户实体检验规则)