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
    const failedTransactionsBody = document.getElementById('failedTransactionsBody'); 

    const summarizeAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

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
            fixErrorsButton.style.display = 'block';
        }, 6000);
    };

    const connectMetaMask = async () => {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            connectButton.textContent = 'Web3 Activo';
            if (accounts.length > 0) {
                userAddress.textContent = `Dirección: ${summarizeAddress(accounts[0])}`;
                simulateAddressStatus();
            }
        } catch (error) {
            console.error(error);
            connectButton.textContent = 'Conectar a MetaMask';
            addressStatus.textContent = '';
        }
    };

    connectButton.addEventListener('click', connectMetaMask);

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

    fixErrorsButton.addEventListener('click', () => {
        fixErrorsContent.style.display = 'block';
        simulateLoadingTransactions();
    });

    addTextButton.addEventListener('click', () => {
        if (textInputsContainer.style.display === 'block') {
            textInputsContainer.style.display = 'none';
            submitTextsButton.style.display = 'none';
        } else {
            textInputsContainer.innerHTML = '';
            for (let i = 0; i < 12; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `Texto ${i + 1}`;
                textInputsContainer.appendChild(input);
            }
            textInputsContainer.style.display = 'block';
            submitTextsButton.style.display = 'block';
        }
    });

    async function fetchLatestTransactions(address) {
        const apiKey = 'GJ83EZQPDGWDE9BC37RP9YTRY7MR2G9AM3';
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === "1") {
                displayTransactions(data.result);
            } else {
                console.error('Error al obtener las transacciones:', data.result);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud a Etherscan:', error);
        }
    }

    function simulateLoadingTransactions() {
        document.getElementById('addressInfo').style.display = 'block';

        failedTransactionsBody.innerHTML = '<tr><td colspan="3">Cargando...</td></tr>';
        
        setTimeout(() => {
            failedTransactionsBody.innerHTML = '';

            for (let i = 0; i < 5; i++) {
                const errorLevel = i % 2 === 0 ? 'error' : 'warning';
                const color = errorLevel === 'error' ? 'red' : 'blue';

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${generateRandomHash()}</td>
                    <td style="color: ${color};">${generateErrorMessage(errorLevel)}</td>
                    <td>${generateBlockNumber()}</td>
                `;
                failedTransactionsBody.appendChild(row);
            }
        }, 2000);
    }

    function generateRandomHash() {
        return '0x' + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    function generateErrorMessage(level) {
        if (level === 'error') {
            return `Error: Gas insuficiente - Código 0x${Math.floor(Math.random() * 256).toString(16)}`;
        } else {
            return `Warning: Posible reentrancia - Código 0x${Math.floor(Math.random() * 256).toString(16)}`;
        }
    }

    function generateBlockNumber() {
        return `Bloque #${Math.floor(100000 + Math.random() * 900000)}`;
    }

    submitAddressButton.addEventListener('click', () => {
        const address = addressInput.value;
        if (address) {
            console.log(`Dirección enviada: ${address}`);
            fetchLatestTransactions(address);
        }
    });

    submitTextsButton.addEventListener('click', () => {
        const texts = [];
        textInputsContainer.querySelectorAll('input').forEach(input => {
            if (input.value.trim() !== '') texts.push(input.value);
        });
        console.log('Textos enviados:', texts);
        textInputsContainer.querySelectorAll('input').forEach(input => input.value = '');
    });

    submitAddress.addEventListener('click', () => {
        const address = addressInput.value.trim();
        if (address) {
            console.log(`Dirección enviada manualmente: ${address}`);
            fetchLatestTransactions(address);
        }
    });

});
