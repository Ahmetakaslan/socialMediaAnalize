 // Chart.js ile grafiği oluşturun

 //Gönderi istatistik grafiği
 var ctx = document.getElementById('bar-chart').getContext('2d');
 var myChart = new Chart(ctx, {
     type: 'line', // Çizgi grafiği türü
     data: {
         labels: ['01.01.2023', '01.02.2023', '01.03.2023', '01.04.2023', '01.05.2023','01.06.2023','01.07.2023','01.08.2023','01.09.2023','01.10.2023','01.11.2023','01.12.2023'],
         datasets: [{
             label: 'Gönderi Artış Miktarı',
             data: [1,2,1,3,1,2,1,2,2,1,1,3],
             borderColor: 'rgba(75, 0, 255,1)', // Çizgi rengi
             borderWidth: 3, // Çizgi kalınlığı
             fill: false // Alan doldurma
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
   

 //takipçi istatistik grafiği
 var ctx = document.getElementById('pie-chart').getContext('2d');
 var myChart = new Chart(ctx, {
     type: 'pie', // Çizgi grafiği türü
     data: {
         labels: ['01.01.2023', '01.02.2023', '01.03.2023', '01.04.2023', '01.05.2023','01.06.2023','01.07.2023','01.08.2023','01.09.2023','01.10.2023','01.11.2023','01.12.2023'],
         datasets: [{
             label: 'Takipçi Artış Miktarı',
             data: [53021,46577,51478,59733,36897,50489,65324,44852,48320,33548,62357,32125],
             backgroundColor: ["#E400C2","#E48900","#E4C600","#9BE400","#00E4BA","#15E400","#00E4B7","#0067E4","#8336EF","#F31428","#0211E2","#80007E"],
             borderColor: 'rgba(75, 0, 255,1)', // Çizgi rengi
             borderWidth: 2, // Çizgi kalınlığı
             fill: false // Alan doldurma
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


 //takip istatistik grafiği

 var ctx = document.getElementById('bar-chart2').getContext('2d');
 var myChart = new Chart(ctx, {
     type: 'bar', // Çizgi grafiği türü
     data: {
         labels: ['01.01.2023', '01.02.2023', '01.03.2023', '01.04.2023', '01.05.2023','01.06.2023','01.07.2023','01.08.2023','01.09.2023','01.10.2023','01.11.2023','01.12.2023'],
         datasets: [{
             label: 'Takip edilen Artış Miktarı',
             data: [8,12,9,10,6,14,7,6,9,5,4,6],
             backgroundColor: ["#E400C2","#E48900","#E4C600","#9BE400","#00E4BA","#15E400","#00E4B7","#0067E4","#8336EF","#F31428","#0211E2","#80007E"],
             borderColor: 'blue', // Çizgi rengi
             borderWidth: 2, // Çizgi kalınlığı
             fill: false // Alan doldurma
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



 //Beğeni Artış miktarı

 var ctx = document.getElementById('line-chart2').getContext('2d');
 var myChart = new Chart(ctx, {
     type: 'bar', // Çizgi grafiği türü
     data: {
         labels: ['01.01.2023', '01.02.2023', '01.03.2023', '01.04.2023', '01.05.2023','01.06.2023','01.07.2023','01.08.2023','01.09.2023','01.10.2023','01.11.2023','01.12.2023'],
         datasets: [{
             label: 'Beğeni Artış Miktarı',
             data: [5302,4657,5147,5973,3689,5048,6532,4485,4832,3354,6235,3212],
             backgroundColor: ["red","brown","blue","yellow","green","grey","black","pink"],
             borderColor: 'rgba(0, 0, 0,1)', // Çizgi rengi
             borderWidth: 2, // Çizgi kalınlığı
             fill: false // Alan doldurma
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
    
