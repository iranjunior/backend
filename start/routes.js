"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");


//Rotas de Login e Logout
Route.group(() => {
  Route.post('/login', 'AuthController.login').middleware(['guest'])
  Route.post('/logout', 'AuthController.logout').middleware(['auth'])
})
Route.group(() => {
  Route.get('/token/:id', 'TokenController.show').middleware(['guest'])
})

// Rota para Autenticação


Route.group(() => {
  Route.post("/login", "AuthController.login").middleware(['guest']);
  Route.get('/logout', 'AuthController.logout').middleware(['auth'])
})

// Rota Teste para acesso após login


Route.get("/", () => {
  return { welcome: "Olá mundo" };
}).middleware(["guest"]);


// Rotas para CRUD de hospitals com middleware de autenticação

Route.group(() => {
  Route.resource("hospitals", "HospitalController").apiOnly();
})

// Rotas para CRUD de Usuarios com middleware de autenticação

Route.group(() => {
  Route.resource('users', 'UserController')
    .middleware(new Map([
      [['update', 'index', 'show', 'destroy'], ['auth']]
    ]))
    .apiOnly()
})

Route.group(() => { Route.resource('speciality', 'SpecialtyController').apiOnly() }).middleware(['auth'])

Route.group(() => { Route.resource('vacancy', 'VacancyController').apiOnly().except(['update']) })



