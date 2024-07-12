function showTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.style.display = 'none');

    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.style.display = 'block';
    }
}

function toggleSubMenu(menuName) {
    const subMenu = document.getElementById(`${menuName}-sub`);
    const arrow = document.getElementById(`${menuName}-arrow`);
    if (subMenu.style.display === 'none' || subMenu.style.display === '') {
        subMenu.style.display = 'block';
        arrow.textContent = '▼';
    } else {
        subMenu.style.display = 'none';
        arrow.textContent = '▶';
    }
}


// Extracting user's name from the query parameter
const params = new URLSearchParams(window.location.search);
const userName = params.get('name');

// Displaying user's name on the dashboard
document.getElementById('userName').textContent = userName;


// Show default tab
document.addEventListener('DOMContentLoaded', () => {
    showTab('dashboard');
});