'use client'

import HeaderAdminApp from '@/components/internals/adminApp/HeaderAdminApp'
import { usePathname } from 'next/navigation'
import Error from 'next/error'
import { useEffect, useState } from 'react'
import { AppContext } from '@/components/internals/wrappers/AppContext'
import { api } from '@/utils/frontend'
import SidebarAdminApp from '@/components/internals/adminApp/SidebarAdminApp'
import Breadcrumb from '@/components/internals/adminApp/Breadcrumb'


/**
 * Importing CSS
 */
require('@/styles/externals/panel.css')
require('@/styles/externals/index.css')
require('@/styles/internals/index.css')


export default function Template({ children }: { children: React.ReactNode }) {
    // prefix
    const prefix = usePathname().split('/')[1]


    /**
     * State Declaration
     */
    const [UserAuthed, setUserAuthed] = useState<typeUserAuthed>({});
    const [StatusCode, setStatusCode] = useState<number>(200);
    const [BreadcumbNav, setBreadcumbNav] = useState<typeBreadcumbProps>([])
    const [Transporter, setTransporter] = useState<any>(null)


    /**
     * Load data
     */
    // useEffect(() => {
    //     // load data profile
    //     api({ path: '/profile' }).then(async (res) => {
    //         if (res.status == 200) {
    //             const { profile } = (await res.json()).data
    //             setUserAuthed(profile)
    //         } else {
    //             setStatusCode(res.status)
    //         }
    //     })

    //     // load book data
    //     api({ path: '/books', staleTime: 5 }).then(async (res) => {
    //         const { books } = (await res.json()).data
    //         setTransporter((prev: any) => ({
    //             ...(prev ?? {}),
    //             books
    //         }))
    //     })
    // }, [])


    return (
        <AppContext.Provider
            value={{
                UserAuthed: UserAuthed, setUserAuthed,
                StatusCode: StatusCode, setStatusCode,
                BreadcumbNav: BreadcumbNav, setBreadcumbNav,
                Transporter: Transporter, setTransporter
            }}
        >
            {(() => {
                if (![200, 202, 422].includes(StatusCode)) {
                    return <Error statusCode={StatusCode} />
                } else if ((prefix == '/_error') || ['login'].includes(prefix)) {
                    return children
                } else {
                    return (
                        <div className="wrapper">{/* max-w-screen-2xl */}
                            <div className="wrapper-content">
                                <div>
                                    <SidebarAdminApp />
                                </div>
                                <div className="container-fluid">
                                    <HeaderAdminApp />
                                    <main className="pb-[2rem]">
                                        <Breadcrumb navigations={BreadcumbNav} />
                                        {children}
                                    </main>
                                </div>
                            </div>
                        </div>
                    )
                }
            })()}
        </AppContext.Provider>
    )
}