$(document).ready(function() {
  // When selecting pre-made bg in modal, the artboard bg should change
  $('.select-background').click(function() {
    var chosenImg = $(this).find('img').attr('data-large-img');
    $('#artboard').css("background-image", "url(" + chosenImg +")");
    $('#backgroundUploadModal').modal('hide');
  })

  // Inline text edit
  $('#userCoverTextEditable').inlineEdit('click');

});
