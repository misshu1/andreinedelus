import {ROUTES_TO_SHOW_DYNAMIC_HEADER_TEXT} from "./url";

const observer = (
	element: HTMLElement,
	headerElement: HTMLElement,
	allElements: HTMLElement[],
): IntersectionObserver => {
	let prevScrollPosition = window.scrollY;

	return new IntersectionObserver(
		entries => {
			const headerTitle = document.getElementById("headerTitle");
			const elements = allElements.map(element => ({
				name: element.getAttribute("data-content") ?? "",
				bottom: Math.round(element.getBoundingClientRect().bottom),
			}));

			const negativeInts = elements.filter(({bottom}) => bottom < 0);
			const largestNegative = Math.min(
				...negativeInts.map(({bottom}) => Math.abs(bottom)),
			);
			const currentTitle =
				elements.find(
					({bottom}) =>
						bottom <= 0 && Math.abs(bottom) === largestNegative,
				)?.name ?? "";

			if (entries[0].boundingClientRect.bottom < 120) {
				// Update the header title when target element it's close to the header
				headerElement.setAttribute(
					"data-content",
					element?.getAttribute("data-content") ?? "",
				);
			} else if (
				prevScrollPosition >= window.scrollY &&
				headerTitle?.getAttribute("data-content")
			) {
				// Update the header title when scrolling UP
				headerElement.setAttribute("data-content", currentTitle);
			}

			prevScrollPosition = window.scrollY;
		},
		{rootMargin: "-120px"},
	);
};

export const renderHeaderText = () => {
	if (!ROUTES_TO_SHOW_DYNAMIC_HEADER_TEXT.includes(window.location.pathname))
		return;

	const headerTitle = document.getElementById("headerTitle");
	const showcaseTitle = document.getElementById("showcaseTitle");
	const experienceTitle = document.getElementById("experienceTitle");
	const projectsTitle = document.getElementById("projectsTitle");
	const contactTitle = document.getElementById("contactTitle");
	const allElements: HTMLElement[] = [];

	if (showcaseTitle) allElements.push(showcaseTitle);
	if (experienceTitle) allElements.push(experienceTitle);
	if (projectsTitle) allElements.push(projectsTitle);
	if (contactTitle) allElements.push(contactTitle);

	if (headerTitle) {
		const observers = allElements.map(element => ({
			observer: observer(element, headerTitle, allElements),
			element,
		}));

		observers.forEach(({observer, element}) => {
			observer.observe(element);
		});
	}
};
