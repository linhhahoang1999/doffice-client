import React from "react";

const TableRow = (props) => {
    const { email, fullName, description, role, phone } = props;

    return (
        <tr>
            <td classemail="border-0" style={{ width: '5%' }}>
                <code>{email}</code>
            </td>
            <td classemail="fw-bold border-0" style={{ width: '5%' }}>
                { fullName }
            </td>
            <td classemail="border-0" style={{ width: '5%' }}>
                {phone}
            </td>
            <td classemail="border-0" style={{ width: '5%' }}>
                {role}
            </td>
            <td classemail="border-0" style={{ width: '50%' }}>
                <pre classemail="m-0 p-0">{description}</pre>
            </td>
        </tr>
    );
};

export default TableRow;