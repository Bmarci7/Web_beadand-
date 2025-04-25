const API_URL = "http://gamf.nhely.hu/ajax2/";
const USER_CODE = "HPBPCLwsg726"; 

// Element selection
const readBtn = document.getElementById('readData');
const createBtn = document.getElementById('createData');
const updateBtn = document.getElementById('updateData');
const deleteBtn = document.getElementById('deleteData');
const getDataBtn = document.getElementById('getDataForId');

const dataDisplay = document.getElementById('dataDisplay');
const heightStats = document.getElementById('heightStats');

// Display messages
function showMessage(elementId, message, isSuccess) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = isSuccess ? 'message success' : 'message error';
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// Input validation
function validateInputs(...inputs) {
    for (const input of inputs) {
        if (!input.value.trim()) {
            showMessage(`${input.id.replace(/(create|update)/, '$1')}Message`, 
                        "All fields must be filled!", false);
            input.focus();
            return false;
        }
        
        if (input.id.includes('Name') && input.value.length > 30) {
            showMessage(`${input.id.replace(/(create|update)/, '$1')}Message`, 
                        "Name can be maximum 30 characters!", false);
            input.focus();
            return false;
        }
    }
    return true;
}

// API call
async function callApi(params) {
    try {
        const formData = new FormData();
        formData.append('code', USER_CODE);
        
        for (const key in params) {
            formData.append(key, params[key]);
        }
        
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });
        
        return await response.json();
    } catch (error) {
        console.error('API error:', error);
        return null;
    }
}

// Read data
readBtn.addEventListener('click', async () => {
    const result = await callApi({ op: 'read' });
    
    if (result && result.list) {
        dataDisplay.innerHTML = '';
        let heights = [];
        
        result.list.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <strong>ID:</strong> ${item.id}<br>
                <strong>Name:</strong> ${item.name}<br>
                <strong>Height:</strong> ${item.height}<br>
                <strong>Weight:</strong> ${item.weight}<br>
                <hr>
            `;
            dataDisplay.appendChild(itemDiv);
            
            if (!isNaN(parseFloat(item.height))) {
                heights.push(parseFloat(item.height));
            }
        });
        
        // Calculate statistics
        if (heights.length > 0) {
            const sum = heights.reduce((a, b) => a + b, 0);
            const avg = sum / heights.length;
            const max = Math.max(...heights);
            
            heightStats.innerHTML = `
                <h3>Height statistics:</h3>
                <p>Sum: ${sum.toFixed(2)}</p>
                <p>Average: ${avg.toFixed(2)}</p>
                <p>Maximum: ${max.toFixed(2)}</p>
            `;
        } else {
            heightStats.innerHTML = '<p>No height data available.</p>';
        }
    } else {
        dataDisplay.innerHTML = '<p>Failed to fetch data.</p>';
    }
});

// Create new record
createBtn.addEventListener('click', async () => {
    const nameInput = document.getElementById('createName');
    const heightInput = document.getElementById('createHeight');
    const weightInput = document.getElementById('createWeight');
    
    if (!validateInputs(nameInput, heightInput, weightInput)) return;
    
    const result = await callApi({
        op: 'create',
        name: nameInput.value,
        height: heightInput.value,
        weight: weightInput.value
    });
    
    if (result !== null) {
        const success = result > 0;
        showMessage('createMessage', 
            success ? 'Successfully created!' : 'Creation failed!', 
            success);
        
        if (success) {
            nameInput.value = '';
            heightInput.value = '';
            weightInput.value = '';
        }
    } else {
        showMessage('createMessage', 'Error occurred during creation!', false);
    }
});

// Get data by ID
getDataBtn.addEventListener('click', async () => {
    const idInput = document.getElementById('updateId');
    
    if (!idInput.value.trim()) {
        showMessage('updateMessage', 'ID is required!', false);
        return;
    }
    
    const result = await callApi({ op: 'read' });
    
    if (result && result.list) {
        const item = result.list.find(i => i.id === idInput.value);
        
        if (item) {
            document.getElementById('updateName').value = item.name;
            document.getElementById('updateHeight').value = item.height;
            document.getElementById('updateWeight').value = item.weight;
            showMessage('updateMessage', 'Data loaded!', true);
        } else {
            showMessage('updateMessage', 'No record found with this ID!', false);
        }
    } else {
        showMessage('updateMessage', 'Failed to fetch data!', false);
    }
});

// Update record
updateBtn.addEventListener('click', async () => {
    const idInput = document.getElementById('updateId');
    const nameInput = document.getElementById('updateName');
    const heightInput = document.getElementById('updateHeight');
    const weightInput = document.getElementById('updateWeight');
    
    if (!validateInputs(idInput, nameInput, heightInput, weightInput)) return;
    
    const result = await callApi({
        op: 'update',
        id: idInput.value,
        name: nameInput.value,
        height: heightInput.value,
        weight: weightInput.value
    });
    
    if (result !== null) {
        const success = result > 0;
        showMessage('updateMessage', 
            success ? 'Successfully updated!' : 'Update failed!', 
            success);
    } else {
        showMessage('updateMessage', 'Error occurred during update!', false);
    }
});

// Delete record
deleteBtn.addEventListener('click', async () => {
    const idInput = document.getElementById('deleteId');
    
    if (!idInput.value.trim()) {
        showMessage('deleteMessage', 'ID is required!', false);
        return;
    }
    
    const result = await callApi({
        op: 'delete',
        id: idInput.value
    });
    
    if (result !== null) {
        const success = result > 0;
        showMessage('deleteMessage', 
            success ? 'Successfully deleted!' : 'Deletion failed!', 
            success);
        
        if (success) {
            idInput.value = '';
        }
    } else {
        showMessage('deleteMessage', 'Error occurred during deletion!', false);
    }
});