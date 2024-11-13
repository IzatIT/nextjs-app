"use client"
import { COLORS } from '@/constants';
//@ts-ignore
import { AudioPlayer } from 'react-audio-player-component';

type Props = {
    src: string
}

export const AppAudioPlayer = ({ src }: Props) => {
    return (
        <AudioPlayer
            src={src}
            minimal={false}
            width="100%"
            trackHeight={60}
            barWidth={2}
            gap={1}
            visualise={true}
            backgroundColor={COLORS.PRIMARY_COLOR}
            barColor="#C1D0B5"
            barPlayedColor="#99A98F"
            skipDuration={2}
            showLoopOption={true}
            showVolumeControl={true}
            seekBarColor="purple"
            volumeControlColor={COLORS.PRIMARY_COLOR}
        />
    )
}
