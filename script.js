document.addEventListener('DOMContentLoaded', () => {

  /* Feature 1: Theme Switcher */
  const themeBtn = document.getElementById('theme-toggle');
  
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeBtn.textContent = document.body.classList.contains('dark-mode') 
      ? 'Toggle Light Mode' 
      : 'Toggle Dark Mode';
  });

  /* Feature 2: Interactive Photo Gallery Viewer */
  // Exact filenames matching your folder structure
  const galleryImages = [
    { src: 'images/image 1.jpg', caption: 'Photo 1: University Campus Library Overview' },
    { src: 'images/image2.jpg', caption: 'Photo 2: Computer Science Practical Lab Session' },
    { src: 'images/image3.jpg', caption: 'Photo 3: Web Technology Workspace Setup' }
  ];

  let currentGalleryIndex = 0;
  const galleryImg = document.getElementById('gallery-img');
  const galleryCaption = document.getElementById('gallery-caption');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  function updateGalleryDisplay(index) {
    galleryImg.src = galleryImages[index].src;
    galleryCaption.textContent = galleryImages[index].caption;
  }

  prevBtn.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryDisplay(currentGalleryIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    updateGalleryDisplay(currentGalleryIndex);
  });

  /* Feature 3: Expandable FAQ Accordion */
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      content.classList.toggle('show');
      
      toggle.textContent = content.classList.contains('show')
        ? toggle.textContent.replace('+', '-')
        : toggle.textContent.replace('-', '+');
    });
  });

  /* Compulsory Feature: Form Validation & Local Preview */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const topicSelect = document.getElementById('topic');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const previewBox = document.getElementById('form-preview');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    previewBox.classList.add('hidden');
    previewBox.innerHTML = '';

    let isValid = true;

    // Validate Name
    const nameVal = nameInput.value.trim();
    if (nameVal === '') {
      nameError.textContent = 'Please provide a valid full name.';
      isValid = false;
    }

    // Validate Email
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailVal === '' || !emailRegex.test(emailVal)) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate Message
    const messageVal = messageInput.value.trim();
    if (messageVal === '') {
      messageError.textContent = 'Message body cannot be empty.';
      isValid = false;
    }

    // Display Local Preview Summary
    if (isValid) {
      const previewHeading = document.createElement('h3');
      previewHeading.textContent = 'Submission Preview (Validated Locally)';

      const notice = document.createElement('p');
      notice.textContent = 'Note: Data was validated locally; no message was transmitted.';

      const nameP = document.createElement('p');
      nameP.textContent = `Name: ${nameVal}`;

      const emailP = document.createElement('p');
      emailP.textContent = `Email: ${emailVal}`;

      const topicP = document.createElement('p');
      topicP.textContent = `Topic: ${topicSelect.value}`;

      const messageP = document.createElement('p');
      messageP.textContent = `Message: ${messageVal}`;

      previewBox.appendChild(previewHeading);
      previewBox.appendChild(notice);
      previewBox.appendChild(document.createElement('hr'));
      previewBox.appendChild(nameP);
      previewBox.appendChild(emailP);
      previewBox.appendChild(topicP);
      previewBox.appendChild(messageP);

      previewBox.classList.remove('hidden');
      contactForm.reset();
    }
  });
});