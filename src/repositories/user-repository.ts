import { prisma } from "../database/prisma-client";
import { UserCreate, UserInterface, UserRepository } from "../interfaces/user.interface";

class UserRepositoryPrisma implements UserRepository{
    async createUser(data: UserCreate): Promise<UserInterface> {
        const dataResult = await prisma.user.create({
            data: {
                name: data.name ,
                email: data.email,
            }
        });
        return dataResult;
    }

    async findByEmail(email: string): Promise<UserInterface | null> {
        const result = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        return result || null;
    }
}
export { UserRepositoryPrisma };