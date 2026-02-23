import "./ButtonAdd.css";

/*
 * @author: Daira
 * @date: 2026-01-22, Jan 22, 2026
 * @description: Button to add a new spending
 */


interface ButtonAddProps {
    onClick?: () => void;
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ onClick }) => {
    return (
        <button className="button-add" onClick={onClick}>
            +
        </button>
    );
}

export default ButtonAdd;