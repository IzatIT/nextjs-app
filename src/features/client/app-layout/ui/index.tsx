import { Box } from "@mantine/core"

type Props = {
    children?: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
    return (
        <Box >
            <header></header>
            <Box mih="70vh">
                {children}
            </Box>
            <footer></footer>
        </Box>
    )
}
