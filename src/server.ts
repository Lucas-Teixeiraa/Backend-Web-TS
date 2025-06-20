import fastify, {FastifyInstance} from "fastify";
import { userRoutes } from "./routes/user.routes";
import { contactsRoutes } from "./routes/contact.routes";

const server: FastifyInstance = fastify({logger: true});

server.register(userRoutes,
  {
    prefix: '/users',
  }
);

server.register(contactsRoutes, 
  {
    prefix: '/contacts'
  }
);

server.listen({port: 3000, host: 'localhost'}, (err, address) => {
  if (err) {
    server.log.error(err);
  }
  server.log.info(`Server listening at ${address}`);
});