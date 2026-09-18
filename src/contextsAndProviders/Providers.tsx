import { DataContextProvider } from "./DataContext.tsx"
import { FavoritesProvider } from "./FavoritesContext"

export function Providers({children}:{children:React.ReactNode}){
    return(
        <FavoritesProvider>
            <DataContextProvider>
                {children}
            </DataContextProvider>
        </FavoritesProvider>
    )
}
