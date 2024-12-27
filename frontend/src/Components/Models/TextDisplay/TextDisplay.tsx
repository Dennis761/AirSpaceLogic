import React from 'react';
import './TextDisplay.css'; 

function parseText(text: string): string {
    return text
        .replace(/\[H2\]/g, '<h2 class="text-display-h2">')
        .replace(/\[\/H2\]/g, '</h2>')
        .replace(/\[H3\]/g, '<h3 class="text-display-h3">')
        .replace(/\[\/H3\]/g, '</h3>')
        .replace(/\[P\]/g, '<p class="text-display-p">')
        .replace(/\[\/P\]/g, '</p>')
        .replace(/\[OL\]/g, '<ol class="text-display-ol">')
        .replace(/\[\/OL\]/g, '</ol>')
        .replace(/\[UL\]/g, '<ul class="text-display-ul">')
        .replace(/\[\/UL\]/g, '</ul>')
        .replace(/\[LI\]/g, '<li class="text-display-li">')
        .replace(/\[\/LI\]/g, '</li>');
}

interface TextDisplayProps {
    content: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ content }) => {
    const parsedContent = parseText(content);

    return (
        <div className="text-display-container">
            <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
        </div>
    );
};

export default TextDisplay;
