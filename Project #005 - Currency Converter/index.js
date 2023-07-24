$(document).ready(() => {
    $('#switchCurrencies').click(() => {
        let from = $('#currencyForm').find('#fromCurrency');
        let to = $('#currencyForm').find('#toCurrency');
        let fromVal = from.val();
        from.val(to.val());
        to.val(fromVal);
    });

    $('#currencyForm').submit(async (event) => {
        event.preventDefault();
        let from = $('#currencyForm').find('#fromCurrency').val();
        let to = $('#currencyForm').find('#toCurrency').val();
        let value = $('#currencyForm').find('#valueCurrency').val();
        let alert = $('#currencyAlert');
        let resultText = $('.result');

        if (value === "") {
            resultText.addClass('d-none');
            alert.removeClass('d-none').text('Pleade provide a value.');
        } else if (from === to) {
            resultText.addClass('d-none');
            alert.removeClass('d-none').text('Source currency is equal to the target currency.');
        } else {
            resultText.removeClass('d-none');
            alert.addClass('d-none');

            const url = "https://api.api-ninjas.com/v1/convertcurrency?have=" + from + "&want=" + to + "&amount=" + value;
            const params = {
                method: 'GET',
                headers: {
                    'X-Api-Key': 'YOUR_API_KEY'
                },
                contentType: 'application/json'
            }

            $('#loadingIcon').addClass('load');
            let result = await fetch(url,params).then(response => response.json());
            resultText.text(result.new_amount + " " + to);
            $('#loadingIcon').removeClass('load');
        }
    })
})