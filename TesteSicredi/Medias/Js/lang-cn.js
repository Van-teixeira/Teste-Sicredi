(function ($) {
    $.fn.ZhunxinLanguage = function () { };
    $.ZhunxinLanguage = {
        newLang: function () {
            $.ZhunxinLanguage.allLang = {
                "已超过": "已超过",
                "选择技能数量不能超过": "xx",
                "您确定要": "您确定要",
                "请确认": "请确认",
                "加载中，请等待": "加载中，请等待",
                "个字": "个字"
            };
        }
    };
})(jQuery);

$(function () {
    $.ZhunxinLanguage.newLang();

});