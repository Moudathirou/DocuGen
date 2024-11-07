// public/js/main.js

// Sélection des conteneurs
const authContainer = document.getElementById('authContainer');
const generatorContainer = document.getElementById('generatorContainer');
const dashboardContainer = document.getElementById('dashboardContainer');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Nouveaux éléments
const codeInput = document.getElementById('codeInput');
const copyBtn = document.getElementById('copyDoc');
const generateBtn = document.getElementById('generateDoc');

// Affichage des formulaires
document.getElementById('showRegister').addEventListener('click', () => {
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
});

document.getElementById('showLogin').addEventListener('click', () => {
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Navigation
document.getElementById('showDashboard').addEventListener('click', () => {
  if (localStorage.getItem('isAdmin') === 'true') {
    generatorContainer.classList.remove('active');
    dashboardContainer.classList.add('active');
    loadDashboardData();
  } else {
    alert('Accès refusé. Droits administrateur requis.');
  }
});

document.getElementById('backToGenerator').addEventListener('click', () => {
  dashboardContainer.classList.remove('active');
  generatorContainer.classList.add('active');
});

// Déconnexion
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
  authContainer.classList.add('active');
  generatorContainer.classList.remove('active');
  dashboardContainer.classList.remove('active');
};

document.getElementById('logout').addEventListener('click', handleLogout);
document.getElementById('logoutDash').addEventListener('click', handleLogout);

// Soumission des formulaires
document.querySelector('.login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAdmin', data.isAdmin ? 'true' : 'false');
      authContainer.classList.remove('active');
      generatorContainer.classList.add('active');

      if (data.isAdmin) {
        document.getElementById('showDashboard').classList.remove('hidden');
      }
    } else {
      alert(data.error || 'Erreur de connexion');
    }
  } catch (error) {
    alert('Erreur de connexion');
  }
});

document.querySelector('.register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;

  if (password !== confirmPassword) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      alert('Inscription réussie ! Veuillez vous connecter.');
      registerForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
    } else {
      const data = await response.json();
      alert(data.error || 'Erreur lors de l\'inscription');
    }
  } catch (error) {
    alert('Erreur lors de l\'inscription');
  }
});

// Génération de la documentation avec effets
generateBtn.addEventListener('click', async () => {
  const originalCode = codeInput.value;

  if (!originalCode.trim()) {
    alert('Veuillez d\'abord entrer du code');
    return;
  }

  // Masquer le bouton de copie initialement
  copyBtn.style.opacity = '0';

  // Ajouter l'effet de scanning
  codeInput.classList.add('scanning');

  // Attendre l'animation de scanning (par exemple 4 secondes)
  await new Promise(resolve => setTimeout(resolve, 4000));

  try {
    const response = await fetch('/api/docs/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ code: originalCode })
    });

    const data = await response.json();

    // Retirer l'effet de scanning
    codeInput.classList.remove('scanning');

    // Afficher le bouton de copie
    copyBtn.style.opacity = '1';

    // Effacer et réanimer la documentation
    codeInput.value = '';

    // Animer chaque ligne de documentation avec un délai
    const lines = data.documentation.split('\n');
    let fullDoc = '';

    for (let i = 0; i < lines.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 150));
      fullDoc += lines[i] + '\n';
      codeInput.value = fullDoc;
    }
  } catch (error) {
    codeInput.classList.remove('scanning');
    codeInput.value = 'Erreur lors de la génération de la documentation. Veuillez réessayer.';
    setTimeout(() => {
      codeInput.value = originalCode;
    }, 2000);
  }
});

// Fonctionnalité de copie
copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(codeInput.value);

  const originalHTML = copyBtn.innerHTML;

  copyBtn.innerHTML = `
    <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
  `;

  setTimeout(() => {
    copyBtn.innerHTML = originalHTML;
  }, 2000);
});

// Chargement des données du tableau de bord
async function loadDashboardData() {
  try {
    const response = await fetch('/api/dashboard/stats', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await response.json();

    document.getElementById('totalUsers').textContent = data.totalUsers;
    document.getElementById('totalGenerations').textContent = data.totalGenerations;
    document.getElementById('activeToday').textContent = data.activeToday;

    const recentUsersHTML = data.recentUsers.map(user => `
      <div class="flex justify-between items-center text-white p-4 bg-white/10 rounded">
        <span>${user.email}</span>
      </div>
    `).join('');

    document.getElementById('recentUsers').innerHTML = recentUsersHTML;
  } catch (error) {
    console.error('Erreur lors du chargement des données du tableau de bord');
  }
}

// Vérification de l'authentification au chargement de la page
const token = localStorage.getItem('token');
if (token) {
  authContainer.classList.remove('active');
  generatorContainer.classList.add('active');

  if (localStorage.getItem('isAdmin') === 'true') {
    document.getElementById('showDashboard').classList.remove('hidden');
  }
}
