'use client'

import Form from '@/components/externals/Form'
import { AppContext } from '@/components/internals/wrappers/AppContext'
import { useParams, useRouter } from 'next/navigation'
import React, { FormEvent, useContext, useEffect, useState } from 'react'

function BookPage() {
    const { setBreadcumbNav, Transporter, setTransporter } = useContext(AppContext)
    const router = useRouter()
    const { id: queryId } = useParams()


    /**
     * State Declaration
     */
    const [FormSample, setFormSample] = useState<any>({})


    /**
     * Function Handler
     */
    function onSubmitForm(e: FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.target as HTMLFormElement)
        setTransporter((prev: any) => {
            const newBooks = (prev?.books ?? []).filter((book: any) => (String(book.id) != queryId?.[0]))
            newBooks.unshift({
                id: (queryId?.[0] ?? Date.now()) as any,
                title: formData.get('title') as string,
                prolog: formData.get('prolog') as string,
            })
            return {
                ...(prev ?? {}),
                books: newBooks
            }
        })
        return router.push('/sample/monofile')
    }


    /**
     * use effect
     */
    useEffect(() => {
        setBreadcumbNav([
            {
                label: 'home',
                directPath: '/'
            },
            {
                label: 'sample monofile',
                directPath: '/sample/monofile'
            },
            {
                label: 'Form Data'
            }
        ])

        // cleanup
        return () => setBreadcumbNav([])
    }, [])

    useEffect(() => {
        if (queryId?.[0] && Transporter?.books && !FormSample.values) {
            const defaultValue = Transporter?.books?.filter((book: any) => (String(book.id) == queryId?.[0]))?.[0]
            if (defaultValue) {
                setFormSample((prev: typeStateInput): typeStateInput => ({
                    ...prev,
                    values: defaultValue
                }))
            }
        }
    }, [Transporter, queryId])



    /**
     * Rendered JSX
     */
    return (
        <>
            <section className='bg-white border-b shadow'>
                <div className='h-[1rem]'>
                </div>
            </section>
            <section className='mt-4'>
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">Book List</div>
                    </div>
                    <div className="card-body">
                        <Form
                            onSubmit={onSubmitForm}
                            getter={FormSample}
                            setter={setFormSample}
                            fields={[
                                {
                                    name: 'title',
                                    title: 'judul',
                                    validations: { required: true }
                                },
                                {
                                    name: 'prolog',
                                    title: 'prolog',
                                    type: 'textarea',
                                    validations: { required: true }
                                }
                            ]}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default BookPage