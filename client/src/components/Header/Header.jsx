import React from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkIcon from "@mui/icons-material/Work";
import "./Header.css";
import SecurityIcon from '@mui/icons-material/Security';
import UserAvatar from "./UserAvatar";

const Header = () => {

  return (
    <div className="header-main">
      <div className="header-left">
        <div className="header-logo"><SecurityIcon sx={{fontSize:"60px"}}/></div>
        <div className="header-leftsidetext">Securing Digital World!</div>
      </div>
      <div className="right-side">
        <div style={{ marginRight: "100px" }}>
          <PersonSearchIcon style={{ fontSize: "45px" }} />
          <div style={{fontSize:"15px", fontWeight:"bold"}}>Search Candidate</div>
        </div>
        <div className="post-new-job">
        <WorkIcon
          style={{ fontSize: "45px", marginRight: "100px" }}
          
        />
        <div style={{fontSize:"15px", fontWeight:"bold"}}>Post New Jobs</div></div>
        <UserAvatar />
         </div>
      </div>
  );
};

export default Header;
