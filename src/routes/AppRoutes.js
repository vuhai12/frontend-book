import { Suspense, Fragment } from "react";
import PublicRoutes from "./PublicRoutes";

import { routePublic } from "./Routes";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import LoadingSpinner from "../components/LoadingSpinner";

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {routePublic.map((route, idx) => {
            const Page = route.page;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PublicRoutes path={route.path}>
                    <DefaultLayout>
                      <Page />
                    </DefaultLayout>
                  </PublicRoutes>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
