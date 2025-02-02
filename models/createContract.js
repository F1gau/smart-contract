document.getElementById('create-contract-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const contractType = document.getElementById('contractType').value;
    const contractName = document.getElementById('contractName').value;
    const description = document.getElementById('description').value;

    const contractData = {
        type: contractType,
        name: contractName,
        description: description,
    };

    // Отправляем данные на сервер для создания контракта
    try {
        const response = await fetch('/api/createContract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contractData),
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Контракт успешно создан! ID: ${result.contractId}`);
        } else {
            alert('Ошибка при создании контракта.');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при создании контракта.');
    }
});
