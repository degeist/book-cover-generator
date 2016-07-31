// Licensed under the MIT License.
// Copyright 2015 Sukohi Kuhoh
// MODIFIED

;(function($) {

    $.fn.inlineEdit = function(event, options, callback) {

      var maxLength       = 40;
      var wordCounter     = $('.artboard__subtitle__word-counter');
      var paragraphClass  = $('.inline-text-edit');

        if(typeof(options) == 'function') {

            callback = options;
            options = {};

        }

        if(options == undefined) {

            options = {};

        }

        var IE = {
            inputClass: 'inline-edit-input',
            statusName: 'inline-edit-status',
            show: function(target){

                if(!IE.isShowing(target)) {

                    IE.setStatus(target, 1);
                    var text = $(target).text();
                    $(target).data('original-text', text)
                        .html(IE.inputTag(text, options));
                    // Remove padding, so box does not "pop"
                    paragraphClass
                      .css('padding', '0');

                   // Reveal word counter and set maxLength
                   $('#chars').text(maxLength);
                   wordCounter.show();
                   var length = maxLength;

                    IE.inputChild(target)
                        .focus()
                        .val("") // Clear the text field
                        .keyup(function() {
                          var length = $(this).val().length;
                          var length = maxLength-length;
                          $('#chars').text(length);
                        })
                        .on('blur keypress', function(e){

                            if(e.type == 'blur' || (e.type == 'keypress' && e.keyCode == 13)) {

                                IE.hide(e, target);

                                // Hide and reset counter
                                wordCounter.hide();
                                $('#chars').text(length);
                            }

                        });

                }

            },
            hide: function(e, target){

                if(IE.isShowing(target)) {

                    IE.setStatus(target, 0);
                    var text = IE.inputChild(target).val();
                    var originalText = $(target).data('original-text');

                    if(text == '') {

                        text = originalText;

                    }

                    $(target).text(text);

                    if(typeof(callback) == 'function') {

                        callback(text, originalText, $(target));

                    }
                    // Re-add shadow padding to text field on hide
                    paragraphClass.css('padding', '1px');


                }

            },
            inputChild: function(target){

                return $(target).find('.'+ IE.inputClass);

            },
            isShowing: function(target){

                return (IE.getStatus(target) == 1);

            },
            getStatus: function(target){

                return $(target).data(IE.statusName);

            },
            setStatus: function(target, status){

                $(target).data(IE.statusName, status);

            },
            inputTag: function(text, options){

                var type = options['type'];
                var attribute = '';
                var inputClass = IE.inputClass;

                if(typeof(options['attributes']) == 'object') {

                    $.each(options['attributes'], function(key, value){

                        if(key == 'class') {

                            inputClass += ' '+ value;

                        } else {

                            attribute += ' '+ key +'='+ value;

                        }

                    });

                }

                return '<textarea class="'+ inputClass +'" type="text"'+ attribute +' maxlength="' + maxLength + '">'+ text +'</textarea>';
            }

        };

        $.each(this, function(key, target){

            $(target).data(IE.statusName, 0)
                .on(event, function(e){

                    IE.show(target);

                });

        });

    }

})(jQuery);
