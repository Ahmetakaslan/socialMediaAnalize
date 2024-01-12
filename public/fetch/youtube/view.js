// Verileri almak için bir GET isteği yapalım
fetch('http://127.0.0.1:8005/data')
    .then(response => response.json())
    .then(data => {
        // Verileri işleyerek Chart.js grafik üzerinde gösterelim
        const labels = data.map(channel => channel.date.substring(0,10));
        const viewCounts = data.map(channel => channel.viewCount);
         document.getElementById("goruntulenmeSayısı").textContent=viewCounts[viewCounts.length-1]
        // Chart.js grafik oluşturma
        const ctx = document.getElementById('pie-chart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'View Count',
                    backgroundColor: ["#E400C2","#E48900","#E4C600","#9BE400","#00E4BA","#15E400","#00E4B7","#0067E4","#8336EF","#F31428","#0211E2","#80007E"],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: viewCounts,
                    
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
