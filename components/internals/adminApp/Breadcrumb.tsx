'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'



export default function Breadcrumb({ navigations }: { navigations?: typeBreadcumbProps }) {
    const pathName = usePathname();
    const controls = navigations?.length ? navigations : pathToNavigations(pathName);

    return (
        <section className="mb-0 bg-white border-y shadow">
            <div className='px-5 lg:px-3 overflow-auto whitespace-nowrap'>
                <div className="flex text-xs capitalize py-2 font-semibold">
                    {controls?.map((control, indexControl) => {
                        return (
                            <div key={indexControl}>
                                {((indexControl + 1) < controls.length) ? (
                                    <div className='text-slate-500'>
                                        <Link href={String(control?.directPath)}>{control?.label}</Link>
                                        <i className="bi bi-chevron-compact-right mx-1"/>
                                    </div>
                                ) : (
                                    <div className='cursor-default text-slate-600'>{control?.label}</div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}



function pathToNavigations(pathName: string) {
    const prevPaths = pathName.split('?')[0].split('/')
    const prevAsPath = pathName.split('/')

    return prevPaths.map((prevPath, indexPrevPath) => {
        var label;
        var directPath = '';
        switch (indexPrevPath) {
            case 0:
                directPath = `/`
                label = 'home';
                break;
            case 1:
                directPath = `/${prevPath}`
                label = prevPath;
                break;
            case 2:
                if (prevAsPath?.[3]?.includes('[') && prevAsPath?.[3]?.includes(']')) {
                    label = `detail ${prevPaths[1]}`;
                } else if (prevPath == 'data') {
                    label = prevPaths[3] ? `edit ${prevPaths[1]}` : `buat ${prevPaths[1]} baru`;
                } else if (prevPath == 'manage') {
                    label = `manage ${prevPaths[1]}`;
                }
                break;
        }
        if (label) {
            return {
                directPath,
                label: label.replace('-', ' ')
            }
        }
    }).filter((prevPath) => (prevPath));
}