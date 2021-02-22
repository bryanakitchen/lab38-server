const pool = require('../utils/pool');

module.exports = class Card {
    id;
    keyTerm;
    definition;
    topic;

    constructor(row) {
      this.id = row.id;
      this.keyTerm = row.key_term;
      this.definition = row.definition;
      this.topic = row.topic;
    }

    static async insert({ keyTerm, definition, topic }) {
      const { rows } = await pool.query(
        'INSERT INTO cards (key_term, definition, topic) VALUES ($1, $2, $3) RETURNING *',
        [keyTerm, definition, topic]
      );

      return new Card(rows[0]);
    }
};
