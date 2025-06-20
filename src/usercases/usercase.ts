import { UserInterface, UserCreate, UserRepository } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user-repository";
class UserUseCase{
    private UserRepository: UserRepository;
    constructor(){
        this.UserRepository = new UserRepositoryPrisma();
    }

    async createUser({name, email}:UserCreate) : Promise<UserInterface>{
        const existingUser = await this.UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const result = await this.UserRepository.createUser({name, email});
        return result;
    }
    
}

export { UserUseCase };