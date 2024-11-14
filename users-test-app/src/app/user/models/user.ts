import { Address } from "./address";
import { Company } from "./company";


export class User {
    id: number;
    name: string;
    userName: string;
    email: string;
    phone: string;
    website: string;
    company: Company;
    address: Address;

    constructor(
        id: number,
        name: string,
        userName: string,
        email: string,
        phone: string,
        website: string,
        company: Company,
        address: Address
    ) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.company = company;
        this.address = address;
    }
}
