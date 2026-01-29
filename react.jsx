import React, { useEffect, useRef } from 'react';

const FacebookIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 666.667 666.667"><defs><clipPath clipPathUnits="userSpaceOnUse" id="a"><path d="M0 700h700V0H0Z"/></clipPath></defs><g clip-path="url(#a)" transform="matrix(1.33333 0 0 -1.33333 -133.333 800)"><path d="M600 350c0 138.071-111.929 250-250 250S100 488.071 100 350c0-117.245 80.715-215.622 189.606-242.638v166.242h-51.552V350h51.552v32.919c0 85.092 38.508 124.532 122.048 124.532 15.838 0 43.167-3.105 54.347-6.211v-69.254c-5.901.621-16.149.932-28.882.932-40.993 0-56.832-15.528-56.832-55.9V350h81.659l-14.028-76.396h-67.631V101.831C504.073 116.782 600 222.182 600 350" fill="#0866ff"/><path d="M447.918 273.604 461.947 350h-81.66v27.019c0 40.372 15.839 55.899 56.832 55.899 12.733 0 22.98-.31 28.882-.931v69.253c-11.18 3.106-38.51 6.212-54.347 6.212-83.54 0-122.048-39.441-122.048-124.533v-32.92h-51.552v-76.395h51.552V107.362A250.559 250.559 0 0 1 350 100c10.254 0 20.358.632 30.288 1.83v171.774Z" fill="#fff"/></g></svg>
);

const GoogleIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
);

const AppleIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="814" height="1000"><path fill="#FFFFFF" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>
);

// Subcomponent: Discord Icon
const DiscordIcon = () => (
	<svg viewBox="0 -28.5 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" fill="#FFFFFF"/></svg>
);

const GithubIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M12 0C5.37 0 0 5.42 0 12.108c0 5.354 3.438 9.892 8.205 11.496.6.115.82-.264.82-.585 0-.288-.01-1.049-.016-2.06-3.338.737-4.042-1.642-4.042-1.642-.547-1.412-1.336-1.788-1.336-1.788-1.09-.758.083-.743.083-.743 1.205.086 1.84 1.255 1.84 1.255 1.07 1.864 2.807 1.326 3.492 1.015.108-.793.42-1.326.763-1.63-2.665-.31-5.466-1.366-5.466-6.075 0-1.342.465-2.44 1.232-3.3-.124-.311-.535-1.565.118-3.263 0 0 1.007-.33 3.3 1.26a11.23 11.23 0 0 1 3.004-.41c1.02.004 2.047.14 3.004.41 2.29-1.59 3.296-1.26 3.296-1.26.655 1.698.244 2.952.12 3.263.77.86 1.23 1.958 1.23 3.3 0 4.724-2.807 5.76-5.48 6.064.43.379.823 1.126.823 2.27 0 1.64-.015 2.96-.015 3.363 0 .324.216.704.826.583C20.565 22 24 17.46 24 12.108 24 5.42 18.627 0 12 0Z"
			fill="#FFFFFF"
		/>
	</svg>
);

// Subcomponent: Facebook
export function SignInWithFacebook({ service, onSignin, onError }) {
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

	const handleLogin = (e) => {
		e.stopPropagation();
		e.preventDefault();
		window.FB.login(function (response) {
			if (response.authResponse) {
				onSignin('facebook', { accessToken: response.authResponse.accessToken });
			} else {
				onError?.('Failed to log in with Facebook.');
			}
		}, { scope: 'email,public_profile' });
	};

	return <button className="signinwith-button signinwith-button-facebook" onClick={handleLogin}><FacebookIcon />Continue with Facebook</button>;
}

// Subcomponent: Google
export function SignInWithGoogle({ service, onSignin, onError }) {
	const codeClientRef = useRef(null);

	useEffect(() => {
		const scriptId = "google-gsi-script";
		let script = document.getElementById(scriptId);

		const init = () => {
			if (!window.google?.accounts?.oauth2) {
				onError?.("Google OAuth library not available.");
				return;
			}

			codeClientRef.current = window.google.accounts.oauth2.initCodeClient({
				client_id: service.clientId,
				scope: "openid email profile",
				ux_mode: "popup",
				callback: (res) => {
					// res.code is the authorization code (send to backend)
					if (!res?.code) return onError?.("No auth code received from Google.");
					onSignin("google", { code: res.code });
				},
				error_callback: (err) => {
					onError?.(err?.message || "Google sign-in failed.");
				}
			});
		};

		if (!script) {
			script = document.createElement("script");
			script.id = scriptId;
			script.src = "https://accounts.google.com/gsi/client";
			script.async = true;
			script.defer = true;
			script.onload = init;
			script.onerror = () => onError?.("Failed to load Google script.");
			document.body.appendChild(script);
		} else {
			init();
		}
	}, [service.clientId, onSignin, onError]);

	const handleGoogleLogin = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!codeClientRef.current) return onError?.("Google not initialized yet.");
		codeClientRef.current.requestCode();
	};

	return (
		<button className="signinwith-button signinwith-button-google" onClick={handleGoogleLogin}>
			<GoogleIcon />Continue with Google
		</button>
	);
}

