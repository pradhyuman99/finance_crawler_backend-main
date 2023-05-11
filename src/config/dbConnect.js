const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useUnifiedTopology: true, //Configurations for mongodb
      useNewUrlParser: true,
      autoIndex: true,
    });
    console.log("DB connected successfully!");
  } catch (error) {
    console.log("Error:" + error.message);
  }
};

module.exports = dbConnect;
