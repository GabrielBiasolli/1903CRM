import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="space-y-2">
            <h1>404 Not found</h1>
            <p className="text-slate-600">It looks like the page you're trying to reach doesn't exist.</p>
            <Link to='/dashboard' className="font-medium text-blue-600 hover:underline">Back to Dashboard</Link>
        </div>
    );
}