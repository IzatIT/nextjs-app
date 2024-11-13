'use client'
import { Button, Card, Flex, Grid, ScrollArea, Text, Title } from "@mantine/core"
import worldCoordinates from "/public/json/world-coordinates.json"
import { createReference, getReferenceByTypeCode, Reference, ReferenceTypeCodesEnum } from "@/entities";
import { AppButton } from "@/shared";
import { useEffect, useState } from "react";

export const CreateCountriesWidget = () => {
    const [created, setCreated] = useState<Reference[]>();
    const [createdId, setCreatedId] = useState<number[]>([]);


    const fetchRefs = async () => {
        const res = await getReferenceByTypeCode({
            typeCode: ReferenceTypeCodesEnum.REF_COUNTRIES,
            notifyOnError: false,
        })
        setCreated(res?.content)
    }

    const filteredData: () => MapCoordinatesType[] = () => {
        const uniqueCoordinates = worldCoordinates.reduce((accumulator: MapCoordinatesType[], currentValue: MapCoordinatesType) => {
            const exists = accumulator.some((el) => el.id === currentValue.id);
            if (!exists) {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, []);

        const result = uniqueCoordinates.filter((el: MapCoordinatesType) => el.titleKg && el.titleRu);
        return result;
    };

    const createCountry = (data: MapCoordinatesType) => async () => {
        await createReference({
            titleEn: data.titleEn || "",
            titleKg: data.titleKg,
            titleRu: data.titleRu,
            type: ReferenceTypeCodesEnum.REF_COUNTRIES
        })
        setCreatedId(prev => [...prev, data.id])
    }

    const handleCreateAllRef = async () => {
        const reqCollection = filteredData().map(el => {
            return createCountry(el)()
        })
        Promise.all(reqCollection)
    }


    useEffect(() => {
        fetchRefs()
    }, [createdId])

    return (
        <ScrollArea p={32} h="100vh">
            <Flex mb={24} c="white" align="center" gap={10}>
                <Text fz={24}>Количество стран:</Text>
                <Title c="green" fz={32}>{filteredData().length}</Title>
            </Flex>
            <Button onClick={handleCreateAllRef} variant="gradient">
                Create All ref
            </Button>
            <Grid>
                {filteredData().map((el) => {
                    const isCreated = created?.map(el => el.titleEn).includes(el?.titleEn || "")
                    return (
                        <Grid.Col h="100%" span={{ base: 12, sm: 6, md: 4, lg: 3 }} c="white" key={el.id}>
                            <Card>
                                <Flex align="center" gap={10}>
                                    <Text>ID:</Text>
                                    <Title lh={1.5} fz={22}>{el.id}</Title>
                                </Flex>
                                <Flex align="center" gap={10}>
                                    <Text>Кыргызча:</Text>
                                    <Title lh={1.5} fz={22}>{el.titleKg}</Title>
                                </Flex>
                                <Flex align="center" gap={10}>
                                    <Text>На русском:</Text>
                                    <Title lh={1.5} fz={22}>{el.titleRu}</Title>
                                </Flex>
                                <Flex mb={24} align="center" gap={10}>
                                    <Text>In English:</Text>
                                    <Title lh={1.5} fz={22}>{el.titleEn}</Title>
                                </Flex>
                                <AppButton
                                    disabled={isCreated}
                                    onClick={createCountry(el)}
                                    variant={isCreated ? "reset" : "submit"}>
                                    Добавить страну в справочник
                                </AppButton>
                            </Card>
                        </Grid.Col>
                    )
                })}
            </Grid>
        </ScrollArea>
    )
}
