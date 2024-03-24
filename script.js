document.addEventListener('DOMContentLoaded', async () => {
    const connectButton = document.getElementById('connectButton');
    const userAddress = document.getElementById('userAddress');
    const addressStatus = document.getElementById('addressStatus');

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
        }
    });
});
