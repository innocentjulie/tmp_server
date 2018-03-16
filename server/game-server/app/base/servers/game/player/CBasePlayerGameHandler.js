
/**
 * Created by z on 2018/1/4.
 */
require('../watch/CBaseWatchHandler');


Class({
    ClassName:"CPomelo.Handler.CBasePlayerGameHandler",
    Base:"CPomelo.Handler.CBaseWatchHandler",
})
(function(pro)
{
    var funNames = {
        common:["entry","bet","leave"]
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
                        if(!this.ServerType)
                        {
                            this.ServerType = this.app.getServerType();
                        }
                        this.app.rpc[this.ServerType].gameRemote[fName]({uid:session.uid},msg,session.uid ,session.frontendId,next)
                    }
                }(pro,fName))
            }
        }
    }

}(CPomelo.Handler.CBasePlayerGameHandler.prototype))

