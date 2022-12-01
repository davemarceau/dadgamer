import { useEffect, useRef } from "react";
import styled from "styled-components";

const UploadImage = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudname: "dewjaigjt",
            preset: "pbkm6qnq",
            sources: [ "local", "url"],
            multiple: false,
            clientAllowedFormats: ["images"],
            maxImageFileSize: 2000000
        }, (error, result) => {
            console.log(result);
            /*if (!error && result && result.event === "success") {
                //Step 2.4: Call the .close() method in order to close the widget
                state.live_profile_pic = result.info.secure_url
                myUploadWidget2.close();
            } else {
                console.log(error)
            }*/
        })
    }, [])

    return (
        <UploadButton onClick={() => widgetRef.current.open()} >Upload</UploadButton>
    )
}

const UploadButton = styled.button`
    background-color: var(--primaryblue);
    width: 80px;
    height: 35px;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);
    margin-top: auto;
    margin-left: auto;

    &:hover {
        background-color: var(--primaryhover);
    }

    &:disabled {
        background-color: var(--darkhover);
    }
`

export default UploadImage;