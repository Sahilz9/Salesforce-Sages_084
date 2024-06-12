document.getElementById('loginForm').addEventListener('submit', loginUser);
document.getElementById('signupForm').addEventListener('submit', signupUser);
document.getElementById('showSignup').addEventListener('click', showSignupForm);

async function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login successful');
    } else {
        alert('Invalid username or password');
    }
}

async function signupUser(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Signup successful');
        document.getElementById('signupContainer').style.display = 'none';
    } else {
        alert('Signup failed');
    }
}

function showSignupForm() {
    document.getElementById('signupContainer').style.display = 'block';
}
