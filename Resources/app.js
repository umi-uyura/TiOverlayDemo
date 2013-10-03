var win = Titanium.UI.createWindow({
    backgroundColor:'aqua'
});

win.orientationModes = [Titanium.UI.LANDSCAPE_LEFT];

var imageOverlay = Titanium.UI.createImageView({
	image: "overlay.png",
	top: 0,
	left: 0
});

var overlayview = Titanium.UI.createView();
overlayview.add(imageOverlay);

overlayview.addEventListener('singletap', function(e)
{
 	Titanium.Media.takePicture();
});

Titanium.Media.showCamera({
	success: function(event) {
		Titanium.API.info("TiOverlayDemo - Camera success!");

		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'photo.jpg');
		f.write(event.media);

		Titanium.API.debug("TiOverlayDemo - Camera success!");

		var imageview = Titanium.UI.createImageView({
			width: win.width,
			height: win.height,
			top: 0,
			left: 0,
			image: f.nativePath
		});

		var imageOverlay2 = Titanium.UI.createImageView({
			image: "overlay.png",
			top: 0,
			left: 0
		});

		win.add(imageview);
		win.add(imageOverlay2);

    if ("iphone" === Ti.Platform.osname || "ipad" === Ti.Platform.osname) {
		  Titanium.API.hideCamera();
    }
	},
	cancel: function() {
		alert("TiOverlayDemo - Camera cancel!");
	},
	error: function(error) {
		Titanium.API.error("TiOverlayDemo - Camera error!" + error);
		alert("TiOverlayDemo - Camera error!" + error);
	},
	overlay: overlayview,
	showControls: true,
	mediaTypes: Titanium.Media.MEDIA_TYPE_PHOTO,
	autohide: false,
	saveToPhotoGallery: false
});

win.open();
