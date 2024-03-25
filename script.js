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
    const transactionErrorsDiv = document.getElementById('transactionErrors');
    const errorsListDiv = document.getElementById('errorsList');

    // Función para resumir la dirección del usuario
    const summarizeAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

    // Función para simular errores de transacción
    const simulateTransactionErrors = () => {
        return [
            { id: 'Error 1', description: 'Transacción fallida debido a error de fee insuficiente.' },
            // Puedes añadir más errores simulados aquí
        ];
    };

    // Mostrar errores de transacción
    const showTransactionErrors = (errors) => {
        errorsListDiv.innerHTML = ''; // Limpiar la lista actual
        errors.forEach(error => {
            const errorElement = document.createElement('p');
            errorElement.textContent = `${error.id}: ${error.description}`;
            errorsListDiv.appendChild(errorElement);
        });
        transactionErrorsDiv.style.display = 'block'; // Mostrar la sección de errores
    };

    // Función para simular el estado de la dirección
    const simulateAddressStatus = (address) => {
        let loadingSymbols = ['|', '/', '-', '\\'];
        let i = 0;

        const loadingInterval = setInterval(() => {
            addressStatus.textContent = `Status Address: ${loadingSymbols[i++ % loadingSymbols.length]}`;
        }, 150);

        setTimeout(() => {
            clearInterval(loadingInterval);
            addressStatus.textContent = 'Status Address: Con errores';
            addressStatus.style.color = 'red';
            // Mostrar errores de transacción simulados
            const errors = simulateTransactionErrors();
            showTransactionErrors(errors);
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
                // Simular el estado de la dirección y mostrar errores
                simulateAddressStatus(accounts[0]);
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
            simulateAddressStatus(accounts[0]);
        } else {
            userAddress.textContent = '';
            connectButton.textContent = 'Conectar a MetaMask';
            addressStatus.textContent = 'Status Address: ';
            addressStatus.style.color = 'initial';
            fixErrorsButton.style.display = 'none';
            transactionErrorsDiv.style.display = 'none';
        }
    });

    // A continuación, puedes continuar con la lógica para los botones y entradas que ya tenías
});
