import styles from './Message.module.css';
import { useState, useEffect } from 'react';

function Message({type, msg}) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        
        if(!msg) {
            setShow(false)
            return
        }

        setShow(true)

        const timer = setTimeout(() => {
            setShow(false)
        }, 3000)

        return () => clearTimeout(timer)

    }, [msg])

    return (
        <>
            {show && (
                <div className={`${styles.message} ${styles[type]}`}>
                    {msg}
                </div>
            )}
        </>
    )
}

export default Message;