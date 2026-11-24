import companiesData from '../mocks/companies.json'
import contactsData from '../mocks/contacts.json'
import type { Company, CompanyWithContacts, Contact } from '../types/crm'
import { delay } from './delay'

// Typed constants: the compiler checks every mock item against the types.
const companies: Company[] = companiesData
const contacts: Contact[] = contactsData

const MOCK_LATENCY_MS = 400

// Future: GET /companies
export async function listCompanies(): Promise<Company[]> {
    await delay(MOCK_LATENCY_MS)
    // Returns a copy so callers can't mutate the mock "database".
    return [...companies]
}

// Future: GET /companies/:id (company JOIN contacts)
export async function getCompanyWithContacts(id: number): Promise<CompanyWithContacts> {
    await delay(MOCK_LATENCY_MS)

    const company = companies.find((c) => c.id === id)
    if (!company) {
        // The real API will answer 404; the mock fails the same way.
        throw new Error(`Company ${id} not found`)
    }

    const companyContacts = contacts.filter((contact) => contact.company_id === id)

    return { ...company, contacts: companyContacts }
}

export async function listContacts(): Promise<Contact[]> {
    await delay(MOCK_LATENCY_MS)
    // Returns a copy so callers can't mutate the mock "database".
    return [...contacts]
}

export async function updateCompanyNotes(id: number, notes: string): Promise<Company> {
    await delay(MOCK_LATENCY_MS)

    const companyIndex = companies.findIndex((c) => c.id === id)
    if (companyIndex === -1) {
        // The real API will answer 404; the mock fails the same way.
        throw new Error(`Company ${id} not found`)
    }

    companies[companyIndex].notes = notes
    return {...companies[companyIndex]}
}
