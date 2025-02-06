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
                Create Your Account - Join Us Today!
            </h2>
            <span
                style={{
                    color: "#252525",
                    fontSize: "15px",
                    textAlign: "center",
                }}
            >
                {`
                    Join us today and create your account to unlock all the exclusive features we offer! 
                    By signing up, you'll enjoy a seamless and personalized experience, easy account management, 
                    and secure data storage. Get started now in just a few simple steps and make the most of what we have for you!
                `}
            </span>
        </div>,
        {
            width: 1200,
            height: 600,
        }
    );
}
