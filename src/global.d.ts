// Global type declarations for external libraries

declare global {
  interface Window {
    netlifyIdentity?: {
      on: (event: string, callback: (user?: any) => void) => void;
      open: (tab?: string) => void;
      close: () => void;
      currentUser: () => any;
      logout: () => void;
      refresh: (force?: boolean) => Promise<any>;
    };
  }
}

export {};
