import React,{useEffect, useState} from 'react'
import "./UpdateProfile.css"
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../../Redux/actions/actions';
import Snackbar from '@mui/material/Snackbar';


const UpdateProfile = () => {
  const userInfo = useSelector((state)=>state.ApiReducers.userData)
  const dispatch = useDispatch()
    const [userData, setUserData] = useState(userInfo);
    const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [designation, setDesignation] = useState("");
    const [dob, setDob] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [city, setCity] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [twitter, setTwitter] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [other, setOther] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSave = () =>{
      setIsEdit(true)
      setName(userData?.name)
      setDob(userData?.dob)
      setContactNumber(userData?.contactNumber)
      setCity(userData?.city)
      setLinkedin(userData?.linkedin)
      setTwitter(userData?.twitter)
      setFacebook(userData?.facebook)
      setInstagram(userData?.instagram)
      setOther(userData?.other)
    }

   const onClose= () =>{
      setOpen(false)
    }

useEffect(()=>{
  console.log("userData''''''''",userData)
  setUserData(userData)
},[userData])

useEffect(()=>{
  fetchDetails()
},[isEdit])

    // let id = localStorage.getItem("usersDetails");
    // let data = JSON.parse(id);
    // console.log("data._id<><><><><><><><><>",data._id)

// useEffect(()=>{
//   setState({open: state.open, ...state})
// },[state.open])

    const updateDetails = async () => {
      // console.log("alldata*********",website, description, numberOfEmployes);
      if (!userData || !userData._id) {
          console.log("Missing userData or userData._id",userData);
          return;
        }
        else if (name !== "") {
          setIsEdit(false)
        } else{
          alert("Name can't empty")
        }
  const objData ={ name,dob,contactNumber,city,linkedin,twitter,facebook,instagram,other }
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
      // console.log("UPDATERESULT",isUpdate);
      console.log("WEBSITEEEEEEEEEEEEEEEEEEEEEEEEEE",userData.website, userData.description, userData.numberOfEmployes)
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

console.log("userInfo////////////////",userInfo)

    useEffect(()=>{
      console.log("userInfo??????",userInfo);
      userInfo !== null && setUserData(userInfo)
    },[userInfo])

  // let fetchDetails = async () => {
  //   await fetch(`http://localhost:4000/userInfo/${data?._id}`, {
  //     method: "get",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json(); // Parse the JSON data from the response
  //     })
  //     .then((data) => {
  //       data !== undefined && setUserData(data); // Set the parsed JSON data to the userData state
  //     })
  //     .catch((err) => {
  //       console.log("errInGetData", err);
  //     });
  // };
  

    // useEffect(() => {
    //   if (!isUpdate) {
    //   //   let result = localStorage.getItem("usersDetails");
    //   // let res = JSON.parse(result);
    //   setUserData(userInfo);
    //   } 
    //   else{
    //     fetchDetails()
    //   }
    // }, [isUpdate]);
    

console.log("USERDATA*****",userData)
console.log("userInfo<><><><>",userInfo)
  return (  
<div>
  {/* {console.log("userData._name",userData.name)} */}
  {!isEdit && <div>
        <div>
        <div className="center-user-data"><div className="center-user-text">Full Name:&nbsp;</div><span className="fetch-data">{userData && userData.name}</span></div>
        {/* <div className="center-user-data"><div className="center-user-text">Designation:&nbsp;</div><span className="fetch-data">{userData && userData.designation}</span></div> */}
        <div className="center-user-data"><div className="center-user-text">Date Of Birth:&nbsp;</div><span className="fetch-data">{userData && userData.dob}</span></div>
        <div className="center-user-data"><div className="center-user-text">Contact Number:&nbsp;</div><span className="fetch-data">{userData && userData.contactNumber}</span></div>
        <div className="center-user-data"><div className="center-user-text">City:&nbsp;</div><span className="fetch-data">{userData && userData.city}</span></div>
        <div className="center-user-data"><div className="center-user-text">Profile Picture:&nbsp;</div><button className="upload-button">Upload Profile Photo</button ></div>
        <div className="center-user-data"><div className="center-user-text">Social Media</div></div>
        </div>
        <div className="center-user-down-data">
      
            <div className="down-text"><div>LinkedIn:&nbsp;</div><span className="fetch-data">{userData && userData.linkedin}</span></div>
            <div className="down-text"><div>Twitter:&nbsp;</div> <span className="fetch-data">{userData && userData.twitter}</span></div>
            <div className="down-text"><div>Facebook:&nbsp;</div><span className="fetch-data">{userData && userData.facebook}</span> </div>
            <div className="down-text"><div>Instagram:&nbsp;</div><span className="fetch-data">{userData && userData.instagram}</span> </div>
            <div className="down-text"><div>Other:&nbsp;</div> <span className="fetch-data">{userData && userData.other}</span></div>
        </div>
        </div>}
        {isEdit && <form action='submit'>
        <label>
          <div className='company-details-input'>
            <div>Name</div>
            <input
              type='text'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          {/* <div className='company-details-input'>
            <div>Email</div>
            {/* <input
              type='text'
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={userData ? userData.email : "Undefined"}
                readOnly
            /> */}
             {/* <input
              type='text'
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={userData && userData.email}
            /> */}
          {/* </div> */}
          {/* <div className='company-details-input'>
            <div>Designation</div>
            <input
              type='text'
              value={designation}
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
            />
          </div> */}
          <div className='company-details-input'>
            <div>Date of Birth</div>
            <input
              type='date'
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
          </div>
          <div className='company-details-input'>
            <div>Contact Number</div>
            <input
              type='text'
              value={contactNumber}
              onChange={(e) => {
                setContactNumber(e.target.value);
              }}
            />
          </div>
          <div className='company-details-input'>
            <div>City</div>
            <input
              type='text'
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div className='social-media'>Social Media</div>
          <div className='company-details-input-down'>
            <div>Linkedin</div>
            <input
              type='text'
              value={linkedin}
              onChange={(e) => {
                setLinkedin(e.target.value);
              }}
            />
          </div>
          <div className='company-details-input-down'>
            <div>Twitter</div>
            <input
              type='text'
              value={twitter}
              onChange={(e) => {
                setTwitter(e.target.value);
              }}
            />
          </div>
          <div className='company-details-input-down'>
            <div>Facebook</div>
            <input
              type='text'
              value={facebook}
              onChange={(e) => {
                setFacebook(e.target.value);
              }}
            />
          </div>
          <div className='company-details-input-down'>
            <div>Instagram</div>
            <input
              type='text'
              value={instagram}
              onChange={(e) => {
                setInstagram(e.target.value);
              }}
            />
          </div>
          <div className='company-details-input-down'>
            <div>Other</div>
            <input
              type='text'
              value={other}
              onChange={(e) => {
                setOther(e.target.value);
              }}
            />
          </div>
        </label>
      </form>}
        {!isEdit && <button  onClick={handleSave} className='edit-button'>Edit</button>}
      {isEdit && <button onClick={updateDetails} className="edit-button">Save</button>}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message="Updated"
        onClose={onClose}
      />
        </div>
  )
}

export default UpdateProfile;
