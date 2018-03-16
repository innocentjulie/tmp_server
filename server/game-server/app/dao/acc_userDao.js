/**
 * Created by root on 3/6/17.
 */
var mysql = require('mysql');
var pomelo = require('pomelo');
var sanitizer = require('sanitizer');
var DaoCallBack = require("./daoCallBack");
var Dao = module.exports;



Dao.CreateData = function(userid,acc,name,sex,cb)
{
    var sql = 'insert into users(`userid`,`account`,`name`,sex) values (?,?,?,?)';
    var args = [sanitizer.sanitize(userid),sanitizer.sanitize(acc), sanitizer.sanitize(name),sex];

    pomelo.app.get('dbMgr').mysqlMap["user_"+userid[0]].insert(sql, args, DaoCallBack.rcb(cb));
}
Dao.getDataByAcc = function(userid,acc,cb)
{
    var sql = 'select * from users where `account` = ?';
    var args = [sanitizer.sanitize(acc)];

    pomelo.app.get('dbMgr').mysqlMap["user_"+userid[0]].query(sql, args, DaoCallBack.rcb(cb));
}
Dao.getDataByUid = function(userid,cb)
{
    var sql = 'select * from users where userid = ?';
    var args = [sanitizer.sanitize(userid)];

    pomelo.app.get('dbMgr').mysqlMap["user_"+userid[0]].query(sql, args, DaoCallBack.rcb(cb));
}