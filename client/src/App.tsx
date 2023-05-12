import {
  AuthBindings,
  Authenticated,
  ErrorComponent,
  Refine,
} from "@refinedev/core";
// import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import "./index.css";
import { useAuth0 } from "@auth0/auth0-react";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { Login } from "pages/login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout";
import RootLayout from "layouts/RootLayout";
import HomeLayout from "layouts/HomeLayout";
import AddRecord from "pages/records/AddRecord";
import AllRecords from "pages/records/AllRecords";
import StockLayout from "layouts/StockLayout";
import IcepackRecord from "pages/IcepackRecord";
import Profile from "pages/Profile";
import AddStock from "pages/stocks/AddStock";
import AllStocks from "pages/stocks/AllStocks";
import Welcome from "pages/Welcome";

function App() {
  const { isLoading, logout, getIdTokenClaims } = useAuth0();

  if (isLoading) {
    return <span>loading...</span>;
  }

  const authProvider: AuthBindings = {
    login: async () => {
      return {
        success: true,
      };
    },
    logout: async () => {
      logout({ returnTo: window.location.origin });
      return {
        success: true,
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      try {
        const token = await getIdTokenClaims();
        if (token) {
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token.__raw}`,
          };
          return {
            authenticated: true,
          };
        } else {
          return {
            authenticated: false,
            error: {
              message: "Check failed",
              name: "Token not found",
            },
            redirectTo: "/login",
            logout: true,
          };
        }
      } catch (error: any) {
        return {
          authenticated: false,
          error: new Error(error),
          redirectTo: "/login",
          logout: true,
        };
      }
    },
    getPermissions: async () => null,
  };

  return (
    <BrowserRouter>
      {/* <RefineKbarProvider> */}
        <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          routerProvider={routerBindings}
          authProvider={authProvider}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <Layout>
                    <RootLayout />
                    <Outlet />
                  </Layout>
                </Authenticated>
              }
            >
              <Route path="/" element={<Welcome />} />
              <Route path="records" element={<HomeLayout />}>
                <Route path="add_record" element={<AddRecord />} />
                <Route path="all_records" element={<AllRecords />} />
              </Route>
              <Route path="stock" element={<StockLayout />}>
                <Route path="add_stock" element={<AddStock />} />
                <Route path="all_stocks" element={<AllStocks />} />
              </Route>
              <Route path="icepack_record" element={<IcepackRecord />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<ErrorComponent />} />
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>

          {/* <RefineKbar /> */}
          <UnsavedChangesNotifier />
        </Refine>
      {/* </RefineKbarProvider> */}
    </BrowserRouter>
  );
}

export default App;
