import {
    PointMaterial,
    Points,
    useCursor,
    useTexture,
} from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import {
    ReactElement,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Float32BufferAttribute, Points as TPoints } from 'three';

import { Filters } from '@/components/helpers/context/FiltersContext';
import { dataFormat } from '@/utils/types';

type Props = {
    row: number;
    column: number;
    projects: dataFormat[];
    count: number;
    context: CanvasRenderingContext2D;
    toggleShowProjectPanel: () => void;
    setClickedProjectData: (data: dataFormat) => void;
};

export default function Chunk({
    row,
    column,
    projects,
    context,
    count,
    toggleShowProjectPanel,
    setClickedProjectData,
}: Props): ReactElement {
    const pointsRef = useRef<TPoints>(null);
    const { active } = useContext(Filters);
    const [isHover, setIsHover] = useState<boolean>(false);
    useCursor(isHover);

    const texture = useTexture(
        `/models/textures/map/${column + 1}_${row + 1}.png`,
    );
    context.clearRect(0, 0, 64, 64);
    context.drawImage(texture.image as CanvasImageSource, 0, 0);
    const data = context.getImageData(0, 0, 64, 64).data;

    const tiles = useMemo(() => {
        const tiles = [];
        for (let y = 0; y < 64 * 4; y++) {
            for (let x = 0; x < 64; x++) {
                const idx = (64 * y + x) << 2;
                if (
                    (data[idx + 0] +
                        data[idx + 1] +
                        data[idx + 2] +
                        data[idx + 3]) /
                        (255 * 4) ===
                    1
                ) {
                    tiles.push({ x: x, y: y });
                }
            }
        }
        return tiles;
    }, [data]);

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        let i = 0;
        for (let ix = 1; ix <= tiles.length - 1; ix++) {
            positions[i] = tiles[ix].x * 16 - 64 * 32;
            positions[i + 1] = 0;
            // if(active.length === 0) positions[i + 1] = 0;
            // else {
            //     positions[i + 1] = Number(useSpring({ x: (projects[i % projects.length]?.tags as string[]).some((r) =>
            //         active.includes(r),
            //     ) ||
            //     (projects[i % projects.length]?.fields as string[]).some((r) =>
            //         active.includes(r),
            //     ) ? 2 : 0 }).x)
            // }
            positions[i + 2] = tiles[ix].y * 16 - 64 * 16;
            i += 3;
        }
        pointsRef.current?.geometry.computeBoundingBox();
        pointsRef.current?.geometry.computeBoundingSphere();
        return positions;
    }, [count, tiles]);

    const colors = useMemo(() => {
        const colors = new Float32Array(count * 4).fill(0.9);
        let i = 0;
        for (let ix = 1; ix <= tiles.length - 1; ix++) {
            colors[i] = 0.9;
            colors[i + 1] = 0.9;
            colors[i + 2] = 0.9;
            colors[i + 3] =
                active.length === 0 ||
                (projects[i % projects.length]?.tags as string[]).some((r) =>
                    active.includes(r),
                ) ||
                (projects[i % projects.length]?.fields as string[]).some((r) =>
                    active.includes(r),
                )
                    ? 1
                    : 0.3;
            i += 4;
        }
        return colors;
    }, [count, active, projects, tiles.length]);

    useEffect(() => {
        if (pointsRef.current) {
            const colorsAttribute = new Float32BufferAttribute(colors, 4);
            pointsRef.current?.geometry.setAttribute('color', colorsAttribute);
            pointsRef.current.geometry.attributes.color.needsUpdate = true;
        }
    }, [colors]);

    function clicked(e: ThreeEvent<MouseEvent>): void {
        if (
            !e.index ||
            !pointsRef.current ||
            (
                pointsRef.current.geometry.attributes
                    .color as Float32BufferAttribute
            ).getX(e.index) < 0.5
        )
            return;
        toggleShowProjectPanel();
        setClickedProjectData(projects[e.index % projects.length]);
    }

    function hovered(e: ThreeEvent<MouseEvent>, isOver: boolean): void {
        if (!e.index || !pointsRef.current) return;
        const alpha = (
            pointsRef.current.geometry.attributes
                .color as Float32BufferAttribute
        ).getW(e.index);
        if (alpha < 0.4) return;
        const value = isOver ? 3 : 0.9;
        setIsHover(active.length !== 0 ? isOver : false);
        (
            pointsRef.current.geometry.attributes
                .color as Float32BufferAttribute
        ).setXYZW(e.index, value, value, value, 1);
        pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }

    return (
        <>
            <Points
                positions={positions}
                rotation-y={Math.PI / 2}
                ref={pointsRef}
                limit={64 * 64}
                onClick={(e): void => clicked(e)}
                onPointerOver={(e): void => hovered(e, true)}
                onPointerOut={(e): void => hovered(e, false)}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={14}
                    sizeAttenuation={true}
                    depthWrite={true}
                    toneMapped={false}
                />
            </Points>
        </>
    );
}
