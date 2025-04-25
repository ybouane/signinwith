# Sign In With

A simple and straightforward library for adding "Sign in with..." buttons (Google, Facebook/Meta, Apple, Discord) to your web application, handling both the frontend UI (React) and backend verification.

## Features

*   Easy integration for Google, Facebook (Meta), Apple, and Discord sign-in.
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
			redirectUri: '/redirect-oauth.html'
			// Ensure this callback route exists or handle the popup flow appropriately.
		},
		discord: {
			clientId: 'YOUR_DISCORD_CLIENT_ID',
			redirectUri: '/redirect-oauth.html',
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
			<SignInWith services={services} onSignin={handleSignin}  onError={error=>console.error(error)} />
		</div>
	);
}

export default App;
```

### Props for `SignInWith`

*   `services` (Object, required): An object where keys are the service names (`google`, `meta`, `apple`, `discord`) and values are their respective configuration objects.
*   `onSignin` (Function, required): A callback function that receives `(serviceName, data)` when a sign-in attempt is successful on the client-side. `data` contains the necessary information (e.g., `credential` for Google, `accessToken` for Facebook/Discord, `authorization` object for Apple) to be sent to your backend for verification.
*   `onError` (Function, optional): A callback function that receives an error string if there's an issue during the sign-in process.

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
	facebook: {
		// Facebook verification only needs the access token from the frontend
		// No specific backend config needed here for the library function itself
		// but you might need App ID/Secret for other Graph API calls.
	},
	apple: {
		clientId: process.env.APPLE_CLIENT_ID, // Your Service ID (e.g., com.mywebsite.signin)
		// The library uses apple-signin-auth which might require more config
		// depending on how you generated your keys. Refer to its documentation.
	},
	discord: {
		clientId: process.env.DISCORD_CLIENT_ID,
		clientSecret: process.env.DISCORD_CLIENT_SECRET,
		redirectUri: process.env.DISCORD_REDIRECT_URI,
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

### Verification

The main `verifySignin` function delegates to service-specific functions:

*   `verifyGoogleToken(servicesConfig, data)`: Verifies the Google ID token against Google's servers.  It checks the token's signature, expiration, and audience (client ID).
*   `verifyMetaToken(servicesConfig, data)`: Verifies the Meta (Facebook) access token by calling the Facebook Graph API. It checks if the token is valid and associated with your Facebook App.
*   `verifyAppleToken(servicesConfig, data)`: Verifies the Apple authorization code.  It checks the code's validity and audience (client ID).  It may require additional configuration depending on your Apple Developer setup (e.g., private key).
*   `verifyDiscordToken(servicesConfig, data)`: Exchanges the Discord authorization code for an access token, then uses the access token to fetch user information from the Discord API.  It verifies that the code is valid and associated with your Discord application.

Each of these functions returns a promise that resolves to an object with either a `success: true` and the user's `email`, or `success: false` and an `error` message.

## Styling

Basic styles are provided in `signinwith/styles.css`. You can import this file directly into your project.

The buttons have the base class `signinwith-button` and provider-specific classes:
*   `signinwith-button-google` (Note: Google button uses `renderButton`, styling might be limited)
*   `signinwith-button-meta`
*   `signinwith-button-apple`
*   `signinwith-button-discord`

You can override these styles in your own CSS. The container in the example uses `signinwith-container` for layout.

## Configuration Details

*   **Google:**
		*   Create a project in [Google Cloud Console](https://console.cloud.google.com/).
		*   Set up OAuth 2.0 Credentials (Web application type).
		*   Add your domain(s) to "Authorized JavaScript origins".
		*   Add your backend callback URL (if applicable) to "Authorized redirect URIs".
		*   Get your **Client ID**.
*   **Facebook (Meta):**
		*   Create an App at [Facebook for Developers](https://developers.facebook.com/).
		*   Set up "Facebook Login for Business".
		*   Add your domain(s) to the App Domains and Site URL in the app settings.
		*   Get your **App ID**.
*   **Apple:**
		*   Register an App ID and a Service ID in your [Apple Developer Account](https://developer.apple.com/).
		*   Configure "Sign in with Apple" for your App ID.
		*   Associate your domain(s) with the Service ID and verify them.
		*   Get your **Service ID** (used as `clientId`). You might also need a private key for certain backend operations, but `apple-signin-auth` handles basic token verification with just the `clientId` (audience check). Ensure the frontend `redirectUri` is correctly handled (either via a backend route or popup flow).
*   **Discord:**
		*   Create an App at [Discord Developer Portal](https://discord.com/developers/applications).
		*   Set up OAuth2.
		*   Add your redirect URI.
		*   Get your **Client ID** and **Client Secret**.  Store the client secret securely on the backend.

## Redirect URI (Popup)

For Discord and Apple, the `redirectUri` in the frontend configuration should point to a static HTML file (e.g., `redirect-oauth.html`) that handles the OAuth2 code. This file facilitates communication between the popup window and the main application window. Place the following content to be the page that is set as the redirectUri:

```html
<!DOCTYPE html>
<html>
<head>
	<title>Discord Authentication</title>
	<style>
	body {
	  font-family: sans-serif;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 100vh;
	  margin: 0;
	  background-color: #f0f0f0;
	}
	.container {
	  text-align: center;
	  padding: 20px;
	  background-color: #fff;
	  border-radius: 8px;
	  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
  </style>
</head>
<body>
<div class="container">
	<p>You can close this window now.</p>
	<script>
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		const error = urlParams.get('error');

		if (code) {
			window.opener.postMessage({ type: 'discordAuth', code: code }, window.location.origin);
		} else if(error) {
			window.opener.postMessage({ type: 'oauthError', error: error }, window.location.origin);
		}

		// Attempt to close the window
		setTimeout(() => {
			window.close();
		}, 0);
	</script>
</div>
</body>
</html>
```

This HTML file extracts the authorization code (or error) from the URL hash and sends it back to the main window using `postMessage`.  The main application needs to listen for this message and then proceed with the backend verification.  This approach is necessary because Discord's OAuth flow, when initiated in a popup, requires a way to pass the authorization code back to the originating window.