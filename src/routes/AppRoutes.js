import React, { Fragment } from "react";
import PublicRoutes from "./PublicRoutes";
import ProtectedRouteAdmin from "./AdminRoutes";
import ProtectedRouteUser from "./UserRoutes";
import ProtectedRouteAuth from "./AuthRoutes";
import { routePublic, routeAdmin, routeUser, routeAuth } from "./Routes";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import RoleBasedLayout from "../layouts/RoleBasedLayout/RoleBasedLayout";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {routeAuth.map((route, idx) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? DefaultLayout : Fragment;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRouteAuth
                  // pathCurrent={pathCurrent}
                  path={route.path}
                >
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
                <PublicRoutes
                  // pathCurrent={pathCurrent}
                  path={route.path}
                >
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
                <ProtectedRouteUser
                  // pathCurrent={pathCurrent}
                  path={route.path}
                >
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
                <ProtectedRouteAdmin
                  // pathCurrent={pathCurrent}
                  path={route.path}
                >
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
    </>
  );
};

export default AppRoutes;
