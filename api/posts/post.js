const db = require('../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  const [post] = await db.query(escape`
    SELECT *
    FROM posts
    WHERE id = ${req.query.id}
  `)
  res.status(200).json({ profile })
}
