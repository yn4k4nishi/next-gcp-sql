const db = require('../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  let page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 9
  if (page < 1) page = 1
  const posts = await db.query(escape`
      SELECT *
      FROM posts
      ORDER BY id
      LIMIT ${(page - 1) * limit}, ${limit}
    `)
  const count = await db.query(escape`
      SELECT COUNT(*)
      AS postsCount
      FROM posts
    `)
  const { postsCount } = count[0]
  const pageCount = Math.ceil(postsCount / limit)
  res.status(200).json({ posts, pageCount, page })
}
