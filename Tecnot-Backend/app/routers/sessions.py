from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.stt_service import transcribe_audio
from app.services.soap_service import generate_soap
import os
import uuid
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/v1/sessions", tags=["Sessions"])

@router.post("/generate-soap")
async def generate_soap_endpoint(
    audio: UploadFile = File(...),
    patient_id: str = Form(...),
    vitals: str = Form(None)
):
    """
    Upload audio → Transcribe with Gemini → Generate SOAP with GPT-4o
    """
    audio_path = None
    
    try:
        # Create temp directory
        temp_dir = Path("temp_audio")
        temp_dir.mkdir(exist_ok=True)
        
        # Save uploaded audio
        audio_filename = f"{uuid.uuid4()}.{audio.filename.split('.')[-1]}"
        audio_path = temp_dir / audio_filename
        
        with open(audio_path, "wb") as f:
            content = await audio.read()
            f.write(content)
        
        # Verify file was saved
        file_size = os.path.getsize(audio_path)
        print(f" Audio file saved: {audio_path}")
        print(f" File size: {file_size} bytes")
        
        if file_size < 1000:
            raise HTTPException(status_code=400, detail="Audio file too small - recording might have failed")
        
        print("🎤 Transcribing audio with Gemini...")
        
        # Step 1: Transcribe with Gemini
        transcript = await transcribe_audio(
    str(audio_path), 
    os.getenv("GROQ_API_KEY")
)
        
        print(f" Transcript: {transcript[:100]}...")
        print(" Generating SOAP note with GPT-4o...")
        
        # Step 2: Generate SOAP with GPT-4o
        soap_note = await generate_soap(
            transcript,
            os.getenv("GROQ_API_KEY")
        )
        
        print(" SOAP note generated!")
        
        # Clean up audio file
        if audio_path and os.path.exists(audio_path):
            os.remove(audio_path)
        
        return {
            "success": True,
            "session_id": str(uuid.uuid4()),
            "transcript": transcript,
            "soap": soap_note
        }
        
    except Exception as e:
        # Clean up on error
        if audio_path and os.path.exists(audio_path):
            os.remove(audio_path)
        
        print(f" Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))