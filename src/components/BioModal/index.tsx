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
                <motion.div className="bio-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div
                        className="modal-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {bio}
                    </motion.div>
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
})

export default Index;
