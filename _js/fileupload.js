function prettydump(obj) {
  $.each(obj, function(key, value) {
    console.log("Key: " + key + " Value: " + value);
  });
}

$(document).ready(function(){
  var statusContainer = $('.upload-status');
  var progressBar     = $('.progress')

  // Set empty object to contain the cloudinary variables
  // TODO set default vars
  cloudinaryVars = {};

  // Upload UI
  $(function () {
    $('#direct_upload input[type="file"]')
    .cloudinary_fileupload({
      // Frontend file validation
      dropZone: '#direct_upload',
      maxFileSize: 5000000, // 5000000 = 5MB
      minFileSize: 1,
      maxNumberOfFiles: 1,
      acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
      messages : {
          maxNumberOfFiles: 'Only one image at a time, ladies and gents.',
          acceptFileTypes: 'WYD? The file must be a .jpg or .png!',
          maxFileSize: 'This file is too big! Must be less than 5MB',
          minFileSize: 'This file is small!'
        }
    })
    // Show frontend errors on fails
    .on('fileuploadprocessfail', function (e, data) {
        var uploadError = data.files[data.index].error;
        statusContainer.show();
        statusContainer.text(uploadError);
    })
    .on('cloudinaryprogress', function (e, data) {
      statusContainer.hide();
      progressBar.show();
      progressBar.css('width',
        Math.round((data.loaded * 100.0) / data.total) + '%');
    })
    .on('cloudinarydone', function (e, data) {
        $.post(this.form.action, $(this.form).serialize()).always(function (result, status, jqxhr) {
          $('.status_value').text(result.errors ? JSON.stringify(result.errors) : status);
        });

        // TODO separate as own function

        var background = $('#artboard');
        var uploadedBgImg = $.cloudinary.url(data.result.public_id, {
          format: data.result.format, width: 500, height: 660, crop: "fill"
        });
        $(background).css("background-image", "url(" + uploadedBgImg +")");

        progressBar.hide();
        $('#backgroundUploadModal').modal('hide');

        // Set the global vars for parsing through via JS
        cloudinaryVars.backgroundVersion    = data.result.version;
        cloudinaryVars.backgroundID         = data.result.public_id;
        cloudinaryVars.backgroundFileFormat = data.result.format;
        cloudinaryVars.backgroundUploadFlag = true;
        //prettydump(data.result);

    });
  });
});
