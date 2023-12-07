import { AppContext } from "@/components/internals/wrappers/AppContext";
import { useContext } from "react";





export function checkAccessFeature(
    featureAccesses: string[],
    userAccesses?: typeUserAccess
) {
    if (!featureAccesses.length) {
        return true
    }
    if (!userAccesses?.length) {
        const { UserAuthed } = useContext(AppContext)
        userAccesses = UserAuthed?.access?.ER?.featureAccesses ?? []
    }
    for (const featuresAccess of featureAccesses) {
        const [ruleFeature, ruleAccess] = featuresAccess.split('>=')
        for (const { access, feature } of userAccesses) {
            if ((feature == ruleFeature) && (access >= Number(ruleAccess))) {
                return true
            }
        }
    }
    return false;
}