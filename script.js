const apiKey = '622dac2842a43afc7f8bd625fecc2f20';
const searchButton = document.getElementById('search-button');
const backButton = document.getElementById('back-button');
const searchScreen = document.getElementById('search-screen');
const resultScreen = document.getElementById('result-screen');
const countryFlag = document.getElementById('country-flag');
const countryName = document.getElementById('country-name');
const countryCapital = document.getElementById('country-capital');
const countryTemperature = document.getElementById('country-temperature');

searchButton.addEventListener('click', async () => {
    const country = document.getElementById('country-input').value.trim();
    if (!country) {
        alert("Please enter a country name.");
        return;
    }

    try {
        // Obtener información del país
        const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        if (!countryResponse.ok) throw new Error("Country not found.");
        const countryData = await countryResponse.json();
        const countryDetails = countryData[0];
        const capital = countryDetails.capital[0];
        const flag = countryDetails.flags.svg;
        const name = countryDetails.name.common;

        // Obtener información del clima
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`);
        if (!weatherResponse.ok) throw new Error("Weather data not found.");
        const weatherData = await weatherResponse.json();
        const temperature = weatherData.main.temp;

        // Actualizar los datos en la pantalla de resultados
        countryFlag.src = flag;
        countryFlag.alt = `${name} flag`;
        countryName.textContent = name;
        countryCapital.textContent = capital;
        countryTemperature.textContent = temperature;

        // Cambiar a la pantalla de resultados
        searchScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

backButton.addEventListener('click', () => {
  // Regresar a la pantalla de búsqueda
  searchScreen.classList.remove('hidden');
  resultScreen.classList.add('hidden');
});
