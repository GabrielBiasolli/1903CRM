import {listCompanies} from '../services/companyService';
import type { Company } from '../types/crm';
import React from 'react';
import { Link } from 'react-router-dom';



function ShowCompanies(props: { clist: Company[] }) {
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
            <ShowCompanies clist={companies} />
        </div>
    );
}