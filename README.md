# Conquest App Demo

![Code Size](https://img.shields.io/github/languages/code-size/Qiming-Liu/ConquestApp)
![Stars](https://img.shields.io/github/commit-activity/y/Qiming-Liu/ConquestApp)

## Project Architecture

<table align="center" border=0>
   <tr>
      <td width="500"><b>User interfaces</b></td>
      <td width="500"><b>Framework</b></td>
   </tr>
   <tr>
      <td>
         • React.js<br>
         • MUI<br>
         • Jest<br>
         • Yup, Formik
      </td>
      <td>
         • Cordova<br>
         • Android<br>
      </td>
   </tr>
</table>

## CI/CD Pipeline
Github Actions

## Environment Variables
Add 2 lines to `react/.env`
```
REACT_APP_CONQUEST_ACCESS_TOKEN=<ACCESS_TOKEN>
REACT_APP_CONQUEST_SERVER_URL=<BACKEND_URL>
```

## How to run
```
$ npm install -g cordova
$ yarn prepare
$ yarn test
$ yarn start
```