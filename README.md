# Definitely Not Lamia
A React app which utilizes Engi's University NIM Finder API.

## Build and Execution

Running this project requires Node JS and NPM.

To install all dependencies, run this command:

```sh
$ npm install
```
To run the app on development setting, run the following commands:

```sh
$ npm run serve
```

To build and deploy the project, run this command:

```sh
$ npm run build
```

The built files will be on the `/dist` directory. 
Since it's a single-page application, make sure that all non-static requests go through `index.html` file.

## How to Use

Open the app on your browser. In development setting, try to open `http://localhost:3000`. It will redirect to a login page.
...

If you haven't had an account, click on Register to go to the registration page. Once you're there, pick a unique username and a password, and click on Register.
...

Upon successful registration, go back to the Login page, type in the credentials you just created, and click on Login. This page will show:
...

Type in your search query in the search text field, and press enter or click the search icon next to it. You can also choose to search by name or NIM by selecting the appropriate search type on the dropdown. 

The results will be shown on the table below. Move to the next or previous page by clicking the right and left chevron respectively.
...


## How it Works

It's a single-page application, utilizing `react-router` to route the pages in the client side. The root component is `App.js`, and it has three different (stateful) pages--`Login`, `Register`, and `Home`. `App.js` contains imports to all three pages, and declares which pages bind to which route.

### Login Page

Login page handles the login process. It accepts the username and password used to authenticate the client, and sends them to `https://api.stya.net/nim/login` endpoint. Upon successful login, it will receive the `Auth-Token` and persist it in a cookie named `token`. If the login fails, it will show a Snackbar showing the appropriate error message.

### Register Page

Register page handles the registration process. It accepts the username and password used to create a new account, and sends them to `https://api.stya.net/nim/register` endpoint. Upon successful registration, it will show a Snackbar stating that the registration process is complete. Otherwise, it shows the appropriate error message.

### Home Page

Home page handles the search query and display of the search results. It takes in a search query and whether the search should be done by name or NIM, and shows the records on a table. It also handles pagination.

### API client wrapper -- `api.js`

API client wrapper abstracts the HTTP call to the endpoints. It has the following exported methods:
1. `register(username: string, password: string)`
2. `login(username: string, passsword: string)`
3. `by_name(auth_token: string, query: string, page = 0, count = 10)`
4. `by_id(auth_token: string, query: string, page = 0, count = 10)`

## Libraries
1. [React](https://github.com/facebook/react)
2. [Axios](https://github.com/axios/axios)
3. [material-ui](https://github.com/mui-org/material-ui)
4. [react-router](https://www.npmjs.com/package/react-router)
5. [universal-cookie](https://www.npmjs.com/package/universal-cookie)
6. [qs](https://www.npmjs.com/package/qs)

## API Review

In short, **it's bad**.

1. The documentation is inadequate--it doesn't show the exception scenarios.
2. In `byname` and `byid` endpoints, the error code is inconsistent. It changes every time a new request is made.
3. The `byname` and `byid` endpoints have pagination, but they don't tell how much the total number of records is, making it impossible to calculate the number of pages it needs.
4. The `Auth-Token` is identical for the same user in the same UNIX second. It's probably a *digest* of a combination of the username/user ID, current UNIX timestamp in seconds, and probably a salt.

## Author
Muhammad Aditya Hilmy, NIM 18217025
