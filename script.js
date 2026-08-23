const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const mealResults = document.getElementById("mealResults");
const resultMessage = document.getElementById("resultMessage");
const showAllButton = document.getElementById("showAllButton");

let allMeals = [];


// SEARCH MEALS
async function searchMeals() {

const searchText = searchInput.value.trim();

// Check if search box is empty
if (searchText === "") {
resultMessage.textContent = "Please enter a meal name.";
mealResults.innerHTML = "";
showAllButton.style.display = "none";
return;
}

// Remove previous results
mealResults.innerHTML = "";
showAllButton.style.display = "none";

resultMessage.textContent = "Searching...";

try {

// Create API URL
const apiURL =
"https://www.themealdb.com/api/json/v1/1/search.php?s="
+ encodeURIComponent(searchText);

console.log("API URL:", apiURL);

// Get API data
const response = await fetch(apiURL);

console.log("Response:", response);

// Convert to JSON
const data = await response.json();

console.log("Data:", data);

// Store meals
allMeals = data.meals || [];

// No meals found
if (allMeals.length === 0) {

resultMessage.textContent =
`No meals found for "${searchText}".`;

return;
}

// Show result count
resultMessage.textContent =
`${allMeals.length} meal(s) found.`;

// Show first 5 meals
displayMeals(allMeals.slice(0, 5));

// Show SHOW ALL if there are more than 5
if (allMeals.length > 5) {
showAllButton.style.display = "block";
}

} catch (error) {

console.error("ERROR:", error);

resultMessage.textContent =
"Unable to load meals. Please try again.";

}
}


// DISPLAY MEALS
function displayMeals(meals) {

mealResults.innerHTML = "";

meals.forEach(function(meal) {

const mealCard = document.createElement("div");

mealCard.className = "meal-card";

mealCard.innerHTML = `

<img
src="${meal.strMealThumb}"
alt="${meal.strMeal}"
>

<div class="meal-info">

<span class="meal-id">
Meal ID: ${meal.idMeal}
</span>

<h3>
${meal.strMeal}
</h3>

<p class="meal-title">
Meal Title: ${meal.strMeal}
</p>

<p class="instructions">
<strong>Cooking Instructions:</strong>
<br>
${meal.strInstructions}
</p>

</div>
`;

mealResults.appendChild(mealCard);
});
}


// SHOW ALL BUTTON
showAllButton.addEventListener("click", function() {

displayMeals(allMeals);

showAllButton.style.display = "none";

resultMessage.textContent =
`Showing all ${allMeals.length} meals.`;
});


// SEARCH BUTTON
searchButton.addEventListener("click", searchMeals);


// PRESS ENTER TO SEARCH
searchInput.addEventListener("keypress", function(event) {

if (event.key === "Enter") {
searchMeals();
}

});


// ================= NAVIGATION =================

document.getElementById("homeLink").addEventListener("click", function(event) {

event.preventDefault();

document.getElementById("home").scrollIntoView({
behavior: "smooth"
});

});


document.getElementById("mealsLink").addEventListener("click", function(event) {

event.preventDefault();

document.getElementById("meals").scrollIntoView({
behavior: "smooth"
});

});