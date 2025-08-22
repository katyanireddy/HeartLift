// Smooth scroll to top when CTA is clicked
document.querySelectorAll('.cta-btn, .cta-btn-large').forEach(btn =>
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
);

// Simple form handler for the Contact page (demo purposes)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for reaching out! We have received your message.');
    contactForm.reset();
  });
}

// AI Friend Chatbot Modal Logic
const aiCoachNav = document.getElementById('aiCoachNav');
const aiCoachingCard = document.getElementById('aiCoachingCard');
const chatModal = document.getElementById('chatModal');
const closeChat = document.getElementById('closeChat');

// Open modal when nav or card is clicked
function openAIFriend() {
  if(chatModal) chatModal.classList.add('show');
}

if (aiCoachNav) aiCoachNav.addEventListener('click', openAIFriend);
if (aiCoachingCard) aiCoachingCard.addEventListener('click', openAIFriend);
if (closeChat && chatModal) closeChat.onclick = () => chatModal.classList.remove('show');
window.onclick = event => { if(event.target === chatModal) chatModal.classList.remove('show'); }


// Chat Tabs
const chatTabs = document.querySelectorAll('.chat-tab');
let currentMode = 'bestFriend';

const initialMessages = {
  bestFriend: [
    {from: 'ai', text: "Hey there! How are you feeling today? I’m here to listen and offer support."},
    {from: 'ai', text: "It's okay to feel down sometimes, Sophia. Heartbreak is tough, but you're not alone. What's on your mind?"},
  ],
  savageSister: [
    {from: 'ai', text: "Okay, spill. Are you crying in your bed again? Let’s get you out of that phase!"}
  ],
  motivationGuru: [
    {from: 'ai', text: "Pain is only temporary. You are stronger than you know. What's troubling you today?"}
  ]
};

