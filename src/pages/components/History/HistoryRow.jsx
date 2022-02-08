import React from "react";
import "./history.scss"
const HistoryRow = (props) => {
    const { userName, action, description, createdAt } = props;

    return (
        <div className="history-row">
            <div className="history-header">
                <span style={{ fontWeight: "bolder" }}>{userName}</span>
                <span style={{ color: "gray", marginLeft: 5 }}>{action}</span>
            </div>
            <div className="history-time">{createdAt}</div>
            <div className="history-description">
               {description}</div>
        </div>
    );
};

export default HistoryRow;