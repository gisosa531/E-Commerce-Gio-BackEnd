const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
    // be sure to include its associated Products
  const categoryInfo = await Category.findAll({
    include: [
      {
        model: Product
      }
    ],
  })
  .then((categories) => {
    res.json(categories);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryInfo = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [ 
      {
      model: Product
      }
  ],
})
  .then((categories) => {
    res.json(categories);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  const categoryInfo = await Category.create(req.body)
    res.status(200).json(categoryInfo);
   } catch(err) { 
     res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    Category.update(req.body, {
      where: {
        id: req.params.id
      },
    })
    .then((category) => res.status(200).json(category))
  }
    catch (err) { 
      res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const tag_id = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tag_id) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
   }
    res.status(200).json(tag_id);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
