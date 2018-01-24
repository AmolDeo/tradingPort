$(document).ready(function () {
    try {
        var cardView = MVCxClientCardView.Cast("CardViewAddress");

        if (cardView == null || !cardView.IsEditing())
            return;

        UpdateAddressTypeDependency();
    }
    catch (err) {
        HandleError(err);
    }
});

function BeginAddressCallback(s, e) {
    try {
        if ($('#saveDetailsForm').length > 0) {
            var form = $('#saveDetailsForm');
            var token = $('input[name="__RequestVerificationToken"]', form).val();
            e.customArgs["__RequestVerificationToken"] = token;
        }
    }
    catch (err) {
        HandleError(err);
    }
}

function EndAddressCallback(s, e) {
    try {
        if (!document.getElementById("radioAddressType"))
            return;

        UpdateAddressTypeDependency();
        LoadCountryDependency();
    }
    catch (err) {
        HandleError(err);
    }
}

function AddressTypeChanged(s, e) {
    try {
        document.getElementById("hdnAddressType").value = radioAddressType.GetValue();
        UpdateAddressTypeDependency();
    }
    catch (err) {
        HandleError(err);
    }
}

function UpdateAddressTypeDependency() {
    try {
        var value = radioAddressType.GetValue();
        switch (value) {
            case "1":
            case "4":
                colStartDate.SetEnabled(false);
                colEndDate.SetEnabled(false);
                colStartMonth.SetEnabled(false);
                colEndMonth.SetEnabled(false);
                $('.address-specific-date label').css("color", "#b1b1b8");
                $('.address-seasonal label').css("color", "#b1b1b8");
                break;
            case "2":
                colStartDate.SetEnabled(false);
                colEndDate.SetEnabled(false);
                colStartMonth.SetEnabled(true);
                colEndMonth.SetEnabled(true);
                $('.address-specific-date label').css("color", "#b1b1b8");
                $('.address-seasonal label').css("color", "black");
                break;
            case "3":
                colStartDate.SetEnabled(true);
                colEndDate.SetEnabled(true);
                colStartMonth.SetEnabled(false);
                colEndMonth.SetEnabled(false);
                $('.address-specific-date label').css("color", "black");
                $('.address-seasonal label').css("color", "#b1b1b8");
                break;
        }
    }
    catch (err) {
        HandleError(err);
    }
}