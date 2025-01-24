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
	const headerTitle = document.getElementById("headerTitle");
	const showcaseTitle = document.getElementById("showcaseTitle");
	const experienceTitle = document.getElementById("experienceTitle");
	const projectsTitle = document.getElementById("projectsTitle");
	const contactTitle = document.getElementById("contactTitle");

	if (
		showcaseTitle &&
		headerTitle &&
		projectsTitle &&
		contactTitle &&
		experienceTitle
	) {
		const allElements = [
			showcaseTitle,
			experienceTitle,
			projectsTitle,
			contactTitle,
		];
		const observers = allElements.map(element => ({
			observer: observer(element, headerTitle, allElements),
			element,
		}));

		observers.forEach(({observer, element}) => {
			observer.observe(element);
		});
	}
};
