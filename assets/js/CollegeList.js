// let collegesData = [];

//     // Show error message
//     function showError(message) {
//       const errorMessage = document.getElementById('errorMessage');
//       if (errorMessage) {
//         errorMessage.textContent = message;
//         errorMessage.style.display = 'block';
//       }
//     }

//     // Fetch colleges data
//     async function fetchColleges() {
//       try {
//         const configRes = await fetch('./assets/js/json/config.json');
//         const config = await configRes.json();
//         const response = await fetch(`${config.configApi}/college`);
//         const data = await response.json();
//         collegesData = Array.isArray(data.colleges) ? data.colleges : [];
//         return collegesData;
//       } catch (err) {
//         console.error('Error fetching colleges:', err);
//         showError('Failed to load colleges. Please try again later.');
//         return [];
//       }
//     }

//     // Fetch unique countries
//     async function fetchCountries() {
//       try {
//         const configRes = await fetch('./assets/js/json/config.json');
//         const config = await configRes.json();
//         const response = await fetch(`${config.configApi}/countries`);
//         const result = await response.json();
//         const countries = Array.isArray(result.data) ? result.data : [];
//         if (!Array.isArray(countries)) {
//           console.error('Countries data is not an array:', result);
//           showError('Failed to load countries. Invalid data format.');
//           return [];
//         }
//         return [...new Set(countries.map(country => {
//           if (typeof country.name !== 'string') {
//             console.warn('Invalid country name:', country);
//             return null;
//           }
//           return country.name;
//         }).filter(name => name !== null))];
//       } catch (err) {
//         console.error('Error fetching countries:', err);
//         showError('Failed to load countries. Please try again later.');
//         return [];
//       }
//     }

//     // Fetch unique states
//     async function fetchStates() {
//       try {
//         const configRes = await fetch('./assets/js/json/config.json');
//         const config = await configRes.json();
//         const response = await fetch(`${config.configApi}/states`);
//         const result = await response.json();
//         const states = Array.isArray(result.data) ? result.data : [];
//         if (!Array.isArray(states)) {
//           console.error('States data is not an array:', result);
//           showError('Failed to load states. Invalid data format.');
//           return [];
//         }
//         return [...new Set(states.map(state => {
//           if (typeof state.name !== 'string') {
//             console.warn('Invalid state name:', state);
//             return null;
//           }
//           return state.name;
//         }).filter(name => name !== null))];
//       } catch (err) {
//         console.error('Error fetching states:', err);
//         showError('Failed to load states. Please try again later.');
//         return [];
//       }
//     }

//     // Fetch unique courses
//     async function fetchCourses() {
//       try {
//         const colleges = await fetchColleges();
//         const allCourses = new Set();
//         colleges.forEach(college => {
//           if (Array.isArray(college.courses)) {
//             college.courses.forEach(course => {
//               if (typeof course === 'string') {
//                 allCourses.add(course);
//               }
//             });
//           }
//         });
//         return Array.from(allCourses);
//       } catch (err) {
//         console.error('Error fetching courses:', err);
//         showError('Failed to load courses. Please try again later.');
//         return [];
//       }
//     }

//     // Populate countries dropdown
//     async function populateCountries() {
//       const countryFilter = document.getElementById('countryFilter');
//       if (!countryFilter) {
//         console.error('Country filter element not found');
//         showError('Page error: Country filter not found.');
//         return;
//       }
//       const countries = await fetchCountries();
//       countryFilter.innerHTML = '<option value="">All Countries</option>' +
//         countries.map(country => `<option value="${country}">${country}</option>`).join('');
//     }

//     // Populate states dropdown
//     async function populateStates() {
//       const stateFilter = document.getElementById('stateFilter');
//       if (!stateFilter) {
//         console.error('State filter element not found');
//         showError('Page error: State filter not found.');
//         return;
//       }
//       const states = await fetchStates();
//       stateFilter.innerHTML = '<option value="">All States</option>' +
//         states.map(state => `<option value="${state}">${state}</option>`).join('');
//     }

