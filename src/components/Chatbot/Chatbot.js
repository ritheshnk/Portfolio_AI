import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import "./Chatbot.css";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.1-8b-instant";

// ── Local fallback: no API needed ───────────────────────────────────────────
const LOCAL_RESPONSES = [
  {
    keywords: ["name", "who are you", "who is rithesh", "about rithesh", "introduce"],
    answer:
      "I'm Rithesh NK — a Software Developer at Coforge Limited based in Mangalore, India. I specialize in Backend AI development and Test Automation with 3+ years of experience.",
  },
  {
    keywords: ["location", "where", "city", "country", "based"],
    answer: "Rithesh is based in Mangalore, India.",
  },
  {
    keywords: ["role", "job", "work", "company", "coforge", "position"],
    answer:
      "Rithesh currently works as a Software Developer at Coforge Limited, focusing on Backend AI development and Test Automation.",
  },
  {
    keywords: ["education", "degree", "college", "university", "aj institute", "b.tech", "btech"],
    answer:
      "Rithesh holds a B.Tech in Computer Science and Engineering from A.J. Institute of Engineering and Technology.",
  },
  {
    keywords: ["experience", "years", "how long"],
    answer: `Rithesh has ${new Date().getFullYear() - 2023}+ years of experience in Backend AI development and Test Automation.`,
  },
  {
    keywords: ["skill", "tech", "technology", "stack", "language", "framework", "tools", "what can"],
    answer:
      "Rithesh's tech stack includes:\n• Languages: Java, JavaScript, TypeScript, C++, Python\n• Frontend: React.js, Tailwind CSS, Bootstrap\n• Backend: Spring Boot, Spring AI, Node.js\n• Cloud: Azure (AZ-900), AWS basics\n• Databases: MongoDB, SQL, Redis, Firebase\n• DevOps: Docker, Kubernetes, Kafka, Git\n• Testing: Selenium, TestNG, JUnit\n• AI/ML: Gemini API, Spring AI",
  },
  {
    keywords: ["java"],
    answer: "Yes, Java is one of Rithesh's primary languages. He uses Java 17 with Spring Boot 3 for backend development.",
  },
  {
    keywords: ["python"],
    answer: "Python is part of Rithesh's skill set, particularly for AI/ML related work.",
  },
  {
    keywords: ["react", "frontend"],
    answer: "Rithesh builds frontends using React.js, paired with Tailwind CSS and Bootstrap.",
  },
  {
    keywords: ["spring", "spring boot", "backend"],
    answer: "Rithesh uses Spring Boot 3 as his primary backend framework, including Spring AI for AI integrations.",
  },
  {
    keywords: ["cloud", "azure", "aws"],
    answer: "Rithesh is AZ-900 certified (Azure Fundamentals) and has basic experience with AWS.",
  },
  {
    keywords: ["docker", "kubernetes", "devops", "kafka"],
    answer: "Rithesh's DevOps toolkit includes Docker, Kubernetes, Kafka, and Git.",
  },
  {
    keywords: ["project", "projects", "built", "portfolio work", "what have you"],
    answer:
      "Rithesh has worked on:\n1. Web Cash Movement (Northern Trust) — domestic payment processing for trust accounts\n2. AI Chat Bot — Java 17 + Spring Boot 3 + Gemini API for real-time AI responses\n3. CodersGym — full-stack gym management app with JWT auth, Spring Boot backend, React + Tailwind frontend",
  },
  {
    keywords: ["northern trust", "web cash", "cash movement", "payment"],
    answer:
      "Web Cash Movement is a web-based product for Northern Trust clients and internal partners. It handles domestic incoming/outgoing payments against trust accounts — Wires, Transfers, and Checks.",
  },
  {
    keywords: ["chatbot", "ai chat", "chat bot"],
    answer:
      "The AI Chat Bot project is an intelligent assistant built with Java 17 and Spring Boot 3. It integrates the Gemini API for real-time responses using RESTful architecture.",
  },
  {
    keywords: ["codersgym", "gym", "gym app", "fitness"],
    answer:
      "CodersGym is a full-stack gym management web app featuring JWT authentication, membership plans, trainer listings, booking, and a modern landing page. Built with Spring Boot + React + Tailwind CSS.",
  },
  {
    keywords: ["certification", "certified", "certificate"],
    answer: "Rithesh holds the Azure AZ-900 (Azure Fundamentals) certification.",
  },
  {
    keywords: ["hobby", "hobbies", "interest", "free time", "fun", "like to do"],
    answer:
      "Outside of coding, Rithesh enjoys:\n🎮 Playing Video Games\n🏍️🚗 Riding Bikes and Cars\n🌍 Traveling and Exploring New Places",
  },
  {
    keywords: ["quote", "philosophy", "motto", "belief"],
    answer:
      '"I always strive to build a better version of myself everyday by overloading myself with knowledge and positivity!" — Rithesh NK',
  },
  {
    keywords: ["contact", "reach", "email", "linkedin", "github", "social", "connect"],
    answer:
      "You can find Rithesh's contact details and social links directly on this portfolio website. Check the navigation or footer for GitHub, LinkedIn, and email links!",
  },
  {
    keywords: ["hi", "hello", "hey", "good morning", "good evening", "howdy"],
    answer:
      "Hi there! 👋 I'm Rithesh's portfolio assistant. Ask me about his skills, projects, experience, or background!",
  },
  {
    keywords: ["thanks", "thank you", "appreciate", "great", "awesome"],
    answer: "You're welcome! Feel free to ask anything else about Rithesh's portfolio. 😊",
  },
];

