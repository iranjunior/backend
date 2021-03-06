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


//Rotas de Login, Logout e Checagem de autenticação
Route.group(() => {
  Route.get('/auth', 'AuthController.check').middleware(['auth'])
  Route.post('/login', 'AuthController.login').middleware(['guest'])
  Route.post('/logout', 'AuthController.logout').middleware(['auth'])
})
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
  Route.get('user', 'UserController.check').middleware(['auth'])
})

Route.group(() => { Route.resource('speciality', 'SpecialtyController').apiOnly() }).middleware(['auth'])

Route.group(() => { Route.resource('vacancy', 'VacancyController').apiOnly().except(['update']) })



