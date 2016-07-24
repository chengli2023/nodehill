/**
 * Created by licheng on 2015
 * @param obj
 * @returns {{show: Function}}
 * @constructor
 */
var PageMask = function PageMask(obj){
    obj = obj || {};
    obj.tpl = obj.tpl || "default";
    obj.maskBgId = obj.maskBgId || 'pageMaskBg_kG5gO';
    obj.loadData = obj.loadData || {};

    function loadData(obj, tpl){
        for(var o in obj){
            var token = {
                objPath : arguments[2] ? arguments[3] + "\\." + o.toString() : o.toString(),
                objVal : obj[o]
            };
            if(typeof obj[o] == "object") tpl = loadData(obj[o], tpl, true, token.objPath);
            var regExp = new RegExp("\\$\\{(" + token.objPath + ")\\}",'img')
            tpl = tpl.replace(regExp,function(w){
                return token.objVal.toString();
            });
        }
        return tpl;
    }

    function makeMask(tpl){
        var pageMaskBgDiv = document.getElementById(obj.maskBgId);
        if(!pageMaskBgDiv){
            pageMaskBgDiv = document.createElement("div");
            pageMaskBgDiv.style.display="none";
            pageMaskBgDiv.id = obj.maskBgId;
            document.body.insertBefore(pageMaskBgDiv,document.body.lastChild);
        }
        pageMaskBgDiv.innerHTML = tpl;
        pageMaskBgDiv.style.cssText = "z-index: 999; position: fixed; top: 0; left: 0; display: block;text-align: center; background: url('/public/images/pageMaskBg.png') repeat";

        maskResize(obj.maskBgId);
        PageMask[obj.maskBgId] = {};
        window.addEventListener("resize",PageMask[obj.maskBgId].maskResize = function(){maskResize(obj.maskBgId)});
    }

    function maskResize(maskBgId){
        var ch = document.documentElement.clientHeight;
        var cw = document.documentElement.clientWidth;

        document.getElementById(maskBgId).style.width = cw + "px";
        document.getElementById(maskBgId).style.height = ch + "px";
    }
    return {
        show:function(){
            var tpl = PageMask.tplSet[obj.tpl]
                    || (document.getElementById(obj.tpl) ? document.getElementById(obj.tpl).innerHTML : null)
                    || "Mask-templet is unavailable.",
            //loadData
            tpl = loadData(obj.loadData,tpl);
            //show div
            makeMask(tpl);
            return this;
        }
    };
}

PageMask.hide = function(maskBgId){
    maskBgId = maskBgId || "pageMaskBg_kG5gO";
    if(!PageMask[maskBgId]) return;
    document.getElementById(maskBgId).style.display="none";
    window.removeEventListener("resize",PageMask[maskBgId].maskResize);
};
PageMask.show = function(maskBgId){
    maskBgId = maskBgId || "pageMaskBg_kG5gO";
    if(!PageMask[maskBgId]) return;
    document.getElementById(maskBgId).style.display="block";
    window.addEventListener("resize",PageMask[maskBgId].maskResize);
}

PageMask.tplSet = {
    default:'<div style="display:table; margin: auto; margin-top: 10%; width: 30%; background: #fff">' +
                '<div style="display:table-row; height:30px; background: #336699; text-align: center; line-height: 30px;color: #fff; font-weight: bold;">' +
                '${title}' +
                '<a style="float:right;color: #fff; padding-right: 10px;" href="javascript:PageMask.hide()">X</a>' +
                '</div>' +
                '<div style="display: table-row">' +
                    '<div style="height: 100px; border: 1px solid #336699; text-align: left; display:table-cell; padding: 10px; vertical-align:middle;"><textarea id="question_content" cols="60" rows="4" maxlength="200" placeholder="请在此输入您的问题！"></textarea><button type="button" style="float: right; height: 30px; width: 80px;"onclick="toAsk()">确定</button></div>' +
                '</div>' +
            '</div>',
    default2:'<div style="display:table; margin: auto; margin-top: 10%; width: 30%; background: #fff"><div style="display:table-row; height:30px; background: #336699; text-align: center; line-height: 30px;color: #fff; font-weight: bold;">${title}<a style="float:right;" href="javascript:PageMask.hide(' + '"your-maskBgId"' + ')">X</a></div><div style="display: table-row"><div style="height: 100px; border: 1px solid #336699; text-align: left; display:table-cell; padding: 10px; vertical-align:middle;">${content}</div></div></div>',
	loading:'<div style="position:relative; z-index: 1001;top:40%; width:31px;margin:auto;"><img style="" src="/public/images/loading2.gif"/></div>',
    resetPassword:''
};









