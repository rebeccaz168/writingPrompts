from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from groq import Groq
from promptParser import extract_prompt_sections

# Load environmental variables
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = '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'


# Helper function to interact with Groq API
def fetch_data_from_groq(query: str, params: dict = {}) -> dict:
    client = Groq(api_key=api_key)
    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": query}],
            model="llama3-8b-8192",
        )
        content = chat_completion.choices[0].message.content
        if not isinstance(content, str) or not content.strip():
            return {"error": "Invalid response from Groq"}
        return {"data": content}
    except Exception as e:
        return {"error": str(e)}


def song_recommendation(prompt: str) -> str:
    query = (
        f"Based on the journal prompt '{prompt}', recommend one song "
        "to listen to while writing a response to the prompt. Just give the song title with the artist name."
    )
    result = fetch_data_from_groq(query)
    print(result)
    if "error" in result:
        return result["error"]
    return result["data"]


@app.get("/")
async def root():
    return {"message": "Welcome to the Writing Prompt Generator API!"}


@app.get("/prompt")
async def generate_prompt(mood: str, category: str):
    query = f"Generate a positive journal prompt with a {mood} mood, about {category}."
    result = fetch_data_from_groq(query)
    if "error" in result:
        return {"error": result["error"]}
    promptSections = extract_prompt_sections(result["data"])
    if not promptSections:
        return {"error": "Failed to parse prompt sections"}
    song = song_recommendation(result)
    return {"prompt": promptSections, "song": song}