// Subcomponent: Apple
export function SignInWithApple({ service, onSignin, onError }) {
	useEffect(() => {
		const scriptId = 'apple-auth-script';
		let script = document.getElementById(scriptId);

		const handleAppleSignInSuccess = (event) => {
			onSignin('apple', event.detail.authorization);
		};
		const handleAppleSignInFailure = (event) => {
			onError?.(event.detail.error || 'Sign in with Apple failed.');
		};

		if (!script) {
			script = document.createElement('script');
			script.id = scriptId;
			script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
			script.async = true;
			script.defer = true;
			script.onload = () => {
				try {
					window.AppleID.auth.init({
						clientId: service.clientId,
						scope: service.scope || 'email name', // Default scope
						redirectURI: service.redirectUri, // Default redirect URI
						usePopup: true,
					});
				} catch (error) {
					console.error("Apple Sign In initialization failed:", error);
					onError?.('Failed to initialize Apple Sign In.');
					return; // Stop if init fails
				}
				// Add event listeners after successful initialization
				document.addEventListener('AppleIDSignInOnSuccess', handleAppleSignInSuccess);
				document.addEventListener('AppleIDSignInOnFailure', handleAppleSignInFailure);
			};
			script.onerror = () => {
				onError?.('Failed to load Apple Sign In script.');
			};
			document.body.appendChild(script);
		} else {
			// If script exists, re-add listeners in case component remounted
			document.removeEventListener('AppleIDSignInOnSuccess', handleAppleSignInSuccess);
			document.removeEventListener('AppleIDSignInOnFailure', handleAppleSignInFailure);
			document.addEventListener('AppleIDSignInOnSuccess', handleAppleSignInSuccess);
			document.addEventListener('AppleIDSignInOnFailure', handleAppleSignInFailure);
		}

		return () => {
			// Cleanup listeners when component unmounts
			document.removeEventListener('AppleIDSignInOnSuccess', handleAppleSignInSuccess);
			document.removeEventListener('AppleIDSignInOnFailure', handleAppleSignInFailure);
		};
	}, [service.clientId, service.scope, service.redirectUri, service.usePopup, onSignin, onError]);

	const handleAppleLogin = async (e) => {
		e.stopPropagation();
		e.preventDefault();
		try {
			if (window.AppleID?.auth) {
				await window.AppleID.auth.signIn();
			} else {
				onError?.('Apple Sign In is not initialized.');
			}
		} catch (error) {
			// This catch might handle errors from the signIn() call itself,
			// though the event listener is the primary mechanism.
			console.error("Apple Sign In error:", error);
			onError?.('An error occurred during Apple Sign In.');
		}
	};
	return <button className="signinwith-button signinwith-button-apple" onClick={handleAppleLogin}><AppleIcon />Continue with Apple</button>;
}

// Subcomponent: Discord
export function SignInWithDiscord({ service, onSignin, onError }) {
	const popupRef = useRef(null);

	useEffect(() => {
		if (typeof BroadcastChannel === 'undefined') {
			console.warn('BroadcastChannel is not supported in this browser. Discord login will not work.');
			return;
		}

		const channel = new BroadcastChannel('signinwith-discord');
		const handleChannelMessage = (event) => {
			const data = event.data;
			if (!data || data.service !== 'discord') return;

			if (data.code) {
				onSignin('discord', { code: data.code, state: data.state });
			} else if (data.error) {
				onError?.(`Discord login error: ${data.error}`);
			} else {
				onError?.('Unknown Discord login error.');
			}

			if (popupRef.current && !popupRef.current.closed) {
				popupRef.current.close();
			}
			window.__signinwithPendingProvider = null;
			window.__signinwithPendingProviderState = null;
		};

		channel.addEventListener('message', handleChannelMessage);

		return () => {
			channel.removeEventListener('message', handleChannelMessage);
			channel.close();
		};
	}, [onSignin, onError]);

	const handleDiscordLogin = (e) => {
		e.stopPropagation();
		e.preventDefault();

		const {
			clientId,
			redirectUri,
			scope = 'identify email',
			state = 'discord',
			prompt = 'consent',
			popupFeatures = 'width=500,height=700',
		} = service; // Default scopes

		if (!clientId || !redirectUri) {
			console.error("Discord service configuration missing clientId or redirectUri.");
			onError?.("Discord configuration is incomplete.");
			return;
		}

		if (typeof BroadcastChannel === 'undefined') {
			onError?.('BroadcastChannel API is not available in this browser.');
			return;
		}

		try {
			const params = new URLSearchParams({
				client_id: clientId,
				redirect_uri: redirectUri,
				response_type: 'code',
				scope: scope,
				state,
			});
			if (prompt) params.append('prompt', prompt);

			const discordAuthUrl = `https://discord.com/api/oauth2/authorize?${params.toString()}`;
			window.__signinwithPendingProvider = 'discord';
			window.__signinwithPendingProviderState = state;
			popupRef.current = window.open(discordAuthUrl, '_blank', popupFeatures);
		} catch (error) {
			console.error("Failed to initiate Discord login:", error);
			onError?.("Failed to initiate Discord login.");
		}
	};

	return (
		<button className="signinwith-button signinwith-button-discord" onClick={handleDiscordLogin}>
			<DiscordIcon />Continue with Discord
		</button>
	);
}

