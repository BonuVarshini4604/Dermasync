/**
 * DermaSync n8n AI Chatbot Integration Service
 * Webhook: https://bonuvarshini.app.n8n.cloud/webhook/e4a84847-fbcb-480f-b6fe-8c7241a5016a/chat
 */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  status?: 'sending' | 'sent' | 'error';
  suggestedActions?: string[];
}

export interface ChatSkinContext {
  barrierScore?: number;
  skinDiagnosis?: string;
  hydrationLevel?: number;
  sebumLevel?: number;
  location?: string;
  temperatureC?: number;
  humidity?: number;
  uvIndex?: number;
  aqi?: number;
}

const N8N_DIRECT_WEBHOOK_URL = 'https://bonuvarshini.app.n8n.cloud/webhook/e4a84847-fbcb-480f-b6fe-8c7241a5016a/chat';
const N8N_PROXY_URL = '/api/n8n-chat';

export async function sendN8nChatMessage(
  message: string,
  sessionId: string,
  context?: ChatSkinContext,
  includeContext: boolean = true
): Promise<string> {
  const payload: Record<string, unknown> = {
    chatInput: message,
    message: message,
    sessionId: sessionId,
  };

  if (includeContext && context) {
    payload.context = {
      skinDiagnosis: context.skinDiagnosis,
      barrierHealthScore: context.barrierScore,
      hydrationLevel: context.hydrationLevel,
      sebumLevel: context.sebumLevel,
      ambientClimate: context.location ? {
        city: context.location,
        temperatureC: context.temperatureC,
        humidityPct: context.humidity,
        uvIndex: context.uvIndex,
        airQualityIndex: context.aqi
      } : undefined
    };
  }

  // Helper to attempt fetch with timeout
  const executeFetch = async (url: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout for AI generation

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`n8n webhook responded with status ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        // Handle standard n8n output formats
        if (typeof data === 'string') return data;
        if (data && typeof data.output === 'string') return data.output;
        if (data && typeof data.text === 'string') return data.text;
        if (data && typeof data.message === 'string') return data.message;
        if (data && typeof data.response === 'string') return data.response;
        if (data && typeof data.content === 'string') return data.content;
        if (data && data.data && typeof data.data.output === 'string') return data.data.output;
        if (Array.isArray(data) && data.length > 0) {
          const first = data[0];
          if (typeof first === 'string') return first;
          if (first?.output) return first.output;
          if (first?.text) return first.text;
          if (first?.message) return first.message;
        }
        return JSON.stringify(data, null, 2);
      } else {
        const text = await response.text();
        return text;
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      throw err;
    }
  };

  // Try direct webhook first (since CORS is configured on the user's n8n cloud instance)
  try {
    return await executeFetch(N8N_DIRECT_WEBHOOK_URL);
  } catch (directErr) {
    console.warn('Direct n8n webhook fetch failed, trying local proxy...', directErr);
    // Fallback to local Vite proxy
    try {
      return await executeFetch(N8N_PROXY_URL);
    } catch (proxyErr) {
      console.error('Both direct and proxy n8n requests failed:', { directErr, proxyErr });
      throw new Error(
        'Unable to connect to the AI Agent webhook. Please verify that your n8n workflow is active or try again.'
      );
    }
  }
}
