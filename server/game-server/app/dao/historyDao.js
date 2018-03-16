/**
 * Created by z on 2018/1/16.
 */
var mysql = require('mysql');
var pomelo = require('pomelo');
var sanitizer = require('sanitizer');
var DaoCallBack = require("./daoCallBack");
var Dao = module.exports;


///// historyDao.CreateData(self.mCurrentId+ "_"+uid,uid,self.mMasterName,deskId,parseInt(Date.now()/1000),0,money,0,0)

Dao.CreateData = function(id,uid,name,deskid,time,mres,money,resault,winres,cb)
{
    ////
    var sql = 'insert into history(`id`,`userid`,`name`,`deskid`,`time`,`mres`,`money`,`resault`,`winres`) values (?,?,?,?,?,?,?,?,?)';
    var args = [sanitizer.sanitize(id),uid, sanitizer.sanitize(name),deskid,time,mres,money,resault,winres];


    pomelo.app.get('dbMgr').mysqlMap["user_"+uid[0]].insert(sql, args, DaoCallBack.rcb(cb));
}
Dao.updateMoneyAndTimer = function(uid,id,money,time,cb)
{
    var sql = 'update history set `money` = ? , `time` = ? where  `id` = ?';
    var args = [money,time,id];

    pomelo.app.get('dbMgr').mysqlMap["user_"+uid[0]].update(sql, args, DaoCallBack.rcb(cb));
}
Dao.updateRes = function(uid,id,resault,winres,cb)
{
    var sql = 'update history set `resault` = ? , `winres` = ? where  `id` = ?';
    var args = [resault,winres,id];

    pomelo.app.get('dbMgr').mysqlMap["user_"+uid[0]].update(sql, args, DaoCallBack.rcb(cb));
}