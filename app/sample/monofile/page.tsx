'use client'

import Button from '@/components/externals/Button'
import Table from '@/components/externals/Table'
import { AppContext } from '@/components/internals/wrappers/AppContext'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'

function BookHomePage() {
  const { Transporter, setTransporter, setBreadcumbNav } = useContext(AppContext)


  /**
   * use effect
   */
  useEffect(() => {
    // set breadcumb
    setBreadcumbNav([
      {
        label: 'home',
        directPath: '/'
      },
      {
        label: 'sample monofile'
      }
    ])

    // cleanup
    return () => setBreadcumbNav([])
  }, [])



  /**
   * Render JSX
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
        actions={['edit', 'delete']}
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
          dataRows: Transporter?.books
        }}
        onDelete={(dataRow, primaryKey) => {
          setTransporter((prev: any) => {
            return {
              ...prev,
              books: prev.books.filter((book: any) => (book.id != dataRow[primaryKey]))
            }
          })
        }}
        rightElement={<>
          <Link href={'/sample/monofile/data'}>
            <Button
              text='Tambah Data'
            />
          </Link>
        </>}
      />
    </>
  )
}

export default BookHomePage