export type Company = {
    id: number;
    name: string;
    sector: string;
    address: string;
    notes: string;
}

export type Contact = {
    id: number;
    name: string;
    email: string;
    phone: string;
    company_id: number;
}

export type CompanyWithContacts = Company & { contacts: Contact[] }