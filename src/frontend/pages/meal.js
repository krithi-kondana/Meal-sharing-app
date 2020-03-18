const postReservation = () => {
    document.querySelector('.error').textContent = '';
    const mealid = document.getElementById('mealid').value
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const phonenumber = document.getElementById('phonenumber').value

    if (name == '' || email == '' || phonenumber == '') {
        document.querySelector('.error').textContent = 'Please enter all fields'
    } else {
        fetch(`/api/reservation`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                'meal_id': mealid,
                'name': name,
                'email': email,
                'phonenumber': phonenumber
            })
        })

        .then(response => {
            if (response.status == '200') {
                alert('Reservation success')
            } else {
                alert('Error during reservations');
            }
        })
    }
}

window.handleMealRequest = params => {
    fetch(`/api/meals/${params.id}`)
        .then(response => response.json())
        .then(meal => {
            document.head.innerHTML = `
                <link rel="stylesheet" href="/index.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <title>${meal[0].title}</title>`;
            document.body.innerHTML = `
                <header>
                    <ul>
                        <img src="/images/logo.jpg" alt="logo">
                        <a href="/" data-navigo>Home</a>
                        <a href="meals" data-navigo>Meals</a>
                    </ul>
                </header>

                <div class='meal'>
                    <div>
                        <h1>${meal[0].title}</h1>
                        <img class="logo" src="https://source.unsplash.com/400x250?${meal[0].title}" alt="picture of meal title">
                    </div>
                    <div>
                        <div>ID: ${meal[0].id}</div><br>
                        <div>Description: ${meal[0].description}</div><br>
                        <div><i class="fa fa-map-marker" style="font-size:24px;"></i>  ${meal[0].location}</div><br>
                        <div>Price: ${meal[0].price}DKK</div><br>
                    </div>
                </div><br>

                <button onclick="createReservation(${meal[0].id})">Make reservation</button><br><br>
                <div class='add-reservation'></div>
                <br><br>
                <footer>
                    Copyrights @krithi-2020
                </footer>
                `
        });
    router.updatePageLinks();
}


function createReservation(id) {
    const addReservation = document.querySelector('.add-reservation')
    addReservation.innerHTML = `<form method="POST" id="createReservation">
                                    <label for="mealid">Meal Id:</label><br>
                                    <input id="mealid" name="mealid" value="${id}"><br><br>
                                    <label for="name">Name:</label><br>
                                    <input type="text" id="name" name="name"><br><br>
                                    <label for="email">Email:</label><br>
                                    <input type="text" id="email" name="email" value="" placeholder="example@domain.com"><br><br>
                                    <label for="phonenumber">Phone number:</label><br>
                                    <input type="text" id="phonenumber" name="phonenumber" value=""><br><br>
                                </form>
                                <div class='error'></div>
                                <button onclick=postReservation()>Confirm</button><br><br><br>
    `
}