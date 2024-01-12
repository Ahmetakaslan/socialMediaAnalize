// Verileri almak için bir GET isteği yapalım
fetch('http://127.0.0.1:8005/data')
    .then(response => response.json())
    .then(data => {
        // Verileri işleyerek Chart.js grafik üzerinde gösterelim
        const labels = data.map(channel => channel.date.substring(0,10));
        const videoCount = data.map(channel => channel.videoCount);
   
  
        document.getElementById("goruntulenmeSayısı").textContent=videoCount[videoCount.length-1]
        // Chart.js grafik oluşturma
        const ctx = document.getElementById('bar-chart2').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Video Count',
                    backgroundColor: ["red","brown","blue","yellow","green","grey","black","pink"],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: videoCount,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));
