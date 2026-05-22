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
@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: str):
    result = supabase.table("expenses").delete().eq("id", expense_id).execute()
    return {"message": "Expense deleted!", "expense": result.data[0]}
@app.put("/expenses/{expense_id}")
def update_expense(expense_id: str, expense: Expense):
    data = {
        "amount": expense.amount,
        "note": expense.note,
        "category": expense.category,
        "date": str(expense.date)
    }
    result = supabase.table("expenses").update(data).eq("id", expense_id).execute()
    return {"message": "Expense updated!", "expense": result.data[0]}