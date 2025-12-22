import "./globals.css";

export const metadata = {
    title: "PetaniMaju",
    description: "Solusi Cerdas Pertanian",
};

export default function RootLayout({ children }) {
    return (
        <html lang="id">
            <body className="bg-gray-50">
                <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
                    {children}
                </div>
            </body>
        </html>
    );
}
