<template>
<div class="admin">
  <h1>Edit Your Account</h1>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="name">
        <p></p>
        <input v-model="username" placeholder="Username">
        <p></p>
        <textarea v-model="bio" placeholder="Bio"></textarea>
        <p></p>
        <p>Profile Picture</p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addUser">
        <h2>{{addUser.name}}</h2>
        <h2>{{addUser.username}}</h2>
        <h2>{{addUser.bio}}</h2>
        <img :src="addUser.path" />
      </div>
    </div>
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete an Item</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findUsername" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectUser(s)">{{s.username}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findUser">
        <input v-model="findUser.title">
        <p></p>
        <textarea v-model="findUser.description"></textarea>
        <p></p>
        <img :src="findUser.path" />
      </div>
      <div class="actions" v-if="findUser">
        <button @click="deleteItem(findUser)">Delete</button>
        <button @click="editItem(findUser)">Edit</button>
      </div>
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

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Join',
  data() {
    return {
      name: "",
      username: "",
      bio: "",
      file: null,
      addUser: null,
      users: [],
      findUsername: "",
      findUser: null,
    }
  },
  computed: {
    suggestions() {
      let users = this.users.filter(user => user.username.toLowerCase().startsWith(this.findUsername.toLowerCase()));
      return users.sort((a, b) => a.username > b.username);
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        console.log(this.description);
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/users', {
          name: this.name,
          username: this.username,
          bio: this.bio,
          path: r1.data.path
        });
        this.addUser = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getUsers() {
      try {
        let response = await axios.get("/api/users");
        this.users = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectUser(user) {
      this.findUsername = "";
      this.findUser = user;
    },
    async deleteUser(user) {
      try {
        await axios.delete("/api/users/" + user._id);
        this.findUser = null;
        this.getUsers();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editUser(user) {
      try {
        await axios.put("/api/users/" + user._id, {
          title: this.findUser.title,
          description: this.findUser.description,
        });
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