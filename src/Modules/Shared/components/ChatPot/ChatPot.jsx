import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "hi 👋، How Can I help You" }
  ]);

  const [input, setInput] = useState("");


    const botResponses = [
  {
    keywords: ["website", "web", "pms"],
    answer:
    <>
       This is a PMS website <br></br> that shows 
      users,tasks,<br></br> and projects for employees.    
    </>
   
  },
  {
    keywords: ["access", "account", "another"],
    answer:
    <>
    No, users cannot access other accounts.<br></br> Only the Manager can.
    </>
      
  },
  {
    keywords: ["team", "who", "built", "developer"],
    answer:
    <>
          A7la Team Kda Kda 😎 <br></br> (First, me * Mayada 💜, Heba 😻, Lamiaa, Eqbal)

    </>
  }
];


   const sendMessage = () => {
  if (!input.trim()) return;

  const userMessage = { sender: "user", text: input };

  const lowerInput = input.toLowerCase();

  let botAnswer = "Sorry, I didn't understand your question 🤔";

  for (let item of botResponses) {
    const match = item.keywords.some(keyword =>
      lowerInput.includes(keyword)
    );

    if (match) {
      botAnswer = item.answer;
      break;
    }
  }

  const botMessage = {
    sender: "bot",
    text: botAnswer
  };

  setMessages([...messages, userMessage, botMessage]);
  setInput("");
};

  

  return (
     <div className="mt-auto d-flex justify-content-end p-3">
    <Card style={{ width: "350px" }} className="shadow bg-dark ">
      <Card.Header className="bg-secondary text-white">
        ChatBot
      </Card.Header>

      <Card.Body style={{ height: "300px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 text-${
              msg.sender === "user" ? "end" : "start"
            }`}
          >
            <span
              className={`badge ${
                msg.sender === "user"
                  ? "bg-info"
                  : "bg-primary"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </Card.Body>

      <Card.Footer>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Form.Control
            type="text"
            placeholder="Send Your Messgae"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="secondary"
            className="mt-2 w-100"
            onClick={sendMessage}
          >
           Send
          </Button>
        </Form>
      </Card.Footer>
    </Card>
     </div>
  );
}

export default ChatBot;
