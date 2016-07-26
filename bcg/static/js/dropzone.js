function prettydump(obj) {
  $.each(obj, function(key, value) {
    console.log("Key: " + key + " Value: " + value);
  });
}

// Set empty object to contain the cloudinary variables
// TODO set default vars
cloudinaryVars = {};

// Set basics

$(function () {
  $('#direct_upload input[type="file"]')
  .cloudinary_fileupload({
    dropZone: '#direct_upload',
    start: function () {
      console.log('Starting direct upload...');
    },
    progress: function () {
      console.log('Uploading...');
    },
  })
  .on('cloudinaryprogress', function (e, data) {
    $('.progress').show();
    $('.progress').css('width',
      Math.round((data.loaded * 100.0) / data.total) + '%');
  })
  .on('cloudinarydone', function (e, data) {
      console.log('Updating backend...');
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

      // Set the global vars for parsing through via JS
      cloudinaryVars.backgroundVersion    = data.result.version;
      cloudinaryVars.backgroundID         = data.result.public_id;
      cloudinaryVars.backgroundFileFormat = data.result.format;

      //prettydump(data.result);

  });
});
