const code = "ABCD12xyz123";
const url = "http://gamf.nhely.hu/ajax2/";

function validateInput(name, height, weight) {
  if (!name || !height || !weight) return false;
  if (name.length > 30 || height.length > 30 || weight.length > 30) return false;
  return true;
}

function readData() {
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: `op=read&code=${code}`
  })
  .then(res => res.json())
  .then(data => {
    let output = "";
    let heights = [];
    data.list.forEach(item => {
      output += `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}<br>`;
      heights.push(Number(item.height));
    });
    document.getElementById("output").innerHTML = output;
    
    if (heights.length > 0) {
      const sum = heights.reduce((a,b) => a+b, 0);
      const avg = sum / heights.length;
      const max = Math.max(...heights);
      document.getElementById("summary").innerHTML = 
        `<br><strong>Magasság összeg:</strong> ${sum} cm<br>
        <strong>Átlag:</strong> ${avg.toFixed(2)} cm<br>
        <strong>Max:</strong> ${max} cm`;
    }
  });
}

function createData() {
  const name = document.getElementById("createName").value;
  const height = document.getElementById("createHeight").value;
  const weight = document.getElementById("createWeight").value;

  if (!validateInput(name, height, weight)) {
    document.getElementById("createMessage").innerText = "Hibás adatok!";
    return;
  }

  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`
  })
  .then(res => res.text())
  .then(result => {
    document.getElementById("createMessage").innerText = result === "1" ? "Sikeres létrehozás!" : "Sikertelen!";
    readData();
  });
}

function getDataForId() {
  const id = document.getElementById("updateId").value;
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: `op=read&code=${code}`
  })
  .then(res => res.json())
  .then(data => {
    const record = data.list.find(item => item.id === id);
    if (record) {
      document.getElementById("updateName").value = record.name;
      document.getElementById("updateHeight").value = record.height;
      document.getElementById("updateWeight").value = record.weight;
    } else {
      document.getElementById("updateMessage").innerText = "Nem található adat!";
    }
  });
}

function updateData() {
  const id = document.getElementById("updateId").value;
  const name = document.getElementById("updateName").value;
  const height = document.getElementById("updateHeight").value;
  const weight = document.getElementById("updateWeight").value;

  if (!validateInput(name, height, weight)) {
    document.getElementById("updateMessage").innerText = "Hibás adatok!";
    return;
  }

  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${code}`
  })
  .then(res => res.text())
  .then(result => {
    document.getElementById("updateMessage").innerText = result === "1" ? "Sikeres módosítás!" : "Sikertelen!";
    readData();
  });
}

function deleteData() {
  const id = document.getElementById("deleteId").value;
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: `op=delete&id=${id}&code=${code}`
  })
  .then(res => res.text())
  .then(result => {
    document.getElementById("deleteMessage").innerText = result === "1" ? "Törölve!" : "Nem sikerült törölni!";
    readData();
  });
}
