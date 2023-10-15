'use client'

export default function Blank() {
    return (
        <>
            <section className='bg-white border-b shadow'>
                <div className='h-[1rem]' />
            </section>
            <section className='mt-4'>
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">Blank Title</div>
                    </div>
                    <div className="card-body">
                        Blank Content
                    </div>
                    <div className="card-footer"></div>
                </div>
            </section>
        </>
    )
}
