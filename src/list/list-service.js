const ListService = {
  getList(knexInstance) {
    return knexInstance("list").select("*");
  },
  getById(knexInstance, id) {
    return knexInstance
      .from("list")
      .select("*")
      .where("id", id)
      .first();
  },
  insertItem(knexInstance, newItem) {
    return knexInstance
      .insert(newItem)
      .into("list")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  deleteItem(knexInstance, id) {
    return knexInstance
      .from("list")
      .where({ id })
      .delete();
  }
};

module.exports = ListService;
