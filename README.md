# feedback-tracker

This app will provides management of comments

### Prerequisites

|  NAME   | VERSION |
| :-----: | :------ |
|  node   | ^10.0.1 |
|   npm   | ^6.1.0  |
| mongodb | 4.0     |

### How to start the app?

|   COMMAND   | DESCRIPTION              |
| :---------: | :----------------------- |
| `npm start` | It will start the server |
| `npm test`  | It will run test cases   |

##### Environment Variables

Create .env file on project base directory and configure it based on .env.example

#### Steps

1. Create .env file on project base directory and configure it based on .env.example
2. Start the server
3. Open the [visit](http://127.0.0.1:3000/)` in the browser, by default app will run on port 3000.
4. Open this link for [api documentation](http://127.0.0.1:3000/docs)` in the browser.

#### ToDo list

1. Login using github credentials and fetch acutal data. currently it's using seeds
2. pagination for the get comment api
3. setup two microservice and show integration
