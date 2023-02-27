import React, { useEffect, useMemo, useState } from "react";
import request from "../../utils/Request";
import "./index.scss";
import notify from "../../utils/notification";
import useSWR from "swr";
import { motion } from "framer-motion";

const Index = ({ worldKey, name }: any) => {
    const { data, error, isLoading } = useSWR(`https://vrchat.com/api/1/worlds/${worldKey}`, requestLocation);
    const [load, setLoad] = useState(false);
    async function requestLocation(url: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (!worldKey || worldKey === "private") {
                reject("");
                return;
            }
            const res = await request(url);
            if (/just H|Shangri-La/.test(res.name)) {
                notify({ body: `好友${name}正在公开房开银趴` });
            }
            resolve(res);
        });
    }

    const handleLoadImage = () => {
        setLoad(true);
    };

    if (worldKey === "private") {
        return <div className="private-location">私人房,状态不可知</div>;
    }

    if (isLoading) {
        return <div>loading...</div>;
    }
    if (!data) {
        return null;
    }

    return (
        <motion.div initial={{ opacity: load ? 1 : 0 }} animate={{ opacity: load ? 1 : 0 }} className="friend-location">
            <img loading="lazy" onLoad={handleLoadImage} className="location-pic" src={data?.imageUrl} alt="" />
            <div className="location-name">{data?.name}</div>
        </motion.div>
    );
};

export default Index;
