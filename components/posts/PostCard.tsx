type PostCardProps = {
    title:string;
    author:string;
    lounge:string;
    votes:number;
    comments: number;
}

export default function PostCard({
    title,
    author,
    lounge,
    votes,
    comments,
}: PostCardProps) { ///Destructuring props
return(
    <article className = "rounded-lg border p-4">
    <p className = "text-sm text-gray-500">
        {lounge} Posted by {author}
    </p>

    <h2 className = "mt-2 text-xl font-semibold">
        {title}
    </h2>

    <div className = 'mt-4 flex gap-4 text-sm'>
        <span> {votes}</span>
        <span>Comments: {comments}</span>
    </div>
    </article>
)
}