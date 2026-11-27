import React from 'react';
import { listCompanies, getCompanyWithContacts, updateCompanyNotes } from '../services/companyService';
import type { Company, Contact } from '../types/crm';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';

function ShowContacts(props: { clist: Contact[] }) {
    return (
        <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-left text-sm shadow-sm">
            <thead className="bg-slate-100 text-slate-600">
                <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                </tr>
            </thead>
            <tbody>
                {props.clist.map((contact) => (
                    <tr key={contact.id} className="border-t border-slate-200">
                        <td className="px-4 py-3">{contact.name}</td>
                        <td className="px-4 py-3">{contact.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


export default function CompanyDetail() {
    const params = useParams();
    const id = Number(params.id);
    const [notes, setNotes] = React.useState('');
    const [saving, setSaving] = React.useState(false);
    const [showContacts, setShowContacts] = React.useState(false);
    const [companies, setCompanies] = React.useState<Company[]>([]);
    const [notFound, setNotFound] = React.useState(false);

    React.useEffect(() => {
        async function fetchCompanies() {
            let mock = await listCompanies();
            setCompanies(mock);
            setNotes(mock.find((c) => c.id === id)?.notes ?? '');
        }
        fetchCompanies();
    }, [id]);

    const [contacts, setContacts] = React.useState<Contact[]>([]);
        React.useEffect(() => {
            async function fetchContacts() {
                setNotFound(false); 
                try{
                    let mock = await getCompanyWithContacts(id);
                    setContacts(mock.contacts);
                }catch{
                    setNotFound(true);
                }
            }
            fetchContacts();
        }, [id]);
 
        const company = companies.find((c) => c.id === id);
 
    async function handleSaveNotes(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);
        try{
            const updated = await updateCompanyNotes(id, notes);
            setCompanies(companies.map(c => c.id === updated.id ? updated : c));
        }
        finally{
            setSaving(false);
        }
    }

    if (notFound) return <NotFound />;

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-semibold">{company?.name}</h1>
                <button
                    type="button"
                    onClick={() => setShowContacts(!showContacts)}
                    aria-expanded={showContacts}
                    className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                        {showContacts ? 'Hide contacts' : 'Show contacts'}
                </button>
            </header>
            {company && (
                <div className="space-y-1 rounded-lg bg-white p-4 shadow-sm">
                    <h2>{company.name}</h2>
                    <p className="text-slate-600">Sector: {company.sector}</p>
                    <p className="text-slate-600">Address: {company.address}</p>
                    <h2>Notes: </h2>

                </div>
            )}
            <form onSubmit={handleSaveNotes} className="flex flex-col gap-2">
                <label htmlFor="company-notes" className="font-medium">Notes</label>
                        <textarea
                            id="company-notes"
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Enter notes here..."
                            className="w-full rounded-md border border-slate-300 bg-white p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
                        />
                        <button
                            type="submit"
                            disabled={saving || notes === company?.notes}
                            className="cursor-pointer self-start rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save notes'}
                        </button>
                </form>
                    {showContacts && contacts.length > 0 && (
                <div className="space-y-2">
                    <h3>Contacts</h3>
                    <ShowContacts clist={contacts} />
                </div>
            )}
        </div>
    );
}