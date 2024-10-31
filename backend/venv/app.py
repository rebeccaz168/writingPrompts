# backend/app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define example options
genres = ["Fantasy", "Science Fiction", "Mystery", "Romance", "Horror"]
themes = ["Love", "Betrayal", "Adventure", "Courage", "Discovery"]
characters = ["a wizard", "an astronaut", "a detective", "a warrior", "a ghost"]

@app.get("/api/generate_prompt")
async def generate_prompt(genre: str, theme: str, character: str):
    # Generate a creative prompt based on selections
    prompt = f"Write a {genre} story about {theme} featuring {character}."
    return {"prompt": prompt}
