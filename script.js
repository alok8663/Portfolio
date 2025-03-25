document.addEventListener("DOMContentLoaded", function () {
   // Dynamic text animation initialization
    const words = document.querySelectorAll(".dynamic-words .word");
    if (words.length > 0) {
      // Set initial state
      words.forEach((word, index) => {
        if (index === 0) {
          word.style.opacity = "1";
          word.style.transform = "translateY(0)";
        } else {
          word.style.opacity = "0";
          word.style.transform = "translateY(50%)";
        }
      });
  
      // Manual animation cycle in case CSS animation doesn't work
      let currentIndex = 0;
      setInterval(() => {
        // Hide current word
        words[currentIndex].style.opacity = "0";
        words[currentIndex].style.transform = "translateY(-50%)";
        words[currentIndex].style.transition =
          "opacity 0.5s ease, transform 0.5s ease";
  
        // Update index
        currentIndex = (currentIndex + 1) % words.length;
  
        // Show next word
        setTimeout(() => {
          words.forEach((word, index) => {
            if (index === currentIndex) {
              word.style.opacity = "1";
              word.style.transform = "translateY(0)";
              word.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            } else if (
              index !==
              (currentIndex - 1 + words.length) % words.length
            ) {
              word.style.opacity = "0";
              word.style.transform = "translateY(50%)";
              word.style.transition = "none";
            }
          });
        }, 500);
      }, 2000);
    }
  
    // Back to Top Button Functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
      // Scroll to top when clicked
      backToTopButton.addEventListener('click', () => {
        // For the main page container
        const pageContainer = document.querySelector('.page-container');
        if (pageContainer) {
          pageContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
        
        // Also scroll the window to top (for mobile)
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // Scroll to the home section
        const homeSection = document.getElementById('home');
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: 'smooth' });
          
          // Update active dot and nav link
          updateActiveDot('home');
          updateActiveNavLink('home');
        }
      });
      
      // Add hover effect
      backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
      });
      
      backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    }
  
    // Typewriter Effect for Home Page
    const texts = ["software engineer", "python developer", "data analyst"];
    let speed = 100;
    const textElement = document.querySelector(".typewriter-text");
    let textIndex = 0;
    let charIndex = 0;
  
    function typeWriter() {
      if (charIndex < texts[textIndex].length) {
        textElement.innerHTML += texts[textIndex].charAt(charIndex).toLowerCase();
        charIndex++;
        setTimeout(typeWriter, speed);
      } else {
        setTimeout(eraseText, 1000); // Delay before erasing
      }
    }
  
    function eraseText() {
      if (textElement.innerHTML.length > 0) {
        textElement.innerHTML = textElement.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
      } else {
        textIndex = (textIndex + 1) % texts.length; // Cycle through texts
        charIndex = 0;
        setTimeout(typeWriter, 500); // Start typing the next text
      }
    }
  
    // Start the typewriter effect
    if (textElement) {
      setTimeout(typeWriter, 500);
    }
  
    // Add hover effect to the add button
    const addButton = document.querySelector(".add-button");
    if (addButton) {
      addButton.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.05)";
        this.style.transition = "transform 0.2s ease";
      });
  
      addButton.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
      });
  
      // Add click effect
      addButton.addEventListener("click", function (e) {
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 200);
      });
    }
  
    // Add subtle animation to chat bubbles
    const chatBubbles = document.querySelectorAll(".chat-bubble");
    chatBubbles.forEach((bubble) => {
      // Random slight movement
      setInterval(() => {
        const xMove = (Math.random() - 0.5) * 3;
        const yMove = (Math.random() - 0.5) * 3;
  
        bubble.style.transform = `translate(${xMove}px, ${yMove}px)`;
        bubble.style.transition = "transform 2s ease";
  
        setTimeout(() => {
          bubble.style.transform = "translate(0, 0)";
        }, 2000);
      }, 4000);
    });
  
    // Add notification bell animation
    const notificationBell = document.querySelector(".notification i");
    if (notificationBell) {
      setInterval(() => {
        notificationBell.style.transform = "rotate(15deg)";
        notificationBell.style.transition = "transform 0.2s ease";
  
        setTimeout(() => {
          notificationBell.style.transform = "rotate(-15deg)";
  
          setTimeout(() => {
            notificationBell.style.transform = "rotate(0)";
          }, 200);
        }, 200);
      }, 5000);
    }
  
    // Add active state to navigation links
    const navLinks = document.querySelectorAll(".navigation ul li a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
  
        // Remove active class from all links
        navLinks.forEach((l) => l.classList.remove("active"));
  
        // Add active class to clicked link
        this.classList.add("active");
  
        // Get the target section id
        const targetId = this.getAttribute("href").substring(1);
  
        // Scroll to the target section
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
  
        // Update the active dot
        updateActiveDot(targetId);
      });
    });
  
    // Handle page navigation dots
    const navDots = document.querySelectorAll(".nav-dot");
    navDots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const targetId = this.getAttribute("data-page");
  
        // Scroll to the target section
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
  
        // Update active dot
        updateActiveDot(targetId);
  
        // Update active nav link
        updateActiveNavLink(targetId);
      });
    });
  
    // Function to update active dot
    function updateActiveDot(targetId) {
      // Remove active class from all dots
      navDots.forEach((d) => d.classList.remove("active"));
  
      // Add active class to the target dot
      document
        .querySelector(`.nav-dot[data-page="${targetId}"]`)
        .classList.add("active");
    }
  
    // Function to update active nav link
    function updateActiveNavLink(targetId) {
      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"));
  
      // Add active class to the target link
      document
        .querySelector(`.navigation ul li a[href="#${targetId}"]`)
        .classList.add("active");
    }
  
    // Handle scroll events to update active section
    const pageContainer = document.querySelector(".page-container");
    const pages = document.querySelectorAll(".page");
  
    pageContainer.addEventListener("scroll", function () {
      // Debounce scroll event
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        // Find the current visible section
        let currentSection = "";
        let minDistance = Infinity;
  
        pages.forEach((page) => {
          const rect = page.getBoundingClientRect();
          const distance = Math.abs(rect.top);
  
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = page.id;
          }
        });
  
        // Update active dot and nav link
        if (currentSection) {
          updateActiveDot(currentSection);
          updateActiveNavLink(currentSection);
        }
      }, 100);
    });
  
    // Handle contact form submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      const formInputs = contactForm.querySelectorAll('input, textarea');
      const submitButton = contactForm.querySelector('.submit-button');
      
      // Add validation feedback icons to form groups
      formInputs.forEach(input => {
        // Create validation icon element
        const validationIcon = document.createElement('div');
        validationIcon.className = 'validation-icon';
        input.parentNode.appendChild(validationIcon);
        
        // Create validation message element
        const validationMessage = document.createElement('div');
        validationMessage.className = 'validation-message';
        input.parentNode.appendChild(validationMessage);
        
        // Real-time validation
        input.addEventListener('input', function() {
          validateInput(input);
          updateSubmitButtonState();
        });
        
        // Blur validation
        input.addEventListener('blur', function() {
          validateInput(input, true);
          updateSubmitButtonState();
        });
        
        // Detect autofill
        input.addEventListener('animationstart', function(e) {
          if (e.animationName === 'autofill') {
            // Input was autofilled
            this.classList.add('autofilled');
            validateInput(input);
            updateSubmitButtonState();
          }
        });
      });
      
      // Validate a single input
      function validateInput(input, showMessage = false) {
        const validationIcon = input.parentNode.querySelector('.validation-icon');
        const validationMessage = input.parentNode.querySelector('.validation-message');
        
        // Reset validation state
        input.classList.remove('valid', 'invalid');
        validationIcon.innerHTML = '';
        validationMessage.innerHTML = '';
        validationMessage.classList.remove('show');
        
        // Skip empty fields unless showMessage is true
        if (!input.value && !showMessage) {
          return;
        }
        
        let isValid = input.checkValidity();
        let message = '';
        
        // Custom validation logic
        if (input.id === 'name') {
          if (input.value.length < 2) {
            isValid = false;
            message = 'Name must be at least 2 characters';
          }
        } else if (input.id === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
          }
        } else if (input.id === 'message') {
          if (input.value.length < 10) {
            isValid = false;
            message = 'Message must be at least 10 characters';
          }
        }
        
        // Update validation state
        if (isValid) {
          input.classList.add('valid');
          validationIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
          
          // Trigger haptic feedback for valid input
          if (window.navigator && window.navigator.vibrate) {
            navigator.vibrate(40);
          }
        } else if (input.value || showMessage) {
          input.classList.add('invalid');
          validationIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
          
          if (showMessage) {
            validationMessage.innerHTML = message || 'Please check this field';
            validationMessage.classList.add('show');
          }
        }
      }
      
      // Update submit button state based on form validity
      function updateSubmitButtonState() {
        const isFormValid = Array.from(formInputs).every(input => 
          input.classList.contains('valid') || (!input.required && !input.value)
        );
        
        if (isFormValid) {
          submitButton.classList.add('ready');
        } else {
          submitButton.classList.remove('ready');
        }
      }
      
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Validate all inputs before submission
        let isValid = true;
        formInputs.forEach(input => {
          validateInput(input, true);
          if (!input.checkValidity()) {
            isValid = false;
          }
        });
        
        if (!isValid) {
          // Show error shake animation on the form
          contactForm.classList.add('shake');
          setTimeout(() => {
            contactForm.classList.remove('shake');
          }, 500);
          
          // Trigger haptic feedback for error
          if (window.navigator && window.navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
          }
          
          return;
        }
        
        // Show loading state with skeleton screen
        const formContent = contactForm.innerHTML;
        contactForm.innerHTML = `
          <div class="form-loading">
            <div class="skeleton-loading" style="height: 40px; width: 100%; margin-bottom: 20px;"></div>
            <div class="skeleton-loading" style="height: 40px; width: 100%; margin-bottom: 20px;"></div>
            <div class="skeleton-loading" style="height: 120px; width: 100%; margin-bottom: 20px;"></div>
            <div class="skeleton-loading" style="height: 50px; width: 150px; margin: 0 auto;"></div>
          </div>
        `;
  
        // Get form data
        const formData = new FormData(this);
  
        // Send form data to Formspree
        fetch(this.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Form submission failed");
            }
          })
          .then((data) => {
            // Show success message with animation
            contactForm.innerHTML = `
              <div class="form-success">
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
                <button class="reset-form">Send Another Message</button>
              </div>
            `;
            
            // Trigger success haptic feedback
            if (window.navigator && window.navigator.vibrate) {
              navigator.vibrate([50, 100, 50]);
            }
  
            // Add event listener to reset form button
            const resetButton = contactForm.querySelector(".reset-form");
            if (resetButton) {
              resetButton.addEventListener("click", function () {
                // Restore original form
                contactForm.innerHTML = formContent;
                
                // Re-initialize form validation
                const newFormInputs = contactForm.querySelectorAll('input, textarea');
                newFormInputs.forEach(input => {
                  // Create validation icon element
                  const validationIcon = document.createElement('div');
                  validationIcon.className = 'validation-icon';
                  input.parentNode.appendChild(validationIcon);
                  
                  // Create validation message element
                  const validationMessage = document.createElement('div');
                  validationMessage.className = 'validation-message';
                  input.parentNode.appendChild(validationMessage);
                  
                  // Real-time validation
                  input.addEventListener('input', function() {
                    validateInput(input);
                    updateSubmitButtonState();
                  });
                  
                  // Blur validation
                  input.addEventListener('blur', function() {
                    validateInput(input, true);
                    updateSubmitButtonState();
                  });
                });
              });
            }
          })
          .catch((error) => {
            // Show error message with animation
            contactForm.innerHTML = formContent;
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'form-error';
            errorMessage.innerHTML = `
              <i class="fas fa-times-circle"></i>
              <p>Oops! There was a problem sending your message. Please try again later.</p>
            `;
            contactForm.prepend(errorMessage);
            
            // Trigger error haptic feedback
            if (window.navigator && window.navigator.vibrate) {
              navigator.vibrate([100, 50, 100, 50, 100]);
            }
            
            console.error("Form submission error:", error);
          });
      });
    }
  
    async function sendMessageToTogetherAI(userMessage) {
        const apiKey = "YOUR_TOGETHER_AI_API_KEY"; // Store this securely (Netlify env variable)
    
        // Define structured prompt with resume context
        const resumeText = `
        Name: Alok Verma
        Education: 
        - B.Tech in Mechanical Engineering (2022-2026) at MNIT Jaipur (CGPA: 7.46)
        - CBSE (Class 12: 89%, Class 10: 94.4%)
    
        Projects:
        - Customer Churn Prediction: End-to-end ML project using ANN, Python, TensorFlow
        - Credit Risk Assessment: XGBoost, Data Analysis
        - Sales Insights Dashboard: Tableau, Data Visualization
    
        Skills: Python, Java, Machine Learning, Data Structures, SQL, Tableau
        Experience: Freelance CGI Artist for Mortgages Business (2023-Present)
    
        Achievements:
        - Cleared JEE MAINS
        - National Mathematical Olympiad & KVPY Participant
        `;
    
        try {
            const response = await fetch("https://api.together.xyz/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
                    messages: [
                        { role: "system", content: "You are an AI chatbot trained on Alok Verma's resume. Provide structured and professional answers." },
                        { role: "system", content: resumeText },
                        { role: "user", content: userMessage }
                    ]
                })
            });
    
            const data = await response.json();
            
            if (data.choices && data.choices.length > 0) {
                return data.choices[0].message.content;
            } else {
                return "Sorry, I couldn't process your request.";
            }
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            return "There was an error connecting to the chatbot.";
        }
    }
    
    // Attach event listener to send button
    document.addEventListener("DOMContentLoaded", function () {
        const chatbotTrigger = document.querySelector(".chatbot-trigger");
        const chatInput = document.querySelector("#chat-input");
        const sendMessageButton = document.querySelector(".send-message");
        const chatOutput = document.querySelector("#chat-output");
        let isChatbotOpen = false;
    
        // Toggle chatbot UI (if using embed UI)
        chatbotTrigger.addEventListener("click", function () {
            console.log("Chat button clicked");
    
            if (window.togetherAI) {
                if (isChatbotOpen) {
                    console.log("Closing Together AI chatbot");
                    window.togetherAI("close");
                    isChatbotOpen = false;
                    chatbotTrigger.classList.remove("active");
                } else {
                    console.log("Opening Together AI chatbot");
                    window.togetherAI("open");
                    isChatbotOpen = true;
                    chatbotTrigger.classList.add("active");
                    chatbotTrigger.style.transform = "rotate(45deg) scale(1.1)";
                }
            } else {
                console.log("Together AI chatbot not loaded yet");
            }
        });
    
        // Send message when user clicks send button
        sendMessageButton.addEventListener("click", function () {
            const userMessage = chatInput.value.trim();
            if (userMessage === "") return;
    
            chatOutput.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
            chatInput.value = "";
    
            sendMessageToTogetherAI(userMessage).then(response => {
                chatOutput.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;
                chatOutput.scrollTop = chatOutput.scrollHeight; // Auto-scroll to latest message
            });
        });
    });
    

    
    
      
    // Theme Switching Functionality
    const themeButtons = document.querySelectorAll(".theme-btn");
  
    // Set default theme (purple)
    document.documentElement.setAttribute("data-theme", "purple");
  
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
  
      // Update active button
      themeButtons.forEach((btn) => {
        btn.classList.remove("active");
        if (btn.getAttribute("data-theme") === savedTheme) {
          btn.classList.add("active");
        }
      });
    }
  
    // Add click event listeners to theme buttons
    themeButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const theme = this.getAttribute("data-theme");
  
        // Set the theme
        document.documentElement.setAttribute("data-theme", theme);
  
        // Save theme preference
        localStorage.setItem("theme", theme);
  
        // Update active button
        themeButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
  
        // Update Chatbase widget theme if it exists
        if (window.updateTogetherAITheme) {
            updateTogetherAITheme(theme);
        }        
        
        // Update cursor color by removing and re-adding cursor elements
        // This forces the CSS to re-apply with the new theme colors
        const cursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        
        if (cursor && cursorDot) {
          // Apply a subtle animation during theme change
          cursor.style.transition = 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease';
          cursorDot.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
          
          // Apply a quick pulse animation
          cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
          
          setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
          }, 300);
        }
  
        // Force refresh of widget if open
        if (window.chatbase && isChatbotOpen) {
          setTimeout(() => {
            // Close and reopen to refresh theme
            window.chatbase("close");
            chatbotTrigger.classList.remove("active"); // Temporarily remove active class
  
            setTimeout(() => {
              window.chatbase("open");
              isChatbotOpen = true; // Ensure state is correct
              chatbotTrigger.classList.add("active"); // Restore active class
            }, 100);
          }, 100);
        }
      });
    });
  
    const mainProjects = document.querySelector(
      ".projects-showcase:not(.additional-projects)"
    );
    const additionalProjects = document.querySelector(".additional-projects");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let showingAdditional = false;
  
    function toggleProjects() {
      if (showingAdditional) {
        additionalProjects.style.opacity = "0";
        setTimeout(() => {
          additionalProjects.style.display = "none";
          mainProjects.style.display = "grid";
          setTimeout(() => {
            mainProjects.style.opacity = "1";
          }, 50);
        }, 300);
      } else {
        mainProjects.style.opacity = "0";
        setTimeout(() => {
          mainProjects.style.display = "none";
          additionalProjects.style.display = "grid";
          setTimeout(() => {
            additionalProjects.style.opacity = "1";
          }, 50);
        }, 300);
      }
      showingAdditional = !showingAdditional;
    }
  
    prevBtn.addEventListener("click", toggleProjects);
    nextBtn.addEventListener("click", toggleProjects);
  
    // Mobile Menu Toggle - Disabled
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navigation = document.querySelector('.navigation');
    
    // Ensure navigation is always visible regardless of screen size
    if (navigation) {
      navigation.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  
    // Sticky Header
    const header = document.querySelector('header');
    const scrollThreshold = 50;
    
    function handleScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
  
    // Mobile swipe navigation and haptic feedback
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    // Variables for touch events
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let currentSectionIndex = 0;
    
    // Get the index of the current active section
    function getCurrentSectionIndex() {
      const activePage = document.querySelector('.page.active');
      return Array.from(pages).indexOf(activePage);
    }
    
    // Update mobile navigation active state
    function updateMobileNavActive(sectionId) {
      mobileNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionId) {
          item.classList.add('active');
        }
      });
    }
    
    // Trigger haptic feedback if supported
    function triggerHapticFeedback() {
      if (window.navigator && window.navigator.vibrate) {
        // Light vibration for 50ms
        navigator.vibrate(50);
      }
    }
    
    // Handle swipe gesture
    function handleSwipeGesture() {
      // Calculate horizontal and vertical distance
      const horizontalDistance = touchEndX - touchStartX;
      const verticalDistance = touchEndY - touchStartY;
      
      // Only handle horizontal swipes if they're more significant than vertical movement
      if (Math.abs(horizontalDistance) > Math.abs(verticalDistance) && Math.abs(horizontalDistance) > 50) {
        currentSectionIndex = getCurrentSectionIndex();
        
        if (horizontalDistance > 0) {
          // Swipe right - go to previous section
          if (currentSectionIndex > 0) {
            const prevSection = pages[currentSectionIndex - 1].id;
            navigateToSection(prevSection);
          }
        } else {
          // Swipe left - go to next section
          if (currentSectionIndex < pages.length - 1) {
            const nextSection = pages[currentSectionIndex + 1].id;
            navigateToSection(nextSection);
          }
        }
      }
    }
    
    // Navigate to a specific section
    function navigateToSection(sectionId) {
      // Trigger haptic feedback
      triggerHapticFeedback();
      
      // Scroll to the section
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      
      // Update active states
      updateActiveDot(sectionId);
      updateActiveNavLink(sectionId);
      updateMobileNavActive(sectionId);
    }
    
    // Add touch event listeners for swipe detection
    if (pageContainer) {
      pageContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, false);
      
      pageContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
      }, false);
    }
    
    // Add click event listeners to mobile nav items
    mobileNavItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        navigateToSection(sectionId);
      });
    });
  
    // Update mobile nav when scrolling
    pageContainer.addEventListener("scroll", function() {
      // Existing scroll handler code...
      
      // Also update mobile navigation
      if (currentSection) {
        updateMobileNavActive(currentSection);
      }
    });
  });