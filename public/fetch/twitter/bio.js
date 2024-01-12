// Verileri almak için bir GET isteği yapalım
fetch('http://127.0.0.1:8005/dataTwitter')
    .then(response => response.json())
    .then(data => {
        // Verileri işleyerek Chart.js grafik üzerinde gösterelim
        const labels = data.map(channel => channel.date.substring(0,10));
        const bio = data.map(channel => channel.bio);
        document.getElementById("bio").textContent=bio[0]
       
     
    })
    .catch(error => console.error('Error:', error));
