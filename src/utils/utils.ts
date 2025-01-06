export const encodeFormValues = (data: Record<string, string>) => {
	return Object.keys(data)
		.map(
			key =>
				encodeURIComponent(key) + "=" + encodeURIComponent(data[key]),
		)
		.join("&");
};
