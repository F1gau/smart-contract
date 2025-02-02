// Проверка наличия MetaMask
window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask доступен!');
        const provider = window.ethereum;

        try {
            // Запрос на подключение к MetaMask
            await provider.request({ method: 'eth_requestAccounts' });
            console.log('MetaMask подключен.');

            // Подключение MetaMask через кнопку
            document.getElementById('connectMetaMask').addEventListener('click', async () => {
                try {
                    const accounts = await provider.request({ method: 'eth_requestAccounts' });
                    console.log('Подключенный аккаунт:', accounts[0]);

                    // Сохранение аккаунта пользователя в локальном хранилище
                    localStorage.setItem('userAccount', accounts[0]);
                    window.location.href = 'index.html'; // Переход на главную страницу после подключения
                } catch (error) {
                    console.error('Ошибка подключения к MetaMask:', error);
                }
            });

            // Отслеживание смены аккаунтов
            provider.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    console.log('Пользователь отключил MetaMask.');
                    alert('MetaMask отключен. Пожалуйста, подключите учетную запись.');
                } else {
                    console.log('Аккаунт изменён:', accounts[0]);
                    localStorage.setItem('userAccount', accounts[0]);
                }
            });

            // Отслеживание смены сети
            provider.on('chainChanged', (chainId) => {
                console.log('Сеть изменена на:', chainId);
                window.location.reload(); // Перезагрузка страницы при смене сети
            });
        } catch (error) {
            console.error('Ошибка при подключении к MetaMask:', error);
        }
    } else {
        console.log('MetaMask не найден. Установите MetaMask.');
        alert('MetaMask не установлен. Пожалуйста, установите расширение MetaMask.');
    }
});
