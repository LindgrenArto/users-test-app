import { Address } from "./address";


export class User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: string;
    address: Address;

    constructor(
        id: number,
        name: string,
        email: string,
        phone: string,
        website: string,
        company: string,
        address: Address
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.company = company;
        this.address = address;
    }
}
