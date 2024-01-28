document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a elementos del DOM
    const clpInput = document.getElementById('clp');
    const currencySelect = document.getElementById('currency');
    const searchButton = document.getElementById('search');
  
    // Manejador de eventos para el botón de búsqueda
    searchButton.addEventListener('click', async () => {
      try {
        // Obtener tipos de cambio desde mindicador.cl
        const tiposDeCambio = await obtenerTiposDeCambio();
  
        // Obtener el monto en pesos chilenos y la moneda a convertir
        const montoCLP = parseFloat(clpInput.value);
        const monedaAConvertir = currencySelect.value;
  
        // Calcular el cambio
        const tipoCambioSeleccionado = tiposDeCambio[monedaAConvertir.toLowerCase()].valor;
        const resultado = montoCLP / tipoCambioSeleccionado;
  
        // Mostrar el resultado en el DOM
        mostrarResultado(resultado, monedaAConvertir);
  
        // Obtener historial de los últimos 10 días
        const historial = await obtenerHistorial();
  
        // Crear gráfico
        crearGrafico(historial);
      } catch (error) {
        console.error('Hubo un error:', error);
        // Mostrar mensaje de error en el DOM
        mostrarError(error.message || 'Hubo un error al realizar la conversión.');
      }
    });
  
    // Función para obtener tipos de cambio desde mindicador.cl
    const obtenerTiposDeCambio = async () => {
      try {
        const response = await fetch('https://mindicador.cl/api');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error al obtener los tipos de cambio:', error);
        throw new Error('No se pudieron obtener los tipos de cambio.');
      }
    };
  
    // Función para obtener historial (debes adaptar esto según tu estructura de datos)
    const obtenerHistorial = async () => {
      // Implementa lógica para obtener historial (puedes usar otra API o datos de prueba)
      // ...
      return [];
    };
  
    // Función para mostrar el resultado en el DOM
    const mostrarResultado = (resultado, moneda) => {
      // Implementa lógica para mostrar el resultado en tu estructura HTML
      // ...
    };
  
    // Función para mostrar mensaje de error en el DOM
    const mostrarError = (mensaje) => {
      // Implementa lógica para mostrar el error en tu estructura HTML
      // ...
    };
  
    // Función para crear el gráfico con Chart.js
    const crearGrafico = (historial) => {
      const ctx = document.getElementById('chart').getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: historial.map(dia => dia.fecha),
          datasets: [{
            label: 'Valor de la moneda',
            data: historial.map(dia => dia.valor),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          }]
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            },
            y: {
              min: 0
            }
          }
        }
      });
    };
  });
  