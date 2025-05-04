// Function to extract data from the table
function getTableData() {
    const table = document.getElementById('dataTable');
    const data = [];
    
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const rowData = [];
        
        for (let j = 1; j < row.cells.length - 1; j++) {
            rowData.push(parseInt(row.cells[j].textContent));
        }
        
        data.push({
            label: row.cells[0].textContent,
            data: rowData,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            borderWidth: 2,
            tension: 0.1
        });
    }
    
    return data;
}

// Generate random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initialize chart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    const allData = getTableData();
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1. negyedév', '2. negyedév', '3. negyedév', '4. negyedév'],
            datasets: [allData[0]]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Negyedéves adatok diagramja',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    // Add event listener for the selector
    document.getElementById('rowSelector').addEventListener('change', function() {
        const selectedRow = parseInt(this.value);
        chart.data.datasets = [allData[selectedRow]];
        chart.update();
    });
});