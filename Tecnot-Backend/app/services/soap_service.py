from groq import Groq
import json

async def generate_soap(transcript: str, api_key: str) -> dict:
    """
    Generate SOAP note using Groq LLaMA
    """
    try:
        client = Groq(api_key=api_key)
        
        print(" Generating SOAP note with Groq...")
        
        prompt = f"""
You are a medical AI assistant. Generate a complete SOAP note from this consultation transcript.

Transcript:
{transcript}

Return ONLY a JSON object with these exact keys (no markdown, no extra text):
{{
    "chief_complaint": "brief main complaint",
    "history_present_illness": "detailed HPI",
    "subjective": "patient's symptoms and description",
    "objective": "clinical findings and vitals",
    "assessment": "diagnosis and differential",
    "plan": "treatment plan",
    "lab_orders": "lab tests ordered or None",
    "radiology_orders": "imaging ordered or None",
    "medication_orders": "medications prescribed or None",
    "procedure_orders": "procedures ordered or None",
    "nursing_instructions": "care instructions or None"
}}
"""
        
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are a medical documentation expert. Generate accurate SOAP notes in JSON format only."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            max_tokens=2000
        )
        
        soap_text = response.choices[0].message.content.strip()
        
        # Remove markdown code blocks if present
        if soap_text.startswith("```"):
            soap_text = soap_text.split("```")[1]
            if soap_text.startswith("json"):
                soap_text = soap_text[4:]
            soap_text = soap_text.strip()
        
        soap_note = json.loads(soap_text)
        print(" SOAP note generated!")
        
        return soap_note
        
    except Exception as e:
        print(f" SOAP generation error: {str(e)}")
        raise Exception(f"SOAP generation failed: {str(e)}")