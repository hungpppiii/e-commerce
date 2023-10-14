import app from './src/app.js'
import env from './src/utils/validateEnv.js'

const server = app.listen(env.PORT, () => {
  console.log(`Server run successfully on http://localhost:${env.PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Close server");
  });
});
