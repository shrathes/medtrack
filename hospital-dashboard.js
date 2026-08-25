let hospitalData = {

    general: 32,

    icu: 4,

    emergency: 8,

    ambulances: 2

};



function changeBed(
    type,
    amount
) {

    if (
        hospitalData[type] <= 0 &&
        amount < 0
    ) {

        return;

    }


    hospitalData[type] += amount;


    updateDashboard();

}



function changeAmbulance(
    amount
) {

    if (
        hospitalData.ambulances <= 0 &&
        amount < 0
    ) {

        return;

    }


    hospitalData.ambulances += amount;


    updateDashboard();

}



function updateDashboard() {

    document.getElementById(
        "generalBeds"
    ).textContent =
        hospitalData.general;


    document.getElementById(
        "icuBeds"
    ).textContent =
        hospitalData.icu;


    document.getElementById(
        "emergencyBeds"
    ).textContent =
        hospitalData.emergency;


    document.getElementById(
        "ambulances"
    ).textContent =
        hospitalData.ambulances;


    localStorage.setItem(

        "hospitalLiveData",

        JSON.stringify(
            hospitalData
        )

    );

}



function toggleFacility(
    button
) {

    const status =
        button.querySelector(
            "span"
        );


    if (
        status.textContent ===
        "AVAILABLE"
    ) {

        status.textContent =
            "UNAVAILABLE";

        status.style.color =
            "#dc2626";

    }

    else {

        status.textContent =
            "AVAILABLE";

        status.style.color =
            "#087f5b";

    }

}



function acceptRequest() {

    alert(

        "Emergency request accepted.\n\n" +

        "The production system would notify the patient and ambulance network."

    );

}