const ListService = {
  getList(knexInstance) {
    return knexInstance("list").select("*");
  },
  insertItem(knexInstance, newItem) {
    return knexInstance
      .insert(newItem)
      .into("list")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  }
};

module.exports = ListService;
