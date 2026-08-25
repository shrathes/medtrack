# 🏥 MedTrack India

## Intelligent Healthcare Resource Discovery & Emergency Coordination Platform

MedTrack India is a web-based healthcare discovery platform designed to help users find suitable hospitals based on their location, medical requirements, hospital availability, emergency services, and travel time.

Instead of simply showing the nearest hospital, MedTrack aims to answer:

> **"Which suitable hospital can actually help me right now?"**

---

## 🚀 Key Features

### 📍 Hospital Discovery

Users can search for hospitals based on:

- Hospital name
- City
- State
- Location
- Medical specialty
- Healthcare requirements

The platform supports hospital discovery across different locations in India.

---

### 🗺️ Interactive GPS Map

MedTrack uses an interactive map to display hospitals and their locations.

Features include:

- Hospital locations
- User location
- Hospital markers
- Location-based discovery
- Navigation to hospitals
- Distance and travel information

The project uses **Leaflet.js** for map functionality.

---

### 🤖 Smart Hospital Recommendation

MedTrack provides intelligent hospital matching instead of relying only on distance.

Hospital recommendations can consider:

- Hospital rating
- ICU availability
- General beds
- Emergency beds
- Emergency capability
- Medical specialties
- Ambulance availability
- Travel time
- Hospital status

The system calculates a suitability score to help rank hospitals.

---

### 🚨 Emergency Mode

The Emergency section is designed for users who need urgent healthcare assistance.

Users can search for hospitals suitable for requirements such as:

- Emergency care
- ICU
- Cardiology
- Ambulance
- Trauma-related care

The system can display suitable hospitals and provide navigation options.

---

### 🛏️ Hospital Availability

Hospital information includes resource availability such as:

- General beds
- ICU beds
- Emergency beds
- Ambulances
- Emergency services

Hospital status can be displayed as:

🟢 AVAILABLE

🟡 LIMITED

🔴 FULL

---

### 🏥 Hospital Details

Users can select a hospital to view detailed information including:

- Hospital name
- Address
- City
- State
- Medical specialties
- Bed availability
- ICU availability
- Emergency availability
- Ambulances
- Rating
- Verification status
- Last updated time

---

### 🚑 Ambulance Module

The Ambulance section provides a dedicated interface for ambulance-related information and emergency coordination.

The project structure supports ambulance-related functionality through:

`ambulance.html`

---

### 🩸 Blood Availability

The Blood section provides a dedicated interface for blood-related emergency requirements.

The project structure supports blood availability functionality through:

`blood.html`

---

### 🏥 Hospital Dashboard

Registered hospitals can use a dedicated dashboard interface.

The dashboard is designed to monitor and update hospital resources such as:

- Total beds
- Available beds
- ICU beds
- Emergency resources
- Ambulances
- Hospital status

---

## 🧠 How Smart Matching Works

MedTrack ranks hospitals using multiple factors instead of simply selecting the nearest hospital.

A simplified scoring approach considers:

```text
Hospital Score =
    Rating
    + ICU Availability
    + General Bed Availability
    + Travel Time
    + Hospital Capability
