'use client'

import { useEffect, useState } from "react";
import ViewSampleFetch from "./view";
import { api } from "@/utils/frontend";


export default function PandaPage() {
    const [ListBook, setListBook] = useState<any[]>([])
    const [ParamsFetchBook, setParamsFetchBook] = useState<Record<string, any>>({})

    useEffect(() => {
        api({ path: '/books', objParams: ParamsFetchBook }).then(async (res) => {
            const { books } = (await res.json()).data
            setListBook(books)
        })
    }, [ParamsFetchBook])


    /**
     * JSX Rendered
     */
    return (
        <>
            <ViewSampleFetch
                ListBook={ListBook}
                refetchListBook={setParamsFetchBook}
            />
        </>
    )
}
