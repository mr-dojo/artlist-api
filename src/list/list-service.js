const ListService = {
  getList(knexInstance) {
    return knexInstance("list").select("*");
  }
};

module.exports = ListService;
