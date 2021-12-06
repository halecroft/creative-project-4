<template>
<div class="user">
  <div class="message" v-if="userNotFound">
    <h2>User Not Found</h2>
  </div>
  <div v-if="!userNotFound">
    <h1>{{findUser.name}}</h1>
    <h2>{{findUser.username}}</h2>
    <p>{{findUser.bio}}</p>
    <router-link :to="'/user/' + this.$route.params.id + '/edit'">Edit Profile</router-link>
    <section class="image-gallery" v-if="(!isFetchingPosts && !isFetchingUsers)">
      <div class="image" v-for="post in posts.filter(post => post.userid === findUser._id)" :key="post._id">
        <img :src="post.path" />
        <h3>{{post.description}}</h3>
        <button>{{post.likes}} Likes</button>
        <button class="delete" @click="deletePost(post)">Delete Post</button>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>

a {
  font-size: 1rem;
  color: black;
  text-decoration: none;
  border: black 1px solid;
  border-radius: 5px;
}

a:visited {
  color: black;
  text-decoration: none;
}

.image h3 {
  font-style: italic;
}

.message h2 {
    color: red;
    font-size: 1.5rem;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  margin-top: 1rem;
  column-gap: 2rem;
}

.user {
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

.delete {
  background-color: rgb(236, 236, 236);
  border: red 1px solid;
  border-radius: 5px;
  float: right;
}

.delete:hover {
  background-color: red;
  border: red 1px solid;
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
  name: 'User',
  data() {
    return {
      posts: [],
      users: [],
      findUser: null,
      isFetchingPosts: true,
      isFetchingUsers: true,
      userNotFound: false,
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
        this.findUser = this.users.find(user => user._id === this.$route.params.id);
        if (this.findUser == undefined) {
          this.findUser = this.users.find(user => user.username === this.$route.params.id);
          if (this.findUser == undefined) {
            this.userNotFound = true;
          }
        }
        this.isFetchingUsers = false;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deletePost(post) {
      try {
        await axios.delete("/api/posts/" + post._id);
        this.getPosts();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
