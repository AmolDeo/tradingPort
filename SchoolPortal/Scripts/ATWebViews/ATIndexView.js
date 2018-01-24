
var loadingPanel;
$(function () {    
    //Laoding panel 
    loadingPanel = $('#loadingPanelContainer').dxLoadPanel({
        shadingColor: "rgba(0,0,0,0.4)",
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        closeOnOutsideClick: false,
    }).dxLoadPanel("instance");

});

$(document).ready(function () {
    try {
        if (typeof jsNavbarName !== 'undefined' && jsNavbarName.length != 0) {
            $('.navbar-main .nav').find('.active').removeClass('active');
            $('.navbar-main .nav').find("." + jsNavbarName).addClass('active');
        }

        if ($('#saveDetailsForm').length > 0)
            $('#saveDetailsForm').areYouSure();
        //UpdateControlHeight();
        //UpdateMenuItemVisibility();
    }
    catch (err) {
        HandleError(err);
    }
});

var extraControlsHeight = 0;
function UpdateControlHeight() {
    try {
        if (typeof jsGridName !== 'undefined') {
            var newHeight = UpdateGridToFullHeight(jsGridName, extraControlsHeight);
            $('#bodyDetailContainer').height(newHeight);
        }
    }
    catch (err) {
        HandleError(err);
    }
}

var selectedKeys = "";
var deleteKeys = "";
var gridInPlace = "";

function PerformATDeleteAction() {
    try {
        if (selectedKeys === null || selectedKeys === "") {
            ShowPopupMessage("Please select a record to delete");
            return;
        }

        if (jsDeleteValidation.length > 0)
            AjaxRequest("GET", jsController, jsDeleteValidation, jsAreaName, { selectedKeyVal: selectedKeys }, true, OnATDeleteValidation, AjaxRequestError);
        else {
            deleteKeys = selectedKeys;
            ShowPopupMessage("Are you sure you want to delete selected record?", "Confirm Delete", 2, ConfirmATDeleteAction);
        }
    }
    catch (err) {
        HandleError(err);
    }
}

function OnATDeleteValidation(DeleteData) {
    try {
        deleteKeys = DeleteData.KeyValuesToDelete;
        if (DeleteData.AllowDeleteAll === true) {
            ShowPopupMessage("Are you sure you want to delete selected record(s)?", "Confirm Delete", 2, ConfirmATDeleteAction);
        }
        else if (DeleteData.PartialDelete === true) {
            ShowPopupMessage(DeleteData.Message, "Confirm Delete", 2, ConfirmATDeleteAction)
        }
        else
            ShowPopupMessage(DeleteData.Message, "Delete", 1);
    }
    catch (err) {
        HandleError(err);
    }
}

function ConfirmATDeleteAction() {
    try {
        if (deleteKeys === null)
            return;
        AjaxRequest("POST", jsController, jsDeleteAction, jsAreaName,
            {
                selectedKeyVal: deleteKeys, __RequestVerificationToken: $('[name=__RequestVerificationToken]').val()
            },
            true, OnATDeleteSuccess, AjaxRequestError);
    }
    catch (err) {
        HandleError(err);
    }
}

function OnATDeleteSuccess(result) {
    try {
       var instanceName = $('#GridDivName').val();
        var dataGrid = $('#' + instanceName).dxDataGrid('instance');
        if (dataGrid) {
            dataGrid.option('editing.texts.confirmDeleteMessage', jsConfirmDeleteMessage);
            var keys = deleteKeys.split(",");  //dataGrid.getSelectedRowKeys();
            var dataSource = dataGrid.option('dataSource').store._array;
            for (var i = 0; i < keys.length; i++) {
                var rowIndex = dataGrid.getRowIndexByKey(keys[i]);
                dataSource.splice(rowIndex - i, 1 );               
            }

            dataGrid.option('dataSource.store._array', dataSource);
        }

        selectedKeys = "";
    }
    catch (err) {
        HandleError(err);
    }
}

function OnSaveSuccess(response) {
    try {
        HideNotifications();
        if (response.Redirect) {
            window.location.href = response.Redirect;
        }
        else if (response.Redirect == "") {
            window.location.reload();
        }
        else if (response.Success || response == "Success") {
            //$("#lblATIndexSuccess").html("Your changes are saved successfully.")
            ShowPopupMessage("Your changes are saved successfully.", "Success", 1);
            setTimeout(HideNotifications, 3000);
        }
        else {
            //$("#lblATIndexError").html(response.ErrorMessage);
            ShowPopupMessage(response.ErrorMessage, "Error");
        }
    }
    catch (err) {
        hideLoadingPanel();
        HidePopupMessage();
        HandleError(err);
    }
}

function HideNotifications() {
    try {
        hideLoadingPanel();
        $("#lblATIndexSuccess").html("");
        $("#lblATIndexError").html("");
    }
    catch (err) {
        HandleError(err);
    }
}

var selected = "";
function OnMenuItemClick(menuName)
{
    try {
        var instanceName = $('#GridDivName').val();
        var dataGrid = $('#' + instanceName).dxDataGrid('instance');
        if (dataGrid) {
            selected = "";
            var keys = dataGrid.getSelectedRowKeys();
            for (var i = 0; i < keys.length; i++) {
                if (selected)
                    selected += ",";
                selected += keys[i];
            }
        }

        if (menuName === 'btnNew') {
            window.location.href = "/" + jsController + "/" + jsNewAction;;
        }
        else if (menuName === 'btnDetails') {

            if (selected === null || selected === "") {
                ShowPopupMessage("Please select a record to view", "Details");
                return;
            }

            var selectionArr = selected.split(",");
            if (selectionArr.length > 1) {
                ShowPopupMessage("Please select only one record to view", "Details");
                return;
            }

            window.location.href = "/" + jsController + "/" + jsDetailsAction + "?Id=" + selected;
        }
        else if (menuName === "btnDelete") {
            if (selected === null || selected === "") {
                ShowPopupMessage("Please select a record to delete", "Delete");
                return;               
            }

            if (jsDeleteValidation.length > 0)
                AjaxRequest("GET", jsController, jsDeleteValidation, jsAreaName, { selectedKeyVal: selected }, true, OnATDeleteValidation, AjaxRequestError);
            else {
                deleteKeys = selected;
                ShowPopupMessage("Are you sure you want to delete selected record(s)?", "Confirm Delete", 2, ConfirmATDeleteAction);
            }
        }
        else if (menuName === "btnBack") {
            window.location.href = "/" + jsController + "/Index";
            //window.history.back();
        }
        else if (menuName === "btnRefresh") {
            location.reload();
        }
        else {
            PerformOnMenuItemClick(menuName);
        }
    }
    catch (err)
    {
        HandleError(err);
    }
}

function showLoadingPanel(message,divId) {
    if (loadingPanel) {
        if (divId != null && divId != undefined && divId != "")
        {
            var divName = '#' + divId;
            loadingPanel._options.position = { of: divName };
        }

        if (message != null && message != undefined && message != "")
            loadingPanel.option("message", message);
        else
            loadingPanel.option("message", "Loading....");

        loadingPanel.show();
    }
}

function showSavingPanel() {
    showLoadingPanel("Saving your changes...");
}

function hideLoadingPanel() {
    try {
    if (loadingPanel)
    {
        loadingPanel.hide();
        loadingPanel._options.position = { at: "center", my: "center" };
        }   
    }
    catch (err) {
        HandleError(err);
    }
}
