/**
 * Created by Administrator on 2017/5/17.
 */

var regEX = (function () {
    return {
        //识别密码是否符合类型
        passwordExt : function (str) {
            return true;
        },
        //识别手机是否符合类型
        phoneExt : function (str) {
            return true;
        },
        //识别用户名是否符合类型
        userNameExt : function (str) {
            return true;
        },
        //识别日期类型
        dateExt : function (str) {
            return true;
        },
	//识别邮箱类型
	emailExt : function (str) {
            return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str);
	},
        //不进行识别
        unCheckExt : function (str) {
            return true;
        }
    };
})();

exports.regEX = regEX;