import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { recipes } from "@/data/recipes";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy");

export async function POST(request: Request) {
  try {
    const { pantry } = await request.json();

    if (!pantry || !Array.isArray(pantry) || pantry.length === 0) {
      return NextResponse.json(
        { error: "Pantry is empty. Please add ingredients." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are KitchenMate, a minimalist and intelligent cooking assistant.
Your goal is to suggest EXACTLY 3 recipes from the provided recipe dataset that the user can cook based on their pantry ingredients.

Prioritize recipes where the user has most of the ingredients.
If there are no strong matches, suggest near matches and explain what is missing.
Only use recipes from the provided dataset. Do NOT hallucinate recipes.
Focus on simplicity and reducing decision fatigue.

Recipe Dataset:
${JSON.stringify(recipes.map(r => ({ id: r.id, title: r.title, ingredients: r.ingredients, cookTime: r.cookTime, difficulty: r.difficulty })), null, 2)}`;

    const userPrompt = `My pantry ingredients are: ${pantry.join(", ")}. Please suggest 3 recipes.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: systemPrompt,
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            recipes: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  id: { type: SchemaType.STRING },
                  title: { type: SchemaType.STRING },
                  description: { type: SchemaType.STRING },
                  cookTime: { type: SchemaType.STRING },
                  matchPercentage: { type: SchemaType.NUMBER },
                  missingIngredients: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING }
                  },
                  reason: { type: SchemaType.STRING }
                },
                required: ["id", "title", "description", "cookTime", "matchPercentage", "missingIngredients", "reason"]
              }
            }
          },
          required: ["recipes"]
        }
      }
    });

    const result = await model.generateContent(userPrompt);
    const content = result.response.text();

    if (!content) {
      throw new Error("No response from Gemini");
    }

    const parsed = JSON.parse(content);

    // Enrich with actual recipe data (like image, full steps)
    const enrichedRecipes = parsed.recipes.map((aiRecipe: any) => {
      const fullRecipe = recipes.find(r => r.id === aiRecipe.id);
      return {
        ...aiRecipe,
        imageUrl: fullRecipe?.imageUrl || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=600&auto=format&fit=crop",
        fullRecipe
      };
    });

    return NextResponse.json({ recipes: enrichedRecipes });

  } catch (error: any) {
    console.error("Suggestions API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate suggestions. Please try again later.", stack: error.stack },
      { status: 500 }
    );
  }
}
