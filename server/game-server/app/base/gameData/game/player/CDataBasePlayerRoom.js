/**
 * Created by z on 2018/1/5.
 */

require('./../watch/CDataBaseWatchRoom');

var enums = require("../../../../consts/enums");
var consts = require("../../../../consts/consts");
var historyDao = require('../../../../dao/historyDao');
Class({
    ClassName:"Game.Data.BaseRoom.CPlayerBase",
    Base:"Game.Data.BaseRoom.CWatchBase",
    mQutoHasChannel:true,
    toJSON:function()
    {


        return {
            bet:this.BetRecord,
            streams:this.mStreams
        };
    },
    ctor:function()
    {
        this.mTryClearPerson = [];
        Game.Data.BaseRoom.CWatchBase.prototype.ctor.apply(this,arguments);
        this.BetPersons = {};
        //this.DataCenter.QuotaCenter.AddARoom(this);
    },
    bet:function(uid,person,betInfo,next)
    {
        var qutoInfo = person.CurrentQutoInfo;
        if(!this.mCanBet || !qutoInfo)
        {
            next(null,{code:consts.GAME.COMMON.ERROR_STATA});
            return;
        }
        //var bets = this.UserBets[ret];
        var totalMoney = 0;
        for(var i=0;i<betInfo.length;i++)
        {
            var oneBet = betInfo[i];
            var money = parseInt(oneBet.m);

            totalMoney+= money;

            var bets = this.UserBets[oneBet.p];
            if(!bets)
            {
                console.warn("not has bet p:"+oneBet.p);
                next(null,{code:consts.NOR_CODE.ERR_UNKNOWN});
                return;
            }

            var currentMoney = bets[uid] || 0;

            if(isNaN(money) || money<1 || ( money+currentMoney)<qutoInfo.min || ( money+currentMoney)>qutoInfo.max)
            {
                next(null,{code:consts.GAME.COMMON.QUTO_OUT});
                return;
            }

        }
        if(totalMoney == 0)
        {
            console.warn("totalMoney is 0");
            next(null,{code:consts.NOR_CODE.ERR_UNKNOWN});
            return;
        }


        var self = this;
        var tempBetInfo = betInfo;
        this.m_App.rpc.db.dbRemote.costMoney({uid:uid},uid,-totalMoney,false,function(err,data){
            betInfo = tempBetInfo;

            if(!err )
            {

                person.mData.livemoney = data.money;
                //person.Bet(ret,money);
                self.BetPersons[uid] = person;
                for(var i=0;i<betInfo.length;i++)
                {
                    var oneBet = betInfo[i];
                    var money = parseInt(oneBet.m);
                    person.bet(oneBet.p,money);
                    var bets = self.UserBets[oneBet.p];

                    if(bets[uid])
                    {

                        bets[uid] += money;
                        historyDao.updateMoneyAndTimer(uid,self.mCurrentId+ ";"+uid+";"+oneBet.p, bets[uid],parseInt(Date.now()/1000))
                        self.updateRoomBetInfo(oneBet.p,money,0);
                    }
                    else
                    {
                        bets[uid] = money;
                        historyDao.CreateData(self.mCurrentId+ ";"+uid+";"+oneBet.p,uid,self.mMasterName,self.deskId,parseInt(Date.now()/1000),oneBet.p,money,0,0)
                        self.updateRoomBetInfo(oneBet.p,money,self.BetUsers.hasOwnProperty(uid)? 1:0);
                    }
                    self.BetUsers[uid] = 1;


                }

                next(null,{livemoney:data.money,bet:person.mBetInfo});


                // self.m_App.rpc.hall.gameRemote.Bet({uid:uid},deskId,qutotaId,seat,frontendId,person,function(){})
                if(person.mData.seat != -1)
                {
                    var betInfo = [person.userid,person.mData.seat,bets[uid],person.mData.livemoney];
                    self.m_App.rpc.qutota.gameRemote.bet({uid:self.deskId},betInfo,function(err,data){})
                }

            }
            else{
                next(null,{code:consts.MONEY.LIVE_MONEY_LESS});
                return;
            }
        });
    },
    helperAddUserChangeMoney:function(uid,money,info)
    {
        var db = uid[0];
        var updateInfo = info[db];
        if(!updateInfo)
        {
            updateInfo = info[db] = {};
        }
        if(updateInfo.hasOwnProperty(uid))
        {
            updateInfo[uid]+=money;
        }
        else
        {
            updateInfo[uid]=money;
        }


    },
    setRes:function(face,status)
    {
        var value = Game.Data.BaseRoom.CWatchBase.prototype.setRes.apply(this,arguments);
        var currentId =this.mCurrentId;
        var userMonenChange = {};
        var userAddMonen = {};
        for(var key in this.UserBets)
        {
            var id = parseInt(key);
            var map = this.UserBets[key];
            var winRate = this.mRetCfg[id];
            if(value.He(id)) ///
            {

                for(var uid in map)
                {
                    // self.mCurrentId+ ";"+uid+";"+oneBet.p
                    historyDao.updateRes(uid,currentId + ";"+uid + ";"+id, face,1);
                    if(!userMonenChange.hasOwnProperty(uid))
                    {
                        userMonenChange[uid] = {};
                    }
                    var winValue =map[uid];
                    userMonenChange[uid][id] =[map[uid],0];
                    this.helperAddUserChangeMoney(uid,winValue,userAddMonen);

                }
            }
            else if(value.Win(id))
            {

                for(var uid in map)
                {
                    historyDao.updateRes(uid,currentId + ";"+uid + ";"+id, face,1);
                    if(!userMonenChange.hasOwnProperty(uid))
                    {
                        userMonenChange[uid] = {};
                    }
                    var winValue = winRate*map[uid];
                    userMonenChange[uid][id] =[map[uid],winValue];
                    this.helperAddUserChangeMoney(uid,winValue+map[uid],userAddMonen);

                }
            }
            else
            {
                for(var uid in map)
                {
                    historyDao.updateRes(uid,currentId + ";"+uid + ";"+id, face,0);
                    if(!userMonenChange.hasOwnProperty(uid))
                    {
                        userMonenChange[uid] = {};
                    }
                    userMonenChange[uid][id] =[map[uid],-map[uid]];


                }
            }
        }

        for(var dbid in userAddMonen)
        {
            this.m_App.rpc.db.dbRemote.betResChangeMoney({uid:dbid},userAddMonen[dbid],function(err,data){ })
        }

        for(var uid in userMonenChange)
        {
            var person = this.DataCenter.Persons[uid];
            if(person)
            {
                person.winMoney(this.deskId,userMonenChange[uid]);
            }
        }

        //this.m_App.rpc.db.dbRemote.costMoney({uid:uid},money,false,function(err,data){
        //    if(!err )
        //    {
        //        person.Value.livemoney = data.money;
        //        person.Bet(ret,money);
        //        self.BetPersons[uid] = person;
        //        if(bets[uid])
        //        {
        //
        //            bets[uid] += money;
        //            historyDao.updateMoneyAndTimer(this.mCurrentId + "_"+uid, bets[uid],parseInt(Date.now()/1000))
        //            self.updateRoomBetInfo(ret,money,0);
        //        }
        //        else
        //        {
        //            bets[uid] = money;
        //            historyDao.CreateData(this.mCurrentId+ "_"+uid,uid,this.mMasterName,this.mMasterId,parseInt(Date.now()/1000),0,money,0,0)
        //            self.updateRoomBetInfo(ret,money,1);
        //        }
        //        next(null,{money:data});
        //        // self.m_App.rpc.hall.gameRemote.Bet({uid:uid},deskId,qutotaId,seat,frontendId,person,function(){})
        //        if(person.mData.seat != -1)
        //        {
        //            var betInfo = [person.userid,person.mData.seat,bets[uid],person.Value.livemoney];
        //            self.m_App.rpc.qutota.gameRemote.Bet({uid:self.deskId},betInfo,function(err,data){})
        //        }
        //
        //    }
        //    else{
        //        next(null,{code:consts.MONEY.LIVE_MONEY_LESS});
        //        return;
        //    }
        //});
    },
    personTryLeave:function(uid,fid,qutoInfo)
    {
        if(this.status<1)
        {
            this.RemoveWatch(uid, fid);
        }
        else{

            this.mTryClearPerson.push(uid);
            if(qutoInfo)
            {
                qutoInfo.offLinePerson(uid,fid);
            }
        }

    },

    resetBetCfg:function()
    {

        for(var key in this.BetPersons)
        {
            this.BetPersons[key].clearBet();
        }
        this.BetPersons = {};
        var changeSeat = null;
        for(var i=0;i<this.mTryClearPerson.length;i++)
        {
            var uid = this.mTryClearPerson[i];
            var p = this.DataCenter.Persons[uid];
            if(p && p.mSid != -1)
            {
                continue;
            }
            if(p.mData.seat != -1)
            {
                if(!changeSeat)
                {
                    changeSeat = {};
                }

                var quInfo = changeSeat[p.CurrentQutoInfo.Id] || (changeSeat[p.CurrentQutoInfo.Id] = []);
                quInfo.push(p.mData.seat);
            }
            this.RemoveWatch(uid);
        }
        if(changeSeat)
        {
            this.m_App.rpc.qutota.gameRemote.ForceRemovePerson({uid:this.deskId},this.deskId,changeSeat,function(err,data){})
        }

        this.mTryClearPerson = [];
    }

})