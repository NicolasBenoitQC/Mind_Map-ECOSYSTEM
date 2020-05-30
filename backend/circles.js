const deleteChildCircle = async (Child, title) => {
// get all circle
  const array = await Child.find();

// get child circle object to be delete
  const childCircleToDelete = await Child.find({title: title});

// get the idPosition of the child circle to be delete
  const idPosition = await childCircleToDelete[0].id;

// update each idPosition of the child circle with the idPosition greate of the circle to be deleted
  for(i=idPosition; i <= array.length; i++){
  // get the next child circle object 
    const object = await Child.find({id: Number(i)}) 
  // update child circle 
    await Child.findById(object[0]._id)
      .then(child => {
              child.title = child.title
              child.description = child.description
              child.id = Number(i -1)
            child.save()    
          })       
  }
  // delete the child circle 
  await Child.findByIdAndDelete(childCircleToDelete[0]._id);
}

module.exports = {
  deleteChildCircle
}