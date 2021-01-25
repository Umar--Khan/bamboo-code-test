import { useState, useMemo } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../views/NotFound/NotFound";
import routeMapping from "./routeMapping";
import { UserContext } from "../context/UserContext";

const Routes = () => {
  const [userData, setUserData] = useState(null);
  const userValue = useMemo(() => ({ userData, setUserData }), [
    userData,
    setUserData,
  ]);

  return (
    <Switch>
      <Route path="/not-found" component={NotFound} exact />
      <UserContext.Provider value={userValue}>
        {routeMapping.map(({ path, component }) => {
          return (
            <Route
              key={`route-${path}`}
              component={component}
              path={path}
              exact
            />
          );
        })}
      </UserContext.Provider>
      <Route exact path="*" render={() => <div>Not Found</div>} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
