import { COLORS } from "@/constants";
import { Box, Flex, Popover, Text } from "@mantine/core";

type Props = {
    target: React.ReactNode;
    actions: {
        icon: React.ReactNode;
        title: string;
        onClick: () => void
    }[]
}

export const AppActions = ({
    target,
    actions
}: Props) => {
    return (
        <Popover
            styles={{
                dropdown:
                    { background: "rgba(28,28,80, 1)" }
            }
            }>
            <Popover.Target>
                <Box>
                    {target}
                </Box>
            </Popover.Target>
            <Popover.Dropdown>
                {actions?.map(el => (
                    <Flex gap={10}
                        style={{ cursor: "pointer" }}
                        my={10} c={COLORS.PRIMARY_COLOR}
                        onClick={el.onClick} key={el.title}>
                        {el.icon}
                        <Text c={COLORS.PRIMARY_COLOR} fz={16}>
                            {el.title}
                        </Text>
                    </Flex>
                ))}
            </Popover.Dropdown>
        </Popover >
    )
}
