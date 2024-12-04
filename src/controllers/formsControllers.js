import { v4 as uuidv4 } from 'uuid';
import { FormsModels } from '../models/formsModels.js';
import axios from 'axios';

export const FormsControllers = {
    async createForm(req, res){
        try {
            const { formName, servicesList } = req.body;
            

            if(servicesList.length < 1) throw { status: 400, message: "Nenhum serviço selecionado" };

            const formIdentify = uuidv4();

            const createdForm = await FormsModels.createForm(formName, formIdentify);

            await FormsModels.createRelationFormServices(servicesList.map(service => ({service_id: service, form_id: createdForm.id})));

            return res.send({form: createdForm});

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },

    async getForms(req, res){
        try {
            const { page, limit, search } = req.query;

            const formsList = await FormsModels.getForms((page > 0 ? page : 1), (limit == -1 ? 100000 : (limit || 10)), search);

            const formsCount = await FormsModels.getFormsCount();

            return res.send({ forms: formsList, count: formsCount });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },

    async deleteForm(req, res){
        try {
            //console.log("CHEGOU AQUI VEY", res.params);
            const {formId} = req.params;

            const form = await FormsModels.getFormById(formId);

            if(!form) return res.status(404).send("Formulário não encontrado");

            await FormsModels.deleteFormById(formId);
            //console.log("FINALIZOU");
            return res.status(200).send(form);
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },

    async getFormServicesByUuid(req, res){
        try {
            const { identify } = req.params;

            const form = await FormsModels.getFormWithServicesByIdentify(identify);

            if(!form) return res.status(400).send("Formulário não encontrado.");

            return res.status(200).send(form);
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },

    async createColabPlan(req, res){
        try {
            const {identify} = req.params;

            const form = await FormsModels.getFormByIdentify(identify);
            if(!form) return res.status(404).send("Formulário informado não encontrado.");

            const adressResponse = await axios
                .get(`https://viacep.com.br/ws/${req.body.user.cep}/json/`)
                .then(response => response)
                .catch(error => console.log("deu ruim"));

            const userAdressObj = {
                cep: adressResponse?.data?.cep ?? "",
                street: adressResponse?.data?.logradouro ?? "",
                neighborhood: adressResponse?.data?.bairro ?? "",
                city: adressResponse?.data?.localidade ?? "",
                state: adressResponse?.data?.uf ?? "",
                number: "",
            };

            const address = await FormsModels.createUserAddress(userAdressObj);

            const selectedFrequencies = req.body.services.map(service => service.services).map(f => f.frequencies.find(r => r.selected));

            const userData = {
                name: req.body.user.name,
                cpf: req.body.user.cpf,
                genre: req.body.user.genre || "",
                email: req.body.user.email,
                tel: req.body.user.whatsapp,
                birthday: req.body.user.birthday,
                company_name: req.body.user.company,
                registered: false,
                form_id: form.id,
                address_id: address.id,
            };

            const colaborator = await FormsModels.createColaborator(userData);

            await FormsModels.vinculateColabServices(selectedFrequencies.map(fr => ({
                colaborator_id: colaborator.id,
                service_id: fr.service_id,
                frequency_id: fr.id,
            })));

            return res.status(201).send(colaborator);
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },

    async getColaborators(req, res){
        try {
            const { page, limit, search } = req.query;

            const colabs = await FormsModels.getColaborators((page > 0 ? page : 1), (limit == -1 ? 100000 : (limit || 10)), search);

            const colabCount = await FormsModels.getColaboratorsCount();

            return res.send({ colaborators: colabs, count: colabCount });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },

    async getNewColaborators(req, res){
        try {
            const { page, limit, search } = req.query;

            const newColabs = await FormsModels.getNewColaborators((page > 0 ? page : 1), (limit == -1 ? 100000 : (limit || 10)), search);

            const colabCount = await FormsModels.getColaboratorsCount();

            return res.send({ colaborators: newColabs, count: colabCount });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },

    async confirmedColaborator(req, res){
        try {
            const { id } = req.params;

            const colaborator = await FormsModels.getColaboratorById(Number(id));

            if(!colaborator) return res.status(404).send("Colaborador não encontrado.");

            await FormsModels.confirmColaboratorRegister(colaborator.id);

            return res.status(200).send(colaborator);
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },

    async deniedColaborator(req, res){
        try {
            const { id } = req.params;

            const colaborator = await FormsModels.getColaboratorById(Number(id));

            if(!colaborator) return res.status(404).send("Colaborador não encontrado.");

            await FormsModels.deniedColaboratorRegister(colaborator.id);

            return res.status(200).send(colaborator);
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },

    async deleteColaborators(req, res){
        try {
            const { id } = req.params;

            await FormsModels.deleteColaborator(Number(id));

            return res.status(200).send({ message: "Colaborador deletado com sucesso." });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).send(error.message || "Erro durante a requisição.");
        }
    },
    
}