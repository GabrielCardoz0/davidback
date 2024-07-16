import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const FormsModels = {

    async createForm(name, identify){
        return prisma.forms.create({
            data: {
                name,
                identify,
            }
        });
    },

    async createRelationFormServices(services){
        return prisma.form_services.createMany({
            data: services
        })
    },

    getForms(page, limit, search){
        return prisma.forms.findMany({
            include: {
                form_services: {
                    select: {
                        services: true,
                    }
                }
            },

            where: {
                name: {
                    contains: search ? search : ''
                },
                is_deleted: false
            },

            orderBy: {
                id: 'desc',
            },

            take: Number(limit) || 10,
            skip: page ? ((Number(page)-1) * (limit || 10)) : 0

        })
    },

    getFormsCount(){
        return prisma.forms.count({
            where: {
                is_deleted: false
            }
        });
    },

    async deleteFormById(id){
        //console.log("CHEGOU AQUI NO MODEL", id);
        return await prisma.forms.update({
            data: {
                is_deleted: true
            },
            where: {
                
            }
        });

        await prisma.form_services.deleteMany({
            where: {
                form_id: Number(id),
            }
        })

        return prisma.forms.delete({
            where: {
                id: Number(id)
            }
        })
    },

    getFormById(id){
        return prisma.forms.findFirst({
            where: {
                id: Number(id),
                is_deleted: false
            }
        })
    },


    getFormWithServicesByIdentify(identify){
        return prisma.forms.findFirst({
            include: {
                form_services: {
                    include: {
                        services: {
                            include: {
                                frequencies: true
                            }
                        }
                    }
                }
            },
            where: {
                identify,
                is_deleted: false
            }
        });
    },

    getFormByIdentify(identify){
        return prisma.forms.findFirst({
            where: {
                identify: identify,
                is_deleted: false
            }
        })
    },

    createUserAddress(address){
        return prisma.addresses.create({
            data: address
        });
    },

    createColaborator(colab){

        return prisma.colaborators.create({
            data: colab
        })
    },

    vinculateColabServices(colabServices){
        return prisma.colaborator_services.createMany({
            data: colabServices
        });
    },

    getColaborators(page, limit, search){
        return prisma.colaborators.findMany({
            include: {
                addresses: true,
                colaborator_services: {
                    include: {
                        frequencies: {
                            include: {
                                services: true,
                            }
                        },
                    }
                }
            },

            orderBy: {
                id: 'desc',
            },

            where: {
                registered: true,
                name: {
                    contains: search || '',
                }
            },

            take: Number(limit) || 10,
            skip: page ? ((Number(page)-1) * (limit || 10)) : 0

        })
    },

    getColaboratorsCount(){
        return prisma.colaborators.count({
            where: {
                registered: true
            }
        });
    },

    getNewColaborators(page, limit, search){
        return prisma.colaborators.findMany({
            include: {
                addresses: true,
                forms: true,
                colaborator_services: {
                    include: {
                        frequencies: {
                            include: {
                                services: true,
                            }
                        },
                    }
                }
            },

            where: {
                registered: false,
                name: {
                    contains: search || ''
                }
            },

            orderBy: {
                id: 'desc',
            },

        })
    },

    getNewColaboratorsCount(){
        return prisma.colaborators.count({
            where: {
                registered: false
            }
        });
    },

    getColaboratorById(id){
        return prisma.colaborators.findFirst({
            where: {
                id: Number(id)
            }
        })
    },

    confirmColaboratorRegister(id){
        return prisma.colaborators.update({
            where: {
                id: Number(id)
            },
            data: {
                registered: true
            }
        })
    },

    async deniedColaboratorRegister(id){
        await prisma.colaborator_services.deleteMany({
            where: {
                colaborator_id: Number(id)
            }
        });

        return prisma.colaborators.delete({
            where: {
                id: Number(id)
            }
        })
    },

    async deleteColaborator(id){
        await prisma.colaborator_services.deleteMany({
            where: {
                colaborator_id: Number(id)
            }
        });

        return prisma.colaborators.delete({
            where: {
                id: Number(id)
            }
        });
    },

}