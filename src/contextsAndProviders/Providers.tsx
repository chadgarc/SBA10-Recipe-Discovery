import { DataContextProvider } from "./DataContext.tsx"

export function Providers({children}:{children:React.ReactNode}){
    return(
        <DataContextProvider>
            {children}
        </DataContextProvider>
    )
}