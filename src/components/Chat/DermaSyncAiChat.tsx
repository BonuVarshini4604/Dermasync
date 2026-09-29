import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  Check,
  Bot,
  User,
  Shield,
  Sun,
  Droplets,
  Wind,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Volume2,
  VolumeX,
  Compass
} from 'lucide-react';
import { sendN8nChatMessage, ChatMessage, ChatSkinContext } from '../../services/n8nChatService';
import { playWaterPop, playStepCompleteChime, isAudioMuted } from '../../utils/dewpointAudio';
import { GeoEnvironmentalData } from '../../types/dermasync';

interface DermaSyncAiChatProps {
  barrierScore: number;
  skinDiagnosis: string;
  hydrationLevel: number;
  sebumLevel: number;
  geoData: GeoEnvironmentalData;
  isOpen: boolean;
  onClose: () => void;
  isEmbeddedTab?: boolean;
}

const STORAGE_KEY = 'dermasync_n8n_chat_history';
const SESSION_ID_KEY = 'dermasync_n8n_session_id';

const STARTER_PROMPTS = [
  "How do I heal a burning, stinging barrier?",
  "Recommend a drugstore dupe for SkinCeuticals CE Ferulic in India",
  "Is 10% Niacinamide safe to use with Vitamin C?",
  "Adapt my skincare routine for high humidity & urban smog",
  "How should I layer Salicylic Acid and Retinol?"
];

