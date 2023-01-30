import React, {useEffect, useMemo, useState} from 'react';
import request from "../../utils/Request";
import './index.scss';

const Index = ({worldKey, onSendMessage}:any) => {
    const [locationData, setLocationData] = useState<any>(null);
    const ifLocation = useMemo(() => {
        return worldKey !== "offline" && worldKey !== "private" && worldKey !== "traveling";
    }, [worldKey])

    useEffect(() => {
        if(ifLocation) {
            request(`https://vrchat.com/api/1/worlds/${worldKey.split(':')[0]}`).then(res => {
                console.log('%cres', "color: #22E1FF; font-size: 16px", res);
                setLocationData(res);
                if(/(just H|MMD|Language)/.test(res.name)){
                // if(res.name.includes("just H")){
                    onSendMessage("有好友正在公开房开银趴");
                }
            })
        }
        // https://vrchat.com/api/1/worlds/wrld_791ebf58-54ce-4d3a-a0a0-39f10e1b20b2

    }, [worldKey])

    if(!ifLocation) return null;

    return (
        <div className="friend-location">
            <img className="location-pic" src={locationData?.imageUrl} alt=""/>
            <div className="location-name">{locationData?.name}</div>
        </div>
    );
};

export default Index;
