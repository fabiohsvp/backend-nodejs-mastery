import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";

import Customer from "../models/Customer";
import Contact from "../models/Contact";

class ContactsController {
    //Listagem dos Contacts
    async index(req, res) {
        const {
            name,
            email,
            status,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        let where = { customer_id: req.params.customerId };
        let order = [];

        if (name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: name,
                },
            };
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email,
                },
            };
        }

        if (status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status
                        .split(",")
                        .map((item) => item.toUpperCase()),
                },
            };
        }

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdBefore),
                },
            };
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdAfter),
                },
            };
        }

        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore),
                },
            };
        }

        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter),
                },
            };
        }

        console.log("where", where);

        if (sort) {
            order = sort.split(",").map((item) => item.split(":"));
        }

        const data = await Contact.findAll({
            where,
            include: [
                {
                    model: Customer,
                    attributes: ["id", "status"],
                    required: true,
                },
            ],
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.json(data);
    }

    // Recupera um Contact
    async show(req, res) {
        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id,
            },
            attributes: { exclude: ["customer_id", "customerId"] },
        });

        if (!contact) {
            return res.status(404).json({ error: "Contact not found" }); // updated error message
        }

        return res.json(contact);
    }

    // Cria um Contact
    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const customer = await Customer.findByPk(req.params.customerId);

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        const contact = await Contact.create({
            ...req.body,
            customer_id: req.params.customerId,
        });

        return res.status(201).json(contact);
    }

    // Atualiza um Contact
    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().uppercase(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id,
            },
            attributes: { exclude: ["customer_id", "customerId"] },
        });

        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        await contact.update(req.body);

        return res.json(contact);
    }

    // Exclui um Contact
    async destroy(req, res) {
        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id,
            },
        });

        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        await contact.destroy();

        return res.json();
    }
}

export default new ContactsController();
