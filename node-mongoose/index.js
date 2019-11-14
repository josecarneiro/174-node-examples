const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
  {
    name: String,
    age: {
      type: Number,
      min: 20
    },
    occupation: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    role: {
      type: String,
      enum: ['GM', 'PM', 'LT', 'TA', 'OM', 'AM'],
      default: 'LT'
    },
    hasMoustache: {
      type: Boolean,
      default: false
    },
    location: {
      country: {
        type: String
      },
      city: {
        type: String
      },
      neighborhood: {
        type: String
      }
    },
    pets: [
      {
        type: String
      }
    ]
    // creationDate: {
    //   type: Date,
    //   default: Date.now
    // }
  },
  {
    // Automatically set timestamps in objects
    // timestamps: true
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);

const Model = mongoose.model('Person', personSchema);

const mongodbURI = 'mongodb://localhost:27017/node-174-mongoose-example';

// Connect to MongoDB
mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to the database successfully.');

    // Create a new Person
    // Model.create({
    //   name: 'Paula',
    //   age: 24,
    //   occupation: 'TA at Ironhack Lisboa',
    //   role: 'TA'
    // })
    Model.create({
      name: 'Álvaro',
      age: 29,
      occupation: 'General Manager at Ironhack Lisboa',
      // location: {
      //   country: 'Portugal',
      //   city: 'Lisbon'
      // },
      pets: ['Tesla', 'Edison', 'Turing']
      // role: 'GM'
    })
      .then(document => {
        console.log('We successfully created the person object.');
        console.log(document);
        // Chain loading multiple documents
        return Model.find({ age: { $gt: 25 } });
      })
      .then(documents => {
        console.log('We successfully loaded several documents');
        console.log(documents);
        // Chain loading multiple documents
        return Model.findOne({ name: 'José' });
      })
      .then(document => {
        console.log('We successfully loaded a single document');
        console.log(document);
        return Model.updateOne({ name: 'Filipe' }, { name: 'José' });
      })
      .then(updatedDocument => {
        console.log('We successfully updated a single document');
        console.log(updatedDocument);
        return Model.deleteOne({ name: 'José' });
      })
      .then(data => {
        console.log('We successfully deleted a single document');
        console.log(data);
      })
      .catch(error => {
        console.log('There was an error in the chain of operations.');
        console.log(error);
      });
  })
  .catch(error => {
    console.log('There was an error connecting to the database.');
  });
