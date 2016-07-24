function gradeclick(gradeId){

}
function courseclick(courseId){

}
function dynamicForm(url,method,params){
    var dynamicForm = document.getElementById('dynamicForm');
    dynamicForm.setAttribute('method',method);
    dynamicForm.setAttribute('action',url);
    dynamicForm.innerHTML = "";
    for(var i = 0 ;i < params.length; i++){
        var input = document.createElement('input');
        input.setAttribute('type','hidden');
        input.setAttribute('name',params[i].paramName);
        input.setAttribute('value',params[i].paramValue);
        dynamicForm.appendChild(input);
    }
    dynamicForm.submit();
}

function pagingBarRender(opts,clickCallback){
    opts = $.extend({
                container:'',
                pageCount:1,
                current_page:1
            },opts);
    var _pageCount = 0;
    if(opts.pageCount > 10){
        _pageCount = 10;
    }else{
        _pageCount = opts.pageCount;
    }
    $("#" + opts.container).pagination(_pageCount,{
        callback:clickCallback,
        current_page:opts.current_page-1
    });
}
function _parseId(str){
    if(!str) return "";
    return str.split("_")[1];
}