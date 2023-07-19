$(document).ready(() => {
    $('#locationForm').submit(async (event) => {
        event.preventDefault();
        await getWeatherData($('#locationText').val());
    });
});

async function getWeatherData (text) {
    if (!text) return;
    $('#resultContainer').css('height', '0').removeClass('fadeIn');
    $('#errorContainer').css('height', '0').removeClass('fadeIn');
    $('.spinner').removeClass('d-none');
    let apiKey = 'API_KEY_HERE';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=metric`;
    const params = {
        method: 'GET',
    }

    let response = await fetch(url, params).then((response) => response.json());
    $('.spinner').addClass('d-none');

    if (response.cod === 200) {
        let src = `https://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`;
        $('#weatherIcon').attr('src', src);
        $('#temp').text(Math.round(response.main.temp) + " °C");
        $('#humidity').text(response.main.humidity + " %");
        $('#windSpeed').text(Math.round(response.wind.speed) + " km/h");
        $('#resultContainer').css('height', '450px').addClass('fadeIn');
    } else {
        $('#errorContainer').css('height', '150px').addClass('fadeIn');
    }
}