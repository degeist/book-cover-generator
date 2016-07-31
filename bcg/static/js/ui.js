$(document).ready(function() {


  // Setting base vars
  var currentCutout = $('img#artboardCutout').attr('src');
  var currentCutoutNumber = '1'; // Default is dp-cutout1.png

  // Open the background upload modal
  $('#backgroundUpload').click(function() {
    $('#backgroundUploadModal').modal('show');
  });

  // When selecting pre-made bg in modal, the artboard bg should change
  $('.select-background').click(function() {
    // Parse large image URL from the data-attr
    var chosenImg = $(this).find('img').attr('data-large-img');
    $('#artboard').css("background-image", "url(" + chosenImg +")");
    $('#backgroundUploadModal').modal('hide');
  })

  // Open the cutouts modal & set the current modal
  $('#artboardCutout').click(function() {
    $('#cutoutsSelectorModal').modal('show');

    $('.modal--cutouts-selector__option').each(function() {
        if ($(this).attr("data-large-img") == currentCutout) {
          $(this).addClass("modal--cutouts-selector__option--selected");
        }
      });
    });

  // Selecting another cutout
  $('.modal--cutouts-selector__option').click(function() {
    // Parse large image URL from the data-attr and replace the img on artboard
    var clickedCutout = $(this).attr('data-large-img');
    var clickedCutoutNumber = $(this).attr('data-img-number');

    if (clickedCutout != currentCutout) {
      $('img#artboardCutout').attr('src', clickedCutout);
      $('.modal--cutouts-selector__option--selected').removeClass('modal--cutouts-selector__option--selected');
      // Close modal
      $('#cutoutsSelectorModal').modal('hide');
      // Set new currentCutout
      currentCutout = clickedCutout;
      currentCutoutNumber = clickedCutoutNumber;
    }
  });

  // Inline text edit
  $('#userCoverTextEditable').inlineEdit('click');

  // Hide helper text onclick
  $('.artboard__actionable-item').click(function() {
    $(this).children('.artboard__helper-text').hide('fast');
  });

  // Output variables
  var finishArtboard = function() {
      var cutout = currentCutoutNumber;
      var text = encodeURIComponent($('p#userCoverTextEditable').text());
      var artboardBackgroundVersion = "";

    // Test to see if any BG was uploaded
    if (!cloudinaryVars.backgroundUploaded){
      artboardBackgroundVersion = $('#artboard').css('background-image').replace('url("http://res.cloudinary.com/geist/image/upload/v','').replace('")','');
      console.log(artboardBackgroundVersion);
    } else {
      artboardBackgroundVersion =  cloudinaryVars.backgroundVersion + '/' + cloudinaryVars.backgroundID + '.' + cloudinaryVars.backgroundFileFormat;
    }

    var artboardURL = '/artboard/v' + artboardBackgroundVersion + '/?cutout=dp-cutout' + cutout + '.png&text=' + text;
      //console.log(artboardURL);
      window.location.href=artboardURL;
    }

    $('.finish').click(finishArtboard);

});
