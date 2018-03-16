/**
 * Created by z on 2018/1/11.
 */
var mysql = require('mysql');
var pomelo = require('pomelo');
var sanitizer = require('sanitizer');
var DaoCallBack = require("./daoCallBack");
var Dao = module.exports;



Dao.CreateData = function(id,name,deskid,time,resault,cb)
{
    var sql = 'insert into bjl(`id`,`name`,`deskid`,`time`,`resault`) values (?,?,?,?,?)';
    var args = [sanitizer.sanitize(id), sanitizer.sanitize(name),deskid,time,resault];

    pomelo.app.get('dbMgr').mysqlMap["gameresault"].insert(sql, args, DaoCallBack.rcb(cb));
}
Dao.getDataByDt = function(dt,cb)
{
    var sql = 'select * from bjl where `time` > ?';
    var args = [sanitizer.sanitize(dt)];

    pomelo.app.get("dbMgr").mysqlMap["gameresault"].query(sql, args, DaoCallBack.rcb(cb));
}
Dao.getDataByDtAndDeskId = function(deskid,dt,cb)
{
    var sql = 'select * from bjl where deskid = ? and time > ?';
    var args = [deskid,dt];

    pomelo.app.get("dbMgr").mysqlMap["gameresault"].query(sql, args, DaoCallBack.rcb(cb));
}