from supabase import create_client
from dotenv import load_dotenv
import os
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import date 

load_dotenv()
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

app = FastAPI()
class Expense(BaseModel):
    amount: float
    note: str
    category: str
    date: date

expenses = []

@app.get("/")
def root():
    return {"message": "SpendSense API is running!"}

@app.post("/expenses")
def add_expense(expense: Expense):
    data = {
        "amount": expense.amount,
        "note": expense.note,
        "category": expense.category,
        "date": str(expense.date)
    }
    result = supabase.table("expenses").insert(data).execute()
    return {"message": "Expense added!", "expense": result.data[0]}
@app.get("/expenses")
def get_expenses():
    result = supabase.table("expenses").select("*").execute()
    return result.data