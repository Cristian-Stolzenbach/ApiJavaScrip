// Obtén los elementos del DOM
const clpInput = document.getElementById('clp');
const currencySelect = document.getElementById('currency');
const searchButton = document.getElementById('search');
const resultDiv = document.getElementById('result');
const chartCanvas = document.getElementById('chart');

// Añade un evento click al botón de búsqueda
searchButton.addEventListener('click', function() {
    // Obtén los valores de los inputs
    const clp = clpInput.value;
    const currency = currencySelect.value;

    // Comprueba si los inputs son válidos
    if (clp && currency) {
        // Realiza la petición a la API
        fetch(`https://mindicador.cl/api/${currency}`)
            .then(response => response.json())
            .then(data => {
                // Calcula el cambio y muéstralo en el DOM
                const exchangeRate = data.serie[0].valor;
                const result = clp / exchangeRate;
                resultDiv.innerText = `Resultado: ${result.toFixed(2)} ${currency.toUpperCase()}`;

                // Muestra el gráfico de los últimos 10 días
                const chart = new Chart(chartCanvas, {
                    type: 'line',
                    data: {
                        labels: data.serie.slice(0, 10).map(i => i.fecha),
                        datasets: [{
                            label: `Valor de ${currency.toUpperCase()}`,
                            data: data.serie.slice(0, 10).map(i => i.valor),
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    }
                });
            })
            .catch(error => {
                // Muestra el error en el DOM
                resultDiv.innerText = `Error: ${error.message}`;
            });
    } else {
        // Muestra un mensaje de error si los inputs no son válidos
        resultDiv.innerText = 'Por favor, introduce una cantidad y selecciona una moneda.';
    }
});