// Subcomponent: GitHub
export function SignInWithGithub({ service, onSignin, onError }) {
	const popupRef = useRef(null);

	useEffect(() => {
		if (typeof BroadcastChannel === 'undefined') {
			console.warn('BroadcastChannel is not supported in this browser. GitHub login will not work.');
			return;
		}

		const channel = new BroadcastChannel('signinwith-github');
		const handleChannelMessage = (event) => {
			const data = event.data;
			if (!data || data.service !== 'github') return;

			if (data.code) {
				onSignin('github', { code: data.code, state: data.state });
			} else if (data.error) {
				onError?.(`GitHub login error: ${data.error}`);
			} else {
				onError?.('Unknown GitHub login error.');
			}

			if (popupRef.current && !popupRef.current.closed) {
				popupRef.current.close();
			}
			window.__signinwithPendingProvider = null;
			window.__signinwithPendingProviderState = null;
		};

		channel.addEventListener('message', handleChannelMessage);

		return () => {
			channel.removeEventListener('message', handleChannelMessage);
			channel.close();
		};
	}, [onSignin, onError]);

	const handleGithubLogin = (e) => {
		e.stopPropagation();
		e.preventDefault();

		const {
			clientId,
			redirectUri,
			scope = 'read:user user:email',
			state = 'github',
			allowSignup = true,
			popupFeatures = 'width=500,height=700',
			codeChallenge,
			codeChallengeMethod,
			login,
		} = service || {};

		if (!clientId || !redirectUri) {
			onError?.('GitHub configuration is incomplete.');
			return;
		}

		if (typeof BroadcastChannel === 'undefined') {
			onError?.('BroadcastChannel API is not available in this browser.');
			return;
		}

		try {
			const params = new URLSearchParams({
				client_id: clientId,
				redirect_uri: redirectUri,
				response_type: 'code',
				scope,
				state,
				allow_signup: allowSignup ? 'true' : 'false',
			});
			if (login) params.append('login', login);
			if (codeChallenge) {
				params.append('code_challenge', codeChallenge);
				if (codeChallengeMethod) {
					params.append('code_challenge_method', codeChallengeMethod);
				}
			}

			const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
			window.__signinwithPendingProvider = 'github';
			window.__signinwithPendingProviderState = state;
			popupRef.current = window.open(githubAuthUrl, '_blank', popupFeatures);
		} catch (error) {
			console.error("Failed to initiate GitHub login:", error);
			onError?.("Failed to initiate GitHub login.");
		}
	};

	return (
		<button className="signinwith-button signinwith-button-github" onClick={handleGithubLogin}>
			<GithubIcon />Continue with GitHub
		</button>
	);
}


// Main SignInWith Component
export default function SignInWith({ onSignin, onError, services, theme = 'light' }) {
	return (
		<div className={`signinwith-container signinwith-theme-${theme}`}>
			{Object.entries(services || {}).map(([key, config]) => { // Added default {} for services
				if (!config) return null; // Skip if config is null/undefined

				switch (key.toLowerCase()) { // Use lowercase key for case-insensitivity
					case 'google':
						return <SignInWithGoogle key={key} service={config} onSignin={onSignin} onError={onError} />;
					case 'facebook':
						return <SignInWithFacebook key={key} service={config} onSignin={onSignin} onError={onError} />;
					case 'apple':
						return <SignInWithApple key={key} service={config} onSignin={onSignin} onError={onError} />;
					case 'discord':
						return <SignInWithDiscord key={key} service={config} onSignin={onSignin} onError={onError} />;
					case 'github':
						return <SignInWithGithub key={key} service={config} onSignin={onSignin} onError={onError} />;
					default:
						console.warn(`Unsupported service key: ${key}`);
						return null;
				}
			})}
		</div>
	);
}
