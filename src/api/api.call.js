import Axios from "axios";

const base_URL = process.env.REACT_APP_API_BASE_URL;

export const NEWS_API = {
  newsApi: Axios.create({
    baseURL: base_URL,
  }),
  
  init() {
    this.newsApi.interceptors.request.use(this.onRequest.bind(this));
    this.newsApi.interceptors.response.use(
      this.onSuccess.bind(this),
      this.onError.bind(this)
    );
  },
  onRequest(config) {
    const token = localStorage.getItem("token");

    if (token) {
      NEWS_API.init();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  async onError(ex) {
    if (ex.response && ex.response.status === 401) {
      localStorage.removeItem("token");
      // Redirect to login if needed
    }
    return Promise.reject(ex);
  },

  onSuccess(response) {
    // Handle success response
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
      logout() {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/auth/logout`,
        });
      },
      fetchUser() {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/user/profile`,
          
        });
      },
      profileUpdate(data) {
        return NEWS_API.newsApi.request({
          method: "POST",
          url: `/user/profile`,
          data
        });
      },
    },
    Commons: {
      fetchHeaderMenu() {
          
          return NEWS_API.newsApi.request({
              method: "GET",
              url: `/menu/header/`, 
          });
          
        },
      fetchFooterMenu() {
      
          return NEWS_API.newsApi.request({
              method: "GET",
              url: `/menu/footer/`, 
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
          url: `/single-home-article`,
          data,
        });
      },
    },
    categories: {
      fetchCategories() {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/categories`,
        });
      },
    },
    preferences: {
      fetchPreferences() {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/preferences`,
        });
      },
      storePreferences(data) {
        return NEWS_API.newsApi.request({
          method: "POST",
          url: `/preferences`,
          data
        });
      },
    },
    articles: {
      fetchAllSource() {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/article/source`,
        });
      },
      fetchSubCategoriesArticles(data) {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/sub-categories-with-articles/${data}`,
          data,
        });
      },
      fetchSingleArticle(data) {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/articles/${data}`,
          data,
        });
      },
      fetchArticlesByCategory(categoryId, page) {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `articles/sub-categories/${categoryId}`,
          params: { page }
        });
      },
      // Fetch all articles (with optional categoryId)
      fetchArticles(page) {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/articles/sub-categories`,
          params: { page }
        });
      },
      articleSearch(query, date, source, category) {
        return NEWS_API.newsApi.request({
          method: "POST",
          url: `/articles/search`,
          data: { query, date, category, source }
        });
      },
      fetchAuthors() {
        return NEWS_API.newsApi.request({
          method: "GET",
          url: `/articles/authors`,
        });
      },
      
    },
  },
};
