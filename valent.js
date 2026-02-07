// Authentication
const correctAuthAnswer = "ram nagar"; // Case-insensitive

// Quiz Questions
const questions = [
    {
        question: "What's the name of the app that brought us together?",
        options: ["Tinder", "Hinge", "Happn", "OkCupid"],
        correctAnswer: "c",
        type: "text",
        successMessage: "Thank you, Happn, for making destiny swipe back."
    },
    {
        question: "Where did we first meet?",
        options: ["Next Galleria Mall", "Next Imperia Mall", "Sattva Mall", "Board game cafe"],
        correctAnswer: "b",
        type: "text",
        successMessage: "Remember the awkward walk towards the movie theatre?"
    },
    {
        question: "What movie did we first watch together in a movie theatre?",
        options: ["Evil Dead Rise", "Deadpool and Wolverine", "Ballerina", "Munjya"],
        correctAnswer: "d",
        type: "text",
        successMessage: "Spent the first half of the movie gathering the courage to give you flowers."
    },
    {
        question: "Where was this photo taken?",
        options: ["Board game cafe", "Mirosa cafe", "Cove Cafe", "PS Cheese Cafe"],
        correctAnswer: "d",
        type: "photo",
        photoUrl: "photo2.jpeg", // REPLACE WITH YOUR PHOTO URL
        successMessage: "The ride back home :)"
    },
    {
        question: "What did I cook for you on this day?",
        options: ["Bread Omelet", "Pasta", "Biryani", "Maggi noodles"],
        correctAnswer: "b",
        type: "photo",
        photoUrl: "photo1.jpeg", // REPLACE WITH YOUR PHOTO URL
        successMessage: "BEST DAY EVER."
    }
];

// Success photo URL - REPLACE THIS WITH YOUR ACTUAL PHOTO
const successPhotoUrl = "photo3.jpeg";

// Initialize
let currentQuestion = 0;
let correctAnswers = 0;

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💘', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }, 300);
}

// Create floating custom texts for success page
function createFloatingTexts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const customTexts = ['CutuuJaan', 'Ammudummuu', 'shonuuuu', 'meri jaan', 'mera pyaar'];
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💘', '💝'];
    
    setInterval(() => {
        const element = document.createElement('div');
        element.className = 'heart';
        
        // Mix of custom texts and hearts
        const isText = Math.random() > 0.4;
        if (isText) {
            element.textContent = customTexts[Math.floor(Math.random() * customTexts.length)];
            element.style.fontSize = (Math.random() * 8 + 18) + 'px';
            element.style.fontFamily = "'Playfair Display', serif";
            element.style.fontWeight = '600';
            element.style.color = '#DC143C';
            element.style.opacity = '0.4';
        } else {
            element.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            element.style.fontSize = (Math.random() * 20 + 15) + 'px';
        }
        
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDuration = (Math.random() * 10 + 12) + 's';
        heartsContainer.appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, 15000);
    }, 400);
}

// Handle Authentication
function handleAuthentication() {
    const input = document.getElementById('auth-input');
    const feedback = document.getElementById('auth-feedback');
    const answer = input.value.trim().toLowerCase();
    
    if (answer === correctAuthAnswer) {
        feedback.textContent = '✓ Welcome, my love!';
        feedback.style.color = '#228B22';
        
        setTimeout(() => {
            document.getElementById('auth-section').classList.remove('active');
            document.getElementById('welcome-section').classList.add('active');
        }, 1000);
    } else {
        feedback.textContent = 'Who are you? You\'re not Aamena. Get out of this website. RIGHT NOW!!!!';
        feedback.classList.add('intruder');
        input.value = '';
        
        setTimeout(() => {
            feedback.classList.remove('intruder');
            feedback.textContent = '';
        }, 3000);
    }
}

// Start Quiz
function startQuiz() {
    document.getElementById('welcome-section').classList.remove('active');
    document.getElementById('quiz-section').classList.add('active');
}

// Load questions into HTML
function loadQuestions() {
    questions.forEach((q, index) => {
        const questionCard = document.querySelector(`.question-card[data-question="${index + 1}"]`);
        questionCard.setAttribute('data-answer', q.correctAnswer);
        
        const questionText = questionCard.querySelector('.question-text');
        questionText.textContent = q.question;
        
        const optionButtons = questionCard.querySelectorAll('.option-btn');
        optionButtons.forEach((btn, i) => {
            btn.textContent = q.options[i];
        });
        
        // Load photo if it's a photo question
        if (q.type === 'photo') {
            const photoImg = questionCard.querySelector('img');
            photoImg.src = q.photoUrl;
        }
    });
    
    // Load success photo
    document.getElementById('success-photo').src = successPhotoUrl;
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('current-question').textContent = currentQuestion + 1;
}

