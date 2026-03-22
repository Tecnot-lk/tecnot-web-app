from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import sessions

app = FastAPI()

# CORS (allow your frontend to call the API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://*.vercel.app",  # Allow all Vercel deployments
        "*"  # Temporarily allow all (you can restrict later)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the sessions router
app.include_router(sessions.router)