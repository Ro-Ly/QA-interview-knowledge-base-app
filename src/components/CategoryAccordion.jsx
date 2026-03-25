import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionCard from './QuestionCard';

const CategoryAccordion = ({ category, subcategories }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            sx={{ mb: 2, boxShadow: 1 }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">{category}</Typography>
            </AccordionSummary>

            <AccordionDetails>
                {Object.entries(subcategories).map(([subcategory, questions]) => (
                    <Accordion key={subcategory} sx={{ mb: 2, boxShadow: 0 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">{subcategory}</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            {questions.map((question) => (
                                <QuestionCard key={question.id} question={question} />
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default CategoryAccordion;