/**
 * Created by Class on 2017/3/7.
 */

require("../../../../core/Core");


Class({
    ClassName:"Game.Helper.CBJLHelper",
    MustAddCards0:function(zcards,xcards)
    {
        var zcount = Object.keys(zcards).length;
        if(zcount < 2 )
        {
            return true;
        }
        if(zcount >2)
        {
            return false
        }
        var znum = this.GetNums(zcards);
        var xnum = this.GetNums(xcards);
        var xcount = Object.keys(xcards).length;


        if(xcount == 2)
        {
            if(xnum >6 || znum >6)
            {
                return false;
            }
        }
        if(znum < 3)
        {
            return true;
        }
        if(znum == 3 && xnum == 8)
        {
            return false;
        }
        if(znum == 4 &&  xnum == 0 || xnum == 1 || xnum == 8 || xnum == 9)
        {
            return false;
        }
        if(znum == 5 &&  xnum == 0 || xnum == 1 || xnum == 2 || xnum == 3 || xnum == 8 || xnum == 9)
        {
            return false;
        }

        if(znum == 6 && xnum == 6 || xnum == 7)
        {
            return true;
        }
        return false;
    },
    MustAddCards1:function(zcards,xcards)
    {
        var xcount = Object.keys(xcards).length;
        if(xcount < 2)
        {
            return true;
        }
        if(xcount >2)
        {
            return false
        }
        var xnum = this.GetNums(xcards);


        if(xnum < 6)
        {
            return true;
        }
        else
        {
            return false;
        }

    },
    MustNotAddCards0:function(zcards,xcards)
    {
        var zcount = Object.keys(zcards).length;
        if(zcount < 2 )
        {
            return false;
        }
        if(zcount >2)
        {
            return true
        }
        var znum = this.GetNums(zcards);
        var xnum = this.GetNums(xcards);
        var xcount = Object.keys(xcards).length;



        if(xcount == 2)
        {
            if(xnum >6 || znum >6)
            {
                return true;
            }
        }

        if(znum <3 )
            return false;

        if(znum == 3 && xnum == 8)
        {
            return true;
        }
        if(znum == 4 &&  xnum == 0 || xnum == 1 || xnum == 8 || xnum == 9)
        {
            return true;
        }
        if(znum == 5 &&  xnum == 0 || xnum == 1 || xnum == 2 || xnum == 3 || xnum == 8 || xnum == 9)
        {
            return true;
        }

        if(znum == 6 && xnum == 6 || xnum == 7)
        {
            return false;
        }
        return true;
    },
    MustNotAddCards1:function(zcards,xcards)
    {
        return !this.MustAddCards1(zcards,xcards)
    },
    GetNums:function(cards)
    {
        var num = 0;
        for(var key in cards)
        {
            num += cards[key].Num
        }
        return num%10;
    },
    IsDui:function(cards)
    {
       if(Object.keys(cards).length == 2)
       {
           return cards[0].Num == cards[1].Num;
       }
        return false;
    },
    isBig:function(cards1,cards2)
    {
        return Object.keys(cards1).length+Object.keys(cards2).length == 4;
    }


}).Static({
    Instance:Core.Instance
})
