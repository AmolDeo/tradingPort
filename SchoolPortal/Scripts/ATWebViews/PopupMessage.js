function ShowPopupMessage(message, header, popupMessageMode, okCallback, cancelCallBack) {
    if (header == undefined || header == "" || header == null) {
        header = "clientPort";
    }

    if (header.toLowerCase() == "error" && message.indexOf("ModelValidationError") > -1) {
        var validationError = "<b>Following validation error(s) occured, please fix them and try again:</b><br/>";
        message = message.replace("ModelValidationError", "");
        message = validationError + "<br>" + message;
        header = "Validation Error(s)";
    }
    else
        message = message.replace("ModelValidationError", "");

    var height = 170;
    var width = 450;
    var messageLength = message.length;
    if (messageLength > 60) {
        height += (messageLength / 60) * 10;
        width = 550;
    }

    var count = message.split('<br>').length;
    if (count > 1)
        height += (count - 1) * 10;

    $("#popupMessageContainer").dxPopup({
        visible: true,
        showTitle: true,
        width: width,
        height: height,
        maxHeight: height,
        minHeight: height,
        title: header, 
        contentTemplate: $("<div>" + message + "</div>"),
        buttons: [
              {
                  toolbar: 'bottom', location: 'after', widget: 'button', options: {
                      text: 'OK',
                      onClick: function (e) {
                          $("#popupMessageContainer").dxPopup("instance").hide();
                          if (okCallback)
                              okCallback();
                      }
                  }
              },
              {
                  toolbar: 'bottom', location: 'after', widget: 'button', options: {
                      text: 'Cancel',
                      visible: !(!popupMessageMode || popupMessageMode === 1),
                      onClick: function () {
                          $("#popupMessageContainer").dxPopup("instance").hide();
                          if (cancelCallBack)
                              cancelCallBack();
                      }
                  }
              }
        ],
    });
}

function HidePopupMessage() {
    var popup = $("#popupMessageContainer").dxPopup("instance");
    if (popup)
        popup.hide();
}
