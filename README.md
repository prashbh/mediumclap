# Medium Clap Persisted using Firestore (NoSQL Cloud Database)

Based on https://github.com/JonathanDn/mediumclap



https://github.com/prashbh/mediumclap-persisted/assets/5489699/dc711153-523a-45f3-bb63-14f73c3d5330



by [Prashant Bhargava](https://www.linkedin.com/in/prashantb16/)

![MIT License](https://badgen.net/badge/license/MIT/blue "MIT License")

## Configuring & Instructions

### 1. Running the demo

**1.1 Set up Firestore project**

Create a new FireStore project.

**1.2 Update config**
Go to your Firestore Project Settings > General.
Copy the FirebaseConfig and paste the values in `medium_clap.js`.
Open `medium_clap.html` using localhost.

### 2. Securing Firestore
**2.1 Adding Firestore rules**
If you would like to perform any additional data validation or setup auth rules, make sure to read through [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/rules-structure)

**2.2 Securing API keys**
Head to Google Cloud Console and setup security for your credentials.
Google Cloud Console > APIs & Services > Credentials > API Keys > Set Application & API restrictions 

![APISecurity](https://github.com/prashbh/mediumclap-persisted/assets/5489699/d9b1f8a0-6844-4969-be98-db38da49f7f9)

