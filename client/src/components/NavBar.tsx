import { NavLink } from 'react-router-dom'

// Same style for every link: highlighted when it points to the current page.
function linkClass({ isActive }: { isActive: boolean }) {
    return isActive ? 'font-semibold text-blue-600' : 'text-slate-600 hover:text-blue-600'
}

export default function NavBar() {
    return (
        <nav className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-5xl items-center gap-10 px-6 py-4">
                <span className="text-lg font-bold text-slate-900">1903CRM</span>
                <ul className="flex items-center gap-6 capitalize">
                    <li><NavLink to="/dashboard" className={linkClass}>dashboard</NavLink></li>
                    <li><NavLink to="/deals" className={linkClass}>deals</NavLink></li>
                    <li><NavLink to="/tasks" className={linkClass}>tasks</NavLink></li>
                    <li><NavLink to="/contacts" className={linkClass}>contacts</NavLink></li>
                    <li><NavLink to="/companies" className={linkClass}>companies</NavLink></li>
                </ul>
            </div>
        </nav>
    );
}