//     // Populate colleges
//     async function displayColleges() {
//       const collegesList = document.getElementById('collegesList');
//       if (!collegesList) {
//         console.error('Colleges list element not found');
//         showError('Page error: Colleges list not found.');
//         return;
//       }
//       const colleges = await fetchColleges();
//       collegesList.innerHTML = colleges.map(college => `
//   <div class="col">
//     <div class="card college-card shadow-sm bg-light">
//       <img src="${college.image || 'placeholder.jpg'}" 
//            class="card-img-top college-img" 
//            alt="${college.name || 'College'}" 
//            style="height: 200px; width: 100%; object-fit: cover;">
//       <div class="card-body">
//         <h5 class="card-title fw-bold">${college.name || 'Unknown College'}</h5>
//         <p class="card-text">
//           ${(college.desc || '').substring(0, 100)}${college.desc && college.desc.length > 100 ? '...' : ''}
//         </p>
//         <p class="card-text">
//   <small class="text-muted d-flex align-items-center">
//     <img 
//       src="${college.country?.image || 'placeholder.png'}" 
//       alt="${college.country?.name || 'Flag'}" 
//       style="height:15px; width:15px; object-fit:cover; margin-right:6px;"
//     >
//     ${(college.country?.name) || 'Unknown'}, ${(college.state?.name) || 'Unknown'}
//   </small>
// </p>
//         <a href="college-detailse.html?id=${college._id}" class="btn btn-primary w-100 rounded-pill">
//           View More <i class="bi bi-arrow-right-circle-fill ms-2 fs-5"></i>
//         </a>
//       </div>
//     </div>
//   </div>
// `).join('');

//       if (colleges.length > 0) {
//         showCollege(colleges[0]._id);
//       }
//     }

//     function showCollege(collegeId) {
//       console.log(`Showing college with ID: ${collegeId}`);
//       const collegeCards = document.querySelectorAll('.college-card');
//       collegeCards.forEach(card => {
//         const viewMoreLink = card.querySelector('.btn');
//         if (viewMoreLink && viewMoreLink.href.includes(collegeId)) {
//           card.classList.add('border-primary', 'border-2');
//         } else {
//           card.classList.remove('border-primary', 'border-2');
//         }
//       });
//     }

//     // Filter colleges
//     async function filterColleges() {
//       const collegesList = document.getElementById('collegesList');
//       if (!collegesList) {
//         console.error('Colleges list element not found');
//         showError('Page error: Colleges list not found.');
//         return;
//       }
//       const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
//       const country = document.getElementById('countryFilter')?.value || '';
//       const state = document.getElementById('stateFilter')?.value || '';

//       const colleges = await fetchColleges();
//       const filteredColleges = colleges.filter(college => {
//         const matchesSearch = (college.name || '').toLowerCase().includes(search);
//         const matchesCountry = !country || (college.country && college.country.name === country);
//         const matchesState = !state || (college.state && college.state.name === state);
//         return matchesSearch && matchesCountry && matchesState;
//       });

//       collegesList.innerHTML = filteredColleges.map(college => `
//                 <div class="col">
//     <div class="card college-card shadow-sm bg-light">
//       <img src="${college.image || 'placeholder.jpg'}" 
//            class="card-img-top college-img" 
//            alt="${college.name || 'College'}" 
//            style="height: 200px; width: 100%; object-fit: cover;">
//       <div class="card-body">
//         <h5 class="card-title fw-bold">${college.name || 'Unknown College'}</h5>
//         <p class="card-text">
//           ${(college.desc || '').substring(0, 100)}${college.desc && college.desc.length > 100 ? '...' : ''}
//         </p>
//         <p class="card-text">
//   <small class="text-muted d-flex align-items-center">
//     <img 
//       src="${college.country?.image || 'placeholder.png'}" 
//       alt="${college.country?.name || 'Flag'}" 
//       style="height:15px; width:15px; object-fit:cover; margin-right:6px;"
//     >
//     ${(college.country?.name) || 'Unknown'}, ${(college.state?.name) || 'Unknown'}
//   </small>
// </p>
//         <a href="college-detailse.html?id=${college._id}" class="btn btn-primary w-100 rounded-pill">
//           View More <i class="bi bi-arrow-right-circle-fill ms-2 fs-5"></i>
//         </a>
//       </div>
//     </div>
//   </div>
// `).join('');

//     }

//     // Event listeners
//     function setupEventListeners() {
//       const searchInput = document.getElementById('searchInput');
//       const countryFilter = document.getElementById('countryFilter');
//       const stateFilter = document.getElementById('stateFilter');

