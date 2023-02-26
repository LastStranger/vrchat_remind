const getWorldKey = (worldKey:string) => {
    if(worldKey === "offline" || worldKey === "private" || worldKey === "traveling"){
        return "";
    }
    return worldKey.split(":")[0];
}

export {getWorldKey};
