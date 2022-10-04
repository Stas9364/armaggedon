import React, {useEffect, useRef} from 'react';
import style from './DialogModal.module.css';
import s from './../../features/AsteroidsCart/AsteroidsCart.module.css'
import {Button} from '../Button/Button';

type DialogModalProps = {
    isOpened: boolean;
    onClose: () => void;
    children: React.ReactNode;
};


export const DialogModal: React.FC<DialogModalProps> = ({isOpened, onClose, children}) => {
    const ref: any = useRef(null);

    useEffect(() => {
        if (isOpened) {
            ref.current?.showModal()
        } else {
            ref.current?.close()
        }

    }, [isOpened]);

    const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <dialog ref={ref} className={style.modal} onCancel={onClose} onClick={onClose}>
            <div onClick={preventAutoClose}>
                {children}
                <Button onClick={onClose} name={'Закрыть'} style={s.orderButton}/>
            </div>
        </dialog>
    );
};

