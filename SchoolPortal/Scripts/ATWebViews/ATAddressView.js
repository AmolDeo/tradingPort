$(document).ready(function () {
    try {
        if (document.getElementById(GetCountryElement()))
            LoadCountryDependency();
    }
    catch (err) {
        HandleError(err);
    }
});

function GetCountryElement() {
    try {
    var countryElement = "CountryId";
    if (!document.getElementById(countryElement))
        countryElement = "hdnCountryId";

    return countryElement;
}
    catch (err) {
        HandleError(err);
    }
}

function gridLookupCountriesValueChanged(s, e) {
    try {
        var countryElement = GetCountryElement();

        var newCountry = s.GetValue();
        var selectedCountry = document.getElementById(countryElement).value;
        if (selectedCountry !== newCountry) {
            document.getElementById(countryElement).value = newCountry;
            LoadCountryDependency();
        }
    }
    catch (err) {
        HandleError(err);
    }
}

function gridLookupStatesValueChanged(s, e) {
    try {
        var stateElement = "StateId";
        if (!document.getElementById(stateElement))
            stateElement = "hdnStateId";

        document.getElementById(stateElement).value = s.GetValue();
    }
    catch (err) {
        HandleError(err);
    }
}

function stateGridViewLookup_BeginCallback(s, e) {
    try {
        var countryElement = GetCountryElement();
        e.customArgs["parentId"] = document.getElementById(countryElement).value;
    }
    catch (err) {
        HandleError(err);
    }
}

function LoadCountryDependency() {
    try {
        if (document.getElementById("gridLookupStates"))
            gridLookupStates.GetGridView().PerformCallback();

        // Ajax call to get CountryAddressInfo
        var countryElement = GetCountryElement();
        var selectedCountry = document.getElementById(countryElement).value;
        AjaxRequest("GET", "Address", "GetCountryAddressInfo", "", { countryId: selectedCountry }, false, OnLoadCountryAddressInfo, AjaxRequestError);
    }
    catch (err) {
        HandleError(err);
    }
}

function OnLoadCountryAddressInfo(response) {
    try {
        UpdateCountryDependency(response);
    }
    catch (err) {
        HandleError(err);
    }
}

function UpdateCountryDependency(countryAddressInfo) {
    try {
        if (document.getElementById("flAddressView")) {
            flAddressView.GetItemByName("BusinessName").SetVisible(countryAddressInfo.BusinessName);
            flAddressView.GetItemByName("UnitNumber").SetVisible(countryAddressInfo.UnitNumber);
            flAddressView.GetItemByName("HouseNumber").SetVisible(countryAddressInfo.HouseBuildingNumber);
            flAddressView.GetItemByName("Neighborhood").SetVisible(countryAddressInfo.Neighborhood);
            flAddressView.GetItemByName("PostCode").SetVisible(countryAddressInfo.PostCode);
            flAddressView.GetItemByName("BoxNumber").SetVisible(countryAddressInfo.BoxNumber);
            flAddressView.AdjustControl();
        }
        else {
            var cardView = MVCxClientCardView.Cast("CardViewAddress");
            if (!cardView.IsEditing())
                return;

            colBusinessName.SetEnabled(countryAddressInfo.BusinessName);
            $('.address-business-name label').css("color", countryAddressInfo.BusinessName ? "black" : "#b1b1b8");
            colUnitNumber.SetEnabled(countryAddressInfo.UnitNumber);
            $('.address-unit-number label').css("color", countryAddressInfo.UnitNumber ? "black" : "#b1b1b8");
            colHouseNumber.SetEnabled(countryAddressInfo.HouseBuildingNumber);
            $('.address-house-number label').css("color", countryAddressInfo.HouseBuildingNumber ? "black" : "#b1b1b8");
            colNeighborhood.SetEnabled(countryAddressInfo.Neighborhood);
            $('.address-neighborhood label').css("color", countryAddressInfo.Neighborhood ? "black" : "#b1b1b8");
            colPostCode.SetEnabled(countryAddressInfo.PostCode);
            $('.address-post-code label').css("color", countryAddressInfo.PostCode ? "black" : "#b1b1b8");
            colBoxNumber.SetEnabled(countryAddressInfo.BoxNumber);
            $('.address-box-number label').css("color", countryAddressInfo.BoxNumber ? "black" : "#b1b1b8");
        }
    }
    catch (err) {
        HandleError(err);
    }
}