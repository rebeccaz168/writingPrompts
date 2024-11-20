import React from 'react';
import { Card, CardContent, Typography} from '@mui/material';

function parseSongInfo(song) {
    // Check if song is a valid string before calling .split()
    if (typeof song !== 'string' || !song.trim()) {
      console.error('Invalid song data:', song);
      return { title: 'Unknown', artist: 'Unknown' }; // Provide default values or handle the error appropriately
    }
  
    // Assuming the format is 'Song Title by Artist Name'
    const songParts = song.split(' by ');
    const title = songParts[0] || 'Unknown';
    const artist = songParts[1] || 'Unknown';
  
    return { title, artist };
  }
  
const RecommendedSong = ({song}) => {
    const { title, artist } = parseSongInfo(song);
  return (
    <Card sx={{ maxWidth: 345, marginTop: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Recommended Song: {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Artist: {artist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecommendedSong;
