let emailRef = document.getElementById("email");
let usernameRef = document.getElementById("username");
let passwordRef = document.getElementById("password");
let btn = document.getElementById("btn");
let loginForm = document.querySelector("form");
let eyeL = document.querySelector(".eyeball-l");
let eyeR = document.querySelector(".eyeball-r");
let handL = document.querySelector(".hand-l");
let handR = document.querySelector(".hand-r");

let normalEyeStyle = () => {
  eyeL.style.cssText = `
    left:0.6em;
    top: 0.6em;
  `;
  eyeR.style.cssText = `
    right:0.6em;
    top:0.6em;
  `;
};

let normalHandStyle = () => {
  handL.style.cssText = `
        height: 2.81em;
        top:8.4em;
        left:7.5em;
        transform: rotate(0deg);
    `;
  handR.style.cssText = `
        height: 2.81em;
        top: 8.4em;
        right: 7.5em;
        transform: rotate(0deg);
    `;
};

// When clicked on email input
emailRef.addEventListener("focus", () => {
  normalEyeStyle();
  normalHandStyle();
});

// When clicked on username input
usernameRef.addEventListener("focus", () => {
  eyeL.style.cssText = `
    left: 0.75em;
    top: 1.12em;  
  `;
  eyeR.style.cssText = `
    right: 0.75em;
    top: 1.12em;
  `;
  normalHandStyle();
});

// When clicked on password input
passwordRef.addEventListener("focus", () => {
  handL.style.cssText = `
        height: 6.56em;
        top: 3.87em;
        left: 11.75em;
        transform: rotate(-155deg);    
    `;
  handR.style.cssText = `
    height: 6.56em;
    top: 3.87em;
    right: 11.75em;
    transform: rotate(155deg);
  `;
  normalEyeStyle();
});

// When clicked outside username and password input
document.addEventListener("click", (e) => {
  let clickedElem = e.target;
  if (
    clickedElem != usernameRef &&
    clickedElem != passwordRef &&
    clickedElem != emailRef
  ) {
    normalEyeStyle();
    normalHandStyle();
  }
});

//////////////////////////////////////////////////////////////////////

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  let userData = {
    name: usernameRef.value.trim(),
    email: emailRef.value.trim(),
    password: passwordRef.value.trim(),
  };


  try {
    let response = await fetch(
      "https://users-register-login.onrender.com/api/v1/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    let result = await response.json();

    if (response.ok) {
      console.log("User successfully registered:", result);
      alert("Registration Successful!");
    } else {
      console.log("Error:", result);
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Network Error:", error);
    alert("Something went wrong! Please try again later.");
  }
});
