import {
    Navigate,
    useLocation,
} from "react-router-dom";

import {
    possuiSessaoStudyLens,
} from "../services/studySession";


function ProtectedRoute({
    children
}) {
    const location =
        useLocation();

    if (
        !possuiSessaoStudyLens()
    ) {
        return (
            <Navigate
                to="/"
                replace
                state={{
                    rotaBloqueada:
                        location.pathname
                }}
            />
        );
    }

    return children;
}

export default ProtectedRoute;