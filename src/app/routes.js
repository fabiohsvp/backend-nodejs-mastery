import { Router } from "express";

import auth from "./middlewares/auth";
import sessions from "./controllers/SessionsController";
import customers from "./controllers/CustomersController";
import contacts from "./controllers/ContactsController";
import users from "./controllers/UsersController";

const routes = new Router();

// Sessions
routes.post("/sessions", sessions.create);

// Controla o acesso as rotas abaixo, somente usuários autenticados
routes.use(auth);

// Customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

// Contacts
routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:id", contacts.show);
routes.post("/customers/:customerId/contacts", contacts.create);
routes.put("/customers/:customerId/contacts/:id", contacts.update);
routes.delete("/customers/:customerId/contacts/:id", contacts.destroy);

// Users
routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.post("/users", users.create);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

export default routes;
