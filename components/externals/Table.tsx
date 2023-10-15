'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import Confirm from './popups/Confirm';
import { api } from '@/utils/frontend';

interface typeDataTable {
    columns?: {
        title: string,
        keyData: string,
        className?: string,
        style?: CSSProperties
    }[],
    dataRows?: (Record<string, any>)[],
    paginate?: {
        current_page: number,
        last_page: number,
    },
    primaryKey?: string,
}
interface typeTableProps {
    className?: string,

    path?: string,
    data?: typeDataTable,
    type?: 'carded-section' | 'carded' | 'striped',
    actions?: ('show' | 'edit' | 'delete')[] | '*',
    customAction?: (dataRow: Record<string, any>, primaryKey: string) => any,
    objParams?: Record<string, any>,

    onDelete?: (dataRow: Record<string, any>, primaryKey: string) => any,
    onSearch?: (value: string) => any,
    onChangeParams?: (objectParams: any) => ReactNode,

    noHeader?: boolean,
    noNumber?: boolean,
    noSearch?: boolean,
    noPaginate?: boolean,

    leftElement?: ReactNode,
    rightElement?: ReactNode
}
function Table({
    className,

    path,
    data,
    type,
    actions,
    objParams,

    onDelete,
    onSearch,
    onChangeParams,

    noHeader,
    noNumber,
    noSearch,
    noPaginate,

    leftElement,
    rightElement,
    customAction,
}: typeTableProps) {
    const pathname = usePathname();
    const [DataTables, setDataTables] = useState<typeDataTable>({});
    const [ShowConfirmDelete, setShowConfirmDelete] = useState<any>();
    const [ObjectParams, setObjectParams] = useState<any>();




    /**
     * Function Handler
     */
    function loadData() {
        if (path) {
            api({
                path,
                objParams: ObjectParams,
                staleTime: 1
            }).then(async (res) => {
                if (res.status == 200) {
                    const { prototypeTable } = (await res.json()).data
                    setDataTables(prototypeTable)
                }
            })
        }
    }

    function handleDelete() {
        if (onDelete) {
            onDelete(ShowConfirmDelete, (DataTables.primaryKey ?? 'id'));
        } else if (!data && path) {
            // Here code...
        }
        setShowConfirmDelete(undefined);
    };

    function handleSearch(searchWord: string) {
        if (data) {
            setDataTables(() => ({
                ...data,
                dataRows: data.dataRows?.filter((dataRow) => {
                    return data.columns?.filter(({ keyData }) => {
                        return ((dataRow[keyData] as string).toLowerCase().match(searchWord.toLowerCase()))
                    }).length
                })
            }))
        }
        if (onSearch) onSearch(searchWord)
        setObjectParams((prev: any) => ({
            ...(prev ?? {}),
            search: searchWord
        }))
    }



    /**
     * useEffect
     */
    useEffect(() => {
        if (data) setDataTables(data);
    }, [data])

    useEffect(() => {
        if (!data) loadData()
    }, [path, ObjectParams])


    useEffect(() => {
        if (objParams != ObjectParams) {
            setObjectParams((prev: any) => ({
                ...(prev ?? {}),
                ...(objParams ?? {})
            }))
        }
    }, [objParams])

    useEffect(() => {
        if (onChangeParams && objParams != ObjectParams) {
            onChangeParams(ObjectParams)
        }
    }, [ObjectParams])



    /**
     * Rendered JSX
     */
    return (
        <>
            <section className='bg-white'>
                <div className="flex gap-4 flex-col-reverse md:flex-row py-2 px-4 lg:px-2">
                    <div className="flex gap-2 text-xs">
                        {!noPaginate && <Paginate />}
                        {!noSearch && <Search onSubmit={handleSearch} />}
                        {leftElement}
                    </div>
                    <div className='flex gap-2 md:ml-auto'>
                        {rightElement}
                    </div>
                </div>
            </section>
            <div>
                <div className={`overflow-auto ${className} ${(type == 'carded-section') && 'section-table'}`}>
                    <table className={`table table-${(type ?? 'striped').replace('-section', '')}`}>
                        {!noHeader && (<thead>
                            <tr>
                                {!noNumber && <th style={{ width: "1px" }}>#</th>}
                                {DataTables.columns?.map((column, indexColumn) => {
                                    return (
                                        <th key={indexColumn} className={column.className} style={column.style}>
                                            {column.title}
                                        </th>
                                    );
                                })}
                                <th />
                            </tr>
                        </thead>
                        )}
                        <tbody>
                            {Boolean(DataTables?.dataRows?.length) ? (
                                DataTables.dataRows?.map((dataRow: Record<string, any>, indexDataRow) => {
                                    const primaryKey = dataRow?.[DataTables.primaryKey ?? 'id'];
                                    return (
                                        <tr key={indexDataRow}>
                                            {!noNumber && <td>{indexDataRow + 1}</td>}

                                            {/* data rows */}
                                            {DataTables.columns?.map((column, indexColumn) => {
                                                const { keyData } = column;
                                                return (
                                                    <td
                                                        key={indexColumn}
                                                        dangerouslySetInnerHTML={{
                                                            __html: (() => {
                                                                try {
                                                                    return eval(keyData)(dataRow);
                                                                } catch (error) {
                                                                    return dataRow[keyData];
                                                                }
                                                            })()
                                                        }}
                                                    />
                                                );
                                            })}

                                            {/* action rows */}
                                            <td className="inline-flex items-center gap-4">
                                                {customAction ? (customAction(dataRow, (DataTables.primaryKey ?? 'id')) as ReactNode) : ''}
                                                {(actions?.includes('show') || actions?.[0] == '*') && (
                                                    <Link
                                                        href={`${pathname}/${primaryKey}`}
                                                        className="btn-square text-blue-400"
                                                    >
                                                        <i className='bi bi-eye-fill' />
                                                    </Link>
                                                )}
                                                {(actions?.includes("edit") || actions?.[0] == "*") && (
                                                    <Link
                                                        href={`${pathname}/data/${primaryKey}`}
                                                        className="btn-square text-yellow-400"
                                                    >
                                                        <i className='bi bi-pencil-square' />
                                                    </Link>
                                                )}
                                                {(actions?.includes("delete") || actions?.[0] == "*") && (
                                                    <a
                                                        className="btn-square text-red-400"
                                                        onClick={() => {
                                                            setShowConfirmDelete(dataRow);
                                                        }}
                                                    >
                                                        <i className='bi bi-trash' />
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr className='empty-row'>
                                    <td
                                        colSpan={(DataTables.columns?.length ?? 0) + (noNumber ? 1 : 2)}
                                        className="text-center text-gray-500"
                                        style={{ padding: "4rem 0" }}
                                    >
                                        Data Kosong
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Confirm
                    show={(ShowConfirmDelete?.[DataTables?.primaryKey ?? 'id']) != null}
                    setShow={() => setShowConfirmDelete(undefined)}
                    onApproved={handleDelete}
                />
            </div>
        </>
    )
}




function Paginate() {
    return (
        <div>
            <div className='flex items-center h-[2.25rem] border border-gray-400 rounded-lg cursor-pointer overflow-hidden'>
                <div className='hover:text-primary flex items-center'>
                    <i className='bi bi-chevron-left pt-[2px] pl-2' />
                </div>
                <div className='hover:text-primary flex items-center'>
                    <div className='px-1 pt-[2px]'>12/100</div>
                </div>
                <div className='hover:text-primary flex items-center'>
                    <i className='bi bi-chevron-right pt-[2px] pr-2' />
                </div>
            </div>
        </div>
    )
}


function Search({ onSubmit }: { onSubmit: (value: string) => void }) {
    const refSearch = useRef<HTMLInputElement>(null)
    const [DelaySearch, setDelaySearch] = useState<ReturnType<typeof setTimeout>>()
    return (
        <div className="flex grow md:grow-0">
            <input
                ref={refSearch}
                className='h-[2.25rem] w-full border border-gray-400 rounded-lg px-4'
                placeholder='Search...'
                onInput={(e) => {
                    const value = e.currentTarget.value
                    clearTimeout(DelaySearch)
                    setDelaySearch(
                        setTimeout(() => {
                            onSubmit(value);
                        }, 1000)
                    )
                }}
            />
            <div
                onSubmit={() => {
                    onSubmit(refSearch.current?.value ?? '');
                }}
                className='my-auto pb-[3px] ml-[-1.5rem] w-[1.5rem] cursor-pointer'
            >
                <i className='bi bi-search' />
            </div>
        </div>
    )
}

export default Table