import React, { useImperativeHandle, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./index.scss";

const Index = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [bio, setBio] = useState("");

    useImperativeHandle(ref, () => ({
        ref,
        open
    }));

    function open  (data:string)  {
        setVisible(true);
        setBio(data);
    }

    function handleClose () {
        setVisible(false);
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div  onClick={handleClose} className="bio-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div
                        className="modal-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => {e.stopPropagation();}}
                    >
                        <pre>{bio}</pre>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
})

export default Index;
