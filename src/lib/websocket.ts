import type { MatchEvent } from "@/types";

type EventHandler = (event: MatchEvent) => void;
type StatusHandler = (connected: boolean) => void;

class MatchWebSocket {
  private ws: WebSocket | null = null;
  private matchId: string | null = null;
  private eventHandlers: Set<EventHandler> = new Set();
  private statusHandlers: Set<StatusHandler> = new Set();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private shouldReconnect = false;

  private get wsUrl(): string {
    const base = import.meta.env.VITE_WS_BASE_URL ?? "ws://localhost:8080/ws";
    return `${base}/matches/${this.matchId}/live`;
  }

  connect(matchId: string): void {
    this.matchId = matchId;
    this.shouldReconnect = true;
    this.open();
  }

  private open(): void {
    if (!this.matchId) return;
    this.ws = new WebSocket(this.wsUrl);

    this.ws.onopen = () => {
      this.statusHandlers.forEach((h) => h(true));
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
    };

    this.ws.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data as string) as MatchEvent;
        this.eventHandlers.forEach((h) => h(data));
      } catch {
        console.warn("[WS] Failed to parse message", event.data);
      }
    };

    this.ws.onclose = () => {
      this.statusHandlers.forEach((h) => h(false));
      if (this.shouldReconnect) {
        this.reconnectTimer = setTimeout(() => this.open(), 3000);
      }
    };

    this.ws.onerror = (err) => {
      console.error("[WS] Error:", err);
      this.ws?.close();
    };
  }

  disconnect(): void {
    this.shouldReconnect = false;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
    this.matchId = null;
  }

  send(payload: Record<string, unknown>): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload));
    }
  }

  onEvent(handler: EventHandler): () => void {
    this.eventHandlers.add(handler);
    return () => this.eventHandlers.delete(handler);
  }

  onStatus(handler: StatusHandler): () => void {
    this.statusHandlers.add(handler);
    return () => this.statusHandlers.delete(handler);
  }
}

// Singleton instance
export const matchSocket = new MatchWebSocket();