// Populate chat messages
const chatMessages = document.getElementById('chatMessages');
function loadMessages(mode) {
  chatMessages.innerHTML = '';
  initialMessages[mode].forEach(msg => appendMessage(msg.from, msg.text));
}
function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg' + (sender === 'user' ? ' chat-msg-user' : '');
  const avatarImg = document.createElement('img');
  avatarImg.className = 'msg-avatar';
  avatarImg.src = sender === 'user'
    ? "https://randomuser.me/api/portraits/women/68.jpg"
    : "https://randomuser.me/api/portraits/men/32.jpg";
  avatarImg.alt = (sender === 'user' ? 'Sophia' : 'Alex');
  if(sender === 'user') {
    // User message right-aligned
    msgDiv.style.justifyContent = "flex-end";
    msgDiv.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:flex-end;">
        <div class="msg-meta" style="margin-right:6px;">Sophia</div>
        <div class="msg-bubble msg-user">${text}</div>
      </div>
      <img class="msg-avatar" src="${avatarImg.src}" alt="User">
    `;
  } else {
    // AI message left-aligned
    msgDiv.innerHTML = `
      <img class="msg-avatar" src="${avatarImg.src}" alt="AI">
      <div style="display:flex;flex-direction:column;">
        <div class="msg-meta">Alex</div>
        <div class="msg-bubble msg-ai">${text}</div>
      </div>
    `;
  }
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Tabs
if(chatTabs && chatTabs.length > 0) {
  chatTabs.forEach(tab => {
    tab.onclick = () => {
      chatTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentMode = tab.getAttribute('data-mode');
      loadMessages(currentMode);
    }
  });
  loadMessages(currentMode);
}

// Handle suggestions
document.querySelectorAll('.suggestion').forEach(sugg =>
  sugg.onclick = () => {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = sugg.textContent;
    chatInput.focus();
  }
);

// Handle chat submission
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
if(chatForm && chatInput) {
  chatForm.onsubmit = (e) => {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if(userMsg !== "") {
      appendMessage("user", userMsg);
      // Sample static AI replies (should be linked to real AI for production)
      setTimeout(() => {
        let aiReply = "";
        if (currentMode === "bestFriend")
          aiReply = "I'm here for you. Do you want to talk more about how you're feeling?";
        else if (currentMode === "savageSister")
          aiReply = "Girl, wipe those tears. You survived 100% of your worst days. Keep going!";
        else
          aiReply = "Every day is a fresh start. You can do this!";
        appendMessage("ai", aiReply);
      }, 900);
      chatInput.value = "";
      chatInput.focus();
    }
  }
}

// Optional: Reopen with Esc key
window.addEventListener('keydown', function(e) {
  if(e.key === 'Escape' && chatModal.classList.contains('show')) {
    chatModal.classList.remove('show');
  }
});


// Calendar, chart, and journal stubs

const calendarGrid = document.getElementById('calendarGrid');
const mtMonthLabel = document.getElementById('mtMonthLabel');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let calendarData = {
  year: 2024,
  month: 6, // July (0-based)
  selected: 5, // e.g., 5th
};

// Render calendar
function renderCalendar() {
  const { year, month, selected } = calendarData;
  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  mtMonthLabel.textContent = `${monthNames[month]} ${year}`;
  // Get first day of month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysShort = ['S','M','T','W','T','F','S'];
  let html = '';
  for(let d=0; d<7; d++) {
    html += `<div class="mt-calendar-day">${daysShort[d]}</div>`;
  }
  // offsets
  for(let i=0; i<firstDay; i++) html += `<div></div>`;
  for(let d=1; d<=daysInMonth; d++) {
    html += `<div class="mt-calendar-date${d===selected ? ' selected':''}" data-day="${d}">${d}</div>`;
  }
  calendarGrid.innerHTML = html;
  // Add click listeners
  document.querySelectorAll('.mt-calendar-date').forEach(el => {
    el.onclick = () => {
      calendarData.selected = Number(el.getAttribute('data-day'));
      renderCalendar();
    }
  });
}
renderCalendar();

prevMonthBtn.onclick = () => {
  if(calendarData.month > 0) calendarData.month--;
  else { calendarData.year--; calendarData.month = 11; }
  calendarData.selected = 1;
  renderCalendar();
};
nextMonthBtn.onclick = () => {
  if(calendarData.month < 11) calendarData.month++;
  else { calendarData.year++; calendarData.month = 0; }
  calendarData.selected = 1;
  renderCalendar();
};

// Chart.js line chart (dummy data)
const ctx = document.getElementById('moodChart').getContext('2d');
const moodData = [3,3.6,2.8,3.7,3.4,3,3.9,3.1];
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jul 1','Jul 8','Jul 15','Jul 22','Jul 29','Aug 5','Aug 12','Aug 19'],
    datasets: [{
      label: 'Mood',
      data: moodData,
      backgroundColor: 'rgba(179,151,250,0.09)',
      borderColor: '#b397fa',
      borderWidth: 2,
      fill: true,
      pointBackgroundColor: '#ff2477',
      tension: 0.32
    }]
  },
  options: {
    plugins: { legend: { display: false }},
    scales: {
      y: {
        min: 1, max: 5,
        display: false
      },
      x: { display: true }
    }
  }
});

// Journal Add Entry (stub)
const addEntryBtn = document.getElementById('addEntryBtn');
const journalEntries = document.getElementById('journalEntries');
if(addEntryBtn && journalEntries){
  addEntryBtn.onclick = function(){
    journalEntries.innerHTML = `<div style="color:#b397fa;font-size:1.07rem;">Entry for ${calendarData.selected} ${mtMonthLabel.textContent}:<br>
    <textarea style="margin-top:10px;background:#f9f7fd;border-radius:9px;border:1.3px solid #e3dbfa;padding:12px;width:90%;" rows="3" placeholder="Write here..."></textarea>
    <br><button class="mt-add-btn" style="margin-top:12px;">Save</button></div>`;
  };
}
