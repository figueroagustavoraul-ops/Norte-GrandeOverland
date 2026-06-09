document.addEventListener('DOMContentLoaded', () => {
    const filtroMarca = document.getElementById('filtro-marca');
    const filtroCategoria = document.getElementById('filtro-categoria');
    const filtroPrecio = document.getElementById('filtro-precio');
    const btnLimpiar = document.getElementById('btn-limpiar');
    const contenedorSinResultados = document.getElementById('sin-resultados');
    const tarjetasAutos = document.querySelectorAll('.card-auto');

    function filtrarStock() {
        const marcaSeleccionada = filtroMarca.value;
        const catSeleccionada = filtroCategoria.value;
        const precioSeleccionado = filtroPrecio.value;
        
        let contadorVisibles = 0;

        tarjetasAutos.forEach(tarjeta => {
            const autoMarca = tarjeta.getAttribute('data-marca');
            const autoCat = tarjeta.getAttribute('data-categoria');
            const autoPrecio = tarjeta.getAttribute('data-precio');

            if(!autoMarca) return; 

            const coincideMarca = (marcaSeleccionada === 'todos' || autoMarca === marcaSeleccionada);
            const coincideCategoria = (catSeleccionada === 'todos' || autoCat === catSeleccionada);
            const coincidePrecio = (precioSeleccionado === 'todos' || autoPrecio === precioSeleccionado);

            if (coincideMarca && coincideCategoria && coincidePrecio) {
                tarjeta.style.display = 'flex';
                contadorVisibles++;
            } else {
                tarjeta.style.display = 'none';
            }
        });

        if (contenedorSinResultados) {
            contenedorSinResultados.style.display = (contadorVisibles === 0) ? 'block' : 'none';
        }
    }

    if(filtroMarca) filtroMarca.addEventListener('change', filtrarStock);
    if(filtroCategoria) filtroCategoria.addEventListener('change', filtrarStock);
    if(filtroPrecio) filtroPrecio.addEventListener('change', filtrarStock);

    if(btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            filtroMarca.value = 'todos';
            filtroCategoria.value = 'todos';
            filtroPrecio.value = 'todos';
            filtrarStock();
        });
    }
});

// MODAL DE DETALLES EXTENDIDOS
function verDetallesAuto(element) {
    const card = element.closest('.card-auto');
    
    const modelo = card.getAttribute('data-modelo');
    const anio = card.getAttribute('data-anio');
    const motor = card.getAttribute('data-motor');
    const km = card.getAttribute('data-km');
    const transmision = card.getAttribute('data-transmision');
    const precio = card.getAttribute('data-precio-full');
    const foto1 = card.getAttribute('data-foto1');
    const foto2 = card.getAttribute('data-foto2');

    document.getElementById('m-titulo').innerText = modelo;
    document.getElementById('m-anio').innerText = anio;
    document.getElementById('m-motor').innerText = motor;
    document.getElementById('m-km').innerText = km;
    document.getElementById('m-transmision').innerText = transmision;
    document.getElementById('m-precio').innerText = "$ " + precio;
    document.getElementById('m-img1').src = foto1;
    document.getElementById('m-img2').src = foto2;

    document.getElementById('custom-modal').style.display = 'flex';
}

function cerrarFichaModal() {
    document.getElementById('custom-modal').style.display = 'none';
}

// LOGICA INTERACTIVA DE LA BURBUJA DE IA
function toggleAIChat() {
    const chatWindow = document.getElementById('ai-chat');
    if(chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
    }
}

function enviarMensajeIA() {
    const input = document.getElementById('ai-input');
    const bodyContent = document.getElementById('ai-body-content');
    
    if(input.value.trim() === "") return;

    // Mensaje de Usuario
    const userPara = document.createElement('p');
    userPara.className = 'ai-msg-user';
    userPara.innerText = input.value;
    bodyContent.appendChild(userPara);
    
    const consulta = input.value.toLowerCase();
    input.value = "";
    
    // Respuesta Automática de Simulación IA corporativa
    setTimeout(() => {
        const botPara = document.createElement('p');
        botPara.className = 'ai-msg-bot';
        
        if(consulta.includes('precio') || consulta.includes('cotiz') || consulta.includes('flota')) {
            botPara.innerText = "Entendido. Para cotizaciones de flotas corporativas o valores llave en mano, un asesor de nuestra división B2B se comunicará con tu firma en menos de 15 minutos. Dejanos un correo de contacto.";
        } else {
            botPara.innerText = "Procesando tu requerimiento técnico en la base de datos... Podés ver el stock activo completo y filtrado en nuestra pestaña 'Stock Completo'. ¿Te gustaría agendar un peritaje?";
        }
        
        bodyContent.appendChild(botPara);
        bodyContent.scrollTop = bodyContent.scrollHeight;
    }, 1000);
}