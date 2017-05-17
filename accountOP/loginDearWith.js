/**
 * Created by Administrator on 2017/5/17.
 */

var login = (function (userInfoCheck,sig,userInfoEntity,redisOPMethod,sqlOP) {
    return {
        login : function (userInfo,cb) {
            if (userInfoCheck.userInfoCheck(userInfo)) {
                //return sig.genSig(userInfo[userInfoEntity._ext_.sigField()]);
            } else {
                cb({error : "1"});
                //return false;
            }
            //这里推荐将 密码 进行 md5 或者 hash 加密后和数据库或缓存做比较，这里匆忙就没有实现
            //这里可能是相关的 数据库 操作和 redis 操作
            //检查 redisOP 缓存中是否有用户信息缓存
            redisOPMethod.getK(userInfo.userName,function (ret) {
                if (ret) {
                    //获取到信息
                    if (userInfo.password == ret) {
                        userInfo.sig = sig.genSig(userInfo[userInfoEntity._ext_.sigField()]);
                        cb(userInfo);
                    }
                } else {
                    //获取不到信息，从数据库中进行查询
                    sqlOP.select({
                        "useName" : userInfo.userName,
                        "password" : userInfo.password
                    },function (err,ret) {
                        if (err) {
                            cb({error : "1"});
                        } else {
                            ret = ret[0];
                            //将结果存放到 redis 中
                            redisOPMethod.setK(ret.userName,ret.password,function () {});
                            ret.sig = sig.genSig(ret[userInfoEntity._ext_.sigField()]);
                            cb(ret);
                        }
                    }/*，'IMdb','userTable'*//*这里可以不指定，因为初始化时已经指定为默认，请查看 ./db/mysqlOP.js 文件*/);
                }
            })
        }
    };
})(global.userInfoCheck,global.sig,global.userInfoEntity,global.redisOP.method,global.sqlOP);

exports.login = login;