// Show error message
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
    }
}

// Fetch colleges data
async function fetchColleges() {
    try {
        const configRes = await fetch('./assets/js/json/config.json');
        const config = await configRes.json();
        const response = await fetch(`${config.configApi}/college`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data.colleges) ? data.colleges : [];
    } catch (err) {
        console.error('Error fetching colleges:', err);
        showError('Failed to load trending colleges. Please try again later.');
        return [];
    }
}

// Populate trending colleges
async function populateTrendingColleges() {
    const trendingList = document.getElementById('trendingColleges');
    if (!trendingList) {
        console.error('Trending colleges list not found');
        return;
    }

    const colleges = await fetchColleges();
    // Filter trending colleges (e.g., recommended or popular) and take up to 10
    const trendingColleges = colleges
        .filter(college => college.status === 'recommended' || college.status === 'popular')
        .slice(0, 10);

    if (trendingColleges.length === 0) {
        trendingList.innerHTML = '<li>No trending colleges available</li>';
        return;
    }

    trendingList.innerHTML = trendingColleges
        .map(college => `<li><a href="college-detailse.html?id=${college._id}">${college.name || 'Unknown College'}</a></li>`)
        .join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', populateTrendingColleges);