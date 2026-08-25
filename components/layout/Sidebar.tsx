import Link from "next/link"
export default function Sidebar(){
    return (
        <aside>
            <h2>Explore</h2>
            <nav className = "mt-4 flex flex-col gap-2">
                <Link href = "/">Home</Link>

                <h3 className = "mt-4 font-semibold">Lounges</h3>

                <Link href = "/lounges/systems">
                    Systems
                </Link>

                <Link href = "/lounges/cloud">
                    Cloud
                </Link>

                <Link href = "/lounges/databases">
                    Databases
                </Link>
            </nav>
        </aside>
    )
}