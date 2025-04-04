import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, TextField, Chip } from "@mui/material";
import Swal from "sweetalert2";
import axios from 'axios';
export default function EditOrDelete() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(location.state?.profile || null);
  const [newSkill, setNewSkill] = useState("");

  if (!profile) {
    return <Typography variant="h6">No Employee Data Found!</Typography>;
  }

  // Toggle edit mode
  const handleEditClick = async () => {
    if (isEditing) {
      try {
        let baseUrl = '';
      
          baseUrl = "http://localhost:5000";
       
  
        const url = `${baseUrl}/updateDetails`;
  
        // Create a copy of profile and remove _id from payload
        const { _id, ...updatePayload } = profile;
        const payload = { _id, ...updatePayload }; // include _id separately for backend
  
        const response = await axios.put(url, payload);
  
        if (response.data.result.modifiedCount > 0 || response.data.result.acknowledged) {
          Swal.fire("Success!", "Employee details updated successfully.", "success");
        
        } else {
          Swal.fire("Notice", "No changes were made.", "info");
        }
  
        setIsEditing(false); // exit edit mode
      } catch (error) {
        console.error("Error updating employee:", error);
        Swal.fire("Error", "Could not update employee details.", "error");
      }
    } else {
      setIsEditing(true); // enter edit mode
    }
  };
  
  

  // Handle input change
  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle skills change
  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = profile.skills.filter((_, i) => i !== index);
    setProfile({ ...profile, skills: updatedSkills });
  };
console.log('profile',profile._id)
  // Handle delete confirmation
  const handleDeleteClick = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#757575",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let baseUrl = '';
          
            baseUrl = "http://localhost:5000";
         
          const url = `${baseUrl}/deleteEmp`;  
          
           const response = await axios.delete(url, {
            data: { _id: profile._id },
          });
          
          if (response.data) {
            Swal.fire("Deleted!", "The employee has been deleted.", "success");
            navigate("/");
          } else {
            Swal.fire("Error!", "Could not delete the employee.", "error");
          }
        } catch (error) {
          console.error('Error deleting employee:', error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };
  
const navigateHome=()=>{
    navigate("/")
}
// Toggle availability
const toggleAvailability = async () => {
    try {
      let baseUrl =  'http://localhost:5000';
      const url = `${baseUrl}/updateDetails`;
  
      // Toggle availability as a string
      const newAvailability = profile.isAvailable === "true" ? "false" : "true";
  
      // Update local state
      const updatedProfile = { ...profile, isAvailable: newAvailability };
      setProfile(updatedProfile);
  
      const { _id, ...updatePayload } = updatedProfile;
      const payload = { _id, ...updatePayload };
  
      const response = await axios.put(url, payload);
  
      if (response.data.result.modifiedCount > 0 || response.data.result.acknowledged) {
        Swal.fire("Updated", `Employee marked as ${newAvailability === "true" ? "Available" : "Unavailable"}`, "success");
      } else {
        Swal.fire("Notice", "No changes were made.", "info");
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      Swal.fire("Error", "Could not update availability.", "error");
    }
  };
  
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mt: 4, width: "100%", maxWidth: "700px", mx: "auto" }}>
      <Button onClick={navigateHome}>Back</Button>
      {/* Availability Section */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
      <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold", mr: 2 }}>
        Availability:
      </Typography>
      <Button
        onClick={toggleAvailability}
        sx={{
          minWidth: "32px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          bgcolor: profile.isAvailable === "true" ? "green" : "red",
          "&:hover": {
            bgcolor: profile.isAvailable === "true" ? "#2e7d32" : "#c62828",
          },
        }}
      />
      <Typography variant="body2" sx={{ color: profile.isAvailable === "true" ? "green" : "red", ml: 2 }}>
        {profile.isAvailable === "true" ? "Available" : "Unavailable"}
      </Typography>
    </Box>
    

    <Card sx={{ width: "100%", p: 2, boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)", borderRadius: "12px" }}>
        <CardContent sx={{ textAlign: "left" }}>
          {/* Name Field */}
          {isEditing ? (
            <TextField 
              name="name" 
              label="Employee Name" 
              variant="outlined" 
              fullWidth 
              value={profile.name} 
              onChange={handleInputChange} 
              sx={{ mb: 2 }}
            />
          ) : (
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", mb: 2 }}>
              {profile.name}
            </Typography>
          )}

          {/* Field of Employment */}
          <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>
            Field of Employment:
          </Typography>
          {isEditing ? (
            <TextField 
              name="employmentField" 
              label="Employment Field" 
              variant="outlined" 
              fullWidth 
              value={profile.employmentField} 
              onChange={handleInputChange} 
              sx={{ mb: 2 }}
            />
          ) : (
            <Typography variant="body2" sx={{ color: "#777", mb: 2 }}>
              {profile.jobTitle} ({profile.employmentField})
            </Typography>
          )}

          {/* About Section */}
          <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold" }}>
            About:
          </Typography>
          {isEditing ? (
            <TextField 
              name="about" 
              label="About Employee" 
              variant="outlined" 
              multiline 
              rows={3} 
              fullWidth 
              value={profile.about} 
              onChange={handleInputChange} 
              sx={{ mb: 2 }}
            />
          ) : (
            <Typography variant="body2" sx={{ color: "#777" }}>
              {profile.about}
            </Typography>
          )}

          {/* Skills Section */}
          <Typography variant="subtitle2" sx={{ color: "#555", fontWeight: "bold", mt: 2 }}>
            Skills:
          </Typography>
          {isEditing ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {profile.skills.map((skill, index) => (
                <Chip key={index} label={skill} onDelete={() => handleDeleteSkill(index)} color="primary" />
              ))}
              <TextField
                label="Add Skill"
                variant="outlined"
                size="small"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                sx={{ ml: 1 }}
              />
              <Button variant="contained" sx={{ bgcolor: "#753A51", ml: 1 }} onClick={handleAddSkill}>
                Add
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {profile.skills.map((skill, index) => (
                <Chip key={index} label={skill} color="primary" />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Buttons */}
      <Box sx={{ mt: 3, display: "flex", gap: "20px" }}>
        <Button variant="contained" sx={{ bgcolor: "#753A51", color: "#fff" }} onClick={handleEditClick}>
          {isEditing ? "Save Changes" : "Edit Employee"}
        </Button>
        <Button variant="contained" sx={{ bgcolor: "#d32f2f", color: "#fff" }} onClick={handleDeleteClick}>
          Delete Employee
        </Button>
      </Box>
    </Box>
  );
}
