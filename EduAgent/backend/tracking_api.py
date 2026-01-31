from fastapi import FastAPI
from tracker_engine import calculate_progress

app = FastAPI()


@app.get("/agent/execute")
def get_execute_data():
    return calculate_progress()
