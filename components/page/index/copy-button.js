import { useRef, useState, useEffect } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap"
import { ClipboardFill } from 'react-bootstrap-icons';

function CopyButton({ text, variant }) {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    useEffect(() => {
        if (!show) return

        const timer = setTimeout(() => {
            setShow(false)
        }, 1500);

        return () => {
            clearTimeout(timer)
        }

    }, [show])

    const copyButtonHandler = () => {
        navigator.clipboard.writeText(text);
        setShow(true)
    }

    return (
        <>
            <Button ref={target} onClick={copyButtonHandler} size="sm" className="pb-2" variant={variant}><ClipboardFill /> Copy</Button>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Copied!
                    </Tooltip>
                )}
            </Overlay>
        </>
    )
}

export default CopyButton