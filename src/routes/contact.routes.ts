import { FastifyInstance } from "fastify";
import { ContactUserCase } from "../usercases/contact.usercase";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { Contact, ContactCreate } from "../interfaces/contacts.interfaces";


export async function contactsRoutes(fastify: FastifyInstance){
    const contactUserCase = new ContactUserCase();
    fastify.addHook('preHandler', authMiddleware);
    fastify.post<{Body: ContactCreate}>(`/`, async (req, reply)=> {
        const {name, email, phone} = req.body;
        const emailUser = req.headers;
        try {
            const data = await contactUserCase.createContact({
                name,
                email,
                phone,
                userEmail: emailUser.email
            });
            return reply.send(data);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    });

    fastify.get(`/`, async (req, reply) => {
        const emailUser = req.headers['email'];
        try {
            const data = await contactUserCase.listAllContacts(emailUser);
            return reply.send(data);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    });

    fastify.put<{Body: Contact, Params: {id: string}}>('/:id', async (req, reply)=>{
        const { id } = req.params;
        const {name, email, phone} = req.body;

        try {
            const data = await contactUserCase.updateContact({
                id,
                name,
                email,
                phone,
            });
            return reply.status(201).send(data);
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    });

    fastify.delete<{Params: {id: string}}>('/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await contactUserCase.deleteContact(id);
            return reply.status(204).send({message: "Contact deleted successfully"});
        } catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    });
}