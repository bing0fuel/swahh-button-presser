$(function() {

    /**
     * Get the user entered check in time and split it into a list if the input
     * is entered correctly
     *
     * @param DateTime now
     *
     * @return []
     */
    var getUserEnteredCheckInTimeAsSplit = function(now) {
        var time = $('#checkInTime').val();

        var checkInHour = null;
        var checkInMinute = null;

        splitTime = time.split(':');

        // We want to make sure things are in HH:MM form so check for string length and split length
        if (time.length == 5 && splitTime.length == 2) {
            checkInHour = parseInt(splitTime[0]);
            checkInMinute = parseInt(splitTime[1]);
            return new Date(now.getFullYear(), now.getMonth(), now.getDate(), checkInHour, checkInMinute, 0, 0)
        }
        return;
    };

    var checkInTimeHTML =
        '<div class="swa_forms_fieldContainer"> \
            <div class="swa_forms_labelContainer"> \
                <label for="checkInHour"> \
                    Check in time: \
                </label> \
                    <div class="swa_forms_fieldHelp_below"> \
                        (HH:MM -- 24 hr notation) \
                    </div> \
            </div> \
            <div class="swa_forms_inputContainer"> \
                <input id="checkInTime" type="text" value="" size="30" maxlength="30"> \
            </div> \
            <div class="swa_clearer"></div> \
        </div>';

    // This is the URL for the first check-in screen
    if (window.location.href.indexOf('https://www.southwest.com/flight/retrieveCheckinDoc.html') > -1) {
        $('.swa_forms_fieldContainer:last').after(checkInTimeHTML);

        // Check every 500 ms to see if it's time, if it is, click the Check In button (#submitButton)
        var checkInterval = setInterval(function () {
            var now = new Date();

            var checkInTime = getUserEnteredCheckInTimeAsSplit(now);
            if (checkInTime) {
                var timeDifference = checkInTime - now;
                if (timeDifference < 0) {
                    $('#submitButton').click();
                    clearInterval(checkInterval);
                }
            }
        }, 500);
    }

    // If the printDocumentsButton exists, click it. This is the 2nd stage of the
    // web-check-in
    $('#printDocumentsButton').click();

});
