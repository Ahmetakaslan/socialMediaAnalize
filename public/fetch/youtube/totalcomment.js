// Verileri almak için bir GET isteği yapalım
fetch('http://127.0.0.1:8005/data')
    .then(response => response.json())
    .then(data => {
        // Verileri işleyerek Chart.js grafik üzerinde gösterelim
        const labels = data.map(channel => channel.date.substring(0,10));
        const totalcomment = data.map(channel => channel.totalCommentCount);
    document.getElementById("yorumSayısı").textContent=totalcomment[totalcomment.length-1]
        // Chart.js grafik oluşturma 
        const ctx = document.getElementById('line-chart2').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Comment',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: totalcomment,

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
