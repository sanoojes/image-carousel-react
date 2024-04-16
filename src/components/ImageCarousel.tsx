import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Props {
    url: string;
    limit: number;
    page: number;
}

interface ImageData {
    download_url: string;
    id: string;
}

const ImageCarousel = ({ url, limit = 5, page = 1 }: Props) => {
    const [image, setImage] = useState<Array<ImageData>>([]);
    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [getErrMsg, setErrMsg] = useState<string>("");

    useEffect(() => {
        async function fetchImages() {
            try {
                setLoading(true);

                const response = await fetch(
                    `${url}?page=${page}&limit=${limit}`
                );
                const data: ImageData[] = await response.json();
                if (data) {
                    setImage(data);
                    setLoading(false);
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setErrMsg(e.message);
                } else {
                    setErrMsg("An unknown error occurred");
                }
                setLoading(false);
            }
        }
        if (url !== "") {
            fetchImages();
        }
    }, [limit, page, url]);

    console.log(image);

    if (loading) {
        return <div>Loading ......</div>;
    }

    if (getErrMsg) {
        return <div>Error Occoured : {getErrMsg}</div>;
    }

    function handleNext() {
        setCurrentIdx(currentIdx === image.length - 1 ? 0 : currentIdx + 1);
    }

    function handlePrev() {
        setCurrentIdx(currentIdx === 0 ? image.length - 1 : currentIdx - 1);
    }

    return (
        <>
            <div className="flex text-slate-100 relative w-10/12 items-center">
                <FaArrowLeft
                    className="left-2 w-8 h-8  p-2 rounded-full bg-slate-600 absolute"
                    onClick={handlePrev}
                />

                {image && image.length > 0
                    ? image.map((imgUrl: ImageData, idx: number) => (
                          <img
                              src={imgUrl.download_url}
                              key={imgUrl.id}
                              className={
                                  currentIdx === idx
                                      ? "flex visible rounded-lg border-2 border-gray-600"
                                      : "hidden collapse"
                              }
                          />
                      ))
                    : null}

                <FaArrowRight
                    className="right-2 w-8 h-8  p-2 rounded-full bg-slate-600 absolute"
                    onClick={handleNext}
                />

                <span className="flex gap-2 justify-center absolute w-full bottom-2">
                    {image && image.length
                        ? image.map((_, idx) => (
                              <button
                                  key={idx}
                                  className={
                                      idx === currentIdx
                                          ? "bg-gray-400 w-4 h-4 rounded-full border-2 border-gray-500"
                                          : "bg-gray-700 w-4 h-4 rounded-full border-2 border-gray-400"
                                  }
                              ></button>
                          ))
                        : null}
                </span>
            </div>
        </>
    );
};

export default ImageCarousel;
