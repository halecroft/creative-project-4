<template>
<div class="admin">
  <h1>Create a Post</h1>
    <div class="add">
      <div class="form">
        <input v-model="username" placeholder="User">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectUser(s)">{{s.username}}
          </div>
        </div>
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <p></p>
        <textarea v-model="description" placeholder="Description"></textarea>
        <p></p>
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addPost">
        <img :src="addPost.path" />
        <h2>{{addPost.description}}</h2>
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
  name: 'Post',
  data() {
    return {
      username: "",
      userid: -1,
      description: "",
      file: null,
      addPost: null,
      users: [],
      findUser: null,
    }
  },
  computed: {
    suggestions() {
      let users = this.users.filter(user => user.username.toLowerCase().startsWith(this.username.toLowerCase()));
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
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/posts', {
          userid: this.userid,
          description: this.description,
          path: r1.data.path
        });
        this.addPost = r2.data;
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
      this.username = user.username;
      this.userid = user._id;
      this.findUser = user;
    },
  }
}
</script>