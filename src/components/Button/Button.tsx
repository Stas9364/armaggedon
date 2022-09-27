import React, {ReactNode} from 'react';

type ButtonPropsType = {
    onClick: () => void
    name?: string
    children?: ReactNode
    style?: any
}


export const Button: React.FC<ButtonPropsType> = ({onClick, name, children, style}) => {
    return (
        <div>
            <button onClick={onClick} className={style}>
                {name?.toUpperCase()}
                {children}
            </button>
        </div>
    );
}
