import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { Outlet, useLocation, useOutlet } from "react-router-dom";
import { useRouteScrollOnEnter } from "@/hooks/useRouteScroll";
import { getRouteTransitionGroup } from "@/lib/navigation";
import { compositorStyle } from "@/lib/motion-presets";
import { getPageMotion } from "@/lib/route-motion";

export function PageTransition() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();
  const onPageEnterComplete = useRouteScrollOnEnter();
  const prevPathRef = useRef(location.pathname);

  const group = getRouteTransitionGroup(prevPathRef.current, location.pathname);
  const { variants } = getPageMotion(group);

  useLayoutEffect(() => {
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  if (reduceMotion) {
    return <Outlet />;
  }

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={location.pathname}
        className="page-transition-root"
        style={compositorStyle}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        onAnimationComplete={(definition) => {
          if (definition === "animate") {
            onPageEnterComplete();
          }
        }}
      >
        {outlet}
      </m.div>
    </AnimatePresence>
  );
}
