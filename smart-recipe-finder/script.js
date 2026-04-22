async function searchRecipes() {
  const input = document.getElementById("searchInput").value;
  const recipesContainer = document.getElementById("recipes");

  recipesContainer.innerHTML = "Loading...";

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`
    );

    const data = await response.json();

    if (!data.meals) {
      recipesContainer.innerHTML = "No recipes found 😢";
      return;
    }

    recipesContainer.innerHTML = "";

    data.meals.forEach(meal => {
      const card = document.createElement("div");
      card.classList.add("recipe-card");

      card.innerHTML = `
        <img src="${meal.strMealThumb}" />
        <h3>${meal.strMeal}</h3>
      `;

      recipesContainer.appendChild(card);
    });

  } catch (error) {
    recipesContainer.innerHTML = "Error loading recipes";
    console.error(error);
  }
}