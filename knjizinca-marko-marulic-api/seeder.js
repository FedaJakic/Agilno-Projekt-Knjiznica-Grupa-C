import dotenv from "dotenv";

dotenv.config();

const importData = async () => {
  // upload data to DB
};

const destroyData = async () => {
  //destroy data from DB
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
