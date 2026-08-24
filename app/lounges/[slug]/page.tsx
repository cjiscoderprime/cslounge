type LoungePageProps = {
    params: Promise<{
        slug:string
    }>
}

export default async function LoungePage({
    params,
}: LoungePageProps){
    const {slug} = await params

    return (
        <main className = "p-6">
            <h1 className="text-2xl font-bold">
                {slug}
            </h1>
        </main>
    )
}