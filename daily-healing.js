const section = document.getElementById('dailyHealingSection');
const formKey = 'healingFormData';

// Example images (replace with your own asset URLs or keep placeholders)
const formSideImages = [
  'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&w=300&h=300', // illustration
  'https://images.pexels.com/photos/769885/pexels-photo-769885.jpeg?auto=compress&w=300&h=300'
];
const planImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80', // Morning reflection
  'https://images.unsplash.com/photo-1515378791036-06f33a7be5b1?auto=format&fit=crop&w=150&q=80', // Journaling
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', // Mindfulness
  'https://images.unsplash.com/photo-1465101179422-ef55e4de37c4?auto=format&fit=crop&w=150&q=80', // Physical
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=150&q=80', // Healthy meal
  'https://images.unsplash.com/photo-1423341543046-5153e6da1316?auto=format&fit=crop&w=150&q=80', // Relaxation
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=150&q=80', // Connect
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=150&q=80', // Hobby
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=150&q=80', // Reflect
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=150&q=80', // Progress
];

// Healing plan entries
const healingPlan = [
  {
    day: 'Day 1: Acceptance',
    steps: [
      { title: 'Morning Reflection', desc: 'Begin your day with a moment of reflection. Acknowledge your feelings and set a positive intention for the day.' },
      { title: 'Journaling', desc: 'Write down your thoughts and emotions. Expressing yourself can be a powerful step towards healing.' },
      { title: 'Mindfulness Exercise', desc: 'Engage in a short mindfulness exercise to center yourself and reduce stress.' },
    ],
    imgs: [planImages[0], planImages[1], planImages[2]]
  },
  {
    day: 'Day 2: Self-Care',
    steps: [
      { title: 'Physical Activity', desc: 'Move your body—stretch or workout for a walk. Physical activity can boost your mood and energy.' },
      { title: 'Healthy Meal', desc: 'Nourish your body with a healthy and delicious meal. Proper nutrition supports your emotional well-being.' },
      { title: 'Relaxation Time', desc: 'Dedicate some time to relax and unwind. Read a book, listen to music, or take a bath.' },
    ],
    imgs: [planImages, planImages, planImages]
  },
  {
    day: 'Day 3: Reconnection',
    steps: [
      { title: 'Connect with Friends', desc: 'Reach out to friends and spend quality time with them. Social support is crucial during this time.' },
      { title: 'Engage in a Hobby', desc: 'Do something you enjoy, like painting, playing music, or any activity that brings you joy.' },
      { title: 'Reflect on Progress', desc: 'Take a moment to reflect on your progress and acknowledge the steps you\'ve taken toward healing.' },
    ],
    imgs: [planImages, planImages, planImages]
  }
];

// Renders the form
function renderForm() {
  section.innerHTML = `
    <div class="healing-form-card">
      <div class="healing-form-left">
        <div class="healing-form-title">Daily Healing Plan</div>
        <form id="healingForm" class="healing-form">
          <label for="yourname">Your Name</label>
          <input type="text" id="yourname" name="yourname" required>

          <label for="yourage">Your Age</label>
          <input type="number" id="yourage" name="yourage" required min="10" max="99">

          <label for="focus">Focus Areas</label>
          <select id="focus" name="focus" required>
            <option value="">Select focus area</option>
            <option value="Emotional Healing">Emotional Healing</option>
            <option value="Building Resilience">Building Resilience</option>
            <option value="Restoring Confidence">Restoring Confidence</option>
            <option value="Mindfulness">Mindfulness</option>
          </select>

          <label for="duration">Duration</label>
          <select id="duration" name="duration" required>
            <option value="">Select duration</option>
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
            <option value="30 days">30 days</option>
          </select>

          <label for="goals">Your Goals</label>
          <textarea id="goals" name="goals" placeholder="Write your goals for healing..." required></textarea>

          <button type="submit" class="healing-submit-btn">Submit</button>
        </form>
        <div class="healing-plan-quote">
          "The only way out is through." - Robert Frost
        </div>
      </div>
      <div class="healing-form-right">
        <img src="${formSideImages[0]}" alt="" class="healing-form-img"/>
        <img src="${formSideImages[1]}" alt="" class="healing-form-img"/>
      </div>
    </div>
  `;

  document.getElementById('healingForm').onsubmit = function(e) {
    e.preventDefault();
    const data = {
      name: document.getElementById('yourname').value,
      age: document.getElementById('yourage').value,
      focus: document.getElementById('focus').value,
      duration: document.getElementById('duration').value,
      goals: document.getElementById('goals').value
    };
    localStorage.setItem(formKey, JSON.stringify(data));
    renderPlan(data);
  };
}

// Renders the healing plan
function renderPlan(data) {
  section.innerHTML = `
    <div class="healing-plan-card">
      <div class="healing-plan-title">Daily Healing Plans</div>
      <div style="font-size:1.03em;color:#868696;margin-bottom:32px;">
        Structured guidance for your heartbreak recovery journey.
        ${data && data.name ? `<br><b>Hi ${data.name}, here’s your personalized plan.</b>` : ""}
      </div>
      <div class="healing-plan-list">${healingPlan.map(plan =>
        plan.steps.map((step, i) => `
          <div class="healing-plan-entry">
            <div class="healing-plan-texts">
              ${i===0? `<div class="healing-plan-day">${plan.day}</div>`:""}
              <div class="healing-plan-step-title">${step.title}</div>
              <div class="healing-plan-step-desc">${step.desc}</div>
            </div>
            <img src="${plan.imgs[i]}" class="healing-plan-img" alt="" />
          </div>
        `).join("")
      ).join("")}</div>
      <div class="healing-plan-quote">
        "The only way out is through." - Robert Frost
      </div>
    </div>
  `;
}

// Initial page logic: show form or plan
function showHealingFlow() {
  const saved = localStorage.getItem(formKey);
  if (saved) {
    renderPlan(JSON.parse(saved));
  } else {
    renderForm();
  }
}
showHealingFlow();

// Optional: To reset demo, uncomment below for testing form
// localStorage.removeItem(formKey);
