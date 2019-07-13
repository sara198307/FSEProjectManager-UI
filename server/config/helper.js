
// export object
module.exports = {
  
    sendError: function(err, req, res) {
      res.status(500).send({error: err});
    }
  
  };