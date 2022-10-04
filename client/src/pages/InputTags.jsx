import React from 'react';
import { useState, useRef } from 'react';
import { Box, TextField } from '@mui/material';
import Tag from "./Tag.jsx"

const InputTags = () => {

    const [tags, setTags] = useState([]);
    const tagRef = useRef();

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (tagRef.current.value === "" || tags.includes(tagRef.current.value)) {
            tagRef.current.value = "";
            return;
        }

        setTags([...tags, tagRef.current.value]);
        tagRef.current.value = "";
    }

    const handleDelete = (toDelete) => {
        setTags(tags.filter((t) => t !== toDelete));
    }

    return (
        <Box>
            <form onSubmit={ handleOnSubmit }>
                <TextField
                    variant='outlined'
                    placeholder='Enter tags here'
                    fullWidth
                    inputRef={ tagRef }
                    InputProps={{
                        startAdornment: (
                            <Box sx={{ margin: "2px", display: "flex" }}>
                                {tags.map((text, index) => {
                                    return (
                                        <Tag data={ text } key={ index } handleDelete={ handleDelete } />
                                    )
                                })}
                            </Box>
                        ),
                    }}
                >
                </TextField>
            </form>
        </Box>
    );
}

export default InputTags;