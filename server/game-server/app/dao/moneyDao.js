/**
 * Created by z on 2018/1/16.
 */

var mysql = require('mysql');
var pomelo = require('pomelo');
var sanitizer = require('sanitizer');
var DaoCallBack = require("./daoCallBack");
var Dao = module.exports;



Dao.CreateData = function(userid,money,cb)
{
    var sql = 'insert into money(`userid`,`money`) values (?,?)';
    var args = [userid, money];

    pomelo.app.get('dbMgr').insert(sql, args, DaoCallBack.rcb(cb));
}
Dao.getDataByUid = function(userid,cb)
{
    //var sql = 'select * from users where `account` = ?';
    var sql = 'select * from money where `userid` = ?';
    var args = [userid];

    pomelo.app.get('dbMgr').insert(sql, args, DaoCallBack.rcb(cb));
}
Dao.updateMoney = function(userid,money,cb)
{

    var sql = 'update money set `money` = ? where  `userid` = ?';
    var args = [money,userid];

    pomelo.app.get('dbMgr').update(sql, args, DaoCallBack.rcb(cb));
}