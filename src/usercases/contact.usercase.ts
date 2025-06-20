import { Contact, ContactCreate } from "../interfaces/contacts.interfaces";
import { ContactsRepositoryPrisma } from "../repositories/contacts.repository";
import { UserRepositoryPrisma } from "../repositories/user-repository";

class ContactUserCase{
    private userRepository: UserRepositoryPrisma;
    private ContactRepository: ContactsRepositoryPrisma;
    constructor(){
        this.ContactRepository = new ContactsRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    async createContact({email, name, phone, userEmail}: ContactCreate){
        //busca usuario pelo email
        const user = await this.userRepository.findByEmail(userEmail);

        if(!user){
            throw new Error("User not found");
        }

        const verifyExistContact = await this.ContactRepository.findByEmailOrPhone(email,phone);
        if(verifyExistContact){
            throw new Error("Contact already exists");
        }

        const contact = await this.ContactRepository.createContact({
            name,
            email,
            phone,
            userId: user.id
        });

        return contact
    }

    async listAllContacts(userEmail: string) {
        const user = await this.userRepository.findByEmail(userEmail);

        if(!user){
            throw new Error("User not found");
        }

        const contacts = await this.ContactRepository.findAllContacts(user.id);

        return contacts;
    }

    async updateContact({id, name, email, phone} : Contact){
        const data = await this.ContactRepository.updateContact({
            id,
            name,
            email,
            phone
        });

        return data;
    }

    async deleteContact(id: string) {
        const data = await this.ContactRepository.deleteContact(id);

        if(!data){
            throw new Error("Contact not found");
        }

        return data;
    }
}

export { ContactUserCase };