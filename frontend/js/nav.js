document.getElementsByClassName("navbar")[0].innerHTML = `
<div class="container-fluid">
<button
  data-bs-toggle="collapse"
  class="navbar-toggler"
  data-bs-target="#navcol-1"
>
  <span class="visually-hidden">Toggle navigation</span
  ><span class="navbar-toggler-icon"></span></button
><a class="navbar-brand" href="#">Dance Fit Stuido</a>
<div class="collapse navbar-collapse" id="navcol-1">
  <ul class="navbar-nav">
    <a class="nav-link active" href="index.html">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="classes.html">Classes</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="special-occasions.html">Special Occasions</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="contact.html">Contact Us</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="your-classes.html">Your Classes</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="settings.html">Settings</a>
  </li>
</ul>
</div>
</div>
`;
