import React, { useEffect, useRef, useState } from "react";
import user from "../../img/user.png";
import edit from "../../img/edit.png";
import settings from "../../img/settings.png";
import help from "../../img/envelope.png";
import log from "../../img/log-out.png";
import "./Header.css";
import Avatar from "../Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserAvatar = () => {
  const userInfo = useSelector((state)=>state.ApiReducers.userData)
  const [open, setOpen] = useState(false);
  const [data,setData] = useState(userInfo);
  let menuRef = useRef();

      useEffect(()=>{
        setData(userInfo)
      },[userInfo])
      
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        // console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const navigate = useNavigate();

  localStorage.getItem("usersDetails");
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className='dropbox'>
      <div className='menu-container' ref={menuRef}>
        <div
          className='menu-trigger'
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className='avatar'>
            <Avatar
              backgroundColor='#009dff'
              px='10px'
              py='7px'
              borderRadius='50%'
              color='white'
            >
              {data?.name && data?.name?.charAt(0).toUpperCase()}
            </Avatar>
          </div>
        </div>

        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <ul>
            <DropdownItem img={user} text={"My Profile"} />
            <DropdownItem img={edit} text={"Edit Profile"} />
            <DropdownItem img={settings} text={"Settings"} />
            <DropdownItem img={help} text={"Privacy"} />
            <span onClick={logout}>
              <DropdownItem img={log} text={"Logout"} />
            </span>
          </ul>
        </div>
      </div>
    </div>
  );
};
function DropdownItem(props) {
  return (
    <li className='dropdownItem'>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}

export default UserAvatar;
