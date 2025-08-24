import {useLayoutEffect, useRef, useState} from "react";

const Transition = ({ show, animateIn, animateOut, children }) => {
    const [animating, setAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const animatedEl = useRef(null);
    const isMounted = useRef(false);

    useLayoutEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        if (animatedEl.current) {
            animatedEl.current.addEventListener('animationend', () => {
                setAnimating(false);
                if (show) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            })
            setAnimating(true);
        }
    }, [show])

    return (
        <div className={show?animateIn:animateOut} ref={animatedEl}>
            {(animating || (isVisible && !animating)) && children}
        </div>
    )
}

export default Transition