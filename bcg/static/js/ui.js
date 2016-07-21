$(document).ready(function() {
  // Setting base vars
  var currentCutout = $('img#artboardCutout').attr('src');

  // Open the background upload modal
  $('#backgroundUpload').click(function() {
    $('#backgroundUploadModal').modal('show');
  });

  // Open the cutouts modal & set the current modal
  $('#artboardCutout').click(function() {
    $('#cutoutsSelectorModal').modal('show');

    $('.modal--cutouts-selector__option').each(function() {
        if ($(this).attr("data-large-img") == currentCutout) {
          $(this).addClass("modal--cutouts-selector__option--selected");
        }
      });
    });

  // When selecting pre-made bg in modal, the artboard bg should change
  $('.select-background').click(function() {
    // Parse large image URL from the data-attr
    var chosenImg = $(this).find('img').attr('data-large-img');
    $('#artboard').css("background-image", "url(" + chosenImg +")");
    $('#backgroundUploadModal').modal('hide');
  })

  // Selecting another cutout
  $('.modal--cutouts-selector__option').click(function() {
    // Parse large image URL from the data-attr and replace the img on artboard
    var clickedCutout = $(this).attr('data-large-img');

    if (clickedCutout != currentCutout) {
      $('img#artboardCutout').attr('src', clickedCutout);
      $('.modal--cutouts-selector__option--selected').removeClass('modal--cutouts-selector__option--selected');
      // Close modal
      $('#cutoutsSelectorModal').modal('hide');
      currentCutout = clickedCutout;
    }
  });

  // Inline text edit
  $('#userCoverTextEditable').inlineEdit('click');

  // Hide helper text onclick
  $('.artboard__actionable-item').click(function() {
    $(this).children('.artboard__helper-text').hide('fast');
  });

  // Output variables

  $('.finish').click(function() {
    var bg = $('#artboard').css("background-image").replace('url(','').replace(')','');
    var cutout = $('img#artboardCutout').attr('src');
    var text = $('p#userCoverTextEditable').text();

    alert("BackgroundURL: " + bg + "\nCutout img: " + cutout + "\nEdited text: " + text);

  });


});
