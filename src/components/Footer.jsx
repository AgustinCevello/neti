export default function Footer() {
    return (
        <footer
            className="w-full py-8 px-6"
            style={{
                background:
                    "linear-gradient(135deg, #B2B0D8 0%, #85789A 50%, #4A3F6B 100%)",
            }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
                {/* RRSS */}
                <div className="flex items-center gap-5">
                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/company/no-est-todo-inventado-neti-/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:opacity-70 transition-opacity"
                        aria-label="LinkedIn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.84v2.13h.05c.53-1 1.84-2.13 3.79-2.13 4.05 0 4.8 2.67 4.8 6.14V24h-4v-8.5c0-2.03-.04-4.63-2.82-4.63-2.83 0-3.26 2.21-3.26 4.49V24h-4V8.5z" />
                        </svg>
                    </a>

                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/netimakers/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:opacity-70 transition-opacity"
                        aria-label="Instagram"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975-2.242-1.247-3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.745 2.014 2.086.673 3.427.085 5.269 0 7.124-.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.673 3.697 2.014 5.038 1.341 1.341 3.183 1.929 5.038 2.014C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.673 5.038-2.014 1.341-1.341 1.929-3.183 2.014-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.673-3.697-2.014-5.038C20.645.745 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                        </svg>
                    </a>

                    {/* Medium */}
                    <a
                        href="https://noestatodoinventado.medium.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:opacity-70 transition-opacity"
                        aria-label="Medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                        </svg>
                    </a>
                </div>

                {/* Licencia CC */}
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24" className="flex-shrink-0 opacity-80">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                    <p className="font-sans text-xs text-white/90 leading-snug max-w-sm">
                        Except where otherwise noted, content on this site is licensed under a{" "}
                        <a
                            href="https://creativecommons.org/licenses/by/4.0/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:opacity-70"
                        >
                            Creative Commons Attribution 4.0 International license
                        </a>
                        .
                    </p>
                </div>

                {/* Created by */}
                <a
                    href="https://agustincervello.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs text-white/70 hover:text-white transition-colors"
                >
                    Created by Agus
                </a>
            </div>
        </footer>
    );
}