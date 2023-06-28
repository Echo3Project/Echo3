import {
    createContext,
    Dispatch,
    PropsWithChildren,
    ReactElement,
    SetStateAction,
    useState,
} from 'react';

type Props = PropsWithChildren;

type ReturnType = {
    playing: boolean;
    setPlaying: Dispatch<SetStateAction<boolean>>;
};

export const Audio = createContext<ReturnType>({
    playing: false,
    setPlaying: () => {},
});

export default function AudioProvider({ children }: Props): ReactElement {
    const [playing, setPlaying] = useState<boolean>(false);

    return (
        <Audio.Provider value={{ playing, setPlaying }}>
            {children}
        </Audio.Provider>
    );
}
