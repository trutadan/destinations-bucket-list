import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  MenuList,
  MenuItem,
  styled,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authentication";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import Popper from "@mui/base/Popper";
import ClickAwayListener from "@mui/base/ClickAwayListener";

const Popup = styled(Popper)({
  zIndex: 1000,
});

const styles = {
  logo: {
    marginRight: "auto",
  },
  lists: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  },
  user: {
    marginLeft: "12px",
  },
};

export const NavigationBar = () => {
  const { auth, setAuth } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Tab") {
      setAnchorEl(null);
    } else if (event.key === "Escape") {
      anchorEl?.focus();
      setAnchorEl(null);
    }
  };

  const handleLogout = () => {
    logout();

    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("expiration");
    setAuth({});

    navigate("/");
  };

  const handleProfile = () => {
    navigate("/account");
  };

  return (
    <AppBar position="fixed" style={{ top: 0, backgroundColor: "black" }}>
      <Toolbar>
        <Link to="/" style={styles.logo}>
          <img src={logo} alt="Logo" height="40" />
        </Link>
        <div style={styles.lists}>
          {auth.role === "REGULAR" && (
            <>
              <Link
                to="/public-list"
                style={{ marginRight: "16px", color: "white" }}
              >
                PUBLIC LIST
              </Link>
              <span style={{ margin: "0 8px", color: "white" }}>&#8226;</span>
              <Link
                to="/my-bucket-list"
                style={{ marginLeft: "16px", color: "white" }}
              >
                MY BUCKET LIST
              </Link>
            </>
          )}
          {auth.role === "ADMIN" && (
            <Link
              to="/public-list"
              style={{ marginLeft: "16px", color: "white" }}
            >
              PUBLIC LIST
            </Link>
          )}
        </div>
        {auth.usernameOrEmail ? (
          <div>
            <Button
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="outlined"
              onClick={handleClick}
              style={{
                color: "white",
                backgroundColor: "grey",
                border: "1px solid grey",
              }}
              sx={{ borderRadius: 0 }}
            >
              {auth.usernameOrEmail}
            </Button>
            <Popup
              role={undefined}
              id="composition-menu"
              open={open}
              anchorEl={anchorEl}
              disablePortal
              modifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, 4],
                  },
                },
              ]}
              style={{
                color: "white",
                backgroundColor: "grey",
                border: "3px solid black",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  onKeyDown={handleListKeyDown}
                  sx={{ boxShadow: "md", bgcolor: "background.body" }}
                >
                  <MenuItem onClick={handleProfile}>PROFILE</MenuItem>
                  <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Popup>
          </div>
        ) : (
          <Link to="/login">
            <Button
              style={{
                color: "white",
                backgroundColor: "grey",
                border: "1px solid grey",
              }}
            >
              LOGIN
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};
