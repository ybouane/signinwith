import { OAuth2Client } from 'google-auth-library';
import appleSigninAuth from 'apple-signin-auth';

export const verifySigninGoogle = async (config, verificationData) => {
	const client = new OAuth2Client(config.clientId);
	const ticket = await client.verifyIdToken({
		idToken: verificationData.credential,
		audience: config.clientId,
	});
	const payload = ticket.getPayload();
	return payload.email ? { success: true, email: payload.email } : { success: false, error: 'Email not found' };
};

export const verifySigninMeta = async (config, verificationData) => {
	const res = await fetch(`https://graph.facebook.com/me?fields=email&access_token=${verificationData.accessToken}`);
	const profile = await res.json();
	return profile.email ? { success: true, email: profile.email } : { success: false, error: 'Email not available from Facebook' };
};

export const verifySigninApple = async (config, verificationData) => {
	const { id_token } = verificationData;
	const result = await appleSigninAuth.verifyIdToken(id_token, {
		audience: config.clientId,
		ignoreExpiration: true,
	});
	return result.email ? { success: true, email: result.email } : { success: false, error: 'Email not available from Apple' };
};

export default verifySignin = async (services, service, verificationData) => {
	try {
		if (service === 'google') return await verifySigninGoogle(services.google, verificationData);
		if (service === 'meta') return await verifySigninMeta(services.meta, verificationData);
		if (service === 'apple') return await verifySigninApple(services.apple, verificationData);
		return { success: false, error: 'Unsupported service' };
	} catch (err) {
		return { success: false, error: err.message || 'Unknown error' };
	}
};
