import React, { useRef } from 'react';
import { TextField, Box } from '@mui/material';
import Tag from "./Tag.jsx"

/**
 * Component that displays an input field for tags.
 * @param {Array.<String>} [tags=[]] An array of tags.
 * @param {Function} setTags SetStateSction for updating the array of tags.
 */
const TagsInput = ({ tags, setTags }) => {

    const tagRef = useRef();

    /**
     * Add tag to list if the enter key is pressed.
     * @param {Event} e 
     */
    const handleTagKeyDown = (e) => {
        if (e.which !== 13) {
            return;
        }

        e.preventDefault();
        if (tagRef.current.value === "" || tags.includes(tagRef.current.value)) {
            tagRef.current.value = "";
            return;
        }

        setTags([...tags, tagRef.current.value]);
        tagRef.current.value = "";
    }

    return (
        <Box display="flex" flexDirection="column"
            sx={{
                border: 1,
                borderColor: "#D3D3D3",
                borderRadius: "4px",
                margin: "0",
                width: "100%",
                padding: "8px",
                boxSizing: "border-box"
            }}>

            <Box display="inline-flex" flexWrap="wrap">
                {tags.map((text, index) => {
                    return (
                        <Tag
                            data={text}
                            key={index}
                            handleDelete={(toDelete) => { setTags(tags.filter((t) => t !== toDelete)); }} />
                    )
                })}
            </Box>

            <TextField sx={{ margin: "8px" }}
                variant='standard'
                placeholder='Enter tags here'
                onKeyDown={handleTagKeyDown}
                inputRef={tagRef}>
            </TextField>
        </Box>
    );
}

export default TagsInput;