// Handle option selection
function handleOptionClick(event) {
    const button = event.target.closest('.option-btn');
    if (!button) return;
    
    const questionCard = button.closest('.question-card');
    const correctAnswer = questionCard.getAttribute('data-answer');
    const selectedOption = button.getAttribute('data-option');
    const feedback = questionCard.querySelector('.feedback');
    const allOptions = questionCard.querySelectorAll('.option-btn');
    
    // Disable all buttons
    allOptions.forEach(btn => btn.style.pointerEvents = 'none');
    
    if (selectedOption === correctAnswer) {
        button.classList.add('correct');
        // Use personalized success message
        feedback.textContent = '✓ ' + questions[currentQuestion].successMessage;
        feedback.classList.add('correct');
        correctAnswers++;
        
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                // Move to next question
                questionCard.classList.remove('active');
                currentQuestion++;
                updateProgress();
                
                setTimeout(() => {
                    const nextCard = document.querySelector(`.question-card[data-question="${currentQuestion + 1}"]`);
                    nextCard.classList.add('active');
                }, 300);
            } else {
                // Check if all answers are correct
                if (correctAnswers === questions.length) {
                    // All correct - move to proposal
                    setTimeout(() => {
                        document.getElementById('quiz-section').classList.remove('active');
                        document.getElementById('proposal-section').classList.add('active');
                    }, 1000);
                } else {
                    // Not all correct - show error and reset
                    feedback.textContent = 'Oops! You need to get all questions right. Let\'s try again!';
                    feedback.classList.remove('correct');
                    feedback.classList.add('wrong');
                    
                    setTimeout(() => {
                        resetQuiz();
                    }, 2000);
                }
            }
        }, 1500);
    } else {
        button.classList.add('wrong');
        feedback.textContent = '✗ ARE YOU SERIOUS?? I\'ll kill you. Try again now.';
        feedback.classList.add('wrong');
        
        setTimeout(() => {
            resetQuiz();
        }, 2000);
    }
}

// Reset quiz
function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    updateProgress();
    
    const allCards = document.querySelectorAll('.question-card');
    allCards.forEach(card => {
        card.classList.remove('active');
        const options = card.querySelectorAll('.option-btn');
        options.forEach(btn => {
            btn.classList.remove('correct', 'wrong');
            btn.style.pointerEvents = 'auto';
        });
        const feedback = card.querySelector('.feedback');
        feedback.textContent = '';
        feedback.classList.remove('correct', 'wrong');
    });
    
    setTimeout(() => {
        document.querySelector('.question-card[data-question="1"]').classList.add('active');
    }, 300);
}

// Proposal button logic
let noClickCount = 0;
const noTexts = [
    "Really?",
    "You sure?",
    "Think again... 🥺",
    "Baby please...",
    "You can't escape",
    "I know you want to say yes",
    "Don't be shy now",
    "Come on... 💕",
    "You're mine",
    "Just say yes already!",
    "Pretty please? 🌹",
    "You know you want to",
    "I'm not giving up!",
    "Say yes, meri jaan ❤️"
];

function handleNoButton() {
    const noBtn = document.getElementById('no-btn');
    const noText = document.getElementById('no-text');
    
    // Update text
    if (noClickCount < noTexts.length) {
        noText.textContent = noTexts[noClickCount];
        noClickCount++;
    } else {
        // Reset to cycle through again
        noClickCount = 0;
        noText.textContent = noTexts[noClickCount];
        noClickCount++;
    }
    
    // Make button use full screen positioning
    noBtn.classList.add('moving');
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Create safe zones to avoid
    const safeZones = [
        // Center area (where YES button is)
        { x: viewportWidth/2 - 200, y: viewportHeight/2 - 100, width: 400, height: 200 }
    ];
    
    let randomX, randomY, attempts = 0;
    let validPosition = false;
    
    // Try to find a valid position that doesn't overlap with safe zones
    while (!validPosition && attempts < 50) {
        randomX = Math.random() * (viewportWidth - btnWidth - 40) + 20; // 20px margin
        randomY = Math.random() * (viewportHeight - btnHeight - 40) + 20;
        
        validPosition = true;
        for (let zone of safeZones) {
            if (randomX < zone.x + zone.width &&
                randomX + btnWidth > zone.x &&
                randomY < zone.y + zone.height &&
                randomY + btnHeight > zone.y) {
                validPosition = false;
                break;
            }
        }
        attempts++;
    }
    
    // Apply position with smooth transition
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function handleYesButton() {
    document.getElementById('proposal-section').classList.remove('active');
    document.getElementById('success-section').classList.add('active');
    
    // Create heart explosion effect
    createHeartExplosion();
    
    // Start floating custom texts in background
    createFloatingTexts();
}

function createHeartExplosion() {
    const hearts = ['❤️', '💕', '💖', '💗', '💘', '💝', '💞', '💓'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = (Math.random() * 40 + 30) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            
            const angle = (Math.PI * 2 * i) / 50;
            const velocity = Math.random() * 300 + 200;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            heart.style.animation = `explode-${i} 2s ease-out forwards`;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes explode-${i} {
                    0% {
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.5) rotate(${Math.random() * 720}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
                style.remove();
            }, 2000);
        }, i * 30);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    loadQuestions();
    updateProgress();
    
    // Authentication
    document.getElementById('auth-submit').addEventListener('click', handleAuthentication);
    document.getElementById('auth-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAuthentication();
        }
    });
    
    // Start quiz button
    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
    
    // Quiz option clicks
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', handleOptionClick);
    });
    
    // Proposal buttons
    document.getElementById('no-btn').addEventListener('click', handleNoButton);
    document.getElementById('yes-btn').addEventListener('click', handleYesButton);

});
