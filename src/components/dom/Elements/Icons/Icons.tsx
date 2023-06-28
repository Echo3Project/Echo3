import { ReactElement } from 'react';

import { SVG } from './SVG';

type Props = JSX.IntrinsicElements['svg'] & {
    color: string;
};

export function ConnectionIcon({ color, ...props }: Props): ReactElement {
    return (
        <SVG color={color} {...props}>
            <ellipse
                cx="1.28579"
                cy="1.25006"
                rx="1.28579"
                ry="1.25006"
                transform="matrix(-1 0 0 1 36 25.5)"
                fill="currentColor"
            />
            <ellipse
                cx="1.28579"
                cy="1.25006"
                rx="1.28579"
                ry="1.25006"
                transform="matrix(-1 0 0 1 2.57227 25.5)"
                fill="currentColor"
            />
            <ellipse
                cx="1.28579"
                cy="1.25006"
                rx="1.28579"
                ry="1.25006"
                transform="matrix(-1 0 0 1 36 8)"
                fill="currentColor"
            />
            <ellipse
                cx="1.28579"
                cy="1.25006"
                rx="1.28579"
                ry="1.25006"
                transform="matrix(-1 0 0 1 2.57227 8)"
                fill="currentColor"
            />
            <ellipse
                cx="11.5651"
                cy="24.2305"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="11.5651"
                cy="26.7501"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="14.1295"
                cy="24.2305"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="14.1295"
                cy="26.7501"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="14.1295"
                cy="21.7657"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="16.7135"
                cy="24.2305"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="16.7135"
                cy="26.7501"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="16.7135"
                cy="21.7657"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="16.7135"
                cy="16.7383"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="16.7135"
                cy="14.2422"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="14.1295"
                cy="14.2422"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="21.86"
                cy="14.2422"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="21.86"
                cy="11.7735"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="14.1295"
                cy="11.7735"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="19.2682"
                cy="14.2422"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="19.2682"
                cy="16.7383"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="19.2682"
                cy="11.7735"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="19.2682"
                cy="9.25006"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="16.7135"
                cy="11.7735"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="16.7135"
                cy="9.25006"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="19.2682"
                cy="24.2305"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="19.2682"
                cy="26.7501"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="19.2682"
                cy="21.7657"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="21.86"
                cy="21.7657"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="21.86"
                cy="24.2305"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="24.4166"
                cy="24.2305"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="21.86"
                cy="26.7501"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
            <ellipse
                cx="24.4166"
                cy="26.7501"
                rx="1.28579"
                ry="1.25006"
                fill="currentColor"
            />
        </SVG>
    );
}

export function ContributionIcon({ color, ...props }: Props): ReactElement {
    return (
        <SVG color={color} {...props}>
            <circle cx="18" cy="30" r="2" fill="currentColor" />
            <circle cx="14" cy="30" r="2" fill="currentColor" />
            <circle cx="22" cy="18" r="2" fill="currentColor" />
            <circle cx="18" cy="18" r="2" fill="currentColor" />
            <circle cx="18" cy="14" r="2" fill="currentColor" />
            <circle cx="14" cy="18" r="2" fill="currentColor" />
            <circle cx="22" cy="30" r="2" fill="currentColor" />
            <circle cx="26" cy="26" r="2" fill="currentColor" />
            <circle cx="30" cy="22" r="2" fill="currentColor" />
            <circle cx="30" cy="18" r="2" fill="currentColor" />
            <circle cx="30" cy="14" r="2" fill="currentColor" />
            <circle cx="26" cy="10" r="2" fill="currentColor" />
            <circle
                cx="2"
                cy="2"
                r="2"
                transform="matrix(-1 0 0 1 12 24)"
                fill="currentColor"
            />
            <circle
                cx="2"
                cy="2"
                r="2"
                transform="matrix(-1 0 0 1 8 20)"
                fill="currentColor"
            />
            <circle
                cx="2"
                cy="2"
                r="2"
                transform="matrix(-1 0 0 1 8 16)"
                fill="currentColor"
            />
            <circle
                cx="2"
                cy="2"
                r="2"
                transform="matrix(-1 0 0 1 8 12)"
                fill="currentColor"
            />
            <circle
                cx="2"
                cy="2"
                r="2"
                transform="matrix(-1 0 0 1 12 8)"
                fill="currentColor"
            />
            <circle cx="22" cy="6" r="2" fill="currentColor" />
            <circle cx="18" cy="6" r="2" fill="currentColor" />
            <circle cx="14" cy="6" r="2" fill="currentColor" />
            <circle cx="18" cy="22" r="2" fill="currentColor" />
        </SVG>
    );
}

