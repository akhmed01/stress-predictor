import { useState } from 'react';
import './App.css';

function App() {

  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    year: 'Freshmen',
    major: 'IM',
    q1: '1', q2: '1', q3: '1', q4: '1',
    q5: '1', q6: '1', q7: '1', q8: '1',
    q9: '1', q10: '1', q11: '1', q12: '1',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to Flask backend");
    } finally {
      setLoading(false);
    }
  };

  const questions = [
    { id: 'q1', text: "Are you enjoying your usual activities and interests?" },
    { id: 'q2', text: "Do you sleep well and wake up feeling rested?" },
    { id: 'q3', text: "Do you have enough energy to get through the day?" },
    { id: 'q4', text: "Do you eat regularly and maintain a balanced appetite?" },
    { id: 'q5', text: "Are you able to stay focused on your tasks or studies?" },
    { id: 'q6', text: "Do you usually feel calm and relaxed?" },
    { id: 'q7', text: "Do you manage your worries effectively?" },
    { id: 'q8', text: "Do you take time to chill and relax after school or work?" },
    { id: 'q9', text: "Do you handle small problems or frustrations well?" },
    { id: 'q10', text: "Do you feel comfortable about what lies ahead?" },
    { id: 'q11', text: "Do you handle your daily responsibilities well?" },
    { id: 'q12', text: "Are your emotions allowing you to work, study, or interact with others effectively?" },
  ];

  return (
    <div className="app-container">
      <div className="card">
        <header>
          <h1>🎓 Stress Predictor Machine</h1>
        </header>

        <div className="content">
          <form onSubmit={handleSubmit} className="predictor-form">
            <h5 className="section-title">User Information</h5>

            <input
              type="number"
              name="age"
              placeholder="Age"
              required
              onChange={handleChange}
            />

            <select name="gender" onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>

            <select name="year" onChange={handleChange}>
              <option>Freshmen</option>
              <option>Sophomore</option>
              <option>Junior</option>
              <option>Senior</option>
            </select>

            <select name="major" onChange={handleChange}>
              <option>IM</option>
              <option>BA</option>
              <option>IR</option>
              <option>CS</option>
            </select>

            <h5 className="section-title">Well-being Assessment</h5>

            {questions.map(q => (
              <div key={q.id}>
                <label>{q.text}</label>
                <select name={q.id} onChange={handleChange}>
                  <option value="0">0 — Never</option>
                  <option value="1">1 — Sometimes</option>
                  <option value="2">2 — Often</option>
                  <option value="3">3 — Always</option>
                </select>
              </div>
            ))}

            <button disabled={loading}>
              {loading ? "Analyzing..." : "Submit Assessment"}
            </button>
          </form>

          <div className="result-section">
            {result && (
              <div className={`result-card ${result.colorClass}`}>
                <h3>{result.status}</h3>
                <p>Score: {result.score}%</p>
                <ul>
                  {result.advice.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
