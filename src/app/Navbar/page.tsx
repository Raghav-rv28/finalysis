//NEXT & REACT
import * as React from "react";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
//MUI IMPORTS
import { styled, alpha, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";

// Media & Files
import logoOnly from "../../../public/media/logo/logoOnly.png";
import logoWithSlogan from "../../../public/media/logo/logoWithSlogan.png";
import MaterialUISwitch from "./Components/MaterialUISwitch";
import {
  Search,
  StyledInputBase,
  SearchIconWrapper,
} from "./Components/Search";
import TickerTape from "./Components/TickerTape";
// Search Design

export default function NavBar({ mode, setMode }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { data: session, status } = useSession();
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (status === "authenticated") {
      setAnchorEl(event.currentTarget);
    } else {
      signIn();
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        enableColorOnDark
        sx={{ backgroundColor: "primary.dark" }}
        position="static"
      >
        <Toolbar>
          {lessThanSmall ? (
            <Image
              src={logoOnly}
              width={84}
              alt="Logo Only"
              color="secondary"
            />
          ) : (
            <Image
              src={logoWithSlogan}
              alt="Logo With Slogan"
              color="secondary"
            />
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Under Construction..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="secondary"
            >
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon fontSize="large" />
              </Badge>
            </IconButton>
            {/* Dark Mode */}
            <FormGroup>
              <FormControl>
                <FormControlLabel
                  label=""
                  onChange={() =>
                    setMode((prev: string) =>
                      prev === "light" ? "dark" : "light"
                    )
                  }
                  checked={mode === "light"}
                  control={<MaterialUISwitch sx={{ m: 2 }} />}
                />
              </FormControl>
            </FormGroup>
            <Avatar
              variant="rounded"
              alt="login"
              color="secondary"
              sx={{ bgcolor: "secondary.main", width: 56, height: 56 }}
              onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                handleProfileMenuOpen(event)
              }
            >
              <AccountCircle fontSize="large" />
            </Avatar>
          </Box>
          {/* MOBILE MENU BUTTON */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <TickerTape tickers={["spy"]} />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
