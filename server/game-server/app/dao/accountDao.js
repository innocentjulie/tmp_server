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
    var sql = 'select * from accounts where `account` = ?';
    var args = [sanitizer.sanitize(acc)];

    pomelo.app.get("dbMgr").mysqlMap["acc"].query(sql, args, DaoCallBack.rcb(cb));
}

Dao.CreateData = function(acc,pwd,cb)
{
    var sql = 'insert into accounts(`account`, `password`) values (?,?)';
    var args = [sanitizer.sanitize(acc), sanitizer.sanitize(pwd)];

    pomelo.app.get('dbMgr').mysqlMap["acc"].insert(sql, args, DaoCallBack.rcb(cb));
}
Dao.updateUid = function(acc,uid,cb)
{

    var sql = 'update accounts set `userid` = ? where  `account` = ?';
    var args = [uid,sanitizer.sanitize(acc)];

    pomelo.app.get('dbMgr').mysqlMap["acc"].update(sql, args, DaoCallBack.rcb(cb));
}