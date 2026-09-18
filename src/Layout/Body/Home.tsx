import { useDataContext } from "../../contextsAndProviders/DataContext";
import { LetterPagination } from "../../Components/LetterPagination";

export function Home() {
    const { categories, recipes, loading } = useDataContext();

    return (
        <section className="py-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Explore Recipes</h2>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-center">By Category</h3>
                <div className="join flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <button key={category} className="join-item btn btn-sm btn-outline">
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-center">Browse by Letter</h3>
                <LetterPagination />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {loading && <p>Loading...</p>}
                {!loading && recipes.map((recipe) => (
                    <div key={recipe.id} className="card bg-base-100 shadow-xl">
                        <figure><img src={recipe.imageURL} alt={recipe.name} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{recipe.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
