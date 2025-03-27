import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: 'GEMINI_API_KEY',
});

export default async function generateFileName(file) {
  return new Promise((resolve, reject) => {
    try {
      // Convert the File object to a base64 encoded string
      const reader = new FileReader();

      reader.onload = async (event) => {
        const base64Image = event.target.result;

        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      mimeType: file.type,
                      data: base64Image.split(',')[1], // Remove the "data:document/type;base64," prefix
                    },
                  },
                  {
                    text: 'Generate filename: Use snake-case, Max 50 characters, English only, No file extension, No special chars, Only key elements. Respond ONLY with filename.',
                  },
                ],
              },
            ],
          });

          if (response && response.text) {
            resolve(response.text.trim());
          } else {
            reject(
              new Error(
                'Error: No text response received from the Gemini API.',
              ),
            );
          }
        } catch (error) {
          reject(new Error('Error calling Gemini API:', error));
        }
      };

      reader.onerror = (error) => {
        reject(new Error('Error reading file:', error));
      };

      reader.readAsDataURL(file); // Start reading the file and converting to base64
    } catch (error) {
      reject(new Error('An unexpected error occurred:', error));
    }
  });
}
