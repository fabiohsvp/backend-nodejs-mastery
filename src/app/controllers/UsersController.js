import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";

import User from "../models/User";

class UsersController {
    //Listagem dos Users
    async index(req, res) {
        const {
            name,
            email,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        let where = {};
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

        const data = await User.findAll({
            attributes: { exclude: ["password", "password_hash"] },
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        console.log({ userId: req.userId });

        console.log(User.findByPk(req.userId));

        return res.json(data);
    }

    // Exibição de um User
    async show(req, res) {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { id, name, email, createdAt, updatedAt } = user;

        return res.json({ id, name, email, createdAt, updatedAt });
    }

    // Criação de um User
    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            passwordConfirmation: Yup.string().when(
                "password",
                (password, field) =>
                    password
                        ? field.required().oneOf([Yup.ref("password")])
                        : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const { id, name, email, createdAt, updatedAt } = await User.create(
            req.body
        );
        return res.status(201).json({ id, name, email, createdAt, updatedAt });
    }

    // Atualização de um User
    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(8),
            password: Yup.string()
                .min(8)
                .when("oldPassword", (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            passwordConfirmation: Yup.string().when(
                "password",
                (password, field) =>
                    password
                        ? field.required().oneOf([Yup.ref("password")])
                        : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { oldPassword } = req.body;

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: "Password does not match" });
        }

        const { id, name, email, createdAt, updatedAt } = await user.update(
            req.body
        );
        return res.status(200).json({ id, name, email, createdAt, updatedAt });
    }

    async destroy(req, res) {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.destroy();
        return res.status(204).send();
    }
}

export default new UsersController();
