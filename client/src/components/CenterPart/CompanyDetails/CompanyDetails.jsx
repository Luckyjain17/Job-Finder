import React, { useEffect, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import "./CompanyDetails.css";
import { useSelector, useDispatch } from "react-redux"
import { setUserDetails } from '../../../Redux/actions/actions';;


const CompanyDetails = () => {
  const userInfo = useSelector((state)=>state.ApiReducers.userData)
  const [website, setWebSite] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfEmployes, setNumberOfEmployes] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState(userInfo);
  const dispatch = useDispatch()
  const [isUpdate, setIsUpdate] = useState(false);
    const [open, setOpen] = React.useState(false);
  

const handleSave = () =>{
  setIsEdit(true)
  setDescription(userData?.description)
  setWebSite(userData?.website)
  setNumberOfEmployes(userData?.numberOfEmployes)
}
 const onClose= () =>{
      setOpen(false)
    }

useEffect(()=>{
  fetchDetails()
},[isEdit])

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

  const updateDetails = async () => {
    // console.log("alldata*********",website, description, numberOfEmployes);
    if (!userData || !userData._id) {
        console.log("Missing userData or userData._id");
        return;
      }
      else{
        setIsEdit(false)
      }

      let objData = {website, description, numberOfEmployes}
    await fetch(`http://localhost:4000/addData/${userData?._id}`, {
      method: "Put",
      body: JSON.stringify(objData),   
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res)=>{  
      console.log("res",res)
      if(res !== undefined){
        console.log("NotUndefine",objData)
        dispatch(setUserDetails(objData))
        setOpen(true)
     res.status === 200 ? setIsUpdate(true) : setIsUpdate(false)  
      }
  }).catch((err)=>{
      console.log(err)
  })
    // result = await result.json();
    // console.log("UPDATERESULT",result);
    // console.log("WEBSITEEEEEEEEEEEEEEEEEEEEEEEEEE",userData.website, userData.description, userData.numberOfEmployes)
  };

//   const updateDetails = async () => {
//     console.log("alldata*********",website, description, numberOfEmployes);
//     let bodyData = {"website": website, "description": description, "numberOfEmployes": numberOfEmployes}
//     console.log("bodyData ----------- ", bodyData);
//     let result = await fetch(`http://localhost:4000/addData/${userData && userData._id}`, {
//       method: "Put",
//       body: (bodyData),   
//       header: {
//         "Content-Type": "application/json"
//       }
//     });
//     result = await result.json();
//     console.log("UPDATERESULT",result);
//   };

  // useEffect(() => {
  //   let result = localStorage.getItem("usersDetails");
  //   let res = JSON.parse(result);
  //   setUserData(res);
  // }, []);

  return (
    <div className='company-details-button'>
      <div className='input-edit'></div>
      {!isEdit && 
      <div>
      <div className="center-user-data">
        <div className="center-user-text">
        Website:
          <span className="fetch-data">
         {userData && userData.website}
          </span>
      </div>
      </div>
      <div className="center-user-data">
        <div lassName="center-user-text">
        Description: 
        <span className="fetch-data">
        {userData && userData.description}
        </span>
      </div>
      </div>
      <div className="center-user-data">
      <div lassName="center-user-text">
      Number Of Employes: 
      <span className="fetch-data">
      {userData && userData.numberOfEmployes}
      </span>
      </div>
      </div>  
      </div>  
        }
        
      {isEdit && <form action='submit'>
        <label>
          <div className='company-details-input'>
            <div>Website</div>
            <input
              type='text'
              value={website}
              onChange={(e) => {
                setWebSite(e.target.value);
              }}
            />
          </div>
          <div className='company-details-input'>
            <div className="name">Description</div>
            <div className='input-edit'>
              <input
                type='text'
              value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='company-details-input'>
            <div>Number of employes</div>
            <input
              type='text'
              value={numberOfEmployes}
              onChange={(e) => {
                setNumberOfEmployes(e.target.value);
              }}
            />
            
          </div>
        </label>
      </form>}
      {!isEdit && <button  onClick={handleSave} className="edit-button">Edit</button>}
      {isEdit && <button onClick={updateDetails} className="edit-button">Save</button>}
      {/* {console.log(website, description, numberOfEmployes)} */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message="Updated"
        onClose={onClose}
      />
    </div>
  );
};

export default CompanyDetails;
