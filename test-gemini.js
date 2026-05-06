const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

// I'll use a dummy key to see if the error is a 400 Bad Request (schema error) 
// or 403 Forbidden / 401 Unauthorized (which means the code is correct but key is invalid).
const genAI = new GoogleGenerativeAI("dummy");

async function run() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
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

    const result = await model.generateContent("hello");
    console.log(result.response.text());
  } catch (err) {
    console.error("Error generating content:", err.message);
  }
}

run();
