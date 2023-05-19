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
import { DestinationPublicGetAll } from "./components/destination/DestinationPublicGetAll";
import { DestinationAddPublic } from "./components/destination/DestinationPublicAdd";
import { DestinationPrivateAdd } from "./components/destination/DestinationPrivateAdd";
import { DestinationPrivateGetAll } from "./components/destination/DestinationPrivateGetAll";
import { DestinationAddPublicToBucket } from "./components/destination/DestinationAddPublicToBucket";
import { DestinationPrivateUpdate } from "./components/destination/DestinationPrivateUpdate";
import { DestinationPrivateDelete } from "./components/destination/DestinationPrivateDelete";

function LayoutsBasedOnNavigationBar() {
  const includedPaths = ["/", "/public-list", "/admin/add-public", "/user/my-bucket-list", "/user/add-private"];
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
          <Route path="/public-list" element={<DestinationPublicGetAll/>}/>
          
        </Route>

        {/* admin */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />} path="/admin">
          {/* Add admin-specific routes here */}
          <Route path="/admin/add-public" element={<DestinationAddPublic/>}/>
        </Route>

        {/* user */}
        <Route element={<RequireAuth allowedRoles={["REGULAR"]}/>} path="/user">
          {/* Add user-specific routes here */}
          <Route path="/user/add-private" element={<DestinationPrivateAdd/>}/>
          <Route path="/user/add-public/:id" element={<DestinationAddPublicToBucket/>}/>
          <Route path="/user/my-bucket-list" element={<DestinationPrivateGetAll/>}></Route>
          <Route path="/user/update-private/:id" element={<DestinationPrivateUpdate/>}></Route>
          <Route path="/user/delete-private/:id" element={<DestinationPrivateDelete/>}></Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
