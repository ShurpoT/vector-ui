import style from "./Spiner.module.css";

export const Spiner = () => {
    return (
        <svg className={style.spiner} viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
        </svg>
    );
};
