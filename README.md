<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ed2a7a3e-cd2b-4ba9-b11e-14643583389b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Run with Docker

```bash
# Build (pass your Gemini API key — it gets inlined into the client bundle at build time)
docker build --build-arg GEMINI_API_KEY=your_key_here -t itihasa .# Run

docker run --rm -p 3000:3000 itihasa
```

### Or use Docker Compose

Set `GEMINI_API_KEY` in your environment or in a `.env` file next to `docker-compose.yml`, then:

```bash
docker compose up --build
```

The app is served by nginx on port 3000.
