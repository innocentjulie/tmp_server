/**
 * Created by root on 3/4/17.
 */
module.exports = {

    NOR_CODE : {
        SUC_OK						: 0,		// success
        ERR_FAIL					: -1,		// Failded without specific reason


        ERR_UNKNOWN                 :-100,
        ERR_NO_USER                    :-101
    },
    LOGIN:{
        REGIEST_FAIL                : 10001,
        LOGIN_FAIL                : 10002,
        LOGIN_TOKEN_ERR                : 10003,
        CREATE_USER_ERROR   :10004,
        DB_GETINFO_ERROR:10005,
        TOKEN_OUT_TIME:10006,
        LOGIN_LOGINED:10007
    },
    MONEY:{
        LIVE_MONEY_LESS:20001
    },
    GAME:{
        COMMON:{
            NOT_IN_ROOM:30001,
            ERROR_STATA:30002,
            NOT_ROOM:30003,
            QUTO_OUT:30004,
            IN_OTHER_ROOM:30005,
            IN_ROOM_MORE_TIME:30006
        }
    }
};