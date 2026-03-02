import { Suspense, Fragment } from "react";
import PublicRoutes from "./PublicRoutes";
import ProtectedRouteAdmin from "./AdminRoutes";
import ProtectedRouteUser from "./UserRoutes";
import ProtectedRouteAuth from "./AuthRoutes";
import { routePublic, routeAdmin, routeUser, routeAuth } from "./Routes";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import RoleBasedLayout from "../layouts/RoleBasedLayout/RoleBasedLayout";
import LoadingSpinner from "../components/LoadingSpinner";

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {routeAuth.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultLayout : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRouteAuth path={route.path}>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedRouteAuth>
                }
              />
            );
          })}

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

          {routeUser.map((route, idx) => {
            const Page = route.page;
            const LayoutUser = route.isSidebar ? RoleBasedLayout : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRouteUser path={route.path}>
                    <DefaultLayout>
                      <LayoutUser>
                        <Page />
                      </LayoutUser>
                    </DefaultLayout>
                  </ProtectedRouteUser>
                }
              />
            );
          })}

          {routeAdmin.map((route, idx) => {
            const Page = route.page;
            const LayoutAdmin = route.isSidebar ? RoleBasedLayout : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRouteAdmin path={route.path}>
                    <DefaultLayout>
                      <LayoutAdmin>
                        <Page />
                      </LayoutAdmin>
                    </DefaultLayout>
                  </ProtectedRouteAdmin>
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
