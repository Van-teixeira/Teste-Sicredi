/*
 * 	Character Count Plugin - jQuery plugin
 * 	Dynamic character count for text areas and input fields
 *	written by Alen Grakalic	
 *	http://cssglobe.com/post/7161/jquery-plugin-simplest-twitterlike-dynamic-character-count-for-textareas
 *  download by http://www.codefans.net
 *	Copyright (c) 2009 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

(function ($) {

    $.fn.charCount = function (options) {

        // default configuration properties
        var defaults = {
            allowed: 140,
            continer: ".test",
            counterText: '',
            //counterOutText: "已超过",
            normalCss: '',
            overcss: ''
        };
        options = $.extend(defaults, options);

        function calculate(obj) {
            var count = $(obj).val().length;
            var available = options.allowed - count;//还剩多少字
            var over = count - options.allowed;//超过多少字 
            
            var tips = $.ZhunxinLanguage.allLang.已超过;
            var cssclass = options.overcss; //超过字的样式
            var number = over; //超过的字数

            if (available >= 0) {
                tips = "";
                cssclass = options.normalCss;
                number = available;
            }
            $(options.continer).html(tips + '<span class="' + cssclass + '">' + options.allowed + '</span>' + $.ZhunxinLanguage.allLang.个字);
            $(options.continer).children('span').html(number);
        };

        this.each(function () {
            calculate(this);
            $(this).keyup(function () { calculate(this); });
            $(this).change(function () { calculate(this); });
        });
    };

})(jQuery);