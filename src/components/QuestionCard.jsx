import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Chip,
    Stack,
    Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const QuestionCard = ({ question }) => {
    return (
        <Accordion sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {question.title}
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                {!!question.tags?.length && (
                    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                        {question.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                    </Stack>
                )}

                <Box>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {question.answer}
                    </Typography>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default QuestionCard;