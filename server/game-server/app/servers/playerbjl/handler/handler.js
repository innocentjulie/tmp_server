/**
 * Created by z on 2017/12/26.
 */

require('../../../base/servers/game/player/CBasePlayerGameHandler');

Class({
    ClassName:"CPomelo.Handler.CPlayerBJLHandler",
    Base:"CPomelo.Handler.CBasePlayerGameHandler"
})


module.exports = function(app) {
    return new CPomelo.Handler.CPlayerBJLHandler(app);
};