/**
 * Created by sunbing on 17-4-10.
 */
/**
 * Created by sunbing on 17-4-6.
 */

var poolRedis = require('pool-redis');

var redisPoolPackage = function() {
    var pool;

    var init_ = function(obj,redisDB) {
        pool = poolRedis(
            obj || {
                'host': 'localhost', // "127.0.0.1",
                'password': 'password',
                'maxConnections': 10
            });
        if (redisDB) {
            var a = parseInt(redisDB);
            method.dbIndex = ((a && a > 0 && a < 16)?a : 0) + "";
            console.log("[redis] choose db is " + method.dbIndex);
        }
    };

    var method = {
        dbIndex : "1",  //这里是从 0 开始的共 16 个数据库
        getDefaultOneConnection : function(cb) {
            var dbIndex = this.dbIndex;
            pool.getClient(function(client,done){
                if (client) {
                    client.select(dbIndex);
                    cb(client);
                    done();
                } else {
                    console.warn('can not get one client .');
                    cb(null);
                }
            });
        },
        defaultDear : function(){},
        //获取到一个数组对象
        //getK('a');
        getK : function(key_,cb) {
            this.getDefaultOneConnection(function(client){
                if (client) {
                    client.get(key_,function(err,res){
                        if (err) {
                            cb(null);
                        } else {
                            cb(res);
                        }
                    });
                } else {
                    cb(null);
                    //return null;
                }
            });
        },
        //setK('a','1');
        setK : function(key_,val_,cb) {
            this.getDefaultOneConnection(function(client){
                if (client) {
                    client.set(key_,val_,function(err,res){
                        if (err) {
                            cb("");
                        } else {
                            cb(res);
                        }
                    });
                } else {
                    cb(null);
                    //return null;
                }
            });
        },
        //setMapKVV('a','a',1);
        //setMapKVV('a','b',1);
        setMapKVV : function(mkey,value_,value__,cb) {
            this.getDefaultOneConnection(function(client){
                if (cb) {
                    cb(client.hmset(mkey,value_,value__));
                } else {
                    client.hmset(mkey,value_,value__);
                }
            });
        },
        //setMapKObj('a',{'a':1,'b':2});
        setMapKObj : function(mkey,value,cb) {
            if (value instanceof Object) {
                this.getDefaultOneConnection(function(client){
                    cb(client.HMSET(
                        mkey,
                        value
                    ));
                });
            } else {
                cb(false);
                console.error("value 表示对象");
            }
        },
        //获取到一个 Object 对象
        getMapByK : function(mkey,cb) {
            this.getDefaultOneConnection(function(client){
                client.hgetall(mkey,function(err,obj){
                    cb(err,obj);
                });
            });
        },
        endPool : function() {
            pool.closeAll();
        }
    };

    return {
        inti : init_,
        method : method
    };
} ();


module.exports.redisPoolPackage = redisPoolPackage;

