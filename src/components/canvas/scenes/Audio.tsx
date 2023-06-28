import { PositionalAudio } from '@react-three/drei';
import { ReactElement, useContext, useEffect, useRef } from 'react';
import { Audio as AudioT } from 'three';

import { Audio as AudioContext } from '@/components/helpers/context/AudioContext';

export default function Audio(): ReactElement {
    const audio = useRef<AudioT>(null);
    const { playing } = useContext(AudioContext);

    useEffect(() => {
        if (audio.current && playing) {
            if (audio.current.context.state === 'suspended')
                void audio.current.context.resume();
            if (!audio.current.isPlaying) audio.current.play();
        } else {
            void audio.current?.pause();
        }
    }, [playing]);

    return (
        <PositionalAudio
            ref={audio}
            autoplay
            url="/sounds/environment.mp3"
            distance={100}
            loop
        />
    );
}
