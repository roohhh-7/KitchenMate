# KitchenMate

KitchenMate is a minimal, AI-powered web MVP designed to help users move from "What should I cook?" to "Start cooking now" in under 30 seconds. By focusing on ingredients you already have, KitchenMate provides curated meal suggestions to reduce decision fatigue.

Full case study here: https://app.notion.com/p/KitchenMate-product-case-study-3578fab9854d8023ade0e43144604195

## Features
- **Pantry Management**: Easily add and remove ingredients you have on hand.
- **Smart Suggestions**: Get exactly 3 curated recipe suggestions based on your pantry, powered by Gemini.
- **Minimalist Design**: A clean, mobile-first interface built for low cognitive load and fast decision making.
- **Saved Recipes**: Save your favorite meals to access them later.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS & Shadcn/ui
- Framer Motion
- Gemini API

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or pnpm
- A Gemini API Key

### Installation

1. **Clone the repository** (if not done already)
   \`\`\`bash
   git clone <repository-url>
   cd KitchenMate
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Deployment
This project is ready to be deployed on Vercel. 
1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add your `GEMINI_API_KEY` to the environment variables in Vercel settings.
4. Deploy!

## Philosophy
KitchenMate is not a random recipe generator or endless browsing platform. It uses a hybrid AI approach by selecting from a structured local dataset of quick, beginner-friendly meals. AI is used solely for intelligent ranking, explanations, and matching to ensure reliability and groundness.
