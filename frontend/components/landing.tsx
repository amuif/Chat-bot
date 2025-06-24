"use client";
import React, { useEffect, useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowUp, Check, Code2, Copy, ExternalLink, Send } from "lucide-react";
import { sendToBot } from "@/server-side-actions/get-user";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {} from "react-syntax-highlighter/dist/esm/styles/prism";
const LandingComponent = () => {
  const [message, setMessage] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [responses, setResponses] = useState<
    { role: string; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ children, className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";
    const code = String(children).replace(/\n$/, "");

    if (!match) {
      return (
        <code
          className="bg-gray-800/50 text-gray-300 px-2 py-1 rounded-md text-sm font-mono border "
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="relative group my-4">
        <div className="flex items-center justify-between bg-gray-800/80 px-4 py-2 rounded-t-lg border border-gray-700/50">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300 font-medium">
              {language}
            </span>
          </div>
          <button
            onClick={() => copyToClipboard(code)}
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors rounded"
          >
            {copiedCode === code ? (
              <>
                <Check className="w-3 h-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        </div>
        <SyntaxHighlighter
          style={oneDark}
          language={language}
          PreTag="div"
          className="!mt-0 !rounded-t-none border-x border-b border-gray-700/50"
          customStyle={{
            margin: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            background: "rgba(17, 24, 39, 0.8)",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const userMessage = { role: "user", content: message };
    setResponses((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const botResponse = await sendToBot(message);
      setResponses((prev) => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.log(error);
      setResponses((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-dvh pb-5 flex flex-col bg-gray-900">
      <div className="overflow-y-scroll mt-20 scroll-smooth h-full">
        <AnimatePresence>
          <div className="flex pb-5 px-4 flex-col w-full lg:w-[70%] xl:w-[60%] h-full mx-auto">
            {responses.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center h-full w-full"
              >
                <div className="text-center space-y-6 flex items-center justify-center flex-col h-full">
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                    <Code2 className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    How can I help you today?
                  </h3>
                  <p className="text-gray-400 text-lg max-w-md">
                    Ask me anything about code, get explanations, or request
                    help with your projects.
                  </p>
                </div>
              </motion.div>
            )}

            {responses.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex w-full mx-auto mb-6 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "user" ? (
                  <div className="max-w-[85%] ml-auto">
                    <div className="bg-gray-700 text-white rounded-2xl rounded-br-md px-6 py-4 shadow-lg">
                      <p className="whitespace-pre-wrap text-base leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-gray-100 rounded-2xl px-6 py-5 shadow-xl">
                      <div className="prose prose-invert prose-blue max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code: CodeBlock,
                            pre: ({ children }) => <div>{children}</div>,
                            a: ({ href, children, ...props }) => (
                              <a
                                {...props}
                                href={href}
                                className="inline-flex items-center gap-1 text-gray-300 hover:text-white transition-colors underline decoration-gray-500 hover:decoration-gray-300"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {children}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ),
                            h1: ({ children }) => (
                              <h1 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-600">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-xl font-semibold text-gray-200 mb-3 mt-6">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-lg font-medium text-gray-300 mb-2 mt-4">
                                {children}
                              </h3>
                            ),
                            p: ({ children }) => (
                              <p className="text-gray-200 leading-relaxed mb-4 last:mb-0">
                                {children}
                              </p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-white">
                                {children}
                              </strong>
                            ),
                            em: ({ children }) => (
                              <em className="italic text-gray-300">
                                {children}
                              </em>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc list-inside space-y-1 text-gray-200 mb-4">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal list-inside space-y-1 text-gray-200 mb-4">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="text-gray-200">{children}</li>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-gray-500 pl-4 py-2 bg-gray-800/40 rounded-r-lg my-4">
                                <div className="text-gray-300 italic">
                                  {children}
                                </div>
                              </blockquote>
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start w-full mb-6"
              >
                <div className="max-w-[85%] mr-12">
                  <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 text-gray-100 rounded-2xl rounded-bl-md px-6 py-5 shadow-xl">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <motion.div
        className="flex w-full mx-auto rounded-2xl lg:w-[70%] xl:w-[60%] p-2 flex-row items-center bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 gap-3 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          className="flex-1 px-4 h-12 bg-transparent border-none focus:border-none focus:outline-none focus:ring-0 text-white placeholder-gray-400 text-base"
          placeholder="Ask me anything..."
          aria-label="Type your question here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <motion.button
          className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
            isLoading || !message.trim()
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-500 shadow-lg"
          }`}
          onClick={handleSendMessage}
          disabled={isLoading || !message.trim()}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: isLoading || !message.trim() ? 1 : 1.05 }}
        >
          <ArrowUp
            className={`w-5 h-5 ${isLoading || !message.trim() ? "text-gray-500" : "text-white"}`}
          />
        </motion.button>
      </motion.div>

      <motion.div
        className="text-center text-xs text-gray-500 mt-3 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.5 }}
      >
        AI can make mistakes. Consider checking important information.
      </motion.div>
    </div>
  );
};

export default LandingComponent;
