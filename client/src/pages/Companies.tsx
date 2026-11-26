import {listCompanies} from '../services/companyService';
import type { Company } from '../types/crm';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createCompany } from '../services/companyService';


function NewCompany(props: {setShowform: React.Dispatch<React.SetStateAction<boolean>>, onCreated: (company: Company) => void}){
    const [Loading, setLoading] = useState(false)


    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget)
        const name = data.get('name')
        const sector = data.get('sector')
        if (typeof(name)==='string' && typeof(sector)==='string'){
            const created = await createCompany(name, sector);
            props.setShowform(false);
            props.onCreated(created)
        }
        setLoading(false)
    }   
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-bold">New Company</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700">Name</label>
                        <input type="text" className="mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" name='name'/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700">Sector</label>
                        <input type="text" className="mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"  name='sector'/>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" className="rounded bg-slate-600 px-4 py-2 text-white hover:bg-slate-700" onClick={() => props.setShowform(false)}>
                            Cancel
                        </button>
                        <button disabled={Loading} type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                            {Loading ? 'Loading...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}





function ShowCompany(props: { clist: Company[] }) {
    return (
        <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-left text-sm shadow-sm">
            <thead className="bg-slate-100 text-slate-600">
                <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Sector</th>
                </tr>
            </thead>
            <tbody>
                {props.clist.map((company) => (
                    <tr key={company.id} className="border-t border-slate-200 hover:bg-slate-50">
                        <td className="px-4 py-3"><Link to={`/companies/${company.id}`} className="font-medium text-blue-600 hover:underline">{company.name}</Link></td>
                        <td className="px-4 py-3">{company.sector}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}




export default function Companies() {
    const [showForm, setShowform] = React.useState(false);
    const [companies, setCompanies] = React.useState<Company[]>([]);
    React.useEffect(() => {
        async function fetchCompanies() {
            let mock = await listCompanies();
            setCompanies(mock);
        }
        fetchCompanies();
    }, []);

    return (
        <div className="space-y-4">
            <h1>Companies Page</h1>
            <p className="text-slate-600">This is the companies page.</p>
            <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" onClick={() => setShowform(true)}>
                New Company
            </button>
            {showForm && (
                <NewCompany setShowform={setShowform} onCreated={(company) => setCompanies((prev) => [...prev, company])} />
            )}
            <ShowCompany clist={companies} />
        </div>
    );
}