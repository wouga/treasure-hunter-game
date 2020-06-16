import { useEffect } from 'react';

type TBodyClass = (className: string) => void;

const addBodyClass: TBodyClass = className => document.body.classList.add(className);
const removeBodyClass: TBodyClass = className => document.body.classList.remove(className);

export default function useBodyClass(className: string | string[]) {
    useEffect(
        () => {
            className instanceof Array
                ? className.forEach(addBodyClass)
                : addBodyClass(className);

            return () => {
                className instanceof Array
                    ? className.forEach(removeBodyClass)
                    : removeBodyClass(className);
            };
        },
        [className]
    );
}