    // Arrays para armazenar os dados de cada dia
    let dailyData = [];
    // Variável para rastrear o índice do item que está sendo editado
    let editingIndex = null;

    // Função para salvar os dados no localStorage
    function saveData() {
        localStorage.setItem('motoboyData', JSON.stringify(dailyData));
    }

    // Função para carregar os dados do localStorage
    function loadData() {
        const savedData = localStorage.getItem('motoboyData');
        if (savedData) {
            dailyData = JSON.parse(savedData);
        }
    }

    // Função para adicionar/salvar um registro
    function addEntry() {
        const dateInput = document.getElementById('date');
        const uberInput = document.getElementById('uber');
        const nine9Input = document.getElementById('nine9');
        const gasInput = document.getElementById('gas');
        const gasPriceInput = document.getElementById('gasPrice');
        const otherCostsInput = document.getElementById('otherCosts');

        const date = dateInput.value;
        const uber = parseFloat(uberInput.value) || 0;
        const nine9 = parseFloat(nine9Input.value) || 0;
        const gas = parseFloat(gasInput.value) || 0;
        const gasPrice = parseFloat(gasPriceInput.value) || 0;
        const otherCosts = parseFloat(otherCostsInput.value) || 0;

        if (!date) {
            alert('Por favor, preencha a data!');
            return;
        }

        const gasCost = gas * gasPrice;
        const dailyEarnings = uber + nine9;
        const dailyExpenses = gasCost + otherCosts;
        const dailyBalance = dailyEarnings - dailyExpenses;

        const newEntry = {
            date,
            uber,
            nine9,
            gas,
            // Adiciona a quantidade de litros
            gasPrice,
            // Adiciona o preço por litro
            gasCost,
            otherCosts,
            dailyBalance
        };

        if (editingIndex !== null) {
            // Se estiver editando, substitui o item existente
            dailyData[editingIndex] = newEntry;
            editingIndex = null;
            document.querySelector('button').textContent = 'Adicionar Dia';
        } else {
            // Se não estiver editando, adiciona um novo item
            dailyData.push(newEntry);
        }

        saveData();
        updateTable();
        updateSummary();

        dateInput.value = '';
        uberInput.value = '';
        nine9Input.value = '';
        gasInput.value = '';
        gasPriceInput.value = '';
        otherCostsInput.value = '';
    }

    // --- Funções de Ações (Deletar e Editar) ---

    // Função para deletar um registro
    function deleteEntry(index) {
        if (confirm('Tem certeza que deseja deletar este registro?')) {
            dailyData.splice(index, 1);
            saveData();
            updateTable();
            updateSummary();
        }
    }

    // Função para carregar os dados no formulário para edição
    function editEntry(index) {
        const entry = dailyData[index];

        document.getElementById('date').value = entry.date;
        document.getElementById('uber').value = entry.uber;
        document.getElementById('nine9').value = entry.nine9;
        document.getElementById('gas').value = entry.gas;
        document.getElementById('gasPrice').value = entry.gasPrice;
        document.getElementById('otherCosts').value = entry.otherCosts;

        // Define o índice de edição para que a função addEntry saiba qual item atualizar
        editingIndex = index;

        // Altera o texto do botão para indicar o modo de edição
        document.querySelector('button').textContent = 'Salvar Edição';
    }

    // --- Funções de Visualização ---

    // Função para atualizar a tabela de histórico (agora com os botões)
    function updateTable() {
        const tableBody = document.querySelector('#history-table tbody');
        tableBody.innerHTML = '';

        dailyData.forEach((entry, index) => {
            const row = tableBody.insertRow();
            row.innerHTML = `
            <td>${entry.date}</td>
            <td>R$ ${entry.uber.toFixed(2)}</td>
            <td>R$ ${entry.nine9.toFixed(2)}</td>
            <td>R$ ${entry.gasCost.toFixed(2)}</td>
            <td>R$ ${entry.otherCosts.toFixed(2)}</td>
            <td>R$ ${entry.dailyBalance.toFixed(2)}</td>
            <td>
            <button class="edit-btn" onclick="editEntry(${index})">Editar</button>
            <button class="delete-btn" onclick="deleteEntry(${index})">Deletar</button>
            </td>
            `;
        });
    }

    // Função para atualizar o resumo semanal/total
    function updateSummary() {
        const totalEarnings = dailyData.reduce((sum, entry) => sum + (entry.uber + entry.nine9), 0);
        const totalExpenses = dailyData.reduce((sum, entry) => sum + (entry.gasCost + entry.otherCosts), 0);
        const finalBalance = totalEarnings - totalExpenses;

        document.getElementById('total-earnings').textContent = `R$ ${totalEarnings.toFixed(2)}`;
        document.getElementById('total-expenses').textContent = `R$ ${totalExpenses.toFixed(2)}`;
        document.getElementById('final-balance').textContent = `R$ ${finalBalance.toFixed(2)}`;
    }

    // Inicializar a aplicação: carregar os dados salvos e atualizar a interface
    function init() {
        loadData();
        updateTable();
        updateSummary();
    }

    window.onload = init;;
