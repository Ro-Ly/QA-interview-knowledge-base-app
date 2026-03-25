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
            sx={{ mb: 2.5 }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">{category}</Typography>
            </AccordionSummary>

            <AccordionDetails>
                {Object.entries(subcategories).map(([subcategory, questions]) => (
                    <Accordion
                        key={subcategory}
                        sx={{
                            mb: 2,
                            backgroundColor: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            boxShadow: 'none',
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">{subcategory}</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box sx={{ display: 'grid', gap: 1.25 }}>
                                {questions.map((question) => (
                                    <QuestionCard key={question.id} question={question} />
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default CategoryAccordion;