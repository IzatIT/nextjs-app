"use client"
import { COLORS } from "@/constants";
import {
    type ISourceOptions,
    MoveDirection,
    OutMode
} from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { useEffect, useMemo, useState } from "react";

type Props = {
    color?: string;
}

export const AuthParticles = ({ color = COLORS.PRIMARY_COLOR }: Props) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: COLORS.PRIMARY_BG,
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 0.4
                        }
                    },

                    repulse: {
                        distance: 150,
                        duration: 10,
                    },
                },
            },
            particles: {
                color: {
                    value: color,
                },
                links: {
                    color: color,
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: {
                        default: OutMode.out,
                    },
                    random: true,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 250,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",

                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                options={options}
            />
        );
    }

    return <></>;
};