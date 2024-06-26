'use client'

import Button from '@/components/externals/Button'
import Table from '@/components/externals/Table'
import { AppContext } from '@/components/internals/wrappers/AppContext'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'

function BookHomePage() {
  const { setBreadcumbNav } = useContext(AppContext)


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
        <div className="px-4 lg:px-2 pt-4 pb-2 flex justify-between">
          <div>
            <div className="text-xl mt-1 capitalize">Sample fetch monofile</div>
          </div>
          <div className='flex items-center gap-2'>
            <Link href={'/sample/monofile/data'}>
              <Button text='Tambah Data' />
            </Link>
          </div>
        </div>
      </section>
      <Table
        type='carded-section'
        path='/ready-books'
      />
    </>
  )
}

export default BookHomePage