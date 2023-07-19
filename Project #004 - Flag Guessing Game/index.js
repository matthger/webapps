let countries = [];
let currentCountry = {};
let count = 0;

$(document).ready(async () => {
    await getCountries();
    pickRandomCountry();
    initFrontend();
});

async function getCountries () {
    const url = 'https://restcountries.com/v3.1/all?fields=name,flags';

    let response = await fetch(url).then(response => response.json());

    response.forEach(el => {
        countries.push({
            name: el.name.common,
            flag: el.flags.png
        });
    });
}

function pickRandomCountry() {
    currentCountry = countries[Math.floor(Math.random() * countries.length)];
}

function initFrontend() {
    $('.flag').attr("src", currentCountry.flag);
    let options = generateOptions();

    $('.answer-buttons').empty();

    options.forEach(el => {
        let btn = "<div class=\"col-6\"><button class=\"btn btn-outline-primary rounded-pill\">"
            + el.name + "</button></div>";
        $('.answer-buttons').append(btn);
    });

    $('.answer-buttons .btn').click((event) => {
        $('.alert-lose').addClass('d-none');
        checkAnswer(event.currentTarget.innerText);
    })
}

function generateOptions() {
    let options = [];
    options.push(currentCountry);

    while (options.length < 4)  {
        let country = countries[Math.floor(Math.random() * countries.length)];
        if (country.name !== currentCountry.name) {
            options.push(country);
        }
    }

    return shuffle(options);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function checkAnswer(selectedCountry) {
    if (selectedCountry === currentCountry.name) {
        $('.score').text(++count);
    } else {
        $('.alert-lose').text('No, that was ' + currentCountry.name + '. Try again! Your score was ' + count + '.');
        $('.alert-lose').removeClass('d-none');
        count = 0;
        $('.score').text(count);
    }
    pickRandomCountry();
    initFrontend();
}