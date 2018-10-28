

//去左空格;
function ltrim(s) {
    return s.replace(/^\s*/, "");
}
//去右空格;
function rtrim(s) {
    return s.replace(/\s*$/, "");
}
//左右空格;
function trim(s) {
    return rtrim(ltrim(s));
}
//替换
function replace(s, t, u) {
    i = s.indexOf(t);
    r = "";
    if (i == -1) return s;
    r += s.substring(0, i) + u;
    if (i + t.length < s.length)
        r += replace(s.substring(i + t.length, s.length), t, u);
    return r;
}

jQuery.fn.extend({

    ///设置弹出日期控件
    SetDate: function () {
        $(this).live("focus", function () {
            WdatePicker({
                lang: 'zh-cn',
                skin: 'whyGreen',
                onpicked: function () {
                    $(this).blur();
                    $(this).change();
                },
                oncleared: function () {
                    $(this).blur();
                    $(this).change();
                }
            });
        });
        return this;
    },

    ///表格可展开
    jExpand: function () {
        var element = this;
        $(element).find("tr:odd").addClass("odd");
        $(element).find("tr:not(.odd)").hide();
        /*点击加了hide元素的对象可以关闭展开的表格*/
        $(element).find("tr:not(.odd)").find(".hide").click(function () {
            $("tr.odd").removeClass("bgcolor");
            $("tr:not(.odd)").hide();
            $("tr:first-child").show();
            $(this).next("tr").slideToggle("fast", function () { $(this).find(".arrow").toggleClass("up"); });
            $(this).find(".arrow").toggleClass("up");
        });

        $(element).find("tr:first-child").show();

        $(element).find("tr.odd ").each(function () {
            var tr = $(this);
            tr.find(".showDetail").click(function () {
                $("tr.odd").removeClass("bgcolor");
                tr.addClass("bgcolor");
                $(element).find("tr:not(.odd):not(:hidden)").hide();
                $(element).find("tr:first-child").show();
                $(tr).next("tr").slideToggle("fast", function () { $(this).find(".arrow").toggleClass("up"); });
            });
        });
        return this;
    },
    /*选项卡*/
    JTabs: function (content, settings) {
        settings = jQuery.extend({
            currentClass: 'current',
            isClickFirst: true,
            DefaultIndex: 0,
            IsHover: false,
            clicked: function () { }
        }, settings);

        var tabContainers = $(content);
        var title = $(this);

        if (settings.isClickFirst) {
            tabContainers.hide().eq(settings.DefaultIndex).show();
            title.removeClass(settings.currentClass);
            title.eq(settings.DefaultIndex).addClass(settings.currentClass);
            settings.clicked(this, tabContainers.eq(settings.DefaultIndex));
        }

        title.each(function (index, obj) {
            $(obj).click(function () {
                tabContainers.hide();
                $(".formError").remove();
                $(title).removeClass(settings.currentClass);
                $(this).addClass(settings.currentClass);
                tabContainers.eq(index).show();
                settings.clicked(this, tabContainers.eq(index));
            });
            if (settings.IsHover) {
                $(obj).hover(function () {
                    tabContainers.hide();
                    $(".formError").remove();
                    $(title).removeClass(settings.currentClass);
                    $(this).addClass(settings.currentClass);
                    tabContainers.eq(index).show();
                    settings.clicked(this, tabContainers.eq(index));
                });
            }
        });
        return this;
    },
    ///加个样式n次
    shake: function (cls, times, xx) {
        var i = 0;
        var item = $(this);
        if (item.length == 0) return;
        t = setInterval(function () {
            i++;
            item.toggleClass(cls);
            if (i == xx && xx > 0) {
                item.removeClass(cls);
                clearInterval(t);
            }
        }, times)
    },

    /*回车触发按钮的点击*/
    EnterToClick: function (btn) {
        $(this).keydown(function (event) {
            if (event.keyCode == 13)
                $(btn).click();
        });
        return this;
    }
});

/*JAlert*/

