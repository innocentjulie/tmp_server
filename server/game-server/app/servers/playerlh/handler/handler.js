/**
 * Created by z on 2017/12/26.
 */

require('../../../base/servers/game/player/CBasePlayerGameHandler');

Class({
    ClassName:"CPomelo.Handler.CPlayerLHHandler",
    Base:"CPomelo.Handler.CBasePlayerGameHandler"
})



module.exports = function(app) {
    return new CPomelo.Handler.CPlayerLHHandler(app);
};