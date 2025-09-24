// Main JavaScript for DevOps Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // CI/CD Pipeline Simulation
    const startButton = document.getElementById('startPipeline');
    const resetButton = document.getElementById('resetPipeline');
    const pipelineLog = document.getElementById('pipelineLog');
    const stages = document.querySelectorAll('.stage');
    
    let currentStage = 1;
    let pipelineRunning = false;
    
    // Stage messages for the log
    const stageMessages = {
        1: "Stage 1: Source Code - Retrieving code from Git repository...",
        2: "Stage 2: Build - Running Jenkins build job...",
        3: "Stage 3: Containerize - Building Docker image...",
        4: "Stage 4: Deploy - Deploying to AWS EC2 instance...",
        5: "Stage 5: Verify - Running automated tests..."
    };
    
    // Success messages for each stage
    const successMessages = {
        1: "✓ Code successfully fetched from repository",
        2: "✓ Build completed successfully",
        3: "✓ Docker image built and pushed to registry",
        4: "✓ Application deployed to EC2 instance",
        5: "✓ All tests passed! Deployment successful!"
    };
    
    // Detailed logs for each stage
    const detailedLogs = {
        1: [
            "Cloning repository: https://github.com/user/devops-portfolio.git",
            "Checking out branch: main",
            "Latest commit: a1b2c3d - Update portfolio content",
            "Repository cloned successfully"
        ],
        2: [
            "Triggering Jenkins job: portfolio-build",
            "Installing dependencies...",
            "Running build script...",
            "Build artifacts generated",
            "Build completed in 45 seconds"
        ],
        3: [
            "Building Docker image: devops-portfolio:latest",
            "Step 1/5 : FROM nginx:alpine",
            "Step 2/5 : COPY . /usr/share/nginx/html",
            "Step 3/5 : EXPOSE 80",
            "Step 4/5 : RUN echo 'Build complete'",
            "Step 5/5 : CMD [\"nginx\", \"-g\", \"daemon off;\"]",
            "Image built successfully",
            "Pushing image to registry..."
        ],
        4: [
            "Connecting to AWS EC2 instance...",
            "Pulling latest Docker image...",
            "Stopping existing container...",
            "Starting new container...",
            "Container started on port 80",
            "Health check passed"
        ],
        5: [
            "Running smoke tests...",
            "Testing homepage accessibility...",
            "Testing pipeline simulation...",
            "Testing contact form...",
            "All tests passed!",
            "Deployment verified successfully"
        ]
    };
    
    // Simulate a stage completion
    function completeStage(stageNumber) {
        return new Promise(resolve => {
            const stage = document.getElementById(`stage${stageNumber}`);
            
            // Update log with stage message
            pipelineLog.innerHTML += `\n\n${stageMessages[stageNumber]}`;
            pipelineLog.scrollTop = pipelineLog.scrollHeight;
            
            // Add detailed logs with delays
            let logIndex = 0;
            const logInterval = setInterval(() => {
                if (logIndex < detailedLogs[stageNumber].length) {
                    pipelineLog.innerHTML += `\n  ${detailedLogs[stageNumber][logIndex]}`;
                    pipelineLog.scrollTop = pipelineLog.scrollHeight;
                    logIndex++;
                } else {
                    clearInterval(logInterval);
                    
                    // Mark stage as completed after a short delay
                    setTimeout(() => {
                        // Mark stage as completed
                        stage.classList.remove('active');
                        stage.classList.add('completed');
                        
                        // Add success message to log
                        pipelineLog.innerHTML += `\n\n${successMessages[stageNumber]}`;
                        pipelineLog.scrollTop = pipelineLog.scrollHeight;
                        
                        // Activate next stage if exists
                        if (stageNumber < 5) {
                            const nextStage = document.getElementById(`stage${stageNumber + 1}`);
                            nextStage.classList.add('active');
                        }
                        
                        resolve();
                    }, 1000);
                }
            }, 800);
        });
    }
    
    // Run the entire pipeline
    async function runPipeline() {
        if (pipelineRunning) return;
        
        pipelineRunning = true;
        startButton.disabled = true;
        pipelineLog.innerHTML = "Starting CI/CD Pipeline...\n";
        pipelineLog.scrollTop = pipelineLog.scrollHeight;
        
        for (let i = 1; i <= 5; i++) {
            await completeStage(i);
            currentStage = i;
        }
        
        pipelineLog.innerHTML += "\n\n🎉 Pipeline completed successfully!";
        pipelineRunning = false;
        startButton.disabled = false;
    }
    
    // Reset the pipeline
    function resetPipeline() {
        if (pipelineRunning) return;
        
        pipelineRunning = false;
        startButton.disabled = false;
        currentStage = 1;
        
        // Reset all stages
        stages.forEach((stage, index) => {
            stage.classList.remove('active', 'completed');
            if (index === 0) {
                stage.classList.add('completed');
            } else if (index === 1) {
                stage.classList.add('active');
            }
        });
        
        pipelineLog.innerHTML = "Pipeline reset. Click 'Start Pipeline' to begin the simulation.";
        pipelineLog.scrollTop = pipelineLog.scrollHeight;
    }
    
    // Event listeners for pipeline controls
    if (startButton) {
        startButton.addEventListener('click', runPipeline);
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', resetPipeline);
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a success message
            alert(`Thank you for your message, ${name}! I will get back to you soon at ${email}.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});