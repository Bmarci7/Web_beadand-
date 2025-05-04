// Adatok tárolása
let data = [
    { id: 1, name: "Kovács János", email: "kovacs.janos@example.com", age: 25 },
    { id: 2, name: "Nagy Eszter", email: "nagy.eszter@example.com", age: 30 },
    { id: 3, name: "Tóth Péter", email: "toth.peter@example.com", age: 22 },
    { id: 4, name: "Szabó Anna", email: "szabo.anna@example.com", age: 28 }
];

// Globális változók
let currentSortColumn = 'id';
let sortDirection = 'asc';
let isEditMode = false;
let currentEditId = null;

// DOM elemek
const tableBody = document.querySelector('#dataTable tbody');
const addBtn = document.getElementById('addBtn');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close');
const form = document.getElementById('dataForm');

// Inicializálás
document.addEventListener('DOMContentLoaded', function() {
    renderTable();
    setupEventListeners();
});

// Táblázat renderelése
function renderTable(filteredData = null) {
    const dataToRender = filteredData || data;
    
    tableBody.innerHTML = '';
    
    dataToRender.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.age}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${item.id}">Szerkesztés</button>
                <button class="action-btn delete-btn" data-id="${item.id}">Törlés</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Eseményfigyelők hozzáadása a gombokhoz
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEdit);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });
}

// Rendezés
function sortTable(column) {
    if (currentSortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = column;
        sortDirection = 'asc';
    }
    
    data.sort((a, b) => {
        if (a[column] < b[column]) return sortDirection === 'asc' ? -1 : 1;
        if (a[column] > b[column]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
    
    renderTable();
    updateSortIndicators();
}

function updateSortIndicators() {
    document.querySelectorAll('th').forEach(th => {
        const icon = th.querySelector('.sort-icon');
        if (th.dataset.sort === currentSortColumn) {
            icon.textContent = sortDirection === 'asc' ? '↑' : '↓';
        } else {
            icon.textContent = '↑↓';
        }
    });
}

// Keresés/szűrés
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (!searchTerm) {
        renderTable();
        return;
    }
    
    const filteredData = data.filter(item => 
        item.id.toString().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm) ||
        item.age.toString().includes(searchTerm)
    );
    
    renderTable(filteredData);
}

// Validáció
function validateField(input, errorId, fieldName) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
    
    if (input.validity.valueMissing) {
        errorElement.textContent = `${fieldName} mező kitöltése kötelező!`;
        return false;
    }
    
    if (input.type === 'email' && input.validity.typeMismatch) {
        errorElement.textContent = 'Érvényes email címet adjon meg!';
        return false;
    }
    
    if (input.validity.tooShort) {
        errorElement.textContent = `A mezőnek legalább ${input.minLength} karakter hosszúnak kell lennie!`;
        return false;
    }
    
    if (input.validity.tooLong) {
        errorElement.textContent = `A mezőnek legfeljebb ${input.maxLength} karakter hosszúnak kell lennie!`;
        return false;
    }
    
    if (input.type === 'number' && input.validity.rangeUnderflow) {
        errorElement.textContent = `A kor legalább ${input.min} év kell legyen!`;
        return false;
    }
    
    if (input.type === 'number' && input.validity.rangeOverflow) {
        errorElement.textContent = `A kor legfeljebb ${input.max} év lehet!`;
        return false;
    }
    
    return true;
}

function validateForm() {
    const nameValid = validateField(form.querySelector('#name'), 'nameError', 'Név');
    const emailValid = validateField(form.querySelector('#email'), 'emailError', 'Email');
    const ageValid = validateField(form.querySelector('#age'), 'ageError', 'Kor');
    
    return nameValid && emailValid && ageValid;
}

// CRUD műveletek
function handleAdd() {
    isEditMode = false;
    currentEditId = null;
    modalTitle.textContent = 'Új elem';
    form.reset();
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    modal.style.display = 'block';
}

function handleEdit(e) {
    isEditMode = true;
    const id = parseInt(e.target.dataset.id);
    currentEditId = id;
    const item = data.find(item => item.id === id);
    
    if (item) {
        modalTitle.textContent = 'Elem szerkesztése';
        document.getElementById('id').value = item.id;
        document.getElementById('name').value = item.name;
        document.getElementById('email').value = item.email;
        document.getElementById('age').value = item.age;
        document.querySelectorAll('.error').forEach(el => el.textContent = '');
        modal.style.display = 'block';
    }
}

function handleDelete(e) {
    if (confirm('Biztosan törölni szeretné ezt az elemet?')) {
        const id = parseInt(e.target.dataset.id);
        data = data.filter(item => item.id !== id);
        renderTable();
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const id = isEditMode ? currentEditId : generateId();
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const age = parseInt(form.querySelector('#age').value);
    
    const newItem = { id, name, email, age };
    
    if (isEditMode) {
        // Frissítés
        data = data.map(item => item.id === id ? newItem : item);
    } else {
        // Új elem
        data.push(newItem);
    }
    
    modal.style.display = 'none';
    renderTable();
}

function generateId() {
    return data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
}

// Eseményfigyelők beállítása
function setupEventListeners() {
    addBtn.addEventListener('click', handleAdd);
    searchInput.addEventListener('input', handleSearch);
    
    // Oszlop fejléc kattintás eseményfigyelők
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            sortTable(th.dataset.sort);
        });
    });
    
    // Modal bezárása
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Modal bezárása kattintásra a modal-on kívülre
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Form submit
    form.addEventListener('submit', handleFormSubmit);
    
    // Validáció
    document.getElementById('name').addEventListener('input', () => 
        validateField(document.getElementById('name'), 'nameError', 'Név'));
    document.getElementById('email').addEventListener('input', () => 
        validateField(document.getElementById('email'), 'emailError', 'Email'));
    document.getElementById('age').addEventListener('input', () => 
        validateField(document.getElementById('age'), 'ageError', 'Kor'));
}