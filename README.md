# Todo List React

## About

This is a TODO List application built with React, Redux Toolkit, and Material-UI. The application provides users with the ability to create, update, and delete TODO items, and includes features such as sorting, filtering, and pagination.

## Decisions

Some of the decisions made in the development of this application include:

* Using Redux Toolkit to manage application state
* Using Material-UI for styling and components
* Implementing unit tests using Jest and React Testing Library
* Adding integration tests with MSW (Mock Service Worker)
* Using Docker to containerize the application

## Technologies Used

The following technologies were used in the development of this application:

* React
* Redux Toolkit
* Material-UI
* TypeScript
* Jest
* React Testing Library
* MSW (Mock Service Worker)
* Docker

## Tests

The application includes both unit and integration tests. To run the tests, use the following command:

```
yarn test
```

## Usage

To use the application, follow these steps:

1. Clone the repository
2. Install dependencies using the following command:

```
yarn install
```

3. Start the application using the following command:

```
yarn start
```

4. Access the application by navigating to [http://localhost:3001](http://localhost:3001/) in your web browser.

## Docker

To run the application using Docker, follow these steps:

1. Build the Docker image using the following command:

This is a TODO List application built with React, Redux Toolkit, and Material-UI. The application provides users with the ability to create, update, and delete TODO items, and includes features such as sorting, filtering, and pagination.

```
docker build -t todo-list .
```

2. Start the Docker container using the following command:

```
docker run -p 3001:3001 -d todo-list
```

3. Access the application by navigating to [http://localhost:3001](http://localhost:3001/) in your web browser.

## Conclusion

Thank you for using this TODO List application! If you have any questions or feedback, please feel free to get in touch.
