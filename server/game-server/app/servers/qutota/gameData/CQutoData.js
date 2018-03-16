/**
 * Created by z on 2018/1/26.
 */
/**
 * Created by z on 2018/1/17.
 */

require('../../../base/gameData/game/watch/CDataQutota');
var enums = require("../../../consts/enums");
var consts = require("../../../consts/consts");
Class({
    ClassName:"Game.Data.Quto.CQuto",
    Base:"Game.Data.Room.Qutota",
    mSaveSeat:true,
    toJSON:function()
    {
        return this.mDeskPerson;
    }


})
