import { Outlet, useLocation } from "react-router-dom";
import { isExperienciasTransitionGroup } from "@/lib/navigation";

export function PageTransition() {
  const location = useLocation();
  const transitionGroup = isExperienciasTransitionGroup(location.pathname)
    ? "experiencias"
    : "site";

  return (
    <div
      className="page-transition-root"
      data-transition-group={transitionGroup}
    >
      <Outlet />
    </div>
  );
}
