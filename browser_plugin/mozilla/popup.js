document.getElementById('analyzeBtn').addEventListener('click', async () => {
  // Get the current tab's URL
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let url = new URL(tab.url);
  
  // Extract the domain
  let domain = extractRootDomain(url.hostname);
  
  // Run API request to the given endpoint
  let apiUrl = `https://fraud-free-api.onrender.com/Conclusion?url=${domain}`;
  
  try {
    let response = await fetch(apiUrl, { method: 'GET', headers: { 'accept': '*/*' } });
    if (response.ok) {
      let data = await response.json();
      displayResults(data);
    } else {
      displayError("Failed to fetch data. Please try again.");
    }
  } catch (error) {
    displayError("An error occurred. Please check your network connection.");
  }
});

// Function to extract the root domain (e.g., amazon.com)
function extractRootDomain(hostname) {
  let parts = hostname.split('.');
  if (parts.length > 2) {
    return parts.slice(parts.length - 2).join('.');
  }
  return hostname;
}

// Function to display results in the popup window
function displayResults(data) {
  let statusDiv = document.getElementById('status');
  let conclusionDiv = document.getElementById('conclusion');
  let detailsDiv = document.getElementById('details');
  
  if (data.status === "Safe") {
    statusDiv.style.backgroundColor = "green";
    statusDiv.style.color = "white";
    statusDiv.textContent = `Status: ${data.status}`;
    conclusionDiv.textContent = data.conclusion;
    detailsDiv.innerHTML = `<a class="big-txt" href="https://fraud-free.vercel.app/detail/${data.url}" target="_blank">Details</a>`;
  } else if (data.status === "Ok") {
    statusDiv.style.backgroundColor = "blue";
    statusDiv.style.color = "white";
    statusDiv.textContent = `Status: ${data.status}`;
    conclusionDiv.textContent = "This website is safe, but some issues were reported. Please proceed with caution.";
    detailsDiv.innerHTML = `<a class="big-txt" href="https://fraud-free.vercel.app/detail/${data.url}" target="_blank">Details</a>`;
  } else if (data.status === "Warning") {
    statusDiv.style.backgroundColor = "blue";
    statusDiv.style.color = "white";
    statusDiv.textContent = `Status: ${data.status}`;
    conclusionDiv.textContent = "This website is not safe, issues were reported. Please proceed with caution.";
    detailsDiv.innerHTML = `<a class="big-txt" href="https://fraud-free.vercel.app/detail/${data.url}" target="_blank">Details</a>`;
  } else {
    statusDiv.style.backgroundColor = "red";
    statusDiv.style.color = "white";
    statusDiv.textContent = `Status: ${data.status}`;
    conclusionDiv.textContent = "This website may not be safe. Avoid.";
    detailsDiv.innerHTML = `<a class="big-txt" href="https://fraud-free.vercel.app/detail/${data.url}" target="_blank">details</a>`;
  }
}

// Function to display an error message
function displayError(message) {
  let statusDiv = document.getElementById('status');
  let conclusionDiv = document.getElementById('conclusion');
  
  statusDiv.style.backgroundColor = "orange";
  statusDiv.style.color = "white";
  statusDiv.textContent = "Error";
  conclusionDiv.textContent = message;
}
