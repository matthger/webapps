$(document).ready(() => {
    $('#ytForm').submit(async (event) => {
        event.preventDefault();
        await mp3Conversion($('#ytId').val());
    });
});

async function mp3Conversion (id) {
    if (!id) return;
    $('#failAlert').addClass('d-none');
    $('#resultContainer').css('height', '0').removeClass('fadeIn');
    $('#videoTitle').text("");
    $('#downloadLink').attr('href', "");
    $('.spinner').removeClass('d-none');
    const url = 'https://youtube-mp36.p.rapidapi.com/dl?id=' + id;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'YOUR_API_KEY',
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    };

    let response = await fetch(url, options).then((response) => response.json());

    if (response.status == "processing") {
        setTimeout(async function(){
            response = await fetch(url, options).then((response) => response.json());
        }, 1000);
    }

    $('.spinner').addClass('d-none');

    if (response.status == "fail") {
        $('#failAlert').removeClass('d-none');
    } else {
        $('#videoTitle').text(response.title);
        $('#downloadLink').attr('href', response.link);
        $('#resultContainer').css('height', '180px').addClass('fadeIn');
    }
}