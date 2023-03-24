/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post("/login", "UsersController.login").prefix("api/v1")

Route.group(() =>{
  Route.post("/create", "UsersController.registrar");
  Route.get("/getUser","UsersController.listar");
  Route.get("getUser/:id","UsersController.buscarid");
  Route.put("/update/:id","UsersController.actualizar");
}).prefix("api/v1/user").middleware("auth").middleware("admin")

Route.group(()=>{
  Route.post("/create", "QuestionsController.registrar");
  Route.get("/getQuestions","QuestionsController.listar");
  Route.get("/getOptions/:id","QuestionsController.getOptions");
  Route.delete("/deleteQuestions/:id","QuestionsController.delete");
  Route.put("/updateQuestion/:id","QuestionsController.editar");
  Route.put("/updateAnswer/:id","QuestionsController.editarOpcion");
}).prefix("api/v1/questions").middleware("auth").middleware("admin")

Route.group(() => {
  Route.get("/getquestions","FormsController.list");
  Route.post("/postquestions","FormsController.register");
}).prefix("/api/v1/form").middleware("auth")

Route.group(()=>{
  Route.post("/create","RolesController.register");
  Route.get("/getRoles","RolesController.list");  
  Route.put("/update/:id","RolesController.update");
  Route.delete("/delete/:id","RolesController.delete");
}).prefix("/api/v1/roles").middleware("auth").middleware("admin")

Route.group(()=>{
  Route.post("/create","TypesDocumentsController.register");
  Route.get("/getTypeDocument","TypesDocumentsController.list");  
  Route.put("/update/:id","TypesDocumentsController.update");
  Route.delete("/delete/:id","TypesDocumentsController.delete");
}).prefix("/api/v1/typesdocument").middleware("auth").middleware("admin")
