# ---- Build stage ----
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# GEMINI_API_KEY is inlined into the client bundle at build time
# (see the `define` block in vite.config.ts), so it must be available
# during the build. Pass it with:
#   docker build --build-arg GEMINI_API_KEY=your_key .
# NOTE: since this is a client-side app, the key ends up in the shipped JS bundle.
ARG GEMINI_API_KEY=""
ENV GEMINI_API_KEY=$GEMINI_API_KEY

RUN npm run build

# ---- Runtime stage ----
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