function getLocalResponse(userMessage) {
  const lower = userMessage.toLowerCase();
  for (const entry of LOCAL_RESPONSES) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return "I can answer questions about Rithesh's skills, projects, experience, education, and background. What would you like to know?";
}
// ────────────────────────────────────────────────────────────────────────────

const PORTFOLIO_CONTEXT = `
You are an AI assistant for Rithesh NK's personal portfolio website. Answer questions about Rithesh professionally and concisely.

About Rithesh NK:
- Full Name: Rithesh NK
- Location: Mangalore, India
- Current Role: Software Developer at Coforge Limited
- Education: B.Tech in Computer Science and Engineering from A.J. Institute of Engineering and Technology
- Experience: ${new Date().getFullYear() - 2023}+ years in Backend AI development and Test Automation

Technical Skills:
- Languages: Java, JavaScript, TypeScript, C++, Python
- Frontend: React.js, Tailwind CSS, Bootstrap, HTML/CSS
- Backend: Spring Boot, Spring AI, Node.js
- Cloud: Azure (AZ-900 certified area), AWS basics
- Databases: MongoDB, SQL, Redis, Firebase
- DevOps/Tools: Docker, Kubernetes, Kafka, Git, Postman
- Testing: Selenium, TestNG, JUnit
- AI/ML: Gemini API, Spring AI integration

Projects:
1. Web Cash Movement – Northern Trust
   - Web-based product for Northern Trust clients and internal partners
   - Supports domestic incoming/outgoing payments against trust accounts
   - Transaction types: Wires, Transfers, Checks

2. AI Chat Bot
   - Intelligent AI assistant built with Java 17 and Spring Boot 3
   - Integrates Gemini API for real-time responses
   - Built with RESTful architecture

3. CodersGym
   - Full-stack gym management web application
   - Spring Boot backend + React + Tailwind CSS frontend
   - Features: JWT authentication, membership plans, trainer listings, booking
   - Modern landing page with pricing, equipment, testimonials, user profiles

Interests & Hobbies:
- Playing Video Games 🎮
- Riding Bikes and Cars 🏍️🚗
- Traveling and Exploring New Places 🌍

Personal Quote:
"I always strive to build a better version of myself everyday by overloading myself with knowledge and positivity!"

Contact / Social:
- GitHub: github.com/Rithesh17 (or similar — direct users to the portfolio for exact links)
- Portfolio website is the best place to find links

Rules:
- Only answer questions related to Rithesh's portfolio, skills, projects, or professional background.
- For completely unrelated questions, politely redirect the user back to portfolio-related topics.
- Keep responses friendly, professional, and concise.
- Do not make up information not listed above.
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! 👋 I'm Rithesh's portfolio assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  // groqHistory holds the raw {role, content} turns for the Groq API
  const groqHistory = useRef([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInputValue("");
    setIsLoading(true);

    // Append user turn to Groq history
    groqHistory.current.push({ role: "user", content: text });

    const apiKey = process.env.REACT_APP_GROQ_API_KEY;

    try {
      if (apiKey) {
        const response = await fetch(GROQ_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [
              { role: "system", content: PORTFOLIO_CONTEXT },
              ...groqHistory.current,
            ],
            max_tokens: 512,
            temperature: 0.7,
          }),
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          console.error("Groq error body:", errBody);
          throw new Error(`Groq API error: ${response.status} - ${errBody?.error?.message || "Unknown"}`);
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Sorry, I didn't get a response.";

        // Append assistant turn to history for multi-turn context
        groqHistory.current.push({ role: "assistant", content: reply });
        setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      } else {
        // No API key — use local fallback
        const localReply = getLocalResponse(text);
        groqHistory.current.push({ role: "assistant", content: localReply });
        setMessages((prev) => [...prev, { role: "assistant", text: localReply }]);
      }
    } catch (err) {
      console.error("Chatbot error:", err);
      const localReply = getLocalResponse(text);
      groqHistory.current.push({ role: "assistant", content: localReply });
      setMessages((prev) => [...prev, { role: "assistant", text: localReply }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">R</div>
              <div>
                <div className="chatbot-header-name">Rithesh's Assistant</div>
                <div className="chatbot-header-status">
                  <span className="status-dot" />
                  Online
                </div>
              </div>
            </div>
            <button
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <AiOutlineClose />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${
                  msg.role === "user" ? "user-message" : "assistant-message"
                }`}
              >
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message assistant-message">
                <div className="message-bubble typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <textarea
              className="chatbot-input"
              placeholder="Ask about skills, projects..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={isLoading}
            />
            <button
              className="chatbot-send-btn"
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              <AiOutlineSend />
            </button>
          </div>
        </div>
      )}

      <button
        className="chatbot-bubble"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open chat assistant"
      >
        <BsChatDotsFill size={26} />
        {!isOpen && <span className="chatbot-bubble-ping" />}
      </button>
    </div>
  );
}
