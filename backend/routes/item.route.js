const express = require('express');
const app = express();
const itemRoute = express.Router();
  
// Item model
let Item = require('../model/Item');
//Multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
      callBack(null, `FunOfHeuristic_${file.originalname}`)
  }
})
const upload = multer({ storage: storage })
// Add Item
itemRoute.route('/add-item').post((req, res, next) => {
  console.log(req);
  Item.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all item
itemRoute.route('/').get((req, res) => {
  Item.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single item
itemRoute.route('/read-item/:id').get((req, res) => {
  Item.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Item
itemRoute.route('/update-item/:id').put((req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Item successfully updated!')
    }
  })
})

// Delete Item
itemRoute.route('/delete-item/:id').delete((req, res, next) => {
  Item.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = itemRoute;





// Add Item
// itemRoute.route('/add-item').post((req, res, next) => {
//   Item.create(req.body, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// });