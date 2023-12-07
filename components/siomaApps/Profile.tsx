
import { UserCircle, Power } from 'phosphor-react'
import { useContext, useState } from 'react'
import Dropdown from '../externals/popups/Dropdown'
import Confirm from '../externals/popups/Confirm'
import { AppContext } from '../internals/wrappers/AppContext'

export default function Profile() {
    const { UserAuthed } = useContext(AppContext)
    const [ShowProfile, setShowProfile] = useState(false)
    const [AlertLogout, setAlertLogout] = useState(false)



    /**
     * Function handler
     */
    function onLogout() {
        setAlertLogout(false)
        window.location.href = '/login'
    }

    /**
     * Render JSX
     */
    return (
        <div className='relative'>
            <div className="header-icon-square" onClick={() => setShowProfile(true)}>
                <UserCircle className="text-[24px]" />
            </div>
            <Dropdown show={ShowProfile} setShow={setShowProfile} className='w-[20rem] right-0 text-center overflow-hidden'>
                <div className="py-4">
                    <UserCircle className='text-[4.5rem] mx-auto' />
                    <div className="text-lg max-w-[13rem] mx-auto truncate mt-1">{UserAuthed?.name}</div>
                    <div className="text-xs text-gray-600 mt-1 capitalize">{UserAuthed?.access?.ER?.role}</div>
                </div>
                {/* <Link href={'/ubah-sandi'}>
                    <div className="py-2 border-t cursor-pointer hover:bg-gray-200">
                        <span>Ubah sandi</span>
                    </div>
                </Link> */}
                <div
                    className="mt-2 py-3 flex justify-center gap-1 border-t cursor-pointer text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => { setAlertLogout(true) }}
                >
                    <Power className='mt-[1px]' />
                    <span>Logout</span>
                </div>
            </Dropdown>
            <Confirm
                question="Anda benar-benar ingin logout?"
                show={AlertLogout}
                setShow={setAlertLogout}
                onApproved={onLogout}
            />
        </div>
    )
}