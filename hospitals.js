// ============================================
// MEDTRACK INDIA - HOSPITAL DATABASE
// ============================================

const hospitals = [

    {
        id: 1,
        name: "Ruby Hall Clinic",
        city: "Pune",
        state: "Maharashtra",
        address: "Sassoon Road, Pune",
        latitude: 18.5204,
        longitude: 73.8567,

        beds: {
            general: 32,
            icu: 5,
            emergency: 8
        },

        specialists: [
            "Cardiology",
            "Neurology",
            "Emergency Medicine"
        ],

        facilities: [
            "ICU",
            "Emergency",
            "Cardiology",
            "CT Scan",
            "MRI",
            "Ambulance"
        ],

        ambulances: 2,
        rating: 4.5,
        travelTime: 12,

        emergency: true,
        verified: true,
        status: "active",
        lastUpdated: "2 minutes ago"
    },


    {
        id: 2,
        name: "KEM Hospital Pune",
        city: "Pune",
        state: "Maharashtra",
        address: "Rasta Peth, Pune",
        latitude: 18.5200,
        longitude: 73.8620,

        beds: {
            general: 45,
            icu: 8,
            emergency: 12
        },

        specialists: [
            "Cardiology",
            "Orthopedics",
            "Emergency Medicine"
        ],

        facilities: [
            "ICU",
            "Emergency",
            "Cardiology",
            "Orthopedics",
            "CT Scan",
            "Ambulance"
        ],

        ambulances: 3,
        rating: 4.4,
        travelTime: 15,

        emergency: true,
        verified: true,
        status: "active",
        lastUpdated: "4 minutes ago"
    },


    {
        id: 3,
        name: "Manipal Hospital",
        city: "Bengaluru",
        state: "Karnataka",
        address: "HAL Airport Road, Bengaluru",
        latitude: 12.9592,
        longitude: 77.6470,

        beds: {
            general: 60,
            icu: 10,
            emergency: 15
        },

        specialists: [
            "Cardiology",
            "Neurology",
            "Emergency Medicine"
        ],

        facilities: [
            "ICU",
            "Emergency",
            "Cardiology",
            "Neurology",
            "MRI",
            "CT Scan",
            "Ambulance"
        ],

        ambulances: 4,
        rating: 4.6,
        travelTime: 10,

        emergency: true,
        verified: true,
        status: "active",
        lastUpdated: "3 minutes ago"
    },


    {
        id: 4,
        name: "KLE Hospital",
        city: "Belgaum",
        state: "Karnataka",
        address: "Nehru Nagar, Belgaum",
        latitude: 15.8497,
        longitude: 74.4977,

        beds: {
            general: 40,
            icu: 6,
            emergency: 10
        },

        specialists: [
            "Cardiology",
            "Orthopedics",
            "Emergency Medicine"
        ],

        facilities: [
            "ICU",
            "Emergency",
            "Cardiology",
            "Orthopedics",
            "CT Scan",
            "Ambulance"
        ],

        ambulances: 2,
        rating: 4.5,
        travelTime: 8,

        emergency: true,
        verified: true,
        status: "active",
        lastUpdated: "1 minute ago"
    },


    {
        id: 5,
        name: "Apollo Hospital",
        city: "Hyderabad",
        state: "Telangana",
        address: "Jubilee Hills, Hyderabad",
        latitude: 17.4239,
        longitude: 78.4738,

        beds: {
            general: 70,
            icu: 12,
            emergency: 18
        },

        specialists: [
            "Cardiology",
            "Oncology",
            "Emergency Medicine"
        ],

        facilities: [
            "ICU",
            "Emergency",
            "Cardiology",
            "Oncology",
            "MRI",
            "CT Scan",
            "Ambulance"
        ],

        ambulances: 5,
        rating: 4.7,
        travelTime: 14,

        emergency: true,
        verified: true,
        status: "active",
        lastUpdated: "2 minutes ago"
    },


    {
        id: 6,
        name: "AIIMS Delhi",
        city: "New Delhi",
        state: "Delhi",
        address: "Ansari Nagar, New Delhi",
        latitude: 28.5672,
        longitude: 77.2100,

        beds: {
            general: 90,
            icu: 15,
            emergency: 20
        },

        specialists: [
            "Cardiology",
            "Neurology",
            "Oncology",
            "Emergency Medicine"
        ],

        facilities: [
            "ICU",
            "Emergency",
            "Cardiology",
            "Neurology",
            "Oncology",
            "MRI",
            "CT Scan",
            "Ambulance"
        ],

        ambulances: 6,
        rating: 4.8,
        travelTime: 18,

        emergency: true,
        verified: true,
        status: "active",
        lastUpdated: "5 minutes ago"
    },


    {
        id: 7,
        name: "CMC Hospital",
        city: "Vellore",
        state: "Tamil Nadu",
        address: "Ida Scudder Road, Vellore",
        latitude: 12.9249,
        longitude: 79.1350,

        beds: {
            general: 55,
            icu: 9,
            emergency: 14
        },

        specialists: [
            "Cardiology",
            "Neurology",
            "Emergency Medicine"
        ],

        facilities: [
            "ICU",
            "Emergency",
            "Cardiology",
            "Neurology",
            "MRI",
            "CT Scan",
            "Ambulance"
        ],

        ambulances: 3,
        rating: 4.7,
        travelTime: 11,

        emergency: true,
        verified: true,
        status: "active",
        lastUpdated: "3 minutes ago"
    },


    {
        id: 8,
        name: "Fortis Hospital",
        city: "Mumbai",
        state: "Maharashtra",
        address: "Mulund West, Mumbai",
        latitude: 19.1726,
        longitude: 72.9567,

        beds: {
            general: 48,
            icu: 7,
            emergency: 11
        },

        specialists: [
            "Cardiology",
            "Orthopedics",
            "Emergency Medicine"
        ],

        facilities: [
            "ICU",
            "Emergency",
            "Cardiology",
            "Orthopedics",
            "CT Scan",
            "MRI",
            "Ambulance"
        ],

        ambulances: 3,
        rating: 4.6,
        travelTime: 13,

        emergency: true,
        verified: true,
        status: "active",
        lastUpdated: "2 minutes ago"
    }

];


