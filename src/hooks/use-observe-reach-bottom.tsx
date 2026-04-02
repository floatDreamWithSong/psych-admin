import { useEffect, useState, type RefObject } from "react";

interface UseObserveReachBottomOptions {
	enabled?: boolean;
	onReachBottom: () => void;
	root?: RefObject<Element | null>;
	rootMargin?: string;
	threshold?: number | number[];
}

export default function useObserveReachBottom({
	enabled = true,
	onReachBottom,
	root,
	rootMargin = "0px",
	threshold = 0,
}: UseObserveReachBottomOptions) {
	const [target, setTarget] = useState<Element | null>(null);

	useEffect(() => {
		if (!enabled || !target || typeof IntersectionObserver === "undefined") {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					onReachBottom();
				}
			},
			{
				root: root?.current ?? null,
				rootMargin,
				threshold,
			},
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, [enabled, onReachBottom, root, rootMargin, target, threshold]);

	return setTarget;
}
