import { useEffect, useState } from "react";
// import Presentation from "./presentation";
import '/src/styles/projects/main.scss';

interface MainProps
{
    title: string;
}

const Main = () => {
    const [itemData, setItemData] = useState<MainProps | null>(null);

    const dataToFecth = sessionStorage.getItem("dataToFetch");

    useEffect(() =>
    {
        if (!dataToFecth) return;

        fetch(dataToFecth)
        .then((response) =>
        {
            if (!response.ok)
                throw new Error("Network response was not ok");

            return response.json();
        })
        .then ((data) =>
        {
            setItemData({title : data.title});
        })
        .catch((error: any) => {
            console.error("Error fetching item data:", error.message);
        });
        
    }, []);

    return (
        <main>
            <h1 id="title-project">{itemData?.title}</h1>
            {/* <Presentation /> */}
        </main>
    );
};

export default Main;