// Verileri almak için bir GET isteği yapalım
fetch('http://127.0.0.1:8005/dataTwitter')
    .then(response => response.json())
    .then(data => {
        // Verileri işleyerek Chart.js grafik üzerinde gösterelim
        const labels = data.map(channel => channel.date.substring(0,10));
        const followerCount = data.map(channel => channel.followerCount);
        document.getElementById("followerCount").textContent=followerCount[0];
        // Chart.js grafik oluşturma
        const ctx = document.getElementById('bar-chart2').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Follower Count',
                    backgroundColor: ["red","brown","blue","yellow","green","grey","black","pink"],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: followerCount,
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
