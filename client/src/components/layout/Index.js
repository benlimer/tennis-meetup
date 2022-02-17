import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom"

const Index = (props) => {
    return (
        <div>
            <Link to="/find-players">Find players</Link>
            <br/>
            <Link to="/courts">Find courts</Link>
        </div>

    )
}

export default Index