import React, { useImperativeHandle, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./index.scss";

const Index = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [bio, setBio] = useState("");
    const [position, setPosition] = useState({x: 0, y: 0});
    const modalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        ref,
        open,
    }));

    function open(data: string, position : any) {
        setVisible(true);
        setBio(data);
        const x = position.x - (window.innerWidth /2);
        const y = position.y - (window.innerHeight /2);
        setPosition({x,y});
    }

    function handleClose() {
        setVisible(false);
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    onClick={handleClose}
                    className="bio-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        ref={modalRef}
                        className="modal-content"
                        initial={{ scale: 0, x: position.x, y: position.y }}
                        animate={{ scale: 1, x: 0, y: 0  }}
                        transition={{ duration: 0.3 }}
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <pre>{bio}</pre>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

export default Index;
