import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import "./LeftRightBar.css";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Setting from "../../img/settings.png";
import Logout from "../../img/log-out.png";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import WorkIcon from "@mui/icons-material/Work";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import UpdateProfile from "../CenterPart/UpdateProfile/UpdateProfile";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from '../../Redux/actions/actions';
import CompanyDetails from "../CenterPart/CompanyDetails/CompanyDetails";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const LeftBar = () => {
  const[updateProfile,setUpdateProfile] = useState(false)
  const[companyDetails,setCompanyDetails] = useState(false)
  const userInfo = useSelector((state)=>state.ApiReducers.userData)
  const [userData, setUserData] = useState(userInfo);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };


  let fetchDetails = async ()=>{
    const id = localStorage.getItem("userId")
  await fetch(`http://localhost:4000/userInfo/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res)=>{
    let resJson = await res.json()
    console.log("resFetch",resJson)
    resJson !== undefined && setUserData(resJson.data)
    dispatch(setUserDetails(resJson.data))
  }).catch((err)=>{
    console.log("errInGetData",err)
  })
};


  const handleProfile = (type) => {
    if(type === "updateProfile"){
      setUpdateProfile(true)
      setCompanyDetails(false)
    }
    else if(type === "companyDetails"){
      setUpdateProfile(false)
      setCompanyDetails(true)
    }
  };


  useEffect(() => {
    let result = localStorage.getItem("usersDetails");
    let res = JSON.parse(result);
    setUserData(res);
  }, []);

  useEffect(()=>{
    fetchDetails()
  },[])

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Item
              sx={{
                backgroundColor: "#f2f4f7",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <div>
                <div className='avatar'>
                  <Avatar
                    backgroundColor='#009dff'
                    px='15px'
                    py='10px'
                    borderRadius='50%'
                    color='white'
                    fontSize='25px'
                  >
                    {userData?.name && userData?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </div>
                <div className='user-name'>{userData && userData?.name}</div>
                <div className='company-details'>
                  <ApartmentIcon className='company-details-icon' />
                  <div className='company-details-text'>
                    &nbsp;Company details
                  </div>
                </div>
                <div className='add-job'>
                  <NoteAltIcon className='add-job-icon' />
                  <div>&nbsp;Add a Job</div>
                </div>
                <div className='jobs'>
                  <WorkIcon className='jobs-icon' />
                  <div></div>&nbsp;Jobs
                </div>
                <div className='jobs-child1'>Posted Jobs</div>
                <div className='jobs-child2'>Drafts</div>
                <div className='jobs-child3'>Closed Jobs</div>
                <div className='application'>
                  <AddCircleIcon className='application-icon' />
                  <div>&nbsp;Application</div>
                </div>
                <div className='application-child1'>View Application</div>
                <div className='application-child2'>Shortlisted Candidates</div>
                <div className='application-child3'>Hired Candidates</div>
                <div className='application-child4'>Rejected Candidates</div>
                <div className='setting'>
                  <img src={Setting} alt="Setting" className='setting-img' />
                  <div>&nbsp;&nbsp;Settings</div>
                </div>
                <div className='logout' onClick={logout}>
                  <img src={Logout} alt="logout" className='logout-img' />
                  <div>&nbsp;Logout</div>
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <div className="main-screen-center">
          <button className="main-screen-button" onClick={() => handleProfile("updateProfile")}>Update profile</button>
          <button className="main-screen-button" onClick={() => handleProfile("companyDetails")}>Company Details</button>
          <button className="main-screen-button">Contact Details</button>
          <button className="main-screen-button">Privacy</button>
          <button className="main-screen-button">Security</button>
          </div>
          <Card sx={{ minWidth: 275 }} className="card">
      <CardContent>
        {(updateProfile && userData?.name !== "") ? <UpdateProfile /> : (companyDetails && userData?.name !== "") ? <CompanyDetails /> : <UpdateProfile />}
      </CardContent>
    </Card>
          </Item>
          </Grid>
          <Grid item xs>
            <Item
              sx={{
                height: "636px",
                backgroundColor: "#f2f4f7",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            ></Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LeftBar;
