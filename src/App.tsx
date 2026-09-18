import { Layout } from "./Layout/Layout"
import { HashRouter, Routes, Route } from "react-router-dom"
import { Home } from "./Layout/Body/Home"
import { Category } from "./Layout/Body/Category"
import { Recipe } from "./Layout/Body/Recipe"
import { Favorites } from "./Layout/Body/Favorites"
import { Search } from "./Layout/Body/Search"
import {Ingredients} from "./Layout/Body/Ingredients"
import { FavoritesProvider } from "./contextsAndProviders/FavoritesContext"

function App() {

  return (
    <section data-theme={'light'} className='min-h-screen w-full'>
      <HashRouter>
        <FavoritesProvider>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/recipe/:recipeId" element={<Recipe />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search/:query" element={<Search />} />
              <Route path="/ingredients" element={<Ingredients/>} />
            </Route>
          </Routes>
        </FavoritesProvider>
      </HashRouter>
    </section>
  )
}

export default App
