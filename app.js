function calculateHospitalScore(
    hospital,
    requirement = "all"
) {

    let score = 0;


    if (
        hospital.status === "active"
    ) {

        score += 20;

    }


    if (
        hospital.emergency
    ) {

        score += 20;

    }


    if (
        hospital.beds.icu > 0
    ) {

        score += 20;

    }


    if (
        hospital.ambulances > 0
    ) {

        score += 10;

    }


    if (
        requirement !== "all" &&
        hospital.specialists.includes(
            requirement
        )
    ) {

        score += 25;

    }


    if (
        hospital.travelTime <= 10
    ) {

        score += 15;

    }

    else if (
        hospital.travelTime <= 20
    ) {

        score += 10;

    }

    else {

        score += 5;

    }


    return score;

}



function renderHospitals(
    list = hospitals
) {

    const container =
        document.getElementById(
            "hospitalList"
        );


    if (!container)
        return;


    if (
        list.length === 0
    ) {

        container.innerHTML = `

            <div class="no-results">

                <h2>
                    No hospitals found
                </h2>

                <p>
                    Try changing your search or filter.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        list.map(
            hospital => {

                const score =
                    calculateHospitalScore(
                        hospital
                    );


                const statusText =
                    hospital.status === "active"
                        ? "AVAILABLE"
                        : "LIMITED";


                const statusClass =
                    hospital.status === "active"
                        ? "available"
                        : "limited";


                return `

                <article class="hospital-card">

                    <div class="hospital-card-top">

                        <div>

                            <span class="hospital-type">
                                VERIFIED
                            </span>

                            <h2>
                                ${hospital.name}
                            </h2>

                            <p>
                                📍 ${hospital.address}
                            </p>

                        </div>


                        <div class="rating">

                            ⭐ ${hospital.rating}

                        </div>

                    </div>


                    <div class="hospital-status-row">

                        <span class="status ${statusClass}">

                            ● ${statusText}

                        </span>


                        <span>

                            ⏱ ${hospital.travelTime} min

                        </span>


                        <span>

                            🚑 ${hospital.ambulances}

                        </span>

                    </div>


                    <div class="resource-grid">

                        <div>

                            <strong>
                                ${hospital.beds.general}
                            </strong>

                            <small>
                                General
                            </small>

                        </div>


                        <div>

                            <strong>
                                ${hospital.beds.icu}
                            </strong>

                            <small>
                                ICU
                            </small>

                        </div>


                        <div>

                            <strong>
                                ${hospital.beds.emergency}
                            </strong>

                            <small>
                                Emergency
                            </small>

                        </div>

                    </div>


                    <div class="hospital-footer">

                        <small>
                            Updated ${hospital.lastUpdated}
                        </small>


                        <div>

                            <a
                                href="hospital.html?id=${hospital.id}"
                                class="small-btn"
                            >
                                View
                            </a>


                            <button
                                onclick="navigateToHospital(${hospital.id})"
                                class="primary-btn small"
                            >
                                Navigate
                            </button>

                        </div>

                    </div>

                </article>

                `;

            }
        )
        .join("");

}



function filterHospitals() {

    const search =
        document
        .getElementById(
            "hospitalSearch"
        )
        ?.value
        .toLowerCase() || "";


    const availability =
        document
        .getElementById(
            "availabilityFilter"
        )
        ?.value || "all";


    const sort =
        document
        .getElementById(
            "sortFilter"
        )
        ?.value || "score";


    let filtered =
        hospitals.filter(
            hospital => {

                const matchesSearch =

                    hospital.name
                    .toLowerCase()
                    .includes(search)

                    ||

                    hospital.address
                    .toLowerCase()
                    .includes(search)

                    ||

                    hospital.specialists
                    .join(" ")
                    .toLowerCase()
                    .includes(search);


                let matchesAvailability =
                    true;


                if (
                    availability ===
                    "emergency"
                ) {

                    matchesAvailability =
                        hospital.emergency;

                }


                if (
                    availability ===
                    "icu"
                ) {

                    matchesAvailability =
                        hospital.beds.icu > 0;

                }


                if (
                    availability ===
                    "ambulance"
                ) {

                    matchesAvailability =
                        hospital.ambulances > 0;

                }


                return (
                    matchesSearch &&
                    matchesAvailability
                );

            }
        );


    if (
        sort === "score"
    ) {

        filtered.sort(
            (a, b) =>
                calculateHospitalScore(b) -
                calculateHospitalScore(a)
        );

    }


    if (
        sort === "distance"
    ) {

        filtered.sort(
            (a, b) =>
                a.travelTime -
                b.travelTime
        );

    }


    if (
        sort === "beds"
    ) {

        filtered.sort(
            (a, b) =>
                b.beds.general -
                a.beds.general
        );

    }


    if (
        sort === "icu"
    ) {

        filtered.sort(
            (a, b) =>
                b.beds.icu -
                a.beds.icu
        );

    }


    renderHospitals(
        filtered
    );

}



function smartRecommend() {

    const requirement =
        document
        .getElementById(
            "requirementFilter"
        )
        .value;


    let results =
        hospitals.map(
            hospital => ({

                hospital,

                score:
                    calculateHospitalScore(
                        hospital,
                        requirement
                    )

            })
        );


    results.sort(
        (a, b) =>
            b.score - a.score
    );


    renderSmartRecommendation(
        results[0],
        requirement
    );

}



function renderSmartRecommendation(
    result,
    requirement
) {

    const container =
        document.getElementById(
            "hospitalList"
        );


    if (!container)
        return;


    const hospital =
        result.hospital;


    container.innerHTML = `

        <article class="best-match-card">

            <span class="recommendation-label">

                ⭐ BEST MATCH

            </span>


            <h2>
                ${hospital.name}
            </h2>


            <p>
                📍 ${hospital.address}
            </p>


            <div class="match-score">

                Smart Match Score:

                <strong>
                    ${result.score}
                </strong>

            </div>


            <div class="resource-grid">

                <div>

                    <strong>
                        ${hospital.beds.icu}
                    </strong>

                    <small>
                        ICU Beds
                    </small>

                </div>


                <div>

                    <strong>
                        ${hospital.ambulances}
                    </strong>

                    <small>
                        Ambulances
                    </small>

                </div>


                <div>

                    <strong>
                        ${hospital.travelTime}
                    </strong>

                    <small>
                        ETA Minutes
                    </small>

                </div>

            </div>


            <div class="recommendation-reason">

                <strong>
                    Why this hospital?
                </strong>

                <p>

                    ${
                        requirement === "all"

                        ?

                        "Strong emergency capability, available ICU resources and ambulance support."

                        :

                        `This hospital provides ${requirement} support and currently has suitable availability.`

                    }

                </p>

            </div>


            <div class="card-actions">

                <a
                    href="hospital.html?id=${hospital.id}"
                    class="primary-btn"
                >
                    View Hospital
                </a>


                <button
                    onclick="navigateToHospital(${hospital.id})"
                    class="small-btn"
                >
                    Navigate
                </button>

            </div>

        </article>

    `;

}



function loadHospitalDetails() {

    const element =
        document.getElementById(
            "hospitalDetails"
        );


    if (!element)
        return;


    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(
            params.get("id")
        );


    const hospital =
        hospitals.find(
            h => h.id === id
        );


    if (!hospital) {

        element.innerHTML = `

            <div class="no-results">

                <h1>
                    Hospital not found
                </h1>

                <a
                    href="hospitals.html"
                    class="primary-btn"
                >
                    Back to Hospitals
                </a>

            </div>

        `;

        return;

    }


    element.innerHTML = `

        <section class="hospital-detail-header">

            <div>

                <span class="hospital-type">
                    ✓ VERIFIED HOSPITAL
                </span>


                <h1>
                    ${hospital.name}
                </h1>


                <p>
                    📍 ${hospital.address}
                </p>


                <p>
                    ⭐ ${hospital.rating}
                </p>

            </div>


            <a
                href="tel:${hospital.phone}"
                class="primary-btn"
            >
                📞 Call Hospital
            </a>

        </section>



        <section class="detail-grid">


            <div class="detail-card">

                <h3>
                    🛏 Bed Availability
                </h3>


                <div class="detail-stat">

                    <span>
                        General Beds
                    </span>

                    <strong>
                        ${hospital.beds.general}
                    </strong>

                </div>


                <div class="detail-stat">

                    <span>
                        ICU
                    </span>

                    <strong>
                        ${hospital.beds.icu}
                    </strong>

                </div>


                <div class="detail-stat">

                    <span>
                        Emergency
                    </span>

                    <strong>
                        ${hospital.beds.emergency}
                    </strong>

                </div>

            </div>



            <div class="detail-card">

                <h3>
                    🏥 Facilities
                </h3>


                <p>
                    ${hospital.facilities.ventilator ? "🟢" : "🔴"}
                    Ventilator
                </p>


                <p>
                    ${hospital.facilities.oxygen ? "🟢" : "🔴"}
                    Oxygen
                </p>


                <p>
                    ${hospital.facilities.blood ? "🟢" : "🔴"}
                    Blood Bank
                </p>


                <p>
                    ${hospital.facilities.ct ? "🟢" : "🔴"}
                    CT Scan
                </p>


                <p>
                    ${hospital.facilities.mri ? "🟢" : "🔴"}
                    MRI
                </p>

            </div>



            <div class="detail-card">

                <h3>
                    👨‍⚕️ Specialists
                </h3>


                ${hospital.specialists
                    .map(
                        s =>
                            `<span class="specialty-tag">
                                ${s}
                            </span>`
                    )
                    .join("")}

            </div>



            <div class="detail-card">

                <h3>
                    🚑 Emergency
                </h3>


                <p>
                    Emergency:
                    <strong>
                        Available
                    </strong>
                </p>


                <p>
                    Ambulances:
                    <strong>
                        ${hospital.ambulances}
                    </strong>
                </p>


                <p>
                    Doctors on duty:
                    <strong>
                        ${hospital.doctorsOnDuty}
                    </strong>
                </p>


                <button
                    onclick="navigateToHospital(${hospital.id})"
                    class="primary-btn"
                >
                    🗺 Navigate
                </button>

            </div>


        </section>



        <div class="last-updated">

            🟢 Last updated:
            ${hospital.lastUpdated}

        </div>

    `;

}



document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderHospitals();

        loadHospitalDetails();

    }
);