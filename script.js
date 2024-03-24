document.addEventListener('DOMContentLoaded', async () => {
    const connectButton = document.getElementById('connectButton');
    const userAddress = document.getElementById('userAddress');
    const addressStatus = document.getElementById('addressStatus');
    const fixErrorsButton = document.getElementById('fixErrorsButton');
    const fixErrorsContent = document.getElementById('fixErrorsContent');
    const addressInput = document.getElementById('addressInput');
    const submitAddress = document.getElementById('submitAddress');
    const addTextButton = document.getElementById('addTextButton');
    const textInputsContainer = document.getElementById('textInputsContainer');
    const submitTextsButton = document.getElementById('submitTexts');

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
            addressStatus.textContent = 'Status Address: Con errores';
            addressStatus.style.color = 'yellow';
            // Mostrar botón "Corregir errores" después de mostrar errores
            fixErrorsButton.style.display = 'block';
        }, 6000);
    };

    // Función para conectar a MetaMask y simular estado de la dirección
    const connectMetaMask = async () => {
        try {
            // Solicitar al usuario que conecte MetaMask
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            // Cambiar el texto del botón a Web3 Activo
            connectButton.textContent = 'Web3 Activo';
            // Mostrar la dirección resumida del usuario
            if (accounts.length > 0) {
                userAddress.textContent = `Dirección: ${summarizeAddress(accounts[0])}`;
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
            userAddress.textContent = `Dirección: ${summarizeAddress(accounts[0])}`;
            connectButton.textContent = 'Web3 Activo';
            simulateAddressStatus();
        } else {
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
    });

    // Agregar inputs para texto al hacer clic en "Agrega tu texto"
    addTextButton.addEventListener('click', () => {
        textInputsContainer.innerHTML = ''; // Limpiar para evitar duplicados
        for (let i = 0; i < 12; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Texto ${i + 1}`;
            textInputsContainer.appendChild(input);
        }
        textInputsContainer.style.display = 'block';
        submitTextsButton.style.display = 'block';
    });

    // Aquí puedes agregar el código para manejar el envío de la dirección y los textos si es necesario
});
