const fs = require("fs");

const loadFileAsynchronously = (path, callback) => {
  fs.readFile(path, "utf8", (error, data) => {
    if (error) {
      console.log("Error loading file: ", path);
      callback(error);
    } else {
      console.log("Loaded file asynchronously: ", "\n", data);
      callback(null, data);
    }
  });
};

// loadFileAsynchronously("./a.txt", (error, data) => {
//   console.log("Callback from a.txt loading was called.");
//   loadFileAsynchronously("./b.txt", (error, data) => {
//     console.log("Callback from b.txt loading was called.");
//   });
// });

const loadFileSynchronously = path => {
  try {
    const data = fs.readFileSync(path, "utf8");
    console.log("Loaded file synchronously: ", "\n", data);
  } catch (error) {
    console.log("Error loading file: ", path);
    throw error;
  }
};

// loadFileSynchronously("./a.txt");
// loadFileSynchronously("./b.txt");

const loadFileAsynchronouslyWithPromises = path => {
  return new Promise((resolve, reject) => {
    fs.promises
      .readFile(path, "utf-8")
      .then(data => {
        console.log("Loaded file asynchronously with promises: ", "\n", data);
        resolve(data);
      })
      .catch(error => {
        console.log("Error loading file: ", path);
        error;
      });
  });
};

// loadFileAsynchronouslyWithPromises("./a.txt")
//   .then(data => {
//     console.log("Successfully loaded data from a");
//     loadFileAsynchronouslyWithPromises("./b.txt")
//       .then(data => {
//         console.log("Successfully loaded data from b");
//       })
//       .catch(error => {
//         console.log("Error with promises.");
//       });
//   })
//   .catch(error => {
//     console.log("Error with promises.");
// });

loadFileAsynchronouslyWithPromises("./a.txt")
  .then(data => {
    console.log("Successfully loaded data from a");
    return loadFileAsynchronouslyWithPromises("./b.txt");
  })
  .then(data => {
    console.log("Successfully loaded data from b");
    return loadFileAsynchronouslyWithPromises("./d.txt");
  })
  .then(data => {
    console.log("Successfully loaded data from d");
  })
  .catch(error => {
    console.log("Error with promises.");
  });
