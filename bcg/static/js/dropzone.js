/*jslint unparam: true */
/*global window, $ */
// $(function () {
//     'use strict';
//     // Change this to the location of your server-side upload handler:
//     var url = 'server/php/';
//     $('#fileupload').fileupload({
//         url: url,
//         dataType: 'json',
//         done: function (e, data) {
//             $.each(data.result.files, function (index, file) {
//                 $('<p/>').text(file.name).appendTo('#files');
//             });
//         },
//         progressall: function (e, data) {
//             var progress = parseInt(data.loaded / data.total * 100, 10);
//             $('#progress .progress-bar').css(
//                 'width',
//                 progress + '%'
//             );
//         }
//     }).prop('disabled', !$.support.fileInput)
//         .parent().addClass($.support.fileInput ? undefined : 'disabled');
// });

$(function () {
  $('#direct_upload input[type="file"]')
  .cloudinary_fileupload({
    dropZone: '#direct_upload',
    start: function () {
      $('.status_value').text('Starting direct upload...');
    },
    progress: function () {
      $('.status_value').text('Uploading...');
    },
  })
  .on('cloudinaryprogress', function (e, data) {
    $('.progress').show();
    $('.progress').css('width',
      Math.round((data.loaded * 100.0) / data.total) + '%');
  })
  .on('cloudinarydone', function (e, data) {
      // $('.status_value').text('Updating backend...');
      $.post(this.form.action, $(this.form).serialize()).always(function (result, status, jqxhr) {
        $('.status_value').text(result.errors ? JSON.stringify(result.errors) : status);
      });

      // TODO separate as own function

      var background = $('#artboard');
      var uploadedBgImg = $.cloudinary.url(data.result.public_id, {
        format: data.result.format, width: 500, height: 660, crop: "fill"
      });
      $(background).css("background-image", "url(" + uploadedBgImg +")");

      $('#backgroundUploadModal').modal('hide');

  });
});
