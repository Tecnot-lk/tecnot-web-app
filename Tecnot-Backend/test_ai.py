
import asyncio
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

async def test_ai():
    # Test imports
    try:
        import google.generativeai as genai
        print(" Google Generative AI imported")
    except:
        print(" Google Generative AI NOT installed")
    
    try:
        from openai import OpenAI
        print(" OpenAI imported")
    except:
        print(" OpenAI NOT installed")
    
    # Test API keys
    google_key = os.getenv("GOOGLE_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")
    
    if google_key:
        print(f"Google API Key found (starts with: {google_key[:10]}...)")
    else:
        print(" Google API Key NOT found in .env")
    
    if openai_key:
        print(f" OpenAI API Key found (starts with: {openai_key[:10]}...)")
    else
        print(" OpenAI API Key NOT found in .env")

if __name__ == "__main__":
    asyncio.run(test_ai())