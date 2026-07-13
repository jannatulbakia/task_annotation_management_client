"use client";

import { ChangeEvent } from "react";
import { Upload } from "lucide-react";

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
                inline-flex
                cursor-pointer
                items-center
                gap-2
                rounded-lg
                bg-[#1F6F4A]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#195c3d]
                "
            >
                <Upload size={17} />
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