document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.getElementById('tabs');
    const tabContentsContainer = document.getElementById('tabContents');

    // Dados das abas
    const tabsData = [
        { id: 'treino1', label: 'Treino 1' },
        { id: 'treino2', label: 'Treino 2' },
        { id: 'treino3', label: 'Treino 3' },
        { id: 'treino4', label: 'Treino 4' },
    ];

    // Gerar abas e conteúdos dinamicamente
    tabsData.forEach((tab, index) => {
        // Criar botão da aba
        const tabButton = document.createElement('button');
        tabButton.className = 'tab-button' + (index === 0 ? ' active' : '');
        tabButton.textContent = tab.label;
        tabButton.dataset.tab = tab.id;
        tabsContainer.appendChild(tabButton);

        // Criar conteúdo da aba
        const tabContent = document.createElement('div');
        tabContent.id = tab.id;
        tabContent.className = 'tab-content' + (index === 0 ? ' active' : '');
        tabContent.innerHTML = `
            <button class="add-button">
                <i class="fas fa-plus"></i> Adicionar Treino
            </button>
            <div class="treino-list"></div>
        `;
        tabContentsContainer.appendChild(tabContent);
    });

    // Alternar entre abas
    tabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-button')) {
            const targetTab = e.target.dataset.tab;
            document.querySelectorAll('.tab-button, .tab-content').forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        }
    });

    // Adicionar treino
    tabContentsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-button')) {
            const treinoList = e.target.closest('.tab-content').querySelector('.treino-list');
            addTreinoItem(treinoList);
        }
    });

    // Função para adicionar um novo treino
    function addTreinoItem(treinoList) {
        const treinoItem = document.createElement('div');
        treinoItem.className = 'treino-item';
        treinoItem.innerHTML = `
            <input type="text" placeholder="Nome do Treino">
            <button class="toggle-details">
                <i class="fas fa-chevron-down"></i> Exibir Detalhes
            </button>
            <button class="add-detalhes">
                <i class="fas fa-plus"></i> Adicionar Detalhes
            </button>
            <div class="detalhes-container"></div>
            <button class="delete-treino">
                <i class="fas fa-trash"></i> Excluir Treino
            </button>
        `;
        treinoList.appendChild(treinoItem);

        // Alternar visibilidade de detalhes
        const toggleButton = treinoItem.querySelector('.toggle-details');
        const detalhesContainer = treinoItem.querySelector('.detalhes-container');
        toggleButton.addEventListener('click', () => {
            detalhesContainer.style.display = detalhesContainer.style.display === 'none' ? 'block' : 'none';
            const icon = toggleButton.querySelector('i');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });

        // Adicionar detalhes ao treino
        const addDetalhesButton = treinoItem.querySelector('.add-detalhes');
        addDetalhesButton.addEventListener('click', () => {
            const detalhesForm = document.createElement('div');
            detalhesForm.className = 'detalhes-form';
            detalhesForm.innerHTML = `
                <input type="number" placeholder="Peso (kg)">
                <input type="number" placeholder="Séries">
                <input type="number" placeholder="Repetições">
                <button class="remove-detail">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            `;
            detalhesContainer.appendChild(detalhesForm);

            // Excluir detalhe
            const removeDetailButton = detalhesForm.querySelector('.remove-detail');
            removeDetailButton.addEventListener('click', () => {
                detalhesForm.remove();
            });
        });

        // Excluir treino
        const deleteButton = treinoItem.querySelector('.delete-treino');
        deleteButton.addEventListener('click', () => treinoItem.remove());
    }
});