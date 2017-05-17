/**
 * Created by sunbing on 17-4-6.
 */

var mysqlPool = require("sqlpool").sqlpool;

mysqlPool.init({
    host : 'localhost', // "127.0.0.1",
    user : "root",
    password : "password"
},'IMdb','userTable');
//这里配置的默认的 数据库(IMdb) 和默认的 表(userTable) ，在进行相关数据库查询过程中是可以进行修改的

var sqlOP = mysqlPool.methods;

module.exports.sqlOP = sqlOP;

