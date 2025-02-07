import { ImageResponse } from 'next/og';

export default async function Image(): Promise<ImageResponse> {

    return new ImageResponse(
        <div
            style={{
                width: '1200px',
                height: '600px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                fontSize: '35px',
                padding: '50px',
                color: '#000',
                textAlign: 'center',
                overflow: 'hidden',
            }}
        >
            <h2
                style={{
                    marginBottom: "0px",
                    paddingBottom: "20px",
                }}
            >
                Welcome Back! Log In to Your Account
            </h2>
            <span
                style={{
                    color: "#252525",
                    fontSize: "15px",
                    textAlign: "center",
                }}
            >
                {`
                   Access your account and enjoy a seamless, secure, and personalized experience. Log in now to manage your settings, explore exclusive features, and stay connected. Your journey starts here!
                `}
            </span>
        </div>,
        {
            width: 1200,
            height: 600,
        }
    );
}
