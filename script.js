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
            addressStatus.textContent = 'Status Address: Con errores';
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
            for (let i = 0; i < 5; i++) { // Cambié de 12 a 5 para simplificar
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `Texto ${i + 1}`;
                textInputsContainer.appendChild(input);
            }
            textInputsContainer.style.display = 'block';
            submitTextsButton.style.display = 'block';
        }
    });


    
    // Asegurando que addressInfo se haga visible.
    function simulateLoadingTransactions() {
        // Haciendo visible la sección addressInfo.
        document.getElementById('addressInfo').style.display = 'block';

        // Suponiendo que ya tienes la parte de "Cargando..." y reemplazo por datos reales después de un tiempo.
        const failedTransactionsBody = document.getElementById('failedTransactionsBody');
        failedTransactionsBody.innerHTML = '<tr><td colspan="3">Cargando...</td></tr>';
        setTimeout(() => {
            failedTransactionsBody.innerHTML = ''; // Limpiar "Cargando..."
            // Aquí va la lógica de añadir las transacciones fallidas simuladas.
            const failedTransactionsData = [
                { date: '2024-03-25', description: 'Gas Insuficiente', transaction: '0x123...' },
                { date: '2024-03-24', description: 'Error en el Fee', transaction: '0x456...' },
                // Agrega más datos según sea necesario.
            ];
            failedTransactionsData.forEach(tx => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${tx.date}</td><td>${tx.description}</td><td>${tx.transaction}</td>`;
                failedTransactionsBody.appendChild(row);
            });
        }, 2000); // Simulación de carga con delay.
    }


    // Función para manejar el envío de la dirección
    submitAddressButton.addEventListener('click', () => {
        const address = addressInput.value;
        if (address) {
            console.log(`Dirección enviada: ${address}`);
            // Aquí puedes agregar la lógica para manejar la dirección enviada
        }
    });

     // Función para manejar el envío de textos
    submitTextsButton.addEventListener('click', () => {
        const texts = [];
        textInputsContainer.querySelectorAll('input').forEach(input => {
            if (input.value.trim() !== '') texts.push(input.value);
        });
        console.log('Textos enviados:', texts);
        // Aquí puedes agregar la lógica para manejar los textos enviados, como enviarlos a una API o procesarlos de alguna manera

        // Opcionalmente, limpiar los campos después del envío
        textInputsContainer.querySelectorAll('input').forEach(input => input.value = '');
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