$.alerts = {
    // These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
    verticalOffset: 0,                // vertical offset of the dialog from center screen, in pixels
    horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
    repositionOnResize: true,           // re-centers the dialog on window resize
    overlayOpacity: .5,                // transparency level of overlay
    overlayColor: '#000',               // base color of overlay
    draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
    okButton: '确定',         // text for the OK button
    cancelButton: '取消', // text for the Cancel button
    dialogClass: null,                  // if specified, this class will be applied to all dialogs
    // Public methods
    alert: function (message, title, callback) {
        if (title == null) title = 'Alert';
        $.alerts._show(title, message, null, "alert", function (result) {
            if (callback) callback(result);
        });
    },
    confirm: function (message, title, callback) {
        if (title == null) title = 'Confirm';
        $.alerts._show(title, message, null, 'confirm', function (result) {
            if (callback) callback(result);
        });
    },
    prompt: function (message, value, title, callback) {
        if (title == null) title = 'Prompt';
        $.alerts._show(title, message, value, 'prompt', function (result) {
            if (callback) callback(result);
        });
    },
    show: function () {
        $.alerts._maintainPosition(false);
        var pos = ($.browser.msie && parseInt($.browser.version) <= 6) ? 'absolute' : 'fixed';
        var up = $("#up1");
        var size = $(".popup_container").size();
        var size1 = $("#popup_container").size();
        var totalpops = size + 99899;
        if (size == 0 && size1 == 0) $.alerts._overlay("hide");
        if (totalpops > 99899) {
            var overlayIndex = totalpops - 1;
            if ($("#popup_container").size() > 0)
                $.alerts._overlay('show');
            else
                $.alerts._overlay('show', overlayIndex);
            $.alerts._reposition();
            $.alerts._maintainPosition(true);
            $(".popup_container").each(function () {
                if (up.length > 0) $(this).appendTo(up);
                else $(this).appendTo($("form"));
                $(this).css({
                    position: pos,
                    zIndex: totalpops--,
                    padding: 0,
                    margin: 0
                });
                $.alerts.reposition(this);
            });
        }
    },

    // Private methods
    _show: function (title, msg, value, type, callback) {
        //$.alerts._hide();
        $("#popup_container").remove();
        $.alerts._maintainPosition(false);
        var totalpops = $(".popup_container").size() + 99899;
        $.alerts._overlay('show', totalpops - 1);
        $("BODY").append(
            '<div id="popup_container">' +
                '<h1 id="popup_title"></h1>' +
                '<div id="popup_content">' +
                '<div id="popup_message"></div>' +
                '</div>' +
                '</div>');
        if ($.alerts.dialogClass) $("#popup_container").addClass($.alerts.dialogClass);
        // IE6 Fix
        var pos = ($.browser.msie && parseInt($.browser.version) <= 6) ? 'absolute' : 'fixed';
        $("#popup_container").css({
            position: pos,
            zIndex: 99999,
            padding: 0,
            margin: 0
        });
        $("#popup_title").text(title);
        $("#popup_content").addClass(type);
        $("#popup_message").text(msg);
        $("#popup_message").html($("#popup_message").text().replace(/\n/g, '<br />'));
        $("#popup_container").css({
            minWidth: $("#popup_container").outerWidth(),
            maxWidth: $("#popup_container").outerWidth()
        });
        $.alerts._reposition();
        $.alerts._maintainPosition(true);
        switch (type) {
            case 'alert':
                $("#popup_message").after('<div id="popup_panel"><input type="button" class="button icon_sure" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
                $("#popup_ok").click(function () {
                    $.alerts._hide();
                    callback(true);
                });
                $("#popup_ok").focus().keypress(function (e) {
                    if (e.keyCode == 13 || e.keyCode == 27) $("#popup_ok").trigger('click');
                });
                break;
            case 'confirm':
                $("#popup_message").after('<div id="popup_panel"><input type="button" class="button icon_sure" value="' + $.alerts.okButton + '" id="popup_ok" />  <span class="separateSpan"></span><input type="button" value="' + $.alerts.cancelButton + '" class="button icon_cross" id="popup_cancel" /></div>');
                $("#popup_ok").click(function () {
                    $.alerts._hide();
                    callback(true);
                });
                $("#popup_cancel").click(function () {
                    $.alerts._hide();
                    if (callback) callback(false);
                });
                $("#popup_ok, #popup_cancel").keypress(function (e) {
                    if (e.keyCode == 13) $("#popup_ok").trigger('click');
                    if (e.keyCode == 27) $("#popup_cancel").trigger('click');
                });
                break;
            case 'prompt':
                $("#popup_message").append('<br /><textarea type="text" size="24" class="input-textarea" id="popup_prompt" ></textarea>').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" class="button icon_accept" id="popup_ok" /> <span class="separateSpan"> </span><input type="button" value="' + $.alerts.cancelButton + '" class="button icon_cross" id="popup_cancel" /></div>');
                $("#popup_prompt").width($("#popup_message").width() - 20);
                $("#popup_ok").click(function () {
                    var val = $("#popup_prompt").val();
                    $.alerts._hide();
                    if (callback) callback(val);
                });
                $("#popup_cancel").click(function () {
                    $.alerts._hide();
                    if (callback) callback(null);
                });
                $("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (e) {
                    if (e.keyCode == 13) $("#popup_ok").trigger('click');
                    if (e.keyCode == 27) $("#popup_cancel").trigger('click');
                });
                if (value) $("#popup_prompt").val(value);
                $("#popup_prompt").focus().select();
                break;
        }
    },

    _hide: function () {
        $("#popup_container").remove();
        $.alerts._overlay('hide');
        $.alerts._maintainPosition(false);
    },

    _overlay: function (status, layer) {
        if (!layer) layer = 99998;
        switch (status) {
            case 'show':
                if ($("#popup_overlay").size() == 0) {
                    $("body").append('<div id="popup_overlay"></div>');
                }
                $("#popup_overlay").css({
                    position: 'absolute',
                    zIndex: layer,
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: $(document).height(),
                    background: $.alerts.overlayColor,
                    opacity: $.alerts.overlayOpacity
                });
                break;
            case 'hide':
                var totalpops = $(".popup_container").size();
                if (totalpops <= 0)
                    $("#popup_overlay").remove();
                else
                    $("#popup_overlay").css({ zIndex: totalpops + 99898 });
                break;
        }
    },

    _reposition: function () {
        var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
        var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
        if (top < 0) top = 0;
        if (left < 0) left = 0;

        // IE6 fix
        if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

        $("#popup_container").css({
            top: top + 'px',
            left: left + 'px'
        });
        $("#popup_overlay").height($(document).height());
    },

    reposition: function (obj) {
        var top = (($(window).height() / 2) - ($(obj).outerHeight() / 2)) + $.alerts.verticalOffset;
        var left = (($(window).width() / 2) - ($(obj).outerWidth() / 2)) + $.alerts.horizontalOffset;
        if (top < 0) top = 0;
        if (left < 0) left = 0;

        // IE6 fix
        if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

        $(obj).css({
            top: top + 'px',
            left: left + 'px'
        });

    },
    _maintainPosition: function (status) {
        if ($.alerts.repositionOnResize) {
            switch (status) {
                case true:
                    $(window).bind('resize', $.alerts._reposition);
                    break;
                case false:
                    $(window).unbind('resize', $.alerts._reposition);
                    break;
            }
        }
    }
};
// Shortuct functions
jAlert = function (message, title, callback) {
    $.alerts.alert(message, title, callback);
};
jConfirm = function (message, title, callback) {
    $.alerts.confirm(message, title, callback);
};
jPrompt = function (message, value, title, callback) {
    $.alerts.prompt(message, value, title, callback);
};
jShow = function () {
    $.alerts.show();
};

