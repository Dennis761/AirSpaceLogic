import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for infinite scrolling.
 * @param {Function} fetchMore - Function to fetch more items when the target is in view.
 * @param {boolean} hasMore - Indicates whether there are more items to load.
 * @returns {Object} ref - The ref to attach to the target element.
 */
const useInfiniteScroll = (fetchMore, hasMore) => {
    const observerRef = useRef(null);
    const targetRef = useRef(null);

    useEffect(() => {
        if (!targetRef.current || !hasMore) return;

        const observerCallback = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                fetchMore();
            }
        };

        observerRef.current = new IntersectionObserver(observerCallback, {
            root: null, 
            rootMargin: "0px",
            threshold: 1.0, 
        });

        const currentTarget = targetRef.current;
        observerRef.current.observe(currentTarget);

        return () => {
            if (observerRef.current && currentTarget) {
                observerRef.current.unobserve(currentTarget);
            }
        };
    }, [fetchMore, hasMore]);

    return { targetRef };
};

export default useInfiniteScroll;