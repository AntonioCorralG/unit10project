import config from "./config";

export default class Data {
  api(path, method = "GET", body = null, reqAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    //creates a base-64 encoded ASCII data
    if (reqAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const credentials = { username: emailAddress, password: password };
    const response = await this.api(`/users`, "GET", null, true, credentials);
    // if (response.status === 200) {
    //   return response.json().then((data) => data);
    // } else if (response.status === 401) {
    //   return null;
    // } else {
    //   throw new Error();
    // }
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
    ) {
      return null;
    } else {
      throw new Error("Something went wrong");
    }
  }

  //creates a new user
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  //gets a list of all the courses
  async getCourses() {
    const response = await this.api("/courses");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }
  //this directs gets course details for the selected course
  async courseDetail(id) {
    const response = await this.api(`/courses/${id}`);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

  //deletes the selected course
  async deleteCourse(id, user) {
    const { emailAddress, password } = user;
    const response = await this.api(`/courses/${id}`, "DELETE", {}, true, {
      username: emailAddress,
      password,
    });
    if (response.status === 204) {
      return [];
    } else {
      throw new Error();
    }
  }

  //updates the selected course
  async updateCourse(course, user) {
    const { emailAddress, password } = user;
    const response = await this.api(
      `/courses/${course.id}`,
      "PUT",
      course,
      true,
      { username: emailAddress, password }
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async createCourse(course, user) {
    const { emailAddress, password } = user;
    const response = await this.api(`/courses/`, "POST", course, true, {
      username: emailAddress,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
