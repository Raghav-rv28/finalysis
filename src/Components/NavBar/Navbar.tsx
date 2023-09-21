"use client";
//NEXT & REACT
import * as React from "react";
import Image from "next/image";
import { useSession, signOut, signIn } from "next-auth/react";
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
import Typography from "@mui/material/Typography";

// Media & Files
import logoOnly from "../../../public/media/logo/logoOnly.png";
import logoWithSlogan from "../../../public/media/logo/logoWithSlogan.png";
import MaterialUISwitch from "./MaterialUISwitch";
import TickerTape from "./TickerTape";
import stockData from "../../app/api/data/global/stocks.json";
import { SearchDialog } from "./SearchDialog";
import Link from "next/link";
// Search Design

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.secondary.main, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.55),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "auto",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

interface PageProps {
  mode: any;
  setMode: any;
}
export default function NavBar({ mode, setMode }: PageProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = React.useState<boolean>(false);
  const [searchResults, setSearchResults] = React.useState<Array<any>>([]);
  const theme = useTheme();
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { data: session, status } = useSession();

  // Effects
  // React.useEffect(() => {
  //   if (searchQuery !== "" && searchRef.current !== undefined) {
  //   }
  // }, [searchQuery, searchRef]);

  const getSearchResults = React.useCallback((query: string) => {
    const temp: Array<any> = [];
    if (query === "") {
      setSearchResults(temp);
      return;
    }
    let counter = 10;
    stockData?.data.map((value, index) => {
      if (counter === 0) {
        return temp;
      }
      if (value.symbol.includes(query.toUpperCase())) {
        console.log(value);
        temp.push(value);
        counter -= 1;
      }
    });
    setSearchResults(temp);
  }, []);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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

  const handleSignInOut = () => {
    if (status === "authenticated") {
      signOut();
    } else {
      signIn();
    }

    handleMenuClose();
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
      <MenuItem onClick={handleSignInOut}>
        {session?.user ? "Sign Out" : "Sign In"}
      </MenuItem>
      {session && (
        <MenuItem>
          {session.user.name}
          <Avatar sx={{ marginLeft: "1rem" }} src={session.user.image}></Avatar>
        </MenuItem>
      )}
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
  const handleSearchClose = React.useCallback((selectedValue: string) => {
    console.log(selectedValue);
    setSearchOpen(false);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        enableColorOnDark
        sx={{ backgroundColor: "primary.dark" }}
        position="static"
      >
        <Toolbar>
          <Link href="/">
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
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <IconButton
              onClick={() => {
                setSearchOpen(true);
              }}
            >
              <SearchIcon />
            </IconButton>
          </Search>
          <SearchDialog
            search={searchResults}
            getSearchResults={getSearchResults}
            open={searchOpen}
            onClose={handleSearchClose}
          />
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
