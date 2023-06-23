import { Sparkles } from '@react-three/drei';
import { memo, ReactElement } from 'react';

export const MemoizedSparkles = memo(function MemoizedSparkles(): ReactElement {
    return (
        <group renderOrder={2000}>
            <Sparkles
                opacity={4}
                scale={[8000, 2000, 8000]}
                size={512}
                count={1024}
                color={0xb6ee6a}
            />
        </group>
    );
});
