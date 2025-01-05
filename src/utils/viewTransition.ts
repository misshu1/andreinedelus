/** Uncomment the code when View Transition is more widely adopted
 *  and it doesn't crash the browser on mobile
 */
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
				// if (!document.startViewTransition) {
				element.style.opacity = "0";
				element.style.visibility = "hidden";
				element.style.transform = "scale(0.8)";
				headerElement.setAttribute(
					"data-content",
					element?.getAttribute("data-content") ?? "",
				);
				// return;
				// }

				// showcaseTitle.style.viewTransitionName = "header";
				// showcaseTitle.style.visibility = "visible";
				// headerTitle.setAttribute("data-content", "");

				// const transition = document.startViewTransition(() => {
				// 	showcaseTitle.style.viewTransitionName = "none";
				// 	showcaseTitle.style.visibility = "hidden";
				// 	headerTitle.style.viewTransitionName = "header";
				// 	headerTitle.setAttribute(
				// 		"data-content",
				// 		"Andrei Nedelus",
				// 	);
				// });

				// transition.finished.finally(() => {
				// 	headerTitle.style.viewTransitionName = "none";
				// });
			} else if (headerTitle?.getAttribute("data-content")) {
				// if (!document.startViewTransition) {
				element.style.opacity = "1";
				element.style.visibility = "visible";
				element.style.transform = "scale(1)";
				headerElement.setAttribute("data-content", currentTitle);

				// return;
				// }

				// headerTitle.style.viewTransitionName = "header";
				// showcaseTitle.style.visibility = "visible";

				// const transition = document.startViewTransition(() => {
				// 	headerTitle.style.viewTransitionName = "none";
				// 	headerTitle.setAttribute("data-content", "");
				// 	showcaseTitle.style.viewTransitionName = "header";
				// 	showcaseTitle.style.visibility = "visible";

				// });

				// transition.finished.finally(() => {
				// 	showcaseTitle.style.viewTransitionName = "none";
				// });
			}
		},
		{rootMargin: "-120px"},
	);
};

export const handleViewTransitions = () => {
	const headerTitle = document.getElementById("headerTitle");
	const showcaseTitle = document.getElementById("showcaseTitle");
	const projectsTitle = document.getElementById("projectsTitle");

	if (showcaseTitle && headerTitle && projectsTitle) {
		const allElements = [showcaseTitle, projectsTitle];

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
		showcaseTitleObserver.observe(showcaseTitle);
		projectsTitleObserver.observe(projectsTitle);
	}
};
