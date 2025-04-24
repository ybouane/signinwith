# Sign In With

A simple and straightforward library for adding "Sign in with..." buttons (Google, Meta/Facebook, Apple) to your web application, handling both the frontend UI (React) and backend verification.

## Features

*   Easy integration for Google, Meta (Facebook), and Apple sign-in.
*   React components for the frontend buttons.
*   Backend utility functions to verify the identity tokens/access tokens.
*   Basic customizable styling.

## Installation

```bash
npm install signinwith
# or
yarn add signinwith
```

## Frontend Usage (React)

Import the main component and the CSS styles:

```jsx
import React from 'react';
import SignInWith from 'signinwith/react';
import 'signinwith/styles.css'; // Import the styles

function App() {
  // Configuration for the services you want to enable
  const services = {
    google: {
      clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    },
    meta: {
      appId: 'YOUR_FACEBOOK_APP_ID',
    },
    apple: {
      clientId: 'YOUR_APPLE_SERVICE_ID', // e.g., com.mywebsite.signin
      // redirectURI is automatically set to window.location.origin + '/auth/apple/callback'
      // Ensure this callback route exists or handle the popup flow appropriately.
    },
  };

  // Callback function when sign-in is successful on the frontend
  const handleSignin = (service, data) => {
    console.log(`Signed in with ${service}:`, data);
    // Send 'service' and 'data' to your backend for verification
    fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service, data }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          console.log('Backend verification successful:', result.email);
          // Proceed with user session, redirect, etc.
        } else {
          console.error('Backend verification failed:', result.error);
        }
      });
  };

  return (
    <div className="signinwith-container">
      <h2>Sign In</h2>
      <SignInWith services={services} onSignin={handleSignin} />
    </div>
  );
}

export default App;
```

### Props for `SignInWith`

*   `services` (Object, required): An object where keys are the service names (`google`, `meta`, `apple`) and values are their respective configuration objects.
*   `onSignin` (Function, required): A callback function that receives `(serviceName, data)` when a sign-in attempt is successful on the client-side. `data` contains the necessary information (e.g., `credential` for Google, `accessToken` for Meta, `authorization` object for Apple) to be sent to your backend for verification.

## Backend Verification

Import the verification function on your server:

```javascript
// Example using Express.js
import express from 'express';
import verifySignin from 'signinwith'; // Use the main export

const app = express();
app.use(express.json());

// Your service configurations (should match frontend, plus any secrets)
// Store these securely, e.g., in environment variables
const servicesConfig = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  meta: {
    // Meta verification only needs the access token from the frontend
    // No specific backend config needed here for the library function itself
    // but you might need App ID/Secret for other Graph API calls.
  },
  apple: {
    clientId: process.env.APPLE_CLIENT_ID, // Your Service ID (e.g., com.mywebsite.signin)
    // The library uses apple-signin-auth which might require more config
    // depending on how you generated your keys. Refer to its documentation.
  },
};

app.post('/api/auth/verify', async (req, res) => {
  const { service, data } = req.body;

  if (!service || !data) {
    return res.status(400).json({ success: false, error: 'Missing service or data' });
  }

  try {
    const result = await verifySignin(servicesConfig, service, data);
    if (result.success) {
      // Verification successful!
      // Find or create user with result.email
      console.log(`Verified ${service} sign in for: ${result.email}`);
      res.json({ success: true, email: result.email });
    } else {
      // Verification failed
      console.error(`Failed to verify ${service}: ${result.error}`);
      res.status(401).json({ success: false, error: result.error || 'Verification failed' });
    }
  } catch (error) {
    console.error(`Error during ${service} verification:`, error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

```

### Verification Functions

The main `verifySignin` function delegates to service-specific functions:

*   `verifySigninGoogle(config, verificationData)`: Verifies Google ID token.
    *   `config`: Needs `{ clientId }`.
    *   `verificationData`: Needs `{ credential }`.
*   `verifySigninMeta(config, verificationData)`: Verifies Meta access token by fetching user email.
    *   `config`: Not directly used by the function, but you need your App ID configured on the frontend.
    *   `verificationData`: Needs `{ accessToken }`.
*   `verifySigninApple(config, verificationData)`: Verifies Apple ID token.
    *   `config`: Needs `{ clientId }` (Your Apple Service ID).
    *   `verificationData`: Needs `{ id_token }` (from the `authorization` object).

## Styling

Basic styles are provided in `signinwith/styles.css`. You can import this file directly into your project.

The buttons have the base class `signinwith-button` and provider-specific classes:
*   `signinwith-button-google` (Note: Google button uses `renderButton`, styling might be limited)
*   `signinwith-button-meta`
*   `signinwith-button-apple`

You can override these styles in your own CSS. The container in the example uses `signinwith-container` for layout.

## Configuration Details

*   **Google:**
    *   Create a project in [Google Cloud Console](https://console.cloud.google.com/).
    *   Set up OAuth 2.0 Credentials (Web application type).
    *   Add your domain(s) to "Authorized JavaScript origins".
    *   Add your backend callback URL (if applicable) to "Authorized redirect URIs".
    *   Get your **Client ID**.
*   **Meta (Facebook):**
    *   Create an App at [Meta for Developers](https://developers.facebook.com/).
    *   Set up "Facebook Login for Business".
    *   Add your domain(s) to the App Domains and Site URL in the app settings.
    *   Get your **App ID**.
*   **Apple:**
    *   Register an App ID and a Service ID in your [Apple Developer Account](https://developer.apple.com/).
    *   Configure "Sign in with Apple" for your App ID.
    *   Associate your domain(s) with the Service ID and verify them.
    *   Get your **Service ID** (used as `clientId`). You might also need a private key for certain backend operations, but `apple-signin-auth` handles basic token verification with just the `clientId` (audience check). Ensure the frontend `redirectURI` is correctly handled (either via a backend route or popup flow).

## License

ISC
