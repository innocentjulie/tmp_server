/**
 * Created by z on 2017/12/26.
 */
var mysql = require('mysql');
var pomelo = require('pomelo');
var sanitizer = require('sanitizer');
var DaoCallBack = require("./daoCallBack");
var Dao = module.exports;
Dao.getData = function(cb)
{
    var sql = 'select * from cfg' ;
    var args = [];

    pomelo.app.get("dbMgr").mysqlMap["acc"].query(sql, args, DaoCallBack.rcb(cb));
}
Dao.getInit = function(maxuid,cb)
{
    var sql = 'insert into cfg(`maxuid`) values (?)';
    var args = [maxuid];

    pomelo.app.get('dbMgr').mysqlMap["acc"].insert(sql, args, DaoCallBack.rcb(cb));
}
Dao.updateCfgMaxUid = function(maxuid,cb)
{
    var sql = 'update cfg set maxuid = ?';
    var args = [maxuid];

    pomelo.app.get('dbMgr').mysqlMap["acc"].update(sql, args, DaoCallBack.rcb(cb));
}