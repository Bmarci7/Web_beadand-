
document.addEventListener('DOMContentLoaded', ()=> {
   
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        
        
        if (currentPage === linkPage) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
});