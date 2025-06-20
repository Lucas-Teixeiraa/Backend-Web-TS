import { prisma } from "../database/prisma-client";
import { ContactCreateData, ContactRepository, Contact } from "../interfaces/contacts.interfaces";

class ContactsRepositoryPrisma implements ContactRepository {
    async createContact(data: ContactCreateData): Promise<Contact> {
        const result = await prisma.contact.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                userId: data.userId
            },
        });
        return result;
    }
    async findByEmailOrPhone(email: string, phone:string): Promise<Contact | null> {
        const result = await prisma.contact.findFirst({
            where: {
                OR: [
                    {email: email},
                    {phone: phone}
                ],
            },
        });
        return result;
    }

    async findAllContacts(userId: string): Promise<Contact[]> {
        const result = await prisma.contact.findMany({
            where: {
                userId: userId,
            },
        });
        return result;
    }

    async updateContact({ id, name, email, phone }: Contact): Promise<Contact> {
        const result = await prisma.contact.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email,
                phone: phone
            }
        });
        return result;
    }

    async deleteContact(id: string): Promise<Boolean> {
        const result = await prisma.contact.delete({
            where: {
                id: id
            }
        });
        return result ? true : false; 
    }
}

export { ContactsRepositoryPrisma };