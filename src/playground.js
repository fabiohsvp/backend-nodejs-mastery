import "./database";

import Customer from "./app/models/Customer";

class Playground {
    static async play() {
        const customer = await Customer.create({
            name: "Empresa 1",
            email: "contato1@email.com",
        });

        console.log(JSON.stringify(customer, null, 2));
    }
}

Playground.play();
