from fastapi import FastAPI
from pydantic import BaseModel
from datetime import date 

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
    expenses.append(expense)
    return {"message": "Expense added!", "expense": expense}
@app.get("/expenses")
def get_expenses():
    return expenses