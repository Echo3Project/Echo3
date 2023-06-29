import clsx from 'clsx';
import { ReactElement, useContext } from 'react';

import { Audio } from '@/components/helpers/context/AudioContext';

export default function SoundButton(): ReactElement {
    const { playing, setPlaying } = useContext(Audio);
    const clxsButton = clsx(
        'pointer-events-auto h-10 w-10',
        playing ? 'bg-soundOn' : 'bg-soundOff',
    );

    return (
        <button
            className={clxsButton}
            onClick={(): void => setPlaying(!playing)}></button>
    );
}
