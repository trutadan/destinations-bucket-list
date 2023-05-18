import "./App.css";
import { useLocation } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";
import { NavigationBar } from "./components/application/NavigationBar";
import RequireAuth from "./components/authentication/RequireAuth";
import Layout from "./components/application/Layout";
import { HomePage } from "./components/application/HomePage";
import { LoginPage } from "./components/authentication/LoginPage";
import { RegisterPage } from "./components/authentication/RegisterPage";
import { UnauthorizedPage } from "./components/application/UnauthorizedPage";
import { UserAccountPage } from "./components/user/UserAccountPage";
import { MissingPage } from "./components/application/MissingPage";
import { CancelUserAccountContainer } from "./components/user/CancelUserAccountContainer";
import { EditUserAccountPage } from "./components/user/EditUserAccountPage";

function LayoutsBasedOnNavigationBar() {
  const includedPaths = ["/"];
  const location = useLocation();

  if (includedPaths.includes(location.pathname))
    return (
      <>
        <NavigationBar />
        <Outlet />
      </>
    );

  return <Layout />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutsBasedOnNavigationBar />}>
        {/* any user */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* system user */}
        <Route element={<RequireAuth allowedRoles={["ADMIN", "REGULAR"]} />}>
          <Route path="/account" element={<UserAccountPage />} />
          <Route path="/account/edit" element={<EditUserAccountPage />} />
          <Route
            path="/account/cancel"
            element={<CancelUserAccountContainer />}
          />
        </Route>

        {/* admin */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />} path="/admin">
          {/* Add admin-specific routes here */}
        </Route>

        {/* catch all */}
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
