import { memo } from "react";

function Footer() {
    return(
        <footer className="bg-gray-900 pt-4">
            <div className="container mx-auto text-white text-center font-normal py-8">
                <h5>News PWA - Digital Innovation One - Bootcamp LocalizaLabs React Developer</h5>
                <p>By: <strong>Marcus Aurélio Oliveira Campos</strong></p>
                <a href="http://github.com/marcaoweb" target="_blank" rel="noreferrer" className="underline">Source Code</a>
            </div>
        </footer>
    );
};

export default memo(Footer);