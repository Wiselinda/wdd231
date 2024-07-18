export async function fetchNutritionDetails() {
    const nutritionDetailsUrl = 'https://recipe-food-nutrition15.p.rapidapi.com/nutrition-details'; // API endpoint
    const ingredientsData = {
        ingredients: ["1 cup rice", "10 oz chickpeas"]
    };
    console.log(ingredientsData); // Log the ingredients data

    try {
        const response = await fetch(nutritionDetailsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Host': 'recipe-food-nutrition15.p.rapidapi.com',
                'X-RapidAPI-Key': 'c2480d32d9msh651d3c23a0cb23ep1d267bjsn4bfd6cbe79a8'
            },
            body: JSON.stringify(ingredientsData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching nutrition details:', error);
    }
}