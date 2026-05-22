import sequelize from "./database.js";

// Import your models here
import Test from "../models/Test.js";
// import Student from "../models/Student.js";

const initDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully");

        await sequelize.sync({ alter: true });
        console.log("✅ All models synced successfully");

    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1);
    }
};

export default initDatabase;