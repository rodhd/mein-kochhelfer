import React from "react";
import {Button, Nav, Sidebar} from "grommet";
import {Clock, Projects, StatusInfoSmall} from "grommet-icons";

export const NavSidebar = () => {
    return (
        <Sidebar
            background="accent-4"
        >
            <Nav
                gap="small"
            >
                <Button icon={<StatusInfoSmall />} />
                <Button icon={<Projects />} />
                <Button icon={<Clock />} />
            </Nav>
        </Sidebar>
    )
}