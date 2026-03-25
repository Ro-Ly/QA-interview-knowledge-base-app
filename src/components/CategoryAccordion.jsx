import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box
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
                    <Box key={subcategory} sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            {subcategory}
                        </Typography>

                        {questions.map((question) => (
                            <QuestionCard key={question.id} question={question} />
                        ))}
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default CategoryAccordion;