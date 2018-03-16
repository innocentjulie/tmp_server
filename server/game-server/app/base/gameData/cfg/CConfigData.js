/**
 * Created by root on 6/10/17.
 */
require("../../../core/Core");
Class({
    ClassName:"Game.Data.CFG.CConfigData",


    CFG:null,
    ParseJsonkeys : function(res){
        var map = {};



        var keys = arguments[1];
        var count = keys.length;
        for (var key in res){

            var info = res[key];
            var tempmap = map;
            for(var i=0;i<count;i++)
            {
                var tempKey = info[keys[i]];
                if(i == count-1)
                {
                    tempmap[tempKey] = info;
                }
                else
                {
                    tempmap = tempmap.hasOwnProperty(tempKey)?tempmap[tempKey]:tempmap[tempKey]={};
                }
            }
        }


        return map;
    },
    loadDefaultJSON:function(app)
    {
        this.CFG = {};
        var rootPath = app.getBase();
        var cfgs = this.constructor.CFG_DATA;
        for(var key in cfgs)
        {
            var fileContent = Core.forceRequire(rootPath+ '/config/data/'+key);
            this.CFG[key] = this.ParseJsonkeys(fileContent,cfgs[key])
        }
    },
    loadJSONs:function(app,loadJsons)
    {
        this.CFG = {};
        var rootPath = app.getBase();
        var cfgs = this.constructor.CFG_DATA;
        for(var i=0;i<loadJsons.length;i++)
        {
            var key = loadJsons[i];
            var tempcfg = cfgs[key];
            var fileContent = Core.forceRequire(rootPath+ '/config/data/'+tempcfg[0]);
            this.CFG[key] = this.ParseJsonkeys(fileContent,tempcfg[1])
        }
        this.afterInit();
    },
    loadWatchJSON:function(app)
    {
        var loadJsons = ["limit_BJL","limit_LH"];
        this.loadJSONs(app,loadJsons);
    },
    loadRootGameJSON:function(app)
    {
        var loadJsons = ["RootGame"];
        this.loadJSONs(app,loadJsons);

        var rootGames = Game.Data.CFG.CConfigData.Instance.CFG.RootGame;
        var tmp,streams;
        for(var key in rootGames)
        {
            tmp = rootGames[key];
            streams =[];
            try{
                var tmpStreams = tmp.streams.split(";");
                if(tmpStreams instanceof Array)
                {
                    for(var i=0;i<tmpStreams.length;i++)
                    {
                        if(tmpStreams[i].length > 5)
                        {
                            streams.push(tmpStreams[i])
                        }

                    }
                }
            }
            catch (e)
            {

            }

            tmp.streams = streams;
        }
    },
    afterInit:function()
    {

    }

}).Static({
    CFG_DATA:{
        "limit_BJL":["limit_bjl",["id"]],
        "limit_LH":["limit_lh",["id"]],
        "RootGame":["heguan",["id"]]
    },
    Instance:Core.Instance
})
