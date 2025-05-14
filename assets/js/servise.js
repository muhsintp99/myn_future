document.addEventListener('DOMContentLoaded', function () {
  const listContainer = document.getElementById('services-list');
  const detailContainer = document.getElementById('service-detail');
  const shortDesc = document.getElementById('short-description');
  const descriptionText = document.getElementById('description-text');
  let servicesData = [];

  // Fetch the JSON file
  fetch('data/services.json')
    .then(res => res.json())
    .then(data => {
      servicesData = data;
      renderServiceLinks(data);
      showService(data[0].id);  // Show the first service by default
    });

  // Render sidebar links
  function renderServiceLinks(services) {
    listContainer.innerHTML = '';
    services.forEach((service, index) => {
      const a = document.createElement('a');
      a.href = `#service-${service.id}`;  // Add href to each link
      a.textContent = service.title;
      a.dataset.id = service.id;
      a.classList.add('service-link');
      
      // Add the 'active' class to the first item
      if (index === 0) {
        a.classList.add('active');
      }

      a.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Remove 'active' class from all links
        document.querySelectorAll('.service-link').forEach(link => link.classList.remove('active'));

        // Add 'active' class to the clicked link
        this.classList.add('active');

        // Show the selected service details
        showService(this.dataset.id);
      });

      listContainer.appendChild(a);
    });
  }

  // Display selected service
  function showService(id) {
    const service = servicesData.find(item => item.id === id);
    if (!service) return;

    shortDesc.textContent = service.short_description;
    descriptionText.textContent = '';

    detailContainer.innerHTML = `
      <img src="${service.image}" alt="${service.title}" class="img-fluid services-img">
      <h3>${service.heading}</h3>
      <p>${service.content[0]}</p>
      <p>${service.content[1]}</p>
      <ul>
        ${service.features.map(f => `<li><i class="bi bi-check-circle"></i> <span>${f}</span></li>`).join('')}
      </ul>
      ${service.extra_content.map(p => `<p>${p}</p>`).join('')}
    `;
  }
});
