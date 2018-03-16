/**
 * Created by root on 3/21/17.
 */
var consts = require('../../../consts/consts');
require('../../../base/servers/game/watch/CBaseWatchHandler');


Class({
    ClassName:"CPomelo.Handler.CHallHandler",
    Base:"CPomelo.Handler.CBaseWatchHandler"
})
(function(pro)
{
    var funNames = {
        common:["subscriptGames","GList","GQuto"]
    }
    for(var key in funNames)
    {
        var ay = funNames[key];
        for(var i=0;i<ay.length;i++)
        {
            var fName = ay[i]
            if(!pro[fName])
            {

                (function(pro,fName)
                {
                    pro[fName] = function(msg, session, next)
                    {
                        this.app.rpc.hall.gameRemote[fName]({uid:session.uid},msg,session.uid ,session.frontendId,next)
                    }
                }(pro,fName))
            }
        }
    }

}(CPomelo.Handler.CHallHandler.prototype))
module.exports = function(app) {
    return new CPomelo.Handler.CHallHandler(app);
};