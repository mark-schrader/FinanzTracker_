<template>
  <nav class="nav-container">
    <!-- right side-->
    <ul class="right-header">
      <img src="/public/logoipsum-331.png" alt="Logo" class="logo" />
      <h1 class="nav-text">Pleitegeier – Deine FinanzApp</h1>
    </ul>
    <!-- left side -->
    <ul class="left-header">
      <li>
        <a href="#">
          <ion-icon name="contrast-outline"></ion-icon>
        </a>
      </li>
      <li>
        <a href="#">
          <ion-icon name="globe-outline"></ion-icon>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
}
.logo {
  width: 50px;
  height: auto;
}
.nav-text {
  font-family: Georgia, serif;
  white-space: nowrap;
  font-size: 20px;
  color: azure;
  margin-top: 10px; /* dies muss später verändert werden, da es eine andere Größe haben wird, wenn das Logo sich verändert  */
}
.right-header {
  display: flex;
  gap: 2rem;
  list-style: none;
  align-items: right;
}
.left-header {
  display: flex;
  gap: 1rem;
  list-style: none;
  align-items: left;
  padding: 0 20px;
}
a {
  color: #285464;
  display: inline-block;
  transition: transform 0.2s ease;
}
a:hover {
  transform: scale(1.1);
}
</style>
