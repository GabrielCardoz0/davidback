import { Router } from "express";
import { PrismaClient } from '@prisma/client';
import Joi from "joi";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";


const prisma = new PrismaClient();


const apiChatbotRouter = Router();


const createPartnerSchema = Joi.object({
  name: Joi.string().required(),
  cep: Joi.string().required(),
  logradouro: Joi.string().required(),
  complemento: Joi.string().required(),
  bairro: Joi.string().required(),
  localidade: Joi.string().required(),
  uf: Joi.string().required(),
  estado: Joi.string().required(),
  regiao: Joi.string().required(),
  phone: Joi.string().required(),
  number: Joi.string().required(),
  payment_links: Joi.array().items(Joi.object({
    link: Joi.string().required(),
  })).optional(),
});


const updatePartnerSchema = Joi.object({
  name: Joi.string().optional(),
  cep: Joi.string().optional(),
  logradouro: Joi.string().optional(),
  complemento: Joi.string().optional(),
  bairro: Joi.string().optional(),
  localidade: Joi.string().optional(),
  uf: Joi.string().optional(),
  estado: Joi.string().optional(),
  regiao: Joi.string().optional(),
  phone: Joi.string().optional(),
  number: Joi.string().optional(),
  payment_links: Joi.array().items(Joi.object({
    link: Joi.string().required(),
  })).optional(),
});


const createServiceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  partner_id: Joi.number().required(),
});

const updateServiceSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  partner_id: Joi.number().optional(),
});

const createCheckinSchema = Joi.object({
  //service_id: Joi.number().required(),
  //date: Joi.date().iso().required(),
  colab_number: Joi.string().required(),
  service: Joi.string().required(),
});

const updateStatusCheckinSchema = Joi.object({
  checkin_hash: Joi.string().required(),
  phone: Joi.string().required(),
});


const utils = {
  handleErrors: async (res, error) => {
    console.error(error);
    
    return res.status(error.status ?? 500).json(error.message ?? { message: 'Internal server error' });
  },

  validate: (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, {
        abortEarly: false,
      });

      if (!error) {
        next();
      } else {
        res.status(400).send(error.details.map((d) => d.message));
      }
    };
  },

  validateBody: function (schema) {
    return utils.validate(schema, "body");
  },

  validateParams: function (schema) {
    return utils.validate(schema, "params");
  },

  getCurrentDate: () => {
    const currentDate = new Date();
    return currentDate;
  }
};


const middlewares = {

};


