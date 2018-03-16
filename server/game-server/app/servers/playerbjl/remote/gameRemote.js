/**
 * Created by z on 2017/12/26.
 */
require('../../../base/servers/game/player/CBasePlayerGameRemote');
require("../gameData/CPlayerBJLDataCenter");

Class({
    ClassName:"CPomelo.Remote.CPlayerBJLRemote",
    Base:"CPomelo.Remote.CBasePlayerGameRemote",
    SubGames:[1],
    DataCenterName:"CPlayerBJLDataCenter"
})


module.exports = function(app) {
    return new CPomelo.Remote.CPlayerBJLRemote(app);
};