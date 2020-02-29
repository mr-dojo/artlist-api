const ListService = {
  getList(knexInstance) {
    return knexInstance("artlist").select("*");
  }
};

module.exports = ListService;
