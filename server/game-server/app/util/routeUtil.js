/**
 * Created by z on 2017/12/26.
 */
var route = module.exports;
var crc = require('crc');

var dispatchRand = function(uid, servers) {
    var index = Math.abs(crc.crc32(uid)) % servers.length;
    return servers[index].id;
};

var dispatch = function(id, servers) {
    var index = id % servers.length;
    //console.warn(servers.length + "   idx is:"+index + "   id is:"+id + " server name is:"+JSON.stringify(servers[index]))
    return servers[index].id;
};

route.connector = function(session, msg, app, cb) {

    if(!session) {
        cb(new Error('fail to route to connector server for session is empty'));
        return;
    }

    if(!session.frontendId) {
        cb(new Error('fail to find frontend id in session'));
        return;
    }

    cb(null, session.frontendId);
};

route.database = function(session, msg, app, cb) {

    if(!session)
    {
        var str = 'db must has session';
        cb(new Error(str));
        console.error(str)
        return;
    }
    if(session.sid)
    {
        cb(null,  session.sid);
        return;
    }
    if ( !session.uid) {
        cb(new Error('db must has session'));
        return;
    }

    cb(null, "db-"+session.uid[0]);

};

//route.rootbjl = function(session, msg, app, cb) {
//
//    if (!session || !session.uid) {
//        var srvs = app.getServersByType('rootbjl');
//        console.error("rootbjl must has session");
//        cb(null, srvs[0].id);
//        return;
//    }
//    cb(null, "db-"+session.uid[0]);
//};
//route.rootlh = function(session, msg, app, cb) {
//
//    if (!session || !session.uid) {
//        var srvs = app.getServersByType('rootlh');
//        console.error("rootlh must has session");
//        cb(null, srvs[0].id);
//        return;
//    }
//};
//route.playerbjl = function(session, msg, app, cb) {
//
//
//    if (!session || !session.uid) {
//        var srvs = app.getServersByType('playerbjl');
//        console.error("playerbjl must has session");
//        cb(null, srvs[0].id);
//        return;
//    }
//};
//route.playerlh = function(session, msg, app, cb) {
//    if (!session || !session.uid) {
//        var srvs = app.getServersByType('playerlh');
//        console.error("playerlh must has session");
//        cb(null, srvs[0].id);
//        return;
//    }
//
//
//};


route.createRoot = function(serverName)
{
    return function(session, msg, app, cb) {

        if(!session)
        {
            var str = serverName+' root must has session';
            cb(new Error(str));
            console.error(str)
            return;
        }
        if(session.sid)
        {
            cb(null,  session.sid);
            return;
        }
        if ( session.uid == void 0) {
            var str = serverName+' root must has session';
            cb(new Error(str));
            console.error(str)
            return;
        }


        var srvs = app.getServersByType(serverName);
        cb(null,  dispatch(session.uid[0],srvs));
    };

}

route.createPlayer = function(serverName)
{
    return function(session, msg, app, cb) {

        if(!session)
        {
            var str = serverName+' root 1  must has session';
            cb(new Error(str));
            console.error(str)
            return;
        }
        if(session.sid)
        {
            cb(null,  session.sid);
            return;
        }
        if ( session.uid == void 0) {
            var str = serverName+' root 2 must has session';
            cb(new Error(str));
            console.error(str)
            return;
        }
        session.uid+="";
        var srvs = app.getServersByType(serverName);
        cb(null,  dispatch(session.uid[0],srvs));
    };
}

