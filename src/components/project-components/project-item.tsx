import React, { useEffect, useState } from "react";
import Icon from "./icon-project";
import '/src/styles/projects/project-item.scss';

interface ProjectData
{
    title: string;
    imagePath: string;
    content: string;
    alt: string;
    dataToFetch: string;
    warningContent: boolean;
    engine: string;
}

interface ProjectItemProps
{
    index: number;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ index }) =>
{
    const [itemData, setItemData] = useState<ProjectData | null>(null);
    const [dataToFetch, setDataToFetch] = useState<string>("");
    const [isUnity, setIsUnity] = useState<boolean>(true);

    const isWarningContent = itemData?.warningContent;
    const isOnUnity = itemData?.engine;

    useEffect(() =>
    {
        fetch("/data/project-data.json")
        .then((response) =>
        {
            if (!response.ok)
                throw new Error("Network response was not ok");

            return response.json();
        })
        .then((data) =>
        {
            const itemFound = data[index];

            if (itemFound)
            {
                setItemData(itemFound[0]);
                setDataToFetch(itemFound[0].dataToFetch);

                if (isOnUnity === "Unreal Engine")
                    setIsUnity(false);
                else
                    setIsUnity(true);
            }
            else
                console.error("Item not found:", index);
        })
        .catch((error: any) => {
            console.error("Error fetching item data:", error.message);
        });

    }, [index, dataToFetch]);

    function SetDataToFetch() : void
    {
        if (itemData)
        {
            setDataToFetch(itemData.dataToFetch);

            sessionStorage.removeItem("dataToFetch");
            sessionStorage.setItem("dataToFetch", dataToFetch);
        }
    }

    return (
        <div className={isWarningContent ? "content-warning" : ""}>
            <div className="project-image">
                <a href={isWarningContent ? "/" : "/project"} onClick={SetDataToFetch}>
                    <img src={itemData?.imagePath} alt={itemData?.alt} className="main-image"/>
                    <Icon IsUnity={isUnity} ClassName="logo"/>
                </a>
            </div>
            <div className="project-content">
                <div>
                    <h2>{itemData?.title}</h2>
                </div>
                <div>
                    <p>{itemData?.content}</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectItem;