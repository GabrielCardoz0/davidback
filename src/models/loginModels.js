import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const LoginModels = {
    async getAdminUser(){
        return prisma.users.findFirst({
            where: {
                name: "DAVID"
            }
        });
    }
}