/**
 * Created by root on 3/6/17.
 */
var mysql = require('mysql');
var pomelo = require('pomelo');
var sanitizer = require('sanitizer');
var DaoCallBack = require("./daoCallBack");
var Dao = module.exports;
Dao.getDataByAcc = function(acc,cb)
{
    var sql = 'select * from dealer where `account` = ?';
    var args = [sanitizer.sanitize(acc)];

    pomelo.app.get("dbMgr").mysqlMap["acc"].query(sql, args, DaoCallBack.rcb(cb));
}
Dao.getAll = function(cb)
{
    var sql = 'select * from dealer ';
    pomelo.app.get("dbMgr").mysqlMap["acc"].query(sql, [], DaoCallBack.rcb(cb));
}
Dao.CreateData = function(acc,pwd,cb)
{
    var sql = 'insert into dealer(`account`, `password`) values (?,?)';
    var args = [sanitizer.sanitize(acc), sanitizer.sanitize(pwd)];

    pomelo.app.get('dbMgr').mysqlMap["acc"].insert(sql, args, DaoCallBack.rcb(cb));
}
Dao.updateLoginTime = function(acc,logintime,cb)
{

    var sql = 'update dealer set `logintime` = ? where  `account` = ?';
    var args = [logintime,sanitizer.sanitize(acc)];

    pomelo.app.get('dbMgr').mysqlMap["acc"].update(sql, args, DaoCallBack.rcb(cb));
}
Dao.updateLoginOutTime = function(acc,outtime,cb)
{

    var sql = 'update dealer set `loginouttime` = ? where  `account` = ?';
    var args = [outtime,sanitizer.sanitize(acc)];

    pomelo.app.get('dbMgr').mysqlMap["acc"].update(sql, args, DaoCallBack.rcb(cb));
}