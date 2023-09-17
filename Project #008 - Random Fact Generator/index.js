async function getFact() {
    const url = 'https://api.api-ninjas.com/v1/facts';
    const params = {
        method: 'GET',
        headers: {
            'X-Api-Key': 'YOUR_API_KEY'
        }
    }

    document.getElementById('loadingIcon').classList.add('load');
    document.getElementById('btnText').innerHTML = '';

    let response = await fetch(url, params).then(response => response.json());

    document.getElementById('loadingIcon').classList.remove('load');
    document.getElementById('btnText').innerHTML = 'Get Fact';

    document.getElementById('fact').innerHTML = response[0].fact + '.';

    if (!document.getElementById('fact').classList.contains('show')) {
        document.getElementById('fact').classList.add('show');
    }
}