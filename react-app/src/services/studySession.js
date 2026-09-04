const SESSION_KEY =
    "studylens-session";


export function iniciarSessaoStudyLens() {
    sessionStorage.setItem(
        SESSION_KEY,
        "ativa"
    );
}


export function possuiSessaoStudyLens() {
    return (
        sessionStorage.getItem(
            SESSION_KEY
        ) === "ativa"
    );
}


export function encerrarSessaoStudyLens() {
    sessionStorage.removeItem(
        SESSION_KEY
    );
}