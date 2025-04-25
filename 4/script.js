document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#dataTable tbody');
    const numRows = 5;
    const numCols = 5;
    const data = [];

    // Generate random numbers in a 5x5 array
    for (let i = 0; i < numRows; i++) {
        const row = [];
        const tr = document.createElement('tr');
        for (let j = 0; j < numCols; j++) {
            const value = Math.floor(Math.random() * 100); // Numbers between 0-99
            row.push(value);
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
        data.push(row);
    }

    const ctx = document.getElementById('lineChart').getContext('2d');
    let chart;

    // Table row click event handler
    document.querySelectorAll('#dataTable tr').forEach((tr, rowIndex) => {
        tr.addEventListener('click', () => {
            const rowData = data[rowIndex];
            const labels = rowData.map((_, i) => `Oszlop ${i + 1}`);

            if (chart) {
                chart.destroy();
            }

            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `Kiválasztott ${rowIndex + 1}. sor`,
                        data: rowData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
    });
});