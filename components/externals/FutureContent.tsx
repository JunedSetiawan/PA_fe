import { ReactNode } from "react"

interface typeFutureContent {
    statusCode?: Number,
    children?: ReactNode
}
export default function FutureContent({
    statusCode,
    children
}: typeFutureContent) {
    switch (statusCode) {
        case 200:
            return children
        case 202:
            return (<div>Loading...</div>)
        default:
            return (<div>Failed</div>)
    }
}