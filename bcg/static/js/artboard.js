// For Cloudinary. Double escape commas in text strings
function commaEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/%2C/g,'%252C');
}

// Get and output artboard variables
function finishArtboard(cutout,background) {
    var text = commaEncodeURIComponent($('p#userCoverTextEditable').text());
    var artboardBackgroundVersion = "";

    // If no BG was uploaded, use different syntax
    if (!cloudinaryVars.backgroundUploadFlag){
      var artboardImageURL = 'bg' + background + '.jpg';
    } else {
      artboardImageURL =  cloudinaryVars.backgroundVersion + '/' + cloudinaryVars.backgroundID + '.' + cloudinaryVars.backgroundFileFormat;
    }

    // Construct URL to parse via the view.html
    var artboardURL = '/artboard/' + artboardImageURL + '/?cutout=dp-cutout' + cutout + '.png&text=' + text;
    //console.log(artboardURL);
    // Send off GET request
    window.location.href=artboardURL;
}