//       if (searchInput) {
//         searchInput.addEventListener('input', filterColleges);
//       } else {
//         console.error('Search input element not found');
//       }
//       if (countryFilter) {
//         countryFilter.addEventListener('change', filterColleges);
//       } else {
//         console.error('Country filter element not found');
//       }
//       if (stateFilter) {
//         stateFilter.addEventListener('change', filterColleges);
//       } else {
//         console.error('State filter element not found');
//       }
//     }

//     // Initial render
//     async function init() {
//       await populateCountries();
//       await populateStates();
//       await displayColleges();
//       setupEventListeners();
//     }

//     document.addEventListener('DOMContentLoaded', init);



let collegesData = [];

// Show error message
function showError(message) {
  const errorMessage = document.getElementById('errorMessage');
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }
}

// Fetch colleges data
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

// Fetch unique countries
async function fetchCountries() {
  try {
    const configRes = await fetch('./assets/js/json/config.json');
    const config = await configRes.json();
    const response = await fetch(`${config.configApi}/countries`);
    const result = await response.json();
    const countries = Array.isArray(result.data) ? result.data : [];
    if (!Array.isArray(countries)) {
      console.error('Countries data is not an array:', result);
      showError('Failed to load countries. Invalid data format.');
      return [];
    }
    return [...new Set(countries.map(country => {
      if (typeof country.name !== 'string') {
        console.warn('Invalid country name:', country);
        return null;
      }
      return country.name;
    }).filter(name => name !== null))];
  } catch (err) {
    console.error('Error fetching countries:', err);
    showError('Failed to load countries. Please try again later.');
    return [];
  }
}

// Fetch unique states (all states)
async function fetchStates() {
  try {
    const configRes = await fetch('./assets/js/json/config.json');
    const config = await configRes.json();
    const response = await fetch(`${config.configApi}/states`);
    const result = await response.json();
    const states = Array.isArray(result.data) ? result.data : [];
    if (!Array.isArray(states)) {
      console.error('States data is not an array:', result);
      showError('Failed to load states. Invalid data format.');
      return [];
    }
    return [...new Set(states.map(state => {
      if (typeof state.name !== 'string') {
        console.warn('Invalid state name:', state);
        return null;
      }
      return state.name;
    }).filter(name => name !== null))];
  } catch (err) {
    console.error('Error fetching states:', err);
    showError('Failed to load states. Please try again later.');
    return [];
  }
}