export function BellIcon({ color, ...props }: Props): ReactElement {
    return (
        <SVG color={color} {...props}>
            <circle cx="14" cy="25" r="2" fill="currentColor" />
            <circle
                cx="2"
                cy="2"
                r="2"
                transform="matrix(-1 0 0 1 20 29)"
                fill="currentColor"
            />
            <circle
                cx="2"
                cy="2"
                r="2"
                transform="matrix(-1 0 0 1 16 29)"
                fill="currentColor"
            />
            <circle
                cx="2"
                cy="2"
                r="2"
                transform="matrix(-1 0 0 1 24 29)"
                fill="currentColor"
            />
            <circle cx="10" cy="25" r="2" fill="currentColor" />
            <circle cx="14" cy="21" r="2" fill="currentColor" />
            <circle cx="18" cy="25" r="2" fill="currentColor" />
            <circle cx="22" cy="21" r="2" fill="currentColor" />
            <circle cx="22" cy="13" r="2" fill="currentColor" />
            <circle cx="14" cy="17" r="2" fill="currentColor" />
            <circle cx="22" cy="17" r="2" fill="currentColor" />
            <circle cx="14" cy="13" r="2" fill="currentColor" />
            <circle cx="22" cy="25" r="2" fill="currentColor" />
            <circle cx="26" cy="25" r="2" fill="currentColor" />
            <circle cx="18" cy="9" r="2" fill="currentColor" />
            <circle cx="30" cy="5" r="2" fill="currentColor" />
            <circle cx="34" cy="9" r="2" fill="currentColor" />
            <circle
                cx="2"
                cy="2"
                r="2"
                transform="matrix(-1 0 0 1 8 3)"
                fill="currentColor"
            />
            <circle
                cx="2"
                cy="2"
                r="2"
                transform="matrix(-1 0 0 1 4 7)"
                fill="currentColor"
            />
        </SVG>
    );
}

export function ProjectIcon({ color, ...props }: Props): ReactElement {
    return (
        <SVG color={color} {...props}>
            <circle cx="14" cy="16" r="2" fill="currentColor" />
            <circle cx="26" cy="8" r="2" fill="currentColor" />
            <circle cx="6" cy="24" r="2" fill="currentColor" />
            <circle cx="10" cy="12" r="2" fill="currentColor" />
            <circle cx="18" cy="12" r="2" fill="currentColor" />
            <circle cx="14" cy="8" r="2" fill="currentColor" />
            <circle cx="14" cy="12" r="2" fill="currentColor" />
            <circle cx="22" cy="24" r="2" fill="currentColor" />
            <circle cx="30" cy="24" r="2" fill="currentColor" />
            <circle cx="26" cy="24" r="2" fill="currentColor" />
            <circle cx="26" cy="20" r="2" fill="currentColor" />
            <circle cx="26" cy="28" r="2" fill="currentColor" />
        </SVG>
    );
}

export function ListIcon({ color, ...props }: Props): ReactElement {
    return (
        <SVG color={color} {...props}>
            <ellipse
                cx="8.00151"
                cy="17.9994"
                rx="1.99956"
                ry="1.99938"
                fill="currentColor"
            />
            <ellipse
                cx="8.00151"
                cy="25.9994"
                rx="1.99956"
                ry="1.99938"
                fill="currentColor"
            />
            <ellipse
                cx="16.0015"
                cy="17.9994"
                rx="1.99956"
                ry="1.99938"
                fill="currentColor"
            />
            <ellipse
                cx="16.0015"
                cy="25.9994"
                rx="1.99956"
                ry="1.99938"
                fill="currentColor"
            />
            <ellipse
                cx="19.9976"
                cy="17.9994"
                rx="1.99956"
                ry="1.99938"
                fill="currentColor"
            />
            <ellipse
                cx="23.9976"
                cy="9.99938"
                rx="1.99956"
                ry="1.99938"
                fill="currentColor"
            />
            <ellipse
                cx="8.00151"
                cy="9.99938"
                rx="1.99956"
                ry="1.99938"
                fill="currentColor"
            />
            <ellipse
                cx="19.9976"
                cy="9.99938"
                rx="1.99956"
                ry="1.99938"
                fill="currentColor"
            />
            <ellipse
                cx="16.0015"
                cy="9.99938"
                rx="1.99956"
                ry="1.99938"
                fill="currentColor"
            />
            <ellipse
                cx="19.9976"
                cy="25.9994"
                rx="1.99956"
                ry="1.99938"
                fill="currentColor"
            />
            <ellipse
                cx="23.9976"
                cy="17.9994"
                rx="1.99956"
                ry="1.99938"
                fill="currentColor"
            />
            <ellipse
                cx="27.9976"
                cy="17.9994"
                rx="1.99956"
                ry="1.99938"
                fill="currentColor"
            />
        </SVG>
    );
}

