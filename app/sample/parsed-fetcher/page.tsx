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
            <section className="bg-white">
                <div className="px-4 lg:px-2 pt-4 pb-6">
                    <div className="text-lg capitalize">Title Page</div>
                    <div className="text-xs mt-1">Subtitle Page</div>
                </div>
            </section>
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
                        Refresh
                    </div>
                )}
            />
        </>
    )
}
