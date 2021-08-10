Add sequelize to previous API application and remove postgres connector throughout. Push the code to the repo on github. Generate a PR for review.

Note: 
I have used dotenv for environment variables, but Angular treats environment.ts file as static and it doesn't compile. The workaround I have used is to dynamically build the environment.ts file. For this I have written a script to generate the file and modified the package.json file. To run use command npm start --environment=dev