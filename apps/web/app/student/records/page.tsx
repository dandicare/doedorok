import React from "react";

import { SwipeFlipCard } from "../../components/SwipeFlipCard";

export default function StudentRecordsPage(): React.JSX.Element {
    return (
        <main className="min-h-screen w-full bg-white flex items-center justify-center">
            <div className="w-full max-w-[430px] px-5 py-10 flex items-center justify-center">
                <SwipeFlipCard />
            </div>
        </main>
    );
}

