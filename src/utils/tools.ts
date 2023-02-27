const getWorldKey = (worldKey:string) => {
    if(worldKey === "offline" || worldKey === "traveling"){
        return "";
    }
    if(worldKey === "private"){
        return  worldKey;
    }
    return worldKey.split(":")[0];
}

export {getWorldKey};
