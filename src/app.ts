import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import db from "./models";

dotenv.config();

const app = express();

//Routes
import authRoutes from "./routes/auth.routes";
import expenseRoutes from "./routes/expense.routes";
import plusRoutes from "./routes/plus.routes";
import userRoutes from "./routes/user.routes";

app.use( cors() );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.static( path.join( __dirname, "..", "public" ) ) );


app.use( "/api", authRoutes );
app.use( "/api/expense", expenseRoutes );
app.use( "/api/plus", plusRoutes );
app.use( "/api/user", userRoutes );


const PORT = process.env.PORT || 3000;

db.sequelize.sync().then( () => {
	app.listen( PORT, () => {
		console.log( `Server is running at ${PORT}` );
	} );
} );

