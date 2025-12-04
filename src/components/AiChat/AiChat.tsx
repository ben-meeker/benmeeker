import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as webllm from '@mlc-ai/web-llm';
import { Button } from '../Button';
import { Card } from '../Card';
import { SYSTEM_PROMPT } from './persona';
import './AiChat.css';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initProgress, setInitProgress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [engine, setEngine] = useState<webllm.MLCEngineInterface | null>(null);
  const [hasWebGPU, setHasWebGPU] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Check for WebGPU support
  useEffect(() => {
    const checkWebGPU = async () => {
      try {
        if (!navigator.gpu) {
          setHasWebGPU(false);
          return;
        }
        const adapter = await navigator.gpu.requestAdapter();
        setHasWebGPU(!!adapter);
      } catch {
        setHasWebGPU(false);
      }
    };
    checkWebGPU();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize the model
  const initializeModel = useCallback(async () => {
    if (engine || isInitializing) return;
    
    setIsInitializing(true);
    setError(null);
    
    try {
      const initProgressCallback = (report: webllm.InitProgressReport) => {
        setInitProgress(report.text);
      };

      // Use Phi-3.5-mini - Microsoft's model, great at following instructions
      const selectedModel = 'Phi-3.5-mini-instruct-q4f16_1-MLC';
      
      const newEngine = await webllm.CreateMLCEngine(selectedModel, {
        initProgressCallback,
      });
      
      setEngine(newEngine);
      setInitProgress('');
    } catch (err) {
      console.error('Failed to initialize model:', err);
      setError('Failed to load AI model. Please try again.');
    } finally {
      setIsInitializing(false);
    }
  }, [engine, isInitializing]);

  // Send a message
  const sendMessage = async () => {
    if (!input.trim() || isLoading || !engine) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatMessages: webllm.ChatCompletionMessageParam[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
        { role: 'user', content: userMessage.content },
      ];

      const response = await engine.chat.completions.create({
        messages: chatMessages,
        temperature: 0.6,
        max_tokens: 150,
        frequency_penalty: 1.2,  // Penalize repetition
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.choices[0]?.message?.content || "I'm not sure how to respond to that.",
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Failed to get response:', err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Oops! Something went wrong. Let's try that again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key (Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Render WebGPU not supported message
  if (hasWebGPU === false) {
    return (
      <Card variant="elevated" padding="lg">
        <div className="ai-chat__unsupported">
          <p className="ai-chat__unsupported-title">
            Browser Not Supported
          </p>
          <p className="ai-chat__unsupported-text">
            This feature requires WebGPU, which isn't available in your browser yet. 
            Try Chrome 113+ or Edge 113+ for the full experience!
          </p>
          <p className="ai-chat__unsupported-alt">
            In the meantime, feel free to <a href="mailto:ben@meekers.org">email me directly</a>!
          </p>
        </div>
      </Card>
    );
  }

  // Still checking WebGPU support
  if (hasWebGPU === null) {
    return (
      <Card variant="elevated" padding="lg">
        <div className="ai-chat__checking">
          <span className="ai-chat__spinner"></span>
          Checking browser compatibility...
        </div>
      </Card>
    );
  }

  // Not yet activated - show activation button
  if (!engine && !isInitializing) {
    return (
      <Card variant="elevated" padding="lg">
        <div className="ai-chat__activate">
          <img src="/benmeeker.png" alt="Ben Meeker" className="ai-chat__activate-avatar" />
          <p className="ai-chat__activate-text">
            Chat with an AI version of me! Ask about my work, projects, experience, or just say hello.
          </p>
          <p className="ai-chat__activate-note">
            The model will take a moment to load for the first time. It's cached for future visits!
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={initializeModel}
          >
            Start Chat
          </Button>
        </div>
      </Card>
    );
  }

  // Loading the model
  if (isInitializing) {
    return (
      <Card variant="elevated" padding="lg">
        <div className="ai-chat__init">
          <span className="ai-chat__spinner"></span>
          <span className="ai-chat__init-text">
            {initProgress || 'Initializing...'}
          </span>
          <p className="ai-chat__init-note">
            This may take a minute on first load.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="md" className="ai-chat">
      <div className="ai-chat__messages">
        {messages.length === 0 && (
          <div className="ai-chat__welcome">
            <p className="ai-chat__welcome-text">
              Hey there! Ask me about technology, my projects, work experience, or just say hi!
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`ai-chat__message ai-chat__message--${message.role}`}
          >
            <div className="ai-chat__message-avatar">
              {message.role === 'user' ? (
                'You'
              ) : (
                <img src="/benmeeker.png" alt="Ben" className="ai-chat__avatar-img" />
              )}
            </div>
            <div className="ai-chat__message-content">
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="ai-chat__message ai-chat__message--assistant">
            <div className="ai-chat__message-avatar">
              <img src="/benmeeker.png" alt="Ben" className="ai-chat__avatar-img" />
            </div>
            <div className="ai-chat__message-content ai-chat__message-content--typing">
              <span className="ai-chat__typing-dot"></span>
              <span className="ai-chat__typing-dot"></span>
              <span className="ai-chat__typing-dot"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="ai-chat__error">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="ai-chat__input-container">
        <textarea
          ref={inputRef}
          className="ai-chat__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isLoading}
          rows={1}
        />
        <button
          className="ai-chat__send"
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
          </svg>
        </button>
      </div>
    </Card>
  );
};
