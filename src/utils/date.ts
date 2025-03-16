type Wording = {
	singular: string;
	plural: string;
};

const monthWording: Wording = {
	singular: "mo",
	plural: "mos",
} as const;
const yearWording: Wording = {
	singular: "yr",
	plural: "yrs",
} as const;

const getWords = (monthCount: number) => {
	const getPlural = (number: number, word: Wording) =>
		number === 1 ? word.singular : word.plural;

	const months = monthCount % 12;
	const years = Math.floor(monthCount / 12);
	const result = [];

	if (years) result.push(`${years} ${getPlural(years, yearWording)}`);
	if (months) result.push(`${months} ${getPlural(months, monthWording)}`);

	return result.join(" ");
};

export const yearsOfExperience = (dateRange: string) => {
	const [startDate, endDate] = dateRange.split(" - ");
	const initialDate = new Date(startDate);
	const lastDayOfMonth = (date: Date) =>
		new Date(date.getFullYear(), date.getMonth() + 1, 1);

	const finalDate =
		endDate.toLocaleLowerCase() === "present"
			? lastDayOfMonth(new Date())
			: lastDayOfMonth(new Date(endDate));
	const totalMonths = Math.max(
		(finalDate.getFullYear() - initialDate.getFullYear()) * 12 +
			finalDate.getMonth() -
			initialDate.getMonth(),
		0,
	);

	return getWords(totalMonths);
};