/*JAlert结束*/



/*验证控件*/
(function ($) {
    //$('<div class="waiting">加载中，请等待！</div>').leanModal();
    $.fn.btnValidation = function (caller, postion, custom) {
        if (!caller) caller = $("form").eq(0);
        if (!postion) postion = "topRight";
        var loading = '<div class="waiting">' + $.ZhunxinLanguage.allLang["加载中，请等待"] + '！</div>';
        $(this).each(function (index, obj) {
            var func = function () {
                var result = $(caller).validationEngine({ returnIsValid: true, promptPosition: postion });
                if (custom && typeof custom == "function") result &= custom();
                if (!result) return false;
                $(loading).leanModal();
                return true;
            };

            if ($(obj)[0].tagName == "A") {
                if ($(obj).attr("url")) return false;

                $(this).attr("url", $(obj).attr("href"));
                $(this).attr("href", "javascript:;");

                func = function () {
                    var result = $(caller).validationEngine({ returnIsValid: true, promptPosition: postion });
                    if (custom && typeof custom == "function") result &= custom();
                    if (result) {
                        $(loading).leanModal();

                        $(location).attr('href', $(obj).attr("url"));
                    }
                    return false;
                };
            }
            $(obj).click(func);
        });

    };

    $.fn.validationEngine = function (settings) {

        if ($.validationEngineLanguage) {				// IS THERE A LANGUAGE LOCALISATION ?
            allRules = $.validationEngineLanguage.allRules;
        } else {
            $.validationEngine.debug("Validation engine rules are not loaded check your external file");
        }
        settings = jQuery.extend({
            allrules: allRules,
            validationEventTriggers: "focusout",
            inlineValidation: true,
            returnIsValid: false,
            liveEvent: true,
            unbindEngine: false,
            ajaxSubmit: true,
            scroll: false,
            promptPosition: "topRight", // OPENNING BOX POSITION, IMPLEMENTED: topLeft, topRight, bottomLeft, centerRight, bottomRight
            success: false,
            beforeSuccess: function () { },
            failure: function () { }
        }, settings);
        $.validationEngine.settings = settings;
        $.validationEngine.ajaxValidArray = new Array(); // ARRAY FOR AJAX: VALIDATION MEMORY 

        if (settings.inlineValidation == true) { 		// Validating Inline ?
            if (!settings.returnIsValid) {					// NEEDED FOR THE SETTING returnIsValid
                allowReturnIsvalid = false;
                if (settings.liveEvent) {						// LIVE event, vast performance improvement over BIND
                    $(this).find("[class*=validate][type!=checkbox]").live(settings.validationEventTriggers, function (caller) { _inlinEvent(this); })

                    $(this).find("[class*=validate][type=checkbox]").live("click", function (caller) { _inlinEvent(this); })
                } else {
                    $(this).find("[class*=validate]").not("[type=checkbox]").bind(settings.validationEventTriggers, function (caller) { _inlinEvent(this); })
                    $(this).find("[class*=validate][type=checkbox]").bind("click", function (caller) { _inlinEvent(this); })
                }

                //$(this).find("[class*=ajax]").live("change", function () {
                //    alert($(this).val());
                //    $.validationEngine.isError = true;
                //});
                firstvalid = false;
            }
            function _inlinEvent(caller) {
                $.validationEngine.settings = settings;
                if ($.validationEngine.intercept == false || !$.validationEngine.intercept) {		// STOP INLINE VALIDATION THIS TIME ONLY
                    $.validationEngine.onSubmitValid = false;
                    $.validationEngine.loadValidation(caller);
                } else {
                    $.validationEngine.intercept = false;
                }
            }
        }
        if (settings.returnIsValid) {		// Do validation and return true or false, it bypass everything;
            return !$.validationEngine.submitValidation(this, settings);
        }
        $(".formError").live("click", function () {	 // REMOVE BOX ON CLICK
            $(this).fadeOut(150, function () {
                $(this).remove();
            })
        })
    };
    $.validationEngine = {
        defaultSetting: function (caller) { // NOT GENERALLY USED, NEEDED FOR THE API, DO NOT TOUCH
            if ($.validationEngineLanguage) {
                allRules = $.validationEngineLanguage.allRules;
            } else {
                $.validationEngine.debug("Validation engine rules are not loaded check your external file");
            }
            settings = {
                allrules: allRules,
                validationEventTriggers: "blur",
                inlineValidation: true,
                returnIsValid: false,
                scroll: true,
                unbindEngine: true,
                ajaxSubmit: true,
                promptPosition: "topRight", // OPENNING BOX POSITION, IMPLEMENTED: topLeft, topRight, bottomLeft, centerRight, bottomRight
                success: false,
                failure: function () {
                }
            }
            $.validationEngine.settings = settings;
        },
        loadValidation: function (caller) { // GET VALIDATIONS TO BE EXECUTED
            if (!$.validationEngine.settings) {
                $.validationEngine.defaultSetting()
            }
            rulesParsing = $(caller).attr('class');
            rulesRegExp = /\[(.*)\]/;
            getRules = rulesRegExp.exec(rulesParsing);
            str = getRules[1];
            pattern = /\[|,|\]/;
            result = str.split(pattern);
            var validateCalll = $.validationEngine.validateCall(caller, result)
            return validateCalll;
        },
        validateCall: function (caller, rules) { // EXECUTE VALIDATION REQUIRED BY THE USER FOR THIS FIELD
            var promptText = ""
            ///ajax验证完成状态
            var checked = true;
            if (!$(caller).attr("id")) {
                $.validationEngine.debug("This field have no ID attribut( name & class displayed): " + $(caller).attr("name") + " " + $(caller).attr("class"))
            }

            caller = caller;
            ajaxValidate = false;
            var callerName = $(caller).attr("name");
            $.validationEngine.isError = false;
            $.validationEngine.showTriangle = true;
            callerType = $(caller).attr("type");

            for (i = 0; i < rules.length; i++) {
                switch (rules[i]) {
                    case "optional":
                        if (!$(caller).val()) {
                            $.validationEngine.closePrompt(caller);
                            return $.validationEngine.isError;
                        }
                        break;
                    case "required":
                        _required(caller, rules);
                        break;
                    case "custom":
                        _customRegex(caller, rules, i);
                        break;
                    case "exemptString":
                        _exemptString(caller, rules, i);
                        break;
                    case "ajax":
                        if (!$.validationEngine.onSubmitValid) {

                            _ajax(caller, rules, i);
                        }
                        ;
                        break;
                    case "length":
                        _length(caller, rules, i);
                        break;
                    case "maxCheckbox":
                        _maxCheckbox(caller, rules, i);
                        groupname = $(caller).attr("name");
                        caller = $("input[name='" + groupname + "']");
                        break;
                    case "minCheckbox":
                        _minCheckbox(caller, rules, i);
                        groupname = $(caller).attr("name");
                        caller = $("input[name='" + groupname + "']");
                        break;
                    case "confirm":
                        _confirm(caller, rules, i);
                        break;
                    case "funcCall":
                        _funcCall(caller, rules, i);
                        break;
                    default:
                        ;
                }
                ;
            }
            ;
            radioHack();
            if ($.validationEngine.isError == true) {
                linkTofield = $.validationEngine.linkTofield(caller);

                ($("div." + linkTofield).size() == 0) ? $.validationEngine.buildPrompt(caller, promptText, "error") : $.validationEngine.updatePromptText(caller, promptText);
            } else {
                $.validationEngine.closePrompt(caller);
            }
            /* UNFORTUNATE RADIO AND CHECKBOX GROUP HACKS */
            /* As my validation is looping input with id's we need a hack for my validation to understand to group these inputs */

            function radioHack() {
                if ($("input[name='" + callerName + "']").size() > 1 && (callerType == "radio" || callerType == "checkbox")) { // Hack for radio/checkbox group button, the validation go the first radio/checkbox of the group
                    caller = $("input[name='" + callerName + "'][type!=hidden]:first");
                    $.validationEngine.showTriangle = false;
                }
            }

            /* VALIDATION FUNCTIONS */

            function _required(caller, rules) { // VALIDATE BLANK FIELD
                callerType = $(caller).attr("type");
                if (callerType == "text" || callerType == "password" || callerType == "textarea") {
                    if (!trim($(caller).val())) {
                        $.validationEngine.isError = true;
                        promptText += $.validationEngine.settings.allrules[rules[i]].alertText + "<br />";
                    }
                }
                if (callerType == "radio" || callerType == "checkbox") {
                    callerName = $(caller).attr("name");

                    if ($("input[name='" + callerName + "']:checked").size() == 0) {
                        $.validationEngine.isError = true;
                        if ($("input[name='" + callerName + "']").size() == 1) {
                            promptText += $.validationEngine.settings.allrules[rules[i]].alertTextCheckboxe + "<br />";
                        } else {
                            promptText += $.validationEngine.settings.allrules[rules[i]].alertTextCheckboxMultiple + "<br />";
                        }
                    }
                }
                if (callerType == "select-one") { // added by paul@kinetek.net for select boxes, Thank you		
                    if (!$(caller).val()) {
                        $.validationEngine.isError = true;
                        promptText += $.validationEngine.settings.allrules[rules[i]].alertText + "<br />";
                    }
                }
                if (callerType == "select-multiple") { // added by paul@kinetek.net for select boxes, Thank you	
                    if (!$(caller).find("option:selected").val()) {
                        $.validationEngine.isError = true;
                        promptText += $.validationEngine.settings.allrules[rules[i]].alertText + "<br />";
                    }
                }
            }

            function _customRegex(caller, rules, position) { // VALIDATE REGEX RULES
                customRule = rules[position + 1];
                pattern = eval($.validationEngine.settings.allrules[customRule].regex);
                if (!$(caller).attr('value') == '' && !pattern.test($(caller).attr('value'))) {
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules[customRule].alertText + "<br />";
                }
            }

            function _exemptString(caller, rules, position) { // VALIDATE REGEX RULES
                customString = rules[position + 1];
                if (customString == $(caller).attr('value')) {
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules['required'].alertText + "<br />";
                }
            }

            function _funcCall(caller, rules, position) { // VALIDATE CUSTOM FUNCTIONS OUTSIDE OF THE ENGINE SCOPE
                customRule = rules[position + 1];
                funce = $.validationEngine.settings.allrules[customRule].nname;

                var fn = window[funce];
                if (typeof (fn) === 'function') {
                    var fn_result = fn(caller);
                    $.validationEngine.isError = fn_result;
                    promptText += $.validationEngine.settings.allrules[customRule].alertText + "<br />";
                }
            }

            function _ajax(caller, rules, position) { // VALIDATE AJAX RULES

                customAjaxRule = rules[position + 1];
                postfile = $.validationEngine.settings.allrules[customAjaxRule].file;
                fieldValue = $(caller).val();
                ajaxCaller = caller;
                fieldId = $(caller).attr("id");
                ajaxValidate = true;
                ajaxisError = $.validationEngine.isError;

                if ($.validationEngine.settings.allrules[customAjaxRule].extraData) {
                    extraData = $.validationEngine.settings.allrules[customAjaxRule].extraData;
                } else {
                    extraData = "";
                }
                /* AJAX VALIDATION HAS ITS OWN UPDATE AND BUILD UNLIKE OTHER RULES */
                if (!ajaxisError) {

                    $.ajax({
                        type: "POST",
                        url: postfile,
                        async: false,
                        // async: true,
                        data: "validateValue=" + fieldValue + "&validateId=" + fieldId + "&validateError=" + customAjaxRule + extraData,
                        beforeSend: function () { // BUILD A LOADING PROMPT IF LOAD TEXT EXIST		   			
                            if ($.validationEngine.settings.allrules[customAjaxRule].alertTextLoad) {

                                if (!$("div." + fieldId + "formError")[0]) {
                                    return $.validationEngine.buildPrompt(ajaxCaller, $.validationEngine.settings.allrules[customAjaxRule].alertTextLoad, "load");
                                } else {
                                    $.validationEngine.updatePromptText(ajaxCaller, $.validationEngine.settings.allrules[customAjaxRule].alertTextLoad, "load");
                                }
                            }
                        },
                        error: function (data, transport) { $.validationEngine.debug("error in the ajax: " + data.status + " " + transport) },
                        success: function (data) { // GET SUCCESS DATA RETURN JSON

                            data = eval("(" + data + ")"); // GET JSON DATA FROM PHP AND PARSE IT
                            ajaxisError = data.jsonValidateReturn[2];
                            customAjaxRule = data.jsonValidateReturn[1];
                            ajaxCaller = $("#" + data.jsonValidateReturn[0])[0];
                            fieldId = ajaxCaller;
                            ajaxErrorLength = $.validationEngine.ajaxValidArray.length;
                            existInarray = false;

                            if (ajaxisError == "false") { // DATA FALSE UPDATE PROMPT WITH ERROR;

                                _checkInArray(false); // Check if ajax validation alreay used on this field

                                if (!existInarray) { // Add ajax error to stop submit		 		
                                    $.validationEngine.ajaxValidArray[ajaxErrorLength] = new Array(2);
                                    $.validationEngine.ajaxValidArray[ajaxErrorLength][0] = fieldId;
                                    $.validationEngine.ajaxValidArray[ajaxErrorLength][1] = false;
                                    existInarray = false;
                                }

                                //$.validationEngine.ajaxValid = false;

                                promptText += $.validationEngine.settings.allrules[customAjaxRule].alertText + "<br />";
                                //   alert(promptText);
                                //$.validationEngine.updatePromptText(ajaxCaller, promptText, "", false);
                                $.validationEngine.buildPrompt(ajaxCaller, promptText, "", true);
                            } else {
                                _checkInArray(true);
                                $.validationEngine.ajaxValid = true;
                                if (!customAjaxRule) {
                                    $.validationEngine.debug("wrong ajax response, are you on a server or in xampp? if not delete de ajax[ajaxUser] validating rule from your form ")
                                }
                                if ($.validationEngine.settings.allrules[customAjaxRule].alertTextOk) { // NO OK TEXT MEAN CLOSE PROMPT	 			
                                    $.validationEngine.updatePromptText(ajaxCaller, $.validationEngine.settings.allrules[customAjaxRule].alertTextOk, "pass", true);
                                } else {
                                    $.validationEngine.ajaxValid = false;

                                    $.validationEngine.closePrompt(ajaxCaller);
                                }

                            }

                            function _checkInArray(validate) {
                                for (x = 0; x < ajaxErrorLength; x++) {
                                    if ($.validationEngine.ajaxValidArray[x][0] == fieldId) {
                                        $.validationEngine.ajaxValidArray[x][1] = validate;
                                        existInarray = true;

                                    }
                                }
                            }
                        }
                    });
                }
            }

            function _confirm(caller, rules, position) { // VALIDATE FIELD MATCH
                confirmField = rules[position + 1];

                if ($(caller).attr('value') != $("#" + confirmField).attr('value')) {
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules["confirm"].alertText + "<br />";
                }
            }

            function _length(caller, rules, position) { // VALIDATE LENGTH

                startLength = eval(rules[position + 1]);
                endLength = eval(rules[position + 2]);
                feildLength = $(caller).attr('value').length;

                if (feildLength < startLength || feildLength > endLength) {
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules["length"].alertText + startLength + $.validationEngine.settings.allrules["length"].alertText2 + endLength + $.validationEngine.settings.allrules["length"].alertText3 + "<br />"
                }
            }

            function _maxCheckbox(caller, rules, position) { // VALIDATE CHECKBOX NUMBER

                nbCheck = eval(rules[position + 1]);
                groupname = $(caller).attr("name");
                groupSize = $("input[name='" + groupname + "']:checked").size();
                if (groupSize > nbCheck) {
                    $.validationEngine.showTriangle = false;
                    $.validationEngine.isError = true;
                    promptText += $.validationEngine.settings.allrules["maxCheckbox"].alertText + "<br />";
                }
            }

            function _minCheckbox(caller, rules, position) { // VALIDATE CHECKBOX NUMBER

                nbCheck = eval(rules[position + 1]);
                groupname = $(caller).attr("name");
                groupSize = $("input[name='" + groupname + "']:checked").size();
                if (groupSize < nbCheck) {

                    $.validationEngine.isError = true;
                    $.validationEngine.showTriangle = false;
                    promptText += $.validationEngine.settings.allrules["minCheckbox"].alertText + " " + nbCheck + " " + $.validationEngine.settings.allrules["minCheckbox"].alertText2 + "<br />";
                }
            }


            return ($.validationEngine.isError) ? $.validationEngine.isError : false;
        },
        submitForm: function (caller) {
            if ($.validationEngine.settings.ajaxSubmit) {
                if ($.validationEngine.settings.ajaxSubmitExtraData) {
                    extraData = $.validationEngine.settings.ajaxSubmitExtraData;
                } else {
                    extraData = "";
                }
                $.ajax({
                    type: "POST",
                    url: $.validationEngine.settings.ajaxSubmitFile,
                    async: true, //如果用异步，提交的时候就会悲剧
                    data: $(caller).serialize() + "&" + extraData,
                    error: function (data, transport) { $.validationEngine.debug("error in the ajax: " + data.status + " " + transport) },
                    success: function (data) {
                        if (data == "true") { // EVERYTING IS FINE, SHOW SUCCESS MESSAGE
                            $(caller).css("opacity", 1)
                            $(caller).animate({ opacity: 0, height: 0 }, function () {
                                $(caller).css("display", "none");
                                $(caller).before("<div class='ajaxSubmit'>" + $.validationEngine.settings.ajaxSubmitMessage + "</div>");
                                $.validationEngine.closePrompt(".formError", true);
                                $(".ajaxSubmit").show("slow");
                                if ($.validationEngine.settings.success) { // AJAX SUCCESS, STOP THE LOCATION UPDATE
                                    $.validationEngine.settings.success && $.validationEngine.settings.success();
                                    return false;
                                }
                            })
                        } else { // HOUSTON WE GOT A PROBLEM (SOMETING IS NOT VALIDATING)
                            data = eval("(" + data + ")");
                            if (!data.jsonValidateReturn) {
                                $.validationEngine.debug("you are not going into the success fonction and jsonValidateReturn return nothing");
                            }
                            errorNumber = data.jsonValidateReturn.length
                            for (index = 0; index < errorNumber; index++) {
                                fieldId = data.jsonValidateReturn[index][0];
                                promptError = data.jsonValidateReturn[index][1];
                                type = data.jsonValidateReturn[index][2];

                                $.validationEngine.buildPrompt(fieldId, promptError, type);
                            }
                        }
                    }
                });
                return true;
            }
            // LOOK FOR BEFORE SUCCESS METHOD		
            if (!$.validationEngine.settings.beforeSuccess()) {
                if ($.validationEngine.settings.success) { // AJAX SUCCESS, STOP THE LOCATION UPDATE
                    if ($.validationEngine.settings.unbindEngine) {
                        $(caller).unbind("submit");
                    }
                    $.validationEngine.settings.success && $.validationEngine.settings.success();
                    return true;
                }
            } else {
                return true;
            }
            return false;
        },
        buildPrompt: function (caller, promptText, type, ajaxed) { // ERROR PROMPT CREATION AND DISPLAY WHEN AN ERROR OCCUR


            if (!$.validationEngine.settings)
                $.validationEngine.defaultSetting();

            deleteItself = "." + $(caller).attr("id") + "formError";

            if ($(deleteItself)[0]) {
                $(deleteItself).stop();
                $(deleteItself).remove();
            }
            var divFormError = document.createElement('div');
            var formErrorContent = document.createElement('div');
            linkTofield = $.validationEngine.linkTofield(caller);
            $(divFormError).addClass("formError");

            if (type == "pass") {
                $(divFormError).addClass("greenPopup");
            }
            if (type == "load") {
                $(divFormError).addClass("blackPopup")
            }
            if (ajaxed) {
                $(divFormError).addClass("ajaxed");
            }

            $(divFormError).addClass(linkTofield);
            $(formErrorContent).addClass("formErrorContent");

            $("body").append(divFormError);
            $(divFormError).append(formErrorContent);

            if ($.validationEngine.showTriangle != false) { // NO TRIANGLE ON MAX CHECKBOX AND RADIO
                var arrow = document.createElement('div');
                $(arrow).addClass("formErrorArrow");
                $(divFormError).append(arrow);
                if ($.validationEngine.settings.promptPosition == "bottomLeft" || $.validationEngine.settings.promptPosition == "bottomRight") {
                    $(arrow).addClass("formErrorArrowBottom");
                    $(arrow).html('<div class="line1"></div><div class="line2"></div><div class="line3"></div><div class="line4"></div><div class="line5"></div><div class="line6"></div><div class="line7"></div><div class="line8"></div><div class="line9"></div>');
                }
                if ($.validationEngine.settings.promptPosition == "topLeft" || $.validationEngine.settings.promptPosition == "topRight") {
                    $(divFormError).append(arrow);
                    $(arrow).html('<div class="line9"></div><div class="line8"></div><div class="line7"></div><div class="line6"></div><div class="line5"></div><div class="line4"></div><div class="line3"></div><div class="line2"></div><div class="line1"></div>');
                }
            }
            $(formErrorContent).html(promptText);

            callerTopPosition = $(caller).offset().top;
            callerleftPosition = $(caller).offset().left;
            callerWidth = $(caller).width();
            inputHeight = $(divFormError).height();

            if (callerTopPosition <= 0) callerTopPosition = $(caller).parent().offset().top;
            if (callerleftPosition <= 0) callerleftPosition = $(caller).parent().offset().left;

            /* POSITIONNING */
            if ($.validationEngine.settings.promptPosition == "topRight") {
                callerleftPosition += callerWidth - 30;
                callerTopPosition += -inputHeight - 10;
            }
            if ($.validationEngine.settings.promptPosition == "topLeft") {
                callerTopPosition += -inputHeight - 10;
            }

            if ($.validationEngine.settings.promptPosition == "centerRight") {
                callerleftPosition += callerWidth + 13;
            }

            if ($.validationEngine.settings.promptPosition == "bottomLeft") {
                callerHeight = $(caller).height();
                callerleftPosition = callerleftPosition;
                callerTopPosition = callerTopPosition + callerHeight + 15;
            }
            if ($.validationEngine.settings.promptPosition == "bottomRight") {
                callerHeight = $(caller).height();
                callerleftPosition += callerWidth - 30;
                callerTopPosition += callerHeight + 15;
            }
            $(divFormError).css({
                top: callerTopPosition,
                left: callerleftPosition,
                opacity: 0
            });
            return $(divFormError).animate({ "opacity": 1 }, function () { return true; });
        },
        updatePromptText: function (caller, promptText, type, ajaxed) { // UPDATE TEXT ERROR IF AN ERROR IS ALREADY DISPLAYED

            linkTofield = $.validationEngine.linkTofield(caller);
            var updateThisPrompt = "." + linkTofield;

            if (type == "pass") {
                $(updateThisPrompt).addClass("greenPopup")
            } else {
                $(updateThisPrompt).removeClass("greenPopup")
            }
            ;
            if (type == "load") {
                $(updateThisPrompt).addClass("blackPopup")
            } else {
                $(updateThisPrompt).removeClass("blackPopup")
            }
            ;
            if (ajaxed) {
                $(updateThisPrompt).addClass("ajaxed")
            } else {
                $(updateThisPrompt).removeClass("ajaxed")
            }
            ;

            $(updateThisPrompt).find(".formErrorContent").html(promptText);
            callerTopPosition = $(caller).offset().top;
            inputHeight = $(updateThisPrompt).height();

            if ($.validationEngine.settings.promptPosition == "bottomLeft" || $.validationEngine.settings.promptPosition == "bottomRight") {
                callerHeight = $(caller).height();
                callerTopPosition = callerTopPosition + callerHeight + 15;
            }
            if ($.validationEngine.settings.promptPosition == "centerRight") {
                callerleftPosition += callerWidth + 13;
            }
            if ($.validationEngine.settings.promptPosition == "topLeft" || $.validationEngine.settings.promptPosition == "topRight") {
                callerTopPosition = callerTopPosition - inputHeight - 10;
            }
            $(updateThisPrompt).animate({ top: callerTopPosition });
            //if (type == "pass") {
            //    $(updateThisPrompt).hide(800);
            //}
        },
        linkTofield: function (caller) {
            linkTofield = $(caller).attr("id") + "formError";
            linkTofield = linkTofield.replace(/\[/g, "");
            linkTofield = linkTofield.replace(/\]/g, "");
            return linkTofield;
        },
        closePrompt: function (caller, outside) { // CLOSE PROMPT WHEN ERROR CORRECTED
            if (!$.validationEngine.settings) {
                $.validationEngine.defaultSetting()
            }
            if (outside) {
                $(caller).fadeTo("fast", 0, function () {
                    $(caller).remove();
                });
                return false;
            }
            if (typeof (ajaxValidate) == 'undefined') {
                ajaxValidate = false
            }
            if (!ajaxValidate) {
                linkTofield = $.validationEngine.linkTofield(caller);
                closingPrompt = "." + linkTofield;
                $(closingPrompt).fadeTo("fast", 0, function () {
                    $(closingPrompt).remove();
                });
            }
        },
        debug: function (error) {
            //if (!$("#debugMode")[0]) {
            //    $("body").append("<div id='debugMode'><div class='debugError'><strong>This is a debug mode, you got a problem with your form, it will try to help you, refresh when you think you nailed down the problem</strong></div></div>");
            //}
            //$(".debugError").append("<div class='debugerror'>" + error + "</div>");
        },
        submitValidation: function (caller) { // FORM SUBMIT VALIDATION LOOPING INLINE VALIDATION
            var stopForm = false;
            $.validationEngine.ajaxValid = true;
            $(caller).find(".formError").remove();
            var toValidateSize = $(caller).find("[class*=validate]").size();

            $(caller).find("[class*=validate]").each(function () {
                linkTofield = $.validationEngine.linkTofield(this);

                if (!$("." + linkTofield).hasClass("ajaxed")) { // DO NOT UPDATE ALREADY AJAXED FIELDS (only happen if no normal errors, don't worry)
                    var validationPass = $.validationEngine.loadValidation(this);
                    return (validationPass) ? stopForm = true : "";
                }
                ;
            });

            ajaxErrorLength = $.validationEngine.ajaxValidArray.length; // LOOK IF SOME AJAX IS NOT VALIDATE
            for (x = 0; x < ajaxErrorLength; x++) {
                if ($.validationEngine.ajaxValidArray[x][1] == false) {
                    $.validationEngine.ajaxValid = false;
                }
            }
            if (stopForm || !$.validationEngine.ajaxValid) { // GET IF THERE IS AN ERROR OR NOT FROM THIS VALIDATION FUNCTIONS
                if ($.validationEngine.settings.scroll) {
                    destination = $(".formError:not('.greenPopup'):first").offset().top;
                    $(".formError:not('.greenPopup')").each(function () {
                        testDestination = $(this).offset().top;
                        if (destination > testDestination) {
                            destination = $(this).offset().top;
                        }
                    })
                    $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 1100);
                }
                return true;
            } else {
                return false;
            }
        }
    };
})(jQuery);
/*验证控件结束*/


