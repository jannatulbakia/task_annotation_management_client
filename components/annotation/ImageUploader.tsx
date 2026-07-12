"use client";

import { ChangeEvent } from "react";

import { uploadImage } from "@/services/annotation";

import { useAnnotationStore } from "@/store/annotationStore";

export default function ImageUploader() {

    const addImage = useAnnotationStore(
        state => state.addImage
    );

    const handleUpload = async (

        e: ChangeEvent<HTMLInputElement>

    ) => {

        if (!e.target.files?.length) return;

        try {

            const image = await uploadImage(

                e.target.files[0]

            );

            addImage(image);

        }

        catch (err) {

            console.error(err);

            alert("Upload failed");

        }

    };

    return (

        <div className="mb-6">

            <label
                className="
                cursor-pointer
                rounded-lg
                bg-blue-600
                px-5
                py-3
                text-white
                hover:bg-blue-700
                inline-block
                "
            >

                Upload Image

                <input

                    type="file"

                    accept=".png,.jpg,.jpeg"

                    onChange={handleUpload}

                    hidden

                />

            </label>

        </div>

    );

}