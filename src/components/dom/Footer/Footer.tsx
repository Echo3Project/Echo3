import React from 'react';

export function Footer(): ReactElement {
    return (
        <>
            <div
                className="w-screen flex items-center justify-between z-10 text-black-app font-jwsans uppercase text-xs p-4"
                style={{
                    backgroundColor: '#E9E9E9',
                    height: '50px',
                }}>
                <span>Hubble ©</span>
                <div className="flex gap-4">
                    <div
                        style={{
                            backgroundImage: 'url(/icons/discord.svg)',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width: '22px',
                            height: '18px',
                        }}
                    />
                    <div
                        style={{
                            backgroundImage: 'url(/icons/twitter.svg)',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width: '22px',
                            height: '18px',
                        }}
                    />
                </div>
            </div>
        </>
    );
}
