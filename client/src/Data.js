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

    if (reqAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  getCredentials(emailAddress, password) {
    const credentials = {
      username: emailAddress,
      password: password,
    };
    return credentials;
  }

  // User sign up functionality
  async signUpUser(user) {
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

  // User sigining in functionality
  async signInUser(emailAddress, password) {
    const credentials = this.getCredentials(emailAddress, password);
    const response = await this.api(`/users`, "GET", null, true, credentials);

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

  // Fetch all the available courses
  async fetchAvailableCourses() {
    const response = await this.api("/courses");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

  // Fetch the details of the courses of a specified id
  async fetchCourseDetailsWithID(id) {
    const response = await this.api(`/courses/${id}`);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

  // Delete the course of a specific id
  async deleteCourse(id, user) {
    const { emailAddress, password } = user;
    const credentials = this.getCredentials(emailAddress, password);
    const response = await this.api(
      `/courses/${id}`,
      "DELETE",
      {},
      true,
      credentials
    );
    if (response.status === 204) {
      return [];
    } else {
      throw new Error();
    }
  }

  // Update the course field/s
  async updateCourse(course, user) {
    const { emailAddress, password } = user;
    const credentials = this.getCredentials(emailAddress, password);
    const response = await this.api(
      `/courses/${course.id}`,
      "PUT",
      course,
      true,
      credentials
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

  // Create a new course
  async createNewCourse(course, user) {
    const { emailAddress, password } = user;
    const credentials = this.getCredentials(emailAddress, password);
    const response = await this.api(
      `/courses`,
      "POST",
      course,
      true,
      credentials
    );
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
