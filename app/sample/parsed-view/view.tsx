
import Table from '@/components/externals/Table'
import React from 'react'

export default function ViewSampleFetch({ ListBook, refetchListBook }: { ListBook: any[], refetchListBook: any }) {
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
                    <div className="btn" onClick={() => { refetchListBook(({ appended }: any) => ({ appended: !appended })) }}>
                        Refresh
                    </div>
                )}
            />
        </>
    )
}
