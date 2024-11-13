import { Center, Flex, Image, Title } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function TechWork() {
    const t = useTranslations()
    return (
        <Center h="100vh" w="100vw"
            bg="linear-gradient(68.8deg, rgba(0, 0, 0, 0.95) 1.8%, rgb(0, 55, 79) 31.8%, rgb(9, 93, 134) 56.2%, rgb(15, 155, 217) 89%)"
            style={{ overflow: "hidden" }}>
            <Flex direction="column" align="center" justify="center">
                <Image
                    w={{ base: 150, sm: 200 }}
                    src="/icons/logo.svg"
                    alt=""
                />
                <Title
                    pos="relative"
                    order={5}
                    style={{ whiteSpace: "pre-line" }}
                    lh={1.3}
                    c="primary"
                    fz={{ base: 18, md: 24, lg: 28 }}
                    ta="center"
                >
                    {t("page.titles.technical-works")}
                </Title>
            </Flex>
        </Center>
    )
}
