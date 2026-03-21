export const formatNumber = (number: number) => {
	if (number === 0) return 0;
	const absNumber = Math.abs(number);
	if (absNumber < 10000) return number;
	if (absNumber < 1000000) return `${(absNumber / 10000).toFixed(1)}W`;
	return `${(absNumber / 1000000).toFixed(1)}M`;
};
