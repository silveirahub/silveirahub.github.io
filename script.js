// Atualiza o ano no rodapé automaticamente
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});

// Você pode adicionar mais interatividade aqui, como:
// - Validação de formulários de contato (se você criar um).
// - Animações ao rolar a página.
// - Um modo claro/escuro para o site.
