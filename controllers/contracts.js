document.addEventListener("DOMContentLoaded", function () {
    const contractsList = document.getElementById("contracts-list");

    const contracts = [
        { name: "Обмен BTC на ETH", type: "exchange", description: "Обмен биткоина на эфир" },
        { name: "Продажа недвижимости", type: "sale", description: "Продажа квартиры в Москве" },
        { name: "Покупка автомобиля", type: "purchase", description: "Покупка Tesla Model 3" }
    ];

    function renderContracts(filter = "") {
        contractsList.innerHTML = "";
        const filteredContracts = contracts.filter(contract => filter === "" || contract.type === filter);

        filteredContracts.forEach(contract => {
            const card = document.createElement("div");
            card.className = "contract-card";
            card.innerHTML = `<h3>${contract.name}</h3>
                              <p>Тип сделки: ${contract.type}</p>
                              <p>${contract.description}</p>`;
            contractsList.appendChild(card);
        });
    }

    renderContracts();

    document.getElementById("contractType").addEventListener("change", function (e) {
        renderContracts(e.target.value);
    });

    document.getElementById("search").addEventListener("input", function (e) {
        const searchText = e.target.value.toLowerCase();
        renderContracts();
        const cards = document.querySelectorAll(".contract-card");
        cards.forEach(card => {
            if (!card.innerText.toLowerCase().includes(searchText)) {
                card.style.display = "none";
            }
        });
    });
});
