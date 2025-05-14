document.addEventListener('DOMContentLoaded', function () {
  const listContainer = document.getElementById('courses-list');
  const detailContainer = document.getElementById('course-detail');
  const shortDesc = document.getElementById('short-description');
  const descriptionText = document.getElementById('description-text');
  let coursesData = [];

  // Fetch the JSON file containing the course data
  fetch('')
    .then(res => res.json())
    .then(data => {
      coursesData = data.courses;
      renderCourseLinks(data.courses);
      showCourse("#MBBS");  // Show the MBBS course by default
    });

  // Render course links in the sidebar
  function renderCourseLinks(courses) {
    listContainer.innerHTML = '';
    courses.forEach((course, index) => {
      const a = document.createElement('a');
      a.href = `#${course.id}`;  // Add href to each course link
      a.textContent = course.title;
      a.dataset.id = course.id;
      a.classList.add('course-link');
      
      // Add the 'active' class to the first item
      if (index === 0) {
        a.classList.add('active');
      }

      a.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Remove 'active' class from all links
        document.querySelectorAll('.course-link').forEach(link => link.classList.remove('active'));

        // Add 'active' class to the clicked link
        this.classList.add('active');

        // Show the selected course details
        showCourse(this.dataset.id);
      });

      listContainer.appendChild(a);
    });
  }

  // Display selected course details
  function showCourse(id) {
    const course = coursesData.find(item => item.id === id);
    if (!course) return;

    shortDesc.textContent = course.subtitle;
    descriptionText.textContent = ''; // Clear previous description

    detailContainer.innerHTML = `
      <h3>${course.title}</h3>
      <p><strong>Duration:</strong> ${course.duration}</p>
      <p><strong>Fee:</strong> ${course.fee}</p>
      <p><strong>Description:</strong> ${course.description}</p>
      <h4>Colleges offering this course:</h4>
      <ul>
        ${course.colleges.map(college => `<li>${college}</li>`).join('')}
      </ul>
      <p><strong>Icon Color:</strong> <span style="color: ${course.color};">${course.icon}</span></p>
    `;
  }
});
