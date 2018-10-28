
if (!String.prototype.trim) {
    var TRIM_REG = /^\s+|\s+$\g/;
    String.prototype.trim = function () { return this.replace(TRIM_REG, ''); }
}



///清除页面错误信息
function Clear() {
    $(".formError").remove();
}

function fuckie6() {
    if ($.browser.msie && $.browser.version == 6) {
        alert("拒绝ie6，从我做起");
    }
}
function getUrl() {
    var url = document.location.toString().replace("http://", "");
    var index = url.indexOf('/');
    var eindex = url.indexOf('?');
    var length = url.length;
    url = url.substring(index, eindex > 0 ? eindex : length);
    return url;
}
function MyInit() {


    $(".jExpand").jExpand();
    jShow();
    Clear();



    $(".jExpand  tr:odd").mouseover(function () {
        $(this).addClass('hoveColor');
    }).mouseleave(function () {
        $(this).removeClass('hoveColor');
    });

    $('#form1').validationEngine();

    $("input.Confirm:enabled").click(function () {
        var msg = $(this).val();
        return confirm($.ZhunxinLanguage.allLang.您确定要 + msg + '?', $.ZhunxinLanguage.allLang.请确认);
    });

    $("a.Confirm").click(function () {
        if ($(this).hasClass("needCheck")) {
            var r = $("#form1").validationEngine({ returnIsValid: true });
            if (!r) return false;
        }
        var url = $(this).attr("href");
        var msg = $(this).html();
        jConfirm($.ZhunxinLanguage.allLang.您确定要 + msg + "？", $.ZhunxinLanguage.allLang, function (result) {
            if (result) $(location).attr('href', url);
        });
        return false;
    });

    ///注册页面校验事件
    $(".needCheck:enabled, a.needCheck").btnValidation();


    //    alert($(".needCheck:enabled, a.needCheck").length);
    //alert($(".needCheck:enabled").length);
    //alert($("a.needCheck").length);

    $("input.date:enabled").SetDate();

    $("a.NorBtn").each(function () {
        var tmp = $(this).html();
        if (tmp.indexOf("<b>") < 0) {
            $(this).html("<b>" + tmp + "</b>");
        }
    });

}


function EndRequestHandler() {
    MyInit();
}

function AddEndRequest(caller) {
    try {
        var prm = Sys.WebForms.PageRequestManager.getInstance();
        if (prm) prm.add_endRequest(caller);
    } catch (e) { }
}

$().ready(function () {
    MyInit();
    AddEndRequest(EndRequestHandler);
});

