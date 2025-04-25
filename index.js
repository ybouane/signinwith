export const verifySigninGoogle = async (config, verificationData) => {
	const res = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${verificationData.credential}`);
	const payload = await res.json();
	if (payload.aud !== config.clientId) return { success: false, error: 'Invalid aud' };
	return payload.email ? { success: true, email: payload.email } : { success: false, error: 'Email not found' };
};

export const verifySigninFacebook = async (config, verificationData) => {
	const res = await fetch(`https://graph.facebook.com/me?fields=email&access_token=${verificationData.accessToken}`);
	const profile = await res.json();
	return profile.email ? { success: true, email: profile.email } : { success: false, error: 'Email not available from Facebook' };
};

export const verifySigninApple = async (config, verificationData) => {
	const { id_token } = verificationData;
	const form = new FormData();
	form.append('id_token', id_token);
	form.append('client_id', config.clientId);
	const res = await fetch('https://appleid.apple.com/auth/verify', {
		method: 'POST',
		body: form,
	});
	const result = await res.json();
	if (!result.success) return { success: false, error: result.error || 'Invalid Apple signin' };
	return result.email ? { success: true, email: result.email } : { success: false, error: 'Email not available from Apple' };
};
export const verifySigninDiscord = async (config, verificationData) => {
	const params = new URLSearchParams();
	params.append('grant_type', 'authorization_code');
	params.append('code', verificationData.code);
	params.append('redirect_uri', config.redirectUri);

	const tokenResponse = await fetch('https://discord.com/api/v10/oauth2/token', {
		method: 'POST',
		body: params,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': `Basic ${btoa(`${config.clientId}:${config.clientSecret}`)}`
		},
	});
	const token = await tokenResponse.json();
	if (!tokenResponse.ok) {
		return { success: false, error: token.error_description || 'Failed to exchange Discord code for token' };
	}
	const accessToken = token.access_token;
	const res = await fetch('https://discord.com/api/v10/users/@me', {
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
	});
	const profile = await res.json();
	return profile.email ? { success: true, email: profile.email } : { success: false, error: 'Email not available from Discord' };
};

export default async function verifySignin (services, service, verificationData) {
	try {
		if (services.google && service === 'google') return await verifySigninGoogle(services.google, verificationData);
		if (services.facebook && service === 'facebook') return await verifySigninFacebook(services.facebook, verificationData);
		if (services.apple && service === 'apple') return await verifySigninApple(services.apple, verificationData);
		if (services.discord && service === 'discord') return await verifySigninDiscord(services.discord, verificationData);
		return { success: false, error: 'Unsupported service' };
	} catch (err) {
		return { success: false, error: err.message || 'Unknown error' };
	}
};
