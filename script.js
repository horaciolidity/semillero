document.addEventListener('DOMContentLoaded', async () => {
    const connectButton = document.getElementById('connectButton');
    const web3Status = document.getElementById('web3Status');
    const userAddress = document.getElementById('userAddress');

    // Función para conectar MetaMask
    connectButton.addEventListener('click', async () => {
        try {
            // Solicitar al usuario que conecte MetaMask
            await ethereum.request({ method: 'eth_requestAccounts' });
            // Mostrar estado activo
            web3Status.textContent = 'Web3 Activo';
            web3Status.style.color = 'green';
        } catch (error) {
            console.error(error);
            // Mostrar estado inactivo si hay un error
            web3Status.textContent = 'Web3 Inactivo';
            web3Status.style.color = 'red';
        }
    });

    // Obtener la dirección del usuario si MetaMask está conectado
    ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            userAddress.textContent = `Dirección del Usuario: ${accounts[0]}`;
        } else {
            userAddress.textContent = '';
        }
    });
});

