from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    questions = [
        int(data['q1']), int(data['q2']), int(data['q3']),
        int(data['q4']), int(data['q5']), int(data['q6']),
        int(data['q7']), int(data['q8']), int(data['q9']),
        int(data['q10']), int(data['q11']), int(data['q12'])
    ]

    total_score = sum(questions)
    max_score = 36
    wellness_percentage = round((total_score / max_score) * 100)

    if wellness_percentage >= 75:
        status = "Excellent / Thriving"
        color = "success"
        advice = [
            "🌟 You are doing amazing!",
            "✅ Keep balancing your studies and life."
        ]
    elif wellness_percentage >= 50:
        status = "Good / Stable"
        color = "warning"
        advice = [
            "⚖️ Doing okay, but there’s room to improve.",
            "💡 Focus on your weakest areas."
        ]
    else:
        status = "Needs Attention / At Risk"
        color = "danger"
        advice = [
            "🚨 You might be experiencing burnout.",
            "🗣️ Consider speaking to a counselor."
        ]

    return jsonify({
        "age": data["age"],
        "major": data["major"],
        "score": wellness_percentage,
        "status": status,
        "advice": advice,
        "colorClass": color
    })

if __name__ == "__main__":
    app.run(debug=True)