/*滚动插件，结构为<div><ul><li></li></ul></div>
对ul执行
用法：
    $("#listTextRoll1 > .list").Marquee({ speed: 150 });
    $("#listTextRoll2 > .list").Marquee({ speed: 150, direction: "top" });        */
$.fn.Marquee = function (option) {
    option = $.extend({
        speed: 300, //移动速度  
        direction: "left" //方向，默认右到左 left or top
    }, option);
    //   console.log(option.direction);
    var list = $(this);
    var needMarquee = false;
    switch (option.direction) {
        case "left":
            list.width(5000);  //初始list宽度，防止IE6报错
            var rollW = $(this).parent().width(); ///获取上层父级元素的宽即滚动区域宽度
            var listW = 0; list.find("li").each(function () { listW += $(this).width(); }); ///获取所有li元素的总宽 
            $(this).width(listW * 2); //把本元素的宽设置为所有li宽的和的2倍
            if (listW > rollW) { list.find("li").clone().appendTo(list); needMarquee = true; } //li复制多一倍
            break;
        case "top":
            var rollH = $(this).parent().height(); //获取滚动区域高度
            var listH = $(this).height(); //获取本元素的高度
            if (listH > rollH) { list.clone().attr("class", "").appendTo($(this).parent()); needMarquee = true; } //li复制多一倍 
            break;
    }

    if (needMarquee) { //若需要滚动
        var mstartPoint = 0;
        function rollText() {   ///图像滚动函数。 。。
            var type = "margin-" + option.direction;
            //console.log(option.direction);
            mstartPoint++;
            switch (option.direction) {
                case "left":
                    if (mstartPoint > listW) mstartPoint = mstartPoint - listW;
                    break;
                case "top":
                    if (mstartPoint > listH) mstartPoint = 0;
                    break;
            }

            list.css(type, -mstartPoint);
        }
        var int = setInterval(rollText, option.speed);
        //悬停就停止，移开就启动
        $(this).hover(function () { clearInterval(int); }, function () { int = setInterval(rollText, option.speed); });
        return this;
    }

}

