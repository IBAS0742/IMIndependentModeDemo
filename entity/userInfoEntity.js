/**
 * Created by Administrator on 2017/5/17.
 */

var userInfoEntity = {
    fields : {
        "userName" : "userName",
        "password" : "password"
    },
    _ext_ : {
        sigField : function () {
            return "userName";
        }
    }
};

exports.userInfoEntity = userInfoEntity;

