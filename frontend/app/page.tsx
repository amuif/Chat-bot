"use client";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[]; 
}

export default function Home() {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const getResponse = async () => {
    if (!value) {
      setError("Please Enter A Question.");
      return;
    }

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ message: value, history: chatHistory }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("http://localhost:5000/gemini", options);
      const data = await response.text();

      console.log("response", data);

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: [{ text: value }],
        },
        {
          role: "model",
          parts: [{ text: data }], 
        },
      ]);
      setValue("");
    } catch (error) {
      console.error("Error fetching response:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <p>Ask your idea here</p>
      <Input
        className="max-w-md "
        value={value}
        placeholder="Enter your text here"
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={getResponse}>Ask</Button>
      {error && <p className="error">{error}</p>}

      <div>
        {chatHistory.map((chatItem, index) => (
          <div key={index}>
            <p>{chatItem.role}: {chatItem.parts[0].text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}