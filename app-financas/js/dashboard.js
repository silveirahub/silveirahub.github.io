document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        // Adiciona um listener de clique a cada item do menu
        item.addEventListener('click', function(event) {
            // Previne a navegação padrão para fins de demonstração.
            // REMOVA esta linha se quiser que o link funcione normalmente.
            // event.preventDefault();

            const text = item.querySelector('.menu-text').textContent;
            console.log(`Você clicou em: ${text}`);

            // Exemplo de feedback visual via JavaScript
            alert(`Você está indo para: ${text}`);
        });
    });

    // Função que você usaria para adicionar dinamicamente um novo botão (exemplo)
    function adicionarNovoBotao(texto, href, iconeClasse) {
        const container = document.getElementById('menuPrincipal');
        const novoLink = document.createElement('a');
        novoLink.href = href;
        novoLink.className = 'menu-item';
        
        novoLink.innerHTML = `
            <i class="${iconeClasse} menu-icon"></i>
            <span class="menu-text">${texto}</span>
        `;
        
        // Adiciona o novo botão ao container
        container.appendChild(novoLink);
        
        // Adiciona o event listener ao novo botão
        novoLink.addEventListener('click', function(event) {
            // event.preventDefault();
            alert(`Novo botão clicado: ${texto}`);
        });
    }

    // Exemplo de como usar a função para adicionar mais botões via JS:
    // adicionarNovoBotao('Relatórios', '/relatorios', 'fas fa-file-alt');
});
