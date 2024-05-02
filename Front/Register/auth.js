async function handleLogin() {
  let Email = document.querySelector(".email").value;
  let Password = document.querySelector(".password").value;

  let user = {
    Email: Email,
    Password: Password,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  };

  let apiRequest = fetch("http://localhost:3000/api/login", request);
  let response = await apiRequest;
  if (response.status === 200) {
    const data = await response.json();
    window.localStorage.setItem("jwt", data.jwt);

    setTimeout(() => {
      window.location.href = "./equipment.html";
    }, 1000);
  }
}

function logout() {
  localStorage.removeItem("jwt");
  location.reload();
}

async function handleRegister() {
  let Email = document.querySelector(".email").value;
  let Password = document.querySelector(".password").value;
  let FirstName = document.querySelector(".firstName").value;
  let LastName = document.querySelector(".lastName").value;

  let user = {
    Email: Email,
    Password: Password,
    FirstName: FirstName,
    LastName: LastName,
  };

  try {
    let response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log("Utilisateur enregistré avec succès.");
      window.location.href = "./login.html";
    } else {
      console.error("Échec de l'enregistrement de l'utilisateur.");
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la tentative d'enregistrement :",
      error
    );
  }
}
