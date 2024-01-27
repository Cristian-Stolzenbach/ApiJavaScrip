document.getElementById('convert').addEventListener('click', function() {
    var amount = document.getElementById('amount').value;
    var currency = document.getElementById('currency').value;
    fetch('mindicador.cl/api/' + currency)
        .then(response => response.json())
        .then(data => {
            var result = amount / data.serie[0].valor;
            document.getElementById('result').innerText = 'Resultado: ' + result.toFixed(2) + ' ' + currency.toUpperCase();
            var ctx = document.getElementById('chart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.serie.slice(0, 10).map(i => i.fecha),
                    datasets: [{
                        label: 'Valor de ' + currency.toUpperCase(),
                        data: data.serie.slice(0, 10).map(i => i.valor),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                }
            });
        })
        .catch(error => {
            document.getElementById('result').innerText = 'Error: ' + error;
        });
});