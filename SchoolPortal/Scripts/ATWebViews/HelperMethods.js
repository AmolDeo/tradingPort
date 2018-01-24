function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

function OnInitializedWCC(s, e) {
    try {
        if (s.component.series.length > 0) {
            var cnt = s.component.series[0]._drawnPoints.length;
            for (var i = 0; i < cnt; i++) {
                var percent = s.component.series[0]._drawnPoints[i].percent * 100;
                //to hide points those are less than 0.01 for all piecharts
                if (percent < 0.01)
                    s.component.series[0]._drawnPoints[i].hide();
            }
        }
        var elementId = this._$element[0].id;
        var chartName = "#" + elementId;
        var pieChartName = "#" + elementId + "Pie";
        var divChartType = elementId + "ChartType";

        var showBar = true;
        if (document.getElementById(divChartType) != null)
            if (document.getElementById(divChartType).value == "pie") {
                showBar = false;
            }
        var ctrlName = elementId;
        if (elementId.slice(-3) == "Pie") {
            ctrlName = elementId.slice(0, -3);
        }

        var divIdBar = ctrlName + "BarDiv";
        var divIdPie = ctrlName + "PieDiv";

        if (showBar) {
            if (document.getElementById(divIdBar) != null) {
                document.getElementById(divIdBar).hidden = false;
            }
            if (document.getElementById(divIdPie) != null) {
                document.getElementById(divIdPie).hidden = true;
            }
        }
        else {
            if (document.getElementById(divIdBar) != null) {
                document.getElementById(divIdBar).hidden = true;
            }
            if (document.getElementById(divIdPie) != null) {
                document.getElementById(divIdPie).hidden = false;
            }

        }
        setTimeout(function () {
            var Pinst = $(pieChartName).dxPieChart("instance");
            if (Pinst != null)
                Pinst.render();
            var NPinst = $(chartName).dxChart("instance");
            if (NPinst != null)
                NPinst.render();
        }, 500);
    } catch (err) {
        HandleError(err);
    }
}

function onDefaultCustomizeColumns(e) {
    try {
    } catch (err) {
        HandleError(err);
    }
}

