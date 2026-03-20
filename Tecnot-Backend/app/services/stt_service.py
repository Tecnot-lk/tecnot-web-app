from groq import Groq
import os

async def transcribe_audio(audio_file_path: str, api_key: str) -> str:
    """
    Transcribe audio using Groq Whisper
    """
    try:
        client = Groq(api_key=api_key)
        
        print(f"📁 Audio file: {audio_file_path}")
        print(f"📊 File size: {os.path.getsize(audio_file_path)} bytes")
        
        print("🎤 Transcribing with Groq Whisper...")
        
        # Open and transcribe audio file
        with open(audio_file_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                file=audio_file,
                model="whisper-large-v3",
                language="en"  # Change to "si" for Sinhala
            )
        
        transcript_text = transcription.text
        print(f"✅ Transcription: {transcript_text[:100]}...")
        
        return transcript_text
        
    except Exception as e:
        print(f"❌ Transcription error: {str(e)}")
        raise Exception(f"Transcription failed: {str(e)}")