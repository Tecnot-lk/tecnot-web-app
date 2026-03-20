from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
print(f"API Key: {api_key[:20]}..." if api_key else "NO API KEY FOUND!")

client = OpenAI(api_key=api_key)

# Test text generation
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Say 'Hello, this is a test!'"}]
)

print(f"✅ OpenAI response: {response.choices[0].message.content}")