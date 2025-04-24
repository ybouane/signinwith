import React, { useEffect } from 'react';

// Subcomponent: Meta (Facebook)
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

	return <button className="signinwith-button signinwith-button-meta" onClick={handleLogin}>Continue with Facebook</button>;
}

// Subcomponent: Google
export function SignInWithGoogle({ service, onSignin }) {
	let btnRef = useRef();
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
			window.google.accounts.id.renderButton(
				ref.current,
				{ theme: 'outline', size: 'large' }
			);
		};
		document.body.appendChild(script);
	}, [service.clientId]);

	return <div className="signinwith-button signinwith-button-google" ref={btnRef}></div>;
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

	return <button className="signinwith-button signinwith-button-apple" onClick={() => window.AppleID.auth.signIn()}>Continue with Apple</button>;
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