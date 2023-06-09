import { useLoader } from '@react-three/fiber';
import { memo, useMemo } from 'react';
import { Float32BufferAttribute, PointsMaterial, TextureLoader } from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

type Props = {
    plyPath: string;
    texturePath: string;
};

export const CloudPoints = memo(function CloudPoints({
    plyPath,
    texturePath,
}: Props) {
    const plyData = useLoader(PLYLoader, plyPath);
    const texture = useLoader(TextureLoader, texturePath);
    const geometry = useMemo(() => plyData, [plyData]);

    const colors = useMemo(() => {
        const colorsArray: number[] = [];
        console.log('geometry.attributes.color', geometry.attributes.color);
        console.log('geometry.attributes', geometry.attributes);

        const positionAttribute = geometry.attributes
            .position as Float32BufferAttribute;
        // const uvAttribute = geometry.attributes.color as Float32BufferAttribute;
        console.log('positionAttribute', positionAttribute);

        // if (!positionAttribute || !uvAttribute) {
        //     return colorsArray;
        // }

        // console.log('positionAttribute', positionAttribute);

        // for (let i = 0; i < positionAttribute.count; i++) {
        //     const color = new Color();
        //     const uvX = uvAttribute.getX(i);
        //     const uvY = uvAttribute.getY(i);
        //     color.setRGB(uvX, uvY, 0);
        //     colorsArray.push(color.r, color.g, color.b);
        // }

        return colorsArray;
    }, [geometry]);

    // const colorAttribute = useMemo(
    //     () => new Float32BufferAttribute(colors, 3),
    //     [colors],
    // );

    const material = useMemo(
        () => new PointsMaterial({ map: texture, size: 5, vertexColors: true }),
        [texture],
    );

    // geometry.setAttribute('color', colorAttribute);

    return <points geometry={geometry} material={material} />;
});
