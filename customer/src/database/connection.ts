import mongoose from "mongoose";
const connectionDB = (baseUrl:any) => {
  return mongoose
    .connect(baseUrl)
    .then(() => {
      console.log(" database connection withh successful");
    })
    .catch((error:any) => {
      console.log("error", error);
    });
};
 export {connectionDB}