/**
 * Created by root on 3/6/17.
 */
var mysql = require('mysql');
var pomelo = require('pomelo');
var sanitizer = require('sanitizer');
var DaoCallBack = require("./daoCallBack");
var Dao = module.exports;



//Dao.CreateData = function(userid,acc,name,sex,cb)
//{
//    var sql = 'insert into users(`userid`,`account`,`name`,sex) values (?,?,?,?)';
//    var args = [sanitizer.sanitize(userid),sanitizer.sanitize(acc), sanitizer.sanitize(name),sex];
//
//    pomelo.app.get('dbMgr').insert(sql, args, DaoCallBack.rcb(cb));
//}
Dao.getDataByAcc = function(acc,cb)
{
    var sql = 'select * from users where `account` = ?';
    var args = [sanitizer.sanitize(acc)];

    pomelo.app.get("dbMgr").query(sql, args, DaoCallBack.rcb(cb));
}
Dao.getDataByUid = function(uid,cb)
{
    var sql = 'select * from users where userid = ?';
    var args = [sanitizer.sanitize(uid)];

    pomelo.app.get("dbMgr").query(sql, args, DaoCallBack.rcb(cb));
}