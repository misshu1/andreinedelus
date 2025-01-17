const observer = (
	element: HTMLElement,
	headerElement: HTMLElement,
	allElements: HTMLElement[],
): IntersectionObserver => {
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
					({bottom}) => Math.abs(bottom) === largestNegative,
				)?.name ?? "";

			if (entries[0].boundingClientRect.bottom < 120) {
				headerElement.setAttribute(
					"data-content",
					element?.getAttribute("data-content") ?? "",
				);
			} else if (headerTitle?.getAttribute("data-content")) {
				headerElement.setAttribute("data-content", currentTitle);
			}
		},
		{rootMargin: "-120px"},
	);
};

export const renderHeaderText = () => {
	const headerTitle = document.getElementById("headerTitle");
	const showcaseTitle = document.getElementById("showcaseTitle");
	const projectsTitle = document.getElementById("projectsTitle");
	const contactTitle = document.getElementById("contactTitle");

	if (showcaseTitle && headerTitle && projectsTitle && contactTitle) {
		const allElements = [showcaseTitle, projectsTitle, contactTitle];

		const showcaseTitleObserver = observer(
			showcaseTitle,
			headerTitle,
			allElements,
		);
		const projectsTitleObserver = observer(
			projectsTitle,
			headerTitle,
			allElements,
		);
		const contactTitleObserver = observer(
			contactTitle,
			headerTitle,
			allElements,
		);
		showcaseTitleObserver.observe(showcaseTitle);
		projectsTitleObserver.observe(projectsTitle);
		contactTitleObserver.observe(contactTitle);
	}
};
