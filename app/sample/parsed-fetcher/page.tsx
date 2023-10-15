'use client'

import Table from "@/components/externals/Table";
import { ApiListBooks } from "./fetcher";


export default function PandaPage() {
    const { ListBook, refetchListBook } = ApiListBooks();


    /**
     * JSX Rendered
     */
    return (
        <>
            <Table
                type='carded-section'
                noPaginate={true}
                data={{
                    columns: [
                        {
                            title: 'Judul',
                            keyData: 'title'
                        },
                        {
                            title: 'Prolog',
                            keyData: 'prolog'
                        }
                    ],
                    dataRows: ListBook
                }}
                rightElement={(
                    <div className="btn" onClick={() => { refetchListBook(({ appended }) => ({ appended: !appended })) }}>
                        klik
                    </div>
                )}
            />
        </>
    )
}
