'use client'

import Button from '@/components/externals/Button'
import InputPassword from '@/components/externals/inputs/InputPassword'
import InputText from '@/components/externals/inputs/InputText'
import { isInvalidForm } from '@/utils/frontend'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

function LoginPage() {
    const searchParams = useSearchParams()


    /**
     * State declaration
     */
    const [FormLogin, setFormLogin] = useState({})


    /**
     * Function handler
     */
    function onSubmitLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        window.location.href = '/'
    }


    /**
     * Render JSX
     */
    return (
        <section className='h-screen flex sm:pb-[6rem] pb-[4rem] px-4 bg-[var(--color-bg-default)]'>
            <div className="card max-w-lg m-auto rounded-lg">
                <div className='card-body p-8'>
                    {(searchParams.get('isPens')) ? (
                        <Image
                            src={'/logo/logo-pens-text.png'}
                            alt='me'
                            width={90}
                            height={0}
                            style={{ height: 'auto', width: 'auto' }}
                            className='mb-[3rem]'
                        />
                    ) : (
                        <div className="mb-[3rem] flex items-center gap-3">
                            <div className="h-[3.5rem] bg-profile" style={{ backgroundImage: `URL(/logo/logo-smkn-jenangan.png)` }} />
                            <div>
                                <div className="text-xl mt-[.15rem]">SIMBAH</div>
                                <div className="text-sm mt-1 font-normal">SMKN 1 JENANGAN</div>
                            </div>
                        </div>
                    )}
                    <div className='mb-[.75rem]'>
                        <div className='text-xl'>Masuk ke akun pengguna</div>
                        <div className='text-xs text-gray-700 mt-1'>Jaga username dan password anda tetap aman</div>
                    </div>
                    <form onSubmit={onSubmitLogin} className='mb-[3rem]'>
                        <InputText
                            getter={FormLogin}
                            setter={setFormLogin}
                            name='username'
                            className='float-label'
                            validations={{
                                required: true
                            }}
                        />
                        <div className="flex gap-2">
                            <InputPassword
                                getter={FormLogin}
                                setter={setFormLogin}
                                name='password'
                                className='grow float-label'
                                validations={{
                                    required: true
                                }}
                            />
                            <Button
                                className='btn-outline aspect-square mt-[1.5rem] bg-primary text-contras-primary disabled:border-gray-200 disabled:bg-white disabled:text-gray-300'
                                disabled={isInvalidForm(FormLogin)}
                                text={<>
                                    <i className='bi bi-arrow-right mt-[2px]' />
                                </>}
                            />
                        </div>
                    </form>
                    <div>
                        <p className="text-center text-gray-500 text-xs">
                            {/* &copy;2023 IT JENPO. All rights reserved. */}
                            &copy;2023 SMKN 1 Jenangan Ponorogo.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage