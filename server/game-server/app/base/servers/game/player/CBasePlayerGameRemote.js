/**
 * Created by z on 2018/1/4.
 */
require('../watch/CBaseWatchRemote');


Class({
    ClassName:"CPomelo.Remote.CBasePlayerGameRemote",
    Base:"CPomelo.Remote.CBaseWatchRemote",


    entry:function(msg, uid,frontendId, next)
    {
        // gameId,deskId,uid,frontendId
        var  gameId = msg.gid, deskId =msg.did,qutotaId = msg.qid,seatid = msg.seat;
        this.DataCenter.joinRoom(gameId,deskId,qutotaId,seatid,uid,frontendId,next);
        //next();
    },
    bet:function(msg, uid,frontendId, next)
    {
        // uid,ret,money,next
        this.DataCenter.bet(uid,msg.b,next);
    },
    leave:function(msg, uid,frontendId, next)
    {
        this.DataCenter.leaveRoom(uid);
        next();
    }
})


