// Next.js requires the middleware entry point to be named `middleware.ts`.
// All logic lives in `proxy.ts` for separation of concerns.
export { proxy as middleware, config } from "./proxy";
