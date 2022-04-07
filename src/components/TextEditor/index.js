import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";

const TextEditor = ({ name, editorContent, handleChangeEditor }) => {
	const onEditorStateChange = (editorState) => {
		handleChangeEditor(name, editorState);
	};

	return (
		<div className="editor_container">
			<Editor
				editorState={editorContent}
				onEditorStateChange={onEditorStateChange}
			/>
		</div>
	);
};

export default TextEditor;
