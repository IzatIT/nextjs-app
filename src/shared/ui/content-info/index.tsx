import { COLORS } from "@/constants";
import { Box, Divider, Grid, Title } from "@mantine/core";

type Props = {
    data: {
        label?: string;
        value?: React.ReactNode | string;
    }[];
}

export const ContentInfo = ({ data }: Props) => {
    return (
        <>
            {data?.map(el => (
                <Box key={el.label}>
                    <Grid align="center" my={10}>
                        {el.label && <Grid.Col span={{ base: 12, sm: 4 }}>
                            <Title fz={18} c={COLORS.PRIMARY_COLOR} variant="label">
                                {el.label}:
                            </Title>
                        </Grid.Col>}
                        <Grid.Col c={COLORS.PRIMARY_COLOR} fz={18} span={el.label ? { base: 12, sm: 8 } : 12}>
                            {el.value}
                        </Grid.Col>
                    </Grid>
                    <Divider opacity={0.5} />
                </Box>
            ))}
        </>
    )
}
