'use client'
interface IProps {
    user: any
}
import { Card, CardBody, CardFooter, CardHeader, Chip, Image, Link } from "@heroui/react";

const DashboardMoreInfo = ({ user }: IProps) => {
    const { id, userEmail, Userimage, firstName, secondName, userName } = user
    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <Card radius="sm" shadow="none" className="">
                <CardHeader className="justify-between items-center">
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-3">
                            <h5 className="capitalize text-2xl font-semibold">
                                Skills
                            </h5>
                            <Link size="sm" href="/dashboard/skills" color="foreground" showAnchorIcon>Edit</Link>
                        </div>

                        <div className="flex flex-wrap items-center gap-1 my-2">
                            <Chip variant="solid" radius="sm" size="sm">HTML5</Chip>
                            <Chip variant="solid" radius="sm" size="sm">JavaScript</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Regex</Chip>
                            <Chip variant="solid" radius="sm" size="sm">jQuery</Chip>
                            <Chip variant="solid" radius="sm" size="sm">REDUX-Toolkit</Chip>
                            <Chip variant="solid" radius="sm" size="sm">TypeScript</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Tailwindcss</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Material UI</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Figma</Chip>
                            <Chip variant="solid" radius="sm" size="sm">CSS3</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Bootstrap</Chip>
                            <Chip variant="solid" radius="sm" size="sm">AJAX</Chip>
                            <Chip variant="solid" radius="sm" size="sm">React.js</Chip>
                            <Chip variant="solid" radius="sm" size="sm">SASS</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Next.js</Chip>
                            <Chip variant="solid" radius="sm" size="sm">NextUI</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Framer Motion</Chip>
                            <Chip variant="solid" radius="sm" size="sm">React Query</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Nodejs</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Axios</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Formik</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Mongodb</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Joy</Chip>
                            <Chip variant="solid" radius="sm" size="sm">ZOD</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Express.js</Chip>
                            <Chip variant="solid" radius="sm" size="sm">Yup</Chip>
                        </div>
                    </div>
                    {/* <div>
                        <Image
                            src={user?.Userimage?.url}
                            className="w-32  object-cover object-center "
                            radius="none"
                        />
                    </div> */}

                </CardHeader>

            </Card>
            <Card radius="sm" shadow="none" className="">
                <CardHeader className="justify-between items-center">
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-3">
                            <h5 className="capitalize text-2xl font-semibold">
                                About
                            </h5>
                            <Link size="sm" href="/dashboard/info" color="foreground" showAnchorIcon>Edit</Link>
                        </div>

                        <div className="flex flex-wrap items-center gap-1 my-2">
                            <p className="font-medium text-default-600">Full-stack developer with expertise in React.js, Next.js, and Node.js. With 2 years of experience, I specialize in creating responsive web applications and scalable backend solutions. I’m passionate about contributing to impactful and innovative projects.</p>
                        </div>
                    </div>
                    {/* <div>
                        <Image
                            src={user?.Userimage?.url}
                            className="w-32  object-cover object-center "
                            radius="none"
                        />
                    </div> */}

                </CardHeader>

            </Card>
        </div>
    </>;
};

export default DashboardMoreInfo;