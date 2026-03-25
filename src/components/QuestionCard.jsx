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
        <Accordion
            sx={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: 'none',
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {question.title}
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                {!!question.tags?.length && (
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
                        {question.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                    </Stack>
                )}

                <Box
                    sx={{
                        color: 'text.secondary',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {question.answer}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default QuestionCard;