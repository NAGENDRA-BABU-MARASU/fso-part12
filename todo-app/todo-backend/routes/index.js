const express = require('express');
const router = express.Router();

const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

function setUpRedis() {
  const _ = async () => {
    const added_todos = await redis.getAsync('added_todos');
    if (added_todos === null) {
      await redis.setAsync('added_todos');
    }
  }
  _();
}

setUpRedis();

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const result = await redis.getAsync('added_todos');
  res.json({
    added_todos: result
  })
})

module.exports = router;
