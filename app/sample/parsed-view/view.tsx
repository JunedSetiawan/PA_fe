
import Table from '@/components/externals/Table'
import React from 'react'

export default function ViewSampleFetch({ ListBook, refetchListBook }: { ListBook: any[], refetchListBook: any }) {
    return (
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
                    klik
                </div>
            )}
        />
    )
}
