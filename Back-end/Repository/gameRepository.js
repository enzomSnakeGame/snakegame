const getAllElements = require("../queries/queries");


getAllElements()
  .then(elementsArray => {
    console.log(elementsArray);
    return elementsArray ; 
    // Use the elements array as needed
  })
  .catch(error => {
    // Handle error
    console.error("Error:", error);
  });
