import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import React, { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export default function EmployeesList() {
    const navigate=useNavigate(); 
  const [members,setMembers]=useState([]);
const addNewMember=()=>{
    navigate('/addEmp')
}
const editOrDelete = (profile) => {
    navigate(`/editDelete/${profile._id}`, { state: { profile } }); // Passing employee data
  };
  const fetchSpecialData = async () => {
    let baseUrl = "";
  
    if (process.env.NODE_ENV === "production") {
      baseUrl = "/employee"; // Change this based on production API
    } else {
      baseUrl = "http://localhost:5000"; // Backend server URL
    }
  
    const url = `${baseUrl}/employees`; // Correct API route
  
    try {
      const response = await axios.get(url);
      console.log("Fetched data:", response.data);
      setMembers(response.data); // Update state with employee data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchSpecialData();
  }, []);
  console.log('members',members)
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, mt: 4 ,mb:window.innerWidth>600?5:20}}>
      <Button onClick={addNewMember}  style={{width:'100%',maxWidth:'700px',fontWeight:'bold',fontSize:'20px',color:'#753A51'}}>Add new employee</Button>
      {members && members.length > 0 ? (
        members.map((member, index) => (
          <Card
            key={index}
            sx={{
              width: "100%",
              maxWidth:window.innerWidth>600? "1200px":'300px',
              
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
              borderRadius: "12px",
              p: 2,
              bgcolor: "#fff",
              border: `2px solid ${member?.isAvailable==="true" ? 'green' : 'red'}`,
            }}
          >
            <CardContent style={{ cursor: 'pointer' }} onClick={() => editOrDelete(member)}>
              {/* Name Section */}
              <Box sx={{ borderBottom: "4px solid #e9ecef", pb: 2, borderRadius: "5px" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", textAlign: "left" }}>
                  {member.name}
                </Typography>
              </Box>
      
              {/* Info Sections */}
              <Box sx={{ mt: 2 }}>
                {/* Employment Section */}
                <Box sx={{ textAlign: "left", mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>
                    Field of Employment
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#777" }}>
                    {member.jobTitle ? `${member.jobTitle} (${member.employmentField})` : member.employmentField}
                  </Typography>
                </Box>
      
                {/* About Section */}
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>
                    About
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#777" }}>
                    {member.about}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ color: member?.isAvailable==="true" ? 'green' : 'red', fontWeight: 'bold' }}>
              {member?.isAvailable==="true" ? 'Available' : 'Unavailable'}
            </Typography>
          </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h3" sx={{ mt: 4, color: "#888", textAlign: "center"  }}>
          No employees found.
        </Typography>
      )}
      
      
    </Box>
  );
}