export function CrossIcon({ color, ...props }: Props): ReactElement {
    return (
        <SVG color={color} {...props}>
            <path
                d="M11.9988 13.4008L7.09883 18.3008C6.91549 18.4841 6.68216 18.5758 6.39883 18.5758C6.11549 18.5758 5.88216 18.4841 5.69883 18.3008C5.51549 18.1174 5.42383 17.8841 5.42383 17.6008C5.42383 17.3174 5.51549 17.0841 5.69883 16.9008L10.5988 12.0008L5.69883 7.10078C5.51549 6.91745 5.42383 6.68411 5.42383 6.40078C5.42383 6.11745 5.51549 5.88411 5.69883 5.70078C5.88216 5.51745 6.11549 5.42578 6.39883 5.42578C6.68216 5.42578 6.91549 5.51745 7.09883 5.70078L11.9988 10.6008L16.8988 5.70078C17.0822 5.51745 17.3155 5.42578 17.5988 5.42578C17.8822 5.42578 18.1155 5.51745 18.2988 5.70078C18.4822 5.88411 18.5738 6.11745 18.5738 6.40078C18.5738 6.68411 18.4822 6.91745 18.2988 7.10078L13.3988 12.0008L18.2988 16.9008C18.4822 17.0841 18.5738 17.3174 18.5738 17.6008C18.5738 17.8841 18.4822 18.1174 18.2988 18.3008C18.1155 18.4841 17.8822 18.5758 17.5988 18.5758C17.3155 18.5758 17.0822 18.4841 16.8988 18.3008L11.9988 13.4008Z"
                fill="currentColor"
            />
        </SVG>
    );
}

export function ShareIcon({ color, ...props }: Props): ReactElement {
    return (
        <SVG color={color} {...props}>
            <ellipse
                cx="7.75156"
                cy="1.86178"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="7.75156"
                cy="8.04342"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="7.75156"
                cy="11.1333"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="7.92343"
                cy="14.4028"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="13.9703"
                cy="13.1938"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="13.9703"
                cy="16.2856"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="10.9469"
                cy="19.3774"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="13.9703"
                cy="19.3774"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="7.92343"
                cy="19.3774"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="4.9"
                cy="19.3774"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="1.87656"
                cy="19.3774"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="1.70468"
                cy="16.1079"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="1.87656"
                cy="13.1938"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="5.73593"
                cy="3.92233"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="9.76718"
                cy="3.92233"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="3.72031"
                cy="5.98288"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
            <ellipse
                cx="11.7828"
                cy="5.98288"
                rx="1.34531"
                ry="1.37545"
                fill="currentColor"
            />
        </SVG>
    );
}

export function FollowIcon({ color, ...props }: Props): ReactElement {
    return (
        <SVG
            color={color}
            {...props}
            width="15"
            height="25"
            viewBox="0 0 15 25"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="10.3333" cy="13.3333" r="1.33333" fill="currentColor" />
            <circle cx="10.3333" cy="17.8333" r="1.33333" fill="currentColor" />
            <circle cx="4.33333" cy="13.3333" r="1.33333" fill="currentColor" />
            <circle cx="4.33333" cy="17.8333" r="1.33333" fill="currentColor" />
            <circle cx="7.33333" cy="13.3333" r="1.33333" fill="currentColor" />
            <circle cx="7.33333" cy="17.8333" r="1.33333" fill="currentColor" />
            <circle cx="1.33333" cy="13.3333" r="1.33333" fill="currentColor" />
            <circle cx="13.3333" cy="13.3333" r="1.33333" fill="currentColor" />
            <circle cx="1.33333" cy="10.3333" r="1.33333" fill="currentColor" />
            <circle cx="1.33333" cy="7.33333" r="1.33333" fill="currentColor" />
            <circle cx="4.33333" cy="4.33333" r="1.33333" fill="currentColor" />
            <circle cx="7.33333" cy="4.33333" r="1.33333" fill="currentColor" />
            <circle cx="7.33333" cy="1.33333" r="1.33333" fill="currentColor" />
            <circle cx="13.3333" cy="10.3333" r="1.33333" fill="currentColor" />
            <circle cx="13.3333" cy="7.33333" r="1.33333" fill="currentColor" />
            <circle cx="10.3333" cy="4.33333" r="1.33333" fill="currentColor" />
            <circle cx="15.3333" cy="1.33333" r="1.33333" fill="currentColor" />
            <circle cx="17.3333" cy="3.33333" r="1.33333" fill="currentColor" />
        </SVG>
    );
}