/*焦点图片
测试结构： <div id="focus_box"><ul id="focus_pic" style="left: 0px; top: 0px;">
               <li><a href="#"><img alt="11111" src="" /></a></li>
               <li><a href="#"><img alt="22222" src="" /></a></li>
               <li><a href="#"><img alt="33333" src="" /></a></li>
          </ul></div>
测试用css：

#focus_box { width: 530px; height: 180px; position: relative; margin: 0 auto; overflow: hidden; } 
    #focus_box ul { list-style: none; padding: 0; margin: 0; }
#focus_pic { position: absolute; top: -180px; }
    #focus_pic li { height: 180px; width: 530px; margin: 0; padding: 0; float: left; }
        #focus_pic li img { float: left; border: none; }

.focus_title { height: 35px; line-height: 35px; padding-left: 8px; width: 100%; position: absolute; bottom: 0px; left: 0px; background-color: rgb(153, 153, 153); opacity: 0.5; background-position: initial initial; background-repeat: initial initial; }
.focus_btn { position: absolute; right: 5px; bottom: 5px; z-index: 3; }
    .focus_btn li { float: left; font-size: 12px; width: 25px; height: 25px; line-height: 25px; font-weight: bold; text-align: center; background: #fff; color: #000; margin-right: 2px; cursor: pointer; }
        .focus_btn li.on { background: #f60; color: #fff; }

用法：
$("#focus_pic").Galleria({ direction: "top", speed: 1000, autoTime: 1500, width: 600, height: 200 });       
$("#focus_pic").Galleria({ direction: "left", speed: 1000, autoTime: 1500, width: 600, height: 200 });       */
$.fn.Galleria = function (option) {

    option = $.extend({
        width: 530,
        height: 180,
        btn: "focus_btn",
        title: "focus_title",//标题的ul
        border: 0,//边框宽度
        selectedClass: "on",
        speed: 300, //移动速度
        direction: "top", //方向，默认上到下
        maxnum: 0, //一次额外显示几个对象
        autoTime: 1000//自动播放间隔
    }, option);

    var timer, index = 0;

    var contents = $(this).find("li");
    var liNum = contents.length;//总数量


    var title = $("<div>").attr("class", option.title);
    var btn = $("<ul>").attr("class", option.btn);


    for (var i = 0; i < liNum; i++) btn.append($("<li>").html(i + 1));
    $(this).parent().append(btn);
    $(this).parent().append(title);

    var onceMove = option.border + option.direction == "top" ? contents.eq(0).height() : contents.eq(0).width();//一次移动数量

    var maxTop = (liNum - 1) * onceMove;//TOP移动最大值
    var piccontent = $(this);
    if (option.direction == "left") $(this).width(liNum * onceMove);


    SetTo(index);

    function SetTo(index) {
        $(btn).find("li").eq(index).addClass(option.selectedClass).siblings().removeClass(option.selectedClass);
        $(title).html(contents.eq(index).find("img").attr("alt"));
    }

    function move() {
        index++;
        if (index == liNum - option.maxnum) index = 0;

        option.direction == "top" ?
                 piccontent.stop(true, true).animate({ top: -(index) * onceMove }, option.speed)
              : piccontent.stop(true, true).animate({ left: -(index) * onceMove }, option.speed);
        SetTo(index);
    }


    timer = setInterval(move, option.autoTime);
    $(btn).find("li").mouseover(function () {
        if (timer) {
            clearInterval(timer);
        }
        index = $(btn).find("li").index(this);

        SetTo(index);

        option.direction == "top" ?
            piccontent.stop().animate({ top: "-" + onceMove * index + "px" }, option.speed) :
            piccontent.stop().animate({ left: "-" + onceMove * index + "px" }, option.speed);

    }).mouseleave(function () {
        timer = setInterval(move, option.autoTime);
    });
    contents.mouseover(function () {
        if (timer) {
            clearInterval(timer);
        }
    }).mouseleave(function () {
        timer = setInterval(move, option.autoTime);
    });

    return this;
};

/*给文字加水印
用法：
$("#test").WaterInput("测试文字水印");        */
$.fn.WaterInput = function (text) {
    $(this).focus(function () {
        if ($(this).val() == text) { $(this).val(""); $(this).css("color", "#333"); }
    }).blur(function () {
        if (!$(this).val()) { $(this).val(text); $(this).css("color", "#999"); }
    }).blur();
    return this;
}