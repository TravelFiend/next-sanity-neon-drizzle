// // Define a storage interface so we can swap in-memory or Redis/DB
// interface TokenStore {
//   get(key: string): Promise<string | null>;
//   set(key: string, value: string, ttlSeconds: number): Promise<void>;
// }

// // In-memory fallback (local/dev)
// class MemoryStore implements TokenStore {
//   private cache: Record<string, { value: string; expiresAt: number }> = {};

//   async get(key: string) {
//     const entry = this.cache[key];
//     if (!entry) return null;
//     if (Date.now() > entry.expiresAt) {
//       delete this.cache[key];
//       return null;
//     }
//     return entry.value;
//   }

//   async set(key: string, value: string, ttlSeconds: number) {
//     this.cache[key] = {
//       value,
//       expiresAt: Date.now() + ttlSeconds * 1000,
//     };
//   }
// }

// // Default to in-memory store unless you inject something like Redis
// let store: TokenStore = new MemoryStore();

// export function useTokenStore(customStore: TokenStore) {
//   store = customStore;
// }

// type TokenResponse = {
//   access_token: string;
//   expires_in: number;
//   token_type: string;
// };

// const TOKEN_KEY = "usps_access_token";

// // Fetch a new token from USPS
// async function fetchNewToken(): Promise<TokenResponse> {
//   const res = await fetch("https://api.usps.com/oauth2/v3/token", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: new URLSearchParams({
//       grant_type: "client_credentials",
//       client_id: process.env.USPS_CLIENT_ID!,
//       client_secret: process.env.USPS_CLIENT_SECRET!,
//       scope: "addresses",
//     }),
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to fetch USPS token: ${res.status} ${await res.text()}`);
//   }

//   return (await res.json()) as TokenResponse;
// }

// // Public API: get a valid token (cached or fresh)
// export async function getUspsToken(): Promise<string> {
//   const cached = await store.get(TOKEN_KEY);
//   if (cached) return cached;

//   const tokenResponse = await fetchNewToken();

//   // Store with small buffer so it refreshes a bit early
//   await store.set(TOKEN_KEY, tokenResponse.access_token, tokenResponse.expires_in - 60);

//   return tokenResponse.access_token;
// }
