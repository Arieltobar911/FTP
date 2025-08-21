const socket = io();
const father = document.getElementById('father');

// Recibir todos los dispositivos al cargar
socket.on("initDevices", (devices) => {
    devices.forEach(devic => addDevice(devic));
});

// Recibir actualizaciones de TDP y state
socket.on("devices-updated", (devices) => {
    devices.forEach(device => {
        const article = document.querySelector(`article[data-id="${device.id}"]`);
        if (!article) return;

        const tdpSpan = article.querySelector('.TDP');
        const stateSpan = article.querySelector('.state');

        // Solo actualizar si cambió
        if (tdpSpan.textContent !== device.TDP + "w") {
            tdpSpan.textContent = device.TDP + "w";
        }
        if (stateSpan.textContent !== device.state) {
            (device.state = "1" || 1) ? stateSpan.textContent = "Encendido" : stateSpan.textContent = "Apagado";
        }
    });
});

// Función para crear un <article> por dispositivo
function addDevice(devic) {
    const article = document.createElement("article");
    article.classList.add("article-dev");
    article.dataset.id = devic.dispositivo_id; 
    article.innerHTML = `
        <div class="sentry w100 ar-up">
            <img src="/img/${devic.alias}.png" alt="${devic.alias}" class="logos">
        </div>
        <div class="sentry w100 ar-down">
            <h3><span class="NAME">${devic.dispositivo_nombre}</span></h3>
            <p>OS: <span class="OS">${devic.OS}</span></p>
            <p>state: <span class="state">${devic.state}</span></p>
            <p>TDP: <span class="TDP">${devic.TDP}</span></p>
            <div class="btns">
                <button class="start btn">start</button>
                <button class="shut btn">shut down</button>
            </div>
        </div>
    `;
    father.appendChild(article);
}
