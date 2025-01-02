import ImageKit from "imagekit-javascript/dist/imagekit.cjs";

const imagekit = new ImageKit({
    publicKey: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
    urlEndpoint: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
});

// Upload function internally uses the ImageKit.io javascript SDK
const upload = async (file, fileName) => {
    const authenticationEndpoint = "http://localhost:3001/auth";
    const authResponse = await fetch(authenticationEndpoint, {
        method: "GET",
        // You can also pass headers and validate the request source in the backend, or you can use headers for any other use case.
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer your-access-token",
        },
    });

    if (!authResponse.ok) {
        throw new Error("Failed to fetch auth details");
    }

    const authData = await authResponse.json();

    imagekit.upload(
        {
            file: file.files[0],
            fileName: fileName,
            tags: ["tag1"],
            token: authData.token,
            signature: authData.signature,
            expire: authData.expire,
        },
        function (err, result) {
            console.log(
                imagekit.url({
                    src: result.url,
                    transformation: [{ height: 300, width: 400 }],
                })
            );
        }
    );
};

export default upload;
