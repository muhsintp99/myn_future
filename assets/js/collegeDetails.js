// Show error message
   function showError(message) {
       const errorMessage = document.getElementById('errorMessage');
       if (errorMessage) {
           errorMessage.textContent = message;
           errorMessage.classList.remove('d-none');
       }
   }

   // Fetch college data by ID
   async function fetchCollegeById(collegeId) {
       try {
           const configRes = await fetch('./assets/js/json/config.json');
           const config = await configRes.json();
           const response = await fetch(`${config.configApi}/college/${collegeId}`);
           if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
           }
           const data = await response.json();
           console.log('API Response:', data); // Debug log
           if (!data) {
               throw new Error('College not found');
           }
           // Handle different response structures
           return data.college || data.data || data;
       } catch (err) {
           console.error('Error fetching college:', err);
           showError('Failed to load college details. Please try again later.');
           return null;
       }
   }

   // Populate college details
   async function populateCollegeDetails() {
       const urlParams = new URLSearchParams(window.location.search);
       const collegeId = urlParams.get('id');

       if (!collegeId) {
           showError('No college ID provided.');
           return;
       }

       const college = await fetchCollegeById(collegeId);
       if (!college) {
           return;
       }

       // Update DOM elements with college data
       document.getElementById('collegeName').textContent = college.name || 'Unknown College';
       document.getElementById('collegeImage').src = college.image || './assets/img/images/placeholder.jpg';
       document.getElementById('collegeImage').alt = college.name || 'College';
       document.getElementById('collegeDescription').textContent = college.desc || 'No description available.';
       document.getElementById('collegeAddress').textContent = college.address || 'No address available.';
       document.getElementById('collegeLocation').textContent = `${college.country?.name || 'Unknown'}, ${college.state?.name || 'Unknown'}`;
       document.getElementById('collegePhone').textContent = college.phone || 'No phone available.';
       document.getElementById('collegePhone').href = college.phone ? `tel:${college.phone}` : '#';
       document.getElementById('collegeEmail').textContent = college.email || 'No email available.';
       document.getElementById('collegeEmail').href = college.email ? `mailto:${college.email}` : '#';
       document.getElementById('collegeWebsite').textContent = college.website || 'No website available.';
       document.getElementById('collegeWebsite').href = college.website || '#';
   }

   // Initialize on page load
   document.addEventListener('DOMContentLoaded', populateCollegeDetails);