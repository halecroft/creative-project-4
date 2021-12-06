<template>
<div class="admin">
  <h1>Edit Your Account</h1>
    <div class="edit" v-if="(!userDeleted && !userNotFound)">
      <div class="form">
        <input v-model="findUser.name" placeholder="Name">
        <p></p>
        <input v-model="findUser.username" placeholder="Username">
        <p v-if="usernameInUse">This username is in use, please pick another.</p>
        <p></p>
        <textarea v-model="findUser.bio" placeholder="Bio"></textarea>
        <p></p>
        <p>Profile Picture</p>
        <img :src="findUser.path" />
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
      </div>
      <div class="actions">
        <button @click="deleteUser(findUser)">Delete User</button>
        <p></p>
        <button @click="editUser(findUser)">Save Edits</button>
      </div>
    </div>
    <div class="message" v-if="userDeleted">
      <h2>User Successfully Deleted</h2>
    </div>
    <div class="message" v-if="userNotFound">
      <h2>User Not Found</h2>
    </div>
</div>
</template>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img, .form img {
  max-width: 300px;
}

.message h2 {
    color: red;
    font-size: 1.5rem;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Edit',
  data() {
    return {
      file: null,
      users: [],
      posts: [],
      origUsers: [],
      findUser: null,
      profileChanged: false,
      userDeleted: false,
      userNotFound: false,
    }
  },
  computed: {
    usernameInUse() {
      let existingUser = this.origUsers.find(user => user.username === this.findUser.username);
      if (existingUser == undefined || existingUser._id === this.findUser._id) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    this.getUsers();
    this.getPosts();
  },
  methods: {
    fileChanged(event) {
      this.profileChanged = true;
      this.file = event.target.files[0];
    },
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
        this.origUsers = response.data.map(user => ({username: user.username, _id: user._id}));
        this.findUser = this.users.find(user => user._id === this.$route.params.id);
        if (this.findUser == undefined) {
          this.findUser = this.users.find(user => user.username === this.$route.params.id);
          if (this.findUser == undefined) {
            this.userNotFound = true;
          }
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(user) {
      for (const post of this.posts) {
        if (post.userid === user._id) {
          try {
            await axios.delete("/api/posts/" + post._id);
            return true;
          } catch (error) {
            console.log(error);
          }
        }
      }
        
      try {
        await axios.delete("/api/users/" + user._id);
        this.findUser = null;
        this.userDeleted = true;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editUser(user) {
      try {
        if (this.profileChanged) {
          const formData = new FormData();
          formData.append('photo', this.file, this.file.name);
          let newPhoto = await axios.post('/api/photos', formData);
          await axios.put("/api/users/" + user._id, {
          name: this.findUser.name,
          username: this.findUser.username,
          bio: this.findUser.bio,
          path: newPhoto.data.path
        });
        } else {
          await axios.put("/api/users/" + user._id, {
          name: this.findUser.name,
          username: this.findUser.username,
          bio: this.findUser.bio,
          path: this.findUser.path
        });
        }
        
        this.findUser = null;
        this.getUsers();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>