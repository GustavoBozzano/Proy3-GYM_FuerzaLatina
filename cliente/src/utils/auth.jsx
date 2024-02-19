import { jwtDecode } from "jwt-decode";

class Auth {
  getProfile() {
    return jwtDecode(this.getToken());
  }

  getToken() {
    return localStorage.getItem("token");
  }

  loggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }

  login(idToken) {
    localStorage.setItem("token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}

export default new Auth();
