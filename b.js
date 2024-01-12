const originalDocument = {
    "_id": {
      "$oid": "659fe2d9d12a35fc3cb2540b"
    },
    "followerCount": 200430,
    "followingCount": 250,
    "bio": "",
    "date": {
      "$date": "2023-01-10T00:00:00.000Z"
    },
    "username": "Barış Özcan",
    "name": "@BarisOzcan"
  };
  
  for (let i = 1; i <= 12; i++) {
    const newDocument = { ...originalDocument };
  
    // Benzersiz _id oluştur
    const uniqueId = "somePrefix_" + i;  // Örneğin, "somePrefix_1", "somePrefix_2", ...
    newDocument._id.$oid = uniqueId;
  
    // Ayı güncelle ve rastgele artış
    const month = i < 10 ? "0" + i : i;
    const newDate = new Date(`2023-${month}-10T00:00:00.000Z`);
    newDocument.date.$date = newDate;
  
    const randomIncrease = Math.floor(Math.random() * (500 - 100)) + 100; // Follower sayısını hızlı artırmak için
    newDocument.followerCount += randomIncrease;
  
    // En son 12. ayda hedef değerlere ulaştırma
    if (i === 12) {
      newDocument.followerCount = 330440;
      newDocument.followingCount = 494;
    }
  
    // Konsola yazdırma
    console.log("---------------------------");
    console.log(JSON.stringify(newDocument, null, 2));
  }
  
  console.log("12 belge oluşturuldu ve konsola yazdırıldı.");
 
  