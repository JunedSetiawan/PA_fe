import { api } from "@/utils/frontend"
import { useEffect, useState } from "react"


export function ApiListBooks() {
    const [ListBook, setListBook] = useState()
    const [ParamsFetchBook, setParamsFetchBook] = useState<Record<string, any>>({})

    useEffect(() => {
        api({ path: '/books', objParams: ParamsFetchBook }).then(async (res) => {
            const { books } = (await res.json()).data
            setListBook(books)
        })
    }, [ParamsFetchBook])

    return {
        ListBook,
        refetchListBook: setParamsFetchBook,
    }
}