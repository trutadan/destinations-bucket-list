import "./App.css";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/authentication/RequireAuth";
import Layout from "./components/application/Layout";
import { HomePage } from "./components/application/HomePage";
import { LoginPage } from "./components/authentication/LoginPage";
import { RegisterPage } from "./components/authentication/RegisterPage";
import { UnauthorizedPage } from "./components/application/UnauthorizedPage";
import { UserAccountPage } from "./components/user/UserAccountPage";
import { MissingPage } from "./components/application/MissingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* any user */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* system user */}
        <Route element={<RequireAuth allowedRoles={["ADMIN", "REGULAR"]} />}>
          <Route path="/account" element={<UserAccountPage />} />
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
