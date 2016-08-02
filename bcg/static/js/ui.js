

$(document).ready(function() {

  // Setting base vars
  var currentCutout = $('img#artboardCutout').attr('src');
  var currentCutoutNumber = '1'; // Default is dp-cutout1.png
  var currentBackgroundNumber = '1'; // Default is bg1.jpg

  // Open the background upload modal
  $('#backgroundUpload').click(function() {
    $('#backgroundUploadModal').modal('show');
  });

  // When selecting pre-made bg in modal, the artboard bg should change
  $('.select-background').click(function() {
    // Parse large image URL from the data-attr
    var chosenImg = $(this).find('img').attr('data-large-img');
    $('#artboard').css('background-image', 'url(' + chosenImg + ')');
    $('#backgroundUploadModal').modal('hide');
    // Set the Cloudinary upload flag to false
    cloudinaryVars.backgroundUploadFlag = false;
    currentBackgroundNumber = $(this).find('img').attr('data-background-number');
    console.log(currentBackgroundNumber);
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

  // When clicking the finish button, forward the user to the final view
  $('#artboard-finish').on('click', function() {
    finishArtboard(currentCutoutNumber,currentBackgroundNumber);
  });

});
