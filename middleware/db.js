import mongoose from 'mongoose';
const ConnectDb = async () => {
    try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to the database');
    }
    catch(err){
        console.log(err);

    }
}
export default ConnectDb;