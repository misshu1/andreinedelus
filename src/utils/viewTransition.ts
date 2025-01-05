export const handleViewTransitions = () => {
	const headerTitle = document.getElementById("headerTitle");
	const showcaseTitle = document.getElementById("showcaseTitle");

	if (showcaseTitle && headerTitle) {
		const observer = new IntersectionObserver(
			async entries => {
				if (entries[0].boundingClientRect.bottom < 120) {
					if (!document.startViewTransition) {
						showcaseTitle.setAttribute("data-content", "");
						headerTitle.setAttribute(
							"data-content",
							"Andrei Nedelus",
						);
						return;
					}

					showcaseTitle.style.viewTransitionName = "header";
					showcaseTitle.setAttribute(
						"data-content",
						"Andrei Nedelus",
					);
					headerTitle.setAttribute("data-content", "");

					const transition = document.startViewTransition(() => {
						showcaseTitle.style.viewTransitionName = "none";
						showcaseTitle.setAttribute("data-content", "");
						headerTitle.style.viewTransitionName = "header";
						headerTitle.setAttribute(
							"data-content",
							"Andrei Nedelus",
						);
					});

					transition.finished.finally(() => {
						headerTitle.style.viewTransitionName = "none";
					});
				} else if (headerTitle.getAttribute("data-content")) {
					if (!document.startViewTransition) {
						headerTitle.setAttribute("data-content", "");
						showcaseTitle.setAttribute(
							"data-content",
							"Andrei Nedelus",
						);
						return;
					}

					headerTitle.style.viewTransitionName = "header";
					headerTitle.setAttribute("data-content", "Andrei Nedelus");
					showcaseTitle.setAttribute("data-content", "");

					const transition = document.startViewTransition(() => {
						headerTitle.style.viewTransitionName = "none";
						headerTitle.setAttribute("data-content", "");
						showcaseTitle.style.viewTransitionName = "header";
						showcaseTitle.setAttribute(
							"data-content",
							"Andrei Nedelus",
						);
					});

					transition.finished.finally(() => {
						showcaseTitle.style.viewTransitionName = "none";
					});
				}
			},
			{rootMargin: "-120px"},
		);

		showcaseTitle && observer.observe(showcaseTitle);
	}
};
