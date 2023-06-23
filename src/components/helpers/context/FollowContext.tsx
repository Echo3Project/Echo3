import {
    createContext,
    Dispatch,
    PropsWithChildren,
    ReactElement,
    SetStateAction,
    useContext,
    useState,
} from 'react';

type Props = PropsWithChildren;

type ReturnType = {
    followedProjects: string[];
    setFollowedProjects: Dispatch<SetStateAction<string[]>>;
};
const FollowContext = createContext({
    followedProjects: [] as string[],
    setFollowedProjects: () => {},
} as ReturnType);

export const FollowProvider = ({ children }: Props): ReactElement => {
    const [followedProjects, setFollowedProjects] = useState(
        (): string[] => [],
    );

    return (
        <FollowContext.Provider
            value={{ followedProjects, setFollowedProjects }}>
            {children}
        </FollowContext.Provider>
    );
};

export const useFollow = (): ReturnType => useContext(FollowContext);
