document.addEventListener("DOMContentLoaded", () => {
  getEnergyData();
});

document.getElementById("energy-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const deviceId = document.getElementById("deviceId").value;
  const deviceName = document.getElementById("deviceName").value;
  const energyConsumption = parseFloat(
    document.getElementById("energyConsumption").value
  );

  if (deviceId) {
    updateEnergyData(deviceId, deviceName, energyConsumption);
  } else {
    addEnergyData(deviceName, energyConsumption);
  }
});

// Fungsi Menampilkan Data dari Backend
async function getEnergyData() {
  try {
    const { data } = await axios.get(`http://localhost:5000/electros`);

    const tableBody = document.getElementById("energyTableBody");
    tableBody.innerHTML = "";

    let no = 1;
    data.forEach((item) => {
      const row = `
                <tr>
                    <td>${no}</td>
                    <td>${item.device_name}</td>
                    <td>${item.energy_consumption} Watt</td>
                    <td>${new Date(item.timestamp).toLocaleString()}</td>
                    <td>
                        <button onclick="editEnergyData('${item.id}', '${
        item.device_name
      }', '${item.energy_consumption}')">Edit</button>
                        <button onclick="deleteEnergyData('${
                          item.id
                        }')">Hapus</button>
                    </td>
                </tr>
            `;
      tableBody.innerHTML += row;
      no++;
    });

    updateChart(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Fungsi Menambahkan Data
function addEnergyData(device_name, energy_consumption) {
  axios
    .post(`http://localhost:5000/create-electros`, {
      device_name,
      energy_consumption,
    })
    .then(() => {
      resetForm();
      getEnergyData();
    })
    .catch((error) => console.error("Error adding data:", error));
}

// Fungsi Mengupdate Data
function updateEnergyData(id, device_name, energy_consumption) {
  axios
    .put(`http://localhost:5000/update-electros/${id}`, {
      device_name,
      energy_consumption,
    })
    .then(() => {
      resetForm();
      getEnergyData();
    })
    .catch((error) => console.error("Error updating data:", error));
}

// Fungsi Menghapus Data
function deleteEnergyData(id) {
  axios
    .delete(`http://localhost:5000/delete-electros/${id}`)
    .then(() => getEnergyData())
    .catch((error) => console.error("Error deleting data:", error));
}

// Fungsi Mengedit Data
function editEnergyData(id, device_name, energy_consumption) {
  document.getElementById("deviceId").value = id;
  document.getElementById("deviceName").value = device_name;
  document.getElementById("energyConsumption").value = energy_consumption;
}

// Reset Form
function resetForm() {
  document.getElementById("deviceId").value = "";
  document.getElementById("deviceName").value = "";
  document.getElementById("energyConsumption").value = "";
}

// Fungsi Menampilkan Grafik Konsumsi Energi
let energyChart;
function updateChart(energyData) {
  const ctx = document.getElementById("energyChart").getContext("2d");

  if (energyChart) {
    energyChart.destroy();
  }

  energyChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: energyData.map((item) =>
        new Date(item.timestamp).toLocaleString()
      ),
      datasets: [
        {
          label: "Konsumsi Energi (Watt)",
          data: energyData.map((item) => item.energy_consumption),
          borderColor: "#4A90E2",
          backgroundColor: "rgba(74, 144, 226, 0.2)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Waktu" } },
        y: { title: { display: true, text: "Konsumsi Energi (Watt)" } },
      },
    },
  });
}
