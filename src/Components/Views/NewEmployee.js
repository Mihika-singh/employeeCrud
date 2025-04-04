import React, { useState } from "react";
import { Box, Button, TextField, Chip ,Switch,FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
export default function NewEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    employmentField: "",
    about: "",
    skills: [],
    isAvailable: "true", // string, for consistency
  });
  

  const [skillInput, setSkillInput] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    const newSkill = skillInput.trim();
    if (newSkill && !employee.skills.includes(newSkill)) {
      setEmployee((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setSkillInput("");
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setEmployee((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToDelete),
    }));
  };
const [addedEmp,setAddedEmp]=useState(null);
  // Save employee
  const handleSaveEmployee = async () => {
    let baseUrl = '';
    
      baseUrl = "http://localhost:5000";
    
  
    const url = `${baseUrl}/addEmp`;
    try {
      const response = await axios.post(url, employee);
  
      setAddedEmp(response.data);
  
      if (response.data.acknowledged) {
        Swal.fire({
          icon: 'success',
          title: 'Employee Added!',
          text: 'The employee was added successfully.',
        }).then(() => {
          navigate("/"); // 👈 Navigate after user clicks OK
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add',
          text: 'Something went wrong while adding the employee.',
        });
      }
    } catch (error) {
      console.error('Error saving employee:', error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'There was an error saving the employee. Please try again later.',
      });
    }
  };
  
  
 
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        sx={{ width: "70%", mb: 2 }}
        value={employee.name}
        onChange={handleChange}
      />

      <TextField
        name="employmentField"
        label="Field of Employment"
        variant="outlined"
        sx={{ width: "70%", mb: 2 }}
        value={employee.employmentField}
        onChange={handleChange}
      />

      <Box sx={{ width: "70%", mb: 2 }}>
        <TextField
          label="Skills"
          variant="outlined"
          fullWidth
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
        />
        <Button sx={{ mt: 1, bgcolor: "#753A51", color: "#fff" }} onClick={handleAddSkill}>
          Add Skill
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, width: "70%", mb: 3 }}>
        {employee.skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => handleDeleteSkill(skill)}
            sx={{ bgcolor: "#753A51", color: "#fff" }}
          />
        ))}
      </Box>

      <TextField
        name="about"
        label="About"
        variant="outlined"
        multiline
        rows={3}
        sx={{ width: "70%", mb: 3 }}
        value={employee.about}
        onChange={handleChange}
      />
      <FormControlLabel
      control={
        <Switch
          checked={employee.isAvailable === "true"}
          onChange={(e) =>
            setEmployee((prev) => ({
              ...prev,
              isAvailable: e.target.checked ? "true" : "false",
            }))
          }
          color="success"
        />
      }
      label={employee.isAvailable === "true" ? "Available" : "Unavailable"}
      sx={{ width: "70%", mb: 2 }}
    />
    
      <Box sx={{ display: "flex", justifyContent: "center", gap: "30px" }}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#ccc", color: "#333", fontWeight: "bold" }}
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#753A51", color: "#fff", fontWeight: "bold" }}
          onClick={handleSaveEmployee}
        >
          Save Employee
        </Button>
      </Box>
    </Box>
  );
}