export const DermaSyncAiChat: React.FC<DermaSyncAiChatProps> = ({
  barrierScore,
  skinDiagnosis,
  hydrationLevel,
  sebumLevel,
  geoData,
  isOpen,
  onClose,
  isEmbeddedTab = false
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load chat history:', e);
    }

    return [
      {
        id: 'welcome-msg',
        role: 'assistant',
        content: `Hello! Welcome to **DermaSync**, your personalized Clinical AI Skincare & Barrier Health Agent connected to your custom **n8n Workflow**.\n\nI am here to help you build a safe, effective, and climate-adaptive skincare routine tailored specifically to your skin. My philosophy is **Barrier First**—we prioritize healing and strengthening your natural shield before introducing aggressive actives.\n\nAsk me anything about:\n- **Barrier Healing Protocols** for stinging or compromised skin\n- **Active Ingredient Compatibility** (e.g. Retinol + AHA/BHA safety)\n- **Climate-Adaptive Swaps** for ${geoData.city || 'your city'} (${geoData.humidity}% Humidity, UV ${geoData.uvIndex}, AQI ${geoData.aqi})\n- **Affordable Indian Drugstore Dupes** (in ₹ INR for Nykaa, Blinkit, & Amazon IN)`,
        timestamp: Date.now()
      }
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [attachContext, setAttachContext] = useState(true);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Maintain persistent unique sessionId for n8n memory
  const [sessionId] = useState<string>(() => {
    let sid = localStorage.getItem(SESSION_ID_KEY);
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem(SESSION_ID_KEY, sid);
    }
    return sid;
  });

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to persist chat messages:', e);
    }
  }, [messages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen || isEmbeddedTab) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, isEmbeddedTab]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputMessage).trim();
    if (!messageContent || isLoading) return;

    setErrorText(null);
    setInputMessage('');
    playWaterPop();

    const userMessage: ChatMessage = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content: messageContent,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const skinContext: ChatSkinContext = {
      barrierScore,
      skinDiagnosis,
      hydrationLevel,
      sebumLevel,
      location: `${geoData.city}, ${geoData.countryName}`,
      temperatureC: geoData.temperatureC,
      humidity: geoData.humidity,
      uvIndex: geoData.uvIndex,
      aqi: geoData.aqi
    };

    try {
      const responseText = await sendN8nChatMessage(
        messageContent,
        sessionId,
        skinContext,
        attachContext
      );

      const assistantMessage: ChatMessage = {
        id: 'msg_res_' + Date.now(),
        role: 'assistant',
        content: responseText,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
      playStepCompleteChime();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Error communicating with n8n AI webhook.';
      setErrorText(errMsg);

      const errorNoticeMessage: ChatMessage = {
        id: 'msg_err_' + Date.now(),
        role: 'assistant',
        content: `⚠️ **Connection Notice**: ${errMsg}\n\nPlease verify that your n8n cloud webhook is listening and try again.`,
        timestamp: Date.now(),
        status: 'error'
      };
      setMessages(prev => [...prev, errorNoticeMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Reset this conversation with your n8n AI Agent?')) {
      const freshSessionId = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem(SESSION_ID_KEY, freshSessionId);
      setMessages([
        {
          id: 'welcome-msg-reset',
          role: 'assistant',
          content: `Conversation reset! Session initialized with your DermaSync AI Agent. What skin concerns would you like to explore?`,
          timestamp: Date.now()
        }
      ]);
      localStorage.removeItem(STORAGE_KEY);
      playWaterPop();
    }
  };

  // Helper to render markdown-formatted content neatly
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Header 3 or 4
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-slate-900 dark:text-white text-base mt-2.5 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="font-bold text-slate-900 dark:text-white text-lg mt-3 mb-1">
            {line.replace('## ', '')}
          </h3>
        );
      }
      // Bullet list items
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemText = line.trim().substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-rose-600 dark:text-rose-400 font-bold">•</span>
            <span className="flex-1">{parseInlineStyles(itemText)}</span>
          </div>
        );
      }
      // Numbered list items
      const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded shrink-0">
              {numMatch[1]}
            </span>
            <span className="flex-1">{parseInlineStyles(numMatch[2])}</span>
          </div>
        );
      }
      // Empty lines
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      // Regular paragraph
      return (
        <p key={idx} className="my-1 leading-relaxed">
          {parseInlineStyles(line)}
        </p>
      );
    });
  };

  // Helper to parse **bold**, `code`, and links
  const parseInlineStyles = (text: string): React.ReactNode => {
    // Regex for bold **text**
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-rose-700 dark:text-rose-300">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  // If this is embedded in a dedicated tab
  if (isEmbeddedTab) {
    return (
      <div className="bg-white dark:bg-[#121820] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[750px] relative">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#151c26]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl nectar-gradient flex items-center justify-center text-slate-900 shadow-sm relative">
              <Bot className="w-5 h-5 text-[#8C5E4F]" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#121820]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-slate-900 dark:text-white text-lg">
                  DermaSync Clinical AI Agent
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300/60">
                  n8n Connected
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Trained on Barrier Health, Climate Telemetry, &amp; Indian Drugstore Formulations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearHistory}
              title="Reset conversation"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Context HUD Pill Bar */}
        <div className="px-4 py-2 bg-slate-100/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-700 dark:text-slate-300 gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-rose-600" />
            <span>Barrier: <strong className="text-slate-900 dark:text-white">{barrierScore}/100</strong></span>
            <span>·</span>
            <span>Diagnosis: <strong className="text-slate-900 dark:text-white">{skinDiagnosis}</strong></span>
            <span>·</span>
            <span>{geoData.city} ({geoData.temperatureC}°C, {geoData.humidity}% Humid)</span>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-semibold">
            <input
              type="checkbox"
              checked={attachContext}
              onChange={(e) => setAttachContext(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500"
            />
            <span>Auto-inject Skin Vitals</span>
          </label>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full nectar-gradient flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4 text-[#8C5E4F]" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm relative group shadow-sm ${
                    isUser
                      ? 'bg-slate-900 text-white rounded-br-xs'
                      : 'bg-[#FAF9F6] dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 rounded-bl-xs'
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none text-[13.5px]">
                    {renderFormattedContent(msg.content)}
                  </div>

                  {/* Message Footnote with Time & Copy Action */}
                  <div className="mt-2 pt-1 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <User className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Typing Indicator while n8n generates */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 text-slate-500 text-xs font-mono"
            >
              <div className="w-8 h-8 rounded-full nectar-gradient flex items-center justify-center shadow-xs">
                <Bot className="w-4 h-4 text-[#8C5E4F] animate-pulse" />
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>Consulting DermaSync n8n AI engine...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Starter Chips */}
        <div className="px-4 sm:px-6 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 overflow-x-auto scrollbar-none flex gap-1.5">
          {STARTER_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors shadow-xs cursor-pointer"
            >
              ⚡ {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121820]">
          <div className="flex items-end gap-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-2 border border-slate-300 dark:border-slate-700 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 transition-all">
            <textarea
              ref={inputRef}
              rows={2}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your skin barrier, product compatibility, local dupes, or routine orders... (Press Enter to send)"
              className="flex-1 bg-transparent border-0 resize-none text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden p-1.5"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                inputMessage.trim() && !isLoading
                  ? 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 shadow-md hover:scale-105'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Floating Drawer / Window Mode
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed z-50 transition-all shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] bg-white dark:bg-[#121820] border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col overflow-hidden ${
            isExpanded
              ? 'inset-4 sm:inset-10 md:inset-16 max-w-5xl mx-auto'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[440px] h-[620px] max-h-[85vh]'
          }`}
        >
          {/* Top Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#151c26]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl nectar-gradient flex items-center justify-center text-slate-900 shadow-sm relative">
                <Bot className="w-5 h-5 text-[#8C5E4F]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#121820] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base">
                    DermaSync Clinical AI
                  </h3>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300/60">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  n8n Clinical Workflow Agent
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Minimize size' : 'Expand window'}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                title="Close chat"
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Context Sub-bar */}
          <div className="px-4 py-1.5 bg-slate-100/90 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
            <span className="truncate max-w-[260px]">
              Vitals: <strong className="text-slate-800 dark:text-slate-200">{barrierScore}/100</strong> · {skinDiagnosis.split('•')[0]}
            </span>
            <label className="flex items-center gap-1 cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={attachContext}
                onChange={(e) => setAttachContext(e.target.checked)}
                className="rounded text-rose-600 text-xs"
              />
              <span className="text-[10px]">Sync Skin Vitals</span>
            </label>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full nectar-gradient flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Bot className="w-3.5 h-3.5 text-[#8C5E4F]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm relative group shadow-xs ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-br-xs'
                        : 'bg-[#FAF9F6] dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-xs'
                    }`}
                  >
                    <div className="prose prose-xs dark:prose-invert max-w-none text-xs sm:text-[13px] leading-relaxed">
                      {renderFormattedContent(msg.content)}
                    </div>

                    <div className="mt-2 pt-1 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.content)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-2.5 h-2.5 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-2.5 h-2.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <User className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2.5 text-slate-500 text-xs font-mono">
                <div className="w-7 h-7 rounded-full nectar-gradient flex items-center justify-center shadow-xs">
                  <Bot className="w-3.5 h-3.5 text-[#8C5E4F] animate-pulse" />
                </div>
                <div className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2 text-xs">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 overflow-x-auto scrollbar-none flex gap-1.5">
            {STARTER_PROMPTS.slice(0, 3).map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors shadow-xs cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121820]">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl px-3 py-1.5 border border-slate-300 dark:border-slate-700 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 transition-all">
              <textarea
                ref={inputRef}
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI Skincare agent..."
                className="flex-1 bg-transparent border-0 resize-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden py-1"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className={`p-2 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                  inputMessage.trim() && !isLoading
                    ? 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
                title="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
