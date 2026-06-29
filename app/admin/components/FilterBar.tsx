type FilterBarProps = {
    search: string;
    status: string;
    category: string;
    sort: string;
};

export default function FilterBar({
    search,
    status,
    category,
    sort,
}: FilterBarProps) {
    return (
        <>
            <form className="flex gap-4 mb-8">

                <input
                    type="hidden"
                    name="status"
                    value={status}
                />

                <input
                    type="hidden"
                    name="category"
                    value={category}
                />

                <input
                    type="hidden"
                    name="sort"
                    value={sort}
                />

                <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="🔍 Search title, location or category..."
                    className="flex-1 rounded-lg border border-gray-600 bg-white text-black p-3"
                />

                <button className="bg-blue-600 px-6 rounded-lg">
                    Search
                </button>

            </form>

            {/* Status */}

            <div className="flex gap-3 mb-6 flex-wrap">

                <a href={`/admin?search=${search}&status=All&category=${category}&sort=${sort}`} className="bg-gray-700 px-4 py-2 rounded">
                    All
                </a>

                <a href={`/admin?search=${search}&status=Pending&category=${category}&sort=${sort}`} className="bg-yellow-500 px-4 py-2 rounded">
                    Pending
                </a>

                <a href={`/admin?search=${search}&status=Assigned&category=${category}&sort=${sort}`} className="bg-blue-600 px-4 py-2 rounded">
                    Assigned
                </a>

                <a href={`/admin?search=${search}&status=In Progress&category=${category}&sort=${sort}`} className="bg-orange-500 px-4 py-2 rounded">
                    In Progress
                </a>

                <a href={`/admin?search=${search}&status=Resolved&category=${category}&sort=${sort}`} className="bg-green-600 px-4 py-2 rounded">
                    Resolved
                </a>

            </div>

            {/* Category */}

            <div className="flex gap-3 mb-6 flex-wrap">

                <a href={`/admin?search=${search}&status=${status}&category=All&sort=${sort}`} className="bg-gray-700 px-4 py-2 rounded">
                    All Categories
                </a>

                <a href={`/admin?search=${search}&status=${status}&category=Roads & Pavement&sort=${sort}`} className="bg-blue-700 px-4 py-2 rounded">
                    Roads
                </a>

                <a href={`/admin?search=${search}&status=${status}&category=Water&sort=${sort}`} className="bg-cyan-700 px-4 py-2 rounded">
                    Water
                </a>

                <a href={`/admin?search=${search}&status=${status}&category=Electricity&sort=${sort}`} className="bg-yellow-700 px-4 py-2 rounded">
                    Electricity
                </a>

                <a href={`/admin?search=${search}&status=${status}&category=Garbage&sort=${sort}`} className="bg-green-700 px-4 py-2 rounded">
                    Garbage
                </a>

            </div>

            {/* Sort */}

            <div className="flex gap-3 mb-8 flex-wrap">

                <a href={`/admin?search=${search}&status=${status}&category=${category}&sort=Newest`} className="bg-gray-700 px-4 py-2 rounded">
                    🕒 Newest
                </a>

                <a href={`/admin?search=${search}&status=${status}&category=${category}&sort=Oldest`} className="bg-gray-700 px-4 py-2 rounded">
                    📅 Oldest
                </a>

                <a href={`/admin?search=${search}&status=${status}&category=${category}&sort=Priority`} className="bg-purple-700 px-4 py-2 rounded">
                    ⭐ Highest Priority
                </a>

            </div>
        </>
    );
}