window.handleHomeRequest = () => {
    function renderMeals() {
        fetch("/api/meals")
            .then(response => response.json())
            .then(meals => {
                document.head.innerHTML = `
                  <link rel="stylesheet" href="index.css" />
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                  <title>Meal-app</title>`;

                document.body.innerHTML = `
                  <header>
                    <ul>
                      <img src="images/logo.jpg" alt="logo">
                      <a href="/" data-navigo>Home</a>
                      <a href="meals" data-navigo>Meals</a>
                      <input type="text" class="search" placeholder="Search">
                    </ul>

                    <div class='header-image'>
                      <img src='images/cover-image1.jpg' alt='picture of people sharing meal'>
                    </div>
                  </header><br><br>

                  <h1>Featured meals</h1>
                  <div class="meals">
                    <ul></ul>                                                     
                  </div><br><br>

                  <footer>
                    Copyrights @krithi-2020
                  </footer>
                `;

                let mealsDiv = document.querySelector('.meals ul');
                mealsDiv.innerHTML = meals.map(meal => {
                    return `<li>
                              <img class="logo" src="https://source.unsplash.com/600x300?${meal.title}" alt="picture of meal title">
                              <h3>${meal.title}</h3><br>
                              <h4><i class="fa fa-map-marker" style="font-size:24px;"></i>  ${meal.location}</h4>
                              <a href="meals" data-navigo>Go to meals</a>
                            </li>`
                }).join('')

                const search = document.querySelector('.search');
                search.addEventListener('input', () => {
                    let searchedValue = search.value;
                    mealsDiv.innerHTML = meals.map(meal => {
                        if (meal.title.toUpperCase().includes(searchedValue.toUpperCase())) {
                            return `<li>
                                      <img class="logo" src="https://source.unsplash.com/600x300?${meal.title}" alt="picture of meal title">                         
                                      <h3>${meal.title}</h3>
                                      <h4><i class="fa fa-map-marker" style="font-size:24px;"></i>  ${meal.location}</h4><br>
                                      <a href="meals" data-navigo>Go to meals</a>
                                    </li>`
                        }
                    }).join('')
                })
            })
    }
    renderMeals()
        // if any links are added to the dom, use this function
        // make the router handle those links.
    router.updatePageLinks();
};