import { Accordion } from "@mantine/core";

type Props = {
    data: {
        control: React.ReactNode;
        key: string;
        panel: React.ReactNode;
    }[];
    variant?: "card_info" | "default" | "page"
}

export const AppAccordion = ({ data, variant }: Props) => {
    return (
        <Accordion chevron={false} variant={variant} >
            {data?.map(item => (
                <Accordion.Item styles={{ item: { borderBottom: "1px solid white" } }} value={item.key} key={item.key}>
                    <Accordion.Control >
                        {item.control}
                    </Accordion.Control>
                    <Accordion.Panel>
                        {item.panel}
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
