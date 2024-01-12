// ChatGPT API anahtarınız
const apiKey = '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';

// API endpoint URL'si
const apiUrl = 'https://api.openai.com/v1/chat/completions';

// Örnek bir metin girişi
const mesaj=document.getElementById("Başlik").textContent;
const userMessage = mesaj;

// API'yi çağırma fonksiyonu
async function callChatGPT() {
  console.log("İçerde")
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage },
        ],
      }),
    });

     
    if (response.ok) {
      const result = await response.json();
      const assistantResponse = result.choices[0].message.content;
      console.log(assistantResponse);
      document.getElementById("Yorumparagrafi").textContent=assistantResponse;
    } else {
      console.error('API çağrısı başarısız:', response.status);
    }
  } catch (error) {
    console.error('API çağrısı sırasında bir hata oluştu:', error);
  }
}

// Fonksiyonu çağır
callChatGPT();

 // Add this code in instaCharts.js or your JavaScript file
 document.addEventListener("DOMContentLoaded", function () {
  // Display the loading indicator
  document.getElementById("loadingIndicator").style.display = "block";

  // Simulate data fetching delay (replace this with your actual data fetching logic)
  setTimeout(function () {
      // Hide the loading indicator
      document.getElementById("loadingIndicator").style.display = "none";

      // Display the data
      document.getElementById("Başlik").innerText = "Hakkında";
      document.getElementById("Yorumparagrafi").innerText = "Yanıt Bekleniyor";
  }, 2000); // Simulated 2 seconds delay, replace with actual data fetching logic timing
});