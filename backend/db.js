
import mongoose from 'mongoose';

const db = process.env.MONGO_URL || 'mongodb+srv://LigaFPV:kWSc2ajek34NsxPh@cluster0.rvtru.mongodb.net/LigaFPV?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = async () => {
    try {
        mongoose
        .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          console.log('Connected to the database');
        })
        .catch((err) => {
          console.error('Error connecting to the database:', err);
        });
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

export default connectDB;
