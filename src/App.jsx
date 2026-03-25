import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
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

        if (!acc[category]) {
            acc[category] = {};
        }

        if (!acc[category][subcategory]) {
            acc[category][subcategory] = [];
        }

        acc[category][subcategory].push(question);
        return acc;
    }, {});

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            <Typography variant="h3" gutterBottom>
                Wiki Knowledge Base
            </Typography>

            <Box sx={{ mb: 3 }}>
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                />

                <TagFilter
                    tags={allTags}
                    selectedTags={selectedTags}
                    onSelect={setSelectedTags}
                />
            </Box>

            {Object.keys(groupedQuestions).length === 0 ? (
                <Typography variant="body1">
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