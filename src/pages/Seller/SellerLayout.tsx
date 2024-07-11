import React, { FC, ReactNode } from "react";
import SellerSideBar from "./SellerSideBar"; // Adjust the import path accordingly
import { Box } from "@mui/material";
import BackGroundImage from "../../assets/sellerDb.jpg"

interface SellerLayoutProps {
  children: ReactNode;
}

const SellerLayout: FC<SellerLayoutProps> = ({ children }) => {
  return (
    <Box display="flex" bgcolor={"#E5FFDC"}>
      <SellerSideBar />
      <Box component="main" flexGrow={2} p={3}>
        {children}
      </Box>
    </Box>
  );
};

export default SellerLayout;
