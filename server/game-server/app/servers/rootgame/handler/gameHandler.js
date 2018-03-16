/**
 * Created by z on 2017/12/26.
 */
require('../../../base/servers/game/CBaseGameHandler');

Class({
    ClassName:"CPomelo.Handler.CRootGameHandler",
    Base:"CPomelo.Handler.CBaseGameHandler"
})

(function(pro)
{
//zjh:["giveup","follow","see"]
    var funNames = {
        common:["startBet","endBet","settle","clear","reCards","setGameId","newCard","changeXue"],
        server:["subscriptGames"]
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
                        this.app.rpc.rootgame.gameRemote[fName]({uid:"000"},msg,session.uid ,session.frontendId,next)
                    }
                }(pro,fName))
            }
        }
    }

}(CPomelo.Handler.CRootGameHandler.prototype))


module.exports = function(app) {
    return new CPomelo.Handler.CRootGameHandler(app);
};