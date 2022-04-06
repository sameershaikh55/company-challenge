import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";

const TextEditor = () => {
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	useEffect(() => {
		console.log(editorState);
	}, [editorState]);

	return (
		<div className="editor_container">
			<Editor editorState={editorState} onEditorStateChange={setEditorState} />
		</div>
	);
};

export default TextEditor;
