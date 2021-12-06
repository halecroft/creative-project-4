<template>
<div id="app">
  <div class="header">
    <a class="title" href="https://cp4.halecroft.net">Fastagram</a>
    <p>Not an Instagram clone!&trade;</p>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <a href="https://github.com/halecroft/creative-project-4">Github Link</a>
    <router-link to="/">Home</router-link>
    <router-link to="/post">New Post</router-link>
    <router-link to="/join">Join</router-link>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  position: relative;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px 0px 3rem 0px;
  margin: 0px;
  min-height: 100vh;
}

.app {
    padding-bottom: 5rem;
}

/* Header */
.header {
  display: flex;
  flex-direction: column;
  padding: 10px 100px 10px 100px;
  background-color: #da3eb8;
  justify-content: center;
  align-items: center;
}

.header p {
    color: white;
}

.title {
  font-size: 3rem;
  text-decoration: none;
  color: white;
}

.title:visited {
  text-decoration: none;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  height: 4rem;
  padding: 0px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 1.5rem;
  bottom: 0;
  justify-content: center;
  align-items: center;
}

.footer a {
  color: #000;
  text-decoration: none;
  margin: 0 2rem;
}

.footer a:visited {
  color: #000;
  text-decoration: none;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}

h3 {
    font-size: 12px;
}
</style>
