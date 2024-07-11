import { useState, FC, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import StorefrontIcon from "@mui/icons-material/Storefront";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import customTheme from "../../customTheme";
import useSignOut from "react-auth-kit/hooks/useSignOut";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (title: string) => void;
  onClick?: () => void;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(customTheme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar1: FC = () => {
  const theme = useTheme();
  const colors = tokens(customTheme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();
  const signOut = useSignOut();

  const location = useLocation();

  const handleLogout = () => {
    navigate("/admin-login"); // Redirect to the home page or login page after logout
  };

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/admin-buyers":
        setSelected("Manage Buyers");
        break;
      case "/admin-sellers":
        setSelected("Manage Sellers");
        break;
      case "/admin-products":
        setSelected("Manage Products");
        break;
      case "/form":
        setSelected("Profile Form");
        break;
      case "/calendar":
        setSelected("Calendar");
        break;
      case "/faq":
        setSelected("FAQ Page");
        break;
      case "/bar":
        setSelected("Bar Chart");
        break;
      case "/pie":
        setSelected("Pie Chart");
        break;
      case "/line":
        setSelected("Line Chart");
        break;

      case "/admin/AdminDashboard":
        setSelected("Admin Dashboard");
      default:
        setSelected("Dashboard");
        break;
    }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "red", // Replace with your desired background color
        "& .pro-sidebar-inner": {
          background: `#12312C`,
          height: "100vh",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h6" color={colors.grey[100]}>
                  AgriMarket
                </Typography>
                <Box display="flex">
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Administrator
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} paddingBottom={"140%"}>
            <Item
              title="Dashboard"
              to="/admin/AdminDashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Buyers"
              to="/admin-buyers"
              icon={<ShoppingCartCheckoutIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Sellers"
              to="/admin-sellers"
              icon={<StorefrontIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Products"
              to="/admin-products"
              icon={<InventoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>

          <Item
            title="Sign Out"
            to="/admin-login"
            icon={<LogoutIcon />}
            selected={selected}
            setSelected={setSelected}
            onClick={handleLogout} // Add the handleLogout function here
          />
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar1;
