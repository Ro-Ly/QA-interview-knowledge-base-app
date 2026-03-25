import React from 'react';
import { Chip, Stack } from '@mui/material';

const TagFilter = ({ tags, selectedTags, onSelect }) => {
    const handleTagClick = (tag) => {
        onSelect(
            selectedTags.includes(tag)
                ? selectedTags.filter((t) => t !== tag)
                : [...selectedTags, tag]
        );
    };

    return (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {tags.map((tag) => (
                <Chip
                    key={tag}
                    label={tag}
                    onClick={() => handleTagClick(tag)}
                    color={selectedTags.includes(tag) ? 'primary' : 'default'}
                    variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                />
            ))}
        </Stack>
    );
};

export default TagFilter;