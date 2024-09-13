import Axios from "axios";

const base_URL = process.env.REACT_APP_API_BASE_URL;
console.log(base_URL);
export const NEWS_API = {
  newsApi: Axios.create({
    baseURL: base_URL, // Add the base URL
  }),
  init() {
    this.newsApi.interceptors.request.use(this.onRequest.bind(this));

    this.newsApi.interceptors.response.use(
      this.onSuccess.bind(this),
      this.onError.bind(this)
    );
  },

  onRequest(config) {
    // Get the token from localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  async onError(ex) {
    // Optionally handle errors (e.g., log out user on 401 Unauthorized)
    if (ex.response && ex.response.status === 401) {
      // Clear the token and handle the redirect, etc.
      localStorage.removeItem("authToken");
      // Redirect to login if needed
    }
    return Promise.reject(ex);
  },

  onSuccess(response) {
    return response;
  },
  endpoints: {
    Auth: {
      login(data) {
        return NEWS_API.newsApi.request({
          method: "POST",
          url: `/auth/login`,
          data,
        });
      },
      register(data) {
        return NEWS_API.newsApi.request({
          method: "POST",
          url: `/auth/register`,
          data,
        });
      },
      forgetPassword(data) {
        return NEWS_API.newsApi.request({
          method: "POST",
          url: `/auth/password/code`,
          data,
        });
      },
      resetPassword(data) {
        return NEWS_API.newsApi.request({
          method: "POST",
          url: `/auth/password/reset`,
          data,
        });
      },
      twoFactor(data) {
        return NEWS_API.newsApi.request({
          method: "POST",
          url: `/auth/password/verify`,
          data,
        });
      },
    },
    Commons: {
      fetchMenu(data) {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/menu/${data}`,
          data,
        });
      },
    },
    Home: {
      FetchCategoriesArticles(data) {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/categories-with-articles`,
          data,
        });
      },
      fetchFullArticle(data) {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/full-article`,
          data,
        });
      },
    },
    articles: {
      fetchSubCategoriesArticles(data) {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/sub-categories-with-articles/${data}`,
          data,
        });
      },
      fetchFullArticle(data) {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/full-article`,
          data,
        });
      },
      fetchArticlesByCategory(categoryId, page) {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/articles/${categoryId}`,
          params: { page }
        });
      },
      // Fetch all articles (with optional categoryId)
      fetchArticles(page) {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/articles`,
          params: { page }
        });
      },
      articleSearch(query) {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/articles/search`,
          params: { query }
        });
      },
    },
  },
};
