import { useEffect, useRef } from "react";

export default function usePagination(parentRef, childRef, callback) {
    const observer = useRef();

    useEffect(() => {
        if (!parentRef.current || !childRef.current || !callback) return;

        const options = {
            root: parentRef.current,
            rootMargin: '0px',
            threshold: 0
        };

        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                callback();
            }
        }, options);

        const childElement = childRef.current;
        observer.current.observe(childElement);

        return () => {
            if (childElement) {
                observer.current.unobserve(childElement);
            }
        };
    }, [parentRef, childRef, callback]);
}