// Fetch unique courses
async function fetchCourses() {
  try {
    const colleges = await fetchColleges();
    const allCourses = new Set();
    colleges.forEach(college => {
      if (Array.isArray(college.courses)) {
        college.courses.forEach(course => {
          if (typeof course === 'string') {
            allCourses.add(course);
          }
        });
      }
    });
    return Array.from(allCourses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    showError('Failed to load courses. Please try again later.');
    return [];
  }
}

// Populate countries dropdown
async function populateCountries() {
  const countryFilter = document.getElementById('countryFilter');
  if (!countryFilter) {
    console.error('Country filter element not found');
    showError('Page error: Country filter not found.');
    return;
  }
  const countries = await fetchCountries();
  countryFilter.innerHTML = '<option value="">All Countries</option>' +
    countries.map(country => `<option value="${country}">${country}</option>`).join('');
}

// Populate states dropdown
async function populateStates() {
  const stateFilter = document.getElementById('stateFilter');
  if (!stateFilter) {
    console.error('State filter element not found');
    showError('Page error: State filter not found.');
    return;
  }
  const states = await fetchStates();
  stateFilter.innerHTML = '<option value="">All States</option>' +
    states.map(state => `<option value="${state}">${state}</option>`).join('');
}

// Populate colleges
async function displayColleges() {
  const collegesList = document.getElementById('collegesList');
  if (!collegesList) {
    console.error('Colleges list element not found');
    showError('Page error: Colleges list not found.');
    return;
  }
  const colleges = await fetchColleges();
  collegesList.innerHTML = colleges.map(college => `
    <div class="col">
      <div class="card college-card shadow-sm bg-light">
        <img src="${college.image || 'placeholder.jpg'}" 
             class="card-img-top college-img" 
             alt="${college.name || 'College'}" 
             style="height: 200px; width: 100%; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title fw-bold">${college.name || 'Unknown College'}</h5>
          <p class="card-text">
            ${(college.desc || '').substring(0, 100)}${college.desc && college.desc.length > 100 ? '...' : ''}
          </p>
          <p class="card-text">
            <small class="text-muted d-flex align-items-center">
              <img 
                src="${college.country?.image || 'placeholder.png'}" 
                alt="${college.country?.name || 'Flag'}" 
                style="height:15px; width:15px; object-fit:cover; margin-right:6px;"
              >
              ${(college.country?.name) || 'Unknown'}, ${(college.state?.name) || 'Unknown'}
            </small>
          </p>
          <a href="college-detailse.html?id=${college._id}" class="btn btn-primary w-100 rounded-pill">
            View More <i class="bi bi-arrow-right-circle-fill ms-2 fs-5"></i>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  if (colleges.length > 0) {
    showCollege(colleges[0]._id);
  }
}

function showCollege(collegeId) {
  console.log(`Showing college with ID: ${collegeId}`);
  const collegeCards = document.querySelectorAll('.college-card');
  collegeCards.forEach(card => {
    const viewMoreLink = card.querySelector('.btn');
    if (viewMoreLink && viewMoreLink.href.includes(collegeId)) {
      card.classList.add('border-primary', 'border-2');
    } else {
      card.classList.remove('border-primary', 'border-2');
    }
  });
}

// Filter colleges
async function filterColleges() {
  const collegesList = document.getElementById('collegesList');
  if (!collegesList) {
    console.error('Colleges list element not found');
    showError('Page error: Colleges list not found.');
    return;
  }
  const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const country = document.getElementById('countryFilter')?.value || '';
  const state = document.getElementById('stateFilter')?.value || '';

  const colleges = await fetchColleges();
  const filteredColleges = colleges.filter(college => {
    const matchesSearch = (college.name || '').toLowerCase().includes(search);
    const matchesCountry = !country || (college.country && college.country.name === country);
    const matchesState = !state || (college.state && college.state.name === state);
    return matchesSearch && matchesCountry && matchesState;
  });

  collegesList.innerHTML = filteredColleges.map(college => `
    <div class="col">
      <div class="card college-card shadow-sm bg-light">
        <img src="${college.image || 'placeholder.jpg'}" 
             class="card-img-top college-img" 
             alt="${college.name || 'College'}" 
             style="height: 200px; width: 100%; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title fw-bold">${college.name || 'Unknown College'}</h5>
          <p class="card-text">
            ${(college.desc || '').substring(0, 100)}${college.desc && college.desc.length > 100 ? '...' : ''}
          </p>
          <p class="card-text">
            <small class="text-muted d-flex align-items-center">
              <img 
                src="${college.country?.image || 'placeholder.png'}" 
                alt="${college.country?.name || 'Flag'}" 
                style="height:15px; width:15px; object-fit:cover; margin-right:6px;"
              >
              ${(college.country?.name) || 'Unknown'}, ${(college.state?.name) || 'Unknown'}
            </small>
          </p>
          <a href="college-detailse.html?id=${college._id}" class="btn btn-primary w-100 rounded-pill">
            View More <i class="bi bi-arrow-right-circle-fill ms-2 fs-5"></i>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  if (filteredColleges.length === 0) {
    collegesList.innerHTML = '<p class="text-center">No colleges found matching the criteria.</p>';
  }
}

// Event listeners
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const countryFilter = document.getElementById('countryFilter');
  const stateFilter = document.getElementById('stateFilter');

  if (searchInput) {
    searchInput.addEventListener('input', filterColleges);
  } else {
    console.error('Search input element not found');
  }
  if (countryFilter) {
    countryFilter.addEventListener('change', filterColleges);
  } else {
    console.error('Country filter element not found');
  }
  if (stateFilter) {
    stateFilter.addEventListener('change', filterColleges);
  } else {
    console.error('State filter element not found');
  }

  // Listen for custom event from navigation state dropdown
  document.addEventListener('navStateSelected', async (event) => {
    const selectedState = event.detail;
    const stateFilter = document.getElementById('stateFilter');
    if (stateFilter && selectedState) {
      stateFilter.value = selectedState;
      await filterColleges();
    }
  });
}

// Initial render
async function init() {
  await populateCountries();
  await populateStates();
  // Check if a state was pre-selected (e.g., from navigation)
  const urlParams = new URLSearchParams(window.location.search);
  const selectedState = urlParams.get('state');
  const stateFilter = document.getElementById('stateFilter');
  if (selectedState && stateFilter) {
    stateFilter.value = selectedState;
  }
  await displayColleges();
  // Apply filters if a state is pre-selected
  if (selectedState) {
    await filterColleges();
  }
  setupEventListeners();
}

document.addEventListener('DOMContentLoaded', init);