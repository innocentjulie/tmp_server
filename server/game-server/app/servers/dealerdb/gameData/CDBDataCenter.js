/**
 * Created by root on 3/8/17.
 */
require('../../../core/Core');
require('./CDealerData');
require('./CGmData');
require('./CGmData');
var gmDao = require('../../../dao/gmDao');
var dealerDao = require('../../../dao/dealerDao');
var encode = require('../../../util/encode');
Class({
    ClassName:"Game.Data.CDDBDataCenter",


    ctor:function()
    {
        this.mDealers = {};
        this.mGms = {};

        var self = this;
        dealerDao.getAll(function(err,data)
        {
            if(err)
            {
                console.error("dealerDao get all error");
                return;
            }
            if(data.length == 0)
            {
                self.newDealerData("111111","111111");
            }
            else
            {
                for(var i=0;i<data.length;i++)
                {
                    self.mDealers[data[i].account] = new Game.Data.CDealerData(data[i]);

                }
            }



        })
        gmDao.getAll(function(err,data)
        {
            if(err)
            {
                console.error("gmDao get all error");
                return;
            }
            if(data.length == 0)
            {
               self.newGmData("111111","111111");
            }
            else
            {
                for(var i=0;i<data.length;i++)
                {
                    self.mGms[data[i].account] = new Game.Data.CGmData(data[i]);

                }
            }


        })
    },
    newGmData:function(acc,pwd)
    {
        var gm = {
            "account":acc,
            "password":encode.md5(pwd),
            logintime:0,
            loginouttime:0
        };
        gmDao.CreateData(gm.account,gm.password);
        this.mGms[gm.account] = new Game.Data.CGmData(gm);
    },
    newDealerData:function(acc,pwd)
    {
        var dealer = {
            "account":acc,
            "password":encode.md5(pwd),
            logintime:0,
            loginouttime:0
        };
        dealerDao.CreateData(dealer.account,dealer.password);
        this.mDealers[dealer.account] = new Game.Data.CDealerData(dealer);

    },
    getUser:function(acc)
    {
        return  this.getDealerUser(acc) || this.getGmUser(acc) ;
    },
    getGmUser:function(acc)
    {
        return this.mGms[acc];
    },
    getDealerUser:function(acc)
    {
        return this.mDealers[acc];
    }

})