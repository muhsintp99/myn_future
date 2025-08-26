// // headerStates.js

// // Fetch recommended states (same logic as fetchStates in CollegeList.js)
// async function fetchRecommendedStates() {
//   try {
//     const configRes = await fetch('./assets/js/json/config.json');
//     const config = await configRes.json();
//     const response = await fetch(`${config.configApi}/states`);
//     const result = await response.json();
//     const states = Array.isArray(result.data) ? result.data : [];
//     if (!Array.isArray(states)) {
//       console.error('States data is not an array:', result);
//       return [];
//     }
//     return [...new Set(states
//       .filter(state => state.recommend === true)
//       .map(state => {
//         if (typeof state.name !== 'string') {
//           console.warn('Invalid state name:', state);
//           return null;
//         }
//         return state.name;
//       })
//       .filter(name => name !== null))];
//   } catch (err) {
//     console.error('Error fetching states:', err);
//     return [];
//   }
// }

// // Populate state dropdown in navigation
// async function populateNavStates() {
//   const stateDropdown = document.getElementById('stateDropdown');
//   if (!stateDropdown) {
//     console.error('State dropdown element not found');
//     return;
//   }
//   const states = await fetchRecommendedStates();
//   stateDropdown.innerHTML = states
//     .map(state => `<li><a href="#" class="state-link" data-state="${state}">${state}</a></li>`)
//     .join('');

//   // Add event listeners to state links
//   const stateLinks = stateDropdown.querySelectorAll('.state-link');
//   stateLinks.forEach(link => {
//     link.addEventListener('click', (e) => {
//       e.preventDefault();
//       const selectedState = e.target.getAttribute('data-state');
//       // Dispatch custom event to notify state selection
//       const event = new CustomEvent('navStateSelected', { detail: selectedState });
//       document.dispatchEvent(event);
//       // Optionally, navigate to colleges page
//       window.location.href = './colleges.html';
//     });
//   });
// }

// // Initialize on DOM content loaded
// document.addEventListener('DOMContentLoaded', populateNavStates);



// headerStates.js

// Fetch recommended states
async function fetchRecommendedStates() {
  try {
    const configRes = await fetch('./assets/js/json/config.json');
    const config = await configRes.json();
    const response = await fetch(`${config.configApi}/states`);
    const result = await response.json();
    const states = Array.isArray(result.data) ? result.data : [];
    if (!Array.isArray(states)) {
      console.error('States data is not an array:', result);
      return [];
    }
    return [...new Set(states
      .filter(state => state.recommend === true)
      .map(state => {
        if (typeof state.name !== 'string') {
          console.warn('Invalid state name:', state);
          return null;
        }
        return state.name;
      })
      .filter(name => name !== null))];
  } catch (err) {
    console.error('Error fetching states:', err);
    return [];
  }
}

// Populate state dropdown in navigation
async function populateNavStates() {
  const stateDropdown = document.getElementById('stateDropdown');
  if (!stateDropdown) {
    console.error('State dropdown element not found');
    return;
  }
  const states = await fetchRecommendedStates();
  stateDropdown.innerHTML = states
    .map(state => `<li><a href="#" class="state-link" data-state="${state}">${state}</a></li>`)
    .join('');

  // Add event listeners to state links
  const stateLinks = stateDropdown.querySelectorAll('.state-link');
  stateLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedState = e.target.getAttribute('data-state');
      // Dispatch custom event to notify state selection
      const event = new CustomEvent('navStateSelected', { detail: selectedState });
      document.dispatchEvent(event);
      // Navigate to colleges page with state query parameter
      window.location.href = `./colleges.html?state=${encodeURIComponent(selectedState)}`;
    });
  });
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', populateNavStates);