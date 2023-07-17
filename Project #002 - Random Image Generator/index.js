$(document).ready(() => {
    $('#searchForm').submit(async (event) => {
        event.preventDefault();
        await generateImage($('#searchTerm').val());
    })
});

async function generateImage (term) {
    $('#image-container').empty();
    $('#image-container').css('height', '0').removeClass('fadeIn');
    $('.spinner').removeClass('d-none');
    const url = 'https://api.api-ninjas.com/v1/randomimage?category=' + term;
    const params = {
        method: 'GET',
        headers: {
            'X-Api-Key': 'YOUR_API_KEY_HERE',
            'Accept': 'image/jpeg'
        }
    }

    await fetch(url, params)
        .then((response) => response.blob())
        .then((blob) => {
            $('.spinner').addClass('d-none');
            $('#image-container').append('<img class=\"d-block mx-auto\" src=\"' + URL.createObjectURL(blob) + "\" />");
            $('#image-container').css('height', '500px').addClass('fadeIn');
        })
}