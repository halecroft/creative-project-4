<template>
<div class="home">
  <section class="image-gallery" v-if="(!isFetchingPosts && !isFetchingUsers)">
    <div class="image" v-for="post in posts" :key="post._id">
      <div class="user-info">
        <div class="cropper">
          <img class="avatar" :src="users.find(user => user._id === post.userid).path" />
        </div>
        <router-link :to="'/user/' + post.userid">{{users.find(user => user._id === post.userid).name}}</router-link>
      </div>
      <img :src="post.path" />
      <h3>{{post.description}}</h3>
      <button @click="likePost(post)">{{post.likes}} Likes</button>
    </div>
  </section>
</div>
</template>

<style scoped>

.image a {
  font-size: 1rem;
  font-weight: bold;
  color: black;
  text-decoration: none;
}

.image a:visited {
  color: black;
  text-decoration: none;
}

.image h3 {
  font-style: italic;
}

.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cropper {
  width: 2rem;
  height: 2rem;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
}

.avatar {
  height: 100%;
  display: inline;
  margin: 0 auto;
  width: auto;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 2rem;
}

.home {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.image {
  padding: 0.5rem;
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
  background-color: rgb(236, 236, 236);
  border: #da3eb8 1px solid;
  border-radius: 5px;
}

.image img {
  width: 100% !important;
}

button {
  background-color: rgb(236, 236, 236);
  border: #da3eb8 1px solid;
  border-radius: 5px;
}

button:hover {
  background-color: #da3eb8;
  border: #da3eb8 1px solid;
  border-radius: 5px;
  color: white;
}

@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
      users: [],
      isFetchingPosts: true,
      isFetchingUsers: true,
    }
  },
  created() {
    this.getPosts();
    this.getUsers();
  },
  methods: {
    async getPosts() {
      try {
        let response = await axios.get("/api/posts");
        this.posts = response.data;
        this.isFetchingPosts = false;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getUsers() {
      try {
        let response = await axios.get("/api/users");
        this.users = response.data;
        this.isFetchingUsers = false;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async likePost(post) {
      try {
        await axios.put("/api/posts/" + post._id, {
        likes: post.likes + 1,
        });
        this.getPosts();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
