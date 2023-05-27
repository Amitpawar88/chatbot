import { useState } from "react";
import lens from "./assets/lens.png";
import loadingGif from "./assets/loading.gif";
import "./App.css";
import data from "./datasets/dataset.json";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(undefined);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setLoading(true);
      try {
        handleFormSubmit();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleFormSubmit = () => {
    const currentQuestion = inputValue.toLowerCase().trim();
    const intents = data.intents;

    const matchedIntent = intents.find((intent) =>
      intent.patterns.some((pattern) => currentQuestion.includes(pattern.toLowerCase().trim()))
    );

    if (matchedIntent) {
      const currentAnswer = getRandomResponse(matchedIntent.responses);
      setInputValue("");
      setAnswer(currentAnswer);
    } else {
      setInputValue("");
      setAnswer("Sorry, I didn't understand that.");
    }

    setLoading(false);
  };

  const getRandomResponse = (responses) => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  return (
    <div className="app">
      <div className="app-container">
        <h1 className="heading">Explore Courses with Chatbot</h1>
        <div className="spotlight__wrapper">
          <input
            type="text"
            className="spotlight__input"
            placeholder="Ask me anything..."
            disabled={loading}
            style={{
              backgroundImage: loading ? `url(${loadingGif})` : `url(${lens})`,
            }}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <div className="spotlight__answer">{answer && <p>{answer}</p>}</div>
        </div>
        <p className="chatbot-info">This chatbot can help recommend courses based on your questions and interests.</p>
      </div>
    </div>
  );
}

export default App;
