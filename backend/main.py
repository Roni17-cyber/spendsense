from groq import Groq
from categorizer import predict_category
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from dotenv import load_dotenv
from pydantic import BaseModel
from datetime import date
import os

load_dotenv()

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Expense(BaseModel):
    amount: float
    note: str
    category: str
    date: date

@app.get("/")
def root():
    return {"message": "SpendSense API is running!"}

@app.post("/expenses")
def add_expense(expense: Expense):
    category = expense.category
    if not category or category == "auto":
        category = predict_category(expense.note)
    
    data = {
        "amount": expense.amount,
        "note": expense.note,
        "category": category,
        "date": str(expense.date)
    }
    result = supabase.table("expenses").insert(data).execute()
    return {"message": "Expense added!", "expense": result.data[0]}

@app.get("/expenses")
def get_expenses():
    result = supabase.table("expenses").select("*").execute()
    return result.data

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

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: str):
    result = supabase.table("expenses").delete().eq("id", expense_id).execute()
    return {"message": "Expense deleted!"}
@app.get("/insights")
def get_insights():
    result = supabase.table("expenses").select("*").execute()
    expenses = result.data
    
    if not expenses:
        return {"insight": "No expenses yet! Add some expenses to get AI insights."}
    
    summary = {}
    for e in expenses:
        summary[e["category"]] = summary.get(e["category"], 0) + e["amount"]
    
    summary_text = "\n".join([f"{cat}: ${amt:.2f}" for cat, amt in summary.items()])
    total = sum(summary.values())
    
    response = groq_client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": f"""Here is my spending summary:

{summary_text}
Total: ${total:.2f}

Give me 3 short, friendly, personalized tips to improve my spending. Keep it concise and encouraging."""
            }
        ]
    )
    
    return {"insight": response.choices[0].message.content}