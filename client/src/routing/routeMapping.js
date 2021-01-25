import SignUpLogin from "../views/SignUpLogin/SignUpLogin";
import Dashboard from "../views/Dashboard/Dashboard";

const routeMapping = [
  {
    component: SignUpLogin,
    path: "/",
  },
  {
    component: Dashboard,
    path: "/dashboard",
    private: true,
  },
];

export default routeMapping;
