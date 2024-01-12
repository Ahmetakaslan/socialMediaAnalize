// Verileri almak için bir GET isteği yapalım
fetch('http://localhost:8005/data')
    .then(response => response.json())
    .then(data => {
        // Verileri işleyerek Chart.js grafik üzerinde gösterelim
        const labels = data.map(channel => channel.date.substring(0,10));
        const aciklama = data.map(channel => channel.description);
        const myLabel=[];
        for(let i =0; i<labels.length-2 ;i++){
            myLabel.push(labels[i])
        }
        const subscriberCounts = data.map(channel => channel.subscriberCount);
        document.getElementById("gercekaboneSayısı").textContent=subscriberCounts[subscriberCounts.length-1]
            document.getElementById("gercekaciklama").textContent=aciklama[0]
        const myList=[];
         for(let i=subscriberCounts.length-1;i>1;i--){
            myList.push(subscriberCounts[i]-subscriberCounts[i-1])
         }
    
        // Chart.js grafik oluşturma
        const ctx = document.getElementById('bar-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: myLabel,
                datasets: [{
                    label: 'Subscriber Count',
                    backgroundColor: ["#F54DFF","#A7A7A7","#FCC93E","#006B69"],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: myList,
                    
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
