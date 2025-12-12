from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Grade Service", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return JSONResponse({"status": "OK", "service": "grade-service"})

@app.get("/api/grades/health")
async def health_check_api():
    return JSONResponse({"status": "OK", "service": "grade-service"})

@app.get("/api/grades/student/{student_id}")
async def get_student_grades(student_id: int):
    return {
        "student_id": student_id,
        "grades": [
            {"course": "Architecture SOA", "grade": 16, "credits": 3},
            {"course": "Web Services", "grade": 15, "credits": 4}
        ]
    }

@app.post("/api/grades")
async def create_grade(grade_data: dict):
    return {"message": "Grade created", "data": grade_data}

@app.get("/api/grades/average/{student_id}")
async def get_average_grade(student_id: int):
    return {
        "student_id": student_id,
        "average": 15.5
    }

@app.get("/api/grades")
async def get_all_grades():
    return {
        "grades": [
            {"student_id": 1, "course": "Architecture SOA", "grade": 16},
            {"student_id": 2, "course": "Web Services", "grade": 15}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
