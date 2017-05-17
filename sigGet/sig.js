var sig = require('./TLSAPI');

var config = {
    "sdk_appid": '', //
    "expire_after": 180 * 24 * 3600, //签名存活时间
    "private_key": "private_key",//"ec_key.pem",
    "public_key": "public_key"//"public.pem"
};
if (!config.sdk_appid) {
	throw new Error("请修改文件 ./sigGet/sig.js 第四行的 sdk_appid ");
}
var sig = new sig.Sig(config);

exports.sig = sig;