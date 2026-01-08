import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import apiClient from '../services/api';
import '../styles/Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm Divyansh's AI assistant. Ask me anything about his projects, skills, or experience!",
            sender: 'bot'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isOpen]);

    /* ⏱ COUNTDOWN TIMER */
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => {
            setCooldown(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔒 FRONTEND LOCK
        if (!input.trim()) return;
        if (isLoading || cooldown > 0) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const { data } = await apiClient.post('/chat', { message: userMessage.text });

            if (data.retryAfter) {
                setCooldown(data.retryAfter);
                setMessages(prev => [
                    ...prev,
                    { id: Date.now() + 1, text: data.reply, sender: 'bot' }
                ]);
            } else if (data.reply) {
                setMessages(prev => [
                    ...prev,
                    { id: Date.now() + 1, text: data.reply, sender: 'bot' }
                ]);
            } else {
                setMessages(prev => [
                    ...prev,
                    { id: Date.now() + 1, text: "Something went wrong.", sender: 'bot' }
                ]);
            }
        } catch {
            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, text: "Network error. Please try again.", sender: 'bot' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div className="chatbot-window">
                        <div className="chatbot-header">
                            <h3>AI Assistant <span>Beta</span></h3>
                            <button onClick={() => setIsOpen(false)} className="close-btn">
                                <FaTimes />
                            </button>
                        </div>

                        <div className="chatbot-messages">
                            {messages.map(msg => (
                                <div key={msg.id} className={`message ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            ))}

                            {cooldown > 0 && (
                                <div className="message bot">
                                    Please wait {cooldown} seconds before sending another message.
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSubmit} className="chatbot-input">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                disabled={isLoading || cooldown > 0}
                                placeholder="Ask about Divyansh..."
                            />
                            <button
                                type="submit"
                                disabled={isLoading || cooldown > 0 || !input.trim()}
                            >
                                <FaPaperPlane />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="chatbot-toggle"
            >
                {isOpen ? <FaTimes /> : <FaRobot />}
            </motion.button>
        </div>
    );
};

export default Chatbot;
