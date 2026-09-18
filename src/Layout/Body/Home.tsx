import { useDataContext } from "../../contextsAndProviders/DataContext";
import { LetterPagination } from "../../Components/LetterPagination";
import { RecipesCardList } from "../../Components/RecipesPresentation/RecipesCardList";
import { Link } from "react-router-dom";
import { Loading } from "../../Components/Loading";

export function Home() {
    const { categories, recipes, loading } = useDataContext();

    return (
        <section className="py-6 w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">Explore Recipes</h2>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-center">By Category</h3>
                <div className="join flex-wrap justify-center gap-2">
                    {categories?.map((category) => (
                        <Link to={`/category/${category}`} key={category}>
                            <button className="join-item btn btn-sm btn-outline">
                                {category}
                            </button>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mb-6 flex flex-col justify-center items-center">
                <h3 className="text-lg font-semibold mb-2 text-center">Browse by Letter</h3>
                <LetterPagination />
            </div>

            <div className="mx-auto">
                {loading && <Loading />}
                {!loading && recipes &&
                <section className="mx-auto">
                    <RecipesCardList recipes={recipes} />
                </section>}
            </div>
        </section>
    );
}
