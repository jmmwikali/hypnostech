import axios from 'axios';

/**
 * Runs once at app startup (imported in index.js or App.js).
 * Attaches the X-User-Role header to every outgoing axios request
 * so the Flask backend can enforce role-based access control.
 */
axios.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      if (user?.role) {
        config.headers["X-User-Role"] = user.role;
      }
    }
  } catch {
    // localStorage parse error — send no role header (treated as customer)
  }
  return config;
});

export default axios;
