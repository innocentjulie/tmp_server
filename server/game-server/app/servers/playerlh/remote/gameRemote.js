/**
 * Created by z on 2017/12/26.
 */
require('../../../base/servers/game/player/CBasePlayerGameRemote');
require("../gameData/CPlayerLHDataCenter");

Class({
    ClassName:"CPomelo.Remote.CPlayerLHRemote",
    Base:"CPomelo.Remote.CBasePlayerGameRemote",
    SubGames:[2],
    DataCenterName:"CPlayerLHDataCenter"
})


module.exports = function(app) {
    return new CPomelo.Remote.CPlayerLHRemote(app);
};