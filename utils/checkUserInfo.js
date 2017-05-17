/**
 * Created by Administrator on 2017/5/17.
 */

var userInfoCheck = (function (regEx,userInfoEntity) {
    return {
        userInfoCheck : function (userInfo) {
            if (userInfo instanceof Object) {} else {
                try {
                    userInfo = JSON.parse(userInfo);
                } catch (e) {
                    return false;
                }
            }
            for (var i in userInfoEntity.fields) {
                //判断字段是否存在
                if (i in userInfo) {
                    //判断字段是否符合规则
                    if (!regEx[userInfoEntity.fields[i] + "Ext"](userInfo[i])) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return userInfo;
        }
    }
})(global.regEX,global.userInfoEntity);

exports.userInfoCheck = userInfoCheck;
