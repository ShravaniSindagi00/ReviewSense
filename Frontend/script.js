// DOM Elements
const productUrlInput = document.getElementById("product-url");
const fetchButton = document.getElementById("fetch-button");
const spinner = document.getElementById("spinner");
const resultsSection = document.getElementById("results-section");
const chartsDiv = document.getElementById("charts");
const summaryDiv = document.getElementById("summary");
const recommendationText = document.getElementById("recommendation-text");

// Validate URL Function
function isValidAmazonUrl(url) {
    const amazonRegex = /^(https?:\/\/)?(www\.)?amazon\.[a-z]{2,6}\/.+$/;
    return amazonRegex.test(url);
}

// Simulated Data Fetching
function fetchData() {
    // Mocked data structure
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ratings: [50, 30, 10, 7, 3], // Example rating distribution
                sentiments: { positive: 70, negative: 20, neutral: 10 }, // Example sentiment percentages
                summary: "Most customers are happy with this product. Positive feedback highlights quality and usability.",
                recommendation: "Based on the reviews, this product is recommended for purchase.",
            });
        }, 2000); // Simulate 2-second API fetch time
    });
}

// Chart Rendering Function
function renderCharts(data) {
    // Rating Distribution Chart
    const ratingsCtx = document.getElementById("ratings-chart").getContext("2d");
    new Chart(ratingsCtx, {
        type: "bar",
        data: {
            labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
            datasets: [{
                label: "Rating Distribution",
                data: data.ratings,
                backgroundColor: [
                    "#4caf50", "#8bc34a", "#ffc107", "#ff9800", "#f44336"
                ],
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
            },
        },
    });

    // Sentiment Chart
    const sentimentCtx = document.getElementById("sentiment-chart").getContext("2d");
    new Chart(sentimentCtx, {
        type: "pie",
        data: {
            labels: ["Positive", "Negative", "Neutral"],
            datasets: [{
                data: [data.sentiments.positive, data.sentiments.negative, data.sentiments.neutral],
                backgroundColor: ["#4caf50", "#f44336", "#ffc107"],
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "bottom" },
            },
        },
    });
}

// Display Results
function displayResults(data) {
    // Render Charts
    renderCharts(data);

    // Update Summary
    summaryDiv.innerHTML = `<h4>Review Summary</h4><p>${data.summary}</p>`;

    // Update Recommendation
    recommendationText.textContent = data.recommendation;
}

// Fetch Button Click Handler
fetchButton.addEventListener("click", async () => {
    const productUrl = productUrlInput.value.trim();

    if (!isValidAmazonUrl(productUrl)) {
        alert("Please enter a valid Amazon product URL.");
        return;
    }

    // Show spinner and hide results
    spinner.style.display = "block";
    resultsSection.style.display = "none";

    try {
        // Simulate Fetching Data
        const data = await fetchData();

        // Hide spinner and show results
        spinner.style.display = "none";
        resultsSection.style.display = "block";

        // Populate Results
        displayResults(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong. Please try again.");
        spinner.style.display = "none";
    }
});
