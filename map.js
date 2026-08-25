// ==========================================
// MEDTRACK INDIA - LIVE GPS MAP
// ==========================================

let map;
let userMarker;
let hospitalMarkers = [];


// India default location
const INDIA_CENTER = [
    22.5937,
    78.9629
];

const INDIA_ZOOM = 5;


// ==========================================
// INITIALIZE MAP
// ==========================================

function initializeMap() {

    const mapElement =
        document.getElementById("homeMap");

    // Stop if map doesn't exist on this page
    if (!mapElement) {
        return;
    }


    // Create Leaflet map
    map = L.map("homeMap").setView(
        INDIA_CENTER,
        INDIA_ZOOM
    );


    // OpenStreetMap tiles
    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    // Show all demo hospitals initially
    showAllHospitals();


    // Try user's GPS
    detectUserLocation();
}


// ==========================================
// SHOW ALL HOSPITALS
// ==========================================

function showAllHospitals() {

    if (
        typeof hospitals === "undefined" ||
        !map
    ) {
        return;
    }


    hospitals.forEach(hospital => {

        const marker =
            L.marker([
                hospital.lat,
                hospital.lng
            ]).addTo(map);


        marker.bindPopup(`

            <div style="min-width:220px">

                <h3 style="margin-bottom:8px">
                    🏥 ${hospital.name}
                </h3>

                <p>
                    📍 ${hospital.city},
                    ${hospital.state}
                </p>

                <p>
                    🟢 Emergency:
                    ${hospital.emergency
                        ? "Available"
                        : "Unavailable"}
                </p>

                <p>
                    🛏️ ICU:
                    ${hospital.icu} beds
                </p>

                <p>
                    🏥 General Beds:
                    ${hospital.beds}
                </p>

                <p>
                    🚑 Ambulances:
                    ${hospital.ambulance}
                </p>

            </div>

        `);


        hospitalMarkers.push(marker);

    });

}


// ==========================================
// DETECT USER LOCATION
// ==========================================

function detectUserLocation() {

    if (!navigator.geolocation) {

        console.log(
            "Geolocation is not supported."
        );

        return;
    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            console.log(
                "Current location:",
                latitude,
                longitude
            );


            // Move map to user
            map.setView(
                [latitude, longitude],
                12
            );


            // Add user marker
            userMarker =
                L.marker([
                    latitude,
                    longitude
                ])
                .addTo(map);


            userMarker.bindPopup(
                "📍 <strong>You are here</strong>"
            );


            userMarker.openPopup();


            // Find nearest hospitals
            const nearest =
                findNearestHospitals(
                    latitude,
                    longitude,
                    10
                );


            // Update markers with distance
            updateHospitalPopups(
                nearest
            );


            // Show nearby hospitals in console
            console.log(
                "Nearest hospitals:",
                nearest
            );

        },

        function(error) {

            console.log(
                "Unable to access location."
            );

            console.log(error);


            // Keep India view
            map.setView(
                INDIA_CENTER,
                INDIA_ZOOM
            );

        },

        {
            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 300000
        }

    );

}


// ==========================================
// UPDATE HOSPITAL POPUPS WITH DISTANCE
// ==========================================

function updateHospitalPopups(
    nearestHospitals
) {

    nearestHospitals.forEach(
        hospital => {

            const markerIndex =
                hospitals.findIndex(
                    item =>
                        item.id === hospital.id
                );


            if (markerIndex === -1) {
                return;
            }


            const marker =
                hospitalMarkers[
                    markerIndex
                ];


            if (!marker) {
                return;
            }


            marker.bindPopup(`

                <div style="min-width:240px">

                    <h3>
                        🏥 ${hospital.name}
                    </h3>

                    <p>
                        📍 ${hospital.city},
                        ${hospital.state}
                    </p>

                    <hr>

                    <p>
                        📏
                        <strong>
                            ${hospital.distance.toFixed(1)}
                            km away
                        </strong>
                    </p>

                    <p>
                        🟢 Emergency:
                        Available
                    </p>

                    <p>
                        🛏️ ICU:
                        ${hospital.icu}
                        beds
                    </p>

                    <p>
                        🏥 Beds:
                        ${hospital.beds}
                    </p>

                    <p>
                        🚑 Ambulances:
                        ${hospital.ambulance}
                    </p>

                    <p>
                        ❤️
                        ${hospital.specialties.join(", ")}
                    </p>

                    <button
                        onclick="openDirections(
                            ${hospital.lat},
                            ${hospital.lng}
                        )"
                        style="
                            width:100%;
                            padding:9px;
                            border:0;
                            border-radius:7px;
                            background:#1266f1;
                            color:white;
                            cursor:pointer;
                        "
                    >
                        🧭 Get Directions
                    </button>

                </div>

            `);

        }
    );

}


// ==========================================
// GET DIRECTIONS
// ==========================================

function openDirections(
    latitude,
    longitude
) {

    const url =
        `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    window.open(
        url,
        "_blank"
    );

}


// ==========================================
// START MAP
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeMap();

    }
);