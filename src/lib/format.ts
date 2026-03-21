export const formatNumber = (number?: number) => {
	if (number === 0) return "0";
	if (!number) return "-";
	const absNumber = Math.abs(number);
	if (absNumber < 1000) return `${number}`;
	if (absNumber < 10000) return `${(absNumber / 1000).toFixed(1)}K`;
	if (absNumber < 1000000) return `${(absNumber / 10000).toFixed(1)}W`;
	return `${(absNumber / 1000000).toFixed(1)}M`;
};

// export const formatRate2Percentage = (rate?: number) => {
// 	if (!rate) return "- %";
// 	return `${rate > 0 ? "+" : ""}${(rate * 100).toFixed(1)} %`;
// };

export const formatRate2Percentage = (rate?: number) => {
	return rate ? rate * 100 : 0;
};
