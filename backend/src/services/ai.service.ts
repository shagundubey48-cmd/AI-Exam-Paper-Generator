export const generatePrompt = (data: any) => {
  return `
Generate a question paper in STRICT JSON format.

Requirements:
- Create sections
- Include difficulty
- Include marks
- Return valid JSON only

Schema:
{
  "sections": [
    {
      "title": "",
      "instruction": "",
      "questions": [
        {
          "text": "",
          "difficulty": "",
          "marks": 2
        }
      ]
    }
  ]
}

Input:
${JSON.stringify(data)}
`;
};