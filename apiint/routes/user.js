const express = require ('express'); 
const res = require('express/lib/response');
const router = express.Router(); 
const User = require('../model/user'); 

var this1= 'localhost:3000/user/61fb4ed53796ec648054ab0d'
let fu =''
let ru = 0

const updatesecuser = (ru,fu) => {
console.log(ru,fu,'jhsfkj')
User.findOneAndUpdate({name:fu},{
    totalEarning : ru + 10,
   })
   
   res.json('updated')
  }
router.get('/', function(req, res) { 
    User.find(function(err, users) {
    res.json(users);
  });
});


router.delete('/:id', function(req, res) {  
  User.findById(req.params.id, function(err, user) {
    if (!user) {
      res.status(404).send('user not found');
    } else {
     User.findByIdAndRemove(req.params.id)
        .then(function() { res.status(200).json("user deleted") })
        .catch(function(err) {
          res.status(400).send("user delete failed.");
        })
    }
  });
})

 router.get('/:id', function(req, res) {  
     console.log(req.params.id,'this')
     User.findById(req.params.id, function(err, user) {
     if (!user) {
         
       res.status(404).send('No result found');
     } else {
        console.log(user.isPaymentMade)
        
       res.json(user);
     }
   });
 });

router.post('/', function(req, res) {     
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.send(user);
    })
    .catch(function(err) {
      console.log(err,'err')
      res.status(422).send('user add failed');
    });
});

 router.patch('/:id', function(req, res){    
   User.findByIdAndUpdate(req.params.id,{
       isPaymentMade:true
   })
  .then(User.findById(req.params.id, function(err,user){
         fu  = user.referredUser
     }))
    .then(()=> {
       console.log(fu)
       User.findOne({name:fu}, function(user){
         ru = user.totalEarning
         console.log(user.totalEarning,'te')
       })
      })
     .then(()=> {
       //updatesecuser(ru,fu)
       console.log(ru,fu)
       User.findOneAndUpdate({name:fu},{
        totalEarning : ru + 10,
       })
       console.log('done')
       res.json('updated')
    
        })
//  .then(()=> {
//          res.json('Done')
//        })
//       //  console.log('here')
        
      //   .select()
      //   .exec((err,doc)=> {
      //     console.log(doc)
      //     updatethis(doc)
      //     // console.log(doc,doc[0]._id.split()(13,-2))
      //     // User.findById(doc[0]._id.slice(13,-2), function(user,err){
      //     //   console.log(user,'hjdsbkjs',err)
      //     // })
      //     // User.findByIdAndUpdate(doc[0]._id,{
      //     //        totalEarning:doc[0].totalEarning + 10
      //     //   })
      //       console.log('done')
          
      //   })
      //  })
      
        // .then((doc)=> {
        //   console.log(doc._id)
        // //   User.findByIdAndUpdate(req.params.id,{
        // //     isPaymentMade:true
        // // })

        //   console.log('user updated')
        // })

            
        //  console.log( fu,'jdsvhj')
     
    
     .catch(function(err) {
        // console.log(err)
       res.status(422).send(err);
     })
 });

module.exports = router