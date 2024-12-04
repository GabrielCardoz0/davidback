import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const ServicesModels = {

    async createService({name, base_price, colaborator_percent, colaborator_value, profit, genre, repass_percent, repass_value, description}){
        return prisma.services.create({
            data: {
                name,
                base_price,
                colaborator_percent,
                colaborator_value,
                profit,
                genre,
                repass_percent,
                repass_value,
                description,
            }
        });
    },

    async createFrequencies(frequencies){
        return prisma.frequencies.createMany({
            data: frequencies
        });
    },

    async getServiceById(service_id){
        return prisma.services.findFirst({
            include: {
                frequencies: true,
            },
            where: {
                id: service_id
            },
        });
    },

    getServices(page, limit, search){
        return prisma.services.findMany({
            include: {
                frequencies: true,
            },

            orderBy: {
                id: 'desc',
            },

            where: {
                name: {
                    contains: search || ''
                }
            },

            take: Number(limit) || 10,
            skip: page ? ((Number(page)-1) * (limit || 10)) : 0

        })
    },

    getServicesCount(){
        return prisma.services.count();
    },

    async deleteServiceById(serviceId){
        await prisma.colaborator_services.deleteMany({
            where: {
                service_id: serviceId,
            }
        });

        await prisma.form_services.deleteMany({
            where: {
                service_id: serviceId,
            }
        });

        await prisma.frequencies.deleteMany({
            where: {
                service_id: serviceId,
            }
        });

        return prisma.services.delete({
            where: {
                id: serviceId
            }
        });
    },


    async updateService(serviceId, {name, base_price, colaborator_percent, colaborator_value, profit, genre, repass_percent, repass_value, description}){
        return prisma.services.update({
            where: {
                id: serviceId
            },
            data: {
                name,
                description,
                base_price,
                colaborator_percent,
                colaborator_value,
                profit,
                genre,
                repass_percent,
                repass_value,
            }
        });
    },

}