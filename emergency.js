function startEmergency(
    requirement
) {

    const result =
        document.getElementById(
            "emergencyResult"
        );


    result.innerHTML = `

        <div class="searching-card">

            <div class="loading-circle">
                ⟳
            </div>

            <h2>
                Finding the best option...
            </h2>

            <p>
                Checking hospital availability,
                emergency services and travel time.
            </p>

        </div>

    `;


    setTimeout(
        () => {

            let suitable =
                hospitals.filter(
                    hospital => {

                        if (
                            requirement === "ICU"
                        ) {

                            return (
                                hospital.beds.icu > 0 &&
                                hospital.emergency
                            );

                        }


                        if (
                            requirement ===
                            "Emergency"
                        ) {

                            return hospital.emergency;

                        }


                        if (
                            requirement ===
                            "Ambulance"
                        ) {

                            return (
                                hospital.ambulances > 0
                            );

                        }


                        if (
                            requirement ===
                            "Blood"
                        ) {

                            return (
                                hospital.facilities.blood
                            );

                        }


                        return hospital.specialists
                            .includes(
                                requirement
                            );

                    }
                );


            suitable.sort(
                (a, b) =>
                    a.travelTime -
                    b.travelTime
            );


            const best =
                suitable[0];


            if (!best) {

                result.innerHTML = `

                    <div class="searching-card">

                        <h2>
                            No suitable facility found
                        </h2>

                        <p>
                            Try another requirement.
                        </p>

                    </div>

                `;

                return;

            }


            result.innerHTML = `

                <div class="best-emergency">

                    <div class="best-label">

                        ⭐ BEST MATCH

                    </div>


                    <h2>
                        ${best.name}
                    </h2>


                    <p>
                        📍 ${best.address}
                    </p>


                    <div class="emergency-stats">


                        <div>

                            <strong>
                                ${best.travelTime} min
                            </strong>

                            <span>
                                Estimated ETA
                            </span>

                        </div>


                        <div>

                            <strong>
                                ${best.beds.icu}
                            </strong>

                            <span>
                                ICU Beds
                            </span>

                        </div>


                        <div>

                            <strong>
                                ${best.ambulances}
                            </strong>

                            <span>
                                Ambulances
                            </span>

                        </div>


                    </div>


                    <div class="emergency-status">

                        🟢 Emergency Available

                        &nbsp;&nbsp;

                        ✓ Verified

                    </div>


                    <div class="card-actions">


                        <a
                            href="tel:${best.phone}"
                            class="emergency-btn"
                        >
                            📞 CALL
                        </a>


                        <button
                            class="primary-btn"
                            onclick="navigate(${best.lat},${best.lng})"
                        >
                            🗺 NAVIGATE
                        </button>


                        <button
                            class="small-btn"
                            onclick="createEmergencyRequest(${best.id})"
                        >
                            REQUEST HELP
                        </button>


                    </div>


                    <small class="demo-warning">

                        Demo availability data.
                        Verify directly with the facility.

                    </small>

                </div>

            `;

        },

        1200
    );

}



function navigate(
    lat,
    lng
) {

    window.open(

        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,

        "_blank"

    );

}



function createEmergencyRequest(
    hospitalId
) {

    const request = {

        id:
            "ER-" +
            Math.floor(
                Math.random() * 9000
            ),

        hospitalId,

        status:
            "Hospital notified",

        createdAt:
            new Date()
            .toLocaleTimeString()

    };


    localStorage.setItem(

        "medtrackEmergencyRequest",

        JSON.stringify(request)

    );


    alert(

        "Emergency request created.\n\n" +

        "Request ID: " +
        request.id +

        "\n\n" +

        "Hospital has been notified in this demo."

    );

}