class Settings(BaseSettings):
    # ... existing fields ...
    
    # AI Keys
    GOOGLE_API_KEY: str
    OPENAI_API_KEY: str
    GEMINI_MODEL: str = "gemini-2.5-flash"
    GPT_MODEL: str = "gpt-4o"