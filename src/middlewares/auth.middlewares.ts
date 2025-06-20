import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
    const apiEmail = req.headers['email'];

    if(!apiEmail){
        reply.status(401).send({erro: "Unauthorized",
            message: "Email is required for authentication."
        })
    }
}