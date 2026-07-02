import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { recipes } from "@/data/recipes";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy");

const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limitInfo = rateLimitMap.get(ip);
  if (!limitInfo || now > limitInfo.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 60 seconds
    return false;
  }
  if (limitInfo.count >= 5) { // Max 5 requests per minute
    return true; 
  }
  limitInfo.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    // 0. Strict Rate Limiting (5 requests per minute per IP)
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    if (checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    // 1. Reject Oversized Payloads (Limit to ~5KB)
    const rawBody = await request.text();
    if (rawBody.length > 5120) {
      return NextResponse.json(
        { error: "Payload too large." },
        { status: 413 }
      );
    }

    // 2. Safely parse JSON to handle malformed payloads
    let parsedBody;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { pantry } = parsedBody;

    if (!pantry || !Array.isArray(pantry) || pantry.length === 0) {
      return NextResponse.json(
        { error: "Pantry is empty. Please add ingredients." },
        { status: 400 }
      );
    }

    // 3. Sanitize input: only allow strings, remove excessive length and suspicious characters, and limit array size
    const sanitizedPantry = pantry
      .filter((item): item is string => typeof item === "string")
      .map(item => item.trim().replace(/[^a-zA-Z0-9\s-]/g, '').slice(0, 50))
      .filter(item => item.length > 0)
      .slice(0, 20); // Cap at 20 ingredients to prevent abuse

    if (sanitizedPantry.length === 0) {
      return NextResponse.json(
        { error: "Invalid pantry items provided." },
        { status: 400 }
      );
    }

    // PAUSED GEMINI INTEGRATION (Mockup Mode)
    // The following code simulates an AI response to prevent API abuse during the mockup phase.

    // 1. Find recipes that have at least one matching ingredient
    const matchedRecipes = recipes.filter(recipe => 
      recipe.ingredients.some(ing => 
        sanitizedPantry.some(pItem => ing.toLowerCase().includes(pItem.toLowerCase()) || pItem.toLowerCase().includes(ing.toLowerCase()))
      )
    );

    // 2. Fallback to random recipes if no match
    let selectedRecipes = matchedRecipes.length >= 3 ? matchedRecipes : recipes;

    // 3. Pick top 3 (or random 3)
    // Simple deterministic shuffle based on pantry length to make it look "dynamic"
    const shuffled = [...selectedRecipes].sort(() => 0.5 - Math.random());
    const top3 = shuffled.slice(0, 3);

    // 4. Format them to match the expected UI schema
    const enrichedRecipes = top3.map(recipe => {
      // Calculate a fake match percentage
      const matchedCount = recipe.ingredients.filter(ing => 
        sanitizedPantry.some(p => ing.toLowerCase().includes(p.toLowerCase()))
      ).length;
      
      const matchPercentage = Math.max(30, Math.round((matchedCount / recipe.ingredients.length) * 100));
      
      const missingIngredients = recipe.ingredients.filter(ing => 
        !sanitizedPantry.some(p => ing.toLowerCase().includes(p.toLowerCase()))
      );

      return {
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        cookTime: recipe.cookTime,
        matchPercentage,
        missingIngredients: missingIngredients.slice(0, 3), // Just show a few missing
        reason: matchedCount > 0 
          ? `Great match! You already have some key ingredients like ${sanitizedPantry[0]}.` 
          : "We thought you might like this classic recipe to try something new.",
        imageUrl: recipe.imageUrl,
        fullRecipe: recipe
      };
    });

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ recipes: enrichedRecipes });

  } catch (error: any) {
    console.error("Suggestions API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions. Please try again later." },
      { status: 500 }
    );
  }
}
