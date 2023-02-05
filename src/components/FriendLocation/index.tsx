import React, { useEffect, useMemo, useState } from "react";
import request from "../../utils/Request";
import "./index.scss";
import notify from "../../utils/notification";

const Index = ({ worldKey }: any) => {
    const [locationData, setLocationData] = useState<any>(null);
    const ifLocation = useMemo(() => {
        return worldKey !== "offline" && worldKey !== "private" && worldKey !== "traveling";
    }, [worldKey]);

    useEffect(() => {
        if (ifLocation) {
            request(`https://vrchat.com/api/1/worlds/${worldKey.split(":")[0]}`).then(res => {
                setLocationData(res);
                if (/(just H|Shangri-La)/.test(res.name)) {
                    notify({ body: "有好友正在公开房开银趴" });
                }
            });
        }
    }, [worldKey]);

    if (!ifLocation) return null;

    return (
        <div className="friend-location">
            <img className="location-pic" src={locationData?.imageUrl} alt="" />
            <div className="location-name">{locationData?.name}</div>
        </div>
    );
};

export default Index;
