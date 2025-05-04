export const encodeFormValues = (data: Record<string, string>) => {
	return Object.keys(data)
		.map(
			key =>
				encodeURIComponent(key) + "=" + encodeURIComponent(data[key]),
		)
		.join("&");
};

export const onContentReady = async () => {
	let ready = false;
	await Promise.allSettled([
		new Promise(resolve => {
			if (
				document.readyState === "complete" ||
				document.readyState === "interactive"
			) {
				resolve(null);
			} else {
				document.addEventListener("DOMContentLoaded", resolve);
			}
		}),
		document.fonts.ready,
	]).then(results => {
		ready = results.every(result => result.status === "fulfilled");
	});

	return ready;
};

export const onContentLoaded = async (
	element: HTMLElement,
	className: string,
	calback?: () => void,
) => {
	const ready = await onContentReady();

	if (ready && element) {
		// Start fade animation after content loaded and fonts loaded
		element.classList.add(className);
	} else {
		// If some error happend when loading the page hide the element
		if (element) element.classList.add(className);
	}
	element?.addEventListener("animationend", () => {
		// Remove className when animation ended
		element.classList.remove(className);
		calback && calback();
	});
};

export const isPortrait = () => window.innerHeight > window.innerWidth;
export const isLandscape = () => window.innerWidth > window.innerHeight;
