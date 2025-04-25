// Web Storage példa
function saveToStorage() {
    const input = document.getElementById('storageInput').value;
    localStorage.setItem('savedText', input);
    alert('Szöveg elmentve!');
}

function loadFromStorage() {
    const savedText = localStorage.getItem('savedText');
    document.getElementById('storageOutput').textContent = savedText || 'Nincs mentett szöveg';
}

// Web Workers példa
let worker;

function startWorker() {
    if (typeof(Worker) !== "undefined") {
        if (!worker) {
            worker = new Worker('data:text/javascript,' + encodeURIComponent(`
                let i = 0;
                function timedCount() {
                    i++;
                    postMessage(i);
                    setTimeout(timedCount, 1000);
                }
                timedCount();
            `));
            
            worker.onmessage = function(event) {
                document.getElementById('workerOutput').textContent = 
                    "Számolás eredménye: " + event.data;
            };
        }
    } else {
        alert("A böngésződ nem támogatja a Web Workereket!");
    }
}

function stopWorker() {
    if (worker) {
        worker.terminate();
        worker = null;
        document.getElementById('workerOutput').textContent = "Számolás eredménye: ";
    }
}

// Server-Sent Events példa
let eventSource;

function startSSE() {
    if (typeof(EventSource) !== "undefined") {
        // Egy egyszerű mock SSE forrás
        eventSource = new EventSource('data:text/event-stream,event: message\ndata: SSE példa üzenet - ' + new Date().toLocaleTimeString() + '\n\n');
        
        eventSource.onmessage = function(event) {
            document.getElementById('sseOutput').textContent = event.data;
        };
    } else {
        alert("A böngésződ nem támogatja a Server-Sent Events-t!");
    }
}

function stopSSE() {
    if (eventSource) {
        eventSource.close();
        document.getElementById('sseOutput').textContent = "Kapcsolat lezárva";
    }
}

// Geolocation példa
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const output = `Szélesség: ${position.coords.latitude}, 
                                Hosszúság: ${position.coords.longitude}`;
                document.getElementById('locationOutput').textContent = output;
            },
            function(error) {
                document.getElementById('locationOutput').textContent = 
                    "Hiba történt: " + error.message;
            }
        );
    } else {
        document.getElementById('locationOutput').textContent = 
            "A böngésződ nem támogatja a geolokációt!";
    }
}

// Drag and Drop példa
const dragItem = document.getElementById('dragItem');
const dropZone = document.getElementById('dropZone');

dragItem.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('text/plain', this.id);
    this.classList.add('highlight');
});

dragItem.addEventListener('dragend', function() {
    this.classList.remove('highlight');
});

dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.borderColor = '#3498db';
});

dropZone.addEventListener('dragleave', function() {
    this.style.borderColor = '#aaa';
});

dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(id);
    this.innerHTML = '';
    this.appendChild(draggedElement);
    this.style.borderColor = '#aaa';
});

// Canvas példa
function drawOnCanvas() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 50, 50);
    
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.strokeRect(70, 10, 50, 50);
    
    ctx.beginPath();
    ctx.arc(150, 35, 25, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
}

// SVG példa
function changeSvgColor() {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('svgCircle').setAttribute('fill', randomColor);
}