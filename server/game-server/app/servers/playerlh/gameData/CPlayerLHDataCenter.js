/**
 * Created by z on 2018/1/5.
 */
require('../../../base/gameData/game/player/CDataBasePlayerCenter');
var enums = require("../../../consts/enums");

require('./CPlayerLHDataPerson');
require('./CPlayerLHRoom');

Class({
    ClassName:"Game.Data.CPlayerLHDataCenter",
    Base:"Game.Data.Center.CPlayerBase",
    PersonClass:Game.Data.Game.CPlayerLHDataPerson,
    RoomClass:{
        "LH":Game.Data.Game.CPlayerLHRoom
    },
    QuotaGames:["LH"]

})