const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" }); // Destination folder for saving the photo

app.post("/analyze", upload.single("media"), (req, res) => {
  // Handle the uploaded file
  const file = req.file;
  // Process the file as per your requirements (e.g., save it, analyze it, etc.)

  // Simulating some analysis results
  const analysisResults = [
    { object: "Elephant", confidence: "95%" },
    { object: "Tiger", confidence: "88%" },
    { object: "Lion", confidence: "76%" },
  ];

  // Provide the analysis results as response
  res.json(analysisResults);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function analyzeMedia() {
  var mediaFile = document.getElementById("media-upload").files[0];
  if (!mediaFile) {
    alert("Please select a file to analyze.");
    return;
  }

  var formData = new FormData();
  formData.append("media", mediaFile);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/analyze", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var results = JSON.parse(xhr.responseText);
      displayResults(results);
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      alert("An error occurred during analysis.");
    }
  };

  document.getElementById("loading-message").style.display = "block";
  xhr.send(formData);
}

function displayResults(results) {
  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  // Display the analysis results
  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    var resultText = "<p>Object: " + result.object + "</p>";
    resultText += "<p>Confidence: " + result.confidence + "</p>";
    resultsDiv.innerHTML += resultText;
  }

  document.getElementById("loading-message").style.display = "none";
}
