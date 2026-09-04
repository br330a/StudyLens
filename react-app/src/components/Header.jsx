function Header() {
    return (
        <header
            className="
                shrink-0
                border-b border-study-border
                bg-study-surface
                px-6 pb-4 pt-6
            "
        >
            <div>
                <h1
                    className="
                        m-0
                        text-2xl
                        font-bold
                        text-study-text
                    "
                >
                    StudyLens
                </h1>

                <p
                    className="
                        m-0
                        mt-1
                        text-sm
                        text-study-text-muted
                    "
                >
                    Biblioteca inteligente da câmera JOVI
                </p>
            </div>
        </header>
    );
}

export default Header;