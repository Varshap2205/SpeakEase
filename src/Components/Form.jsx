import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = {
  GAD7: [
    "Feeling nervous, anxious, or on edge?",
    "Not being able to stop or control worrying?",
    "Worrying too much about different things?",
    "Having trouble relaxing?",
    "Being so restless that it is hard to sit still?",
    "Becoming easily annoyed or irritable?",
    "Feeling afraid as if something awful might happen?",
  ],
  PHQ9: [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself or that you are a failure?",
    "Trouble concentrating on things like reading or TV?",
    "Moving or speaking so slowly that others notice?",
    "Thoughts that you would be better off dead or hurting yourself?",
  ],
  PCL5: [
    "Repeated, disturbing memories, thoughts, or images?",
    "Feeling distant or cut off from people?",
    "Avoiding thoughts, feelings, or conversations about a stressful experience?",
    "Feeling very upset when reminded of a stressful experience?",
    "Trouble remembering important parts of a stressful experience?",
    "Loss of interest in things you used to enjoy?",
    "Feeling emotionally numb or unable to have loving feelings?",
    "Feeling irritable or having angry outbursts?",
    "Being overly alert or watchful?",
    "Having difficulty concentrating?",
  ],
};

const Form = () => {
  const [responses, setResponses] = useState(
    Object.keys(questions).reduce((acc, category) => {
      acc[category] = Array(questions[category].length).fill(null);
      return acc;
    }, {})
  );

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (category, index, value) => {
    setResponses((prev) => ({
      ...prev,
      [category]: prev[category].map((v, i) => (i === index ? parseInt(value) : v)),
    }));
  };

  const calculateScore = (category) => {
    return responses[category].reduce((sum, val) => sum + (val !== null ? val : 0), 0);
  };

  const handleSubmit = () => {
    console.log("handleSubmit function triggered!"); // Debug Step 1

    const allAnswered = Object.values(responses).every((category) =>
      category.every((value) => value !== null)
    );

    if (!allAnswered) {
      setError("Please answer all questions before submitting.");
      console.log("Form submission blocked: Not all questions answered"); // Debug Step 2
      return;
    }

    setError("");
    const scores = {
      GAD7: calculateScore("GAD7"),
      PHQ9: calculateScore("PHQ9"),
      PCL5: calculateScore("PCL5"),
    };

    console.log("Calculated scores before navigating:", scores); // Debug Step 3

    localStorage.setItem("userScores", JSON.stringify(scores));
    
    navigate("/result", { state: scores });
    console.log("Navigating to results with scores:", scores); // Debug Step 4
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-xl border border-green-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Mental Health Assessment</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {Object.keys(questions).map((category) => (
        <div key={category} className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-green-700 border-b-2 border-green-200 pb-2">
            {category} Assessment
          </h3>
          {questions[category].map((question, index) => (
            <div key={index} className="mb-6 p-4 bg-green-50 rounded-lg hover:shadow-md">
              <p className="font-medium text-gray-800 mb-3">{question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {["0 - Not at all", "1 - Several days", "2 - More than half the days", "3 - Nearly every day"].map(
                  (option, optIndex) => (
                    <label
                      key={optIndex}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-green-100 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`${category}-${index}`}
                        value={optIndex}
                        checked={responses[category][index] === optIndex}
                        onChange={(e) => handleChange(category, index, e.target.value)}
                        className="w-4 h-4 text-green-600 cursor-pointer"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition"
      >
        Submit & View Results
      </button>
    </div>
  );
};

export default Form;
