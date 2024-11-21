import React, {useState} from 'react';

const AccordionItem = ({title, children}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="accordion-item bg-white border border-gray-200">
            <h2 className="mb-0">
                <button
                    className="accordion-button flex items-center justify-between w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {title}
                    <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>
            </h2>
            {isOpen && (
                <div className="accordion-content py-4 px-5">
                    {children}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;
