// Show error message inside topbar contents
function showError(message) {
  const contents = document.querySelector('.contents');
  if (contents) {
    contents.innerHTML = `<span class="text-danger">${message}</span>`;
  }
}

// Fetch services data
async function fetchServices() {
  try {
    const configRes = await fetch('./assets/js/json/config.json');
    const config = await configRes.json();
    const response = await fetch(`${config.configApi}/services`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Your backend returns: { total, data: [...] }
    const services = Array.isArray(data.data) ? data.data : [];

    // Extract only titles
    const titles = services.map(service => service.title || 'Untitled');
    console.log("Service Titles:", titles);

    return titles;
  } catch (err) {
    console.error('Error fetching services:', err);
    showError('Failed to load services. Please try again later.');
    return [];
  }
}

// Populate titles into HTML
async function populateServices() {
  const contents = document.querySelector('.contents-edublog');
  if (!contents) {
    console.error('Contents container not found');
    return;
  }

  const titles = await fetchServices();

  if (titles.length === 0) {
    contents.innerHTML = '<span>No services available.</span>';
    return;
  }

  // Show titles joined with |
  contents.innerHTML = titles.join(' | ');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', populateServices);
