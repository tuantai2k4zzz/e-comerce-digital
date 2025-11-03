const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    if(conn.connection.readyState === 1){
        console.log("DB connected successfully");
    }else{
        console.log("DB connection is not successful");
    }
} catch (error) {
    console.log("DB connection is failed");
    throw new Error(error);
  }
};

module.exports = dbConnect;
