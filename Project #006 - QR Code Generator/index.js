$(document).ready(() => {
    $('#qrForm').submit(async (event) => {
        event.preventDefault();
        await generateQRCode($('#qrText').val());
    });
});

async function generateQRCode (text) {
    if (!text) return;
    $('#image-container').empty();
    $('#image-container').css('height', '0').removeClass('fadeIn');
    $('.spinner').removeClass('d-none');
    const url = 'https://api.api-ninjas.com/v1/qrcode?format=png&data=' + text;
    const params = {
        method: 'GET',
        headers: {
            'X-Api-Key': 'YOUR_API_KEY',
            'Accept': 'image/png'
        }
    }

    await fetch(url, params)
        .then((response) => response.blob())
        .then((blob) => {
            $('.spinner').addClass('d-none');
            let src = URL.createObjectURL(blob);
            $('#image-container').append('<a title=\"Click to download!\" href=\"'
                + src + 
                "\" download><img src=\""
                + src +
                "\" /></a>");
            $('#image-container').css('height', '260px').addClass('fadeIn');
        })
}