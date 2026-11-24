export default function NavBar() {
    return (
        <nav>
            <ul className="flex items-center gap-6">
                <li><a href="/dashboard">dashboard</a></li>
                <li><a href="/deals">deals</a></li>
                <li><a href="/tasks">tasks</a></li>
                <li><a href="/contacts">contacts</a></li>
                <li><a href="/companies">companies</a></li>
            </ul>
            <hr />
        </nav>
    );
}