import React, {useState, useEffect} from 'react';

interface SnackbarProps {
    message: string;
    duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({message, duration = 3000}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    return (
        <div style={{
            position: 'fixed',
            top: '50px',
            right: '50px',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11))',
            backgroundColor: 'rgb(250, 250, 250)',
            color: 'rgba(0, 0, 0, 0.87)',
            padding: '10px 20px',
            borderRadius: '4px',
            transition: 'visibility 0s, opacity 0.5s ease',
            visibility: visible ? 'visible' : 'hidden',
            opacity: visible ? 1 : 0,
            zIndex: 9999,
            fontSize: '1.25rem',
        }}>
            {message}
        </div>
    );
}

export default Snackbar;
