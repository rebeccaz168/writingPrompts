import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, OutlinedInput, Button, Typography } from '@mui/material';
import React, { useState } from "react";
import RecommendedSong from './SongCard';

function App() {
  const [prompt, setPrompt] = useState("");
  const [mood, setMood] = useState("");
  const [song, setSong] = useState("");

  const categories = ["Self Development", "Well-being", "Memories", "Relationships", "Gratitude"];
  const [category, setCategory] = useState(categories[0]);

  // Function to fetch the writing prompt from the backend
  async function generatePrompt() {
    try {
      // Construct the URL with query parameters
      const response = await fetch(`http://127.0.0.1:8000/prompt?mood=${mood}&category=${category}`);
      
      // Check if the response is OK
      if (response.ok) {
        console.log(response)
        const data = await response.json(); // Parse the response JSON
        console.log(data.prompt)
        setPrompt(data.prompt)
        console.log(data.song)
        setSong(data.song)
      } else {
        throw new Error('Failed to fetch prompt');
      }
    } catch (error) {
      console.error('Error:', error);
      return 'Error fetching prompt';
    }
  }

  return (
    <div className="App">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          paddingTop: 5,
          color: 'pink'
        }}
      >
        <h1>Writing Prompt Generator</h1>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <TextField
            sx={{ width: 150 }}
            id="mood"
            label="current mood?"
            variant="outlined"
            onChange={(e) => setMood(e.target.value)}
          />
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="demo-simple-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              input={<OutlinedInput label="Genre" />}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={generatePrompt}
          sx={{ mt: 2 }}
        >
          Create Prompt
        </Button>
        {song ? (
           <RecommendedSong song={song} />
              ) : (
             <div> Recommended Song </div> 
            )}
        <Card sx={{ width: 600, height: 600, mt: 3, overflowY: "auto" }}>
          <CardContent>
            {prompt ? (
              Object.entries(prompt).map(([header, content], index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <Typography variant="h6" gutterBottom>
                    {header}
                  </Typography>
                  <Typography variant="body1">{content}</Typography>
                </div>
              ))
            ) : (
              "Your generated prompt will appear here."
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default App;
