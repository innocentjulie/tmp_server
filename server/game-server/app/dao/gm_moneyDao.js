/**
 * Created by z on 2018/1/19.
 */

var mysql = require('mysql');
var pomelo = require('pomelo');
var sanitizer = require('sanitizer');
var DaoCallBack = require("./daoCallBack");
var Dao = module.exports;



Dao.CreateData = function(gm_acc,money,userid,current,resault,time,cb)
{
    var sql = 'insert into money_history(`gm_acc`,`money`,`userid`,`current`,`resault`,`time`) values (?,?,?,?,?,?)';
    var args = [sanitizer.sanitize(gm_acc),money, sanitizer.sanitize(userid),current,resault,time];
    pomelo.app.get('dbMgr').mysqlMap["gm_money"].insert(sql, args, DaoCallBack.rcb(cb));
}
Dao.getDataByGm = function(gm_acc,time,cb)
{
    var sql = 'select * from money_history where `gm_acc` = ? and `time` > ?';
    var args = [sanitizer.sanitize(gm_acc),time];

    pomelo.app.get('dbMgr').mysqlMap["gm_money"].insert(sql, args, DaoCallBack.rcb(cb));
}
Dao.getDataByUser = function(userid,time,cb)
{
    var sql = 'select * from money_history where `userid` = ? and `time` > ?';
    var args = [sanitizer.sanitize(userid),time];

    pomelo.app.get('dbMgr').mysqlMap["gm_money"].insert(sql, args, DaoCallBack.rcb(cb));
}
