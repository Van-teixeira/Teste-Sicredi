(function ($) {
    $.fn.validationEngineLanguage = function () { };
    $.validationEngineLanguage = {
        newLang: function () {
            $.validationEngineLanguage.allRules = {
                "required": {    			// Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* 此项目必填",
                    "alertTextCheckboxMultiple": "* 请选择一个选项",
                    "alertTextCheckboxe": "* 必须选中"
                },
                "length": {
                    "regex": "none",
                    "alertText": "* 长度在 ",
                    "alertText2": " 到 ",
                    "alertText3": " 个字符之间"
                },
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* 选择的选项超出"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* 请选择不超过 ",
                    "alertText2": " 个选项"
                },
                "confirm": {
                    "regex": "none",
                    "alertText": "* 输入内容不匹配"
                },
                "telephone": {
                    "regex": "/^[0-9\-\(\)\ ]+$/",
                    "alertText": "* 无效电话号码"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* 无效的网址"
                },
                "mobile": {
                    "regex": "/^(1)[0-9]{10}$/",
                    "alertText": "* 无效手机号码"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* 最小值為 "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* 最大值为 "
                },
                "email": {
                    "regex": "/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/",
                    "alertText": "* 无效邮件地址"
                },
                "date": {
                    "regex": "/^[0-9]{4}\-\[0-9]{1,2}\-\[0-9]{1,2}$/",
                    "alertText": "* 无效日期，格式必须是 YYYY-MM-DD "
                },
                "integer": {
                    "regex": "/^-?[0-9\ ]+$/",
                    "alertText": "* 只允许录入整数"
                },
                "decimal": {
                    "regex": "/^-?\\d*\\.?\\d+$/",
                    "alertText": "* 只能输入数字"
                },
                "noSpecialCaracters": {
                    "regex": "/^[0-9a-zA-Z]+$/",
                    "alertText": "* 只允许输入字母和数字"
                },
                "ajaxUser": {
                    "file": "CheckLogin.ashx",
                    "extraData": "&type=User",
                    "alertTextOk": " √ 用户名可以使用",
                    "alertTextLoad": "* 正在校验用户名，请等待...",
                    "alertText": "* 用户名已经被使用"
                },
                "ajaxMail": {
                    "file": "CheckLogin.ashx",
                    "extraData": "&type=Email",
                    "alertTextOk": " √ 邮箱可以使用 ",
                    "alertTextLoad": "* 正在校验邮箱，请等待...",
                    "alertText": "* 邮箱已经被使用"
                },
                "onlyLetter": {
                    "regex": "/^[a-zA-Z\ \']+$/",
                    "alertText": "* 只允许输入字母"
                }
            }

        }
    }
})(jQuery);

$(document).ready(function () {
    $.validationEngineLanguage.newLang()
});