function AjaxRequest(requestType, controller, action, area, data, showLoadingMsg, successCallback, errorCallback, completeCallback, displayErrorAlert) {
    displayErrorAlert = typeof displayErrorAlert !== 'undefined' ? displayErrorAlert : false;
    var url = "/" + controller + "/" + action + "/";
    if (area)
        url = "/" + area + url;
    $.ajax({
        type: requestType,
        url: url,
        data: data,
        beforeSend: function () {
            if (showLoadingMsg) {
                if (action.toLowerCase().indexOf("save") >= 0)
                    showSavingPanel();
                else
                    showLoadingPanel();
            }
        }
    }).done(function (data, textStatus, jqXHR) {
        if (CheckForTimeout(jqXHR)) {
            if (data.Success === false) {
                if (data.ErrorTitle == "Automatic Log Out")
                    ShowPopupMessage(data.ErrorMessage, data.ErrorTitle, 1, onOkCallback);
                else
                    ShowPopupMessage(data.ErrorMessage, data.ErrorTitle);
            }
            else if (typeof successCallback !== 'undefined')
                successCallback(data, textStatus, jqXHR);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (displayErrorAlert)
            alert("Status: " + jqXHR.status + "\nError: " + errorThrown);

        if (typeof errorCallback !== 'undefined')
            errorCallback(jqXHR, textStatus, errorThrown);
    }).always(function (data, textStatus, jqXHR) {
        if (showLoadingMsg)
            hideLoadingPanel();

        if (typeof completeCallback !== 'undefined')
            completeCallback(data, textStatus, jqXHR);
    });
}

function CheckForTimeout(jqXHR) {
    try {
        if (jqXHR.getResponseHeader("X-Responded-JSON") != null) {
            var jsonResponse = JSON.parse(jqXHR.getResponseHeader("X-Responded-JSON"));
            if (jsonResponse.status == "401") {
                window.location.href = "/Account/Login";
                return false;
            }
        }

        return true;
    }
    catch (err) {
        HandleError(err);
    }
}

function HandleError(err) {
    alert("Error : " + err.message);
}

function AjaxRequestError(jqXHR, textStatus, errorThrown) {
    try {
        ShowPopupMessage("Error !!\n" + "Status: " + jqXHR.status + "\nError: " + errorThrown + "\nText Status: " + textStatus);
    }
    catch (err) {
        HandleError(err);
    }
}

function InsertAndShowPopup(containerName, popupControlName, popupFormName, response) {
    try {
        $("#" + containerName).html(response);

        // Enable unobtrusive validation for newly inserted content
        if (popupFormName)
            $.validator.unobtrusive.parse($("#" + popupFormName));

    }
    catch (err) {
        HandleError(err);
    }
}

function AdjustPopupSize(popupWindow) {
    try {
        if (popupWindow && popupWindow.IsVisible()) {
            var available = window.innerWidth - 50;
            popupWindow.SetWidth(available);
            popupWindow.UpdatePosition();
        }
    }
    catch (err) {
        HandleError(err);
    }
}

function RefreshGridContents(gridName) {
    try {
        var gridInstance = MVCxClientGridView.Cast(gridName);
        gridInstance.Refresh();
    }
    catch (err) {
        HandleError(err);
    }
}

function GetAvailableHeight() {
    try {
        var containerHeight = ASPxClientUtils.GetDocumentClientHeight();

        if (document.body.scrollHeight > containerHeight)
            containerHeight = document.body.scrollHeight;

        var newHeight = containerHeight - 60;
        newHeight = document.documentElement.clientHeight;

        if ($(".content-header").length)
            newHeight = newHeight - 45;
        if ($(".navbar-static-top").length)
            newHeight = newHeight - 70;
        if ($(".main-footer").length)
            newHeight = newHeight - 70;
        //if ($(".breadcrumb").length)
        //    newHeight = newHeight - 30;

        return newHeight;
    }
    catch (err) {
        HandleError(err);
    }
}

function UpdateGridToFullHeight(gridName, extraHeight) {
    try {
        var newHeight = GetAvailableHeight();
        var gridInstance = MVCxClientGridView.Cast(gridName);
        if (gridInstance) {
            gridInstance.SetHeight(newHeight - extraHeight);
        }

        return newHeight;
    }
    catch (err) {
        HandleError(err);
    }
}

//Document editor help methods
function SetFontSize(size) {
    try {
        var selection = htmlDocumentEditor.GetSelection();
        var selectedElements = selection.GetElements();
        if (GetPxFontSize(selectedElements, selection) == size)
            return;

        var doc = selection.GetSelectedElement().ownerDocument;
        for (var i = 0; i < selectedElements.length; i++) {
            var curElement = selectedElements[i];
            if (curElement.nodeType == 3) {
                var wrapper = doc.createElement("SPAN");
                wrapper.style.fontSize = size;
                curElement.parentNode.insertBefore(wrapper, curElement);
                wrapper.appendChild(curElement);
            }
            else if (curElement.childNodes.length > 0)
                curElement.style.fontSize = size;
        }
    }
    catch (err) {
        HandleError(err);
    }
}

function GetPxFontSize(selectedElements, selection) {
    var size = "";
    if (selectedElements.length > 0) {
        size = GetElementPxFontSize(selectedElements[0]);
        for (var i = 1; i < selectedElements.length; i++)
            size = GetElementPxFontSize(selectedElements[i]) == size ? size : "";
    }
    else {
        var selectedElement = selection.GetSelectedElement();
        if (selectedElement)
            size = GetElementPxFontSize(selectedElement);

    }
    return size;
}

function GetElementPxFontSize(element) {
    var size = GetCurrentStyle(element.nodeType == 3 ? element.parentNode : element).fontSize;
    return size.indexOf("px") != -1 ? size : "";
}

function GetCurrentStyle(element) {
    return ASPxClientUtils.ie ? element.currentStyle : element.ownerDocument.defaultView.getComputedStyle(element, null);
}

function GetCommaSeparatedValues(values) {
    try {
        var csv = "";
        for (var i = 0; i < values.length; i++) {
            if (csv)
                csv += ",";
            csv += values[i];
        }

        return csv;
    }
    catch (err) {
        HandleError(err);
    }
}

function OnCallbackError(s, e) {
    try {
        if (e.message == "") {
            e.handled = true;
            return;
        }
        var msg = e.message;
        var arrOperationResult = e.message.split(',"');
        if (arrOperationResult.length >= 2) {
            var errorMsg = arrOperationResult[2];
            if (errorMsg.search('ErrorMessage":"') != -1) {
                var arrMsg = arrOperationResult[2].split(":");
                msg = arrMsg[1];
            }
        }
        msg = msg.substring(1, msg.length - 1);
        e.handled = true;
        ShowPopupMessage(msg);
    } catch (err) {
        HandleError(err);
    }
}

function onDefaultRowSelectionChanged(selectedItems) {
    // default function for atgrid 
}

function onDefaultCellClick(s, e) {
    // default function for atgrid 
}

function OnDropDownFocusIn(e) {

}

function LookupButtonClick(s, e) {
    try {
        //var row = s.gridView.GetFocusedRowIndex();
        //if (row == -1)
        //    return;
        //var key = s.gridView.GetRowKey(row);
        //s.gridView.UnselectRowsByKey(key);
        //s.Clear();
        //Invoke lookup value changed event
        //window[s.name + "ValueChanged"](s, e);

    } catch (err) {
        HandleError(err)
    }
}

var GlobalChartType = "doughnut";
function currentSlide1(n, spnName, controlId) {
    var type = "";
    var Ivalue = null;
     var barhdnName = null;
    var piehdnName = null;
    if (spnName != null && controlId == null)
    {
        var spn = spnName.id;
        var Id = spn.slice(0, -4);
        Ivalue = "#" + spn.slice(0, -4);
        barhdnName = Id + "BarDiv";
        piehdnName = Id + "PieDiv";
    }
    else
    {
         Ivalue = "#" + controlId;
         barhdnName = controlId + "BarDiv";
         piehdnName = controlId + "PieDiv";
    }
    
    try {
        switch (n) {
            case 1:
                type = "Bar";
                $(Ivalue + 'spn1').removeClass('dot');
                $(Ivalue + 'spn1').addClass('reddot');
                $(Ivalue + 'spn2').removeClass('reddot');
                $(Ivalue + 'spn2').addClass('dot');
                $(Ivalue + 'spn3').removeClass('reddot');
                $(Ivalue + 'spn3').addClass('dot');

                var a = $(Ivalue).dxChart("instance");
                a._options.commonSeriesSettings.type = "Bar";
                if (a.seriesFamilies.length > 0)
                    a.seriesFamilies[0]._options.type = "Bar";
                if (a.series.length > 0)
                    a.series[0].type = "Bar";
                if (a._options.series)
                    if (a._options.series.length > 0)
                        a._options.series[0].type = "Bar";
                a.option("commonSeriesSettings.type", "bar");
                a.render();

                document.getElementById(barhdnName).hidden = false;
                document.getElementById(piehdnName).hidden = true;
                var b = $(Ivalue).dxChart("instance");
                b.option("commonSeriesSettings.type", "bar");
                b.render();

                GlobalChartType = "bar";
                break;
            case 2:
                //type = "Line";
                //$(Ivalue + 'spn1').removeClass('reddot');
                //$(Ivalue + 'spn1').addClass('dot');
                //$(Ivalue + 'spn2').removeClass('dot');
                //$(Ivalue + 'spn2').addClass('reddot');
                //$(Ivalue + 'spn3').removeClass('reddot');
                //$(Ivalue + 'spn3').addClass('dot');

                //var c = $(Ivalue).dxChart("instance");
                //c._options.commonSeriesSettings.type = "Line";
                //c.seriesFamilies[0]._options.type = "Line";
                //c.series[0].type = "Line";
                //c._options.series[0].type = "Line";
                //c.option("commonSeriesSettings.type", "line");
                //c.render();

                //document.getElementById(barhdnName).hidden = false;
                //document.getElementById(piehdnName).hidden = true;
                //var d = $(Ivalue).dxChart("instance");
                //d.option("commonSeriesSettings.type", "line");
                //d.render();
                    //break;
               if (spnName != null && controlId == null)
                    currentSlide1(1, spnName);
              else
                    currentSlide1(1, null, controlId);

                type = "Doughnut";
                $(Ivalue + 'spn1').removeClass('reddot');
                $(Ivalue + 'spn1').addClass('dot');
                $(Ivalue + 'spn2').removeClass('dot');
                $(Ivalue + 'spn2').addClass('reddot');
                $(Ivalue + 'spn3').removeClass('reddot');
                $(Ivalue + 'spn3').addClass('dot');

                var pieChartName = Ivalue + "Pie";
                var c = $(pieChartName).dxPieChart("instance");
                c._options.type = "doughnut";
                c.series[0].type = "doughnut";
                c.series[0]._options.type = "doughnut";
                c.series[0].innerRadius = 0.5;
                c.render();

                document.getElementById(barhdnName).hidden = true;
                document.getElementById(piehdnName).hidden = false;

                var d = $(pieChartName).dxPieChart("instance");
                d._options.type = "doughnut";
                d.series[0].type = "doughnut";
                d.series[0]._options.type = "doughnut";
                d.series[0].innerRadius = 0.5;
                d.render();

                GlobalChartType = "doughnut";
                break;
            case 3:
                if (spnName != null && controlId == null)
                    currentSlide1(1, spnName);
                else
                    currentSlide1(1, null, controlId);

                type = "Pie";
                $(Ivalue + 'spn1').removeClass('reddot');
                $(Ivalue + 'spn1').addClass('dot');
                $(Ivalue + 'spn2').removeClass('reddot');
                $(Ivalue + 'spn2').addClass('dot');
                $(Ivalue + 'spn3').removeClass('dot');
                $(Ivalue + 'spn3').addClass('reddot');

                var pieChartName = Ivalue + "Pie";
                var e = $(pieChartName).dxPieChart("instance");
                e._options.type = "pie";
                e.series[0].type = "pie";
                e.series[0]._options.type = "pie";
                e.render();

                document.getElementById(barhdnName).hidden = true;
                document.getElementById(piehdnName).hidden = false;

                var f = $(pieChartName).dxPieChart("instance");
                f._options.type = "pie";
                f.series[0].type = "pie";
                f.series[0]._options.type = "pie";
                f.render();

                GlobalChartType = "pie";
                break;
            default:
        }
    }
    catch (err) {
        HandleError(err);
    }
}

function onOkCallback(Sucess) {
    try {
        window.location.reload();
    }
    catch (err) {
        HandleError(err);
    }
}


function onHamBClick() {
    try {
        setTimeout(function () {
            var dd = $("#StatePortfolioActivity").dxDataGrid("instance");
            if (dd != null) {
                //dd.render();
                dd.columnOption('Date', 'sortOrder', 'asc');
                dd.clearSorting();
            }
            var ee = $("#StateAccountSummary").dxDataGrid("instance");
            if (ee != null) {
                //ee.render();
                ee.columnOption('AccountName', 'sortOrder', 'asc');
                ee.clearSorting();
            }
            var a = $("#StateAccountsPiechartPie").dxPieChart("instance");
            if (a != null)
                a.render();
            var b = $("#PortMainAccountsChartPie").dxPieChart("instance");
            if (b != null)
                b.render();
            var c = $("#PortMainAccountsNestedChart1Pie").dxPieChart("instance");
            if (c != null)
                c.render();
            var d = $("#PortMainAccountsNestedChart2Pie").dxPieChart("instance");
            if (d != null)
                d.render();
            var e = $("#PortMainMarketValueChartPie").dxPieChart("instance");
            if (e != null)
                e.render();
            var f = $("#PortMainMarketValueNestedChart1Pie").dxPieChart("instance");
            if (f != null)
                f.render();
            var g = $("#PortMainCashAvailableChartPie").dxPieChart("instance");
            if (g != null)
                g.render();
            var h = $("#PortMainCashAvailableNestedChart2Pie").dxPieChart("instance");
            if (h != null)
                h.render();
            var i = $("#DashSecurityPiechartPie").dxPieChart("instance");
            if (i != null)
                i.render();
            var i = $("#DashForeignExposurePiechartPie").dxPieChart("instance");
            if (i != null)
                i.render();
            var i = $("#DashAssetClassPerformancePiechart").dxChart("instance");
            if (i != null)
                i.render();
            var j = $("#DashSectorPiechartPie").dxPieChart("instance");
            if (j != null)
                j.render();
            var aa = $("#PortActChart").dxChart("instance");
            if (aa != null)
                aa.render();
            var bb = $("#AllocationStackedBarChart").dxChart("instance");
            if (bb != null)
                bb.render();
            var cc = $("#AccStBarChart").dxChart("instance");
            if (cc != null)
                cc.render();
            var HMVC = $("#HMVChart").dxChart("instance");
            if (HMVC != null)
                HMVC.render();
            var DAC = $("#DashActivityChart").dxChart("instance");
            if (DAC != null)
                DAC.render();
            var PARC = $("#line-chart").dxChart("instance");
            if (PARC != null)
                PARC.render();
        }, 300);
    }
    catch (err) {
        HandleError(err);
    }
}

function setControl() {
    setTimeout(function () {
        var dd = $("#StatePortfolioActivity").dxDataGrid("instance");
        if (dd != null) {
            //dd.render();
            dd.columnOption('Date', 'sortOrder', 'asc');
            dd.clearSorting();
        }
        var ee = $("#StateAccountSummary").dxDataGrid("instance");
        if (ee != null) {
            //ee.render();
            ee.columnOption('AccountName', 'sortOrder', 'asc');
            ee.clearSorting();
        }
        var a = $("#StateAccountsPiechartPie").dxPieChart("instance");
        if (a != null)
            a.render();
        var b = $("#PortMainAccountsChartPie").dxPieChart("instance");
        if (b != null)
            b.render();
        var c = $("#PortMainAccountsNestedChart1Pie").dxPieChart("instance");
        if (c != null)
            c.render();
        var d = $("#PortMainAccountsNestedChart2Pie").dxPieChart("instance");
        if (d != null)
            d.render();
        var e = $("#PortMainMarketValueChartPie").dxPieChart("instance");
        if (e != null)
            e.render();
        var f = $("#PortMainMarketValueNestedChart1Pie").dxPieChart("instance");
        if (f != null)
            f.render();
        var g = $("#PortMainCashAvailableChartPie").dxPieChart("instance");
        if (g != null)
            g.render();
        var h = $("#PortMainCashAvailableNestedChart2Pie").dxPieChart("instance");
        if (h != null)
            h.render();
        var i = $("#DashSecurityPiechartPie").dxPieChart("instance");
        if (i != null)
            i.render();
        var i = $("#DashForeignExposurePiechartPie").dxPieChart("instance");
        if (i != null)
            i.render();
        var i = $("#DashAssetClassPerformancePiechart").dxPieChart("instance");
        if (i != null)
            i.render();
        var j = $("#DashSectorPiechartPie").dxPieChart("instance");
        if (j != null)
            j.render();
        var aa = $("#PortActChart").dxChart("instance");
        if (aa != null)
            aa.render();
        var bb = $("#AllocationStackedBarChart").dxChart("instance");
        if (bb != null)
            bb.render();
        var cc = $("#AccStBarChart").dxChart("instance");
        if (cc != null)
            cc.render();
        var HMVC = $("#HMVChart").dxChart("instance");
        if (HMVC != null)
            HMVC.render();
        var DAC = $("#DashActivityChart").dxChart("instance");
        if (DAC != null)
            DAC.render();
        var PARC = $("#line-chart").dxChart("instance");
        if (PARC != null)
            PARC.render();
    }, 300);
}


function LogOff() {
    try {
        AjaxRequest("POST", "Account", "LogOff", "", { __RequestVerificationToken: $('[name=__RequestVerificationToken]').val() }, true, OnLogOffSuccess, AjaxRequestError);
    } catch (err) {
        HandleError(err);
    }
}

function OnLogOffSuccess() {
    try {
        window.location.href = "/Account/Login";
    } catch (err) {
        HandleError(err);
    }
}

$(window).resize(function () {
    try {
        $('.content-wrapper').css('padding-top', parseInt($('nav').css("height")) + 10);
        $('.content-wrapper').css('padding-bottom', parseInt($('footer').css("height")) + 10);
        var containerWidth = ASPxClientUtils.GetDocumentClientWidth();
        if (containerWidth < 590) {
            if ($('#topNavbarLogoAnchorDiv')) {
                $('#topNavbarLogoAnchorDiv').removeClass('pull-left').addClass('text-center');
                $('#topNavbarLogoAnchorDiv').removeClass('col-xs-6').addClass('col-xs-12');
                $('#topNavbarLogoAnchorDiv').css('padding-left', "unset");
                $('#topNavbarLogoAnchorDiv').css('background-color', "#367FA9");
                $('#topNavbarLogoAnchorDiv').css('height', "50px");
            }
            if ($('#topNavbarMainMenuDiv')) {
                $('#topNavbarMainMenuDiv').removeClass('col-xs-6').addClass('col-xs-12');
                $('#topNavbarMainMenuDiv').css('padding-left', "0px");
                $('#topNavbarMainMenuDiv').css('padding-right', "0px");
            }
        }
        else {
            if ($('#topNavbarLogoAnchorDiv')) {
                $('#topNavbarLogoAnchorDiv').removeClass('text-center').addClass('pull-left');
                $('#topNavbarLogoAnchorDiv').removeClass('col-xs-12').addClass('col-xs-6');
                $('#topNavbarLogoAnchorDiv').css('padding-left', "20px");
                $('#topNavbarLogoAnchorDiv').css('background-color', "#3C8DBC");
                $('#topNavbarLogoAnchorDiv').css('height', "unset");
            }
            if ($('#topNavbarMainMenuDiv')) {
                $('#topNavbarMainMenuDiv').removeClass('col-xs-12').addClass('col-xs-6');
                $('#topNavbarMainMenuDiv').css('padding-left', "unset");
                $('#topNavbarMainMenuDiv').css('padding-right', "unset");
            }
        }

        if ($('#topNavbarMainMenuDiv').hasClass('col-xs-12'))
            $('#topNavbarHamIconUL').addClass('pull-left');
        else
            $('#topNavbarHamIconUL').removeClass('pull-left');

        setTimeout(function () {

            var HMVC = $("#HMVChart").dxChart("instance");
            if (HMVC != null)
                HMVC.render();

        }, 300);
    }
    catch (err) {
        HandleError(err);
    }
});

$(window).load(function () {
    var containerWidth = ASPxClientUtils.GetDocumentClientWidth();
    if (containerWidth < 590) {
        if ($('#topNavbarLogoAnchorDiv')) {
            $('#topNavbarLogoAnchorDiv').removeClass('pull-left').addClass('text-center');
            $('#topNavbarLogoAnchorDiv').removeClass('col-xs-6').addClass('col-xs-12');
            $('#topNavbarLogoAnchorDiv').css('padding-left', "unset");
            $('#topNavbarLogoAnchorDiv').css('background-color', "#367FA9");
            $('#topNavbarLogoAnchorDiv').css('height', "50px");
        }
        if ($('#topNavbarMainMenuDiv')) {
            $('#topNavbarMainMenuDiv').removeClass('col-xs-6').addClass('col-xs-12');
            $('#topNavbarMainMenuDiv').css('padding-left', "0px");
            $('#topNavbarMainMenuDiv').css('padding-right', "0px");
        }
    }

    if ($('#topNavbarMainMenuDiv').hasClass('col-xs-12'))
        $('#topNavbarHamIconUL').addClass('pull-left');
    else
        $('#topNavbarHamIconUL').removeClass('pull-left');

    $('.content-wrapper').css('padding-top', parseInt($('nav').css("height")) + 10);
    $('.content-wrapper').css('padding-bottom', parseInt($('footer').css("height")) + 10);
    setControl();

    setTimeout(function () {
        var newHeight = GetAvailableHeight();
        var Container = $("#notificationMainDiv");
        if (Container) {
            $("#notificationMainDiv").css("min-height", newHeight - 50);
        }

        var HMVC = $("#HMVChart").dxChart("instance");
        if (HMVC != null)
            HMVC.render();

        UpdateDevextrmeGridToFullHeight("divAccountGridView", 70);
    }, 300);

});

function ajaxNotificationCall() {
    try {

        for (i = 0; i < $("form").length; i++) {
            if ($("form")[i].id == 'frmLoginWithOTP')
                return;
        }

        AjaxRequest("POST", "Documents", "GetDashboardNotifications", "", { flag: 0 },
                         false, OnNotificationCntSuccess, null);
    } catch (err) {
        //HandleError(err);
    }
}

function OnNotificationCntSuccess(response) {
    try {
        if ($('#dashNCountSpn')) {
            var dashCnt = $('#dashNCountSpn').text();
            if (response != null && response != dashCnt)
                AjaxRequest("POST", "Documents", "GetDashboardNotifications", "", { flag: 1 },
                             false, OnNotificationViewSuccess, AjaxRequestError);
        }
    } catch (err) {
        HandleError(err);
    }
}

function OnNotificationViewSuccess(response) {
    try {
        $('#dashNotificationMainLi').html(response);
    } catch (err) {
        HandleError(err);
    }
}

function OnPointClick(e) {
    var point = e.target;
    toggleVisibility(point);
}

function OnLegendClick(e) {
    var arg = e.target;
    toggleVisibility(this.getAllSeries()[0].getPointsByArg(arg)[0]);
}

function onCustomizedPoint(point) {
    alert(point.value);
}

function onPastMenuClick() {
    try {
        $("#pastStatementFilterPopup").dxPopup("instance").option("visible", true);
    }
    catch (err) {
        HandleError(err);
    }
}

var selectedStatementId;
function OnPastStatementChange(s) {
    try {
        var sbInstance = $("#sbPastStatement").dxSelectBox("instance");
        selectedStatementId = s.value;
    } catch (err) {
        HandleError(err);
    }
}

function OnDynamicStatementViewClick() {
    var sbInstance = $("#pastDynamicStatement").dxSelectBox("instance").option('value')
    $('#pastStatementFilterPopup').dxPopup("instance").option('visible', false);
    AjaxRequest("POST", "MyReports", "GenerateDynamicReport", "", { users: sbInstance.UserId, year: sbInstance.Year, quarter: sbInstance.Period, seenByUser: true }, true, OnShowStatementSuccess, AjaxRequestError);
}

function OnDynamicStatementClick(users, year, period) {
    AjaxRequest("POST", "MyReports", "GenerateDynamicReport", "", { users: users, year: year, quarter: period, seenByUser: true }, true, OnShowStatementSuccess, AjaxRequestError);
}

function OnShowStatementSuccess(response ) {
    $('#dashboardContentDiv').html(response);

    var newHeight = GetAvailableHeight();
    var Container = $("#dashboardContentDiv");
    if (Container)
        $("#dashboardContentDiv").css("height", newHeight + 70)
}

function OnStatementViewClickFromMenu(ReportId) {
    selectedStatementId = ReportId;
    OnStatementViewClick();
}

function OnStatementViewClick() {
    try {
        //__RequestVerificationToken:
        //    $('[name=__RequestVerificationToken]').val()
        var url = "/" + "MyReports" + "/" + "ShowPastClientStatement" + "?ReportId=" + selectedStatementId;
        window.open(url, "_blank");
    }
    catch (err) {
        HandleError(err);
    }
}

function OnPastStmtSuccess(response) {
    try {
        $("#pastStatementFilterPopup").dxPopup("instance").option("visible", false);
    }
    catch (err) {
        HandleError(err);
    }
}



var enlargeBtnFlag = 0;
var oldChartHeight = 0;
var oldGridHeight = "";
var oldListHeight = 0;
var oldListWidth = 0;
function enlargeBtnClick(btnId, chartDivID, chartId, gridDivId, gridId, listDivId, listId, listTextBoxId) {
    try {
        var pieId = "#" + chartId + "Pie";
        var barId = "#" + chartId;
        var gridInstId = "#" + gridId;
        var listInstID = "#" + listId;
        var listTextBoxId = "#" + listTextBoxId;

        $('#' + chartDivID).toggleClass('fullscreen');
        $('#' + gridDivId).toggleClass('fullscreen');
        $('#' + listDivId).toggleClass('fullscreen');
        $('#mainLayoutWrapperDiv').toggleClass('parentbg');

        var pieChart = $(pieId).dxPieChart("instance");
        var barChart = $(barId).dxChart("instance");
        var gridInst = $(gridInstId).dxDataGrid("instance");
        var listInst = $(listInstID).dxList("instance")
        var listTextBoxInst = $(listTextBoxId).dxTextBox("instance");

        if (enlargeBtnFlag == 0) {
            enlargeBtnFlag = 1;
            $(".enlargeDivOverlay").show();
            $("#" + btnId + "Icon").removeClass('hidden');
            $("#" + btnId + "IconGrid").removeClass('hidden');

            var divHeight = 0;
            if ($('#' + chartDivID) && $('#' + chartDivID).length == 1) {
                divHeight = $('#' + chartDivID)[0].clientHeight;
                divHeight = divHeight - 60;
            }

            var gridDivHeight = 0;
            if ($('#' + gridDivId) && $('#' + gridDivId).length == 1) {
                gridDivHeight = $('#' + gridDivId)[0].clientHeight;
                gridDivHeight = gridDivHeight - 60;
            }

            var listDivHeight = 0;
            var listDivWidth = 0;
            if ($('#' + listDivId) && $('#' + listDivId).length == 1) {
                listDivHeight = $('#' + listDivId)[0].clientHeight;
                listDivWidth = $('#' + listDivId)[0].clientWidth;
                listDivHeight = listDivHeight - 120;
                if (listTextBoxId == "#docMyDocSearchControl")
                    listDivWidth = listDivWidth - 100;
                else
                    listDivWidth = listDivWidth - 60;
            }

            if (pieChart != null) {
                oldChartHeight = pieChart._options.size.height;
                pieChart._options.size.height = divHeight;
                pieChart.render();
            }

            if (barChart != null) {
                oldChartHeight = barChart._options.size.height;
                barChart._options.size.height = divHeight;
                barChart.render();
            }

            if (gridInst != null) {
                oldGridHeight = gridInst._options.height;
                gridInst._options.height = gridDivHeight + "px";
                gridInst.repaint();
            }

            if (listInst != null) {
                if (listTextBoxInst != null) {
                    oldListWidth = listTextBoxInst._options.width;
                    listTextBoxInst._options.width = listDivWidth;
                    listTextBoxInst.repaint();
                }

                oldListHeight = listInst._options.height;
                listInst._options.height = listDivHeight;
                listInst.repaint();
            }
        }
        else {
            enlargeBtnFlag = 0;
            $(".enlargeDivOverlay").hide();
            $("#" + btnId + "Icon").addClass('hidden');
            $("#" + btnId + "IconGrid").addClass('hidden');

            if (pieChart != null) {
                pieChart._options.size.height = oldChartHeight;
                pieChart.render();
            }

            if (barChart != null) {
                barChart._options.size.height = oldChartHeight;
                barChart.render();
            }

            if (gridInst != null) {
                gridInst._options.height = oldGridHeight;
                gridInst.repaint();
            }

            if (listInst != null) {
                if (listTextBoxInst != null) {
                    listTextBoxInst._options.width = oldListWidth;
                    listTextBoxInst.repaint();
                }
                listInst._options.height = oldListHeight;
                listInst.repaint();
            }
        }
    }
    catch (err) {
        HandleError(err);
    }
}

var globalReportPath = null;
function onNotificationItemClick(notificationId, path) {
    try {
        globalReportPath = path;
        AjaxRequest("POST", "Documents", "DeleteNotification", "", { notificationIds: notificationId },
                         true, OnNotificationDeleteSuccess, AjaxRequestError);
    }
    catch (err) {
        HandleError(err);
    }
}

var currentSelectedNotificationIds = "";
function onDeleteNotificationBtnClick() {
    try {
        var ListInstance = $('#notificationList').dxList("instance");
        if (ListInstance != null) {
            var cnt = ListInstance._selection.options.selectedItems.length;
            currentSelectedNotificationIds = "";
            for (var i = 0; i < cnt; i++) {
                if (currentSelectedNotificationIds == "")
                    currentSelectedNotificationIds += ListInstance._selection.options.selectedItems[i].Id;
                else
                    currentSelectedNotificationIds += "," + ListInstance._selection.options.selectedItems[i].Id;
            }
        }

        if (currentSelectedNotificationIds != "")
            AjaxRequest("POST", "Documents", "DeleteNotification", "", { notificationIds: currentSelectedNotificationIds },
                             true, OnDeleteOnlyNotificationSuccess, AjaxRequestError);
        else
            ShowPopupMessage("Please select the records first!", "Notifications");
    } catch (err) {
        HandleError(err);
    }
}


function OnNotificationDeleteSuccess(response) {
    try {
        if (globalReportPath != null && globalReportPath != "")
            onLinkClick(globalReportPath);
        else {
            if (response == null || response == "")
                var url = document.getElementById('hdnDocUrl').value;
            window.location = url;
        }

        var ListInstance = $('#notificationList').dxList("instance");
        if (ListInstance != null) {
            //ListInstance.reload();
            currentSelectedNotificationIds = "";
            var cnt = ListInstance._selection.options.selectedItems.length;
            for (var i = 0; i < cnt; i++) {
                if (currentSelectedNotificationIds == "")
                    currentSelectedNotificationIds += ListInstance._selection.options.selectedItems[i].Id;
                else
                    currentSelectedNotificationIds += "," + ListInstance._selection.options.selectedItems[i].Id;
            }

            var arrayOfSelectedIds = currentSelectedNotificationIds.split(',');
            var dataSource = ListInstance.getDataSource();
            var indexesOfItemsToBeRemoved = new Array();
            for (var i = 0; i < arrayOfSelectedIds.length; i++) {
                for (var x = 0; x < dataSource._store._array.length; x++) {
                    if (dataSource._store._array[x].Id == arrayOfSelectedIds[i]) {
                        indexesOfItemsToBeRemoved.push(x);
                    }
                }
            }

            indexesOfItemsToBeRemoved.sort(function (a, b) { return b - a });
            for (var i = 0; i < indexesOfItemsToBeRemoved.length; i++) {
                dataSource._store._array.splice(indexesOfItemsToBeRemoved[i], 1);
            }

            ListInstance._dataSource._store.array = dataSource._store._array;
            ListInstance._options.dataSource.store._array = dataSource._store._array;
            ListInstance._options.items = dataSource._store._array;
            ListInstance.repaint();
        }

        AjaxRequest("POST", "Documents", "GetDashboardNotifications", "", { flag: 0 },
                         false, OnNotificationCntSuccess, AjaxRequestError);
    } catch (err) {
        HandleError(err);
    }
}

function OnDeleteOnlyNotificationSuccess(response) {
    try {
        if (response == null || response == "") {
            var ListInstance = $('#notificationList').dxList("instance");
            if (ListInstance != null) {
                //ListInstance.reload();
                var arrayOfSelectedIds = currentSelectedNotificationIds.split(',');
                var dataSource = ListInstance.getDataSource();
                var indexesOfItemsToBeRemoved = new Array();
                for (var i = 0; i < arrayOfSelectedIds.length; i++) {
                    for (var x = 0; x < dataSource._store._array.length; x++) {
                        if (dataSource._store._array[x].Id == arrayOfSelectedIds[i]) {
                            indexesOfItemsToBeRemoved.push(x);
                        }
                    }
                }

                indexesOfItemsToBeRemoved.sort(function (a, b) { return b - a });
                for (var i = 0; i < indexesOfItemsToBeRemoved.length; i++) {
                    dataSource._store._array.splice(indexesOfItemsToBeRemoved[i], 1);
                }

                ListInstance._dataSource._store.array = dataSource._store._array;
                ListInstance._options.dataSource.store._array = dataSource._store._array;
                ListInstance._options.items = dataSource._store._array;
                ListInstance.repaint();
            }

            AjaxRequest("POST", "Documents", "GetDashboardNotifications", "", { flag: 0 },
                         false, OnNotificationCntSuccess, AjaxRequestError);
        }
    } catch (err) {
        HandleError(err);
    }
}

// for client selection from client dropdownlist
function onClientItemClick(Id, ClientName) {
    try {
        window.location = "/CPDashboard/Index?userId=" + "" + "&SelectedDate=" + "" + "&selectedHHId=" + Id + "&selectedClient=" + ClientName;
    }
    catch (err) {
        HandleError(err);
    }
}

function onLinkClick(path) {
    try {
        if (path != null && path != "")
            window.open("/Documents/OpenReport?link=" + path + "&id=" + null, '_blank');
    }
    catch (err) {
        HandleError(err);
    }
}

function FileUploadFailed(e) {
    var req = e.request;
    if (req.status == 400) {
        var message = "File upload failed.";
        if (req.statusText != "" && req.statusText != undefined) {
            message = req.statusText;
        }

        ShowPopupMessage(message, "Upload File");
    }
}

function customValueAxisLabel(arg) {
    var customText = "";
    if (arg.valueText.indexOf('$') < 0 && arg.valueText.indexOf('%') < 0) {
        customText = '$' + this.valueText;
        return customText;
    }
    else
        return this.valueText;
}

function UpdateDevextrmeGridToFullHeight(gridName, extraHeight) {
    try {
        var newHeight = GetAvailableHeight();
        var gridName = "#" + gridName;
        var GridInstance = $(gridName).dxDataGrid("instance");
        if (GridInstance) {
            GridInstance.option("height", newHeight - extraHeight);
        }

        return newHeight;
    }
    catch (err) {
        HandleError(err);
    }
}

function reportTypesGrid_OnClick(s, e) {
    try {
        //Hard coded need to fix
        AjaxRequest("GET", "Settings", "ReportParameterPopup", "", { id: 7, reportPageTypeId: 1 },
                                      true, OnReportActionSuccess, AjaxRequestError);
    }
    catch (err) {
        HandleError(err);
    }
}

function OnReportActionSuccess(response) {
    try {
        $("#commonPopupContiner").html(response);
    }
    catch (err) {
        HandleError(err);
    }
}

function datePicker_OnValueChanged(e) {
    var textBoxId = '#' + e.element.context.id + '_DateText';
    $(textBoxId).dxTextBox('option', 'value', e.value);
}

function ReportParamSettingSaveBtn_OnClick(s, e) {
    var data = $("#reportParameterSettingPopup").dxForm("instance").option("formData");

    len = data.ReportParamControlModelList.length;
    for (i = 0; i < len; i++) {
        var da = data.ReportParamControlModelList[i];
        var id = "#" + da.DefaultReportParamControlID;
        var val = "";
        switch (da.DefaultReportParamControlID) {
            case 1:
            case 2:
                {
                    val = $(id + '_DateText').dxTextBox("instance").option("value");
                    if (val.startsWith('{') && val.endsWith('}')) {
                        if (!['{bdlw}', '{edlq}', '{edly}', '{edpq}', '{yest}', '{RD}'].indexOf(val) >= 0) {
                            alert("Please Insert Correct Parameters");
                            return;
                        }
                    }
                    else if (!moment(val, "MM/DD/YYYY", true).isValid()) {
                        alert("Invalid date Format. Please enter in MM/DD/YYYY");
                        return;
                    }
                }
                break;
        }

        data.ReportParamControlModelList[i].DefaultValue = val;
        try {
            var fromDate = "";
            if (data.ReportParamControlModelList[i].ParamControlTypeDescription == "From Date") {
                fromDate = data.ReportParamControlModelList[i].DefaultValue;
                //Hard coded need to fix
                var portfolio = new Array();
                portfolio.push("1");
                AjaxRequest("POST", "MyReports", "GenerateReport", "", { Clients: portfolio, reportDate: fromDate, year: 2017, householdLevelReport: false, reportPageTypeId: 1 },
                             true, OnSaveReportSuccess, AjaxRequestError);

                $("#ReportParameterPopUp").dxPopup("instance").option("visible", false);
            }
        }
        catch (err) {
            HandleError(err);
        }
    }
}

function OnReportParametersSuccesss(response) {
    ShowPopupMessage(response, "Settings");
}

function OnSaveReportSuccess(response) {
    try {
        var popupControl = MVCxClientPopupControl.Cast("pcReportParamPopup");
        if (popupControl != undefined)
            $("#pcReportParamPopup").dxPopup("hide");

        $("#detailContainer").html(response);
    }
    catch (err) {
        HandleError(err);
    }
}

function DownloadSeprateReportPDF() {
    window.open("/MyReports/DownloadSeprateFiles", '_blank');
}