const controllers = {
  createPartner: async (req, res) => {
    try {
      const result = await services.createPartner(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },
  
  getPartners: async (req, res) => {
    try {
      const result = await services.getPartners(req.query.search);
      return res.send(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },

  updatePartner: async (req, res) => {
    try {
      console.log("chegou aqui");
      
      const result = await services.updatePartner(Number(req.params.id), req.body);
      return res.json(result);
    } catch (error) {
      console.log(error);
      
      return utils.handleErrors(res, error);
    }
  },

  deletePartner: async (req, res) => {
    try {
      const result = await services.deletePartner(Number(req.params.id));
      return res.json(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },

  getPartnerById: async (req, res) => {
    try {
      const result = await services.getPartnerByIdOrFail(Number(req.params.id));
      return res.json(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },

  createService: async (req, res) => {
    try {
      const result = await services.createService(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },

  getServices: async (req, res) => {
    try {
      const result = await services.getServices();
      return res.json(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },

  updateService: async (req, res) => {
    try {
      const result = await services.updateService(Number(req.params.id), req.body);
      return res.json(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },

  deleteService: async (req, res) => {
    try {
      const result = await services.deleteService(Number(req.params.id));
      return res.json(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },

  getCheckins: async (req, res) => {
    try {
      const result = await services.getCkeckins(req.query);
      return res.json(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },

  publicGetPartners: async (req, res) => {
    try {
      const result = await services.publicGetPartners(req.query.search);
      return res.send(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },

  publicCreateCheckin: async (req, res) => {
    try {
      const result = await services.publicCreateCheckin(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },

  publicStartCheckin: async (req, res) => {
    try {
      const result = await services.publicStartCheckin(req.body);
      return res.json(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },

  publicEndCheckin: async (req, res) => {
    try {
      const result = await services.publicEndCheckin(req.body);
      return res.json(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },

  publicCancelCheckin: async (req, res) => {
    try {
      const result = await services.publicCancelCheckin(req.body);
      return res.json(result);
    } catch (error) {
      return utils.handleErrors(res, error);
    }
  },
};


const services = {

  getPartnerByIdOrFail: async (id) => {
    const partner = await models.getPartnerById(id);

    if (!partner) throw { status: 404, message: 'Parceiro não encontrado' };

    return partner;
  },

  getServiceByIdOrFail: async (id) => {
    const service = await models.getServiceById(id);

    if (!service) throw { status: 404, message: 'Serviço não encontrado' };

    return service;
  },

  createPartner: async (data) => {
    const { name, cep, logradouro, complemento, bairro, localidade, uf, estado, regiao, phone, number } = data;

    const createdPartner = await models.createPartner({ name, cep, logradouro, complemento, bairro, localidade, uf, estado, regiao, phone, number });

    if(data?.payment_links && data.payment_links.length > 0) {
      await models.createManyPaymentLink(data.payment_links.map(link => ({ link: link.link, partner_id: createdPartner.id })));
    }

    return { data: { ...createdPartner, payment_links: data.payment_links } };
  },

  getPartners: async (search) => {
    const partners = await models.getPartners(search ?? "");

    return { data: partners };
  },

  updatePartner: async (id, data) => {
    await services.getPartnerByIdOrFail(id);

    const updatedPartner = await models.updatePartner(id, data);

    if(data?.payment_links && data.payment_links.length > 0) {
      await models.deleteManyPaymentLinkByPartnerId(updatedPartner.id);

      await models.createManyPaymentLink(data.payment_links.map(link => ({ link: link.link, partner_id: updatedPartner.id })));
    }

    return { data: updatedPartner };
  },

  deletePartner: async (id) => {
    await services.getPartnerByIdOrFail(id);

    await models.deletePartner(id);

    return { data: { message: "Parceiro deletado com sucesso!" } };
  },

  createService: async (data) => {
    const { name, description, price, partner_id } = data;

    await services.getPartnerByIdOrFail(partner_id);

    const createdService = await models.createService({ name, description, price, partner_id });

    return { data: createdService };
  },

  getServices: async () => {
    const services = await models.getServices();

    return { data: services };
  },

  updateService: async (id, data) => {
    await services.getServiceByIdOrFail(id);

    const updatedService = await models.updateService(id, data);

    return { data: updatedService };
  },

  deleteService: async (id) => {
    await services.getServiceByIdOrFail(id);

    await models.deleteService(id);

    return { data: { message: "Serviço deletado com sucesso!" } };
  },

  getCkeckins: async ({ page: page_query, limit: limit_query, search }) => {
    const limit = Number(limit_query ?? 10);
    const page = Number(page_query ?? 1);
    const offset = (page - 1) * limit;
    
    const checkins = await models.getCheckins({ limit, offset, search });
    const countCheckins = await prisma.check_ins.count();

    return { data: checkins, count: countCheckins };
  },

  publicGetPartners: async (search) => {
    const partners = await models.getPartners(search ?? "");

    return { data: partners };
  },

  publicCreateCheckin: async ({ colab_number, service }) => {
    //const service = await services.getServiceByIdOrFail(service_id);
    
    //await services.getPartnerByIdOrFail(service.partner_id);

    const serviceHash = `TAG${uuidv4().slice(0, 6).toUpperCase()}C`;

    //const formated_date = new Date(reserved_date);

    const checkin = await models.createCheckin({ colab_number, hash: serviceHash, status: 'pendente', service });

    return { data: checkin };
  },

  publicStartCheckin: async ({ checkin_hash, phone }) => {
    const checkin = await services.getCheckinByHashOrFail(checkin_hash);
    
    await services.verifyPhoneIsAllowedToUpdateCheckinOrFail(checkin, phone);

    const updatedCheckin = await models.updateCheckin(checkin.id, { status: 'iniciado', start_at:  utils.getCurrentDate() });

    return { data: updatedCheckin };
  },

  publicEndCheckin: async ({ checkin_hash, phone }) => {
    const checkin = await services.getCheckinByHashOrFail(checkin_hash);

    await services.verifyPhoneIsAllowedToUpdateCheckinOrFail(checkin, phone);

    //if(checkin.status !== 'iniciado' && checkin.status !== 'cancelado') throw { status: 400, message: 'Checkin não está em andamento' };
    if(checkin.status !== 'iniciado' && checkin.status !== 'cancelado') return { data: checkin };

    const updatedCheckin = await models.updateCheckin(checkin.id, { status: 'finalizado', end_at:  utils.getCurrentDate() });

    return { data: updatedCheckin };
  },

  publicCancelCheckin: async ({ checkin_hash, phone }) => {
    const checkin = await services.getCheckinByHashOrFail(checkin_hash);

    await services.verifyPhoneIsAllowedToUpdateCheckinOrFail(checkin, phone);

    const updatedCheckin = await models.updateCheckin(checkin.id, { status: 'cancelado' });

    return { data: updatedCheckin };
  },

  getCheckinByIdOrFail: async (id) => {
    const checkin = await models.getCheckinById(id);

    if (!checkin) throw { status: 404, message: 'Checkin não encontrado' };

    return checkin;
  },

  getCheckinByHashOrFail: async (checkin_hash) => {
    const checkin = await models.getCheckinByHash(checkin_hash);

    if (!checkin) throw { status: 404, message: 'Checkin não encontrado' };

    return checkin;
  },

  verifyPhoneIsAllowedToUpdateCheckinOrFail: async (checkin, phone) => {
    if(checkin.colab_number === phone) throw { status: 403, message: 'Você não tem permissão para atualizar este checkin' };

    return checkin;
  },

};


const models = {
  createPartner: async (data) => {
    return await prisma.partners.create({
      data
    })
  },

  getPartners: async (search) => {
    return await prisma.partners.findMany({
      include: {
        payment_links: true,
      },
      where: {
        OR: [
          { bairro: { contains: search, mode: 'insensitive' } },
          { localidade: { contains: search, mode: 'insensitive' } },
          { uf: { contains: search, mode: 'insensitive' } },
          { estado: { contains: search, mode: 'insensitive' } },
        ]
      }
    });
  },

  getPartnerById: async (id) => {
    return await prisma.partners.findFirst({
      include: {
        payment_links: true,
        _count: {
          select: {
            payment_links: true,
          }
        }
      },
      where: {
        id
      }
    });
  },

  updatePartner: async (id, { bairro, cep, complemento, estado, localidade, logradouro, name, number, phone, regiao, uf }) => {
    return await prisma.partners.update({
      include: {
        payment_links: true,
      },
      where: {
        id
      },
      data: {
        bairro,
        cep,
        complemento,
        estado,
        localidade,
        logradouro,
        name,
        number,
        phone,
        regiao,
        uf,
        updated_at: utils.getCurrentDate(),
      }
    });
  },

  deletePartner: async (id) => {
    return await prisma.partners.delete({
      where: {
        id
      }
    });
  },

  createService: async (data) => {
    return await prisma.partners_services.create({
      data
    });
  },

  getServices: async () => {
    return await prisma.partners_services.findMany();
  },

  getServiceById: async (id) => {
    return await prisma.partners_services.findFirst({
      include: {
        partners: true,
        check_ins: true,
        _count: {
          select: {
            check_ins: true
          }
        }
      },
      where: {
        id
      }
    });
  },

  updateService: async (id, data) => {
    return await prisma.partners_services.update({
      where: {
        id
      },
      data: {
        ...data,
        updated_at: utils.getCurrentDate(),
      }
    });
  },

  deleteService: async (id) => {
    return await prisma.partners_services.delete({
      where: {
        id
      }
    });
  },

  createPaymentLink: async (data) => {
    return await prisma.payment_links.create({
      data: {
        link: data.link,
        partner_id: data.partner_id,
      }
    });
  },

  createManyPaymentLink: async (data) => {
    return await prisma.payment_links.createMany({
      data
    });
  },

  deleteManyPaymentLinkByPartnerId: async (partner_id) => {
    return await prisma.payment_links.deleteMany({
      where: {
        partner_id
      }
    });
  },

  getPaymentLinks: async () => {
    return await prisma.payment_links.findMany();
  },

  getPaymentLinkById: async (id) => {
    return await prisma.payment_links.findFirst({
      where: {
        id
      }
    });
  },

  updatePaymentLink: async (id, data) => {
    return await prisma.payment_links.update({
      where: {
        id
      },
      data: {
        ...data,
        updated_at: utils.getCurrentDate(),
      }
    });
  },

  deletePaymentLink: async (id) => {
    return await prisma.payment_links.delete({
      where: {
        id
      }
    });
  },

  createCheckin: async (data) => {
    return await prisma.check_ins.create({
      data
    });
  },

  updateCheckin: async (id, data) => {
    return await prisma.check_ins.update({
      where: {
        id
      },
      data: {
        ...data,
        updated_at: utils.getCurrentDate(),
      }
    });
  },

  getCheckinById: async (id) => {
    return await prisma.check_ins.findFirst({
      where: {
        id
      }
    });
  },

  getCheckinByHash: async (hash) => {
    return await prisma.check_ins.findFirst({
      where: {
        hash: hash
      }
    });
  },
  
  getCheckins: async ({ limit, offset, search }) => {
    return await prisma.check_ins.findMany({
      take: limit,
      skip: offset,
      where: {
        hash: {
          contains: search,
          mode: 'insensitive'
        }
      },
      orderBy: {
        id: 'desc',
      }
    });
  },
};


apiChatbotRouter
  .post('/partners', utils.validateBody(createPartnerSchema), controllers.createPartner)
  .get('/partners', controllers.getPartners)
  .put('/partners/:id', utils.validateBody(updatePartnerSchema), controllers.updatePartner)
  .delete('/partners/:id', controllers.deletePartner)
  .get('/partners/:id', controllers.getPartnerById)

  .post('/services', utils.validateBody(createServiceSchema), controllers.createService)
  .get('/services', controllers.getServices)
  .put('/services/:id', utils.validateBody(updateServiceSchema), controllers.updateService)
  .delete('/services/:id', controllers.deleteService)

  .get('/checkins', controllers.getCheckins)

  .post('/public/checkins', utils.validateBody(createCheckinSchema), controllers.publicCreateCheckin)
  .put('/public/checkins/start', utils.validateBody(updateStatusCheckinSchema), controllers.publicStartCheckin)
  .put('/public/checkins/end', utils.validateBody(updateStatusCheckinSchema), controllers.publicEndCheckin)
  .put('/public/checkins/cancel', utils.validateBody(updateStatusCheckinSchema), controllers.publicCancelCheckin)
  .get('/public/partners', controllers.publicGetPartners)

  .get('/health', (req, res) => res.send("OK!"));
  
export default apiChatbotRouter;

