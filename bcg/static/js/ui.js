$(document).ready(function() {
  // When selecting pre-made bg in modal, the artboard bg should change
  $('.select-background').click(function() {
    // Parse large image URL from the data-attr
    var chosenImg = $(this).find('img').attr('data-large-img');
    $('#artboard').css("background-image", "url(" + chosenImg +")");
    $('#backgroundUploadModal').modal('hide');
  })

  $('.modal--cutouts-selector__option').click(function() {
    // Parse large image URL from the data-attr
    var chosenCutout = $(this).attr('data-large-img');
    $('img#artboardCutout').attr('src', chosenCutout);
    $('#cutoutsSelectorModal').modal('hide');
  })

  // Inline text edit
  $('#userCoverTextEditable').inlineEdit('click');

});
