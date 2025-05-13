import {acceptedService} from "vanilla-cookieconsent";
import type {CookieConsentConfig} from "vanilla-cookieconsent";

const CAT_NECESSARY = "necessary";
const CAT_ANALYTICS = "analytics";
const CAT_FUNCTIONALITY = "functionality";
const CAT_SECURITY = "security";

const AD_STORAGE = "ad_storage"; // Not used
const AD_USER_DATA = "ad_user_data"; // Not used
const AD_PERSONALIZATION = "ad_personalization"; // Not used
const SERVICE_PERSONALIZATION_STORAGE = "personalization_storage"; // Not used for now
const SERVICE_ANALYTICS_STORAGE = "analytics_storage";
const SERVICE_FUNCTIONALITY_STORAGE = "functionality_storage";
const SERVICE_SECURITY_STORAGE = "security_storage";

const updateGtagConsent = () => {
	window.gtag("consent", "update", {
		[AD_STORAGE]: "denied",
		[AD_USER_DATA]: "denied",
		[AD_PERSONALIZATION]: "denied",
		[SERVICE_ANALYTICS_STORAGE]: acceptedService(
			SERVICE_ANALYTICS_STORAGE,
			CAT_ANALYTICS,
		)
			? "granted"
			: "denied",
		[SERVICE_FUNCTIONALITY_STORAGE]: acceptedService(
			SERVICE_FUNCTIONALITY_STORAGE,
			CAT_FUNCTIONALITY,
		)
			? "granted"
			: "denied",
		[SERVICE_PERSONALIZATION_STORAGE]: acceptedService(
			SERVICE_PERSONALIZATION_STORAGE,
			CAT_FUNCTIONALITY,
		)
			? "granted"
			: "denied",
		[SERVICE_SECURITY_STORAGE]: acceptedService(
			SERVICE_SECURITY_STORAGE,
			CAT_SECURITY,
		)
			? "granted"
			: "denied",
	});
};

export type CookieCategoryKey =
	| typeof CAT_NECESSARY
	| typeof CAT_FUNCTIONALITY
	| typeof CAT_ANALYTICS
	| typeof CAT_SECURITY;
export const config: CookieConsentConfig = {
	root: "#cc-container",
	guiOptions: {
		consentModal: {
			layout: "box inline",
			position: "bottom right",
			flipButtons: true,
			equalWeightButtons: false,
		},
		preferencesModal: {
			layout: "box",
			position: "right",
			equalWeightButtons: false,
			flipButtons: false,
		},
	},
	onConsent: () => {
		updateGtagConsent();
	},
	onChange: () => {
		updateGtagConsent();
	},
	categories: {
		[CAT_NECESSARY]: {
			enabled: true,
			readOnly: true,
		},
		[CAT_FUNCTIONALITY]: {
			enabled: false,
			readOnly: false,
			services: {
				[SERVICE_FUNCTIONALITY_STORAGE]: {
					label: "Enables storage that supports the functionality of the website or app e.g. language settings.",
				},
			},
		},
		[CAT_ANALYTICS]: {
			enabled: false,
			readOnly: false,
			autoClear: {
				cookies: [
					{
						name: /^_ga/,
					},
				],
			},
			services: {
				[SERVICE_ANALYTICS_STORAGE]: {
					label: "Google Analytics",
					cookies: [
						{
							name: /^_ga/,
						},
					],
				},
			},
		},
		[CAT_SECURITY]: {
			enabled: false,
			readOnly: false,
			services: {
				[SERVICE_SECURITY_STORAGE]: {
					label: "Enables storage related to security such as authentication functionality, fraud prevention, and other user protection.",
				},
			},
		},
	},
	language: {
		default: "en",
		autoDetect: "browser",
		translations: {
			en: {
				consentModal: {
					title: "Select your cookie preferences",
					description:
						"This website uses cookies to collect information about your browsing activities, which we use to analyse your use of the website. You can accept, reject, or personalise your choices by selecting ‘Manage preferences.’",
					acceptAllBtn: "Accept all",
					acceptNecessaryBtn: "Reject all",
					showPreferencesBtn: "Manage preferences",
				},
				preferencesModal: {
					title: "Consent Preferences Center",
					acceptAllBtn: "Accept all",
					acceptNecessaryBtn: "Reject all",
					savePreferencesBtn: "Save preferences",
					closeIconLabel: "Close modal",
					serviceCounterLabel: "Service|Services",
					sections: [
						{
							title: "Cookie Usage",
							description:
								"This website uses cookies to collect information about your browsing activities, which we use to analyse your use of the website.",
						},
						{
							title: 'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
							description:
								"These cookies are required and are necessary for our website to work as intended.",
							linkedCategory: CAT_NECESSARY,
						},
						{
							title: "Analytics",
							description:
								"These cookies collect information about how users interact with the site, helping us analyze and enhance user experience.",
							linkedCategory: CAT_ANALYTICS,
						},
						{
							title: "Functionality",
							description:
								"Cookies used for functionality allow users to interact with a service or site to access features that are fundamental to that service. Things considered fundamental to the service include preferences like the user’s choice of language, product optimizations that help maintain and improve a service, and maintaining information relating to a user’s session, such as the content of a shopping cart.",
							linkedCategory: CAT_FUNCTIONALITY,
						},
						{
							title: "Security",
							description:
								"Cookies used for security authenticate users, prevent fraud, and protect users as they interact with a service.",
							linkedCategory: CAT_SECURITY,
						},
						{
							title: "More information",
							description:
								"If you choose to 'Accept all', we will also use cookies and data to Develop and improve new services. </br> If you choose to 'Reject all', we will not use cookies for these additional purposes.",
						},
					],
				},
			},
		},
	},
};
