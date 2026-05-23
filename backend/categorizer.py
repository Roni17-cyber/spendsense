from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

TRAINING_DATA = [
    ("uber lyft taxi ride", "Transport"),
    ("gas station fuel", "Transport"),
    ("bus subway train ticket", "Transport"),
    ("chipotle pizza burger mcdonalds lunch dinner", "Food"),
    ("grocery walmart target food", "Food"),
    ("coffee starbucks cafe restaurant", "Food"),
    ("rent apartment mortgage", "Housing"),
    ("electricity water internet bill", "Utilities"),
    ("netflix spotify movie ticket concert", "Entertainment"),
    ("amazon clothes shoes shopping", "Shopping"),
    ("doctor pharmacy medicine hospital", "Health"),
    ("gym fitness yoga membership", "Health"),
    ("textbook course tuition udemy", "Education"),
]

texts = [t for t, _ in TRAINING_DATA]
labels = [l for _, l in TRAINING_DATA]

model = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("clf", LogisticRegression())
])

model.fit(texts, labels)

def predict_category(note: str) -> str:
    return model.predict([note.lower()])[0]