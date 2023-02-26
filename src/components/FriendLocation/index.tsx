import React, { useEffect, useMemo, useState } from "react";
import request from "../../utils/Request";
import "./index.scss";
import notify from "../../utils/notification";
import useSWR from 'swr';
import { motion } from "framer-motion";


const Index = ({ worldKey, name }: any) => {
    const { data, error, isLoading } = useSWR(`https://vrchat.com/api/1/worlds/${worldKey}`, requestLocation);

    async function requestLocation (url:string):Promise<any> {
        return new Promise(async (resolve, reject) => {
            if(!worldKey){
                reject("");
                return;
            }
            const res = await request(url);
            if (/just H|Shangri-La/.test(res.name)) {
                notify({ body: `好友${name}正在公开房开银趴` });
            }
            resolve(res);
        })
    }

    if(isLoading){
        return <div>loading...</div>
    }
    if(!data){
        return null;
    }

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="friend-location">
            <img className="location-pic" src={data?.imageUrl} alt="" />
            <div className="location-name">{data?.name}</div>
        </motion.div>
    );
};

export default Index;
