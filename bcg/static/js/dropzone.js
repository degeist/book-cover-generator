function prettydump(obj) {
  $.each(obj, function(key, value) {
    console.log("Key: " + key + " Value: " + value);
  });
}

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

      $('.progress').hide();
      $('#backgroundUploadModal').modal('hide');


      prettydump(data.result);

  });
});
