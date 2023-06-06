import piston from "piston-client";

const sendFile = async (language, content) => {
    const client = piston({ server: "https://emkc.org" });
    const result = await client.execute(language, content);
    return result
}

export default sendFile