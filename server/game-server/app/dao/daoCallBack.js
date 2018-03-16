/**
 * Created by z on 2017/12/26.
 */

var Dao = module.exports;
Dao.rcb = function(cb)
{
    return function(err,data)
    {
        if(err)
        {
            console.warn("daoCallBack:"+err.toString());
        }
        if(cb)
            cb(err,data)
    }
}