import { LoadingOverlay } from "@mantine/core"

type Props = {
    isLoading: boolean
}

export const AppLoader = ({ isLoading }: Props) => {
    return (
        <LoadingOverlay
            styles={{
                overlay: {
                    background: "linear-gradient(65.5deg, rgb(4, 91, 126) -15.1%, rgb(23, 25, 95) 71.5%)"
                },
                root: {
                    zIndex: 99
                }
            }}
            loaderProps={{
                color: 'rgb(93, 175, 0)',
                type: 'bars',
                size: "lg"
            }}
            w="100%" h="100%"
            visible={isLoading} />
    )
}
