"use client"
import { AspectRatio, Box } from "@mantine/core";
import { CSSProperties } from "react";
import styles from "./iframe.module.scss";

type Props = {
    width: string | number;
    src: string;
    style?: CSSProperties;
    aspectRatio?: number
}

export const AppIframe = ({
    width,
    src,
    style,
    aspectRatio
}: Props) => {


    return (
        <AspectRatio ratio={aspectRatio} w={width}>
            <iframe
                style={style}
                width="100%" height="100%" src={src} frameBorder="0"></iframe>
        </AspectRatio>
    )
}
