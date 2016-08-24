$(document).ready(function(){	
	//left-nav
	if($('.left-nav').length>0){
		
		$('.left-nav > ul > li').each(function(){
			if($(this).hasClass('active')){
				$(this).find('ul').css('display','block');
			}
		})
		
		$('.left-nav .nav-title').on('click',function(){
			$('.left-nav > ul > li').removeClass('active');
			$(this).parent().addClass('active');
			$(this).parent().find('ul').slideToggle();
			
		})
		$('.left-nav li li').on('click',function(){
			$('.left-nav li li').removeClass('active');
			$(this).addClass('active')
		})
		$(window).scroll(function(){
			if($(window).scrollTop()>=100){
				$('.left-nav').animate({paddingTop:"0"},50)
			}else{
				$('.left-nav').animate({paddingTop:"100px"},50)
			}
			$('.left-nav').css('left',-$(window).scrollLeft());
		})
	}
	//check-all
	$('#check-all').on('click',function(){
		if($(this).prop('checked')){
			$("input[type='checkbox']").prop('checked', true);
		}else{
			$("input[type='checkbox']").prop('checked', false);
		}
		

	})
})

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
		myDialog.tipDialog.open({
			level:3,
			body:errorMsg,
			title:'系统提示'
		})
	}
});
$(function(){
	$("body").append('' +
		'<div class="modal fade bs-example-modal-sm" ' +
			'role="dialog" aria-labelledby="mySmallModalLabel" id="tipDialogModal">' +
			'<div class="modal-dialog modal-sm">' +
				'<div class="modal-content">' +
					'<div class="modal-header">' +
						'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
						'<h4 class="modal-title" id="myModalLabel">Modal title</h4>' +
					'</div>' +
					'<div class="modal-body">asdfasdf' +
					'</div>' +
					'<div class="modal-footer">' +
						'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>'+
		'<div class="modal fade bs-example-modal-sm" ' +
			'role="dialog" aria-labelledby="mySmallModalLabel" id="confirmDialogModal">' +
			'<div class="modal-dialog modal-sm">' +
				'<div class="modal-content">' +
					'<div class="modal-header">' +
						'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
						'<h4 class="modal-title" id="myModalLabel">Modal title</h4>' +
					'</div>' +
					'<div class="modal-body">asdfasdf' +
					'</div>' +
					'<div class="modal-footer">' +
						'<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
						'<button type="button" class="btn btn-primary" id="confirm_">确定</button>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>'
	);

})
var myDialog = {
	tipDialog : {
		open:function(opts){
			opts = $.extend({
				level:0,//0成功,1警告,2错误
				body:'',
				title:'系统提示',
				hiddenCallback:null
			}, opts);
			var title = $('#tipDialogModal').find('.modal-title')
			var content = $('#tipDialogModal').find('.modal-body')
			$(title[0]).html(opts.title)
			$(content[0]).html(opts.body)
			$('#tipDialogModal').modal('toggle')
			$('#tipDialogModal').one('hidden.bs.modal', function (e) {
				!opts.hiddenCallback || opts.hiddenCallback()
			})

		},
		close:function(){
			$('#tipDialogModal').modal('hide')
		}
	},
	confirmDialog:{
		open:function(opts){
			var self = this;
			opts = $.extend({
				body:'',
				title:'',
				confirmCallback:null
			}, opts);
			var title = $('#confirmDialogModal').find('.modal-title')
			var content = $('#confirmDialogModal').find('.modal-body')
			$(title[0]).html(opts.title)
			$(content[0]).html(opts.body)
			$('#confirm_').one("click",function(){
				!opts.confirmCallback || opts.confirmCallback();
				self.close();
			})
			$('#confirmDialogModal').modal('toggle')

		},
		close:function(){
			$('#confirmDialogModal').modal('hide')
		}
	}
}


