import { ServicesModels } from "../models/serviceModels.js";

export const ServicesControllers = {
    async createService(req, res){
        try {
            const { serviceName, serviceBasePrice, serviceColabPercent, serviceRepassPercent, serviceFrequency, genre } = req.body;
            
            const serviceData = {
                name: serviceName,
                base_price: Number(serviceBasePrice),
                colaborator_percent: Number(serviceColabPercent),
                colaborator_value: Number((serviceBasePrice*(1 - serviceColabPercent/100)).toFixed(2)),
                repass_percent: Number(serviceRepassPercent),
                repass_value: Number((serviceBasePrice * (1 - serviceColabPercent/100) * (serviceColabPercent/100)).toFixed(2)),
                profit: Number((serviceBasePrice * (1 - serviceColabPercent/100) * (1 - serviceColabPercent/100)).toFixed(2)),
                genre: genre.toLowerCase() || 'masculino',
            };

            const verifyFrequencies = serviceFrequency.split(";").filter(item => item).map((item, i) => ({ value: Number(item.trim()[0]) || Number(i+1), frequency: item }));

            if(verifyFrequencies.length < 1) throw { status: 400, message: "Nenhuma frequência encontrada" };

            const createdService = await ServicesModels.createService(serviceData);

            const frequenciesArr = verifyFrequencies.map(item => ({ ...item, service_id: createdService.id }))

            await ServicesModels.createFrequencies(frequenciesArr);

            const newService = await ServicesModels.getServiceById(createdService.id);

            return res.send({ service: newService });

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },

    async getServices(req, res){
        try {
            const { page, limit, search } = req.query;

            const servicesList = await ServicesModels.getServices((page > 0 ? page : 1), (limit == -1 ? 100000 : (limit || 10)), search);

            const servicesCount = await ServicesModels.getServicesCount();

            return res.send({ services: servicesList, count: servicesCount, pages: Math.ceil(servicesCount/(Number(limit || 10))) });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },

    async deleteService(req,res){
        try {
            const { serviceId } = req.params;
            const service = await ServicesModels.getServiceById(Number(serviceId));

            if(!service) return res.status(404).send({ message: "Serviço não encontrado" });

            await ServicesModels.deleteServiceById(Number(serviceId));

            return res.sendStatus(200);
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },

    async updateService(req, res){
        try {
            const { serviceName, serviceBasePrice, serviceColabPercent, serviceRepassPercent } = req.body;

            const service = await ServicesModels.getServiceById(Number(req.params.serviceId));
            
            const serviceData = {
                ...service,
                name: serviceName,
                base_price: Number(serviceBasePrice),
                colaborator_percent: Number(serviceColabPercent),
                repass_percent: Number(serviceRepassPercent),

                colaborator_value: Number((serviceBasePrice*(1 - serviceColabPercent/100)).toFixed(2)),
                repass_value: Number((serviceBasePrice * (1 - serviceColabPercent/100) * (serviceColabPercent/100)).toFixed(2)),
                profit: Number((serviceBasePrice * (1 - serviceColabPercent/100) * (1 - serviceColabPercent/100)).toFixed(2)),
            };

            const updatedService = await ServicesModels.updateService(Number(req.params.serviceId), serviceData);

            return res.status(200).send(updatedService);

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    }

}


/*

export const LoginControllers = {
    async login(req, res){
        try {
            return res.send({ token: "token" });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    }
}

*/