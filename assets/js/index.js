// Obtener los elementos del DOM
const inputClp = document.getElementById("inputClp");
const inputUsd = document.getElementById("inputUsd");
const selectCurrency = document.getElementById("currency");
const buttonSearch = document.getElementById("search");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Crear una variable para guardar los datos de la API
let apiData;

// Crear una función para obtener los datos de la API usando fetch
const getData = async () => {
  try {
    // Hacer la petición a la API
    const response = await fetch("https://mindicador.cl/api");
    // Convertir la respuesta a JSON
    const data = await response.json();
    // Guardar los datos en la variable apiData
    apiData = data;
    // Llenar el select con las opciones de moneda
    fillSelect();
  } catch (error) {
    // Mostrar el error en el DOM
    alert("Ocurrió un error al obtener los datos de la API: " + error.message);
  }
};

// Crear una función para llenar el select con las opciones de moneda
const fillSelect = () => {
  // Crear un array con los nombres de las monedas disponibles
  const currencies = ["dolar", "euro", "uf", "utm", "yen", "libra_cobre"];
  // Recorrer el array de monedas
  for (let currency of currencies) {
    // Crear un elemento option
    let option = document.createElement("option");
    // Asignar el valor y el texto del option con el nombre de la moneda
    option.value = currency;
    option.textContent = currency;
    // Añadir el option al select
    selectCurrency.appendChild(option);
  }
};

// Crear una función para convertir el monto en pesos a la moneda elegida
const convert = () => {
  // Obtener el valor del input de pesos
  let clp = inputClp.value;
  // Obtener el valor del select de moneda
  let currency = selectCurrency.value;
  // Validar que los valores no estén vacíos
  if (clp && currency) {
    // Obtener el valor de la moneda desde la API
    let value = apiData[currency].valor;
    // Calcular el cambio
    let usd = (clp / value).toFixed(2);
    // Mostrar el resultado en el input de dólares
    inputUsd.value = usd + " dólares";
    // Mostrar el gráfico con el historial de la moneda
    showChart(currency);
  } else {
    // Mostrar un mensaje de error
    alert("Por favor, ingresa un monto en pesos y selecciona una moneda");
  }
};

// Crear una función para mostrar el gráfico con el historial de la moneda usando canvas
const showChart = (currency) => {
  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Obtener el array con los últimos 10 días
  let days = apiData[currency].serie.slice(0, 10);
  // Obtener el valor máximo y mínimo del array
  let max = Math.max(...days.map((day) => day.valor));
  let min = Math.min(...days.map((day) => day.valor));
  // Definir el margen y el espacio entre los puntos
  let margin = 50;
  let space = (canvas.width - margin * 2) / (days.length - 1);
  // Definir el color y el grosor de la línea
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  // Iniciar el trazo
  ctx.beginPath();
  // Recorrer el array de días
  for (let i = 0; i < days.length; i++) {
    // Calcular las coordenadas del punto
    let x = margin + i * space;
    let y =
      canvas.height -
      margin -
      ((days[i].valor - min) / (max - min)) * (canvas.height - margin * 2);
    // Dibujar el punto
    if (i == 0) {
      // Si es el primer punto, mover el cursor
      ctx.moveTo(x, y);
    } else {
      // Si no, dibujar una línea
      ctx.lineTo(x, y);
    }
  }
  // Terminar el trazo
  ctx.stroke();
  // Definir el color y la fuente del texto
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  // Dibujar el texto de las etiquetas y los valores
  for (let i = 0; i < days.length; i++) {
    // Calcular las coordenadas del texto
    let x = margin + i * space;
    let y =
      canvas.height -
      margin -
      ((days[i].valor - min) / (max - min)) * (canvas.height - margin * 2);
    // Dibujar el texto de la etiqueta (fecha)
    ctx.fillText(days[i].fecha.slice(0, 10), x - 20, canvas.height - 10);
    // Dibujar el texto del valor (moneda)
    ctx.fillText(days[i].valor.toFixed(2), x - 20, y - 10);
  }
};

// Llamar a la función getData al cargar la página
window.addEventListener("load", getData);

// Llamar a la función convert al hacer clic en el botón buscar
buttonSearch.addEventListener("click", convert);