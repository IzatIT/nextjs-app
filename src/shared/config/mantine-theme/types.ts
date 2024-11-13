import {
    DefaultMantineColor,
    MantineBreakpoint,
    MantineColorsTuple,
    MantineFontSize,
} from "@mantine/core";
import { ReactNode } from "react";

type extendedCustomColors =
    | "primary"
    | "secondary"
    | "thirdly"
    | "fourly"
    | "primaryDark"
    | "primaryWhite"
    | "secondaryDark"
    | "secondaryWhite"
    | "thirdlyWhite"
    | "thirdlyDark"
    | "darkSecondaryText"
    | "darkTitles"
    | DefaultMantineColor;

type extendedCustomSizes = "xs" | "2xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
type extendedCustomBreakpoints = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

declare module "@mantine/core" {
    export interface MantineThemeColorsOverride {
        colors: Record<extendedCustomColors, MantineColorsTuple>;
    }
    export interface MantineThemeFontSizesOverride {
        fontSizes: Record<extendedCustomSizes, MantineFontSize>;
    }
    export interface MantineThemeBreakpointsOverride {
        breakpoints: Record<extendedCustomBreakpoints, MantineBreakpoint>;
    }
}

export type AppThemeProviderProps = {
    children: ReactNode;
}


export type themeType = "light" | "dark"
export type variantType = {
    variant: string
}