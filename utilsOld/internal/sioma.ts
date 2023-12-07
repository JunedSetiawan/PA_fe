

// export function accessFeature(
//     features: string[],
//     accesses: { access?: number, feature?: string }[],
//     levelAccess: 1 | 2 = 1
// ) {
//     return Math.max(
//         ...(accesses?.map(({ access, feature }) => {
//             return Number(features.includes(feature ?? '') ? access : 0)
//         }) ?? []), 0
//     ) >= levelAccess
// }

import { AppContext } from "@/components/internals/wrappers/AppContext";
import { useContext } from "react";





export function accessFeature(
    featureAccesses: string[]
) {
    const { UserAuthed } = useContext(AppContext)
    for (const featuresAccess of featureAccesses) {
        const [ruleFeature, ruleAccess] = featuresAccess.split('>=')
        for (const { access, feature } of (UserAuthed?.access?.ER?.featureAccesses ?? [])) {
            if ((feature == ruleFeature) && (access >= Number(ruleAccess))) {
                return true
            }
        }
    }
    return false;
}