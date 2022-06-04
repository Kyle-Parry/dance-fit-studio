if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../sw.js")
    .then((reg) => console.log("Service Worker: Registered", reg))
    .catch((err) => console.log("Service Worker: Not registered", err));
}

document.getElementsByClassName("navbar")[0].innerHTML = `
<div class="container-fluid">
<button
  data-bs-toggle="collapse"
  class="navbar-toggler"
  data-bs-target="#navcol-1"
>
  <span class="visually-hidden">Toggle navigation</span
  ><span class="navbar-toggler-icon"></span></button
><a class="navbar-brand" href="/">Dance Fit Studio</a>
<div class="collapse navbar-collapse" id="navcol-1">
  <ul class="navbar-nav">
    <a class="nav-link active" href="/">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="class-list">Classes</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="special-occasions">Special Occasions</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="contact">Contact Us</a>
  </li>
  <li id="your-classes" class="nav-item">
    <a class="nav-link" href="your-classes">Your Classes</a>
  </li>
  <li id="settings" class="nav-item">
    <a class="nav-link" href="settings">Settings</a>
  </li>
  <li id="login" class="nav-item">
  <a class="nav-link" href="login">Sign in</a>
</li>
<li id="register" class="nav-item">
<a class="nav-link" href="register">Register</a>
</li>
<li id="logout" class="nav-item">
<form class="nav-link" action="/logout" method="POST" id="logoutBtn"><button class="btn btn-primary" type="submit" onclick="localStorage.removeItem('loggedIn');">Logout</button></form>
</li>
</ul>
</div>
</div>
`;

if (localStorage.getItem("loggedIn") === null) {
  document.getElementById("logout").classList += " visually-hidden";
  document.getElementById("your-classes").classList += " visually-hidden";
  document.getElementById("settings").classList += " visually-hidden";
} else {
  document.getElementById("login").classList += " visually-hidden";
  document.getElementById("register").classList += " visually-hidden";
}

document.getElementById("footer").innerHTML = `
<div class="social">
<a href="#"><i class="icon ion-social-instagram"></i></a
><a href="#"><i class="icon ion-social-snapchat"></i></a
><a href="#"><i class="icon ion-social-twitter"></i></a
><a href="#"><i class="icon ion-social-facebook"></i></a>
</div>
<ul class="list-inline">
<li class="list-inline-item"><a href="/">Home</a></li>
<li class="list-inline-item"><a href="class-list">Classes</a></li>
<li class="list-inline-item"><a href="special-occasions">Special Occasions</a></li>
<li class="list-inline-item"><a href="contact">Contact Us</a></li>
<li class="list-inline-item"><a href="#">Terms</a></li>
<li class="list-inline-item"><a href="#">Privacy Policy</a></li>
</ul>
<p class="copyright">Company Name © 2022</p>
`;

window.addEventListener("load", function () {
  const loader = document.getElementById("spinner");
  setTimeout(function () {
    loader.className += " visually-hidden";
  }, 2000);
});
