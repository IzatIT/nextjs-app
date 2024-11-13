'use client'
import { Card, Flex, Grid, ScrollArea, Text, Title } from "@mantine/core"
import {
    createReference, defaultReferenceItemsForCreate,
    Reference, ReferenceRequest, searchReference
} from "@/entities";
import { AppButton, handleAxiosError, Notify } from "@/shared";
import { useEffect, useState } from "react";

export const CreateReferencesWidget = () => {
    const [created, setCreated] = useState<Reference[]>();
    const [createdId, setCreatedId] = useState<number[]>([]);


    const fetchRefs = async () => {
        const res = await searchReference({
            filter: {},
            sorting: { sortBy: "ID", sortDirection: "DESC" },
            pageRequest: { page: 0, limit: 100 }
        })
        setCreated(res?.content)
    }

    const createRef = (data: ReferenceRequest) => async () => {
        try {
            await createReference(data)
            Notify.ShowSuccess("Created Successfully")
            setCreatedId(prev => data.id ? [...prev, data.id] : prev)
        } catch (error) {
            handleAxiosError(error, true)
        }
    }

    useEffect(() => {
        fetchRefs()
    }, [createdId])

    return (
        <ScrollArea p={32} h="100vh">
            <Grid>
                {defaultReferenceItemsForCreate.map((el) => {
                    const isCreated = created?.map(el => el.titleEn).includes(el?.titleEn || "")
                    return (
                        <Grid.Col h="100%"
                            span={{ base: 12, sm: 6, md: 4, lg: 3 }} c="white" key={el.id}>
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
                                    onClick={createRef(el)}
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
