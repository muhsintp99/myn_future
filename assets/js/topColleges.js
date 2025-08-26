let collegesData = [];

// Show error message
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
}

// Fetch colleges data (reusing from CollegeList.js logic)
async function fetchColleges() {
    try {
        const configRes = await fetch('./assets/js/json/config.json');
        const config = await configRes.json();
        const response = await fetch(`${config.configApi}/college`);
        const data = await response.json();
        collegesData = Array.isArray(data.colleges) ? data.colleges : [];
        return collegesData;
    } catch (err) {
        console.error('Error fetching colleges:', err);
        showError('Failed to load colleges. Please try again later.');
        return [];
    }
}

// Populate top colleges section
async function populateTopColleges() {
    const topCollegeSection = document.getElementById('topcollege');
    if (!topCollegeSection) {
        console.error('Top college section not found');
        showError('Page error: Top college section not found.');
        return;
    }

    const colleges = await fetchColleges();
    // Filter colleges with status "recommended" and take up to 3
    const recommendedColleges = colleges
        .filter(college => college.status === 'popular')
        .slice(0, 3);

    if (recommendedColleges.length === 0) {
        showError('No recommended colleges available.');
        topCollegeSection.style.display = 'none';
        return;
    }

    const collegeRow = topCollegeSection.querySelector('.row');
    if (!collegeRow) {
        console.error('College row element not found');
        showError('Page error: College row not found.');
        return;
    }

    // Clear existing content
    collegeRow.innerHTML = '';

    // Populate up to 3 colleges
    recommendedColleges.forEach((college, index) => {
        const delay = 100 * (index + 1);
        collegeRow.innerHTML += `
            <div class="col-xl-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="bg-light college-card w-100 card">
                    <img src="${college.image || './assets/img/logo/favicon.png'}" 
                         alt="${college.name || 'College'}" 
                         class="w-100" style=" height: 250px; object-fit: cover;">
                    

                    <div class="card-body">
                    <h5 class="card-title fw-bold">${college.name || 'Unknown College'}</h5>
         <p class="card-text">
  <small class="text-muted d-flex align-items-center">
    <img 
      src="${college.country?.image || 'placeholder.png'}" 
      alt="${college.country?.name || 'Flag'}" 
      style="height:15px; width:15px; object-fit:cover; margin-right:6px;"
    >
    ${(college.country?.name) || 'Unknown'}, ${(college.state?.name) || 'Unknown'}
  </small></p>
        <a href="college-detailse.html?id=${college._id}" class="btn btn-primary w-100 rounded-pill">
           Apply for Admission  <i class="bi bi-arrow-right-circle-fill ms-2 fs-5"></i>
        </a>

        </div>
                    
                </div>
            </div>
        `;
    });

    // If fewer than 3 colleges, hide empty columns
    if (recommendedColleges.length < 3) {
        for (let i = recommendedColleges.length; i < 3; i++) {
            collegeRow.innerHTML += `
                <div class="col-xl-4 col-md-6 d-flex" style="display: none;"></div>
            `;
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', populateTopColleges);