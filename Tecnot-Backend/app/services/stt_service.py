import google.generativeai as genai
import os

async def transcribe_audio(audio_file_path: str, api_key: str) -> str:
    """Transcribe audio with Gemini"""
    genai.configure(api_key=api_key)
    
    audio_file = genai.upload_file(audio_file_path)
    model = genai.GenerativeModel("gemini-2.5-flash")
    
    prompt = "Transcribe this medical consultation. Format as 'Doctor: ... Patient: ...'"
    response = model.generate_content([prompt, audio_file])
    
    genai.delete_file(audio_file.name)
    return response.text