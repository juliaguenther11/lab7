var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;
  models.Project
  .find('projectID')
  .exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}


// form_data
exports.addProject = function(req, res) {
  var form_data = req.body;
  var newProject=new models.Project({"title": form_data.title , "image": form_data.image, "date": form_data.date , "summary": form_data.summary });
    //newProject.update(form_data)
    //{"title": form_data.title , "image": form_data.image, "date": form_data.date , "summary": form_data.summary })
  console.log(form_data);
  newProject.save(afterSaving);

 function afterSaving(err) { // this is a callback
  if(err) {console.log(err); res.send(500); }
  res.redirect('/');
}
 res.send();
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;
   models.Project
  .find({'_id': projectID})
  .remove()
  .exec(afterRemovalMessage);

  function afterRemovalMessage(err){
    if(err){
      console.log(err);
      res.send(500);
    }
    res.send();
  }

}