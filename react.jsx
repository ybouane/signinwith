import React, { useEffect, useRef } from 'react';

// Subcomponent: Meta (Facebook)
const FacebookIcon = () => (
	<svg width="20" height="20" viewBox="0 0 32 32" fill="none">
		<rect width="32" height="32" rx="16" fill="#1877F2"/>
		<path d="M22 16.001h-3v8h-4v-8h-2v-3h2v-2c0-2.206 1.794-4 4-4h3v3h-3c-.553 0-1 .447-1 1v2h4l-1 3z" fill="#fff"/>
	</svg>
);

const GoogleIcon = () => (
	<svg width="20" height="20" viewBox="0 0 32 32" fill="none">
		<g>
			<circle cx="16" cy="16" r="16" fill="#fff"/>
			<path d="M27 16.082c0-.638-.057-1.252-.163-1.837H16v3.478h6.18a5.29 5.29 0 0 1-2.293 3.47v2.885h3.7C25.98 22.13 27 19.345 27 16.082z" fill="#4285F4"/>
			<path d="M16 27c2.43 0 4.47-.805 5.96-2.19l-3.7-2.885c-1.03.69-2.35 1.1-3.77 1.1-2.9 0-5.36-1.96-6.24-4.6h-3.8v2.89A10.997 10.997 0 0 0 16 27z" fill="#34A853"/>
			<path d="M9.76 18.425A6.594 6.594 0 0 1 9.2 16c0-.84.15-1.655.41-2.425v-2.89h-3.8A10.997 10.997 0 0 0 5 16c0 1.73.41 3.37 1.17 4.825l3.59-2.4z" fill="#FBBC05"/>
			<path d="M16 9.6c1.32 0 2.5.455 3.43 1.35l2.57-2.57C20.47 6.81 18.43 6 16 6A10.997 10.997 0 0 0 5.81 10.685l3.8 2.89C10.64 11.56 13.1 9.6 16 9.6z" fill="#EA4335"/>
		</g>
	</svg>
);

const AppleIcon = () => (
	<svg width="20" height="20" viewBox="0 0 32 32" fill="none">
		<g>
			<circle cx="16" cy="16" r="16" fill="#000"/>
			<path d="M22.67 23.13c-.53 1.13-1.16 2.25-2.08 2.27-.89.02-1.18-.72-2.45-.72-1.27 0-1.6.7-2.44.74-.98.04-1.73-1.22-2.27-2.34-1.24-2.54-2.18-7.19.09-8.97.86-.67 2.09-.47 3.36-.47 1.26 0 2.46-.21 3.36.47 1.03.8 1.45 2.22 1.2 3.44-.25 1.22-1.01 1.82-1.01 1.82s1.13.18 1.99 1.13c.86.95.7 2.36.18 3.13zM18.6 8.8c.59-.7 1.01-1.68.89-2.67-.86.04-1.89.57-2.5 1.27-.55.62-1.04 1.62-.86 2.58.97.08 1.88-.49 2.47-1.18z" fill="#fff"/>
		</g>
	</svg>
);
export function SignInWithMeta({ service, onSignin }) {
	useEffect(() => {
		if (!window.FB) {
			window.fbAsyncInit = function () {
				window.FB.init({
					appId: service.appId,
					cookie: true,
					xfbml: true,
					version: 'v19.0'
				});
			};

			(function (d, s, id) {
				let js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "https://connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		}
	}, [service.appId]);

	const handleLogin = () => {
		window.FB.login(function (response) {
			if (response.authResponse) {
				onSignin('meta', { accessToken: response.authResponse.accessToken });
			}
		}, { scope: 'email,public_profile' });
	};

	return <button className="signinwith-button signinwith-button-meta" onClick={handleLogin}><FacebookIcon />Continue with Facebook</button>;
}
// Subcomponent: Google
export function SignInWithGoogle({ service, onSignin }) {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.defer = true;
		script.onload = () => {
			window.google.accounts.id.initialize({
				client_id: service.clientId,
				callback: (res) => {
					onSignin('google', { credential: res.credential });
				}
			});
		};
		document.body.appendChild(script);

		return () => {
			const scriptTag = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
			if (scriptTag) {
				document.body.removeChild(scriptTag);
			}
		};
	}, [service.clientId]);

	const handleGoogleLogin = () => {
		window.google.accounts.id.requestCredential({
			clientId: service.clientId,
			callback: (res) => {
				onSignin('google', { credential: res.credential });
			},
			scopes: ['email', 'profile']
		});
	};

	return (
		<button className="signinwith-button signinwith-button-google" onClick={handleGoogleLogin}>
			<GoogleIcon />Continue with Google
		</button>
	);
}

// Subcomponent: Apple
export function SignInWithApple({ service, onSignin }) {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
		script.onload = () => {
			window.AppleID.auth.init({
				clientId: service.clientId,
				scope: 'email name',
				redirectURI: window.location.origin + '/auth/apple/callback',
				usePopup: true,
			});
			window.addEventListener('AppleIDSignInOnSuccess', (e) => {
				onSignin('apple', e.detail.authorization);
			});
		};
		document.body.appendChild(script);
	}, [service.clientId]);

	return <button className="signinwith-button signinwith-button-apple" onClick={() => window.AppleID.auth.signIn()}><AppleIcon />Continue with Apple</button>;
}

// Main SignInWith Component
export default function SignInWith({ onSignin, services, theme = 'light' }) {
	return (
		<div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
			{Object.entries(services).map(([key, config]) => {
				if (key === 'google') return <SignInWithGoogle key={key} service={config} onSignin={onSignin} />;
				if (key === 'meta') return <SignInWithMeta key={key} service={config} onSignin={onSignin} />;
				if (key === 'apple') return <SignInWithApple key={key} service={config} onSignin={onSignin} />;
				return null;
			})}
		</div>
	);
}