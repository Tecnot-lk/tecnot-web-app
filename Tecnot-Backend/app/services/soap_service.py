from openai import OpenAI
import json

async def generate_soap(transcript: str, api_key: str) -> dict:
    """Generate SOAP note with GPT-4o"""
    client = OpenAI(api_key=api_key)
    
    prompt = f"""
    Create a SOAP note from this transcript: {transcript}
    
    Return JSON with: chief_complaint, subjective, objective, assessment, plan
    """
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "Generate medical SOAP notes in JSON."},
            {"role": "user", "content": prompt}
        ],
        response_format={"type": "json_object"}
    )
    
    return json.loads(response.choices[0].message.content)