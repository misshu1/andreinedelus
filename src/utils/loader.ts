import {renderHeaderText} from "@utils/header";
import {onContentLoaded} from "@utils/utils";

export const hideGlobalLoader = () => {
	const loader = document.getElementById("globalLoading");
	if (loader) {
		const onLoad = () => {
			loader.style.display = "none";
			renderHeaderText();
		};

		onContentLoaded(loader, "hidden", onLoad);
	}
};
