function OnClick(s, e) {
    at_uploadControl.Upload();
}

function at_uploadControl_Upload() {

    if (at_uploadControl.GetText() != '')
        at_uploadControl.Upload();
}

function uc_OnTextChanged() {

    at_uploadControl.Upload();
}

function OnFileUploadComplete(s, e) {
    if (e.callbackData != "") {
        document.getElementById('LogoImage').value = e.callbackData;
        var image = new Image();
        image.src = 'data:image/png;base64,' + e.callbackData + '';
        document.getElementById("binaryImage1").src = 'data:image/png;base64,' + e.callbackData + '';
    }
}