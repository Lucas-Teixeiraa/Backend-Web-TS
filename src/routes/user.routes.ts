import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usercases/usercase";
import { UserCreate } from "../interfaces/user.interface";


export async function userRoutes(fastify: FastifyInstance){
    const userCases = new UserUseCase();
    fastify.post<{Body: UserCreate}>(`/`, async (req, reply)=> {
        const{name, email} = req.body;
        try {
            const data = await userCases.createUser({
                name, 
                email
            });
            return reply.send(data);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    });

    fastify.get('/',(req, reply)=>{
        reply.send({ message: "User route is working!" });
    });
}