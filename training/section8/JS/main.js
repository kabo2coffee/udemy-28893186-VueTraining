const app = Vue.createApp({
  data: () => ({
    items: null,
    keyWord: "",
    message: "",
  }),
  watch: {},
  mounted: function () {
    this.keyWord = "Vue";
    this.getAnswer();
  },
  methods: {
    getAnswer: function () {
      if (this.keyWord === "") {
        console.log("キーワードが空です");
        this.items = null;
        return;
      }
      this.message = "Loading...";
      const vm = this;
      const params = { page: 1, perPage: 20, query: this.keyWord };
      axios
        .get("https://qiita.com/api/v2/items", { params })
        .then(function (response) {
          console.log(response);
          vm.items = response.data;
        })
        .catch(function (error) {
          vm.message = "Error!" + error;
        })
        .finally(function () {
          vm.message = "";
        });
    },
  },
});
app.mount("#app");
