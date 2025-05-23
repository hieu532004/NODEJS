import app from "./app";
import { env } from "./helpers/env.helper";
import { myDataSource } from './data-source';
const PORT = env.PORT;

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        //should listen app here
        app.listen(PORT, () => {
            console.log(`Express Server is running at http://localhost:${PORT}`);
        });

    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


