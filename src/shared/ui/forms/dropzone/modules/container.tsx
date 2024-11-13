import { Card } from "@mantine/core"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export const FilePreviewContainer = ({
    children
}: Props) => {
    return (
        <Card bg="rgba(28, 28, 80, 0.8)">
            {children}
        </Card>
    )
}
