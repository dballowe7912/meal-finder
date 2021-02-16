const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('results-heading');
const single_mealEl = document.getElementById('single-meal');

// Search for Meal and fetch from API
// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
function searchMeal(event) {
    event.preventDefault();

    // Clear single meal
    single_mealEl.innerHTML = '';

    // Get search term
    const term = search.value;

    // Check for empty field
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

            if (data.meals === null) {
                resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`
            } else {
                mealsEl.innerHTML = data.meals.map(meal => `
                    <div class='meal'>
                        <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
                        <div class='meal-info' data-mealID='${meal.idMeal}'>
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `)
                .join('');
            }
        });
        // Clear search input
        search.value = '';
    } else {
        alert('Please enter a search term')
    }
}



// Event Listeners
submit.addEventListener('submit', searchMeal)