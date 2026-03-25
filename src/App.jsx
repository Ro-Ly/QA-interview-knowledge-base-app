import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Chip, Divider } from '@mui/material';
import SearchBar from './components/SearchBar';
import TagFilter from './components/TagFilter';
import CategoryAccordion from './components/CategoryAccordion';
import { getAllQuestions } from './data';

function App() {
    const [questions, setQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        const loadQuestions = async () => {
            const data = await getAllQuestions();
            setQuestions(data);
            setAllTags([...new Set(data.flatMap(q => q.tags || []))]);
        };

        loadQuestions();
    }, []);

    const filteredQuestions = questions.filter((question) => {
        const matchesSearch = searchTerm
            ? question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            question.answer.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

        const matchesTags = selectedTags.length === 0
            ? true
            : selectedTags.every(tag => (question.tags || []).includes(tag));

        return matchesSearch && matchesTags;
    });

    const groupedQuestions = filteredQuestions.reduce((acc, question) => {
        const category = question.category || 'Uncategorized';
        const subcategory = question.subcategory || 'General';

        if (!acc[category]) acc[category] = {};
        if (!acc[category][subcategory]) acc[category][subcategory] = [];

        acc[category][subcategory].push(question);
        return acc;
    }, {});

    return (
        <Box
            sx={{
                maxWidth: 1100,
                mx: 'auto',
                px: { xs: 2, md: 4 },
                py: { xs: 4, md: 7 },
            }}
        >
            <Box
                sx={{
                    mb: 5,
                    p: { xs: 3, md: 5 },
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 4,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                }}
            >
                <Typography variant="h3" gutterBottom>
                    QA Interview Knowledge Base
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ maxWidth: 760, mb: 3, fontWeight: 400 }}
                >
                    Curated interview questions and answers across QA, automation,
                    testing fundamentals, tools, and engineering practices.
                </Typography>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    <Chip label={`${questions.length} questions`} />
                    <Chip label={`${Object.keys(groupedQuestions).length} categories`} />
                    <Chip label={`${allTags.length} tags`} />
                </Stack>
            </Box>

            <Box
                sx={{
                    mb: 4,
                    p: 3,
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 4,
                    backgroundColor: 'background.paper',
                }}
            >
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
                <TagFilter
                    tags={allTags}
                    selectedTags={selectedTags}
                    onSelect={setSelectedTags}
                />
            </Box>

            <Divider sx={{ mb: 4, opacity: 0.5 }} />

            {Object.keys(groupedQuestions).length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    No questions found.
                </Typography>
            ) : (
                Object.entries(groupedQuestions).map(([category, subcategories]) => (
                    <CategoryAccordion
                        key={category}
                        category={category}
                        subcategories={subcategories}
                    />
                ))
            )}
        </Box>
    );
}

export default App;