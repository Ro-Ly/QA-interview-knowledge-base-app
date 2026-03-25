import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ value, onChange }) => {
    return (
        <TextField
            fullWidth
            label="Search questions..."
            variant="outlined"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            sx={{ mb: 2 }}
        />
    );
};

export default SearchBar;