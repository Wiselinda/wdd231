document.addEventListener("DOMContentLoaded", function() {
    // Set the current year and last modified date
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');
    const town = document.querySelector('#town');
    const townOne = document.querySelector('#town-one');
    const townTwo = document.querySelector('#town-two');
    const townThree = document.querySelector('#town-three');
    const description = document.querySelector('#description')
    const weatherImage = document.querySelector('#weather-image');
    const temperature = document.querySelector('#temperature');
    const descriptionOne = document.querySelector('#description-one');
    const descriptionTwo = document.querySelector('#description-two');
    const descriptionThree = document.querySelector('#description-three');
    const weatherImageOne = document.querySelector('#weather-image-one');
    const weatherImageTwo = document.querySelector('#weather-image-two');
    const weatherImageThree = document.querySelector('#weather-image-three');
    const temperatureOne = document.querySelector('#temperature-one');
    const temperatureTwo = document.querySelector('#temperature-two');
    const temperatureThree = document.querySelector('#temperature-three');

    // Toggle menu visibility on hamburger click
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Fetch and display weather data
    const apiKey = 'ee2d2bcce67e347078f314f190758aba';
    const lat = 18.560502469649347;
    const lon = -72.30124819596125;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));

    function displayWeather(data) {
       town.innerHTML = data.city.name
       description.innerHTML = data.list[0].weather[0].description
       const iconsrc = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
       weatherImage.setAttribute('src', iconsrc)
       weatherImage.setAttribute('alt', data.list[0].weather[0].icon)
       temperature.innerHTML = `${data.list[0].main.temp}&deg;F`

       townOne.innerHTML = data.city.name
       descriptionOne.innerHTML = data.list[8].weather[0].description
       const iconsrcOne = `https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`
       weatherImageOne.setAttribute('src', iconsrcOne)
       weatherImageOne.setAttribute('alt', data.list[8].weather[0].icon)
       temperatureOne.innerHTML = `${data.list[8].main.temp}&deg;F`

       townTwo.innerHTML = data.city.name
       descriptionTwo.innerHTML = data.list[16].weather[0].description
       const iconsrcTwo = `https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`
       weatherImageTwo.setAttribute('src', iconsrcTwo)
       weatherImageTwo.setAttribute('alt', data.list[16].weather[0].icon)
       temperatureTwo.innerHTML = `${data.list[16].main.temp}&deg;F`

       townThree.innerHTML = data.city.name
       descriptionThree.innerHTML = data.list[24].weather[0].description
       const iconsrcThree = `https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`
       weatherImageThree.setAttribute('src', iconsrcThree)
       weatherImageThree.setAttribute('alt', data.list[24].weather[0].icon)
       temperatureThree.innerHTML = `${data.list[24].main.temp}&deg;F`
    }
});