// ============================================
// SEARCH
// ============================================

function searchHospitals(searchText = "") {

    const search = searchText.trim().toLowerCase();

    if (!search) {
        return hospitals;
    }

    return hospitals.filter(hospital => {

        const name =
            hospital.name.toLowerCase();

        const city =
            hospital.city.toLowerCase();

        const state =
            hospital.state.toLowerCase();

        const address =
            hospital.address.toLowerCase();

        const specialists =
            hospital.specialists.join(" ").toLowerCase();

        const facilities =
            hospital.facilities.join(" ").toLowerCase();

        return (
            name.includes(search) ||
            city.includes(search) ||
            state.includes(search) ||
            address.includes(search) ||
            specialists.includes(search) ||
            facilities.includes(search)
        );
    });
}


// ============================================
// GET HOSPITAL
// ============================================

function getHospitalById(id) {

    return hospitals.find(
        hospital => hospital.id === Number(id)
    );
}


// ============================================
// VIEW HOSPITAL
// ============================================

function viewHospital(id) {

    const hospital = getHospitalById(id);

    if (!hospital) {
        alert("Hospital not found.");
        return;
    }

    window.location.href =
        `hospital.html?id=${hospital.id}`;
}


// ============================================
// NAVIGATE
// ============================================

function navigateToHospital(id) {

    const hospital = getHospitalById(id);

    if (!hospital) {
        alert("Hospital not found.");
        return;
    }

    const destination =
        `${hospital.latitude},${hospital.longitude}`;

    window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
        "_blank"
    );
}


// ============================================
// FIND BEST HOSPITAL
// ============================================

function findBestHospital(requirement = "") {

    let results = [...hospitals];

    if (requirement) {

        const req =
            requirement.toLowerCase();

        results = results.filter(hospital => {

            return (
                hospital.specialists.some(
                    specialist =>
                        specialist.toLowerCase().includes(req)
                ) ||

                hospital.facilities.some(
                    facility =>
                        facility.toLowerCase().includes(req)
                )
            );
        });
    }

    results = results.filter(
        hospital =>
            hospital.status !== "full"
    );

    results.sort((a, b) => {

        const scoreA =
            (a.rating * 20) +
            (a.beds.icu * 5) +
            (a.beds.general * 2) -
            a.travelTime;

        const scoreB =
            (b.rating * 20) +
            (b.beds.icu * 5) + 
            (b.beds.general * 2) -
            b.travelTime;

        return scoreB - scoreA;
    });

    return results;
}


// ============================================
// MAKE FUNCTIONS AVAILABLE GLOBALLY
// ============================================

window.hospitals = hospitals;
window.searchHospitals = searchHospitals;
window.getHospitalById = getHospitalById;
window.viewHospital = viewHospital;
window.navigateToHospital = navigateToHospital;
window.findBestHospital = findBestHospital;