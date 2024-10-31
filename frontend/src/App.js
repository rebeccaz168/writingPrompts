import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, OutlinedInput, Button } from '@mui/material';
import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [age, setAge] = useState("");
  const [mood, setMood] = useState("");

  const genres = ["Fantasy", "Science Fiction", "Mystery", "Romance", "Horror"];
  const [genre, setGenre] = useState(genres[0]);

  const generatePrompt = async () => {
    console.log("Generate the prompt right here");
    // Add the API call here for generating prompts if needed
  };

  return (
    <div className="App">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          paddingTop: 5,
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
            id="age"
            label="Age"
            variant="outlined"
            onChange={(e) => setAge(e.target.value)}
          />
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
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              input={<OutlinedInput label="Genre" />}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
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

        <Card sx={{ width: 600, mt: 3 }}>
          <CardContent>
            {prompt || "Your generated prompt will appear here."}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default App;
