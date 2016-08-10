$.extend($.validator.messages, {
    required: "必填字段",
    remote: "请输入正确的值",
    email: "请输入正确格式的电子邮件",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期 (ISO).",
    number: "请输入合法的数字",
    digits: "只能输入整数",
    creditcard: "请输入合法的信用卡号",
    equalTo: "请再次输入相同的值",
    maxlength: $.validator.format("允许的最大长度为 {0} 个字符"),
    minlength: $.validator.format("允许的最小长度为 {0} 个字符"),
    rangelength: $.validator.format("允许的长度为{0}和{1}之间"),
    range: $.validator.format("请输入介于 {0} 和 {1} 之间的值"),
    max: $.validator.format("请输入一个最大为 {0} 的值"),
    min: $.validator.format("请输入一个最小为 {0} 的值")
});
$.ajaxSetup({
    error:function(xhr,e,o){
        var errorMsg = "";
        if(xhr.status == 500){
            errorMsg = xhr.responseJSON.message || "系统错误,请联系管理员"
        }else {
            errorMsg = '请求错误,请稍后再试'
        }
        tipDialog.open({
            level:3,
            body:errorMsg
        })
    }
});
$(function(){
    $("body").append('<div id="tipDialog" title="系统提示">' +
        '<p><span></span><span></span></p>' +
        '</div>');
    $( "#tipDialog" ).dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape:false,
        show: {
            effect: "blind",
            duration: 300
        },
        hide: {
            effect: "explode",
            duration: 300
        },
        buttons: {

            Ok: function() {
                $( this ).dialog( "close" );
            }
        }
    });
})
var tipDialog = {
    open:function(opts){
        opts = $.extend({
            level:0,//0成功,1警告,2错误
            body:''
        }, opts);
        var content = $('#tipDialog').find('span')
        console.log(content)
        $(content[0]).html(opts.level)
        $(content[1]).html(opts.body)

        $('#tipDialog').dialog("open");
    },
    close:function(){
        $('#tipDialog').dialog("close");
    }
}