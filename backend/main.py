from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv 
import openai
import os

# load the environmental variables
load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai_api_key = os.getenv("OPENAI_API_KEY")  

@app.get("/")
async def root():
    return {"message": "Welcome to the Writing Prompt Generator API!"}

@app.get("/prompt")
def generate_prompt(): 
    print("hello")
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",  
            prompt="Generate a creative writing prompt.",  # Customize your prompt here
            max_tokens=100,  # length of prompt 
        )
        prompt = response.choices[0].text.strip()  # Extract the generated prompt
        print(prompt)
        return {"prompt": prompt}
    except Exception as e:
        print("hit the error situation")
        return {"error": str(e)}  # H
    #return {"prompt": ["Write about a dragon who loves to paint.", "Imagine a world where it always rains."]}