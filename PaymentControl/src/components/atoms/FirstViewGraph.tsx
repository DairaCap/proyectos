import PieSpendings from "../graphics/PieSpendings";
import { ArrowUp } from "lucide-react";
interface FirstViewGraphProps {
    name: string;
    totalSpendings: number;
    totalIncomes: number;
}

const FirstViewGraph = ({ name, totalSpendings, totalIncomes }: FirstViewGraphProps) => {


    return <div className="general">
        <div className="general-text">
            <p>{name}</p>
            <p className="general-detail-text">${totalSpendings} / ${totalIncomes}</p>
        </div>
        <div className="pie-container">
            <PieSpendings
                totalIncomes={totalIncomes}
                totalSpendings={totalSpendings}
                icon={<ArrowUp />} />
        </div>
    </div>
}

export default FirstViewGraph;
