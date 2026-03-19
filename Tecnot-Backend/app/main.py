
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import sessions  # Add this import

app = FastAPI()

# CORS (allow your frontend to call the API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the sessions router
app.include_router(sessions.router)  # Add this line

# ... rest of your code