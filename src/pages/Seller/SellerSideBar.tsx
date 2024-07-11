import { useState, FC, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import customTheme from "../../customTheme";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (title: string) => void;
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

const SellerSideBar: FC = () => {
  const theme = useTheme();
  const colors = tokens(customTheme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/MyProducts":
        setSelected("My Products ");
        break;
      case "/editSellerProfile":
        setSelected("My Profile");
        break;

      case "/calendar-seller":
        setSelected("Calendar");
        break;

      case "/sellerMap":
        setSelected("Map");
        break;
      default:
        setSelected("Dashboard");
        break;
    }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        color: "#0A490B",
        height: "100vh",
        backgroundColor: "#0A490B", // Replace with your desired background color
        "& .pro-sidebar-inner": {
          backgroundColor: "#0A490B",
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
          color: "#ffff !important",
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
              color: "#0A490B",
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
                  {/* <IconButton onClick={() => console.log("Exit button clicked")}>
                    <CloseOutlinedIcon />
                  </IconButton> */}
                </Box>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              {/* <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box> */}
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"} color={"#0A490B"}>
            <Item
              title="Dashboard"
              to="/sellerDashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="My Profile"
              to="/editSellerProfile"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/CalendarSeller"
              icon={<CalendarMonthIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Calendar"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Analytics"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="My Products"
              to="/MyProducts"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sign Out"
              to="/"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SellerSideBar;
