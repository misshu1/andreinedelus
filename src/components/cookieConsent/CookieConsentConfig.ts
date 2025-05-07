import type {CookieConsentConfig} from "vanilla-cookieconsent";

declare global {
	interface Window {
		dataLayer: Record<string, any>[];
		gtag: (...args: any[]) => void;
	}
}

export type CookieCategoryKey = "necessary" | "functionality" | "analytics";
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
	categories: {
		necessary: {
			readOnly: true,
		},
		functionality: {},
		analytics: {
			enabled: false,
			readOnly: false,
			services: {
				ga4: {
					label: "Google Analytics",
					onAccept: () => {
						window.gtag("consent", "update", {
							ad_storage: "granted",
							ad_user_data: "granted",
							ad_personalization: "granted",
							analytics_storage: "granted",
						});
						window.gtag("js", new Date());
						window.gtag("config", "G-MMVRDEHQT7", {
							anonymize_ip: true,
						});
					},
					onReject: () => {
						window.gtag("consent", "update", {
							ad_storage: "denied",
							ad_user_data: "denied",
							ad_personalization: "denied",
							analytics_storage: "denied",
						});
					},
					cookies: [
						{
							name: /^_ga/,
						},
					],
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
							linkedCategory: "necessary",
						},
						{
							title: "Analytics Cookies",
							description:
								"These cookies collect information about how users interact with the site, helping us analyze and enhance user experience.",
							linkedCategory: "analytics",
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
