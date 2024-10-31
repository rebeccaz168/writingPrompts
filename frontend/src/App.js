import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Box, TextField, Select, MenuItem, InputLabel, FormControl, OutlinedInput} from '@mui/material'
import React, { useState } from "react";


function App() {
  const [prompt, setPrompt] = useState("")
  const [age, setAge] = useState("")
  const [mood, setMood] = useState("")

  const genres = ["Fantasy", "Science Fiction", "Mystery", "Romance", "Horror"];
  const [genre, setGenre] = useState(genres[0])


  // const generatePrompt = async () => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:8000/api/generate_prompt", {
  //       params: { genre, theme, character },
  //     });
  //     setPrompt(response.data.prompt);
  //   } catch (error) {
  //     console.error("Error generating prompt:", error);
  //   }
  // };


  return (
    <div className="App">
      <Box  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}} > 
        <h1>Writing Prompt Generator</h1>
        <Box sx={{ display: 'flex', flexDirection: 'row' , justifyContent: 'center'}}>
            <TextField sx = {{padding: '10px'}} id="age" label="age" variant="standard" onChange={(e) => setAge(e.target.value)}/>
            <TextField sx = {{padding: '10px'}} id="mood" label="how are you feeling" variant="standard" onChange={(e) => setMood(e.target.value)}/>
            <FormControl sx={{ m: 1, width: 200, padding: '10px'}}>
              <Select
                id="demo-simple-select"
                input={<OutlinedInput label="Genre" />}
                value={genre}
                label="Genre"
              >
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                      Genre
                  </InputLabel>
                  {genres.map((genre) => (
                    <MenuItem key = {genre} value = {genre}> {genre} </MenuItem>
                  ))}
              </Select>
            </FormControl>
        </Box>
        
      </Box>
    </div>
  );
}

export default App;
