import type {CookieCategoryKey} from "@components/cookieConsent/CookieConsentConfig";
import {getCookie} from "vanilla-cookieconsent";

export const hasCookieConsentFor = (category: CookieCategoryKey) => {
	const cookie = getCookie();
	return (
		Array.isArray(cookie.categories) && cookie.categories.includes(category)
	);
};
