#  Connectverse v1
## Getting up and running with the local environment

#### Setup the enviroment

This backend server was built using Node, Express, Sequelize and Postgres. You can access the swagger documentation for the API on this link https://connect-verse-sr1t.onrender.com/api/v1/docs.

To run the local environment, install nodejs the lts version. The lts version at the time of this documentation is lts/iron -> v20.17.0.

Follow this [guide](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) to install node on your local environment.

You need to also download and install Postgres. To install Postgres follow the following [guide](https://www.postgresql.org/download/).

#### Setup the project

Open your terminal and clone the project using this command: `git clone git@github.com:NkFab/connect-verse.git`

Navigate to the directory to which you cloned the project and change the directory to the cloned project by running this command `cd connect-verse`. After this install all the dependencies using this command `npm install or yarn`.

When all the dependencies are installed create a **.env** file in the root directory **connect-verse**. The environment variables will be shared in the email. 

Create a database in Postgres that is going to store out data. You are going to modify the database connection string using your credentials and database name. 

After all this is done you can start the server using the following command `npm run dev`. Open your favorite REST API tester (Postman, Insomnia, etc.) and create a new request with following parameters:

```
method: GET
URL: http://localhost:9000/api/v1/docs
```

This API will respond with the full API documentation.

Prepared by Nkaka Manzi Fabrice