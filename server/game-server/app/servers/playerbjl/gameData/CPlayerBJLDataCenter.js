/**
 * Created by z on 2018/1/5.
 */
require('../../../base/gameData/game/player/CDataBasePlayerCenter');
var enums = require("../../../consts/enums");

require('./CPlayerBJLDataPerson');
require('./CPlayerBJLRoom');

Class({
    ClassName:"Game.Data.CPlayerBJLDataCenter",
    Base:"Game.Data.Center.CPlayerBase",
    PersonClass:Game.Data.Game.CPlayerBJLDataPerson,
    RoomClass:{
        "BJL":Game.Data.Game.CPlayerBJLRoom
    },
    QuotaGames:["BJL"]

})