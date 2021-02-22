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

    static async find() {
      const { rows } = await pool.query('SELECT * FROM cards');

      if(!rows[0]) throw new Error('No flash cards in database.');

      return rows.map(row => new Card(row));
    }
};
