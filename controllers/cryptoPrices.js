document.addEventListener("DOMContentLoaded", function () {
    const btcPriceEl = document.getElementById("btc-price");
    const ethPriceEl = document.getElementById("eth-price");

    async function fetchCryptoPrices() {
        try {
            const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
            const data = await response.json();
            btcPriceEl.textContent = `$${data.bitcoin.usd}`;
            ethPriceEl.textContent = `$${data.ethereum.usd}`;
        } catch (error) {
            btcPriceEl.textContent = "Ошибка загрузки";
            ethPriceEl.textContent = "Ошибка загрузки";
        }
    }

    fetchCryptoPrices();
    setInterval(fetchCryptoPrices, 60000); // Обновлять каждые 60 секунд
});
