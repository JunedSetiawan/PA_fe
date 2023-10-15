

import DynamicCardTitle from '@/components/externals/DynamicCardTitle'
import { numberToRoman } from '@/utils/general'
import { Dispatch, SetStateAction, useContext, useEffect, ReactNode } from 'react'
import { AppContext } from '../../wrappers/AppContext'

export default function SemesterDynamicTitleCard({
    Semester,
    setSemester,
    title
}: {
    Semester: typeLogSemesterClassStudent,
    setSemester: Dispatch<SetStateAction<typeLogSemesterClassStudent>>,
    title?: ReactNode
}) {
    const { UserAuthed } = useContext(AppContext)

    useEffect(() => {
        if (!Object.keys(Semester).length) {
            setSemester(UserAuthed?.history_semester?.[0] ?? {})
        }
    }, [UserAuthed])
    return (
        <DynamicCardTitle
            label={<div>
                <div>{title}</div>
                <div>{`${numberToRoman(Semester.level)} ${Semester.short_prody ?? ''} ${Semester.alphabet ?? ''} Semester ${Semester.semester ?? ''}`}</div>
            </div>}
            isDisablePrev={((UserAuthed?.history_semester?.indexOf(Semester) ?? 0) - 1) < 0}
            onPrev={() => {
                setSemester((prev) => {
                    const historyClass = UserAuthed?.history_semester
                    const indexPrevClass = (historyClass?.indexOf(prev) ?? 0) - 1
                    return (indexPrevClass >= 0) ? historyClass?.[indexPrevClass] ?? prev : prev
                })
            }}
            isDisableNext={((UserAuthed?.history_semester?.indexOf(Semester) ?? 0) + 1) > ((UserAuthed?.history_semester?.length ?? 1) - 1)}
            onNext={() => {
                setSemester((prev) => {
                    const historyClass = UserAuthed?.history_semester
                    const indexPrevClass = (historyClass?.indexOf(prev) ?? (historyClass?.length ?? 0 - 1)) + 1
                    return (indexPrevClass <= ((historyClass?.length ?? 1) - 1)) ? historyClass?.[indexPrevClass] ?? prev : prev
                })
            }}
        />
    )
}
